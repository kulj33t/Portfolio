import React, { useEffect, useState, useMemo } from "react";

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

const FloatingBackground: React.FC<{
  iconPositions: Position2D[];
  isPortrait: boolean;
}> = ({ iconPositions, isPortrait }) => {
  const iconSize = isPortrait ? 0.2 : 2.2;

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
          key={`icon-${i}`}
          src={`/icons/about/${i === 0 ? "coffee" : "mug"}.png`}
          position={{ ...pos, size: iconSize }}
          isPortrait={isPortrait}
        />
      ))}
    </div>
  );
};

const About: React.FC = () => {
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const iconPositions = useMemo<Position2D[]>(
    () =>
      isPortrait
        ? [
            { x: -10, y: -35 },
            { x: -10, y: 35 },
          ]
        : [
            { x: -40, y: 0 },
            { x: 30, y: 0 },
          ],
    [isPortrait]
  );

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <FloatingBackground iconPositions={iconPositions} isPortrait={isPortrait} />
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <h1 style={styles.greeting}>Hi there</h1>
          <p style={styles.text}>
            I’m Kuljeet Singh, a passionate web developer specializing in
            building beautiful and performant web applications using React and
            TypeScript. I love crafting clean, modern UI and enjoy solving
            complex problems with elegant code.
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
    padding: "1rem",
    boxSizing: "border-box",
  },
  container: {
    width: "50vw",
    minWidth: "300px",
    padding: "2vh",
    borderRadius: "1.6vh",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    color: "#ccc",
    boxShadow: "0 0.4vh 3vh rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
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
  },
  text: {
    fontSize: "clamp(0.8rem, 2vw + 1vh, 1.2rem)",
    lineHeight: 1.6,
    color: "#ddd",
  },
};

export default About;
