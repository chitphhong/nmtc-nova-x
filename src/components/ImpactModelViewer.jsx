import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ColladaLoader } from 'three/addons/loaders/ColladaLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// แสดงโมเดล SketchUp (.dae) และสร้างระบบไฟจากฝั่งเว็บ
export default function ImpactModelViewer({ mode }) {
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
    controls.minDistance = 2.2;
    controls.maxDistance = 15;

    // ไฟพื้นฐานทำให้รายละเอียดโมเดลยังมองเห็นได้ในโหมด Standby
    const ambientLight = new THREE.HemisphereLight(0x8ecfff, 0x091020, 0.35);
    const keyLight = new THREE.DirectionalLight(0xfff1d1, 2.2);
    const fillLight = new THREE.PointLight(0x06b6d4, 16, 12, 2);
    const activeLight = new THREE.PointLight(0xf59e0b, 70, 14, 2);
    keyLight.position.set(4, 6, 5);
    fillLight.position.set(-3, 2, 3);
    activeLight.position.set(0, 2.4, 2.5);
    scene.add(ambientLight, keyLight, fillLight, activeLight);

    let model;
    let fittedCenter;
    let fittedSize;
    let disposed = false;
    const loader = new ColladaLoader();
    loader.load(
      '/models/impact2013plants.dae',
      (collada) => {
        if (disposed) return;
        model = collada.scene;
        const bounds = new THREE.Box3().setFromObject(model);
        const center = bounds.getCenter(new THREE.Vector3());
        const size = bounds.getSize(new THREE.Vector3());
        const largestSide = Math.max(size.x, size.y, size.z);

        // จัดกึ่งกลางและปรับขนาดจากขนาดจริงของไฟล์ ไม่ขึ้นกับหน่วยที่ SketchUp export
        // ตำแหน่งต้องถูกคูณด้วยสเกลด้วย จึงจะไม่เกิดอาการโมเดลชิดกล้อง
        const scale = 3.4 / largestSide;
        model.scale.setScalar(scale);
        model.position.copy(center).multiplyScalar(-scale);
        scene.add(model);

        const fittedBounds = new THREE.Box3().setFromObject(model);
        fittedCenter = fittedBounds.getCenter(new THREE.Vector3());
        fittedSize = fittedBounds.getSize(new THREE.Vector3());
        frameCamera();
      },
      undefined,
      (error) => console.error('ไม่สามารถโหลดโมเดล 3D ได้', error),
    );

    function updateLights() {
      const isActive = modeRef.current?.key === 'active';
      ambientLight.intensity = isActive ? 0.72 : 0.18;
      keyLight.intensity = isActive ? 3.4 : 0.45;
      fillLight.intensity = isActive ? 24 : 2;
      activeLight.intensity = isActive ? 100 : 0;
      renderer.toneMappingExposure = isActive ? 1.3 : 0.7;
    }

    // เริ่มด้วยมุมหน้าตรงและเผื่อกรอบรอบโมเดล เพื่อเห็นทั้งชิ้นทันทีที่โหลด
    function frameCamera() {
      if (!fittedCenter || !fittedSize) return;
      const verticalFov = THREE.MathUtils.degToRad(camera.fov);
      const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
      const distance = Math.max(
        fittedSize.y / (2 * Math.tan(verticalFov / 2)),
        fittedSize.x / (2 * Math.tan(horizontalFov / 2)),
      ) * 1.28;

      camera.position.set(fittedCenter.x, fittedCenter.y + fittedSize.y * 0.06, fittedCenter.z + distance);
      controls.target.copy(fittedCenter);
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

  return <div ref={containerRef} className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing" aria-label="โมเดล 3 มิติ หมุนดูได้ด้วยการลาก" />;
}
