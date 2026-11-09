import React from "react";

const Header: React.FC = () => {
  return (
    <div className="fixed top-[2vh] left-1/2 z-100 w-[clamp(280px,60vw,800px)] -translate-x-1/2">
      <header className="flex w-full items-center justify-between px-[2.4vw] py-[1.2vh]">
        {/* Logo */}
        <a
          href="#hero"
          className="group relative flex cursor-pointer flex-col items-start font-['Tenkai',sans-serif] text-[clamp(1.2rem,2vw+1vh,2rem)] tracking-[2px] text-white no-underline"
        >
          <span className="transition-opacity duration-300 group-hover:opacity-70">
            KS
          </span>

          <span className="mt-1 flex items-center gap-1.5">
            <span className="h-0.5 w-6 rounded-full bg-[#f5f0df] transition-all duration-300 group-hover:w-10" />
            <span className="h-1 w-1 rounded-full bg-[#f5f0df] shadow-[0_0_8px_#f5f0df]" />
          </span>
        </a>

        {/* Navigation */}
        <nav className="flex items-center gap-3">
          <a
            href="#about"
            className="rounded-full border border-white/10 bg-white/6 px-5 py-2.5 text-[clamp(0.7rem,1vw+0.3vh,0.9rem)] font-medium tracking-[1px] text-[#eee] no-underline backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-white/12 hover:text-white"
          >
            About Me
          </a>

          <a
            href="#footer"
            className="rounded-full border border-[#f5f0df]/20 bg-[#f5f0df] px-5 py-2.5 text-[clamp(0.7rem,1vw+0.3vh,0.9rem)] font-semibold tracking-[1px] text-black no-underline transition-all duration-300 hover:scale-105 hover:bg-white"
          >
            LET'S CONNECT
          </a>
        </nav>
      </header>
    </div>
  );
};

export default Header;
