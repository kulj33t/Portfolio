import React from "react";

const Header: React.FC = () => {
  return (
    <header style={styles.container}>
      <div style={styles.leftBlock}>
        {/* Japanese Name — Adjust as needed */}
        <h1 style={styles.jpTitle}>ロリンジャ レノー</h1>

        {/* English Subheading */}
        <p style={styles.subHeading}>FRENCH CREATIVE DEVELOPER IN JAPAN</p>

        {/* Description */}
        <p style={styles.description}>
          My main objective is to make cool webGL websites accessible for everyone on the internet.
        </p>
      </div>

      {/* Social Buttons — Replace links with your own */}
      <div style={styles.socialLinks}>
        <a href="mailto:your-email@example.com" style={styles.socialButton}>✉️</a>
        <a href="https://github.com/your-username" target="_blank" style={styles.socialButton}>🐙</a>
        <a href="https://linkedin.com/in/your-profile" target="_blank" style={styles.socialButton}>💼</a>
      </div>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "relative",
    height: "100vh",
    padding: "80px 60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    color: "#111",
  },
  leftBlock: {
    maxWidth: "60%",
  },
  jpTitle: {
    fontSize: "64px",
    fontWeight: "900",
    marginBottom: "10px",
  },
  subHeading: {
    fontSize: "14px",
    letterSpacing: "1px",
    marginBottom: "20px",
  },
  description: {
    fontSize: "16px",
    color: "#444",
    lineHeight: "1.6",
  },
  socialLinks: {
    position: "absolute",
    top: "50%",
    right: "20px",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  socialButton: {
    fontSize: "20px",
    textDecoration: "none",
    color: "#000",
    transition: "transform 0.2s ease",
  },
};

export default Header;
