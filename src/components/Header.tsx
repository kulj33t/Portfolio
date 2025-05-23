import React from "react";

const Header: React.FC = () => {
  return (
    <div style={styles.wrapper}>
      <header style={styles.container}>
       <a href="hero" style={styles.logo}>KS</a>

        <nav style={styles.nav}>
          <a href="#resume" style={styles.link}>RESUME</a>
          <a href="#footer" style={styles.link}>LET'S CONNECT</a>
        </nav>
      </header>
    </div>
  );
};


const styles: { [key: string]: React.CSSProperties } = {

wrapper: {
  position: "fixed",
  top: "2%",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 100,
  width: "60%",
  borderRadius: "16px",
  overflow: "hidden",
},

container: {
  width: "100%",
  padding: "20px 40px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.025)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  color: "#ccc",
},

  logo: {
    fontFamily: "'Tenkai', sans-serif",
    fontSize: "24px",
    color: "#fff",
    letterSpacing: "2px",
    textDecoration: "none",
    cursor:"pointer"
  },
  nav: {
    display: "flex",
    gap: "40px",
  },
  link: {
    color: "#ccc",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "14px",
    letterSpacing: "1px",
    transition: "color 0.2s ease",
  },
};

export default Header;
