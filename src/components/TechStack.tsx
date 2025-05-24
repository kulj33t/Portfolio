import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  { name: 'User Research', icon: '/icons/user-research.png' },
  { name: 'Journey Mapping', icon: '/icons/journey-mapping.png' },
  { name: 'Information Architecture', icon: '/icons/information-architecture.png' },
  { name: 'Wireframing ', icon: '/icons/wireframing.png' },
  { name: 'Prototyping & User Flow', icon: '/icons/prototyping.png' },
  { name: 'Usability Testing', icon: '/icons/usability-testing.png' },
  { name: 'UI & Visual Design', icon: '/icons/ui-design.png' },
  { name: 'Design System', icon: '/icons/design-system.png' },
  { name: 'Interaction Design', icon: '/icons/interaction-design.png' },
  { name: 'Web & Mobile Responsive', icon: '/icons/responsive.png' },
  { name: 'Branding', icon: '/icons/branding.png' },
  { name: 'Illustration', icon: '/icons/illustration.png' },
  { name: 'Content', icon: '/icons/content.png' },
];

const TechStack: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-50px' });

  return (
    <div ref={ref} style={styles.wrapper}>
      <div style={styles.blurOverlay}></div>
      <motion.div
        style={styles.motionWrapper}
        animate={isInView ? { y: ['20%', '-20%'] } : { y: 0 }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      >
        {skills.map((skill, index) => (
          <div key={index} style={styles.skillItem}>
            <img src={skill.icon} alt={skill.name} style={styles.icon} />
            {skill.name}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#111',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
  },
  motionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 1,
  },
  skillItem: {
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.75rem 1.5rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#ffffff',
    background: 'rgba(255, 255, 255, 0.05)',
    margin: '0.5rem 0',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    minWidth: '320px',
  },
  icon: {
    width: '32px',
    height: '32px',
    objectFit: 'contain',
  },
  blurOverlay: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 10,
    background: `
      radial-gradient(
        ellipse at center,
        rgba(17, 17, 17, 0) 45%,
        rgba(17, 17, 17, 0.4) 65%,
        rgba(17, 17, 17, 0.65) 80%,
        rgba(17, 17, 17, 0.85) 100%
      ),
      linear-gradient(to right,
        rgba(17, 17, 17, 0.7) 0%,
        rgba(17, 17, 17, 0.4) 10%,
        rgba(17, 17, 17, 0) 30%,
        rgba(17, 17, 17, 0) 70%,
        rgba(17, 17, 17, 0.4) 90%,
        rgba(17, 17, 17, 0.7) 100%
      )
    `,
  },
};

export default TechStack;
