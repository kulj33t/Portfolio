import React from "react";
import TechStack from "./TechStack";

const Skills: React.FC = () => {
  return (
    <section className="flex min-h-screen min-h-[100svh] w-full items-center justify-center overflow-visible px-3 py-10 sm:px-5 lg:px-8">
      <div
        className="
          relative flex w-full max-w-[25rem] flex-col items-center
          overflow-visible
          lg:w-[min(90vw,82rem)] lg:max-w-none
          lg:flex-row lg:items-center
        "
      >
        {/* Text panel */}
        <div
          className="
            relative z-10 w-[58%] min-w-0
            rounded-t-[1.6rem] rounded-b-none
            border border-b-0 border-white/12
            bg-linear-to-br from-white/9 via-white/4 to-white/2
            px-5 pb-32 pt-8
            text-center
            shadow-[0_20px_80px_rgba(0,0,0,0.3)]
            backdrop-blur-2xl
            sm:px-7 sm:pt-10
            lg:w-auto lg:min-h-100 lg:flex-1
            lg:rounded-l-[1.6rem] lg:rounded-r-none
            lg:border lg:border-r-0
            lg:px-[4vw] lg:py-12 lg:pr-[13rem]
            lg:text-left
          "
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#f5f0df]/[0.07] blur-[80px]" />

          <h2
            className="
              relative mb-6
              font-['Tenkai',sans-serif]
              text-[clamp(2rem,6vw,2.5rem)]
              leading-[1.2] tracking-wide text-white
              lg:text-[clamp(2.6rem,3.2vw,3.5rem)]
            "
          >
            Full Stack Developer
          </h2>

          <p
            className="
              relative mx-auto max-w-2xl
              text-[clamp(0.86rem,3.5vw,1rem)]
              leading-[1.65] text-white/75
              lg:mx-0 lg:text-[clamp(1rem,1.15vw,1.2rem)]
              lg:leading-[1.7]
            "
          >
            I specialize in building modern, scalable, and user-centric web
            applications. From crafting responsive interfaces using React and
            TypeScript to developing robust backend systems, APIs, and database
            solutions, I enjoy turning ideas into complete, high-performance
            applications with clean and maintainable code.
          </p>
        </div>

        {/* Watch */}
        <div
          className="
            relative z-20 -mt-24 flex w-full shrink-0
            items-center justify-center
            lg:mt-0 lg:-ml-28 lg:w-[26.25rem]
          "
        >
          <TechStack />
        </div>
      </div>
    </section>
  );
};

export default Skills;
