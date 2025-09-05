import React, { useState, useEffect } from "react";

const ResumeBtn: React.FC = () => {
  const resumeLink =
    "https://drive.google.com/file/d/1WR00yPvkexbhAvxJPpEXFNZkIJ4j894U/view?usp=drivesdk";


  const [isPortrait, setIsPortrait] = useState(window.innerWidth < window.innerHeight);


  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerWidth < window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <a
        href={resumeLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`resume-btn ${!isPortrait ? "landscape-hover" : ""}`}
      >
        <span className="stars">
          <span className="star star1" />
          <span className="star star2" />
          <span className="star star3" />
        </span>

        <span className="resume-icon">
          <img src="/icons/cv.png" alt="Resume" />
        </span>

        <span className="resume-text">Download Resume</span>
      </a>

      <style>
        {`
          .resume-btn {
            position: fixed;
            bottom: 5vh;
            right: 3vw;
            background: white;
            color: #111;
            text-decoration: none;
            cursor: pointer;
            border: 2px solid transparent;
            z-index: 200;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: all 0.4s ease;
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
            transform-origin: center right;
            font-weight: 600;
            font-size: 1rem;
          }

          /* Only apply hover effect if landscape */
          .landscape-hover:hover {
            width: 220px;
            padding: 1rem 2rem;
            border-radius: 2rem;
            background: rgba(20, 20, 20, 0.95);
            color: #fff;
            border-color: #fff;
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
            transform: translateY(-4px) scale(1.05);
          }

          .resume-icon {
            display: flex;
            justify-content: center; 
            align-items: center;
            width: 100%;
            height: 100%;
          }

          .resume-icon img {
            height:32px;
            width:32px;
            transition: all 0.3s ease;
            margin-left:12px;
          }

          .resume-text {
            margin-left: 0.6rem;
            white-space: nowrap;
            opacity: 0;
            max-width: 0px;
            transition: all 0.3s ease;
            pointer-events: none;
            visibility: hidden;
          }

          .landscape-hover:hover .resume-text {
            opacity: 1;
            max-width: 200px;
            visibility: visible;
          }

          .landscape-hover:hover .resume-icon img {
            opacity: 0;
            width: 0px;
            height: 0px;
          }

          .resume-btn .stars {
            position: absolute;
            top: -15px;
            right: -10px;
            pointer-events: none;
          }

          .star {
            position: absolute;
            width: 8px; 
            height: 8px;
            background: white;
            border-radius: 50%;
            box-shadow: 0 0 8px rgba(255, 255, 255, 0.9);
            animation: twinkle 2s infinite ease-in-out;
          }

          .star1 {
            top: 0;
            left: 0;
            animation-delay: 0s;
          }
          .star2 {
            top: 15px;
            left: -10px;
            animation-delay: 0.5s;
          }
          .star3 {
            top: -10px;
            left: -18px;
            animation-delay: 1s;
          }

          @keyframes twinkle {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.5);
              opacity: 0.6;
            }
          }
        `}
      </style>
    </>
  );
};

export default ResumeBtn;
