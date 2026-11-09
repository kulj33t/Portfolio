import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ResumeBtn: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTouch, setIsTouch] = useState(
    window.matchMedia("(hover: none)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(hover: none)");

    const handleChange = () => {
      setIsTouch(media.matches);
      setIsExpanded(false);
    };

    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!isTouch || !isExpanded) return;

    const handleOutsideClick = (e: PointerEvent) => {
      const target = e.target as HTMLElement;

      if (!target.closest(".resume-btn")) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () =>
      document.removeEventListener("pointerdown", handleOutsideClick);
  }, [isTouch, isExpanded]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouch && !isExpanded) {
      e.preventDefault();
      setIsExpanded(true);
    }
  };

  const particles = Array.from({ length: 24 }, (_, i) => i);

  return (
    <>
      <Link
        to="/resume"
        onClick={handleClick}
        onMouseEnter={() => !isTouch && setIsExpanded(true)}
        onMouseLeave={() => !isTouch && setIsExpanded(false)}
        className={`resume-btn ${isExpanded ? "expanded" : ""}`}
        aria-label="View and download resume"
        aria-expanded={isExpanded}
      >
        {/* Particles */}
        <span className="sparks" aria-hidden="true">
          {particles.map((i) => (
            <span key={i} className={`spark spark-${i + 1}`} />
          ))}
        </span>

        {/* Icon */}
        <span className="btn-icon">
          <img src="/icons/cv.png" alt="" draggable={false} />
        </span>

        {/* Label */}
        <span className="btn-label">View Resume</span>
      </Link>

      <style>{`
        /* =========================================
           BUTTON
        ========================================= */

        .resume-btn {
          position: fixed;
          bottom: 5vh;
          right: 3vw;
          z-index: 200;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          width: 58px;
          height: 58px;
          border-radius: 50%;

          border: 1px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.97);
          color: #111;

          text-decoration: none;
          font-weight: 650;
          font-size: 0.875rem;

          cursor: pointer;
          overflow: visible;
          isolation: isolate;

          box-shadow:
            0 0 12px rgba(255,255,255,0.35),
            0 0 28px rgba(255,255,255,0.15),
            0 5px 22px rgba(0,0,0,0.28);

          transition:
            width 0.55s cubic-bezier(.22,1,.36,1),
            border-radius 0.55s cubic-bezier(.22,1,.36,1),
            background 0.35s ease,
            color 0.35s ease,
            border-color 0.35s ease,
            box-shadow 0.4s ease,
            transform 0.4s cubic-bezier(.22,1,.36,1),
            gap 0.4s ease;
        }

        /* =========================================
           EXPANDED BUTTON
        ========================================= */

        .resume-btn.expanded {
          width: 190px;
          border-radius: 40px;

          background: #0a0a0a;
          color: #fff;

          border-color: rgba(255,255,255,0.01);

          box-shadow:
            0 0 16px rgba(255,255,255,0.45),
            0 0 40px rgba(255,255,255,0.2),
            0 4px 8px rgba(0,0,0,0.5);

          transform: translateY(-1px);
          gap: 10px;
        }

        /* =========================================
           ICON
        ========================================= */

        .btn-icon {
          position: relative;
          z-index: 2;

          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;

          transition:
            opacity 0.35s ease,
            transform 0.4s ease,
            width 0.4s ease;
        }

        .btn-icon img {
          width: 28px;
          height: 28px;
          object-fit: contain;
          pointer-events: none;
        }

        .resume-btn.expanded .btn-icon {
          opacity: 0;
          width: 0;
          overflow: hidden;
          transform: scale(0.5);
        }

        .resume-btn.expanded .btn-icon img {
          width: 0;
        }

        /* =========================================
           LABEL
        ========================================= */

        .btn-label {
          position: relative;
          z-index: 2;

          white-space: nowrap;
          overflow: hidden;

          max-width: 0;
          opacity: 0;
          visibility: hidden;

          letter-spacing: 0.04em;

          transition:
            max-width 0.45s cubic-bezier(.22,1,.36,1),
            opacity 0.3s ease,
            visibility 0s linear 0.4s;
        }

        .resume-btn.expanded .btn-label {
          max-width: 140px;
          opacity: 1;
          visibility: visible;

          transition:
            max-width 0.45s cubic-bezier(.22,1,.36,1),
            opacity 0.35s ease 0.12s,
            visibility 0s;
        }

        /* =========================================
           PARTICLE CONTAINER
           Behind button, but outside its surface
        ========================================= */

        .sparks {
          position: absolute;
          inset: -45px;
          z-index: -1;

          pointer-events: none;
          overflow: visible;
        }

        /* =========================================
           PARTICLES
        ========================================= */

        .spark {
          position: absolute;
          left: 50%;
          top: 50%;

          width: 4px;
          height: 4px;
          border-radius: 50%;

          opacity: 0;

          background: #fff;
          box-shadow: 0 0 8px rgba(255,255,255,0.9);

          --sx: 0px;
          --sy: 0px;
          --ex: 0px;
          --ey: -70px;

          animation:
            particleFloat var(--duration) ease-out infinite;

          animation-delay: var(--delay);
          will-change: transform, opacity;
        }

        /* Particle colours */

        .spark:nth-child(3n) {
          background: #fff;
          box-shadow: 0 0 9px rgba(255,255,255,0.9);
        }

        .spark:nth-child(3n + 1) {
          background: #d87aff;
          box-shadow: 0 0 8px rgba(216,122,255,0.8);
        }

        .spark:nth-child(3n + 2) {
          background: #7af8ff;
          box-shadow: 0 0 8px rgba(122,248,255,0.8);
        }

        /* =========================================
           PARTICLE TRAJECTORIES
           Starting just outside the button edge
        ========================================= */

        .spark-1  { --sx: 0px;   --sy: -31px; --ex: -15px; --ey: -85px; --delay: 0s;    --duration: 2.1s; }
        .spark-2  { --sx: 22px;  --sy: -22px; --ex: 65px;  --ey: -70px; --delay: .2s;   --duration: 2.3s; }
        .spark-3  { --sx: 31px;  --sy: 0px;   --ex: 90px;  --ey: -10px; --delay: .4s;   --duration: 2s; }
        .spark-4  { --sx: 22px;  --sy: 22px;  --ex: 75px;  --ey: 65px;  --delay: .6s;   --duration: 2.4s; }
        .spark-5  { --sx: 0px;   --sy: 31px;  --ex: 10px;  --ey: 90px;  --delay: .8s;   --duration: 2.1s; }
        .spark-6  { --sx: -22px; --sy: 22px;  --ex: -70px; --ey: 75px;  --delay: 1s;    --duration: 2.3s; }
        .spark-7  { --sx: -31px; --sy: 0px;   --ex: -90px; --ey: -10px; --delay: .3s;   --duration: 2.2s; }
        .spark-8  { --sx: -22px; --sy: -22px; --ex: -75px; --ey: -70px; --delay: .7s;   --duration: 2.4s; }
        .spark-9  { --sx: 10px;  --sy: -30px; --ex: 40px;  --ey: -100px;--delay: 1.2s;  --duration: 2.1s; }
        .spark-10 { --sx: 30px;  --sy: 10px;  --ex: 100px; --ey: 35px;  --delay: .9s;   --duration: 2.2s; }
        .spark-11 { --sx: -10px; --sy: 30px;  --ex: -40px; --ey: 100px; --delay: 1.4s;  --duration: 2.3s; }
        .spark-12 { --sx: -30px; --sy: -10px; --ex: -100px;--ey: -40px; --delay: 1.1s;  --duration: 2s; }
        .spark-13 { --sx: 15px;  --sy: -27px; --ex: 55px;  --ey: -105px;--delay: 1.5s;  --duration: 2.4s; }
        .spark-14 { --sx: 27px;  --sy: 15px;  --ex: 105px; --ey: 55px;  --delay: 1.7s;  --duration: 2.2s; }
        .spark-15 { --sx: -15px; --sy: 27px;  --ex: -55px; --ey: 105px; --delay: 1.3s;  --duration: 2.5s; }
        .spark-16 { --sx: -27px; --sy: -15px; --ex: -105px;--ey: -55px; --delay: 1.6s;  --duration: 2.1s; }
        .spark-17 { --sx: 0px;   --sy: -31px; --ex: 25px;  --ey: -110px;--delay: .5s;   --duration: 2.5s; }
        .spark-18 { --sx: 31px;  --sy: 0px;   --ex: 110px; --ey: 15px;  --delay: 1.8s;  --duration: 2.2s; }
        .spark-19 { --sx: 0px;   --sy: 31px;  --ex: -20px; --ey: 110px; --delay: .1s;   --duration: 2.4s; }
        .spark-20 { --sx: -31px; --sy: 0px;   --ex: -110px;--ey: -20px; --delay: 1.9s;  --duration: 2.3s; }
        .spark-21 { --sx: 20px;  --sy: -24px; --ex: 85px;  --ey: -95px; --delay: .9s;   --duration: 2.5s; }
        .spark-22 { --sx: 24px;  --sy: 20px;  --ex: 95px;  --ey: 85px;  --delay: 1.4s;  --duration: 2.1s; }
        .spark-23 { --sx: -20px; --sy: 24px;  --ex: -85px; --ey: 95px;  --delay: .6s;   --duration: 2.4s; }
        .spark-24 { --sx: -24px; --sy: -20px; --ex: -95px; --ey: -85px; --delay: 1.2s;  --duration: 2.2s; }

        /* =========================================
           NORMAL PARTICLE ANIMATION
        ========================================= */

        @keyframes particleFloat {
          0% {
            transform: translate(var(--sx), var(--sy)) scale(.3);
            opacity: 0;
          }

          15% {
            opacity: 1;
          }

          65% {
            opacity: .8;
          }

          100% {
            transform: translate(var(--ex), var(--ey)) scale(.15);
            opacity: 0;
          }
        }

        /* =========================================
           EXPANDED PARTICLES
           Wider and more energetic spread
        ========================================= */

        .resume-btn.expanded .spark {
          animation-name: expandedParticleFloat;
          animation-duration: 1.8s;
        }

        @keyframes expandedParticleFloat {
          0% {
            transform: translate(var(--sx), var(--sy)) scale(.4);
            opacity: 0;
          }

          15% {
            opacity: 1;
          }

          65% {
            opacity: .9;
          }

          100% {
            transform: translate(
              calc(var(--ex) * 1.7),
              calc(var(--ey) * 1.7)
            ) scale(.1);
            opacity: 0;
          }
        }

        /* =========================================
           DESKTOP
        ========================================= */

        @media (hover: hover) and (pointer: fine) {
          .resume-btn:hover {
            transform: translateY(-3px);
          }
        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 600px) {
          .resume-btn {
            right: 5vw;
            bottom: 4vh;
          }

          .resume-btn.expanded {
            width: 175px;
          }
        }

        /* =========================================
           ACCESSIBILITY
        ========================================= */

        @media (prefers-reduced-motion: reduce) {
          .resume-btn,
          .btn-icon,
          .btn-label,
          .spark {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default ResumeBtn;
