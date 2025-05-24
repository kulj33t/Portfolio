import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

const FloatingIcon: React.FC<{
  url: string;
  position: [number, number, number];
  size?: number;
}> = ({ url, position, size = 1.4 }) => {
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
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
};

const FloatingBackground = () => {
  const circlePositions = [
    [-5, 1.5, 0],
    [-5, -2, 0],
    [-6.5, -0.2, 0],
    [6, 1, 0],
    [4, 2, 0],
    [5,-1.8, 0],
  ];

  const circleSizes = [0.3, 0.7, 1];

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
        {/* Main Icons */}
        <FloatingIcon url="/icons/about/coffee.png" position={[-5, 0, 0]} />
        <FloatingIcon url="/icons/about/mug.png" position={[5, 0, 0]} />

        {/* Floating Circles */}
        {circlePositions.map((pos, index) => (
          <FloatingIcon
            key={`circle-${index}`}
            url="/icons/about/circle.png"
            position={pos as [number, number, number]}
            size={circleSizes[index % circleSizes.length]}
          />
        ))}
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
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },
  container: {
  width: "50vw",
  minWidth: "400px",
  minHeight: "200px",
  height: "30vh",
  padding: "2vh",
  borderRadius: "1.6vh",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  color: "#ccc",
  boxShadow: "0 0.4vh 3vh rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  display: "flex",
  flexDirection:"column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
},


  greeting: {
  fontFamily: "'Tenkai', sans-serif",
  fontSize: "clamp(1.5rem, 2vw + 1vh, 3rem)",
  marginBottom: "24px",
  color: "#fff",
  letterSpacing: "2px",
  textAlign: "center",
},
text: {
  fontSize: "clamp(1rem, 2vw + 1vh, 1.2rem)",
  lineHeight: 1.6,
  color: "#ddd",
  textAlign: "center",
}

};

export default About;
