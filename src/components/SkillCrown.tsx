import React from "react";

const SkillCrown: React.FC = () => {
  return (
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
      {/* Metallic outer body */}
      <div className="absolute inset-0 rounded-full border border-[#aaa] bg-gradient-to-br from-[#eee] via-[#777] to-[#222] shadow-[0_3px_10px_rgba(0,0,0,0.6)]" />

      {/* Crown grooves */}
      <div
        className="absolute inset-[3px] rounded-full"
        style={{
          background:
            "repeating-conic-gradient(#444 0deg 3deg, #ddd 4deg 6deg, #666 7deg 9deg)",
          maskImage: "radial-gradient(circle, transparent 0 62%, black 64%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 0 62%, black 64%)",
        }}
      />

      {/* Inner ring */}
      <div className="absolute inset-[9px] rounded-full border border-white/50 bg-gradient-to-br from-[#777] via-[#292929] to-[#080808] shadow-inner" />

      {/* Center */}
      <div className="absolute inset-[13px] rounded-full border border-white/20 bg-gradient-to-br from-[#333] to-black" />

      {/* Red accent */}
      <div className="absolute right-[5px] top-[5px] h-[5px] w-[5px] rounded-full border border-red-300 bg-red-500 shadow-[0_0_5px_rgba(255,50,50,0.6)]" />
    </div>
  );
};

export default SkillCrown;
