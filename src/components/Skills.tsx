import React from "react";
import TechStack from "./TechStack";

const Skills: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-2 py-6">
      {/* 
        Layout: Kept exactly the same (w-[350px], lg:w-[60vw], etc.)
        Aesthetics: Added the group, border, gradient, backdrop-blur-2xl, and shadow from About 
      */}
      <div
        className="group relative flex flex-col overflow-visible rounded-[1.6vh] transition-all duration-500 ease-in-out lg:flex-row 
        w-[350px] max-w-full min-h-[660px] 
        lg:w-[60vw] lg:min-w-[700px] lg:max-w-[70vw] lg:h-[400px] lg:min-h-0
        border border-white/12 bg-linear-to-br from-white/9 via-white/4 to-white/2 shadow-[0_20px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl hover:border-white/20 hover:shadow-[0_25px_90px_rgba(0,0,0,0.4)]"
      >
        {/* Decorative Glow from About */}
        <div className="pointer-events-none absolute -right-20 -top-20 z-0 h-48 w-48 rounded-full bg-[#f5f0df]/[0.07] blur-[80px] transition-all duration-700 group-hover:bg-[#f5f0df]/12" />

        {/* Left Content */}
        <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-center items-center text-center px-[4vw] py-[4vh] lg:items-start lg:text-left">
          <h2 className="mb-[2vh] font-['Tenkai',sans-serif] text-[clamp(1.8rem,2vw+1vh,2.4rem)] tracking-wide text-white">
            Full Stack Developer
          </h2>

          {/* Color updated to match the About text (white/70) */}
          <p className="text-[clamp(0.9rem,1vw+0.4vh,1.1rem)] leading-[1.6] text-white/70">
            I specialize in building modern, scalable, and user-centric web
            applications. From crafting responsive interfaces using React and
            TypeScript to developing robust backend systems, APIs, and database
            solutions, I enjoy turning ideas into complete, high-performance
            applications with clean and maintainable code.
          </p>
        </div>

        {/* Skills Wheel (Apple Watch) */}
        <div className="relative z-10 flex w-full shrink-0 items-center justify-center overflow-visible lg:w-[350px]">
          <TechStack />
        </div>
      </div>
    </div>
  );
};

export default Skills;
