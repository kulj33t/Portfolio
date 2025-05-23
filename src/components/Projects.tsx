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
        <h1 style={styles.heading}>
          A small selection of recent projects
        </h1>

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
    width: "100%",
    minHeight: "100vh",
    padding: "80px 20px",
  },
  wrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
 heading: {
    fontSize: "36px",
    fontFamily: "'Tenkai', sans-serif",
    marginBottom: "40px",
    textAlign: "center",
  },
  cardContainer: {
    display: "flex",
    gap: "40px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
     backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "500px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s ease",
  },
  image: {
    width: "100%",
    height: "280px",
    objectFit: "cover",
  },
  cardContent: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  projectTitle: {
    fontSize: "22px",
    fontWeight: 700,
    marginBottom: "12px",
  },
  projectDescription: {
    fontSize: "16px",
    color: "#d1d5db",
    marginBottom: "20px",
    flexGrow: 1,
  },
  link: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#c084fc",
    textDecoration: "none",
  },
};

export default Projects;
