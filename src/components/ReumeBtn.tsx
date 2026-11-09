import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ResumeBtn: React.FC = () => {
  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth >= window.innerHeight
  );

  useEffect(() => {
    const handleResize = () =>
      setIsLandscape(window.innerWidth >= window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Link
        to="/resume"
        className={`resume-btn${isLandscape ? " landscape" : ""}`}
        aria-label="View and download resume"
      >
        {/* Floating spark particles */}
        <span className="sparks" aria-hidden="true">
          <span className="spark s1" />
          <span className="spark s2" />
          <span className="spark s3" />
          <span className="spark s4" />
          <span className="spark s5" />
        </span>

        {/* CV icon (visible by default) */}
        <span className="btn-icon">
          <img src="/icons/cv.png" alt="" draggable={false} />
        </span>

        {/* Label (revealed on hover in landscape) */}
        <span className="btn-label">View Resume</span>
      </Link>

      <style>{`
        /* ─── Button shell ─────────────────────────────────────── */
        .resume-btn {
          position: fixed;
          bottom: 5vh;
          right: 3vw;
          z-index: 200;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.96);
          color: #111;
          text-decoration: none;
          font-weight: 650;
          font-size: 0.875rem;
          cursor: pointer;
          overflow: visible;
          transition:
            width 0.42s cubic-bezier(.4,0,.2,1),
            border-radius 0.42s cubic-bezier(.4,0,.2,1),
            background 0.42s ease,
            color 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease,
            transform 0.3s ease;
          box-shadow:
            0 0 0 0 rgba(216,122,255,0),
            0 4px 24px rgba(0,0,0,0.3);
        }

        /* ─── Landscape hover expand ───────────────────────────── */
        .resume-btn.landscape:hover {
          width: 190px;
          border-radius: 2rem;
          background: #0a0a0a;
          color: #fff;
          border-color: rgba(216,122,255,0.55);
          box-shadow:
            0 0 0 4px rgba(216,122,255,0.12),
            0 0 32px rgba(216,122,255,0.35),
            0 8px 32px rgba(0,0,0,0.5);
          transform: translateY(-3px);
          gap: 0.55rem;
        }

        /* ─── CV icon ──────────────────────────────────────────── */
        .btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .btn-icon img {
          width: 28px;
          height: 28px;
          object-fit: contain;
          pointer-events: none;
          transition: filter 0.3s ease;
        }
        .resume-btn.landscape:hover .btn-icon {
          opacity: 0;
          width: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .resume-btn.landscape:hover .btn-icon img {
          width: 0;
        }

        /* ─── Label ────────────────────────────────────────────── */
        .btn-label {
          white-space: nowrap;
          overflow: hidden;
          max-width: 0;
          opacity: 0;
          visibility: hidden;
          letter-spacing: 0.03em;
          transition:
            max-width 0.38s cubic-bezier(.4,0,.2,1),
            opacity 0.3s ease 0.08s,
            visibility 0s linear 0.4s;
        }
        .resume-btn.landscape:hover .btn-label {
          max-width: 160px;
          opacity: 1;
          visibility: visible;
          transition:
            max-width 0.38s cubic-bezier(.4,0,.2,1),
            opacity 0.3s ease 0.08s,
            visibility 0s linear 0s;
        }

        /* ─── Spark container ──────────────────────────────────── */
        .sparks {
          position: absolute;
          top: -6px;
          right: -6px;
          width: 0;
          height: 0;
          pointer-events: none;
        }

        /* ─── Individual spark ─────────────────────────────────── */
        .spark {
          position: absolute;
          border-radius: 50%;
          animation: floatSpark linear infinite;
          opacity: 0;
        }

        /* Sizes & colours — alternating purple / white / cyan */
        .s1 { width: 5px; height: 5px; background: #d87aff; bottom: 0; left: 2px;  animation-duration: 2.1s; animation-delay: 0.0s; }
        .s2 { width: 4px; height: 4px; background: #fff;    bottom: 0; left: -6px; animation-duration: 2.5s; animation-delay: 0.5s; }
        .s3 { width: 3px; height: 3px; background: #7af8ff; bottom: 0; left: -2px; animation-duration: 1.8s; animation-delay: 1.0s; }
        .s4 { width: 4px; height: 4px; background: #d87aff; bottom: 0; left: -10px;animation-duration: 2.3s; animation-delay: 1.5s; }
        .s5 { width: 3px; height: 3px; background: #fff;    bottom: 0; left: 6px;  animation-duration: 2.0s; animation-delay: 0.8s; }

        @keyframes floatSpark {
          0%   { transform: translateY(0)   translateX(0)    scale(1);   opacity: 0;   }
          10%  { opacity: 1; }
          60%  { opacity: 0.7; }
          100% { transform: translateY(-28px) translateX(var(--drift, 3px)) scale(0.4); opacity: 0; }
        }

        .s1 { --drift:  3px; }
        .s2 { --drift: -4px; }
        .s3 { --drift:  1px; }
        .s4 { --drift: -2px; }
        .s5 { --drift:  5px; }
      `}</style>
    </>
  );
};

export default ResumeBtn;
