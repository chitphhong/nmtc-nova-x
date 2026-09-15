import { useEffect, useRef } from 'react';
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
  // ระยะซูมใกล้สุดและไกลสุดที่ผู้ใช้ทำได้ด้วยล้อเมาส์หรือการ pinch
  minZoomDistance: 2.2,
  maxZoomDistance: 15,
  // โมเดลใหม่จัดกึ่งกลาง Origin แล้ว ไม่ต้องชดเชย (0 = ตรงกลางพอดี)
  horizontalCenterCorrection: 0.0,
  verticalCenterCorrection: 0.0,
  mobileCenterCorrection: { x: 0.42, y: -0.3 },
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
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = VIEWER_SETTINGS.minZoomDistance;
    controls.maxDistance = VIEWER_SETTINGS.maxZoomDistance;

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

        // ===== DEBUG: ดูค่าจริงของโมเดลใน Console (F12) =====
        const fMin = fittedBounds.min;
        const fMax = fittedBounds.max;
        console.log('[ModelViewer] fittedCenter:', fittedCenter);
        console.log('[ModelViewer] fittedSize:', fittedSize);
        console.log('[ModelViewer] bounds min:', fMin, 'max:', fMax);
        console.log('[ModelViewer] isMobile:', window.matchMedia('(max-width: 639px)').matches);

        frameCamera();
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

    // เริ่มด้วยมุมหน้าตรงและเผื่อกรอบรอบโมเดล เพื่อเห็นทั้งชิ้นทันทีที่โหลด
    function frameCamera() {
      if (!fittedCenter || !fittedSize) return;
      const isMobile = window.matchMedia('(max-width: 639px)').matches;
      // มือถือ: ใช้ aspect 4:3 (แนวนอนในจอแคบ) ต้องถอยกล้องพอประมาณ
      const framingPadding = isMobile ? 2.2 : VIEWER_SETTINGS.framingPadding;
      const verticalFov = THREE.MathUtils.degToRad(camera.fov);
      const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);

      // คำนวณระยะที่ทำให้โมเดลพอดีกรอบ โดยใช้ด้านที่ใหญ่กว่า (กว้าง vs สูง)
      const distByHeight = fittedSize.y / (2 * Math.tan(verticalFov / 2));
      const distByWidth = fittedSize.x / (2 * Math.tan(horizontalFov / 2));
      // บนมือถือ กรอบเป็น 4:3 (แนวนอน) → ความกว้างเป็นตัวจำกัด ใช้ distByWidth เป็นหลัก
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

      // กล้องมองจากด้านหน้า
      camera.position.set(visualCenter.x, visualCenter.y + fittedSize.y * 0.05, visualCenter.z + distance);
      controls.target.copy(visualCenter);
      controls.update();
    }

    function resize() {
      const { width, height } = container.getBoundingClientRect();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      frameCamera();
    }

    function render() {
      updateLights();
      controls.update();
      renderer.render(scene, camera);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    return () => {
      disposed = true;
      observer.disconnect();
      controls.dispose();
      renderer.setAnimationLoop(null);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`cursor-grab touch-none active:cursor-grabbing ${className}`}
      aria-label="โมเดล 3 มิติ หมุนดูได้ด้วยการลาก"
    />
  );
}
