import React, { useState, useEffect, useRef, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useProgress } from "@react-three/drei";
import { GLTFLoader } from "three-stdlib";
import { PerspectiveCamera } from "three";

const MODEL_GLB = "/models/desk.glb";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center style={{ color: "#fff", fontSize: 16 }}>
      {Math.round(progress)}%
    </Html>
  );
}

interface DeskModelProps {
  isPortrait: boolean;
  onLoaded?: (obj: THREE.Object3D) => void;
}

function DeskModel({ isPortrait, onLoaded }: DeskModelProps) {
  const gltf = useLoader(GLTFLoader, MODEL_GLB);
  const object = gltf.scene;

  useEffect(() => {
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
  const pos: [number, number, number] = isPortrait ? [0, 0, 0] : [0, 0, 0];
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

  useEffect(() => {
    if (!object) return;

    if (!(camera instanceof PerspectiveCamera)) {
      console.warn("CameraFit: camera is not a PerspectiveCamera, skipping fit.");
      return;
    }

    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = (camera.fov * Math.PI) / 180;
    let dist = Math.abs(maxDim / (2 * Math.tan(fov / 2)));
    dist *= extraFactor;
    const newPos = new THREE.Vector3(
      center.x + dist * 0.6,
      center.y + dist * 0.35,
      center.z + dist * 0.6
    );
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
  const [isPortrait, setIsPortrait] = useState(false);
  const [modelObject, setModelObject] = useState<THREE.Object3D | null>(null);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    const checkOrientation = () => {
      const portrait = window.innerHeight >= window.innerWidth;
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

  const dynamicTitleStyle = { fontSize: isPortrait ? "4rem" : "8rem" };
  const dynamicIconStyle = {
    width: isPortrait ? "24px" : "32px",
    height: isPortrait ? "24px" : "32px",
  };
  const canvasStyle = isPortrait ? styles.canvasPortrait : styles.canvasLandscape;

  return (
    <div style={styles.container}>
      <div style={{ ...styles.canvasWrapper, ...canvasStyle }}>
        <Canvas
          style={{ width: "100%", height: "100%", background: "none" }}
          gl={{ antialias: true, alpha: true }}
          shadows={false}
          camera={{ position: [0, 0, 0], fov: 50 }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[8, 10, 8]} intensity={0.9} />
          <pointLight position={[-10, 0, -10]} intensity={0.3} />
          <Suspense fallback={<Loader />}>
            <DeskModel
              key={isPortrait ? "portrait" : "landscape"}
              isPortrait={isPortrait}
              onLoaded={(o) => setModelObject(o)}
            />
          </Suspense>
          {modelObject && (
            <CameraFit
              object={modelObject}
              controlsRef={controlsRef}
              extraFactor={1.1}
            />
          )}
          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
            rotateSpeed={0.8}
            zoomSpeed={0.8}
          />
        </Canvas>
      </div>
      <div
        style={{
          ...styles.leftBlock,
          ...(isPortrait ? styles.leftBlockPortrait : styles.leftBlockLandscape),
        }}
      >
        <h1 style={{ ...styles.title, ...dynamicTitleStyle }}>KULJEET</h1>
        <h1 style={{ ...styles.title, ...dynamicTitleStyle }}>SINGH</h1>
      </div>
      <div
        style={{
          ...styles.socialLinks,
          ...(isPortrait
            ? styles.socialLinksPortrait
            : styles.socialLinksLandscape),
        }}
      >
        <a href="mailto:kulj33tsingh@gmail.com" style={styles.socialButton}>
          <img
            src="/icons/social/email.png"
            alt="Email"
            style={{ ...styles.iconImage, ...dynamicIconStyle }}
          />
        </a>
        <a
          href="https://github.com/kulj33t"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.socialButton}
        >
          <img
            src="/icons/social/github.png"
            alt="GitHub"
            style={{ ...styles.iconImage, ...dynamicIconStyle }}
          />
        </a>
        <a
          href="https://linkedin.com/in/kulj33t"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.socialButton}
        >
          <img
            src="/icons/social/linkedin.png"
            alt="LinkedIn"
            style={{ ...styles.iconImage, ...dynamicIconStyle }}
          />
        </a>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: "relative",
    minHeight: "100vh",
    width: "100vw",
    fontFamily: "'Tenkai', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 5vw",
    color: "#fff",
    background: "#000",
  },
  canvasWrapper: {
    position: "absolute",
    zIndex: 1,
    pointerEvents: "auto",
    willChange: "transform",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
  },
  canvasLandscape: {
    marginLeft: "30vw",
    width: "70vw",
    height: "100vh",
  },
  canvasPortrait: {
    left: "50%",
    transform: "translateX(-50%)",
    top: "14vh",
    width: "70vw",
    height: "36vh",
  },
  leftBlock: {
    position: "absolute",
    minWidth: "300px",
    zIndex: 3,
  },
  leftBlockLandscape: {
    bottom: "5vh",
    left: "5vw",
    textAlign: "left",
  },
  leftBlockPortrait: {
    bottom: "12vh",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
  },
  title: {
    fontWeight: 900,
    marginBottom: "1vh",
    fontFamily: "'Tenkai', sans-serif",
    letterSpacing: "3px",
    color: "#fff",
    lineHeight: 1,
  },
  socialLinks: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: "1vh",
    borderRadius: "1vh",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    display: "flex",
    gap: "24px",
    alignItems: "center",
    zIndex: 4,
  },
  socialLinksLandscape: {
    top: "50%",
    right: "3vw",
    transform: "translateY(-50%)",
    flexDirection: "column",
  },
  socialLinksPortrait: {
    bottom: "3vh",
    left: "50%",
    transform: "translateX(-50%)",
    flexDirection: "row",
  },
  socialButton: {
    display: "inline-block",
  },
  iconImage: {
    display: "block",
  },
};

export default Hero;
