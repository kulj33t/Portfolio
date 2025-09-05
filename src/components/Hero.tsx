import React, { useState, useEffect, useRef, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useProgress } from "@react-three/drei";
import { GLTFLoader } from "three-stdlib";
import { PerspectiveCamera } from "three";
import "./Hero.css";

const MODEL_GLB = "/models/desk.glb";

function Loader() {
  const { progress } = useProgress();
  return <Html center className="loader">{Math.round(progress)}%</Html>;
}

interface DeskModelProps {
  onLoaded?: (obj: THREE.Object3D) => void;
}

function DeskModel({ onLoaded }: DeskModelProps) {
  const gltf = useLoader(GLTFLoader, MODEL_GLB);
  const object = gltf.scene;

  React.useEffect(() => {
    if (!object) return;
    object.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    onLoaded?.(object);
  }, [object, onLoaded]);

  const scale = 3;
  const pos: [number, number, number] = [0, 0, 0];
  const rot: [number, number, number] = [-0.1, -1.1, -0.1];

  return <primitive object={object} scale={scale} position={pos} rotation={rot} />;
}

interface CameraFitProps {
  object: THREE.Object3D | null;
  controlsRef: React.RefObject<any>;
  extraFactor?: number;
}

function CameraFit({ object, controlsRef, extraFactor = 1.3 }: CameraFitProps) {
  const { camera } = useThree();

  React.useEffect(() => {
    if (!object) return;

    if (!(camera instanceof PerspectiveCamera)) return;

    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = (camera.fov * Math.PI) / 180;
    let dist = Math.abs(maxDim / (2 * Math.tan(fov / 2)));
    dist *= extraFactor;
    const newPos = new THREE.Vector3(center.x + dist * 0.6, center.y + dist * 0.35, center.z + dist * 0.6);
    camera.position.copy(newPos);
    camera.near = Math.max(0.01, dist / 1000);
    camera.far = dist * 100;
    camera.updateProjectionMatrix();
    if (controlsRef?.current) {
      controlsRef.current.target.copy(center);
      controlsRef.current.update();
    }
  }, [object, camera, controlsRef, extraFactor]);

  return null;
}

const Hero: React.FC = () => {
  const [portraitClass, setPortraitClass] = useState("landscape");
  const [modelObject, setModelObject] = useState<THREE.Object3D | null>(null);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    const checkOrientation = () => {
      setPortraitClass(window.innerHeight >= window.innerWidth ? "portrait" : "landscape");
    };
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);
    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  return (
    <div className="hero-container">
      <div className={`canvas-wrapper ${portraitClass}`}>
        <Canvas gl={{ antialias: true, alpha: true }} shadows={false} camera={{ position: [0, 0, 0], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[8, 10, 8]} intensity={0.9} />
          <pointLight position={[-10, 0, -10]} intensity={0.3} />
          <Suspense fallback={<Loader />}>
            <DeskModel onLoaded={setModelObject} />
          </Suspense>
          {modelObject && <CameraFit object={modelObject} controlsRef={controlsRef} extraFactor={1.1} />}
          <OrbitControls ref={controlsRef} enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 6} maxPolarAngle={Math.PI / 2} rotateSpeed={0.8} zoomSpeed={0.8} />
        </Canvas>
      </div>

      <div className={`title-block ${portraitClass}`}>
        <h1 className={`hero-title ${portraitClass}`}>KULJEET</h1>
        <h1 className={`hero-title ${portraitClass}`}>SINGH</h1>
      </div>

      <div className={`social-links ${portraitClass}`}>
        <a href="mailto:kuljeet.singh.dev@gmail.com" className="social-button">
          <img src="/icons/social/email.png" alt="Email" className={`social-icon ${portraitClass}`} />
        </a>
        <a href="https://github.com/kulj33t" target="_blank" rel="noopener noreferrer" className="social-button">
          <img src="/icons/social/github.png" alt="GitHub" className={`social-icon ${portraitClass}`} />
        </a>
        <a href="https://linkedin.com/in/kulj33t" target="_blank" rel="noopener noreferrer" className="social-button">
          <img src="/icons/social/linkedin.png" alt="LinkedIn" className={`social-icon ${portraitClass}`} />
        </a>
      </div>
    </div>
  );
};

export default Hero;
