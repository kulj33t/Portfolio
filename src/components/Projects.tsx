import React, { useRef, useState, useEffect } from "react";

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
    image: "icons/projects/lechat.png",
    url: "https://lechat-public.vercel.app",
    github: "https://github.com/kulj33t/LeChat",
  },

  {
    title: "RateIt",
    description:
      "A full-stack MERN application for tracking and ranking TV series. Features a unique S-Tier to F-Tier rating system, real-time community consensus charts, and a personalized library dashboard. Built with React, Tailwind CSS, Framer Motion, and a robust Node/Express backend.",
    image: "icons/projects/rateit.png",
    url: "https://rateitorhateit.vercel.app", 
    github: "https://github.com/kulj33t/rateitorhateit",
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
    title: "Portfolio",
    description:
      "Kuljeet Singh's personal portfolio showcasing projects, UI/UX designs, and technical skills built with React and modern frontend practices.",
    image: "icons/projects/portfolio.png",
    url: "https://kuljeet.vercel.app",
    github: "https://github.com/kulj33t/Portfolio",
  },
  

];

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollByCard = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const card = container.firstElementChild as HTMLElement;
    if (!card) return;

    const scrollAmount = card.offsetWidth + parseInt(getComputedStyle(card).marginRight);
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const checkArrows = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    checkArrows();
    const container = containerRef.current;
    container?.addEventListener("scroll", checkArrows);
    window.addEventListener("resize", checkArrows);

    return () => {
      container?.removeEventListener("scroll", checkArrows);
      window.removeEventListener("resize", checkArrows);
    };
  }, []);

  return (
    <section style={styles.section}>
      <div style={styles.wrapper}>
        <h1 style={styles.heading}>A small selection of recent projects</h1>

        <div style={styles.carouselWrapper}>
          {canScrollLeft && (
            <button style={{ ...styles.arrowBtn, left: 0 }} onClick={() => scrollByCard("left")}>
              &#10094;
            </button>
          )}

          <div style={styles.carousel} ref={containerRef}>
            {projects.map(({ title, description, image, url, github }, idx) => (
              <div
                key={title}
                style={{
                  ...styles.card,
                  backgroundImage: `url(${image})`,
                  marginLeft: idx === 0 ? "2rem" : "1rem",
                  marginRight: idx === projects.length - 1 ? "2rem" : "1rem",
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

          {canScrollRight && (
            <button
              style={{ ...styles.arrowBtn, right: 0 }}
              onClick={() => scrollByCard("right")}
            >
              &#10095;
            </button>
          )}
        </div>
      </div>

      <style>
        {`
          .project-card {
            flex-shrink: 0;
            transition: transform 0.4s ease, box-shadow 0.4s ease;
            background-size: cover;
            background-position: center;
            position: relative; /* required for overlay absolute positioning */
          }

          .project-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 0 20px rgba(255,255,255,0.6), 0 12px 32px rgba(0,0,0,0.4);
          }

          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            transform: translateY(20px);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 1.5rem;
            text-align: center;
            color: #fff;
            border-radius: inherit;
            background: rgba(0,0,0,0.2);
            backdrop-filter: blur(0px);
            transition: opacity 0.4s ease, transform 0.4s ease, backdrop-filter 0.4s ease, background 0.4s ease;
          }

          .project-card:hover .overlay {
            opacity: 1;
            transform: translateY(0);
            backdrop-filter: blur(8px);
            background: rgba(0,0,0,0.4);
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

          div::-webkit-scrollbar {
            display: none;
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
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  wrapper: {
    width: "90%",
    maxWidth: "1400px",
    display: "flex",
    flexDirection: "column",
    gap: "4vh",
    position: "relative",
  },
  heading: {
    fontSize: "clamp(1.8rem, 2vw + 1vh, 3rem)",
    marginBottom: "6vh",
    textAlign: "center",
    color: "#fff",
    letterSpacing: "1px",
    fontFamily: "'Tenkai', sans-serif",
  },
  carouselWrapper: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
  },
  carousel: {
    display: "flex",
    overflowX: "auto",
    scrollBehavior: "smooth",
    paddingBottom: "2rem",
    paddingTop: "2rem",
  },
  arrowBtn: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "#fff",
    border: "none",
    fontSize: "2rem",
    cursor: "pointer",
    borderRadius: "50%",
    width: "3.5rem",
    height: "3.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    transition: "0.3s ease",
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
    background: "rgba(0,0,0,0.2)",
    borderRadius: "inherit",
    backdropFilter: "blur(5px)",
    transition: "opacity 0.4s ease, transform 0.4s ease, backdrop-filter 0.4s ease, background 0.4s ease",
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
