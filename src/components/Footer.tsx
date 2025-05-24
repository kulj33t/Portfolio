import React from "react";

const Footer: React.FC = () => {
  return (
    <footer style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Let’s Connect</h1>
        <p style={styles.subtext}>
          Feel free to reach out for collaborations or just a friendly hello!
        </p>

        <div style={styles.socialLinks}>
          <a
            href="mailto:kuljeet.singh.dev@gmail.com"
            style={styles.socialButton}
          >
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

        <p style={styles.credit}>© 2025 Kuljeet Singh</p>
      </div>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "rgba(255, 255, 255, 0.025)",
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(2px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5vh 5vw",
    color: "#ccc",
    position: "relative",
    textAlign: "center",
  },
  content: {
    width: "clamp(280px, 70vw, 800px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "clamp(1.5rem, 3vh, 2.5rem)",
    padding: "3vh 2vw",
    borderRadius: "1.6vh",
    boxShadow: "0 0.4vh 3vh rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "clamp(1.5rem, 2vw + 1vh, 3rem)",
    color: "#fff",
    fontFamily: "'Tenkai', sans-serif",
    letterSpacing: "2px",
  },
  subtext: {
    fontSize: "clamp(0.9rem, 1vw + 0.5vh, 1.2rem)",
    color: "#bbb",
    lineHeight: 1.6,
    maxWidth: "600px",
  },
  socialLinks: {
    display: "flex",
    gap: "clamp(1rem, 2vw, 2rem)",
    marginTop: "1vh",
  },
  socialButton: {
    width: "clamp(40px, 4vw, 48px)",
    height: "clamp(40px, 4vw, 48px)",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s ease",
    cursor: "pointer",
  },
  iconImage: {
    width: "clamp(20px, 2vw, 28px)",
    height: "clamp(20px, 2vw, 28px)",
    objectFit: "contain",
  },
  credit: {
    fontSize: "clamp(0.75rem, 1vw, 0.95rem)",
    color: "#888",
    marginTop: "2vh",
  },
};

export default Footer;
