import React from 'react';
import TechStack from './TechStack';

const Tech: React.FC = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.left}>
          <h2 style={styles.heading}>Front-End & UI/UX Developer</h2>
          <p style={styles.text}>
            I specialize in designing and building modern, user-centric websites and applications. I love using tools
            like React, TypeScript, and Three.js to bring interfaces to life with clean, performant code.
          </p>
        </div>
        <div style={styles.right}>
          <TechStack />
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
  },
  card: {
    display: 'flex',
    width: '100%',
    maxWidth: '1200px',
    height: '80%',
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
  },
  left: {
    flex: 1,
    padding: '40px',
    color: '#ccc',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
    fontFamily: "'Tenkai', sans-serif",
    color: '#aaa',
  },
  text: {
    fontSize: '16px',
    lineHeight: 1.6,
    color: '#ddd',
  },
  right: {
    flex: 1,
    position: 'relative',
  },
};

export default Tech;
