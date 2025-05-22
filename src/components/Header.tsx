import React from "react";

const Header: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.leftBlock}>
        <h1 style={styles.jpTitle}>KULJEET</h1>
        <h1 style={styles.jpTitle}>SINGH</h1>

        <p style={styles.subHeading}>CREATIVE DEVELOPER IN INDIA</p>

        <p style={styles.description}>
          My main objective is to make cool webGL websites accessible for everyone on the internet.
        </p>
      </div>

      <div style={styles.socialLinks}>
        <a href="mailto:your-email@example.com" style={styles.socialButton}>✉️</a>
        <a href="https://github.com/your-username" target="_blank" style={styles.socialButton}>🐙</a>
        <a href="https://linkedin.com/in/your-profile" target="_blank" style={styles.socialButton}>💼</a>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "5vh",
    position: "relative",
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  leftBlock: {
    flex: "1",
    maxWidth: "60%",
    minWidth: "60%",
  },
  jpTitle: {
  fontSize: "94px",
  fontWeight: "900",
  marginBottom: "10px",
  fontFamily: "'Shippori Mincho', 'Noto Serif JP', 'Yu Mincho', 'Georgia', serif",
  letterSpacing: "3px",
},
  subHeading: {
    fontSize: "14px",
    letterSpacing: "1px",
    marginBottom: "20px",
  },
  description: {
    fontSize: "16px",
    color: "#333",
    lineHeight: "1.6",
  },
  socialLinks: {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    alignItems: "center",
  },
  socialButton: {
    textDecoration: "none",
    color: "#000",
    fontSize: "24px",
    transition: "transform 0.2s ease",
  },
};

export default Header;