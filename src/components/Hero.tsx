import React, { useState, useEffect } from "react";

const Hero: React.FC = () => {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dynamicTitleStyle: React.CSSProperties = {
    fontSize: isPortrait ? "6rem" : "10rem",
  };

  const dynamicIconStyle: React.CSSProperties = {
    width: isPortrait ? "24px" : "32px",
    height: isPortrait ? "24px" : "32px",
  };

  return (
    <div style={styles.container}>

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
          ...(isPortrait ? styles.socialLinksPortrait : styles.socialLinksLandscape),
        }}
      >
        <a href="mailto:kuljeet.singh.dev@gmail.com" style={styles.socialButton}>
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

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "relative",
    height: "100vh",
    width: "100vw",
    fontFamily: "'Tenkai', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 5vw",
    color: "#fff",
    background: "transparent",
  },

  leftBlock: {
    position: "absolute",
    minWidth: "300px",
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
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  iconImage: {
    objectFit: "contain",
  },
};

export default Hero;
