import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

const FloatingIcon: React.FC<{ url: string; position: [number, number, number] }> = ({ url, position }) => {
  const ref = useRef<THREE.Mesh>(null!);
  const texture = useTexture(url);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.2;
      ref.current.rotation.z = Math.sin(t + position[0]) * 0.1;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={[1.4, 1.4]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
};

const FloatingBackground = () => {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
      }}
      camera={{ position: [0, 0, 5], fov: 75 }}
    >
      <ambientLight />
      <Suspense fallback={null}>
        <FloatingIcon url="/icons/coffee.png" position={[-5, 0, 0]} />
        <FloatingIcon url="/icons/mug.png" position={[5, 0, 0]} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
};

const About: React.FC = () => {
  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <FloatingBackground />
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <h1 style={styles.greeting}>Hi there</h1>
          <p style={styles.text}>
            I’m Kuljeet Singh, a passionate web developer specializing in building beautiful and performant web applications using React and TypeScript.
            I love crafting clean, modern UI and enjoy solving complex problems with elegant code.
          </p>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },
  container: {
    width: "90%",
    maxWidth: "700px",
    padding: "40px",
    borderRadius: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    color: "#ccc",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  },
  greeting: {
    fontFamily: "'Tenkai', sans-serif",
    fontSize: "42px",
    marginBottom: "24px",
    color: "#fff",
    letterSpacing: "2px",
    textAlign: "center",
  },
  text: {
    fontSize: "18px",
    lineHeight: 1.6,
    color: "#ddd",
    textAlign: "center",
  },
};

export default About;
