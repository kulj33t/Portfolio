import React from "react";

const Hero: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.leftBlock}>
        <h1 style={styles.Title}>KULJEET</h1>
        <h1 style={styles.Title}>SINGH</h1>
      </div>

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
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "relative",
    height: "100vh",
    width: "100vw",
    fontFamily: "Arial, sans-serif",
  },
  leftBlock: {
    position: "absolute",
    bottom: "10vh",
    left: "5vw",
    maxWidth: "60%",
  },
  Title: {
    fontSize: "164px",
    fontWeight: "900",
    marginBottom: "10px",
    fontFamily: "'Tenkai', serif",
    letterSpacing: "3px",
  },
  socialLinks: {
    position: "absolute",
    top: "50%",
    right: "5vw",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    alignItems: "center",
  },
 socialButton: {
  display: "inline-block",
  cursor: "pointer",
},

iconImage: {
  width: "24px",
  height: "24px",
  objectFit: "contain",
},

};

export default Hero;
