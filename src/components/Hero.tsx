import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Suspense,
} from "react";

import * as THREE from "three";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, useProgress } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { GLTFLoader } from "three-stdlib";
import { PerspectiveCamera } from "three";

const MODEL_GLB = "/models/desk.glb";

interface DeskModelProps {
  onLoaded?: (obj: THREE.Object3D) => void;
}

function DeskModel({ onLoaded }: DeskModelProps) {
  const gltf = useLoader(GLTFLoader, MODEL_GLB);
  const object = gltf.scene;

  useEffect(() => {
    if (!object) return;

    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    object.updateMatrixWorld(true);
    onLoaded?.(object);
  }, [object, onLoaded]);

  const scale = 3;
  const pos: [number, number, number] = [0, 0, 0];
  const rot: [number, number, number] = [-0.1, -1.1, -0.1];

  return (
    <primitive object={object} scale={scale} position={pos} rotation={rot} />
  );
}

interface CameraFitProps {
  object: THREE.Object3D | null;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  isPortrait: boolean;
}

function CameraFit({ object, controlsRef, isPortrait }: CameraFitProps) {
  const { camera } = useThree();

  useEffect(() => {
    if (!object) return;
    if (!(camera instanceof PerspectiveCamera)) return;

    object.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    const fov = (camera.fov * Math.PI) / 180;

    let dist = Math.abs(maxDim / (2 * Math.tan(fov / 2)));

    const extraFactor = isPortrait ? 1.25 : 1.15;

    dist *= extraFactor;

    const newPos = new THREE.Vector3(
      center.x + dist * 0.6,
      center.y + dist * 0.35,
      center.z + dist * 0.6,
    );

    camera.position.copy(newPos);
    camera.near = Math.max(0.01, dist / 1000);
    camera.far = dist * 100;
    camera.updateProjectionMatrix();

    if (controlsRef.current) {
      controlsRef.current.target.copy(center);
      controlsRef.current.update();
    }
  }, [object, camera, controlsRef, isPortrait]);

  return null;
}

const socials = [
  {
    href: "mailto:kulj33tsingh@gmail.com",
    src: "/icons/social/email.png",
    alt: "Email",
    title: "Send Email",
  },
  {
    href: "https://github.com/kulj33t",
    src: "/icons/social/github.png",
    alt: "GitHub",
    title: "GitHub Profile",
    external: true,
  },
  {
    href: "https://linkedin.com/in/kulj33t",
    src: "/icons/social/linkedin.png",
    alt: "LinkedIn",
    title: "LinkedIn Profile",
    external: true,
  },
];

