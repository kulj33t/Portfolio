import React from "react";

const TimelineItem: React.FC<{ year: string; title: string; description: string }> = ({ year, title, description }) => (
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
  return (
    <div style={styles.wrapper}>
      <section style={styles.container}>
        <h1 style={styles.heading}>Education & Experience</h1>

        <div style={styles.timelineSection}>
          <h2 style={styles.sectionTitle}>Education</h2>
          <div style={styles.timeline}>
            <TimelineItem
              year="2023"
              title="Bachelor's in Computer Science"
              description="Graduated with honors from XYZ University."
            />
            <TimelineItem
              year="2021"
              title="High School Diploma"
              description="Focused on science and mathematics with top academic performance."
            />
          </div>
        </div>

        <div style={styles.timelineSection}>
          <h2 style={styles.sectionTitle}>Experience</h2>
          <div style={styles.timeline}>
            <TimelineItem
              year="2025"
              title="Internship at LITTLE LTD."
              description="Built interactive web interfaces using React and TypeScript."
            />
          </div>
        </div>
      </section>
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
  },
  heading: {
    fontSize: "36px",
    fontFamily: "'Tenkai', sans-serif",
    marginBottom: "40px",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "28px",
    color: "#fff",
    marginBottom: "20px",
    fontFamily: "'Tenkai', sans-serif",
  },
  timelineSection: {
    marginBottom: "40px",
  },
  timeline: {
    borderLeft: "2px solid #ccc",
    paddingLeft: "30px",
    position: "relative",
  },
  timelineItem: {
    position: "relative",
    marginBottom: "40px",
  },
  timelineDot: {
    position: "absolute",
    left: "-40px",
    top: "0",
    width: "18px",
    height: "18px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    border: "3px solid #fff",
  },
  timelineContent: {
    paddingLeft: "20px",
  },
  itemTitle: {
    fontSize: "20px",
    color: "#fff",
    marginBottom: "4px",
  },
  itemYear: {
    fontSize: "14px",
    color: "#aaa",
    marginBottom: "10px",
    display: "block",
  },
  itemDescription: {
    fontSize: "16px",
    color: "#ddd",
  },
};

export default EduExp;
