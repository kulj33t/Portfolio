import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Project = {
  title: string;
  description: string;
  image: string;
  url?: string;
  github?: string;
};
const projects: Project[] = [
  {
    title: "CareerCopilot",
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
    title: "LeChat",
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
const DURATION = 30;
const time = (n: number) =>
  `${Math.floor(n / 60)}:${String(Math.floor(n % 60)).padStart(2, "0")}`;

function Glyph({ type, size = 22 }: { type: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    back: <path d="m15 18-6-6 6-6" />,
    play: <path d="m8 5 12 7-12 7z" fill="currentColor" stroke="none" />,
    pause: (
      <>
        <path d="M8 5v14M16 5v14" strokeWidth="3" />
      </>
    ),
    prev: (
      <>
        <path d="m19 5-10 7 10 7z" fill="currentColor" stroke="none" />
        <path d="M5 5v14" strokeWidth="2.5" />
      </>
    ),
    next: (
      <>
        <path d="m5 5 10 7-10 7z" fill="currentColor" stroke="none" />
        <path d="M19 5v14" strokeWidth="2.5" />
      </>
    ),
    heart: (
      <path d="M20.8 8.8c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.6Z" />
    ),
    lyrics: (
      <>
        <path d="M4 5h16M4 10h16M4 15h10" />
        <path d="M18 14v5l3-1.5" />
      </>
    ),
    volume: (
      <>
        <path d="M4 10v4h4l5 4V6l-5 4z" />
        <path d="M17 9a5 5 0 0 1 0 6" />
      </>
    ),
    library: (
      <>
        <path d="M4 5h16v14H4zM8 9h8M8 13h8M8 17h5" />
      </>
    ),
    github: (
      <>
        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.2a2.8 2.8 0 0 0-.8-2.2c2.7-.3 5.6-1.3 5.6-6A4.7 4.7 0 0 0 18.5 7a4.3 4.3 0 0 0-.1-3S17.4 3.7 15 5a13 13 0 0 0-6 0C6.6 3.7 5.6 4 5.6 4A4.3 4.3 0 0 0 5.5 7a4.7 4.7 0 0 0-1.3 3.6c0 4.7 2.9 5.7 5.6 6A2.8 2.8 0 0 0 9 18.8V22" />
      </>
    ),
    external: (
      <>
        <path d="M14 4h6v6M20 4l-9 9" />
        <path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[type]}
    </svg>
  );
}

const Projects: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [view, setView] = useState<"nowPlaying" | "library">("nowPlaying");
  const [details, setDetails] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [volume, setVolume] = useState(65);
  const [volumeOpen, setVolumeOpen] = useState(false);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [likes, setLikes] = useState<Record<string, number>>({});
  const startX = useRef<number | null>(null);
  const reduced = useReducedMotion();
  const current = projects[index];
  const prevProject = projects[(index - 1 + projects.length) % projects.length];
  const nextProject = projects[(index + 1) % projects.length];
  const progress = (elapsed / DURATION) * 100;

  const select = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setIndex((next + projects.length) % projects.length);
    setElapsed(0);
    setDetails(false);
    setView("nowPlaying");
  }, []);
  const next = useCallback(() => select(index + 1, 1), [index, select]);
  const previous = useCallback(() => select(index - 1, -1), [index, select]);

  useEffect(() => {
    if (!playing || view !== "nowPlaying" || details) return;
    const id = window.setInterval(
      () =>
        setElapsed((value) => {
          if (value >= DURATION - 0.1) {
            setDirection(1);
            setIndex((i) => (i + 1) % projects.length);
            setDetails(false);
            return 0;
          }
          return Math.min(DURATION, value + 0.1);
        }),
      100,
    );
    return () => window.clearInterval(id);
  }, [playing, view, details]);

  const toggleLike = () => {
    const wasLiked = !!liked[current.title];
    setLiked((s) => ({ ...s, [current.title]: !wasLiked }));
    setLikes((s) => ({
      ...s,
      [current.title]: Math.max(
        0,
        (s[current.title] ?? 0) + (wasLiked ? -1 : 1),
      ),
    }));
  };
  const swipeStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startX.current = e.touches[0].clientX;
  };
  const swipeEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx < -42) next();
    else if (dx > 42) previous();
    startX.current = null;
  };
  const variants = {
    enter: (dir: number) => ({
      x: reduced ? 0 : dir * 125,
      opacity: 0,
      scale: 0.94,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({
      x: reduced ? 0 : dir * -125,
      opacity: 0,
      scale: 0.94,
    }),
  };
  const visibleProjects = useMemo(
    () => projects.map((project, i) => ({ project, i })),
    [],
  );

  return (
    <section className="project-hardware-wrap">
      <style>{`
        /*
         * Hardware sizing:
         * - Landscape is always a 4:3 iPad frame.
         * - Portrait is always a 3:4 iPad frame.
         * - The frame is constrained by BOTH viewport width and height.
         */
        .project-hardware-wrap {
          width: 100%;
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          /* The hardware sits inside a centered 70% viewport area. */
          padding: 15svh 15vw;
        }

        .project-watch-frame {
          position: relative;
          flex: 0 1 auto;
          /* 70vw width leaves 15vw on each side; cap height at 70svh. */
          width: min(70vw, 1280px, calc(70svh * 4 / 3));
          max-height: 70svh;
          aspect-ratio: 4 / 3;
          box-sizing: border-box;
          padding: clamp(6px, .65vw, 10px);
          border-radius: clamp(28px, 3vw, 44px);
          background: linear-gradient(135deg, #a5a5aa 0%, #5c5c62 20%, #242428 52%, #77777d 78%, #29292d 100%);
          box-shadow: 0 30px 80px #0009, inset 0 1px 2px #ffffff80, inset 0 -2px 4px #000b;
          isolation: isolate;
        }

        .project-bezel {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding: clamp(5px, .7vw, 9px);
          border-radius: inherit;
          background: #030304;
          box-shadow: inset 0 0 0 1px #ffffff12, inset 0 0 12px #000;
        }

        .project-screen {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          isolation: isolate;
          aspect-ratio: 4 / 3;
          border-radius: clamp(19px, 2.2vw, 30px);
          background: #030304;
          color: #fff;
          container-type: inline-size;
        }

        .project-screen::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 30;
          pointer-events: none;
          border-radius: inherit;
          background: linear-gradient(130deg, #ffffff0b, transparent 23%, transparent 77%, #ffffff06);
          box-shadow: inset 0 1px 2px #ffffff20;
        }

        .project-buttons {
          position: absolute;
          right: -5px;
          top: 14%;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 7px;
          pointer-events: none;
        }

        .project-buttons span {
          display: block;
          width: 5px;
          border: 1px solid #ffffff40;
          border-left: 0;
          border-radius: 0 5px 5px 0;
          background: linear-gradient(90deg, #202024, #77777c 55%, #242428);
          box-shadow: 2px 2px 5px #0009, inset -1px 0 2px #ffffff40;
        }

        .project-buttons .power { height: 29px; margin-bottom: 13px; }
        .project-buttons .volume { height: 36px; }

        .player-root {
          position: relative;
          display: grid;
          grid-template-rows: 8% minmax(0, 1fr);
          width: 100%;
          height: 100%;
          min-height: 0;
          background: #030304;
        }

        .player-nav {
          position: relative;
          z-index: 4;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 0;
          padding: 0 4%;
          color: #ffffffbd;
          font-size: clamp(10px, 1.05cqw, 13px);
        }

        .player-nav button,
        .player-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          min-width: 34px;
          min-height: 34px;
          border: 0;
          background: transparent;
          color: #fff;
          cursor: pointer;
        }

        .now-playing {
          grid-area: 2 / 1;
          z-index: 3;
          display: grid;
          grid-template-rows: minmax(0, 1fr) auto;
          min-width: 0;
          min-height: 0;
          position: relative;
          padding-bottom: clamp(8px, 1.1cqw, 15px);
          box-sizing: border-box;
        }

        .art-carousel {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 0;
          min-height: 0;
          overflow: hidden;
          perspective: 1000px;
          touch-action: pan-y;
          user-select: none;
        }

        .main-art {
          position: relative;
          z-index: 2;
          width: min(44%, 430px);
          max-height: 92%;
          aspect-ratio: 1;
          box-sizing: border-box;
          padding: 5px;
          overflow: hidden;
          border: 1px solid transparent;
          border-radius: clamp(12px, 1.4cqw, 20px);
          background: linear-gradient(#050506, #050506) padding-box,
            linear-gradient(145deg, #ffffff 0%, #85878d 22%, #e8e8eb 48%, #55575d 76%, #c8c8cc 100%) border-box;
          box-shadow: 0 25px 70px #000b, 0 0 0 1px #ffffff55, inset 0 1px 2px #fff;
          will-change: transform;
        }

        .art-flipper,
        .art-artwork-face {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: inherit;
        }

        .art-artwork-face { position: absolute; inset: 0; }

        .art-artwork-face img,
        .main-art img,
        .peek-art img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .art-about {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding: clamp(18px, 3cqw, 40px);
          overflow: auto;
          border-radius: inherit;
          background: #08080bb8;
          backdrop-filter: blur(9px);
          -webkit-backdrop-filter: blur(9px);
          text-align: left;
        }

        .art-about-eyebrow {
          color: #ffffff70;
          font-size: clamp(9px, .9cqw, 11px);
          font-weight: 650;
          letter-spacing: .19em;
        }

        .art-about h2 {
          margin: 12px 0 18px;
          font-size: clamp(20px, 2.5cqw, 31px);
          font-weight: 700;
          letter-spacing: -.045em;
          line-height: 1.1;
        }

        .art-about p {
          max-width: 55ch;
          margin: 0;
          color: #ffffffc4;
          font-size: clamp(12px, 1.25cqw, 16px);
          line-height: 1.65;
        }

        .art-about-footer {
          margin-top: auto;
          padding-top: 20px;
          color: #ffffff65;
          font-size: 10px;
          letter-spacing: .12em;
        }

        .peek-art {
          position: absolute;
          top: 50%;
          z-index: 1;
          width: 36%;
          aspect-ratio: 1;
          box-sizing: border-box;
          padding: 4px;
          overflow: hidden;
          border: 1px solid transparent;
          border-radius: clamp(9px, 1.3cqw, 18px);
          background: linear-gradient(#050506, #050506) padding-box,
            linear-gradient(145deg, #ffffff 0%, #85878d 22%, #e8e8eb 48%, #55575d 76%, #c8c8cc 100%) border-box;
          box-shadow: 0 16px 42px #000a;
          opacity: .42;
          filter: brightness(.58) saturate(.8);
          transform: translateY(-50%) scale(.76);
          cursor: pointer;
        }

        .peek-art.left { left: -22%; }
        .peek-art.right { right: -22%; }

        .track-info {
          position: relative;
          z-index: 3;
          width: min(58%, 650px);
          min-width: 0;
          margin: 0 auto;
          box-sizing: border-box;
        }

        .track-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          min-width: 0;
        }

        .track-title {
          overflow: hidden;
          font-size: clamp(16px, 2.05cqw, 26px);
          font-weight: 680;
          letter-spacing: -.04em;
          line-height: 1.2;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .track-caption {
          margin-top: 5px;
          color: #ffffff75;
          font-size: clamp(10px, 1.05cqw, 13px);
        }

        .like-button {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          border: 0;
          background: transparent;
          color: #ffffffb0;
          cursor: pointer;
        }

        .like-button.is-liked { color: #ff375f; }

        .timeline { margin-top: 1.1cqw; }
        .timeline input {
          display: block;
          width: 100%;
          height: 4px;
          margin: 0;
          appearance: none;
          border-radius: 20px;
          outline: none;
          background: linear-gradient(to right, #fff var(--progress), #ffffff35 var(--progress));
          cursor: pointer;
        }

        .timeline input::-webkit-slider-thumb {
          width: 10px;
          height: 10px;
          appearance: none;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 0 2px #ffffff20;
        }

        .timeline input::-moz-range-thumb {
          width: 10px;
          height: 10px;
          border: 0;
          border-radius: 50%;
          background: #fff;
        }

        .time-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 7px;
          color: #ffffff70;
          font-size: 10px;
          font-variant-numeric: tabular-nums;
        }

        .transport {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(28px, 4.2cqw, 58px);
          margin: 1.15cqw 0 0;
        }

        .transport button {
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          min-width: 34px;
          min-height: 34px;
          border: 0;
          background: transparent;
          color: #fff;
          cursor: pointer;
          transition: transform .18s ease;
        }

        .transport button:hover { transform: scale(1.08); }

        .transport .play-button {
          width: clamp(42px, 5cqw, 62px);
          height: clamp(42px, 5cqw, 62px);
          min-width: 0;
          min-height: 0;
          border-radius: 50%;
          background: #fff;
          color: #050505;
        }

        .track-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: clamp(8px, 1.5cqw, 18px);
          margin: 1cqw 0 0;
        }

        .track-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          min-height: 34px;
          box-sizing: border-box;
          padding: 7px 13px;
          border: 1px solid #ffffff1c;
          border-radius: 999px;
          background: #ffffff08;
          color: #ffffffdf;
          font-size: clamp(10px, 1.05cqw, 13px);
          text-decoration: none;
          white-space: nowrap;
          backdrop-filter: blur(22px) saturate(160%);
          cursor: pointer;
          transition: background .2s, border-color .2s;
        }

        .track-action:hover {
          border-color: #ffffff40;
          background: #ffffff18;
        }

        .library-stage {
          grid-area: 2 / 1;
          z-index: 1;
          position: relative;
          width: 100%;
          height: 100%;
          min-width: 0;
          min-height: 0;
          overflow: hidden;
        }

        .library-view {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          min-height: 0;
          overflow-x: hidden;
          overflow-y: auto;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 1% 5% 120px;
          box-sizing: border-box;
        }

        .library-view::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        .library-view h2 {
          margin: 1.5% 0 2%;
          font-size: clamp(22px, 3cqw, 36px);
          font-weight: 700;
          letter-spacing: -.05em;
        }

        .library-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 2.4cqw;
        }

        .library-item {
          min-width: 0;
          border: 0;
          background: transparent;
          color: #fff;
          text-align: left;
          cursor: pointer;
        }

        .library-item img {
          display: block;
          width: 100%;
          aspect-ratio: 1;
          border-radius: clamp(9px, 1.2cqw, 16px);
          object-fit: cover;
          box-shadow: 0 12px 30px #0008;
          transition: transform .25s, filter .25s;
        }

        .library-item:hover img {
          transform: translateY(-4px) scale(1.015);
          filter: brightness(1.08);
        }

        .library-item strong {
          display: block;
          overflow: hidden;
          margin-top: 9px;
          font-size: clamp(11px, 1.15cqw, 15px);
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .library-item small {
          display: block;
          margin-top: 4px;
          color: #ffffff70;
          font-size: clamp(9px, .9cqw, 12px);
        }

        .mini-player {
          position: absolute;
          transform-origin: center;
          will-change: transform, border-radius;
          z-index: 10;
          right: 3%;
          bottom: 2%;
          left: 3%;
          display: flex;
          align-items: center;
          gap: 12px;
          height: 9%;
          min-height: 46px;
          box-sizing: border-box;
          padding: 0 14px;
          border: 1px solid #ffffff25;
          border-radius: 14px;
          background: #17171bd9;
          color: #fff;
          text-align: left;
          backdrop-filter: blur(30px) saturate(180%);
          box-shadow: 0 12px 40px #0009;
          cursor: pointer;
        }

        .mini-player img {
          flex: 0 0 auto;
          width: clamp(30px, 5.2cqw, 58px);
          height: clamp(30px, 5.2cqw, 58px);
          border-radius: 7px;
          object-fit: cover;
        }

        .mini-copy { flex: 1; min-width: 0; overflow: hidden; }
        .mini-copy strong {
          display: block;
          overflow: hidden;
          font-size: clamp(10px, 1.1cqw, 14px);
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .mini-copy small {
          display: block;
          margin-top: 3px;
          color: #ffffff70;
          font-size: clamp(9px, .9cqw, 11px);
        }

        .mini-progress {
          width: 15%;
          height: 2px;
          overflow: hidden;
          border-radius: 8px;
          background: #ffffff30;
        }

        .mini-progress span {
          display: block;
          height: 100%;
          background: #fff;
        }

        .volume-panel {
          position: absolute;
          right: 4%;
          bottom: 12%;
          z-index: 12;
          width: min(250px, 35%);
          box-sizing: border-box;
          padding: 14px 16px;
          border: 1px solid #ffffff24;
          border-radius: 16px;
          background: #17171be8;
          backdrop-filter: blur(30px);
          box-shadow: 0 12px 40px #0009;
        }

        .volume-panel input { width: 100%; accent-color: white; }

        /* Portrait iPad and phone: retain the portrait iPad hardware silhouette. */
        @media (orientation: portrait) {
          .project-hardware-wrap {
            padding: 9svh 9vw;
          }

          .project-watch-frame {
            width: min(82vw, 980px, calc(82svh * 3 / 4));
            max-height: 82svh;
            aspect-ratio: 3 / 4;
            border-radius: clamp(28px, 3vw, 44px);
          }

          .project-screen { aspect-ratio: 3 / 4; }

          .player-root { grid-template-rows: 7% minmax(0, 1fr); }
          .player-nav { padding: 0 5%; }

          /* Give the artwork most of the portrait screen; keep controls compact. */
          .now-playing {
            grid-template-rows: minmax(0, 1fr) auto;
            padding-bottom: clamp(6px, 1cqw, 12px);
          }

          .art-carousel {
            overflow: hidden;
            min-height: 0;
          }

          .main-art {
            width: min(76%, 760px);
            max-height: 98%;
            padding: 5px;
          }

          .peek-art { width: 54%; }
          .peek-art.left { left: -34%; }
          .peek-art.right { right: -34%; }

          .track-info {
            width: 76%;
            max-width: 720px;
          }

          .track-title { font-size: clamp(15px, 2.8cqw, 25px); }
          .track-caption { margin-top: 3px; font-size: clamp(9px, 1.25cqw, 12px); }
          .timeline { margin-top: 1.2cqw; }
          .time-labels { margin-top: 4px; font-size: 9px; }

          .transport {
            gap: clamp(22px, 5cqw, 48px);
            margin-top: 1.2cqw;
          }

          .transport button {
            min-width: 30px;
            min-height: 30px;
          }

          .transport .play-button {
            width: clamp(38px, 4.8cqw, 54px);
            height: clamp(38px, 4.8cqw, 54px);
          }

          .track-actions {
            gap: clamp(6px, 1.3cqw, 12px);
            margin-top: 1cqw;
          }

          .track-action {
            min-height: 30px;
            padding: 5px clamp(8px, 1.5cqw, 13px);
            font-size: clamp(9px, 1.15cqw, 12px);
          }

          .library-view { padding: 3% 5% 120px; }
          .library-view h2 { margin: 3% 0 5%; font-size: clamp(25px, 4cqw, 38px); }
          .library-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: 5%;
            row-gap: 18px;
          }

          .library-item strong { margin-top: 8px; font-size: clamp(12px, 1.8cqw, 17px); }
          .library-item small { font-size: clamp(10px, 1.3cqw, 13px); }

          .mini-player {
            right: 3%;
            left: 3%;
            bottom: 2%;
            min-height: 52px;
            padding: 0 12px;
            gap: 10px;
            border-radius: 14px;
          }

          .mini-player img {
            width: clamp(36px, 5cqw, 58px);
            height: clamp(36px, 5cqw, 58px);
          }

          .mini-copy strong { font-size: clamp(11px, 1.6cqw, 15px); }
          .mini-copy small { font-size: clamp(9px, 1.2cqw, 12px); }
          .volume-panel { right: 5%; bottom: 13%; width: min(280px, 55%); }
          .project-buttons { right: -4px; top: 13%; }
        }

        /* Narrow phones: keep the same portrait composition, scale it down safely. */
        @media (orientation: portrait) and (max-width: 700px) {
          .project-hardware-wrap {
            min-height: 100svh;
            padding: 6svh 6vw;
          }

          .project-watch-frame {
            width: min(88vw, 520px, calc(84svh * 3 / 4));
            max-height: 84svh;
            padding: 5px;
            border-radius: 27px;
          }

          .project-bezel { padding: 5px; border-radius: 23px; }
          .project-screen { border-radius: 19px; }
          .player-nav { font-size: 10px; }

          .now-playing {
            grid-template-rows: minmax(0, 1fr) auto;
            padding-bottom: 5px;
          }

          .art-carousel { min-height: 0; }
          .main-art { width: 78%; max-height: 98%; padding: 4px; }
          .peek-art { width: 56%; }
          .art-about { padding: clamp(14px, 4vw, 22px); }
          .art-about h2 { margin: 9px 0 12px; font-size: clamp(17px, 5vw, 23px); }
          .art-about p { font-size: clamp(10px, 2.9vw, 13px); line-height: 1.5; }
          .art-about-footer { padding-top: 12px; font-size: 8px; }

          .track-info { width: 82%; }
          .track-title { font-size: clamp(14px, 3.8vw, 18px); }
          .track-caption { margin-top: 2px; font-size: 9px; }
          .timeline { margin-top: 2vw; }
          .time-labels { margin-top: 3px; font-size: 8px; }

          .transport {
            gap: clamp(20px, 6vw, 32px);
            margin-top: 1.8vw;
          }

          .transport button {
            min-width: 28px;
            min-height: 28px;
          }

          .transport .play-button {
            width: clamp(36px, 10vw, 46px);
            height: clamp(36px, 10vw, 46px);
          }

          .track-actions {
            gap: 5px;
            margin-top: 1.5vw;
          }

          .track-action {
            min-height: 27px;
            gap: 4px;
            padding: 4px 7px;
            font-size: 9px;
          }

          .library-view { padding: 3% 5% 110px; }
          .library-view h2 { margin: 4% 0 6%; font-size: 25px; }
          .library-grid { column-gap: 5%; row-gap: 16px; }
          .library-item strong { font-size: 12px; }
          .library-item small { font-size: 9px; }

          .mini-player {
            min-height: 46px;
            padding: 0 9px;
            gap: 8px;
            border-radius: 12px;
          }

          .mini-player img { width: 34px; height: 34px; }
          .mini-copy strong { font-size: 10px; }
          .mini-copy small { font-size: 8px; }
          .volume-panel { bottom: 13%; width: 58%; padding: 11px 12px; }
          .project-buttons .power { height: 25px; }
          .project-buttons .volume { height: 30px; }
        }

        @media (max-height: 720px) and (orientation: landscape) {
          .project-hardware-wrap { padding: 15svh 15vw; }
          .player-root { grid-template-rows: 7% minmax(0, 1fr); }
          .main-art { width: min(40%, 380px); }
          .track-info { width: min(62%, 650px); }
          .track-caption { margin-top: 3px; }
          .timeline { margin-top: .7cqw; }
          .transport { margin-top: .7cqw; }
          .track-actions { margin-top: .6cqw; }
          .track-action { min-height: 30px; padding-top: 5px; padding-bottom: 5px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .project-watch-frame * {
            scroll-behavior: auto !important;
            transition: none !important;
          }
        }
      `}</style>
      <div className="project-watch-frame">
        <div className="project-buttons" aria-hidden="true">
          <span className="power" />
          <span className="volume" />
          <span className="volume" />
        </div>
        <div className="project-bezel">
          <div className="project-screen">
            <div className="player-root">
              <header className="player-nav">
                <button
                  onClick={() =>
                    setView(view === "nowPlaying" ? "library" : "nowPlaying")
                  }
                  aria-label={
                    view === "nowPlaying"
                      ? "Open project library"
                      : "Back to player"
                  }
                >
                  <Glyph
                    type={view === "nowPlaying" ? "library" : "back"}
                    size={19}
                  />
                </button>
                <span
                  style={{
                    fontSize: ".88em",
                    letterSpacing: ".16em",
                    fontWeight: 650,
                  }}
                >
                  {view === "nowPlaying" ? "NOW PLAYING" : "PROJECT LIBRARY"}
                </span>
                <button
                  onClick={() => setVolumeOpen((v) => !v)}
                  aria-label="Volume"
                >
                  <Glyph type="volume" size={19} />
                </button>
              </header>
              <AnimatePresence initial={false} mode="sync">
                {view === "nowPlaying" ? (
                  <motion.main
                    key="now-playing"
                    className="now-playing"
                    initial={
                      reduced
                        ? false
                        : { clipPath: "inset(100% 0 0 0 round 14px)" }
                    }
                    animate={{ clipPath: "inset(0% 0 0 0 round 0px)" }}
                    exit={
                      reduced
                        ? undefined
                        : { clipPath: "inset(100% 0 0 0 round 14px)" }
                    }
                    transition={{
                      // A longer, controlled ease-out gives the panel a
                      // continuous iOS-style glide instead of a quick snap.
                      duration: reduced ? 0 : 0.78,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                  >
                    <div
                      className={`art-carousel ${details ? "details-open" : ""}`}
                      onTouchStart={swipeStart}
                      onTouchEnd={swipeEnd}
                    >
                      <button
                        className="peek-art left"
                        onClick={previous}
                        aria-label={`Previous: ${prevProject.title}`}
                      >
                        <img src={prevProject.image} alt="" draggable={false} />
                      </button>
                      <button
                        className="peek-art right"
                        onClick={next}
                        aria-label={`Next: ${nextProject.title}`}
                      >
                        <img src={nextProject.image} alt="" draggable={false} />
                      </button>
                      <AnimatePresence
                        initial={false}
                        custom={direction}
                        mode="popLayout"
                      >
                        <motion.div
                          key={current.title}
                          className="main-art"
                          custom={direction}
                          variants={variants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{
                            type: "spring",
                            stiffness: 280,
                            damping: 30,
                            mass: 0.85,
                          }}
                          drag={details ? false : "x"}
                          dragConstraints={{ left: 0, right: 0 }}
                          dragElastic={0.16}
                          onDragEnd={(_, info) => {
                            if (info.offset.x < -55 || info.velocity.x < -450)
                              next();
                            else if (
                              info.offset.x > 55 ||
                              info.velocity.x > 450
                            )
                              previous();
                          }}
                        >
                          <div className="art-flipper">
                            <div className="art-artwork-face">
                              <motion.img
                                src={current.image}
                                alt={`${current.title} project artwork`}
                                draggable={false}
                                animate={{
                                  filter: details
                                    ? "blur(5px) brightness(0.42)"
                                    : "blur(0px) brightness(1)",
                                  scale: details ? 1.06 : 1,
                                }}
                                transition={{
                                  duration: 0.45,
                                  ease: "easeInOut",
                                }}
                              />
                            </div>
                            <AnimatePresence>
                              {details && (
                                <motion.div
                                  className="art-about"
                                  initial={{ opacity: 0, y: 12 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 8 }}
                                  transition={{
                                    duration: 0.35,
                                    ease: "easeOut",
                                  }}
                                >
                                  <span className="art-about-eyebrow">
                                    ABOUT THIS PROJECT
                                  </span>
                                  <h2>{current.title}</h2>
                                  <p>{current.description}</p>
                                  <div className="art-about-footer">
                                    PROJECT {String(index + 1).padStart(2, "0")}{" "}
                                    · KULJEET'S PORTFOLIO
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <section className="track-info">
                      <div className="track-line">
                        <div style={{ minWidth: 0 }}>
                          <div className="track-title">{current.title}</div>
                          <div className="track-caption">
                            Project {String(index + 1).padStart(2, "0")} ·
                            Kuljeet's Portfolio
                          </div>
                        </div>
                        <button
                          className={`like-button ${liked[current.title] ? "is-liked" : ""}`}
                          onClick={toggleLike}
                          aria-label="Like project"
                        >
                          <Glyph type="heart" size={23} />
                          <span style={{ fontSize: 11, marginLeft: 5 }}>
                            {likes[current.title] ?? 0}
                          </span>
                        </button>
                      </div>
                      <div className="timeline">
                        <input
                          type="range"
                          min="0"
                          max={DURATION}
                          step=".1"
                          value={elapsed}
                          style={
                            {
                              "--progress": `${progress}%`,
                            } as React.CSSProperties
                          }
                          onChange={(e) => setElapsed(Number(e.target.value))}
                          aria-label="Project playback progress"
                        />
                        <div className="time-labels">
                          <span>{time(elapsed)}</span>
                          <span>-{time(DURATION - elapsed)}</span>
                        </div>
                      </div>
                      <div className="transport">
                        <button
                          onClick={previous}
                          aria-label="Previous project"
                        >
                          <Glyph type="prev" size={25} />
                        </button>
                        <button
                          className="play-button"
                          onClick={() => setPlaying((v) => !v)}
                          aria-label={playing ? "Pause" : "Play"}
                        >
                          <Glyph type={playing ? "pause" : "play"} size={23} />
                        </button>
                        <button onClick={next} aria-label="Next project">
                          <Glyph type="next" size={25} />
                        </button>
                      </div>
                      <div className="track-actions">
                        <button
                          className="track-action"
                          onClick={() => setDetails((value) => !value)}
                          aria-pressed={details}
                        >
                          <Glyph type="lyrics" size={16} />{" "}
                          {details ? "Artwork" : "About"}
                        </button>
                        {current.url && (
                          <a
                            className="track-action"
                            href={current.url}
                            target={
                              current.url.startsWith("/") ? "_self" : "_blank"
                            }
                            rel="noreferrer"
                          >
                            Live <Glyph type="external" size={14} />
                          </a>
                        )}
                        {current.github && (
                          <a
                            className="track-action"
                            href={current.github}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Glyph type="github" size={15} /> GitHub
                          </a>
                        )}
                      </div>
                    </section>
                    {volumeOpen && (
                      <div className="volume-panel">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 9,
                            fontSize: 12,
                          }}
                        >
                          <span>Player volume</span>
                          <span>{volume}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={(e) => setVolume(Number(e.target.value))}
                        />
                      </div>
                    )}
                  </motion.main>
                ) : (
                  <div key="library" className="library-stage">
                    <main className="library-view">
                      <div className="library-grid">
                        {visibleProjects.map(({ project, i }) => (
                          <button
                            className="library-item"
                            key={project.title}
                            onClick={() => select(i, i >= index ? 1 : -1)}
                          >
                            <img src={project.image} alt="" loading="lazy" />
                            <strong>{project.title}</strong>
                            <small>
                              {i === index
                                ? "Now playing"
                                : `Project ${String(i + 1).padStart(2, "0")}`}
                            </small>
                          </button>
                        ))}
                      </div>
                    </main>
                    <div
                      className="mini-player"
                      role="button"
                      tabIndex={0}
                      onClick={() => setView("nowPlaying")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          setView("nowPlaying");
                      }}
                      aria-label="Expand now playing"
                    >
                      <img src={current.image} alt="" />
                      <span className="mini-copy">
                        <strong>{current.title}</strong>
                        <small>
                          {playing ? "Playing" : "Paused"} · Project {index + 1}
                        </small>
                      </span>
                      <span className="mini-progress">
                        <span style={{ width: `${progress}%` }} />
                      </span>
                      <span onClick={(e) => e.stopPropagation()}>
                        <button
                          className="player-icon"
                          onClick={() => setPlaying((v) => !v)}
                          aria-label={playing ? "Pause" : "Play"}
                        >
                          <Glyph type={playing ? "pause" : "play"} size={19} />
                        </button>
                      </span>
                      <span onClick={(e) => e.stopPropagation()}>
                        <button
                          className="player-icon"
                          onClick={next}
                          aria-label="Next project"
                        >
                          <Glyph type="next" size={19} />
                        </button>
                      </span>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Projects;