const Hero: React.FC = () => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [modelObject, setModelObject] = useState<THREE.Object3D | null>(null);

  const [isModelReady, setIsModelReady] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  const { progress } = useProgress();
  const displayProgress = Math.min(100, Math.round(progress));

  useEffect(() => {
    const checkOrientation = () => {
      const portrait =
        window.innerHeight >= window.innerWidth || window.innerWidth < 1024;

      setIsPortrait(portrait);
    };

    checkOrientation();

    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  useEffect(() => {
    if (isModelReady) {
      setIsFadingOut(true);

      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 450);

      return () => clearTimeout(timer);
    }
  }, [isModelReady]);

  const handleModelLoaded = useCallback((obj: THREE.Object3D) => {
    setModelObject(obj);
    setIsModelReady(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black text-white font-sans overflow-hidden flex items-center selection:bg-[#d87aff]/30 selection:text-white">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 sm:w-162.5 h-100 sm:h-162.5 bg-[#d87aff]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Flex Container */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 py-10">
        <div className="hero-layout w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6">
          {/* LEFT: NAME + BUTTONS */}
          <div className="hero-content w-full lg:w-[50%] shrink-0 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="mb-8">
              <h1 className="font-['Tenkai',sans-serif] font-black tracking-[2px] sm:tracking-[4px] text-white leading-none mb-1 select-none text-[clamp(3.5rem,6vw,7.5rem)]">
                KULJEET
              </h1>

              <h1 className="font-['Tenkai',sans-serif] font-black tracking-[2px] sm:tracking-[4px] text-white leading-none select-none text-[clamp(3.5rem,6vw,7.5rem)]">
                SINGH
              </h1>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href="#Project"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 bg-white/3 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all hover:bg-white/10 hover:border-white/40 backdrop-blur-md"
              >
                View Projects
              </a>
            </div>
          </div>

          {/* CENTRE: 3D CANVAS */}
          <div className="hero-canvas w-full lg:flex-1 lg:min-w-0 flex items-center justify-center">
            <div className="relative w-full max-w-160 lg:max-w-175 h-[42vh] sm:h-[48vh] lg:h-[58vh] xl:h-[62vh] min-h-75 rounded-3xl border border-white/10 bg-linear-to-b from-white/3 to-transparent p-2 backdrop-blur-sm overflow-hidden flex items-center justify-center">
              {/* Loading Overlay */}
              {showLoader && (
                <div
                  className={`absolute inset-0 z-30 flex flex-col items-center justify-center p-6 bg-black/70 backdrop-blur-md transition-opacity duration-450 ease-out pointer-events-none ${
                    isFadingOut ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <div className="flex flex-col items-center text-center max-w-60 w-full p-5 rounded-2xl border border-white/10 bg-white/3 shadow-2xl">
                    <div className="relative mb-4 flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full border-2 border-white/10" />

                      <div className="absolute h-16 w-16 rounded-full border-2 border-t-[#d87aff] border-r-[#d87aff]/50 border-b-transparent border-l-transparent animate-spin shadow-[0_0_20px_rgba(216,122,255,0.4)]" />

                      <div className="absolute font-mono text-base font-black text-white">
                        {displayProgress}%
                      </div>
                    </div>

                    <div className="text-xs font-bold text-white tracking-wide mb-1">
                      Interactive 3D Desk
                    </div>

                    <div className="text-[11px] font-mono text-zinc-400 mb-3 truncate w-full">
                      {displayProgress < 100
                        ? "Downloading model..."
                        : "Finalizing scene..."}
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-violet-500 via-[#d87aff] to-cyan-400 rounded-full transition-all duration-200 ease-out shadow-[0_0_10px_rgba(216,122,255,0.6)]"
                        style={{
                          width: `${Math.max(5, displayProgress)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 3D Scene */}
              <Canvas
                className="w-full h-full cursor-grab active:cursor-grabbing"
                gl={{
                  antialias: true,
                  alpha: true,
                  powerPreference: "high-performance",
                }}
                dpr={[1, 2]}
                shadows={false}
                camera={{
                  position: [50, 25, 50],
                  fov: 50,
                }}
              >
                <ambientLight intensity={0.5} />

                <directionalLight position={[8, 10, 8]} intensity={1.1} />

                <pointLight
                  position={[-10, 2, -10]}
                  intensity={0.4}
                  color="#d87aff"
                />

                <Suspense fallback={null}>
                  <DeskModel onLoaded={handleModelLoaded} />
                </Suspense>

                {modelObject && (
                  <CameraFit
                    object={modelObject}
                    controlsRef={controlsRef}
                    isPortrait={isPortrait}
                  />
                )}

                <OrbitControls
                  ref={controlsRef}
                  enablePan={false}
                  enableZoom={false}
                  minPolarAngle={Math.PI / 6}
                  maxPolarAngle={Math.PI / 2}
                  rotateSpeed={0.8}
                />
              </Canvas>

              {/* Interaction Hint */}
              {isModelReady && !showLoader && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3.5 py-1 text-[10px] sm:text-[11px] font-mono text-zinc-300 backdrop-blur-md shadow-lg animate-in fade-in duration-500">
                  <span className="text-[#d87aff] animate-pulse">✦</span>
                  <span>Drag to rotate 3D desk</span>
                  <span className="text-[#d87aff] animate-pulse">✦</span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: SOCIAL LINKS */}
          <aside
            aria-label="Social links"
            className="hero-socials flex flex-row lg:flex-col items-center justify-center gap-4 bg-white/4 border border-white/10 p-2.5 rounded-full backdrop-blur-xl shadow-2xl shrink-0"
          >
            {socials.map((s) => (
              <a
                key={s.alt}
                href={s.href}
                {...(s.external
                  ? {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {})}
                className="p-2 rounded-full hover:bg-white/10 transition-all hover:scale-110 active:scale-95"
                title={s.title}
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  className="w-6 h-6 object-contain"
                />
              </a>
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Hero;
