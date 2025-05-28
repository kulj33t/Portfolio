import React, { useState, useEffect } from "react";

type Position2D = { x: number; y: number; size?: number };

const FloatingIcon: React.FC<{
  src: string;
  position: Position2D;
  isPortrait: boolean;
}> = ({ src, position, isPortrait }) => {
  const [offsetY, setOffsetY] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      const floatY = 10 * Math.sin((elapsed / 3000) * 2 * Math.PI + position.x);
      const rotZ = 6 * Math.sin((elapsed / 3000) * 2 * Math.PI + position.x);

      setOffsetY(floatY);
      setRotation(rotZ);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position.x]);

  const vwSize = position.size ? position.size * 5 : 5;

  const sizeClamp = {
    min: isPortrait ? 120 : 120,
    max: isPortrait ? 150 : 180,
  };

  const width = `clamp(${sizeClamp.min}px, ${vwSize}vw, ${sizeClamp.max}px)`;
  const height = width;

  return (
    <img
      src={src}
      alt=""
      style={{
        position: "absolute",
        top: `calc(50vh + ${position.y}vh - 3vh)`,
        left: `calc(50vw + ${position.x}vw)`,
        width,
        height,
        transform: `translateY(${offsetY}px) rotate(${rotation}deg)`,
        userSelect: "none",
        pointerEvents: "none",
      }}
      draggable={false}
    />
  );
};

const FloatingBackgroundEdu: React.FC = () => {
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isPortrait) return null;

  const iconPositions: Position2D[] = [
    { x: -38, y: 24, size:3 },   // tools
    { x: -42, y: -28, size: 4  }, // books
    { x: 30, y: 24, size: 3 },    // hat
    { x: 30, y: -22, size: 1 },  // certificate
  ];

  const iconSrcs = [
    "/icons/edu/tools.png",
    "/icons/edu/books.png",
    "/icons/edu/hat.png",
    "/icons/edu/certificate.png",
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      {iconPositions.map((pos, i) => (
        <FloatingIcon
          key={`edu-icon-${i}`}
          src={iconSrcs[i]}
          position={pos}
          isPortrait={isPortrait}
        />
      ))}
    </div>
  );
};

const TimelineItem: React.FC<{ year: string; title: string; description: string }> = ({
  year,
  title,
  description,
}) => (
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
      year="2023 - 2027"
      title="B.Tech in Information Technology"
      description="Currently pursuing B.Tech from BIT Sindri with a focus on software development and data structures."
    />
    <TimelineItem
      year="2022"
      title="Intermediate"
      description="Completed from JNV Basohli, Kathua (J&K), with a focus on science and mathematics."
    />
    <TimelineItem
      year="2020"
      title="Matriculation"
      description="Completed from JNV Basohli, Kathua (J&K), with a focus on core academic subjects."
    />
  </div>
</div>

<div style={styles.timelineSection}>
  <h2 style={styles.sectionTitle}>Experience</h2>
  <div style={styles.timeline}>
    <TimelineItem
      year="May 2025"
      title="Finalist at HACKATRON, HNCC BIT Sindri"
      description="Competed in a highly competitive hackathon, showcasing problem-solving skills and innovation in software development."
    />
    <TimelineItem
      year="2025"
      title="Internship"
      description="Details of internship responsibilities and projects will be provided soon."
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
    padding: "2rem",
    boxSizing: "border-box",
  },
  container: {
    width: "50vw",
    height: "80vh",
    minWidth: "350px",
    minHeight: "200px",
    padding: "2vh",
    borderRadius: "1.6vh",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    color: "#ccc",
    boxShadow: "0 0.4vh 3vh rgba(0, 0, 0, 0.1)",
    overflow: "scroll",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    textAlign: "left",
  },
  heading: {
    fontFamily: "'Tenkai', sans-serif",
    fontSize: "clamp(1.5rem, 2vw + 1vh, 3rem)",
    marginBottom: "3vh",
    color: "#fff",
    letterSpacing: "2px",
    textAlign: "center",
    width: "100%",
  },
  sectionTitle: {
    fontSize: "clamp(1.2rem, 1.8vw + 1vh, 2rem)",
    color: "#fff",
    marginBottom: "3vh",
    fontFamily: "'Tenkai', sans-serif",
  },
  timelineSection: {
    marginBottom: "1vh",
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
    paddingLeft: "10px",
  },
  itemTitle: {
    fontSize: "clamp(1.2rem, 1.2vw + 1vh, 1.4rem)",
    color: "#fff",
    marginBottom: "0.5vh",
  },
  itemYear: {
    fontSize: "clamp(0.9rem, 1vw + 0.5vh, 1rem)",
    color: "#aaa",
    marginBottom: "1vh",
    display: "block",
  },
  itemDescription: {
    fontSize: "clamp(0.9rem, 1vw + 0.5vh, 1rem)",
    lineHeight: 1.6,
    color: "#ddd",
    textAlign: "left",
  },
};

export default EduExp;
