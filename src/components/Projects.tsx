import React, { useEffect, useRef, useState } from "react";

type Project = {
  title: string;
  description: string;
  image: string;
  url?: string;
  github?: string;
};

const projects: Project[] = [
  {
    title: "CareerCopilot: AI Interview Preparation Platform",
    description:
      "AI-powered career platform with resume analysis, job description matching, mock interviews, DSA practice, and personalized interview preparation.",
    image: "icons/projects/careercopilot.png",
    url: "https://careercopilot-kuljeet.vercel.app",
    github: "https://github.com/kulj33t/CareerCopilot",
  },

  {
    title: "Linux Customization & Dotfiles",
    description:
      "Personal configuration files for a custom Linux desktop experience, featuring tailored setups for Waybar, wofi, and custom Python GTK tools for system management.",
    image: "icons/projects/linux.png",
    url: "/dotFiles",
    github: "https://github.com/kulj33t/dotfiles",
  },

  {
    title: "LeChat: Real-Time Chat Application",
    description:
      "Full-stack real-time chat app with Socket.IO, JWT authentication, role-based access, and Cloudinary uploads.",
    image: "icons/projects/lechat.png",
    url: "https://lechat-public.vercel.app",
    github: "https://github.com/kulj33t/LeChat",
  },

  {
    title: "RateIt",
    description:
      "A full-stack MERN application for tracking and ranking TV series. Features a unique S-Tier to F-Tier rating system, real-time community consensus charts, and a personalized library dashboard. Built with React, Tailwind CSS, Framer Motion, and a robust Node/Express backend.",
    image: "icons/projects/rateit.png",
    url: "https://rateitorhateit.vercel.app",
    github: "https://github.com/kulj33t/rateitorhateit",
  },

  {
    title: "AI ChatBot Assistant",
    description:
      "AI chatbot powered by Google Generative AI API, featuring contextual query handling and async streaming.",
    image: "icons/projects/chatbot.png",
    url: "https://chatbot-public.vercel.app",
    github: "https://github.com/kulj33t/Chatbot",
  },

  {
    title: "AttendX",
    description:
      "Geolocation-based attendance app built with React Native, Expo, and Figma for UI/Frontend design.",
    image: "icons/projects/attendx.png",
    github: "https://github.com/kulj33t/AttendX",
  },

  {
    title: "Portfolio",
    description:
      "Kuljeet Singh's personal portfolio showcasing projects, UI/UX designs, and technical skills built with React and modern frontend practices.",
    image: "icons/projects/portfolio.png",
    url: "https://kuljeet.vercel.app",
    github: "https://github.com/kulj33t/Portfolio",
  },
];

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollByCard = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const card = container.firstElementChild as HTMLElement;

    if (!card) return;

    const gap = 16;
    const scrollAmount = card.offsetWidth + gap;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const checkArrows = () => {
    if (!containerRef.current) return;

    const {
      scrollLeft,
      scrollWidth,
      clientWidth,
    } = containerRef.current;

    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    checkArrows();

    const container = containerRef.current;

    container?.addEventListener("scroll", checkArrows);
    window.addEventListener("resize", checkArrows);

    return () => {
      container?.removeEventListener("scroll", checkArrows);
      window.removeEventListener("resize", checkArrows);
    };
  }, []);

  return (
    <section
      className="
        min-h-screen
        w-screen
        bg-black/80
        px-[4vw]
        py-[6vh]
        flex
        items-center
        justify-center
      "
    >
      <div
        className="
          w-[90%]
          max-w-[1400px]
          flex
          flex-col
          gap-[4vh]
          relative
        "
      >

        <h1
          className="
            mb-[6vh]
            text-center
            text-[clamp(1.8rem,2vw+1vh,3rem)]
            tracking-wide
            text-white
            font-[Tenkai]
          "
        >
          A small selection of recent projects
        </h1>


        <div
          className="
            relative
            w-full
            overflow-hidden
          "
        >

          {canScrollLeft && (
            <button
              onClick={() => scrollByCard("left")}
              className="
                absolute
                left-0
                top-1/2
                -translate-y-1/2
                z-20
                h-14
                w-14
                rounded-full
                bg-black/60
                text-white
                text-3xl
                flex
                items-center
                justify-center
                transition
                hover:bg-black/90
              "
            >
              &#10094;
            </button>
          )}


          <div
            ref={containerRef}
            className="
              flex
              overflow-x-auto
              scroll-smooth
              pt-8
              pb-8
              scrollbar-hide
            "
          >

            {projects.map(
              ({ title, description, image, url, github }, idx) => (
                <div
                  key={title}
                  style={{
                    backgroundImage: `url(${image})`,
                    marginLeft:
                      idx === 0 ? "2rem" : "1rem",
                    marginRight:
                      idx === projects.length - 1
                        ? "2rem"
                        : "1rem",
                  }}
                  className="
                    group
                    relative
                    shrink-0

                    w-[320px]
                    h-[420px]

                    rounded-2xl
                    overflow-hidden

                    bg-cover
                    bg-center

                    shadow-[0_0_15px_rgba(255,255,255,.15)]

                    transition-all
                    duration-300

                    hover:-translate-y-2
                    hover:scale-[1.02]

                    hover:shadow-[0_0_20px_rgba(255,255,255,.6),0_12px_32px_rgba(0,0,0,.4)]
                  "
                >

                  <div
                    className="
                      absolute
                      inset-0

                      flex
                      flex-col

                      p-6

                      text-center
                      text-white

                      opacity-0
                      translate-y-5

                      bg-black/20

                      transition-all
                      duration-400

                      group-hover:opacity-100
                      group-hover:translate-y-0

                      group-hover:bg-black/40
                      group-hover:backdrop-blur-md

                      min-h-0
                    "
                  >

                    <h2
                      className="
                        text-lg
                        md:text-xl
                        font-bold
                        leading-tight
                        line-clamp-2
                      "
                    >
                      {title}
                    </h2>


                    <p
                      className="
                        mt-3

                        text-sm
                        md:text-[15px]

                        leading-6
                        text-gray-300

                        line-clamp-6
                      "
                    >
                      {description}
                    </p>


                    <div
                      className="
                        mt-auto
                        flex
                        flex-col
                        gap-3
                      "
                    >

                      {url && (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            rounded-full

                            bg-white

                            px-6
                            py-3

                            text-center
                            font-semibold
                            text-black

                            transition-all
                            duration-300

                            hover:-translate-y-1

                            hover:shadow-[0_6px_14px_rgba(0,0,0,.25),0_0_10px_rgba(192,132,252,.6)]

                            active:scale-95
                          "
                        >
                          Live
                        </a>
                      )}


                      {github && (
                        <a
                          href={github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            rounded-full

                            border
                            border-neutral-700

                            bg-neutral-900

                            px-6
                            py-3

                            text-center
                            font-semibold
                            text-white

                            transition-all
                            duration-300

                            hover:-translate-y-1

                            hover:shadow-[0_6px_14px_rgba(0,0,0,.25),0_0_10px_rgba(192,132,252,.6)]

                            active:scale-95
                          "
                        >
                          GitHub
                        </a>
                      )}

                    </div>

                  </div>

                </div>
              )
            )}

          </div>


          {canScrollRight && (
            <button
              onClick={() => scrollByCard("right")}
              className="
                absolute
                right-0
                top-1/2
                -translate-y-1/2

                z-20

                h-14
                w-14

                rounded-full

                bg-black/60

                text-white
                text-3xl

                flex
                items-center
                justify-center

                transition

                hover:bg-black/90
              "
            >
              &#10095;
            </button>
          )}

        </div>

      </div>
    </section>
  );
};

export default Projects;