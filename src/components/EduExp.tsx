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

const FloatingBackgroundEdu = () => {

 const iconData: { url: string; position: [number, number, number] }[] = [
   { url: "/icons/edu/tools.png", position: [-5, 1.5, 0] },
   { url: "/icons/edu/books.png", position: [-5, -2, 0] },
  { url: "/icons/edu/hat.png", position: [5, 1.5, 0] },
  { url: "/icons/edu/certificate.png", position: [5, -2, 0] },
];


  // const iconPositions = [
  //   [-5, 1.5, 0],
  //   [-5, -2, 0],
  //   [-6.5, -0.2, 0],
  //   [6, 1, 0],
  //   [4, 2, 0],
  //   [5, -1.8, 0],
  // ];

  // const circleSizes = [0.4, 0.6, 1];

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

       {iconData.map((icon, index) => (
  <FloatingIcon
    key={`edu-icon-${index}`}
    url={icon.url}
    position={icon.position as [number, number, number]}
    size={1.5}
  />
))}


        {/* {iconPositions.map((pos, index) => (
          <FloatingIcon
            key={`circle-${index}`}
            url="/icons/about/circle.png"
            position={pos as [number, number, number]}
            size={circleSizes[index % circleSizes.length]}
          />
        ))} */}
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
};

const TimelineItem: React.FC<{ year: string; title: string; description: string }> = ({ year, title, description }) => (
  <div style={styles.timelineItem}>
    <div style={styles.timelineDot}></div>
    <div style={styles.timelineContent}>
      <h3 style={styles.itemTitle}>{title}</h3>
      <time style={styles.itemYear}>{year}</time>
      <p style={styles.itemDescription}>{description}</p>
    </div>
  </div>
);

const EduExp: React.FC = () => {
  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <FloatingBackgroundEdu />
      <div style={styles.wrapper}>
        <section style={styles.container}>
          <h1 style={styles.heading}>Education & Experience</h1>

          <div style={styles.timelineSection}>
            <h2 style={styles.sectionTitle}>Education</h2>
            <div style={styles.timeline}>
              <TimelineItem
                year="2023"
                title="Bachelor's in Computer Science"
                description="Graduated with honors from XYZ University."
              />
              <TimelineItem
                year="2021"
                title="High School Diploma"
                description="Focused on science and mathematics with top academic performance."
              />
            </div>
          </div>

          <div style={styles.timelineSection}>
            <h2 style={styles.sectionTitle}>Experience</h2>
            <div style={styles.timeline}>
              <TimelineItem
                year="2025"
                title="Internship at LITTLE LTD."
                description="Built interactive web interfaces using React and TypeScript."
              />
            </div>
          </div>
        </section>
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
  height: "auto",
  padding: "2vh",
  borderRadius: "1.6vh",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  color: "#ccc",
  boxShadow: "0 0.4vh 3vh rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start", // Updated
  justifyContent: "flex-start", // Updated
  textAlign: "left", // Updated
},
heading: {
  fontFamily: "'Tenkai', sans-serif",
  fontSize: "clamp(1.5rem, 2vw + 1vh, 3rem)",
  marginBottom: "2vh",
  color: "#fff",
  letterSpacing: "2px",
  textAlign: "center", // Keep heading centered
  width: "100%", // To center properly inside container
},

sectionTitle: {
  fontSize: "clamp(1.2rem, 1.8vw + 1vh, 2rem)",
  color: "#fff",
  marginBottom: "2vh",
  fontFamily: "'Tenkai', sans-serif",
},
timelineSection: {
  marginBottom: "3vh",
  width: "100%",
},
timeline: {
  borderLeft: "2px solid #ccc",
  paddingLeft: "30px",
  position: "relative",
},
timelineItem: {
  position: "relative",
  marginBottom: "40px",
},
timelineDot: {
  position: "absolute",
  left: "-40px",
  top: "0",
  width: "18px",
  height: "18px",
  backgroundColor: "#fff",
  borderRadius: "50%",
  border: "3px solid #fff",
},
timelineContent: {
  paddingLeft: "20px",
},
itemTitle: {
  fontSize: "clamp(1rem, 1.2vw + 1vh, 1.4rem)",
  color: "#fff",
  marginBottom: "0.5vh",
},
itemYear: {
  fontSize: "clamp(0.8rem, 1vw + 0.5vh, 1rem)",
  color: "#aaa",
  marginBottom: "1vh",
  display: "block",
},
itemDescription: {
  fontSize: "clamp(0.9rem, 1vw + 0.5vh, 1.1rem)",
  lineHeight: 1.6,
  color: "#ddd",
  textAlign: "left", // Updated
}
};


export default EduExp;
