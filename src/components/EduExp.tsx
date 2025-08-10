import React, { useState } from "react";

type TabType = "Education" | "Experience";

const TimelineItem: React.FC<{
  year: string;
  title: string;
  description: string;
}> = ({ year, title, description }) => (
  <div style={styles.timelineItem}>
    <div style={styles.timelineDot}></div>
    <div style={styles.timelineContent}>
      <h3 style={styles.itemTitle}>{title}</h3>
      <time style={styles.itemYear}>{year}</time>
      <p style={styles.itemDescription}>{description}</p>
    </div>
  </div>
);

const EduExp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Education");

  const educationData = [
    {
      year: "2023 - 2027",
      title: "B.Tech in Information Technology",
      description:
        "Currently pursuing B.Tech from BIT Sindri with a focus on software development and data structures.",
    },
    {
      year: "2022",
      title: "Intermediate",
      description:
        "Completed from JNV Basohli, Kathua (J&K), with a focus on science and mathematics.",
    },
    {
      year: "2020",
      title: "Matriculation",
      description:
        "Completed from JNV Basohli, Kathua (J&K), with a focus on core academic subjects.",
    },
  ];

  const experienceData = [
    {
      year: "May 2025",
      title: "Finalist at HACKATRON, HNCC BIT Sindri",
      description:
        "Competed in a highly competitive hackathon, showcasing problem-solving skills and innovation in software development.",
    },
    {
      year: "2025",
      title: "Internship",
      description:
        "Details of internship responsibilities and projects will be provided soon.",
    },
  ];

  return (
    <div style={styles.wrapper}>
      <section style={styles.container}>
        <div style={styles.tabContainer}>
          <div style={styles.tabWrapper}>
            {activeTab === "Experience" && (
              <span
                aria-hidden
                style={{
                  ...styles.triangle,
                  left: "-1.25rem",
                }}
              >
                ▶
              </span>
            )}
            <button
              style={{
                ...styles.tabButton,
                ...(activeTab === "Education"
                  ? styles.activeTab
                  : styles.inactiveTab),
              }}
              onClick={() => setActiveTab("Education")}
            >
              Education
            </button>
          </div>

          <div style={styles.tabWrapper}>
            {activeTab === "Education" && (
              <span
                aria-hidden
                style={{
                  ...styles.triangle,
                  right: "-1.25rem",
                }}
              >
                ◀
              </span>
            )}
            <button
              style={{
                ...styles.tabButton,
                ...(activeTab === "Experience"
                  ? styles.activeTab
                  : styles.inactiveTab),
              }}
              onClick={() => setActiveTab("Experience")}
            >
              Experience
            </button>
          </div>
        </div>

        <div style={styles.contentContainer}>
          <div
            style={{
              ...styles.timelineContainer,
              ...(activeTab === "Education"
                ? styles.activeContent
                : styles.hiddenContent),
            }}
          >
            <div style={styles.timeline}>
              {educationData.map((item, index) => (
                <TimelineItem key={`edu-${index}`} {...item} />
              ))}
            </div>
          </div>

          <div
            style={{
              ...styles.timelineContainer,
              ...(activeTab === "Experience"
                ? styles.activeContent
                : styles.hiddenContent),
            }}
          >
            <div style={styles.timeline}>
              {experienceData.map((item, index) => (
                <TimelineItem key={`exp-${index}`} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    boxSizing: "border-box",
  },
  container: {
    width: "50vw",
    height: "70vh",
    minWidth: "350px",
    minHeight: "200px",
    padding: "3rem",
    borderRadius: "1.6vh",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    color: "#ccc",
    boxShadow: "0 0.4vh 3vh rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "left",
    overflow: "visible",
    fontSize: "1.1rem", 
  },
  tabContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "8vh",
    width: "100%",
    position: "relative",
  },
  tabWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  tabButton: {
    fontFamily: "'Tenkai', sans-serif",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem 0.8rem",
    margin: 0,
    transition: "color 0.25s ease, border-bottom 0.25s ease, font-size 0.25s ease",
    borderBottom: "2px solid transparent",
    whiteSpace: "nowrap",
  },
  activeTab: {
    color: "#fff",
    borderBottom: "2px solid #fff",
    fontSize: "calc(clamp(1.2rem, 1.8vw + 0.6vh, 1.4rem) + 4px)",
  },
  inactiveTab: {
    color: "rgba(255,255,255,0.4)",
    fontSize: "clamp(1.2rem, 1.8vw + 0.6vh, 1.4rem)",
  },
  triangle: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#fff",
    fontSize: "1em",
    pointerEvents: "none",
    animation: "smoothBlink 1.6s ease-in-out infinite",
  },
  contentContainer: {
    width: "100%",
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },
  timelineContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    overflowY: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    paddingInline: "10px",
  },
  activeContent: {
    transform: "translateX(0)",
    opacity: 1,
    visibility: "visible",
  },
  hiddenContent: {
    transform: "translateX(100%)",
    opacity: 0,
    visibility: "hidden",
  },
  timeline: {
    borderLeft: "2px solid #ccc",
    paddingLeft: "50px",
    position: "relative",
    paddingRight: "1rem",
  },
  timelineItem: {
    position: "relative",
    marginBottom: "40px",
  },
  timelineDot: {
    position: "absolute",
    left: "-60px",
    top: "0",
    width: "18px",
    height: "18px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    border: "3px solid #fff",
  },
  timelineContent: {
    paddingLeft: "10px",
  },
  itemTitle: {
    fontSize: "clamp(1.4rem, 1.5vw + 1vh, 1.6rem)",
    color: "#fff",
    marginBottom: "0.5vh",
  },
  itemYear: {
    fontSize: "clamp(1rem, 1.1vw + 0.6vh, 1.2rem)",
    color: "#aaa",
    marginBottom: "1vh",
    display: "block",
  },
  itemDescription: {
    fontSize: "clamp(1rem, 1.2vw + 0.6vh, 1.2rem)",
    lineHeight: 1.7,
    color: "#ddd",
    textAlign: "left",
  },
};


const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  @keyframes smoothBlink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`;
document.head.appendChild(styleSheet);

export default EduExp;
