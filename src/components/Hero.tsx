import React from "react";

const Hero: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.leftBlock}>
        <h1 style={styles.title}>KULJEET</h1>
        <h1 style={styles.title}>SINGH</h1>
      </div>

      <div style={styles.socialLinks}>
        <a href="mailto:kuljeet.singh.dev@gmail.com" style={styles.socialButton}>
          <img src="/icons/social/email.png" alt="Email" style={styles.iconImage} />
        </a>

        <a
          href="https://github.com/kulj33t"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.socialButton}
        >
          <img src="/icons/social/github.png" alt="GitHub" style={styles.iconImage} />
        </a>

        <a
          href="https://linkedin.com/in/kulj33t"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.socialButton}
        >
          <img src="/icons/social/linkedin.png" alt="LinkedIn" style={styles.iconImage} />
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
    justifyContent: "flex-start",
    padding: "0 5vw",
    color: "#fff",
    background: "transparent",
  },
  leftBlock: {
    position: "absolute",
    bottom: "5vh",
    left: "5vw",
    minWidth:"300px"
  },
  title: {
    fontSize: "clamp(6rem, 8vw, 12rem)",
    fontWeight: 900,
    marginBottom: "1vh",
    fontFamily: "'Tenkai', sans-serif",
    letterSpacing: "3px",
    color: "#fff",
    lineHeight: 1,
  },
  socialLinks: {
    position: "absolute",
    top: "50%",
    right: "3vw",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: "clamp(16px, 2vh, 32px)",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: "1vh",
    borderRadius: "1vh",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  },
  socialButton: {
    display: "inline-block",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  iconImage: {
    width: "clamp(20px, 2vw, 32px)",
    height: "clamp(20px, 2vw, 32px)",
    objectFit: "contain",
  },
};

export default Hero;
