import React, {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import * as THREE from "three";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, useProgress } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { DRACOLoader, GLTFLoader } from "three-stdlib";
import { PerspectiveCamera } from "three";

const MODEL_GLB = "/models/desk.glb";

// Draco decoder for the compressed desk.glb model.
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.5.7/",
);

const MODEL_SCALE = 1;
const MODEL_POSITION: [number, number, number] = [0, 0, 0];
const MODEL_ROTATION: [number, number, number] = [-0.1, -1.1, -0.1];

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

interface DeskModelProps {
  onLoaded: (object: THREE.Object3D) => void;
}

function DeskModel({ onLoaded }: DeskModelProps) {
  const gltf = useLoader(GLTFLoader, MODEL_GLB, (loader) => {
    loader.setDRACOLoader(dracoLoader);
  });
  const object = gltf.scene;
  const { gl } = useThree();

  useEffect(() => {
    const maxAnisotropy = gl.capabilities.getMaxAnisotropy();

    object.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = true;
      child.receiveShadow = true;

      // Improve texture sharpness when surfaces are viewed at an angle.
      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((material) => {
        Object.values(material).forEach((value) => {
          if (value instanceof THREE.Texture) {
            value.anisotropy = Math.min(8, maxAnisotropy);
          }
        });
      });
    });

    object.updateMatrixWorld(true);
    onLoaded(object);
  }, [object, onLoaded, gl]);

  return (
    <primitive
      object={object}
      scale={MODEL_SCALE}
      position={MODEL_POSITION}
      rotation={MODEL_ROTATION}
    />
  );
}

interface CameraFitProps {
  object: THREE.Object3D | null;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}

function CameraFit({ object, controlsRef }: CameraFitProps) {
  const { camera, size } = useThree();

  useEffect(() => {
    if (!object || size.width <= 0 || size.height <= 0) return;
    if (!(camera instanceof PerspectiveCamera)) return;

    object.updateMatrixWorld(true);

    const bounds = new THREE.Box3().setFromObject(object);
    if (bounds.isEmpty()) return;

    const center = bounds.getCenter(new THREE.Vector3());
    const sphere = bounds.getBoundingSphere(new THREE.Sphere());
    const radius = Math.max(sphere.radius, 0.001);

    const aspect = size.width / size.height;
    const verticalHalfFov = THREE.MathUtils.degToRad(camera.fov) / 2;
    const horizontalHalfFov = Math.atan(Math.tan(verticalHalfFov) * aspect);
    const limitingHalfFov = Math.max(
      0.01,
      Math.min(verticalHalfFov, horizontalHalfFov),
    );
    const distance = (radius / Math.sin(limitingHalfFov)) * 0.6;

    const direction = new THREE.Vector3(0.6, 0.35, 0.6).normalize();

    camera.position.copy(center).addScaledVector(direction, distance);
    camera.near = Math.max(distance / 1000, 0.001);
    camera.far = Math.max(distance * 100, 1000);
    camera.lookAt(center);
    camera.updateProjectionMatrix();

    if (controlsRef.current) {
      controlsRef.current.target.copy(center);
      controlsRef.current.update();
    }
  }, [object, camera, controlsRef, size.width, size.height]);

  return null;
}

interface ModelErrorBoundaryProps {
  onError: (error: Error) => void;
  children: React.ReactNode;
}

interface ModelErrorBoundaryState {
  hasError: boolean;
}

class ModelErrorBoundary extends Component<
  ModelErrorBoundaryProps,
  ModelErrorBoundaryState
