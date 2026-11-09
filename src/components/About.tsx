import React, { useEffect, useState, useMemo } from "react";

type Position2D = { x: number; y: number; size?: number };

const FloatingIcon: React.FC<{
  src: string;
  position: Position2D;
  isPortrait: boolean;
}> = ({ src, position, isPortrait }) => {
  const [offsetY, setOffsetY] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      const floatY = 10 * Math.sin((elapsed / 3000) * 2 * Math.PI + position.x);
      const rotZ = 6 * Math.sin((elapsed / 3000) * 2 * Math.PI + position.x);

      setOffsetY(floatY);
      setRotation(rotZ);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position.x]);

  const vwSize = position.size ? position.size * 5 : 5;

  const sizeClamp = {
    min: isPortrait ? 120 : 120,
    max: isPortrait ? 150 : 180,
  };

  const width = `clamp(${sizeClamp.min}px, ${vwSize}vw, ${sizeClamp.max}px)`;
  const height = width;

  return (
    <img
      src={src}
      alt=""
      className="pointer-events-none absolute select-none object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.25)]"
      style={{
        top: `calc(50vh + ${position.y}vh - 3vh)`,
        left: `calc(50vw + ${position.x}vw)`,
        width,
        height,
        transform: `translateY(${offsetY}px) rotate(${rotation}deg)`,
      }}
      draggable={false}
    />
  );
};

const FloatingBackground: React.FC<{
  iconPositions: Position2D[];
  isPortrait: boolean;
}> = ({ iconPositions, isPortrait }) => {
  const iconSize = isPortrait ? 0.2 : 2.2;

  return (
    <div className="pointer-events-none absolute left-0 top-0 z-0 h-screen w-screen overflow-hidden">
      {iconPositions.map((pos, i) => (
        <FloatingIcon
          key={`icon-${i}`}
          src={`/icons/about/${i === 0 ? "coffee" : "mug"}.png`}
          position={{ ...pos, size: iconSize }}
          isPortrait={isPortrait}
        />
      ))}
    </div>
  );
};

const About: React.FC = () => {
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const iconPositions = useMemo<Position2D[]>(
    () =>
      isPortrait
        ? [
            { x: -10, y: -35 },
            { x: -10, y: 35 },
          ]
        : [
            { x: -40, y: 0 },
            { x: 30, y: 0 },
          ],
    [isPortrait],
  );

  return (
    <div className="relative h-screen overflow-hidden bg-transparent">
      <FloatingBackground
        iconPositions={iconPositions}
        isPortrait={isPortrait}
      />

      <div className="relative z-10 flex h-screen w-screen items-center justify-center p-4">
        {/* About Card */}
        <div className="group relative flex w-[40vw] min-w-75 flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/12 bg-linear-to-br from-white/9 via-white/4 to-white/2 p-[clamp(1.5rem,4vw,3.5rem)] text-center text-[#ccc] shadow-[0_20px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition-all duration-500 hover:border-white/20 hover:shadow-[0_25px_90px_rgba(0,0,0,0.4)]">
          {/* Decorative Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#f5f0df]/[0.07] blur-[80px] transition-all duration-700 group-hover:bg-[#f5f0df]/12" />

          <h1 className="font-['Tenkai',sans-serif] text-[clamp(2rem,3vw+1vh,3.5rem)] tracking-wide text-white">
            Hey, I'm Kuljeet.
          </h1>
          {/* Top Accent */}
          <div className="mb-6 flex items-center gap-2">
            <span className="h-px w-8 bg-[#f5f0df]/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#f5f0df] shadow-[0_0_12px_#f5f0df]" />
            <span className="h-px w-8 bg-[#f5f0df]/40" />
          </div>
          <p className="max-w-2xl text-lg leading-8 text-white/70">
            An IT undergrad, developer, and curious mind who enjoys turning
            ideas into things people can actually use. I've worked across web
            development, machine learning research, and design through my
            internship experiences. Always experimenting, learning, and building
            something new along the way.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
