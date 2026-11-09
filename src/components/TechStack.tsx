import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  { name: "UI/UX Design", icon: "/icons/skills/uiux.png" },
  { name: "React Native", icon: "/icons/skills/native.png" },
  { name: "Tailwind CSS", icon: "/icons/skills/css.png" },
  { name: "JavaScript / TypeScript", icon: "/icons/skills/js.png" },
  { name: "Figma", icon: "/icons/skills/figma.png" },
  { name: "React.js", icon: "/icons/skills/react.png" },
  { name: "Framer", icon: "/icons/skills/framer.png" },
  { name: "Git & Version Control", icon: "/icons/skills/git.png" },
  { name: "Responsive Design", icon: "/icons/skills/design.png" },
  { name: "Linux", icon: "/icons/skills/linux.png" },
  { name: "API Integration", icon: "/icons/skills/api.png" },
];

const TechStack: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  const syncTransition = {
    duration: 5,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut",
  };

  return (
    <div className="flex items-center justify-center p-10">
      <div
        ref={ref}
        className="relative rounded-[2.8rem] bg-linear-to-br from-[#8c8c91] via-[#4a4a4d] to-[#1e1e20] p-0.75 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_4px_rgba(255,255,255,0.4)]"
      >
        {/* Thick Black Bezel */}
        <div className="relative rounded-[2.6rem] border-8 border-black bg-black shadow-[inset_0_0_15px_rgba(0,0,0,1)]">
          {/* Main Screen */}
          <div className="relative flex h-105 w-85 items-center justify-center overflow-hidden rounded-[2.2rem] bg-[#0a0a0a]">
            {/* Scrolling Content */}
            <motion.div
              className="z-1 flex flex-col items-center"
              animate={isInView ? { y: ["25%", "-25%"] } : { y: 0 }}
              transition={syncTransition}
            >
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="my-2 flex w-[80%] min-w-[320px] items-center gap-4 rounded-xl bg-white/10 px-6 py-3 text-[1.2rem] font-bold text-white shadow-[0_4px_10px_rgba(0,0,0,0.2)] backdrop-blur-sm border border-white/5"
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="h-8 w-8 object-contain"
                  />
                  {skill.name}
                </div>
              ))}
            </motion.div>

            {/* Screen Depth & Vignette */}
            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background: `
                  radial-gradient(ellipse at center, rgba(10,10,10,0) 40%, rgba(10,10,10,0.5) 70%, rgba(10,10,10,0.9) 100%),
                  linear-gradient(to right, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0) 20%, rgba(10,10,10,0) 80%, rgba(10,10,10,0.8) 100%)
                `,
              }}
            />

            {/* Curved Glass Glare Overlay */}
            <div className="pointer-events-none absolute inset-0 z-20 rounded-[2.2rem] bg-linear-to-tr from-transparent via-white/3 to-white/12 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]" />
          </div>
        </div>

        {/* 3D Digital Crown */}
        <div className="absolute -right-3.75 top-[22%] h-18 w-3.5 overflow-hidden rounded-r-lg border-y border-r border-[#1a1a1a] bg-linear-to-r from-[#2c2c2e] to-[#6a6a6d] shadow-[-2px_0_4px_inset_rgba(0,0,0,0.8),3px_5px_10px_rgba(0,0,0,0.5)]">
          <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-black/80 via-transparent to-black/80" />

          {/* Moving Grooves */}
          <motion.div
            className="h-[400%] w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, #9ca3af 0px, #9ca3af 2px, #1f2937 2px, #1f2937 5px)",
            }}
            animate={isInView ? { y: ["-75%", "0%"] } : { y: 0 }}
            transition={syncTransition}
          />
        </div>

        {/* Flush Side Button */}
        <div className="absolute -right-1 top-[55%] h-14 w-1.25 rounded-r-sm border-y border-r border-[#151515] bg-linear-to-r from-[#2c2c2e] to-[#4a4a4d] shadow-[-1px_0_2px_inset_rgba(0,0,0,0.8),2px_2px_5px_rgba(0,0,0,0.4)]" />
      </div>
    </div>
  );
};

export default TechStack;
