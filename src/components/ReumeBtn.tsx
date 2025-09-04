import React from "react";

const ResumeBtn: React.FC = () => {
  const resumeLink = "https://drive.google.com/file/d/1WR00yPvkexbhAvxJPpEXFNZkIJ4j894U/view?usp=drivesdk";


  return (
    
    <>
      <a
        href={resumeLink}
        target="_blank"
        rel="noopener noreferrer"
        className="resume-btn"
      >
        Download Resume
        <span className="stars">
          <span className="star star1" />
          <span className="star star2" />
          <span className="star star3" />
        </span>
      </a>

      <style>
        {`
          .resume-btn {
            position: fixed;
            bottom: 5vh;
            right: 3vw;
            padding: 1rem 2rem;
            font-size: 1rem;
            font-weight: 600;
            border-radius: 2rem;
            background: rgba(255, 255, 255, 0.9);
            color: #111;
            text-decoration: none;
            letter-spacing: 1px;
            border: 2px solid transparent;
            cursor: pointer;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
            transition: all 0.4s ease, transform 0.25s ease;
            z-index: 200;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            overflow: visible;
          }

          .resume-btn:hover {
            background: rgba(20, 20, 20, 0.95);
            color: #fff;
            border-color: #fff;
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
            transform: translateY(-4px) scale(1.05);
          }

          .resume-btn .stars {
            position: absolute;
            top: -10px;
            right: -12px;
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
            top: -8px;
            left: 14px;
            width: 6px;
            height: 6px;
            animation-delay: 0.5s;
          }
          .star3 {
            top: 10px;
            left: 8px;
            width: 7px;
            height: 7px;
            animation-delay: 1s;
          }

          @keyframes twinkle {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.6);
              opacity: 0.6;
            }
          }
        `}
      </style>
    </>
  );
};

export default ResumeBtn;
