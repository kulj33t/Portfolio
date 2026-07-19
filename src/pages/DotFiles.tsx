import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DotFiles: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const installCommand = "curl -sS install.sh | sh";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-screen text-gray-300 font-sans selection:bg-white/20 p-4 md:p-8 flex justify-center">
      
      {/* Centered Main Container */}
      <div className="w-full max-w-3xl flex flex-col gap-8 pb-16">
        
        {/* Navigation & Top Heading */}
        <div className="w-full pt-4 pb-2">

          
          <h1 className="text-4xl md:text-6xl font-bold  text-white  tracking-wide text-center">
            dot<span className="text-purple-400">Files</span>
          </h1>
          <p className="text-center text-gray-400 mt-4 text-sm md:text-base">
            Universal Dotfiles & Custom Linux Configuration
          </p>
        </div>

     {/* 1. Installation Script Card (Split Layout) */}
        <div className="w-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
       {/* Left Column: Content & Command */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            
            <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed max-w-md font-medium">
              Step back and relax, let us do it.
            </p>

            <div className="w-full max-w-md flex flex-col items-start">
              
              {/* Styled Label */}
              <p className="text-white font-bold tracking-wide text-sm mb-3 opacity-90">
                Install from macOS
              </p>
            
              <div className="flex items-center gap-3 w-full">
                
                {/* Green Pill Command Box */}
                <div className="bg-[#48845d] text-white px-5 py-3.5 rounded-xl font-mono text-xs md:text-sm tracking-widest shadow-[0_4px_14px_0_rgba(72,132,93,0.39)] flex-1 overflow-hidden border border-[#5a9c6f]/50">
                  <span className="whitespace-nowrap overflow-x-auto block scrollbar-hide">
                    {installCommand}
                  </span>
                </div>

                {/* Clipboard Icon Button */}
                <button 
                  onClick={handleCopy}
                  className="p-3.5 bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white rounded-xl transition-all duration-300 border border-white/10 flex-shrink-0 shadow-sm active:scale-95"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Vertical Divider (Hidden on smaller screens) */}
          <div className="hidden lg:block w-px h-64 bg-white/10 mx-4"></div>

          {/* Right Column: Image */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            {/* Replace the src with your actual image path */}
            <img 
              src="/icons/projects/linux.png" 
              alt="System Architecture Interface" 
              className="w-full max-w-125 h-auto object-contain drop-shadow-2xl transform transition-transform hover:scale-105 duration-500" 
            />
          </div>
          
        </div>

        {/* 2. About Fedora Asahi */}
        <div className="w-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] hover:bg-white/[0.05] transition-colors duration-300">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-2xl font-bold text-white font-['Tenkai',_sans-serif] uppercase tracking-wider">Fedora Asahi Linux</h2>
          </div>
          <p className="text-sm md:text-base leading-relaxed text-gray-300">
            This ecosystem is heavily optimized for bare-metal performance on Apple Silicon (M1 MacBook Air). Powered by Fedora Asahi Remix, this setup utilizes the reverse-engineering breakthroughs of the Asahi Linux project to run native, upstream Linux on ARM architecture, ensuring maximum battery life and hardware efficiency.
          </p>
        </div>

        {/* 3. About Hyprland */}
        <div className="w-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] hover:bg-white/[0.05] transition-colors duration-300">
          <h2 className="text-2xl font-bold text-white mb-4 font-['Tenkai',_sans-serif] uppercase tracking-wider">Hyprland Compositor</h2>
          <p className="text-sm md:text-base leading-relaxed text-gray-300">
            Replacing traditional desktop environments entirely, Hyprland is a dynamic tiling Wayland compositor. It prioritizes fluid animations and aesthetic customizability without sacrificing performance. The setup is highly keyboard-centric, streamlining developer workflows through custom window management keybindings and workspaces.
          </p>
        </div>

        {/* 4. About Wayland (vs X11) */}
        <div className="w-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] hover:bg-white/[0.05] transition-colors duration-300">
          <h2 className="text-2xl font-bold text-white mb-4 font-['Tenkai',_sans-serif] uppercase tracking-wider">Wayland Architecture</h2>
          <p className="text-sm md:text-base leading-relaxed text-gray-300 mb-4">
            For decades, Linux relied on X11, a legacy client-server protocol prone to screen tearing and bloat. This system completely deprecates X11 in favor of Wayland.
          </p>
          <ul className="list-none space-y-2 text-sm text-gray-400">
            <li className="flex items-start">
              <span className="text-white mr-3">✦</span>
              <span><strong>Performance:</strong> Direct rendering to the hardware removes the middleman, meaning zero screen tearing and significantly reduced input lag.</span>
            </li>
            <li className="flex items-start">
              <span className="text-white mr-3">✦</span>
              <span><strong>Security:</strong> Applications are sandboxed by default. Screen capturing or keylogging requires strict, explicit permission via PipeWire protocols.</span>
            </li>
          </ul>
        </div>

        {/* 5. About Kitty */}
        <div className="w-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] hover:bg-white/[0.05] transition-colors duration-300">
          <h2 className="text-2xl font-bold text-white mb-4 font-['Tenkai',_sans-serif] uppercase tracking-wider">Kitty Terminal</h2>
          <p className="text-sm md:text-base leading-relaxed text-gray-300">
            The backbone of this developer setup is the Kitty terminal emulator. Because it is fully GPU-accelerated, it effortlessly handles large volumes of text rendering—crucial for heavy C++ compilation output. It natively supports font ligatures, custom keybindings, and inline image viewing directly within the command line.
          </p>
        </div>

      </div>
    </div>
  );
};

export default DotFiles;