import React from "react";

type Project = {
  title: string;
  description: string;
  image: string;
  url?: string;
};

const projects: Project[] = [
  {
    title: "Portfolio Website",
    description: "My personal portfolio built with React and TypeScript.",
    image: "/projects/portfolio.png",
    url: "https://yourportfolio.com",
  },
];

const Projects: React.FC = () => {
  return (
    <div style={styles.wrapper}>
      <section style={styles.container}>
        <h1 style={styles.heading}>Projects</h1>

        <div style={styles.horizontalScroll}>
          {projects.map(({ title, description, image, url }) => (
            <div key={title} style={styles.card}>
              <img src={image} alt={title} style={styles.image} />
              <div style={styles.cardContent}>
                <h3 style={styles.projectTitle}>{title}</h3>
                <p style={styles.projectDescription}>{description}</p>
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.projectLink}
                  >
                    View Project
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
  },
  container: {
    width: "100%",
    maxWidth: "800px",
    padding: "40px",
    borderRadius: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    color: "#ccc",
    overflow: "hidden"
  },
  heading: {
    fontSize: "36px",
    fontFamily: "'Tenkai', sans-serif",
    color: "#fff",
    marginBottom: "40px",
    textAlign: "center",
  },
  horizontalScroll: {
    display: "flex",
    overflowX: "auto",
    gap: "24px",
    paddingBottom: "10px",
    scrollbarWidth: "thin",
  },
  card: {
    flex: "0 0 280px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardContent: {
    padding: "16px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  projectTitle: {
    fontSize: "22px",
    margin: "0 0 12px 0",
    color: "#fff",
  },
  projectDescription: {
    fontSize: "16px",
    flexGrow: 1,
    color: "#ddd",
    marginBottom: "16px",
  },
  projectLink: {
    alignSelf: "flex-start",
    color: "#1e90ff",
    fontWeight: "600",
    textDecoration: "none",
    fontSize: "14px",
  },
};

export default Projects;
