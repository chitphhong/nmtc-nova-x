import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ColladaLoader } from 'three/addons/loaders/ColladaLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ===== จุดปรับแต่งมุมมองโมเดล =====
// ปรับเฉพาะค่าด้านล่างนี้ได้โดยไม่ต้องแก้สูตรกล้อง
const VIEWER_SETTINGS = {
  // ความกว้าง/สูงด้านที่ยาวที่สุดของโมเดลในโลก Three.js (มีผลกับระยะซูม)
  modelSpan: 5.0,
  // ระยะเผื่อรอบโมเดลตอนเปิดหน้า: ค่ายิ่งมาก = กล้องยิ่งไกล/เห็นขอบมาก
  // ใช้ 1.5 เพื่อกันส่วนที่ยื่นหน้า-หลังของโมเดลไม่ให้ดูเหมือนถูกตัดขอบ
  framingPadding: 1.5,
  // โมเดลใหม่จัดกึ่งกลาง Origin แล้ว ไม่ต้องชดเชย (0 = ตรงกลางพอดี)
  horizontalCenterCorrection: 0.0,
  verticalCenterCorrection: 0.0,
  mobileCenterCorrection: { x: -0.07, y: -0.06 },
};

// ===== จุดปรับแต่งความสว่าง =====
// ปรับตัวเลขของแต่ละโหมดได้จากที่เดียว: ค่ายิ่งมาก = สว่างขึ้น
const LIGHTING_SETTINGS = {
  standby: {
    // แสงพื้นฐานเพื่อให้ยังมองเห็นทรงโมเดลขณะไฟหลักดับ
    ambient: 0.40,
    key: 0.75,
    cyan: 4,
    gold: 0,
    // การรับแสงรวมของภาพ: เพิ่มทีละ 0.05 จะควบคุมได้ง่ายที่สุด
    exposure: 0.8,
  },
  active: {
    // แสงเมื่อใช้งานจริง: ไฟทองคือไฟหลัก ส่วน cyan ช่วยให้เงาไม่ดำทึบ
    ambient: 0.62,
    key: 2.7,
    cyan: 14,
    gold: 30,
    exposure: 1,
  },
};

