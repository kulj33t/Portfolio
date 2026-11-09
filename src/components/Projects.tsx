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
      "A full-stack MERN application for tracking and ranking TV series. Features a unique S-Tier to F-Tier rating system, real-time community consensus charts, and a personalized library dashboard.",
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

  // Track active card for mobile taps
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Close active card if user taps outside of any card on mobile
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".project-card")) {
        setActiveCard(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick, {
      passive: true,
    });
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  const scrollByCard = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const card = container.firstElementChild as HTMLElement;
    if (!card) return;

    const scrollAmount = card.offsetWidth + 16;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const checkArrows = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5);
  };

  useEffect(() => {
    checkArrows();
    const container = containerRef.current;
    container?.addEventListener("scroll", checkArrows, { passive: true });
    window.addEventListener("resize", checkArrows);

    return () => {
      container?.removeEventListener("scroll", checkArrows);
      window.removeEventListener("resize", checkArrows);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center bg-black/80 py-16 md:py-24">
      <div className="relative w-full max-w-[1400px]">
        <h1
          className="mb-8 px-6 text-center text-[clamp(1.5rem,3vw+1rem,3rem)] font-medium tracking-wide text-white md:mb-12"
          style={{ fontFamily: "Tenkai, sans-serif" }}
        >
          A small selection of recent projects
        </h1>

        <div className="group/slider relative w-full">
          {/* Left Navigation Arrow */}
          <button
            onClick={() => scrollByCard("left")}
            disabled={!canScrollLeft}
            className={`absolute left-4 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-black/60 text-2xl text-white backdrop-blur-md transition-all duration-300 ease-out hover:scale-110 hover:border-white/20 hover:bg-black/90 disabled:pointer-events-none disabled:opacity-0 md:flex xl:-left-6 ${
              canScrollLeft ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Scroll Left"
          >
            &#10094;
          </button>

          {/* Scroll Container */}
          <div
            ref={containerRef}
            className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-12 pt-4 md:gap-6 md:px-12 xl:px-20
                       [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {projects.map(({ title, description, image, url, github }, idx) => (
              <div
                key={title}
                onClick={() => setActiveCard(activeCard === idx ? null : idx)}
                data-active={activeCard === idx}
                style={{ backgroundImage: `url(${image})` }}
                className="project-card group relative h-[380px] w-[75vw] max-w-[280px] shrink-0 snap-center cursor-pointer overflow-hidden rounded-[1.6vh] bg-cover bg-center transition-all duration-500 ease-in-out
                           border border-white/12 shadow-[0_20px_80px_rgba(0,0,0,0.3)]
                           sm:h-[420px] sm:max-w-[320px] lg:h-[480px] lg:max-w-[360px]
                           [@media(hover:hover)]:hover:-translate-y-3 [@media(hover:hover)]:hover:border-white/20 [@media(hover:hover)]:hover:shadow-[0_25px_90px_rgba(0,0,0,0.4)]
                           data-[active=true]:-translate-y-3 data-[active=true]:border-white/20 data-[active=true]:shadow-[0_25px_90px_rgba(0,0,0,0.4)]"
              >
                {/* Hover/Active Dark Glass Overlay (0 opacity by default) */}
                <div
                  className="absolute inset-0 bg-black/80 opacity-0 backdrop-blur-md transition-opacity duration-500 
                                [@media(hover:hover)]:group-hover:opacity-100 group-data-[active=true]:opacity-100"
                />

                {/* Content Wrapper (Hidden/Shifted down slightly by default) 
                    - flex-col justify-start keeps everything anchored to the top 
                */}
                <div
                  className="absolute inset-0 flex flex-col justify-start p-6 opacity-0 transition-all duration-500 ease-out md:p-8
                                translate-y-4 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 
                                group-data-[active=true]:translate-y-0 group-data-[active=true]:opacity-100"
                >
                  {/* Title starts at the top */}
                  <h2 className="text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl">
                    {title}
                  </h2>

                  {/* Full description without line-clamp */}
                  <p className="mt-3 text-[13px] leading-relaxed text-white/70 sm:text-sm md:text-base">
                    {description}
                  </p>

                  {/* Buttons pushed to the bottom using mt-auto */}
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
                    {url && (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 rounded-full bg-white py-2.5 text-center text-sm font-semibold text-black transition-transform duration-300 hover:scale-105 active:scale-95"
                      >
                        Live
                      </a>
                    )}

                    {github && (
                      <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 rounded-full border border-white/30 bg-black/40 py-2.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white/10 active:scale-95"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Navigation Arrow */}
          <button
            onClick={() => scrollByCard("right")}
            disabled={!canScrollRight}
            className={`absolute right-4 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-black/60 text-2xl text-white backdrop-blur-md transition-all duration-300 ease-out hover:scale-110 hover:border-white/20 hover:bg-black/90 disabled:pointer-events-none disabled:opacity-0 md:flex xl:-right-6 ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Scroll Right"
          >
            &#10095;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
