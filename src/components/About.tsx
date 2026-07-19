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
      className="absolute select-none pointer-events-none"
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
    <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden z-0 pointer-events-none">
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
    window.innerHeight > window.innerWidth
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
    [isPortrait]
  );

  return (
    <div className="relative h-screen overflow-hidden">
      <FloatingBackground iconPositions={iconPositions} isPortrait={isPortrait} />
      <div className="h-screen w-screen flex justify-center items-center relative z-10 p-4 box-border">
        <div className="w-[40vw] min-w-[300px] p-[2vh] rounded-[1.6vh] bg-white/5 backdrop-blur-[10px] text-[#ccc] shadow-[0_0.4vh_3vh_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center">
          <h1 className="font-['Tenkai',_sans-serif] text-[clamp(1.5rem,2vw+1vh,3rem)] mb-6 text-white tracking-[2px]">
            Hi there
          </h1>
          <p className="text-[clamp(0.8rem,2vw+1vh,1.2rem)] leading-[1.6] text-[#ddd]">
            I’m Kuljeet Singh, a passionate web developer specializing in
            building beautiful and performant web applications using React and
            TypeScript. I love crafting clean, modern UI and enjoy solving
            complex problems with elegant code.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;