import React from "react";
import TechStack from "./TechStack";

const Skills: React.FC = () => {
  return (
    <section className="flex min-h-screen w-full items-center justify-center overflow-visible px-3 py-10 sm:px-5 lg:px-8">
      <div
        className="
          relative flex w-full max-w-100 flex-col items-center
          overflow-visible
          lg:w-[min(90vw,82rem)] lg:max-w-none
          lg:flex-row lg:items-center
        "
      >
        {/* Text panel */}
        <div
          className="
            relative z-10 w-full max-w-60 mx-auto min-w-0
            rounded-t-[1.6rem] rounded-b-none
            border border-b-0 border-white/12
            bg-linear-to-br from-white/9 via-white/4 to-white/2
            px-5 pb-32 pt-8
            text-center
            shadow-[0_20px_80px_rgba(0,0,0,0.3)]
            backdrop-blur-2xl
            sm:px-7 sm:pt-10

            lg:w-auto lg:max-w-none lg:min-h-100 lg:flex-1
            lg:rounded-l-[1.6rem] lg:rounded-r-none
            lg:border lg:border-r-0
            lg:px-[4vw] lg:py-12 lg:pr-52
            lg:text-left
          "
        >
          {/* Ambient glow */}
          <div
            className="
              pointer-events-none absolute
              -right-20 -top-20
              h-48 w-48 rounded-full
              bg-[#f5f0df]/[0.07] blur-[80px]
            "
          />

          {/* Heading */}
          <h2
            className="
    relative w-full
    text-[clamp(1.15rem,5vw,1.6rem)]
    leading-[1.2] tracking-normal
    text-white wrap-break-word
    lg:text-[clamp(2.6rem,3.2vw,3.5rem)]
    lg:tracking-wide
  "
            style={{
              fontFamily: '"Nunito", ui-rounded, system-ui, sans-serif',
              fontWeight: 900,
            }}
          >
            Full Stack Developer
          </h2>

          {/* Mobile description */}
          <p className="relative mx-auto text-sm leading-relaxed text-white/75 lg:hidden p-4">
            Building full-stack applications with React, Node.js, and modern
            technologies, with interests in AI/ML and Linux.
          </p>

          {/* Desktop description */}
          <p
            className="
              relative m-4 mx-auto hidden
              w-full max-w-[58ch]
              text-[clamp(1rem,1.15vw,1.2rem)]
              leading-[1.7] text-white/75
              lg:mx-0 lg:block
            "
          >
            I build full-stack applications using React, Next.js, Node.js, and
            Express, with a strong foundation in C++, Data Structures &
            Algorithms, and Database Management. I enjoy developing scalable
            backend systems, integrating APIs, and exploring AI/ML solutions.
            From building AI-powered platforms to custom Linux environments, I
            turn ideas into practical, well-engineered solutions.
          </p>
        </div>

        {/* Watch / TechStack */}
        <div
          className="
    relative z-20
    -mt-24 flex w-full min-w-60 shrink-0
    items-center justify-center
    lg:mt-0 lg:-ml-28
    lg:w-105
  "
        >
          <TechStack />
        </div>
      </div>
    </section>
  );
};

export default Skills;