// แสดงโมเดล SketchUp (.dae) และสร้างระบบไฟจากฝั่งเว็บ
export default function ImpactModelViewer({ mode, className = '' }) {
  const containerRef = useRef(null);
  const modeRef = useRef(mode);
  const resetHandlerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setAnimationLoop(render);

    // ป้องกัน gesture แทรกซ้อนจาก browser และตั้งขนาด canvas เต็ม container
    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.style.overscrollBehavior = 'contain';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.enableZoom = true;

    // ความเร็วการควบคุมที่เหมาะสมกับหน้าจอมือถือ
    controls.rotateSpeed = 0.75;
    controls.zoomSpeed = 0.65;
    // เปิดมุมก้ม-เงยได้ 180° ให้สามารถส่องดูใต้ฐานและรอบด้านได้อย่างอิสระ
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI;

    // 1 นิ้ว = หมุน, 2 นิ้ว = pinch zoom + หมุน
    controls.touches.ONE = THREE.TOUCH.ROTATE;
    controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;

    // แฟล็กจัดการ lifecycle กล้อง ป้องกัน ResizeObserver รีเซ็ตตำแหน่งซ้ำ
    let hasFramedCamera = false;
    let userHasInteracted = false;
    let isResetting = false;
    let resetStartTime = 0;
    const RESET_DURATION = 500; // ms
    const startCamPos = new THREE.Vector3();
    const startTarget = new THREE.Vector3();
    const defaultCamPos = new THREE.Vector3();
    const defaultTarget = new THREE.Vector3();

    controls.addEventListener('start', () => {
      userHasInteracted = true;
      isResetting = false;
    });

    // ไฟพื้นฐานทำให้รายละเอียดโมเดลยังมองเห็นได้ในโหมด Standby
    const ambientLight = new THREE.HemisphereLight(0x8ecfff, 0x091020, 0.35);
    const keyLight = new THREE.DirectionalLight(0xfff1d1, 2.2);
    const fillLight = new THREE.PointLight(0x06b6d4, 16, 12, 2);
    const activeLight = new THREE.PointLight(0xf59e0b, 70, 14, 2);
    keyLight.position.set(4, 6, 5);
    fillLight.position.set(-3, 2, 3);
    activeLight.position.set(0, 2.4, 2.5);
    scene.add(ambientLight, keyLight, fillLight, activeLight);

    let modelGroup;
    let fittedCenter;
    let fittedSize;
    let disposed = false;
    const loader = new ColladaLoader();
    loader.load(
      '/models/impact2013plants.dae',
      (collada) => {
        if (disposed) return;
        // ใช้ Group ครอบโมเดลเพื่อเก็บค่า scale/rotation ดั้งเดิมจากไฟล์ .dae ไว้
        // สำคัญ: SketchUp export มักมี scale หน่วยเมตรติดมา ห้ามเขียนทับโดยตรง
        modelGroup = new THREE.Group();
        modelGroup.add(collada.scene);
        scene.add(modelGroup);

        const bounds = new THREE.Box3().setFromObject(modelGroup);
        const size = bounds.getSize(new THREE.Vector3());
        const largestSide = Math.max(size.x, size.y, size.z);

        // ย่อ/ขยายที่ Group แทนตัวโมเดล จึงไม่ทำลายหน่วยและแกนที่ ColladaLoader แปลงไว้
        modelGroup.scale.setScalar(VIEWER_SETTINGS.modelSpan / largestSide);
        const scaledBounds = new THREE.Box3().setFromObject(modelGroup);
        const scaledCenter = scaledBounds.getCenter(new THREE.Vector3());
        // Group ไม่มีการหมุนหรือ scale เดิม จึงเลื่อนด้วยค่าศูนย์กลางนี้ได้ตรงตำแหน่ง
        modelGroup.position.sub(scaledCenter);

        const fittedBounds = new THREE.Box3().setFromObject(modelGroup);
        fittedCenter = fittedBounds.getCenter(new THREE.Vector3());
        fittedSize = fittedBounds.getSize(new THREE.Vector3());

        frameCamera();
        hasFramedCamera = true;
        setIsLoaded(true);
      },
      undefined,
      (error) => console.error('ไม่สามารถโหลดโมเดล 3D ได้', error),
    );

    function updateLights() {
      const isActive = modeRef.current?.key === 'active';
      const settings = isActive ? LIGHTING_SETTINGS.active : LIGHTING_SETTINGS.standby;
      ambientLight.intensity = settings.ambient;
      keyLight.intensity = settings.key;
      fillLight.intensity = settings.cyan;
      activeLight.intensity = settings.gold;
      renderer.toneMappingExposure = settings.exposure;
    }

    // คำนวณพารามิเตอร์มุมกล้องเริ่มต้นตามขนาดและ aspect ของ viewport ปัจจุบัน
    function getFramingParameters() {
      if (!fittedCenter || !fittedSize) return null;
      const isMobile = window.matchMedia('(max-width: 639px)').matches;
      // มือถือ: ใช้ aspect 4:3 (แนวนอนในจอแคบ) เผื่อระยะรอบโมเดลพอประมาณ
      const framingPadding = isMobile ? 1.9 : VIEWER_SETTINGS.framingPadding;
      const verticalFov = THREE.MathUtils.degToRad(camera.fov);
      const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);

      // คำนวณระยะที่ทำให้โมเดลพอดีกรอบ โดยใช้ด้านที่ใหญ่กว่า (กว้าง vs สูง)
      const distByHeight = fittedSize.y / (2 * Math.tan(verticalFov / 2));
      const distByWidth = fittedSize.x / (2 * Math.tan(horizontalFov / 2));
      const distance = Math.max(distByHeight, distByWidth) * framingPadding;

      // จุดเล็งกล้อง: เริ่มจากกึ่งกลาง bounding box แล้วชดเชยตามค่าที่ตั้ง
      const visualCenter = fittedCenter.clone();
      if (isMobile) {
        visualCenter.x += fittedSize.x * VIEWER_SETTINGS.mobileCenterCorrection.x;
        visualCenter.y += fittedSize.y * VIEWER_SETTINGS.mobileCenterCorrection.y;
      } else {
        visualCenter.x += fittedSize.x * VIEWER_SETTINGS.horizontalCenterCorrection;
        visualCenter.y += fittedSize.y * VIEWER_SETTINGS.verticalCenterCorrection;
      }

      const targetPosition = new THREE.Vector3(
        visualCenter.x,
        visualCenter.y + fittedSize.y * 0.05,
        visualCenter.z + distance
      );

      return {
        distance,
        visualCenter,
        targetPosition,
      };
    }

    // เริ่มด้วยมุมหน้าตรงและเผื่อกรอบรอบโมเดล เพื่อเห็นทั้งชิ้นทันทีที่โหลด
    function frameCamera() {
      const params = getFramingParameters();
      if (!params) return;

      camera.position.copy(params.targetPosition);
      controls.target.copy(params.visualCenter);

      // สำคัญ: คำนวณ min/max distance สัมพันธ์กับขนาดกล้อง เพื่อป้องกันการซูมทะลุโมเดล
      controls.minDistance = params.distance * 0.55;
      controls.maxDistance = params.distance * 2.5;

      controls.update();

      defaultCamPos.copy(params.targetPosition);
      defaultTarget.copy(params.visualCenter);
    }

    // เรียก Smooth Reset เพื่อดึงกล้องกลับมาที่จุดเริ่มต้นอย่างนุ่มนวล
    function triggerReset() {
      const params = getFramingParameters();
      if (!params) return;

      defaultCamPos.copy(params.targetPosition);
      defaultTarget.copy(params.visualCenter);

      startCamPos.copy(camera.position);
      startTarget.copy(controls.target);

      resetStartTime = performance.now();
      isResetting = true;
      userHasInteracted = false;
    }

    resetHandlerRef.current = triggerReset;

    function resize() {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);

      // สำคัญ: รีเซ็ตกล้องเฉพาะตอนเริ่มต้นเท่านั้น หากผู้ใช้เริ่มสัมผัสแล้วจะไม่ดึงกล้องกลับซ้ำ
      if (!hasFramedCamera && !userHasInteracted && fittedCenter && fittedSize) {
        frameCamera();
        hasFramedCamera = true;
      }
    }

    function render() {
      updateLights();

      if (isResetting) {
        const elapsed = performance.now() - resetStartTime;
        const progress = Math.min(1, elapsed / RESET_DURATION);
        // easeOutCubic เพื่อให้การเคลื่อนไหวดูนุ่มนวลเป็นธรรมชาติ
        const t = 1 - Math.pow(1 - progress, 3);

        camera.position.lerpVectors(startCamPos, defaultCamPos, t);
        controls.target.lerpVectors(startTarget, defaultTarget, t);
        camera.lookAt(controls.target);

        if (progress >= 1) {
          isResetting = false;
          controls.update();
        }
      } else {
        controls.update();
      }

      renderer.render(scene, camera);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    return () => {
      disposed = true;
      resetHandlerRef.current = null;
      observer.disconnect();
      controls.dispose();
      renderer.setAnimationLoop(null);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className="h-full w-full cursor-grab touch-none active:cursor-grabbing"
        aria-label="โมเดล 3 มิติ หมุนดูได้ด้วยการลาก"
      />

      {/* ปุ่ม Reset View สไตล์ Glassmorphism */}
      {isLoaded && (
        <button
          type="button"
          onClick={() => resetHandlerRef.current?.()}
          className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-lg border border-white/20 bg-slateink/70 px-2.5 py-1.5 text-[11px] font-medium text-white/80 backdrop-blur transition-all duration-200 hover:border-champagne/60 hover:bg-slateink/90 hover:text-champagne active:scale-95 shadow-md select-none pointer-events-auto"
          title="รีเซ็ตมุมมองกลับตำแหน่งเริ่มต้น"
          aria-label="รีเซ็ตมุมมอง"
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span className="hidden sm:inline">รีเซ็ตมุมมอง</span>
        </button>
      )}
    </div>
  );
}
