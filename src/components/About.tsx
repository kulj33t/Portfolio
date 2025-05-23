import React from "react";

const About: React.FC = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.greeting}>Hi there</h1>
        <p style={styles.text}>
          I’m Kuljeet Singh, a passionate web developer specializing in building beautiful and performant web applications using React and TypeScript.  
          I love crafting clean, modern UI and enjoy solving complex problems with elegant code.
        </p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    height: "100vh",
    width: "100%",           
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",            
    maxWidth: "700px",
    padding: "40px",
    borderRadius: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    color: "#ccc",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  },
  greeting: {
    fontFamily: "'Tenkai', sans-serif",
    fontSize: "42px",
    marginBottom: "24px",
    color: "#fff",
    letterSpacing: "2px",
    textAlign:"center"
  },
  text: {
    fontSize: "18px",
    lineHeight: 1.6,
    color: "#ddd",
    textAlign:"center"
  },
};

export default About;