> {
  state: ModelErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ModelErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

function LoadingOverlay({
  progress,
  fadingOut,
}: {
  progress: number;
  fadingOut: boolean;
}) {
  return (
    <div
      aria-live="polite"
      className={`absolute inset-0 z-30 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md transition-opacity duration-500 ${
        fadingOut ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-55 rounded-2xl border border-white/10 bg-white/4 p-5 text-center shadow-2xl">
        <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-r-[#d87aff]/50 border-t-[#d87aff] border-b-transparent border-l-transparent shadow-[0_0_20px_rgba(216,122,255,0.4)]" />
          <span className="font-mono text-sm font-black text-white">
            {progress}%
          </span>
        </div>

        <p className="mb-1 text-xs font-bold tracking-wide text-white">
          Interactive 3D Desk
        </p>
        <p className="mb-3 truncate font-mono text-[11px] text-zinc-400">
          {progress < 100 ? "Downloading model..." : "Finalizing scene..."}
        </p>

        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="Loading 3D model"
        >
          <div
            className="h-full rounded-full bg-linear-to-r from-violet-500 via-[#d87aff] to-cyan-400 transition-[width] duration-200"
            style={{ width: `${Math.max(5, progress)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

const Hero: React.FC = () => {
  const [modelObject, setModelObject] = useState<THREE.Object3D | null>(null);
  const [isModelReady, setIsModelReady] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [modelError, setModelError] = useState<string | null>(null);
  const [webgl2Available, setWebgl2Available] = useState<boolean | null>(null);

  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const { progress } = useProgress();

  // Three.js r176 requires WebGL2. Check before mounting <Canvas> so browsers
  // without WebGL2 never attempt to create a Three.js renderer.
  useEffect(() => {
    const canvas = document.createElement("canvas");
    let context: WebGL2RenderingContext | null = null;

    try {
      context = canvas.getContext("webgl2", {
        failIfMajorPerformanceCaveat: false,
      });
    } catch {
      context = null;
    }

    setWebgl2Available(Boolean(context));
    context?.getExtension("WEBGL_lose_context")?.loseContext();
  }, []);

  const displayProgress = Number.isFinite(progress)
    ? Math.min(100, Math.max(0, Math.round(progress)))
    : 0;

  const handleModelLoaded = useCallback((object: THREE.Object3D) => {
    setModelObject(object);
    setIsModelReady(true);
    setModelError(null);
  }, []);

  const handleModelError = useCallback((error: Error) => {
    console.error(
      `Unable to load ${MODEL_GLB}. Check that the file exists in public/models and that the deployed URL returns HTTP 200.`,
      error,
    );
    setModelError(
      "The 3D preview could not be loaded. Please refresh the page.",
    );
  }, []);

  useEffect(() => {
    if (!isModelReady) return;

    setIsFadingOut(true);
    const timer = window.setTimeout(() => setShowLoader(false), 500);

    return () => window.clearTimeout(timer);
  }, [isModelReady]);

  useEffect(() => {
    if (webgl2Available !== true || isModelReady || modelError) return;

    const timer = window.setTimeout(() => {
      setModelError(
        "The 3D model is taking too long to load. Check your connection and try refreshing.",
      );
    }, 45000);

    return () => window.clearTimeout(timer);
  }, [webgl2Available, isModelReady, modelError]);

  return (
    <main className="hero-root relative isolate flex min-h-svh w-full items-center justify-center overflow-x-clip bg-black font-sans text-white selection:bg-[#d87aff]/30 selection:text-white">
      <style>{`
  @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&display=swap");

  /*
   * OUTER CONTAINER
   * Always maintains approximately 5% margin on both sides.
   */

  .hero-shell {
    width: 90%;
    max-width: none;
    margin-inline: auto;
    padding: clamp(104px, 13svh, 144px) 0 48px;
    box-sizing: border-box;
    container-type: inline-size;
    container-name: hero;
  }

  /*
   * DEFAULT LAYOUT
   * Stacked when there is insufficient horizontal space.
   */

  .hero-layout {
    display: flex;
    width: 100%;
    min-width: 0;
    flex-direction: column;
    align-items: center;
    gap: clamp(28px, 5svh, 48px);
  }

  .hero-identity {
    width: 100%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .hero-name {
    max-width: 100%;
    margin: 0 0 clamp(22px, 4svh, 34px);
    font-family: "Nunito", "Arial Rounded MT Bold", ui-rounded, system-ui, sans-serif;
    font-size: clamp(2.35rem, 8.2vw, 5.4rem);
    font-weight: 900;
    line-height: .91;
    letter-spacing: clamp(1px, .28vw, 3px);
    white-space: nowrap;
    user-select: none;
  }

  .hero-name span {
    display: block;
  }

  .hero-showcase {
    display: flex;
    width: 100%;
    min-width: 0;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .hero-canvas-frame {
    position: relative;
    width: 100%;
    max-width: 760px;
    min-width: 0;
    height: clamp(270px, 43svh, 460px);
    overflow: hidden;
    border: 1px solid rgba(255,255,255,.10);
    border-radius: 22px;
    background: linear-gradient(
      180deg,
      rgba(255,255,255,.035),
      rgba(255,255,255,0)
    );
    box-shadow: 0 20px 80px rgba(0,0,0,.25);
    isolation: isolate;
  }

  /*
   * SOCIAL LINKS
   */

  .hero-socials {
    display: flex;
    flex: 0 0 auto;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px;
    border: 1px solid rgba(255,255,255,.10);
    border-radius: 999px;
    background: rgba(255,255,255,.04);
    box-shadow: 0 20px 60px rgba(0,0,0,.25);
    backdrop-filter: blur(18px);
  }

  .hero-social-link {
    display: flex;
    width: 42px;
    height: 42px;
    flex: 0 0 42px;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    transition: background .2s ease, transform .2s ease;
  }

  .hero-social-link img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }

  .hero-social-link:hover {
    transform: translateY(-2px);
    background: rgba(255,255,255,.10);
  }

  .hero-social-link:focus-visible,
  .hero-cta:focus-visible {
    outline: 2px solid #d87aff;
    outline-offset: 3px;
  }

  /*
   * CTA BUTTON
   */

  .hero-cta {
    display: inline-flex;
    min-height: 46px;
    align-items: center;
    justify-content: center;
    padding: 0 26px;
    border: 1px solid rgba(255,255,255,.20);
    border-radius: 999px;
    background: rgba(255,255,255,.03);
    color: white;
    font-size: 13px;
    font-weight: 650;
    letter-spacing: .02em;
    backdrop-filter: blur(12px);
    transition:
      background .2s ease,
      border-color .2s ease,
      transform .2s ease;
  }

  .hero-cta:hover {
    border-color: rgba(255,255,255,.42);
    background: rgba(255,255,255,.09);
  }

  /*
   * SMALL PHONES
   */

  @media (max-width: 380px) {
    .hero-name {
      font-size: clamp(2.1rem, 9vw, 2.6rem);
      letter-spacing: 1px;
    }

    .hero-canvas-frame {
      height: clamp(250px, 40svh, 360px);
      border-radius: 18px;
    }
  }

  /*
   * PORTRAIT TABLETS
   * Remain stacked.
   */

  @media (min-width: 700px) and (orientation: portrait) {
    .hero-name {
      font-size: clamp(4rem, 7.2vw, 5.8rem);
    }

    .hero-canvas-frame {
      height: clamp(360px, 43svh, 500px);
    }
  }

  /*
   * LANDSCAPE + ENOUGH AVAILABLE WIDTH
   *
   * Container query checks the actual inner container width,
   * not just the device viewport.
   *
   * If there is enough room, switch to inline.
   * Otherwise, retain the stacked layout.
   */

  @container hero (min-width: 960px) {

    .hero-layout {
      display: grid;
      grid-template-columns:
        minmax(260px, .78fr)
        minmax(540px, 1.22fr);
      align-items: center;
      column-gap: clamp(20px, 3vw, 60px);
      row-gap: 0;
    }

    .hero-identity {
      min-width: 0;
      align-items: flex-start;
      text-align: left;
    }

    .hero-name {
      margin-bottom: clamp(20px, 4vh, 34px);
      font-size: clamp(2.5rem, 5.1vw, 6.4rem);
      letter-spacing: clamp(1px, .22vw, 3px);
    }

    .hero-showcase {
      min-width: 0;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
    }

    /*
     * Canvas gets priority space but never
     * shrinks below its minimum width.
     */

    .hero-canvas-frame {
      width: 100%;
      min-width: 460px;
      max-width: 760px;
      height: clamp(300px, 54svh, 590px);
      flex: 1 1 0;
      border-radius: 26px;
    }

    /*
     * Social links move beside the canvas.
     */

    .hero-socials {
      flex: 0 0 auto;
      flex-direction: column;
      gap: 8px;
      padding: 8px;
    }

    .hero-shell .hero-social-link {
      width: 42px;
      height: 42px;
      flex-basis: 42px;
    }
  }

  /*
   * SHORT LANDSCAPE SCREENS
   * Compact sizing without forcing the layout inline.
   */

  @media (orientation: landscape) and (max-height: 500px) {

    .hero-shell {
      padding-top: 76px;
      padding-bottom: 24px;
    }

    .hero-name {
      font-size: clamp(2.2rem, 4.5vw, 4.5rem);
      margin-bottom: 20px;
    }

    .hero-canvas-frame {
      height: 58svh;
      border-radius: 18px;
    }
  }

  /*
   * SHORT LANDSCAPE + INLINE LAYOUT
   */

  @container hero (min-width: 960px) {

    @media (max-height: 500px) {

      .hero-canvas-frame {
        height: 58svh;
        min-height: 240px;
      }

      .hero-socials {
        gap: 4px;
        padding: 5px;
      }

      .hero-social-link {
        width: 34px;
        height: 34px;
        flex-basis: 34px;
      }

      .hero-social-link img {
        width: 20px;
        height: 20px;
      }
    }
  }

  /*
   * ACCESSIBILITY
   */

  @media (prefers-reduced-motion: reduce) {
    .hero-social-link,
    .hero-cta {
      transition: none;
    }
  }
`}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[32%] h-[min(90vw,850px)] w-[min(90vw,850px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d87aff]/[0.08] blur-[130px]"
      />

      <div className="hero-shell relative z-10">
        <div className="hero-layout">
          {/* GROUP 1: IDENTITY */}
          <section className="hero-identity">
            <h1 className="hero-name text-white">
              <span>KULJEET</span>
              <span>SINGH</span>
            </h1>

            <a href="#Project" className="hero-cta">
              View Projects
            </a>
          </section>

          {/* GROUP 2: CANVAS + SOCIALS */}
          <section
            className="hero-showcase"
            aria-label="Interactive desk and social links"
          >
            <div className="hero-canvas-frame">
              {webgl2Available === null ? (
                <div
                  className="absolute inset-0"
                  aria-label="Checking 3D support"
                />
              ) : webgl2Available ? (
                <ModelErrorBoundary onError={handleModelError}>
                  <Canvas
                    className="h-full w-full cursor-grab active:cursor-grabbing"
                    style={{ touchAction: "pan-y" }}
                    gl={{
                      antialias: true,
                      alpha: true,
                      powerPreference: "high-performance",
                      failIfMajorPerformanceCaveat: false,
                    }}
                    // Render at native DPR on standard screens and up to 2x on
                    // high-density displays for sharper edges and textures.
                    dpr={[1, 2]}
                    shadows={false}
                    camera={{
                      position: [50, 25, 50],
                      fov: 50,
                      near: 0.01,
                      far: 10000,
                    }}
                    onCreated={({ gl }) => {
                      gl.setClearColor(0x000000, 0);
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
                      />
                    )}

                    <OrbitControls
                      ref={controlsRef}
                      enablePan={false}
                      enableZoom={false}
                      minPolarAngle={Math.PI / 6}
                      maxPolarAngle={Math.PI / 2}
                      rotateSpeed={0.8}
                      enableDamping
                      dampingFactor={0.06}
                    />
                  </Canvas>
                </ModelErrorBoundary>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 p-6 text-center">
                  <p className="max-w-xs text-sm text-zinc-400">
                    3D preview is not supported by this browser. You can still
                    explore the portfolio.
                  </p>
                </div>
              )}

              {webgl2Available && showLoader && !modelError && (
                <LoadingOverlay
                  progress={displayProgress}
                  fadingOut={isFadingOut}
                />
              )}

              {webgl2Available && modelError && (
                <div
                  role="alert"
                  className="absolute inset-0 z-30 flex items-center justify-center bg-black/90 p-5 text-center backdrop-blur-md"
                >
                  <div className="max-w-xs">
                    <p className="mb-2 text-sm font-semibold text-white">
                      3D preview unavailable
                    </p>
                    <p className="text-xs leading-relaxed text-zinc-400">
                      {modelError}
                    </p>
                  </div>
                </div>
              )}

              {webgl2Available &&
                isModelReady &&
                !showLoader &&
                !modelError && (
                  <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 flex max-w-[calc(100%-1.5rem)] -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-black/60 px-3 py-1.5 font-mono text-[9px] text-zinc-300 shadow-lg backdrop-blur-md sm:text-[11px]">
                    <span className="text-[#d87aff]" aria-hidden="true">
                      ✦
                    </span>
                    <span>Drag to rotate 3D desk</span>
                    <span className="text-[#d87aff]" aria-hidden="true">
                      ✦
                    </span>
                  </div>
                )}
            </div>

            <aside className="hero-socials" aria-label="Social links">
              {socials.map((social) => (
                <a
                  key={social.alt}
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                  aria-label={social.title}
                  title={social.title}
                  className="hero-social-link"
                >
                  <img
                    src={social.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              ))}
            </aside>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Hero;
