import React, { useState } from "react";

type TabType = "Education" | "Experience";

const TimelineItem: React.FC<{
  year: string;
  title: string;
  description: string;
}> = ({ year, title, description }) => (
  <div className="relative mb-10">
    <div className="absolute -left-15 top-0 h-4.5 w-4.5 rounded-full border-[3px] border-white bg-white" />

    <div className="pl-2.5">
      <h3 className="mb-1 text-[clamp(1.4rem,1.5vw+1vh,1.6rem)] text-white">
        {title}
      </h3>

      <time className="mb-[1vh] block text-[clamp(1rem,1.1vw+0.6vh,1.2rem)] text-[#aaa]">
        {year}
      </time>

      <p className="text-left text-[clamp(1rem,1.2vw+0.6vh,1.2rem)] leading-[1.7] text-[#ddd]">
        {description}
      </p>
    </div>
  </div>
);

const EduExp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Education");

  const educationData = [
    {
      year: "2023 - 2027",
      title: "B.Tech in Information Technology",
      description:
        "Currently pursuing B.Tech from BIT Sindri with a focus on Full Stack Development, software engineering, and data structures.",
    },
    {
      year: "2022",
      title: "Intermediate",
      description:
        "Completed from JNV Basohli, Kathua (J&K), with a focus on science and mathematics.",
    },
    {
      year: "2020",
      title: "Matriculation",
      description:
        "Completed from JNV Basohli, Kathua (J&K), with a focus on core academic subjects.",
    },
  ];

  const experienceData = [
    {
      year: "May 2025",
      title: "Finalist at HACKATRON, HNCC BIT Sindri",
      description:
        "Competed in a highly competitive hackathon, showcasing problem-solving skills, innovation, and Full Stack Development capabilities.",
    },
    {
      year: "2025",
      title: "Internship",
      description:
        "Details of internship responsibilities and Full Stack Development projects will be provided soon.",
    },
  ];

  return (
    <div className="relative flex h-screen w-screen items-center justify-center box-border">
      <section className="flex h-[70vh] min-h-50 w-[50vw] min-w-87.5 flex-col items-center justify-start overflow-visible rounded-[1.6vh] bg-white/5 p-12 text-left text-[#ccc] shadow-[0_0.4vh_3vh_rgba(0,0,0,0.1)] backdrop-blur-[10px] text-[1.1rem] max-sm:w-[95vw] max-sm:p-6">
        {/* Tabs */}
        <div className="relative mb-[8vh] flex w-full items-center justify-center">
          <div className="relative flex items-center">
            {activeTab === "Experience" && (
              <span
                aria-hidden
                className="absolute -left-5 top-1/2 -translate-y-1/2 animate-[smoothBlink_1.6s_ease-in-out_infinite] text-white pointer-events-none"
              >
                ▶
              </span>
            )}

            <button
              onClick={() => setActiveTab("Education")}
              className={`whitespace-nowrap border-b-2 bg-transparent px-3 py-2 font-['Tenkai',sans-serif] transition-all duration-300 ${
                activeTab === "Education"
                  ? "border-white text-white text-[calc(clamp(1.2rem,1.8vw+0.6vh,1.4rem)+4px)]"
                  : "border-transparent text-white/40 text-[clamp(1.2rem,1.8vw+0.6vh,1.4rem)]"
              }`}
            >
              Education
            </button>
          </div>

          <div className="relative flex items-center">
            {activeTab === "Education" && (
              <span
                aria-hidden
                className="absolute -right-5 top-1/2 -translate-y-1/2 animate-[smoothBlink_1.6s_ease-in-out_infinite] text-white pointer-events-none"
              >
                ◀
              </span>
            )}

            <button
              onClick={() => setActiveTab("Experience")}
              className={`whitespace-nowrap border-b-2 bg-transparent px-3 py-2 font-['Tenkai',sans-serif] transition-all duration-300 ${
                activeTab === "Experience"
                  ? "border-white text-white text-[calc(clamp(1.2rem,1.8vw+0.6vh,1.4rem)+4px)]"
                  : "border-transparent text-white/40 text-[clamp(1.2rem,1.8vw+0.6vh,1.4rem)]"
              }`}
            >
              Experience
            </button>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="relative w-full flex-1 overflow-hidden">
          {/* Education */}
          <div
            className={`absolute h-full w-full overflow-y-auto px-2.5 transition-all duration-500 scrollbar-none ${
              activeTab === "Education"
                ? "visible translate-x-0 opacity-100"
                : "invisible translate-x-full opacity-0"
            }`}
          >
            <div className="relative border-l-2 border-[#ccc] pl-12.5 pr-4">
              {educationData.map((item, index) => (
                <TimelineItem key={`edu-${index}`} {...item} />
              ))}
            </div>
          </div>

          {/* Experience */}
          <div
            className={`absolute h-full w-full overflow-y-auto px-2.5 transition-all duration-500 scrollbar-none ${
              activeTab === "Experience"
                ? "visible translate-x-0 opacity-100"
                : "invisible translate-x-full opacity-0"
            }`}
          >
            <div className="relative border-l-2 border-[#ccc] pl-12.5 pr-4">
              {experienceData.map((item, index) => (
                <TimelineItem key={`exp-${index}`} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blink Animation */}
      <style>
        {`
          @keyframes smoothBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}
      </style>
    </div>
  );
};

export default EduExp;
