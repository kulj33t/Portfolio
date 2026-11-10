import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const APP_WINDOW_MOTION = {
  initial: { opacity: 0, scale: 0.94 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.94 },
};

const GIT_NOTIFS = [
  { title: "Git", message: "Push successful: origin/main." },
  { title: "GitHub", message: "Pull Request #42 merged." },
  { title: "Git", message: "Merge conflict resolved." },
];

const About: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(true);

  const toggleTheme = () => setIsDark((current) => !current);

  const [showControlCenter, setShowControlCenter] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showFinder, setShowFinder] = useState(false);
  const [showVSCode, setShowVSCode] = useState(false);
  const [showGitHub, setShowGitHub] = useState(false);
  const [showDocker, setShowDocker] = useState(false);
  const [showNotes] = useState(true);

  const [activeVSCodeFile, setActiveVSCodeFile] = useState("About.tsx");
  const [activeFinderFolder, setActiveFinderFolder] = useState("Projects");

  const [notifIndex, setNotifIndex] = useState(0);
  const [notifVisible, setNotifVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [headingText, setHeadingText] = useState("");

  const screenRef = useRef<HTMLDivElement>(null);

  // Multilingual heading animation
  useEffect(() => {
    const phrases = [
      "Hey, I'm Kuljeet.",
      "Bonjour, je suis Kuljeet.",
      "Hey, I'm Kuljeet.",
      "Hola, soy Kuljeet.",
      "Hey, I'm Kuljeet.",
      "Hallo, ich bin Kuljeet.",
    ];
    let phraseIndex = 0;
    let cancelled = false;
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms));

    const runTyping = async () => {
      while (!cancelled) {
        const phrase = phrases[phraseIndex];
        for (let i = 0; i <= phrase.length && !cancelled; i++) {
          setHeadingText(phrase.slice(0, i));
          await sleep(75);
        }
        await sleep(1800);
        for (let i = phrase.length; i >= 0 && !cancelled; i--) {
          setHeadingText(phrase.slice(0, i));
          await sleep(35);
        }
        await sleep(350);
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    };
    runTyping();
    return () => {
      cancelled = true;
    };
  }, []);

  // Body description typing animation
  useEffect(() => {
    const description =
      "An IT undergrad, developer, and curious mind who enjoys turning ideas into things people can actually use. I've worked across web development, machine learning research, and design through my internship experiences. Always experimenting, learning, and building something new along the way.";
    let cancelled = false;
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms));
    const runDescription = async () => {
      while (!cancelled) {
        for (let i = 0; i <= description.length && !cancelled; i++) {
          setDisplayText(description.slice(0, i));
          await sleep(10);
        }
        await sleep(1400);
        for (let i = description.length; i >= 0 && !cancelled; i--) {
          setDisplayText(description.slice(0, i));
          await sleep(4);
        }
        await sleep(250);
      }
    };
    runDescription();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (notifVisible) {
          setNotifVisible(false);
        } else {
          setNotifIndex((prev) => (prev + 1) % GIT_NOTIFS.length);
          setNotifVisible(true);
        }
      },
      notifVisible ? 4000 : 2000,
    );
    return () => clearTimeout(timeout);
  }, [notifVisible]);

  const iconItems = [
    {
      name: "Finder",
      src: "/icons/imac/finder.png",
      isOpen: showFinder,
      action: () => setShowFinder((prev) => !prev),
    },
    {
      name: "VS Code",
      src: "/icons/imac/vscode.png",
      isOpen: showVSCode,
      action: () => setShowVSCode((prev) => !prev),
    },
    {
      name: "GitHub",
      src: "/icons/imac/github.png",
      isOpen: showGitHub,
      action: () => setShowGitHub((prev) => !prev),
    },
    {
      name: "Docker",
      src: "/icons/imac/docker.png",
      isOpen: showDocker,
      action: () => setShowDocker((prev) => !prev),
    },
    {
      name: "Terminal",
      src: "/icons/imac/terminal.png",
      isOpen: showTerminal,
      action: () => setShowTerminal((prev) => !prev),
    },
    {
      name: "Notes",
      isNotesIcon: true,
      isOpen: showNotes,
    },
  ];

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-transparent p-4 sm:p-6">
      <div className="relative z-10 flex w-full max-w-3xl @container flex-col items-center drop-shadow-[0_4cqw_5cqw_rgba(0,0,0,0.5)]">
        {/* Outer casing */}
        <div className="w-full rounded-[4cqw] bg-linear-to-br from-[#8c8c91] via-[#4a4a4d] to-[#1e1e20] p-[0.3cqw] shadow-xl">
          {/* Glass frame */}
          <div className="overflow-hidden rounded-[3.7cqw] bg-black">
            {/* Screen Container */}
            <div
              className="relative mx-[1.5cqw] mt-[1.5cqw] aspect-16/10 overflow-hidden bg-black"
              style={{
                borderRadius: "2.5cqw",
                isolation: "isolate",
                clipPath: "inset(0 round 2.5cqw)",
                WebkitMaskImage: "-webkit-radial-gradient(white, black)",
              }}
            >
              <div
                ref={screenRef}
                className={`relative isolate @container flex h-full w-full flex-col overflow-hidden transition-colors duration-200 ease-out **:transition-colors **:duration-200 **:ease-out ${
                  isDark ? "bg-[#0a0a0a]" : "bg-[#f5f5f7]"
                }`}
                style={{
                  borderRadius: "inherit",
                  backgroundClip: "padding-box",
                }}
              >
                {/* macOS menu bar */}
                <div
                  className={`relative z-40 flex h-[4cqw] shrink-0 items-center justify-between px-[2cqw] backdrop-blur-2xl ${
                    isDark
                      ? "bg-black/20 text-white"
                      : "bg-white/35 text-[#1d1d1f]"
                  }`}
                >
                  <div className="flex h-full items-center gap-[2cqw] leading-none">
                    <span className="inline-flex h-full items-center text-[1.6cqw] font-bold leading-none">
                      
                    </span>
                    <span className="inline-flex h-full items-center text-[1.2cqw] font-semibold leading-none">
                      About
                    </span>
                    <span className="inline-flex h-full items-center text-[1.15cqw] leading-none opacity-75">
                      File
                    </span>
                    <span className="inline-flex h-full items-center text-[1.15cqw] leading-none opacity-75">
                      Edit
                    </span>
                    <span className="inline-flex h-full items-center text-[1.15cqw] leading-none opacity-75">
                      View
                    </span>
                    <span className="inline-flex h-full items-center text-[1.15cqw] leading-none opacity-75">
                      Window
                    </span>
                    <span className="inline-flex h-full items-center text-[1.15cqw] leading-none opacity-75">
                      Help
                    </span>
                  </div>

                  <div className="flex h-full items-center gap-[1.5cqw] leading-none">
                    {/* Wi-Fi indicator */}
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[1.4cqw] w-[1.4cqw]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M2 8.5a15 15 0 0 1 20 0" />
                      <path d="M5 12a10 10 0 0 1 14 0" />
                      <path d="M8.5 15.5a5 5 0 0 1 7 0" />
                      <path d="M12 19h.01" />
                    </svg>

                    {/* Bluetooth indicator */}
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[1.4cqw] w-[1.4cqw]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 7l10 10-5 4V3l5 4L7 17" />
                    </svg>

                    <span className="text-[1.15cqw] opacity-80">
                      Mon 9:41 AM
                    </span>

                    <button
                      onClick={() => setShowControlCenter((c) => !c)}
                      className={`inline-flex h-[80%] items-center justify-center self-center rounded-[0.5cqw] px-[0.5cqw] hover:bg-white/15 ${
                        showControlCenter ? "bg-white/20" : ""
                      }`}
                      aria-label="Open Control Center"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-[1.4cqw] w-[1.4cqw]"
                        fill="currentColor"
                      >
                        <rect x="3" y="5" width="18" height="5" rx="2" />
                        <rect x="3" y="14" width="18" height="5" rx="2" />
                        <circle cx="9" cy="7.5" r="1.5" fill="currentColor" />
                        <circle cx="15" cy="16.5" r="1.5" fill="currentColor" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* macOS-style Control Center */}
                <AnimatePresence>
                  {showControlCenter && (
                    <motion.div
                      initial={{ opacity: 0, y: -12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -12, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-[1.2cqw] top-[4.5cqw] z-50 w-[30cqw]"
                    >
                      <div className="grid grid-cols-2 gap-[1cqw] rounded-[2cqw] border border-white/15 bg-[#242426]/95 p-[1.2cqw] text-white shadow-2xl backdrop-blur-3xl">
                        {/* Wi-Fi */}
                        <button
                          type="button"
                          className="flex items-center gap-[1cqw] rounded-full border border-white/15 bg-[#333335]/90 p-[0.8cqw] text-left hover:bg-[#414144]"
                        >
                          <span className="flex h-[3.5cqw] w-[3.5cqw] shrink-0 items-center justify-center rounded-full bg-white text-[#0787ff]">
                            <svg
                              viewBox="0 0 24 24"
                              className="h-[2cqw] w-[2cqw]"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                            >
                              <path d="M2 8.5a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0M12 19h.01" />
                            </svg>
                          </span>
                          <span className="min-w-0 pr-[1cqw]">
                            <span className="block text-[1.2cqw] font-semibold">
                              Wi-Fi
                            </span>
                            <span className="block truncate text-[1cqw] text-white/60">
                              WiFi
                            </span>
                          </span>
                        </button>

                        {/* Media */}
                        <div className="row-span-2 flex flex-col justify-between rounded-[1.5cqw] border border-white/15 bg-[#333335]/90 p-[1.2cqw]">
                          <div className="h-[3.5cqw] w-[3.5cqw] rounded-[0.8cqw] bg-white/10" />
                          <div className="mt-[2cqw]">
                            <p className="text-[1.3cqw] font-semibold">
                              Not Playing
                            </p>
                            <div className="mt-[1cqw] flex items-center justify-between text-white/60">
                              <span className="text-[1.8cqw]">◀◀</span>
                              <span className="text-[2.2cqw]">▶</span>
                              <span className="text-[1.8cqw]">▶▶</span>
                            </div>
                          </div>
                        </div>

                        {/* Bluetooth */}
                        <button
                          type="button"
                          className="flex items-center gap-[1cqw] rounded-full border border-white/15 bg-[#333335]/90 p-[0.8cqw] text-left hover:bg-[#414144]"
                        >
                          <span className="flex h-[3.5cqw] w-[3.5cqw] shrink-0 items-center justify-center rounded-full bg-white text-[#0787ff]">
                            <svg
                              viewBox="0 0 24 24"
                              className="h-[2cqw] w-[2cqw]"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M7 7l10 10-5 4V3l5 4L7 17" />
                            </svg>
                          </span>
                          <span>
                            <span className="block text-[1.2cqw] font-semibold">
                              Bluetooth
                            </span>
                            <span className="block text-[1cqw] text-white/60">
                              On
                            </span>
                          </span>
                        </button>

                        {/* Bottom Utility Row */}
                        <div className="col-span-2 grid grid-cols-[1.5fr_0.6fr_0.6fr] gap-[1cqw]">
                          <button
                            type="button"
                            className="flex items-center gap-[1cqw] rounded-full border border-white/15 bg-[#333335]/90 p-[0.8cqw] hover:bg-[#414144]"
                          >
                            <span className="flex h-[3.5cqw] w-[3.5cqw] shrink-0 items-center justify-center rounded-full bg-white/15 text-white/70">
                              <svg
                                viewBox="0 0 24 24"
                                className="h-[2cqw] w-[2cqw]"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <circle cx="12" cy="12" r="9" />
                                <path d="M7 15a6 6 0 0 1 10 0M9 12a4 4 0 0 1 6 0" />
                              </svg>
                            </span>
                            <span className="text-left">
                              <span className="block text-[1.2cqw] font-semibold">
                                AirDrop
                              </span>
                              <span className="block text-[1cqw] text-white/60">
                                Off
                              </span>
                            </span>
                          </button>

                          <button
                            type="button"
                            className="flex items-center justify-center rounded-full border border-white/15 bg-[#333335]/90 hover:bg-[#414144]"
                          >
                            <svg
                              viewBox="0 0 32 32"
                              className="h-[3cqw] w-[3cqw]"
                              fill="none"
                              stroke="white"
                              strokeWidth="2.8"
                            >
                              <rect x="3" y="4" width="21" height="17" rx="3" />
                              <rect
                                x="9"
                                y="11"
                                width="20"
                                height="17"
                                rx="3"
                              />
                            </svg>
                          </button>

                          <button
                            type="button"
                            onClick={toggleTheme}
                            className={`flex items-center justify-center rounded-full border transition-colors duration-200 ease-out ${
                              isDark
                                ? "border-white/20 bg-white text-[#202024]"
                                : "border-white/20 bg-[#343438] text-white"
                            }`}
                          >
                            {isDark ? (
                              <svg
                                viewBox="0 0 32 32"
                                className="h-[2.8cqw] w-[2.8cqw]"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <circle cx="16" cy="16" r="5" />
                                <path d="M16 2v4M16 26v4M2 16h4M26 16h4M6.1 6.1l2.8 2.8m14.2 14.2 2.8 2.8m0-19.8-2.8 2.8M8.9 23.1l-2.8 2.8" />
                              </svg>
                            ) : (
                              <svg
                                viewBox="0 0 32 32"
                                className="h-[2.8cqw] w-[2.8cqw]"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M25.5 20.5A11 11 0 0 1 11.5 6.5 11 11 0 1 0 25.5 20.5Z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* GitHub notifications */}
                <AnimatePresence>
                  {notifVisible && (
                    <motion.div
                      initial={{ x: 50, opacity: 0, scale: 0.95 }}
                      animate={{ x: 0, opacity: 1, scale: 1 }}
                      exit={{ x: 50, opacity: 0, scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 25,
                      }}
                      className={`group absolute right-[1.5cqw] top-[5cqw] z-30 flex w-[22cqw] items-start gap-[1cqw] rounded-[1cqw] border p-[1.2cqw] shadow-xl backdrop-blur-2xl ${
                        isDark
                          ? "border-white/10 bg-[#2c2c2e]/90 text-white"
                          : "border-black/10 bg-white/90 text-black"
                      }`}
                    >
                      <img
                        src="/icons/imac/github.png"
                        alt="GitHub"
                        className="h-[2cqw] w-[2cqw] shrink-0 object-contain"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between gap-[0.5cqw]">
                          <span className="text-[1.1cqw] font-semibold">
                            {GIT_NOTIFS[notifIndex].title}
                          </span>
                          <span className="text-[1cqw] opacity-50">now</span>
                        </div>
                        <p className="mt-[0.5cqw] text-[1.1cqw] leading-snug opacity-80">
                          {GIT_NOTIFS[notifIndex].message}
                        </p>
                      </div>
                      <button
                        onClick={() => setNotifVisible(false)}
                        className="absolute left-[-1cqw] top-[-1cqw] flex h-[2cqw] w-[2cqw] items-center justify-center rounded-full border border-white/20 bg-gray-700 text-[1.2cqw] text-white opacity-0 shadow transition group-hover:opacity-100"
                      >
                        ×
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Persistent Notes Window */}
                <AnimatePresence>
                  {showNotes && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25 }}
                      className={`relative z-10 mx-[0.2cqw] mb-[0.2cqw] flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.5cqw] border transition-colors duration-200 ease-out ${
                        isDark
                          ? "border-white/10 bg-[#19191c] text-[#f2f2f4]"
                          : "border-black/10 bg-[#f5f5f7] text-[#242426]"
                      }`}
                    >
                      {/* Notes title bar */}
                      <div
                        className={`flex h-[4cqw] shrink-0 items-center justify-between border-b px-[1.5cqw] ${
                          isDark
                            ? "border-white/10 bg-[#222226]"
                            : "border-black/10 bg-[#e9e9eb]"
                        }`}
                      >
                        <div className="flex items-center gap-[1cqw]">
                          <span
                            aria-hidden="true"
                            className="relative z-20 ml-[-0.9cqw] mr-[-0.9cqw] flex h-[3cqw] w-[3cqw] shrink-0 items-center justify-center rounded-full"
                          >
                            <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-[#ff5f57]" />
                          </span>
                          <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-[#febc2e]" />
                          <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-[#28c840]" />
                          <span
                            className={`ml-[1cqw] text-[1.3cqw] font-semibold ${
                              isDark ? "text-white/75" : "text-[#55555a]"
                            }`}
                          >
                            Notes
                          </span>
                        </div>
                      </div>

                      <div className="flex min-h-0 flex-1 overflow-hidden">
                        <aside
                          className={`block w-[24cqw] shrink-0 border-r p-[1.5cqw] ${
                            isDark
                              ? "border-white/10 bg-[#202024]"
                              : "border-black/10 bg-[#ededf0]"
                          }`}
                        >
                          <div
                            className={`mb-[1.5cqw] text-[1.3cqw] font-semibold ${
                              isDark ? "text-white/45" : "text-[#77777c]"
                            }`}
                          >
                            Folders
                          </div>
                          <div
                            className={`rounded-[0.5cqw] px-[1cqw] py-[0.8cqw] text-[1.2cqw] font-medium ${
                              isDark
                                ? "bg-white/10 text-white"
                                : "bg-[#dcdce1] text-[#333338]"
                            }`}
                          >
                            ▤ All Notes
                          </div>
                          <div
                            className={`mt-[2cqw] text-[1.3cqw] font-semibold ${
                              isDark ? "text-white/45" : "text-[#77777c]"
                            }`}
                          >
                            Notes
                          </div>
                          <div
                            className={`mt-[1cqw] rounded-[1cqw] p-[1cqw] ${
                              isDark ? "bg-white/10" : "bg-[#d8d8dd]"
                            }`}
                          >
                            <p className="text-[1.3cqw] font-semibold">
                              A little about me
                            </p>
                            <p
                              className={`mt-[0.5cqw] text-[1.1cqw] ${
                                isDark ? "text-white/45" : "text-[#77777c]"
                              }`}
                            >
                              Developer · Builder · Curious mind
                            </p>
                          </div>
                        </aside>

                        <section className="min-w-0 flex-1 overflow-y-auto px-[4cqw] py-[3cqw]">
                          <div className="mx-auto w-full max-w-[min(70ch,100%)]">
                            <p
                              className={`mb-[1cqw] text-[1.1cqw] font-medium uppercase tracking-[0.16em] ${
                                isDark ? "text-white/35" : "text-[#a0a0a5]"
                              }`}
                            >
                              Greetings{" "}
                            </p>
                            <h2
                              className={`mb-[1.5cqw] text-[3.5cqw] font-semibold tracking-tight ${
                                isDark ? "text-white" : "text-[#252529]"
                              }`}
                            >
                              {headingText}
                              <span
                                className={`ml-[0.2cqw] inline-block h-[0.85em] w-[0.3cqw] animate-pulse align-middle ${
                                  isDark ? "bg-white" : "bg-[#252529]"
                                }`}
                              />
                            </h2>
                            <div
                              className={`my-[2cqw] h-px w-full ${
                                isDark ? "bg-white/10" : "bg-black/10"
                              }`}
                            />
                            <p
                              className={`min-h-[1.8em] whitespace-pre-line text-[1.7cqw] font-medium leading-[1.85] ${
                                isDark ? "text-[#f0f0f2]" : "text-[#333338]"
                              }`}
                            >
                              {displayText}
                              <span
                                className={`ml-[0.2cqw] inline-block h-[1em] w-[0.2cqw] animate-pulse align-middle ${
                                  isDark ? "bg-white" : "bg-[#55555a]"
                                }`}
                              />
                            </p>
                          </div>
                        </section>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Custom Finder Window */}
                <AnimatePresence>
                  {showFinder && (
                    <motion.div
                      drag
                      dragConstraints={screenRef}
                      {...APP_WINDOW_MOTION}
                      className="absolute z-55 flex flex-col w-[58cqw] h-[36cqw] rounded-[1.2cqw] overflow-hidden border border-white/20 shadow-2xl backdrop-blur-2xl bg-[#1e1e20]/95"
                      style={{ top: "6cqw", left: "10cqw" }}
                    >
                      <div className="flex h-[3.5cqw] items-center gap-[1cqw] bg-[#2a2a2d]/90 px-[1.5cqw] cursor-grab active:cursor-grabbing border-b border-white/10 select-none">
                        <button
                          type="button"
                          onClick={() => setShowFinder(false)}
                          className="group relative ml-[-0.9cqw] mr-[-0.9cqw] flex h-[3cqw] w-[3cqw] shrink-0 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-white/70"
                          aria-label="Close"
                          title="Close"
                        >
                          <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-[#ff5f56] transition-[filter] duration-150 group-hover:brightness-75" />
                        </button>
                        <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-[#ffbd2e]" />
                        <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-[#27c93f]" />
                        <span className="ml-[1cqw] text-[1.2cqw] text-gray-300 font-semibold">
                          Finder — {activeFinderFolder}
                        </span>
                      </div>
                      <div className="flex flex-1 min-h-0 text-white">
                        <div className="w-[15cqw] bg-[#252528]/80 p-[1.2cqw] border-r border-white/10 select-none">
                          <div className="mb-[0.8cqw] text-white/40 font-semibold text-[0.95cqw] uppercase tracking-wider">
                            Favorites
                          </div>
                          {[
                            "Projects",
                            "Documents",
                            "Downloads",
                            "Internships",
                          ].map((folder) => (
                            <button
                              key={folder}
                              onClick={() => setActiveFinderFolder(folder)}
                              className={`w-full text-left py-[0.5cqw] px-[0.8cqw] rounded-[0.5cqw] text-[1.1cqw] mb-[0.2cqw] transition-colors ${
                                activeFinderFolder === folder
                                  ? "bg-[#0787ff] text-white font-medium"
                                  : "hover:bg-white/10 text-white/80"
                              }`}
                            >
                              📁 {folder}
                            </button>
                          ))}
                        </div>
                        <div className="flex-1 bg-[#1a1a1c] p-[2cqw] grid grid-cols-3 gap-[1.5cqw] content-start overflow-y-auto">
                          {activeFinderFolder === "Projects" && (
                            <>
                              <div className="flex flex-col items-center p-[1cqw] rounded-[0.8cqw] hover:bg-white/10 cursor-pointer border border-white/5">
                                <span className="text-[1.1cqw] mt-[0.5cqw] font-medium">
                                  Portfolio-iMac
                                </span>
                                <span className="text-[0.9cqw] text-white/50">
                                  React + TS
                                </span>
                              </div>
                              <div className="flex flex-col items-center p-[1cqw] rounded-[0.8cqw] hover:bg-white/10 cursor-pointer border border-white/5">
                                <span className="text-[1.1cqw] mt-[0.5cqw] font-medium">
                                  ML-Pipeline
                                </span>
                                <span className="text-[0.9cqw] text-white/50">
                                  PyTorch
                                </span>
                              </div>
                              <div className="flex flex-col items-center p-[1cqw] rounded-[0.8cqw] hover:bg-white/10 cursor-pointer border border-white/5">
                                <span className="text-[1.1cqw] mt-[0.5cqw] font-medium">
                                  Web-Apps
                                </span>
                                <span className="text-[0.9cqw] text-white/50">
                                  Full Stack
                                </span>
                              </div>
                            </>
                          )}
                          {activeFinderFolder === "Documents" && (
                            <>
                              <div className="flex flex-col items-center p-[1cqw] rounded-[0.8cqw] hover:bg-white/10 cursor-pointer border border-white/5">
                                <span className="text-[3.5cqw]">📄</span>
                                <span className="text-[1.1cqw] mt-[0.5cqw] font-medium">
                                  Kuljeet_Resume.pdf
                                </span>
                                <span className="text-[0.9cqw] text-white/50">
                                  142 KB
                                </span>
                              </div>
                              <div className="flex flex-col items-center p-[1cqw] rounded-[0.8cqw] hover:bg-white/10 cursor-pointer border border-white/5">
                                <span className="text-[3.5cqw]">📝</span>
                                <span className="text-[1.1cqw] mt-[0.5cqw] font-medium">
                                  Research_Paper.docx
                                </span>
                                <span className="text-[0.9cqw] text-white/50">
                                  AI & ML
                                </span>
                              </div>
                            </>
                          )}
                          {activeFinderFolder === "Internships" && (
                            <>
                              <div className="flex flex-col items-center p-[1cqw] rounded-[0.8cqw] hover:bg-white/10 cursor-pointer border border-white/5">
                                <span className="text-[3.5cqw]">🎓</span>
                                <span className="text-[1.1cqw] mt-[0.5cqw] font-medium">
                                  IIIT Guwahati
                                </span>
                              </div>
                            </>
                          )}
                          {activeFinderFolder === "Downloads" && (
                            <div className="col-span-3 text-center text-white/40 text-[1.2cqw] py-[4cqw]">
                              No recent downloads
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Custom VS Code Window */}
                <AnimatePresence>
                  {showVSCode && (
                    <motion.div
                      drag
                      dragConstraints={screenRef}
                      {...APP_WINDOW_MOTION}
                      className="absolute z-56 w-[64cqw] h-[40cqw] rounded-[1.2cqw] overflow-hidden border border-white/20 shadow-2xl bg-[#1e1e1e] flex flex-col"
                      style={{ top: "7cqw", left: "14cqw" }}
                    >
                      {/* VS Code Title Bar */}
                      <div className="flex h-[3.5cqw] items-center justify-between bg-[#2d2d2d] px-[1.5cqw] cursor-grab active:cursor-grabbing border-b border-black/40 select-none">
                        <div className="flex items-center gap-[1cqw]">
                          <button
                            type="button"
                            onClick={() => setShowVSCode(false)}
                            className="group relative ml-[-0.9cqw] mr-[-0.9cqw] flex h-[3cqw] w-[3cqw] shrink-0 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-white/70"
                            aria-label="Close"
                            title="Close"
                          >
                            <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-[#ff5f56] transition-[filter] duration-150 group-hover:brightness-75" />
                          </button>
                          <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-[#ffbd2e]" />
                          <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-[#27c93f]" />
                          <span className="ml-[1cqw] text-[1.1cqw] text-gray-300 font-mono">
                            About.tsx — portfolio-imac — Visual Studio Code
                          </span>
                        </div>
                      </div>

                      {/* Main Editor Layout */}
                      <div className="flex flex-1 min-h-0 font-mono text-[1.1cqw]">
                        {/* Sidebar Explorer */}
                        <div className="w-[16cqw] bg-[#252526] border-r border-black/30 p-[1cqw] text-gray-400 select-none">
                          <div className="text-[0.9cqw] font-bold text-gray-500 uppercase tracking-wider mb-[0.8cqw]">
                            Explorer: Portfolio
                          </div>
                          <div className="space-y-[0.3cqw]">
                            <div
                              onClick={() => setActiveVSCodeFile("About.tsx")}
                              className={`flex items-center gap-[0.5cqw] px-[0.6cqw] py-[0.4cqw] rounded cursor-pointer ${
                                activeVSCodeFile === "About.tsx"
                                  ? "bg-[#37373d] text-white"
                                  : "hover:bg-[#2a2d2e]"
                              }`}
                            >
                              <span className="text-blue-400">⚛</span> About.tsx
                            </div>
                            <div
                              onClick={() =>
                                setActiveVSCodeFile("skills.config.ts")
                              }
                              className={`flex items-center gap-[0.5cqw] px-[0.6cqw] py-[0.4cqw] rounded cursor-pointer ${
                                activeVSCodeFile === "skills.config.ts"
                                  ? "bg-[#37373d] text-white"
                                  : "hover:bg-[#2a2d2e]"
                              }`}
                            >
                              <span className="text-yellow-400">TS</span>{" "}
                              skills.config.ts
                            </div>
                            <div
                              onClick={() =>
                                setActiveVSCodeFile("projects.json")
                              }
                              className={`flex items-center gap-[0.5cqw] px-[0.6cqw] py-[0.4cqw] rounded cursor-pointer ${
                                activeVSCodeFile === "projects.json"
                                  ? "bg-[#37373d] text-white"
                                  : "hover:bg-[#2a2d2e]"
                              }`}
                            >
                              <span className="text-yellow-300">{}</span>{" "}
                              projects.json
                            </div>
                          </div>
                        </div>

                        {/* Code Editor Window */}
                        <div className="flex-1 bg-[#1e1e1e] flex flex-col min-w-0">
                          {/* File Tabs */}
                          <div className="flex bg-[#252526] border-b border-black/40 text-gray-400 text-[1cqw]">
                            <div className="px-[1.2cqw] py-[0.5cqw] bg-[#1e1e1e] text-white border-t-2 border-blue-500 flex items-center gap-[0.5cqw]">
                              <span>{activeVSCodeFile}</span>
                            </div>
                          </div>

                          {/* Code Content */}
                          <div className="flex-1 p-[1.5cqw] overflow-y-auto leading-relaxed text-gray-200">
                            {activeVSCodeFile === "About.tsx" && (
                              <pre>
                                <code>
                                  <span className="text-purple-400">
                                    import
                                  </span>{" "}
                                  React{" "}
                                  <span className="text-purple-400">from</span>{" "}
                                  <span className="text-green-300">
                                    "react"
                                  </span>
                                  ;{"\n\n"}
                                  <span className="text-purple-400">
                                    export const
                                  </span>{" "}
                                  <span className="text-yellow-300">
                                    KuljeetSingh
                                  </span>{" "}
                                  = () {"=>"} {"{\n"}
                                  {"  "}
                                  <span className="text-purple-400">
                                    return
                                  </span>{" "}
                                  ({"\n"}
                                  {"    "}&lt;
                                  <span className="text-blue-400">
                                    DeveloperProfile
                                  </span>
                                  {"\n"}
                                  {"      "}
                                  <span className="text-sky-300">name</span>=
                                  <span className="text-green-300">
                                    "Kuljeet Singh"
                                  </span>
                                  {"\n"}
                                  {"      "}
                                  <span className="text-sky-300">focus</span>
                                  =&#123;[
                                  <span className="text-green-300">
                                    "React"
                                  </span>
                                  ,{" "}
                                  <span className="text-green-300">
                                    "TypeScript"
                                  </span>
                                  ,{" "}
                                  <span className="text-green-300">
                                    "AI/ML"
                                  </span>
                                  ]&#125;{"\n"}
                                  {"    "}/&gt;{"\n"}
                                  {"  "});{"\n"}
                                  &#125;;
                                </code>
                              </pre>
                            )}
                            {activeVSCodeFile === "skills.config.ts" && (
                              <pre>
                                <code>
                                  <span className="text-purple-400">
                                    export const
                                  </span>{" "}
                                  skills = &#123;{"\n"}
                                  {"  "}frontend: [
                                  <span className="text-green-300">
                                    "React"
                                  </span>
                                  ,{" "}
                                  <span className="text-green-300">
                                    "TypeScript"
                                  </span>
                                  ,{" "}
                                  <span className="text-green-300">
                                    "Tailwind CSS"
                                  </span>
                                  ],{"\n"}
                                  {"  "}backend: [
                                  <span className="text-green-300">
                                    "Node.js"
                                  </span>
                                  ,{" "}
                                  <span className="text-green-300">
                                    "Python"
                                  </span>
                                  ,{" "}
                                  <span className="text-green-300">
                                    "REST APIs"
                                  </span>
                                  ],{"\n"}
                                  {"  "}tools: [
                                  <span className="text-green-300">"Git"</span>,{" "}
                                  <span className="text-green-300">
                                    "Docker"
                                  </span>
                                  ,{" "}
                                  <span className="text-green-300">
                                    "VS Code"
                                  </span>
                                  ]{"\n"}
                                  &#125;;
                                </code>
                              </pre>
                            )}
                            {activeVSCodeFile === "projects.json" && (
                              <pre>
                                <code>
                                  &#123;{"\n"}
                                  {"  "}
                                  <span className="text-blue-300">
                                    "competitions"
                                  </span>
                                  : [
                                  <span className="text-green-300">
                                    "TEXcelerate Pitching"
                                  </span>
                                  ],{"\n"}
                                  {"  "}
                                  <span className="text-blue-300">
                                    "internships"
                                  </span>
                                  : [
                                  <span className="text-green-300">
                                    "IIIT Guwahati"
                                  </span>
                                  ]{"\n"}
                                  &#125;
                                </code>
                              </pre>
                            )}
                          </div>

                          {/* Footer Status Bar */}
                          <div className="h-[2cqw] bg-[#007acc] text-white flex items-center justify-between px-[1cqw] text-[0.85cqw] select-none">
                            <div className="flex items-center gap-[1cqw]">
                              <span>main*</span>
                              <span>✓ 0 errors</span>
                            </div>
                            <div className="flex items-center gap-[1cqw]">
                              <span>Ln 12, Col 34</span>
                              <span>UTF-8</span>
                              <span>TypeScript React</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Custom GitHub Window */}
                <AnimatePresence>
                  {showGitHub && (
                    <motion.div
                      drag
                      dragConstraints={screenRef}
                      {...APP_WINDOW_MOTION}
                      className="absolute z-57 w-[62cqw] h-[38cqw] rounded-[1.2cqw] overflow-hidden border border-white/20 shadow-2xl bg-[#0d1117] text-[#c9d1d9] flex flex-col"
                      style={{ top: "8cqw", left: "16cqw" }}
                    >
                      <div className="flex h-[3.5cqw] items-center justify-between bg-[#161b22] px-[1.5cqw] cursor-grab active:cursor-grabbing border-b border-[#30363d] select-none">
                        <div className="flex items-center gap-[1cqw]">
                          <button
                            type="button"
                            onClick={() => setShowGitHub(false)}
                            className="group relative ml-[-0.9cqw] mr-[-0.9cqw] flex h-[3cqw] w-[3cqw] shrink-0 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-white/70"
                            aria-label="Close"
                            title="Close"
                          >
                            <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-[#ff5f56] transition-[filter] duration-150 group-hover:brightness-75" />
                          </button>
                          <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-[#ffbd2e]" />
                          <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-[#27c93f]" />
                          <span className="ml-[1cqw] text-[1.1cqw] font-semibold text-[#f0f6fc]">
                            GitHub — kulj33t
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 p-[2cqw] overflow-y-auto">
                        <div className="flex items-center gap-[1.5cqw] border-b border-[#30363d] pb-[1.5cqw] mb-[1.5cqw]">
                          <div className="h-[5cqw] w-[5cqw] rounded-full bg-[#21262d] flex items-center justify-center text-[2.5cqw] border border-[#30363d]">
                            👨‍💻
                          </div>
                          <div>
                            <h3 className="text-[1.8cqw] font-bold text-white">
                              Kuljeet Singh
                            </h3>
                            <p className="text-[1.1cqw] text-[#8b949e]">
                              @kulj33t · IT Student at BIT Sindri
                            </p>
                            <p className="text-[1cqw] mt-[0.4cqw] text-[#c9d1d9]">
                              Turning ideas into useful code & applications.
                            </p>
                          </div>
                        </div>

                        <h4 className="text-[1.2cqw] font-semibold text-white mb-[1cqw]">
                          Pinned Repositories
                        </h4>
                        <div className="grid grid-cols-2 gap-[1.2cqw]">
                          <div className="p-[1.2cqw] rounded-[0.8cqw] border border-[#30363d] bg-[#161b22] hover:border-[#8b949e] transition">
                            <div className="flex items-center justify-between">
                              <span className="text-[1.2cqw] font-bold text-[#58a6ff]">
                                portfolio-imac
                              </span>
                              <span className="text-[0.8cqw] px-[0.6cqw] py-[0.2cqw] rounded-full border border-[#30363d] text-[#8b949e]">
                                Public
                              </span>
                            </div>
                            <p className="text-[0.95cqw] text-[#8b949e] mt-[0.5cqw]">
                              Interactive iMac portfolio desktop built with
                              React & Framer Motion.
                            </p>
                            <div className="flex items-center gap-[1cqw] mt-[1cqw] text-[0.85cqw] text-[#8b949e]">
                              <span className="flex items-center gap-[0.3cqw]">
                                <span className="h-[0.8cqw] w-[0.8cqw] rounded-full bg-[#3178c6]" />{" "}
                                TypeScript
                              </span>
                              <span>★ 12</span>
                            </div>
                          </div>

                          <div className="p-[1.2cqw] rounded-[0.8cqw] border border-[#30363d] bg-[#161b22] hover:border-[#8b949e] transition">
                            <div className="flex items-center justify-between">
                              <span className="text-[1.2cqw] font-bold text-[#58a6ff]">
                                ml-research-toolkit
                              </span>
                              <span className="text-[0.8cqw] px-[0.6cqw] py-[0.2cqw] rounded-full border border-[#30363d] text-[#8b949e]">
                                Public
                              </span>
                            </div>
                            <p className="text-[0.95cqw] text-[#8b949e] mt-[0.5cqw]">
                              Machine Learning models and Stanford CS229
                              practice notebooks.
                            </p>
                            <div className="flex items-center gap-[1cqw] mt-[1cqw] text-[0.85cqw] text-[#8b949e]">
                              <span className="flex items-center gap-[0.3cqw]">
                                <span className="h-[0.8cqw] w-[0.8cqw] rounded-full bg-[#3572A5]" />{" "}
                                Python
                              </span>
                              <span>★ 8</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Custom Docker Window */}
                <AnimatePresence>
                  {showDocker && (
                    <motion.div
                      drag
                      dragConstraints={screenRef}
                      {...APP_WINDOW_MOTION}
                      className="absolute z-58 w-[60cqw] h-[37cqw] rounded-[1.2cqw] overflow-hidden border border-white/20 shadow-2xl bg-[#1d2127] text-white flex flex-col"
                      style={{ top: "9cqw", left: "18cqw" }}
                    >
                      <div className="flex h-[3.5cqw] items-center justify-between bg-[#13171d] px-[1.5cqw] cursor-grab active:cursor-grabbing border-b border-white/10 select-none">
                        <div className="flex items-center gap-[1cqw]">
                          <button
                            type="button"
                            onClick={() => setShowDocker(false)}
                            className="group relative ml-[-0.9cqw] mr-[-0.9cqw] flex h-[3cqw] w-[3cqw] shrink-0 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-white/70"
                            aria-label="Close"
                            title="Close"
                          >
                            <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-[#ff5f56] transition-[filter] duration-150 group-hover:brightness-75" />
                          </button>
                          <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-[#ffbd2e]" />
                          <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-[#27c93f]" />
                          <span className="ml-[1cqw] text-[1.1cqw] font-semibold text-blue-400">
                            🐳 Docker Desktop — Dashboard
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 p-[1.5cqw] overflow-y-auto">
                        <div className="flex justify-between items-center mb-[1.2cqw]">
                          <h3 className="text-[1.4cqw] font-bold">
                            Containers
                          </h3>
                          <span className="text-[0.9cqw] bg-emerald-500/20 text-emerald-400 px-[0.8cqw] py-[0.3cqw] rounded-full border border-emerald-500/30">
                            Engine Running
                          </span>
                        </div>

                        <div className="space-y-[0.8cqw]">
                          <div className="flex items-center justify-between p-[1cqw] bg-[#272c34] rounded-[0.8cqw] border border-white/5">
                            <div className="flex items-center gap-[1cqw]">
                              <span className="h-[1cqw] w-[1cqw] rounded-full bg-emerald-400 animate-pulse" />
                              <div>
                                <div className="text-[1.1cqw] font-medium">
                                  portfolio-app:latest
                                </div>
                                <div className="text-[0.85cqw] text-gray-400">
                                  Port 3000:3000 · Up 4 hours
                                </div>
                              </div>
                            </div>
                            <span className="text-[0.9cqw] text-emerald-400 bg-emerald-950/60 px-[0.8cqw] py-[0.2cqw] rounded">
                              RUNNING
                            </span>
                          </div>

                          <div className="flex items-center justify-between p-[1cqw] bg-[#272c34] rounded-[0.8cqw] border border-white/5">
                            <div className="flex items-center gap-[1cqw]">
                              <span className="h-[1cqw] w-[1cqw] rounded-full bg-emerald-400 animate-pulse" />
                              <div>
                                <div className="text-[1.1cqw] font-medium">
                                  ml-api-service:v1
                                </div>
                                <div className="text-[0.85cqw] text-gray-400">
                                  Port 8000:8000 · Up 2 hours
                                </div>
                              </div>
                            </div>
                            <span className="text-[0.9cqw] text-emerald-400 bg-emerald-950/60 px-[0.8cqw] py-[0.2cqw] rounded">
                              RUNNING
                            </span>
                          </div>

                          <div className="flex items-center justify-between p-[1cqw] bg-[#272c34] rounded-[0.8cqw] border border-white/5 opacity-60">
                            <div className="flex items-center gap-[1cqw]">
                              <span className="h-[1cqw] w-[1cqw] rounded-full bg-gray-500" />
                              <div>
                                <div className="text-[1.1cqw] font-medium">
                                  redis-cache:alpine
                                </div>
                                <div className="text-[0.85cqw] text-gray-400">
                                  Exited (0) 12 hours ago
                                </div>
                              </div>
                            </div>
                            <span className="text-[0.9cqw] text-gray-400 bg-gray-800 px-[0.8cqw] py-[0.2cqw] rounded">
                              EXITED
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* macOS Dock with Uniform Icon Scaling */}
                <div
                  className={`relative z-30 flex h-[6cqw] shrink-0 items-center justify-center ${
                    isDark ? "bg-[#09090a]" : "bg-[#e9e9ed]"
                  }`}
                >
                  <div
                    className={`flex items-center gap-[1cqw] rounded-[1.5cqw] border px-[1cqw] py-[0.5cqw] shadow-lg backdrop-blur-2xl ${
                      isDark
                        ? "border-white/10 bg-white/10"
                        : "border-black/10 bg-white/65"
                    }`}
                  >
                    {iconItems.map((item) => (
                      <div
                        key={item.name}
                        className="flex flex-col items-center"
                      >
                        <button
                          onClick={item.isNotesIcon ? undefined : item.action}
                          disabled={item.isNotesIcon}
                          title={item.name}
                          aria-disabled={item.isNotesIcon}
                          className={`group flex h-[3.5cqw] w-[3.5cqw] items-center justify-center rounded-[0.8cqw] p-[0.3cqw] ${
                            item.isNotesIcon
                              ? "cursor-default"
                              : "transition-transform duration-200 hover:translate-y-[-0.5cqw] hover:scale-110"
                          }`}
                        >
                          {item.isNotesIcon ? (
                            <span className="flex h-[3.5cqw] w-[3.5cqw] items-center justify-center overflow-hidden rounded-[0.8cqw] border border-[#c9c9ce] bg-[#f5f5f7] shadow-sm">
                              <span className="h-full w-full border-t-[0.4cqw] border-[#f5c84c] bg-[repeating-linear-gradient(to_bottom,#ffffff_0%,#ffffff_15%,#d8d8dc_18%,#ffffff_21%)]" />
                            </span>
                          ) : (
                            <img
                              src={item.src}
                              alt={item.name}
                              className="h-[3.5cqw] w-[3.5cqw] object-contain"
                            />
                          )}
                        </button>
                        {item.isOpen && (
                          <span className="h-[0.3cqw] w-[0.3cqw] rounded-full bg-white/80 mt-[0.1cqw]" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Terminal Window */}
                <AnimatePresence>
                  {showTerminal && (
                    <motion.div
                      drag
                      dragConstraints={screenRef}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute left-1/2 top-1/2 z-59 w-[60cqw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.5cqw] border border-gray-700 bg-[#171717] shadow-2xl"
                    >
                      <div className="flex h-[3.5cqw] items-center gap-[1cqw] bg-[#292929] px-[1.5cqw] cursor-grab active:cursor-grabbing">
                        <button
                          type="button"
                          onClick={() => setShowTerminal(false)}
                          className="group relative ml-[-0.9cqw] mr-[-0.9cqw] flex h-[3cqw] w-[3cqw] shrink-0 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-white/70"
                          aria-label="Close"
                          title="Close"
                        >
                          <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-[#ff5f56] transition-[filter] duration-150 group-hover:brightness-75" />
                        </button>
                        <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-[#ffbd2e]" />
                        <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-[#27c93f]" />
                        <span className="ml-[1cqw] text-[1.2cqw] text-gray-400">
                          kuljeet@iMac — System Information
                        </span>
                      </div>
                      <div className="max-h-[40cqw] overflow-y-auto bg-[#111] p-[2cqw] font-mono text-[1.3cqw] leading-relaxed text-green-400">
                        <p className="mb-[1cqw]">
                          <span className="text-green-400">kuljeet@iMac</span>
                          <span className="text-white"> : </span>
                        </p>
                        <div className="grid grid-cols-[auto_1fr] gap-x-[2.5cqw] gap-y-[0.8cqw]">
                          <span className="text-white/50">Model</span>
                          <span>iMac (24-inch, 2023)</span>
                          <span className="text-white/50">Chip</span>
                          <span>Apple M3</span>
                          <span className="text-white/50">Memory</span>
                          <span>16 GB unified memory</span>
                          <span className="text-white/50">Startup disk</span>
                          <span>Macintosh HD</span>
                          <span className="text-white/50">macOS</span>
                          <span>macOS Sequoia 15.1</span>
                          <span className="text-white/50">Display</span>
                          <span>24-inch Retina 4.5K</span>
                          <span className="text-white/50">Resolution</span>
                          <span>4480 × 2520</span>
                          <span className="text-white/50">Serial number</span>
                          <span>IMAC-7F3K-92QX</span>
                          <span className="text-white/50">Status</span>
                          <span>System running normally</span>
                        </div>
                        <p className="mt-[2cqw] text-white/45">
                          Hardware and software overview
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Screen reflection */}
                <div className="pointer-events-none absolute inset-0 z-70 bg-linear-to-tr from-transparent via-white/1 to-white/4" />
              </div>
            </div>

            {/* Bottom bezel (chin) */}
            <div className="flex h-[9cqw] w-full items-center justify-center bg-black" />
          </div>
        </div>

        {/* Stand neck */}
        <div
          className="z-[-1] mt-[-1cqw] h-[7cqw] w-[14cqw] bg-linear-to-b from-[#2a2a2d] to-[#121214] shadow-inner"
          style={{ clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)" }}
        />

        {/* Stand base */}
        <div className="h-[1cqw] w-[24cqw] rounded-t-[0.8cqw] bg-linear-to-b from-[#4a4a4d] to-[#1e1e20] shadow-[0_2cqw_4cqw_rgba(0,0,0,0.9)]" />
      </div>
    </div>
  );
};

export default About;
