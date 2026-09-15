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
    controls.minDistance = 2;
    controls.maxDistance = 14;

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
        model.position.sub(center);
        model.scale.setScalar(3.4 / largestSide);
        model.rotation.y = -0.35;
        scene.add(model);

        const fittedBounds = new THREE.Box3().setFromObject(model);
        const fittedCenter = fittedBounds.getCenter(new THREE.Vector3());
        const fittedSize = fittedBounds.getSize(new THREE.Vector3());
        const distance = Math.max(fittedSize.x, fittedSize.y, fittedSize.z) * 1.9;
        camera.position.set(fittedCenter.x + distance * 0.8, fittedCenter.y + distance * 0.52, fittedCenter.z + distance);
        controls.target.copy(fittedCenter);
        controls.update();
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

    function resize() {
      const { width, height } = container.getBoundingClientRect();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
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
