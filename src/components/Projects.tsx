import React from "react";

type Project = {
  title: string;
  description: string;
  image: string;
  url?: string;
  github?: string;
};

const projects: Project[] = [
  {
    title: "LeChat: Real-Time Chat Application",
    description:
      "Full-stack real-time chat app with Socket.IO, JWT authentication, role-based access, and Cloudinary uploads.",
    image: "/alt.png",
    url: "https://lechat-public.vercel.app",
    github: "https://github.com/kulj33t/LeChat",
  },
  {
    title: "AI ChatBot Assistant",
    description:
      "AI chatbot powered by Google Generative AI API, featuring contextual query handling and async streaming.",
    image: "icons/projects/chatbot.png",
    url: "https://chatbot-public.vercel.app",
    github: "https://github.com/kulj33t/Chatbot",
  },
  {
    title: "AttendX",
    description:
      "Geolocation-based attendance app built with React Native, Expo, and Figma for UI/Frontend design.",
    image: "icons/projects/attendx.png",
    url: "https://github.com/kulj33t/AttendX",
    github: "https://github.com/kulj33t/AttendX",
  },
  {
    title: "Coming Soon",
    description: "This project is currently in development. Stay tuned!",
    image: "icons/projects/coming-soon.png",
  },
];

const Projects: React.FC = () => {
  return (
    <section style={styles.section}>
      <div style={styles.wrapper}>
        <h1 style={styles.heading}>A small selection of recent projects</h1>
        <div className="card-container">
          {projects.map(({ title, description, image, url, github }) => (
            <div
              key={title}
              style={{
                ...styles.card,
                backgroundImage: `url(${image})`,
              }}
              className="project-card"
            >
              <div style={styles.overlay} className="overlay">
                <h2 style={styles.projectTitle}>{title}</h2>
                <p style={styles.projectDescription}>{description}</p>

                <div style={styles.buttonGroup}>
                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ ...styles.button, ...styles.liveBtn }}
                      className="btn"
                    >
                      Live
                    </a>
                  )}
                  {github && (
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ ...styles.button, ...styles.githubBtn }}
                      className="btn"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animations + Responsive layout */}
      <style>
        {`
          .card-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 2rem;
          }

          /* Landscape (wide) -> inline cards */
          @media screen and (orientation: landscape) {
            .card-container {
              flex-direction: row;
            }
          }

          /* Portrait (tall) -> column layout */
          @media screen and (orientation: portrait) {
            .card-container {
              flex-direction: column;
              align-items: center;
            }
          }

          .project-card {
            position: relative;
            transition: transform 0.4s ease, box-shadow 0.4s ease;
            background-size: cover;
            background-position: center;
            flex-shrink: 0; /* keep fixed size */
          }

          .project-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 0 20px rgba(255,255,255,0.6), 0 12px 32px rgba(0,0,0,0.4);
          }

          .overlay {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.4s ease, transform 0.4s ease;
          }

          .project-card:hover .overlay {
            opacity: 1;
            transform: translateY(0);
          }

          .btn {
            transition: all 0.3s ease;
          }
          .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 14px rgba(0,0,0,0.25), 0 0 10px rgba(192,132,252,0.6);
          }
          .btn:active {
            transform: scale(0.95);
          }
        `}
      </style>
    </section>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    width: "100vw",
    minHeight: "100vh",
    padding: "6vh 4vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  wrapper: {
    width: "90%",
    maxWidth: "1400px",
    display: "flex",
    flexDirection: "column",
    gap: "4vh",
  },
  heading: {
    fontSize: "clamp(1.8rem, 2vw + 1vh, 3rem)",
    marginBottom: "10vh",
    textAlign: "center",
    color: "#fff",
    letterSpacing: "1px",
    fontFamily: "'Tenkai', sans-serif",
  },
  card: {
    width: "320px",
    height: "420px", 
    borderRadius: "1.6vh",
    boxShadow: "0 0 15px rgba(255,255,255,0.15)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  overlay: {
    padding: "1.5rem",
    color: "#fff",
    textAlign: "center",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "1rem",
    background: "rgba(0,0,0,0.5)",
    borderRadius: "inherit",
  },
  projectTitle: {
    fontSize: "1.2rem",
    fontWeight: 700,
    marginBottom: "0.5rem",
  },
  projectDescription: {
    fontSize: "0.95rem",
    lineHeight: 1.6,
    color: "#ddd",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
    marginTop: "auto",
  },
  button: {
    padding: "0.7rem 1.5rem",
    borderRadius: "9999px",
    fontSize: "0.95rem",
    fontWeight: 600,
    textDecoration: "none",
    textAlign: "center",
    cursor: "pointer",
  },
  liveBtn: {
    backgroundColor: "#fff",
    color: "#000",
  },
  githubBtn: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    border: "1px solid #333",
  },
};

export default Projects;
