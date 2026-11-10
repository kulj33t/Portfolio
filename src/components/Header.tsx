import React, { useEffect, useState } from "react";

const Header: React.FC = () => {
  const [showProjects, setShowProjects] = useState(false);
  const [secondLabel, setSecondLabel] = useState("About Me");

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowProjects(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-100px 0px 0px 0px",
      },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Typewriter animation
  useEffect(() => {
    const original = "About Me";
    const target = "Projects";

    if (!showProjects) {
      setSecondLabel(original);
      return;
    }

    let currentIndex = original.length;
    let phase: "delete" | "type" = "delete";

    setSecondLabel(original);

    let intervalId: ReturnType<typeof setInterval> | undefined;

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        if (phase === "delete") {
          currentIndex--;
          setSecondLabel(original.slice(0, currentIndex));

          if (currentIndex <= 0) {
            phase = "type";
            currentIndex = 0;
          }
        } else {
          currentIndex++;
          setSecondLabel(target.slice(0, currentIndex));

          if (currentIndex >= target.length) {
            if (intervalId) clearInterval(intervalId);
          }
        }
      }, 50);
    }, 400);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [showProjects]);

  return (
    <div className="fixed top-4 left-1/2 z-100 w-[calc(100%-2rem)] max-w-200 -translate-x-1/2">
      <header className="flex w-full items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-3">
        {/* Logo */}
        <a
          href="#hero"
          className="group flex shrink-0 flex-col items-start text-xl tracking-[2px] text-white no-underline sm:text-2xl"
          style={{
            fontFamily: '"Nunito", ui-rounded, system-ui, sans-serif',
            fontWeight: 900,
          }}
        >
          <span className="transition-opacity duration-300 group-hover:opacity-70">
            KS
          </span>

          <span className="mt-[0.15em] flex items-center gap-[0.3em]">
            <span className="h-[0.08em] w-[1.05em] rounded-full bg-[#f5f0df] transition-all duration-300 group-hover:w-[1.4em]" />

            <span className="h-[0.2em] w-[0.2em] shrink-0 rounded-full bg-[#f5f0df] shadow-[0_0_8px_#f5f0df]" />
          </span>
        </a>

        {/* Navigation */}
        <nav className="flex items-center gap-2 sm:gap-3">
          {/* About Me */}
          <div className="relative isolate hidden sm:block">
            <div className="pointer-events-none absolute -inset-4 -z-10 scale-110 rounded-full bg-white/10 blur-2xl" />

            <a
              href="#about"
              className="relative block whitespace-nowrap rounded-full bg-black/35 px-4 py-2 text-[11px] font-medium tracking-wide text-[#eee] no-underline backdrop-blur-xl transition-all duration-300 hover:bg-black/45"
            >
              About Me
            </a>
          </div>

          {/* About Me -> Projects */}
          <div
            className={`
              relative isolate hidden sm:block shrink-0 overflow-visible
              transition-all duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${
                showProjects
                  ? "max-w-30 translate-x-0 scale-100 opacity-100"
                  : "max-w-0 -translate-x-3 scale-75 opacity-0"
              }
            `}
            aria-hidden={!showProjects}
          >
            <div className="pointer-events-none absolute -inset-4 -z-10 scale-110 rounded-full bg-white/15 blur-2xl" />

            <a
              href="#Project"
              tabIndex={showProjects ? 0 : -1}
              className="relative flex min-w-26.25 items-center justify-center whitespace-nowrap rounded-full bg-black/35 px-4 py-2 text-[11px] font-medium tracking-wide text-[#eee] no-underline backdrop-blur-xl transition-all duration-300 hover:bg-black/45"
            >
              <span className="inline-block min-w-16.25 text-center">
                {secondLabel}

                {showProjects && secondLabel !== "Projects" && (
                  <span className="ml-0.5 inline-block h-3 w-px animate-pulse bg-white/80 align-middle" />
                )}
              </span>
            </a>
          </div>

          {/* Let's Connect */}
          <div className="relative isolate">
            <div className="pointer-events-none absolute -inset-4 -z-10 scale-110 rounded-full bg-[#f5f0df]/20 blur-2xl" />

            <a
              href="#footer"
              className="relative block whitespace-nowrap rounded-full bg-[#f5f0df] px-3 py-2 text-[10px] font-semibold tracking-wide text-black no-underline transition-all duration-300 hover:scale-105 hover:bg-white sm:px-5 sm:py-2.5 sm:text-xs"
            >
              LET'S CONNECT
            </a>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
