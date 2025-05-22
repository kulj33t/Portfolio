import React from "react";

const Footer: React.FC = () => {
  return (
    <footer style={styles.container}>
      <div style={styles.left}>
        {/* Replace with your name or brand */}
        <p style={styles.brand}>© 2025 YourName</p>
      </div>

      <div style={styles.right}>
        {/* Replace hrefs with your real links */}
        <a href="mailto:your@email.com" style={styles.link}>Email</a>
        <a href="https://github.com/your-username" target="_blank" style={styles.link}>GitHub</a>
        <a href="https://linkedin.com/in/your-profile" target="_blank" style={styles.link}>LinkedIn</a>
      </div>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 60px",
    backgroundColor: "transparent",
    color: "#111",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    borderTop: "1px solid #ddd",
  },
  left: {
    flex: 1,
  },
  right: {
    display: "flex",
    gap: "20px",
  },
  brand: {
    fontWeight: "bold",
  },
  link: {
    color: "#111",
    textDecoration: "none",
    transition: "color 0.2s ease",
  },
};

export default Footer;
