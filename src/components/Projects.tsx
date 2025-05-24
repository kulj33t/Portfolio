import React from "react";

type Project = {
  title: string;
  description: string;
  image: string;
  url?: string;
};

const projects: Project[] = [
  {
    title: "3D Solar System Planets to Explore",
    description:
      "Explore the wonders of our solar system with this captivating 3D simulation using Three.js.",
    image: "/projects/solar-system.png",
    url: "https://example.com/solar-system",
  },
  {
    title: "Yoom - Video Conferencing App",
    description:
      "Simplify your video conferencing experience with Yoom. Seamlessly connect with colleagues and friends.",
    image: "/projects/yoom.png",
    url: "https://example.com/yoom",
  },
];

const Projects: React.FC = () => {
  return (
    <section style={styles.section}>
      <div style={styles.wrapper}>
        <h1 style={styles.heading}>A small selection of recent projects</h1>

        <div style={styles.cardContainer}>
          {projects.map(({ title, description, image, url }) => (
            <div key={title} style={styles.card}>
              <img src={image} alt={title} style={styles.image} />
              <div style={styles.cardContent}>
                <h2 style={styles.projectTitle}>{title}</h2>
                <p style={styles.projectDescription}>{description}</p>
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.link}
                  >
                    Check Live Site
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    width: "100vw",
    minHeight: "100vh",
    padding: "6vh 4vw",
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4vh",
  },
  heading: {
    fontSize: "clamp(1.8rem, 2vw + 1vh, 3rem)",
    fontFamily: "'Tenkai', sans-serif",
    marginBottom: "1vh",
    textAlign: "center",
    color: "#fff",
    letterSpacing: "2px",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "3vw",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: "1.6vh",
    width: "100%",
    maxWidth: "500px",
    overflow: "hidden",
    boxShadow: "0 0.4vh 3vh rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s ease",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  },
  image: {
    width: "100%",
    height: "280px",
    objectFit: "cover",
  },
  cardContent: {
    padding: "2vh 2vw",
    display: "flex",
    flexDirection: "column",
    gap: "1vh",
    color: "#ccc",
    flexGrow: 1,
  },
  projectTitle: {
    fontSize: "clamp(1.2rem, 1.5vw + 0.5vh, 1.8rem)",
    fontWeight: 700,
    color: "#fff",
    fontFamily: "'Tenkai', sans-serif",
  },
  projectDescription: {
    fontSize: "clamp(0.9rem, 1vw + 0.4vh, 1.1rem)",
    color: "#ddd",
    lineHeight: 1.6,
    flexGrow: 1,
  },
  link: {
    fontSize: "clamp(0.8rem, 1vw, 1rem)",
    fontWeight: 600,
    color: "#c084fc",
    textDecoration: "none",
    marginTop: "auto",
  },
};

export default Projects;
