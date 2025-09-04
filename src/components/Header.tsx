import React from "react";

const Header: React.FC = () => {
  return (
    <div style={styles.wrapper}>
      <header style={styles.container}>
        <a href="#hero" style={styles.logo}>KS</a>
        <nav style={styles.nav}>
          <a href="#about" style={styles.link}>ABOUT</a>
          <a href="#footer" style={styles.link}>LET'S CONNECT</a>
        </nav>
      </header>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    position: "fixed",
    top: "2vh",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 100,
    width: "clamp(280px, 60vw, 800px)",
    borderRadius: "1.2vh",
    overflow: "hidden",
  },
  container: {
    width: "100%",
    padding: "1.2vh 2.4vw",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    color: "#ccc",
  },
  logo: {
    fontFamily: "'Tenkai', sans-serif",
    fontSize: "clamp(1.2rem, 2vw + 1vh, 2rem)",
    color: "#fff",
    letterSpacing: "2px",
    textDecoration: "none",
    cursor: "pointer",
  },
  nav: {
    display: "flex",
    gap: "clamp(1rem, 3vw, 3rem)", 
  },
  link: {
    color: "#ccc",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "clamp(0.75rem, 1vw + 0.5vh, 1rem)",
    letterSpacing: "1px",
    transition: "color 0.2s ease",
  },
};

export default Header;
