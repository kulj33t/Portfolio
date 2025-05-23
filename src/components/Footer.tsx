import React from "react";

const Footer: React.FC = () => {
  return (
    <footer style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Let’s Connect</h1>
        <p style={styles.subtext}>Feel free to reach out for collaborations or just a friendly hello!</p>

        <div style={styles.socialLinks}>
          <a
            href="mailto:kuljeet.singh.dev@gmail.com"
            style={styles.socialButton}
          >
            <img src="/icons/email.png" alt="Email" style={styles.iconImage} />
          </a>

          <a
            href="https://github.com/kulj33t"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialButton}
          >
            <img src="/icons/github.png" alt="GitHub" style={styles.iconImage} />
          </a>

          <a
            href="https://linkedin.com/in/kulj33t"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialButton}
          >
            <img src="/icons/linkedin.png" alt="LinkedIn" style={styles.iconImage} />
          </a>
        </div>

        <p style={styles.credit}>© 2025 Kuljeet Singh</p>
      </div>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.002)",
    backdropFilter: "blur(3px)",
    WebkitBackdropFilter: "blur(3px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "40px 20px",
    color: "#ccc",
    fontFamily: "'Tenkai', sans-serif",
    position: "relative",
    boxShadow: "inset 0 2px 30px rgba(0,0,0,0.3)",
  },
  content: {
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
  },
  heading: {
    fontSize: "36px",
    color: "#fff",
    marginBottom: "8px",
  },
  subtext: {
    fontSize: "16px",
    color: "#bbb",
    maxWidth: "500px",
    lineHeight: "1.5",
  },
  socialLinks: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
  socialButton: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s ease",
  },
  iconImage: {
    width: "24px",
    height: "24px",
  },
  credit: {
    marginTop: "40px",
    fontSize: "14px",
    color: "#888",
  },
};

export default Footer;
