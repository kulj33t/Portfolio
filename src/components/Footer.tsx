import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="h-screen w-screen bg-white/[0.025] backdrop-blur-[2px] flex justify-center items-center px-[5vw] py-[5vh] text-[#ccc] relative text-center">
      <div className="w-[clamp(280px,70vw,800px)] flex flex-col items-center gap-[clamp(1.5rem,3vh,2.5rem)] px-[2vw] py-[3vh] rounded-[1.6vh] shadow-[0_0.4vh_3vh_rgba(0,0,0,0.1)]">
        <h1 className="text-[clamp(1.5rem,2vw+1vh,3rem)] text-white font-['Tenkai',_sans-serif] tracking-[2px]">
          Let’s Connect
        </h1>
        <p className="text-[clamp(0.9rem,1vw+0.5vh,1.2rem)] text-[#bbb] leading-[1.6] max-w-[600px]">
          Feel free to reach out for collaborations or just a friendly hello!
        </p>

        <div className="flex gap-[clamp(1rem,2vw,2rem)] mt-[1vh]">
          <a
            href="mailto:kuljeet.singh.dev@gmail.com"
            className="w-[clamp(40px,4vw,48px)] h-[clamp(40px,4vw,48px)] rounded-full bg-white/[0.08] flex items-center justify-center transition-transform duration-200 ease cursor-pointer hover:scale-110"
          >
            <img 
              src="/icons/social/email.png" 
              alt="Email" 
              className="w-[clamp(20px,2vw,28px)] h-[clamp(20px,2vw,28px)] object-contain" 
            />
          </a>

          <a
            href="https://github.com/kulj33t"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[clamp(40px,4vw,48px)] h-[clamp(40px,4vw,48px)] rounded-full bg-white/[0.08] flex items-center justify-center transition-transform duration-200 ease cursor-pointer hover:scale-110"
          >
            <img 
              src="/icons/social/github.png" 
              alt="GitHub" 
              className="w-[clamp(20px,2vw,28px)] h-[clamp(20px,2vw,28px)] object-contain" 
            />
          </a>

          <a
            href="https://linkedin.com/in/kulj33t"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[clamp(40px,4vw,48px)] h-[clamp(40px,4vw,48px)] rounded-full bg-white/[0.08] flex items-center justify-center transition-transform duration-200 ease cursor-pointer hover:scale-110"
          >
            <img 
              src="/icons/social/linkedin.png" 
              alt="LinkedIn" 
              className="w-[clamp(20px,2vw,28px)] h-[clamp(20px,2vw,28px)] object-contain" 
            />
          </a>
        </div>

        <p className="text-[clamp(0.75rem,1vw,0.95rem)] text-[#888] mt-[2vh]">
          © 2026 Kuljeet Singh
        </p>
      </div>
    </footer>
  );
};

export default Footer;