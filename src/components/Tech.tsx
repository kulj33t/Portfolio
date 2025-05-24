import React, { useState, useEffect } from "react";
import TechStack from "./TechStack";

const Tech: React.FC = () => {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dynamicCardStyle: React.CSSProperties = {
    flexDirection: isPortrait ? "column" : "row",
    minWidth: isPortrait ? "350px" : "700px",
    maxWidth: isPortrait ? "350px" : "70vw",
    width: isPortrait ? "350px" : "60vw",
    height: isPortrait ? "660px" : "400px",
  };

  const dynamicLeftStyle: React.CSSProperties = {
    alignItems: isPortrait ? "center" : "flex-start",
    textAlign: isPortrait ? "center" : "left",
  };

  return (
    <div style={styles.wrapper}>
      <div style={{ ...styles.card, ...dynamicCardStyle }}>
        <div style={{ ...styles.left, ...dynamicLeftStyle }}>
          <h2 style={styles.heading}>Front-End & UI/UX Developer</h2>
          <p style={styles.text}>
            I specialize in designing and building modern, user-centric websites and applications. I love using tools
            like React, TypeScript, and Three.js to bring interfaces to life with clean, performant code.
          </p>
        </div>
        <div style={styles.right}>
          <TechStack />
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    display: "flex",
    borderRadius: "1.6vh",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    boxShadow: "0 0.4vh 3vh rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    transition: "min-width 0.3s ease, max-width 0.3s ease, flex-direction 0.3s ease",
  },
  left: {
    flex: 1,
    padding: "4vh 4vw",
    color: "#ccc",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  heading: {
    fontSize: "clamp(1.8rem, 2vw + 1vh, 2.4rem)",
    marginBottom: "2vh",
    fontFamily: "'Tenkai', sans-serif",
    color: "#fff",
    letterSpacing: "1px",
  },
  text: {
    fontSize: "clamp(0.9rem, 1vw + 0.4vh, 1.1rem)",
    lineHeight: 1.6,
    color: "#ddd",
  },
  right: {
    minWidth: "350px",
    maxWidth: "350px",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Tech;
