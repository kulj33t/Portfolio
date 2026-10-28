import { useState, useEffect } from "react";

const IconCheck = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
);
const IconCopy = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
);
const IconTerminal = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
);
const IconDownload = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
);
const IconFolder = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
);
const IconRocket = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
);
const IconGithub = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);
const IconShieldAlert = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.5 0 4.7 1.1 7 2a1 1 0 0 1 1 1Z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
);
const IconTriangleAlert = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
);
const IconExternalLink = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
);
const IconServer = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>
);
const IconArrowRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const IconClipboard = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 14h6"/><path d="M9 10h6"/></svg>
);
const IconLock = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);

// --- OS LOGOS (Abstracted/Simplified SVG paths for sleekness) ---
const IconArch = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2L2 22h4.5l5.5-10.5L17.5 22H22L12 2z"/><path d="M7 16.5c2-1 8-1 10 0"/></svg>
);
const IconFedora = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M14.5 17.5v-2h-3v-2h3v-4c0-1.5-.5-3-3-3H9v2h2.5c.5 0 .5.5.5.5v4.5h-3v2h3v2z"/></svg>
);
const IconUbuntu = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="6"/><circle cx="12" cy="3" r="2.5"/><circle cx="4.5" cy="17.5" r="2.5"/><circle cx="19.5" cy="17.5" r="2.5"/></svg>
);
const IconSuse = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="1.5"/><circle cx="15" cy="10" r="1.5"/><path d="M9 15c1 1 5 1 6 0"/></svg>
);

const repoUrl = "https://github.com/yourusername/dotfiles";
const cloneCommand = `git clone ${repoUrl} && cd dotfiles`;

type OsType = 'arch' | 'fedora' | 'opensuse' | 'ubuntu';

const osCommands = {
  arch: {
    name: "Arch Linux",
    icon: IconArch,
    slogan: "A simple, lightweight distribution.",
    update: "sudo pacman -Syu",
    install: "sudo pacman -S hyprland waybar wofi kitty swaybg swayidle swaylock copyq mako grim slurp wl-clipboard polkit-kde-agent",
    notes: "Arch Linux provides Hyprland natively in the 'extra' repository. It is the most supported and recommended distribution for this environment."
  },
  fedora: {
    name: "Fedora",
    icon: IconFedora,
    slogan: "Innovative, free, and open source.",
    update: "sudo dnf upgrade --refresh",
    install: "sudo dnf install hyprland waybar wofi kitty swaybg swayidle swaylock copyq mako grim slurp wl-clipboard polkit-gnome",
    notes: "Fedora has excellent up-to-date packages. Hyprland is available directly in the official Fedora repositories from Fedora 39 onwards."
  },
  opensuse: {
    name: "openSUSE",
    icon: IconSuse,
    slogan: "The makers' choice for sysadmins.",
    update: "sudo zypper dup",
    install: "sudo zypper install hyprland waybar wofi kitty swaybg swayidle swaylock copyq mako grim slurp wl-clipboard",
    notes: "openSUSE Tumbleweed (Rolling) is highly recommended. Leap (Static) may require third-party OBS repositories for the latest versions."
  },
  ubuntu: {
    name: "Ubuntu",
    icon: IconUbuntu,
    slogan: "Linux for human beings.",
    update: "sudo apt update && sudo apt upgrade",
    install: "# Warning: Hyprland is NOT in official Ubuntu LTS repos.\n# You must compile from source or use a third-party PPA.\nsudo add-apt-repository ppa:hyprland-community/ppa\nsudo apt update\nsudo apt install hyprland kitty waybar wofi swaybg swayidle swaylock copyq mako-notifier grim slurp wl-clipboard",
    notes: "Ubuntu and Debian Stable are heavily discouraged by the Hyprland team due to vastly outdated dependencies (like libc and wlroots)."
  }
};

export default function DotFiles() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeOs, setActiveOs] = useState<OsType>('arch');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-switching logic
  useEffect(() => {
    if (!isAutoPlaying) return;

    const osList = Object.keys(osCommands) as OsType[];
    const timer = setInterval(() => {
      setActiveOs((currentOs) => {
        const currentIndex = osList.indexOf(currentOs);
        const nextIndex = (currentIndex + 1) % osList.length;
        return osList[nextIndex];
      });
    }, 2500); 

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleOsClick = (os: OsType) => {
    setActiveOs(os);
    setIsAutoPlaying(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const ActiveIcon = osCommands[activeOs].icon;

  return (
    <div className="min-h-screen w-full bg-[#07070a] text-zinc-300 font-sans selection:bg-fuchsia-500/30 font-inter">
      {/* Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
        <span className="font-bold tracking-tight text-xl text-white">
          dot<span className="text-[#d87aff]">Files</span>
        </span>
        <div className="flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#prep" className="hover:text-white transition-colors hidden md:inline">System Prep</a>
          <a href="#support" className="hover:text-white transition-colors hidden md:inline">OS Support</a>
          <a href="#install" className="hover:text-white transition-colors hidden md:inline">Installation</a>
          <a href="#docs" className="hover:text-white transition-colors hidden md:inline">Documentation</a>
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 hover:bg-white/[0.05] hover:text-white transition-all"
          >
            <IconGithub className="h-4 w-4" /> GitHub
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="mx-auto flex max-w-5xl flex-col items-center px-6 pt-24 pb-32 text-center border-b border-white/5">
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8">
          dot<span className="text-[#d87aff]">Files</span>
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-zinc-400 leading-relaxed mb-12">
          The ultimate, modular Linux environment setup. Begin by cloning the repository to your local machine.
        </p>

        <div className="flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border border-[#d87aff]/30 bg-[#d87aff]/5 p-2 pl-8 shadow-[0_0_80px_-20px_rgba(216,122,255,0.2)] backdrop-blur-xl transition-all hover:border-[#d87aff]/50">
          <div className="flex items-center gap-4 overflow-hidden text-base md:text-lg font-mono">
            <span className="text-[#d87aff] font-bold">$</span>
            <span className="truncate text-white">{cloneCommand}</span>
          </div>
          <button
            onClick={() => handleCopy(cloneCommand)}
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#d87aff] px-8 py-4 text-base font-bold text-black transition-all hover:scale-105 active:scale-95 hover:bg-[#e085ff] shadow-lg"
          >
            {copied === cloneCommand ? <IconCheck className="h-5 w-5" /> : <IconCopy className="h-5 w-5" />}
            {copied === cloneCommand ? "Copied" : "Copy"}
          </button>
        </div>
      </header>

      {/* Section 1: System Prep & Updates */}
      <section id="prep" className="mx-auto max-w-6xl px-6 py-24 border-b border-white/5">
        <div className="mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d87aff] mb-3">Phase 01</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">System Preparation</h2>
          <p className="text-zinc-400 max-w-2xl text-lg mb-8">Before attempting to install a Wayland compositor, your system must be fully updated. Select your package manager below.</p>
          
          {/* Sleek Dynamic OS Indicator */}
          <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/[0.02] border border-white/10 w-full max-w-md backdrop-blur-sm transition-all duration-500">
            <div className="h-14 w-14 rounded-xl bg-[#d87aff]/10 border border-[#d87aff]/30 flex items-center justify-center text-[#d87aff] shadow-[0_0_20px_-5px_rgba(216,122,255,0.4)] relative overflow-hidden">
               <ActiveIcon className="h-7 w-7 relative z-10 transition-transform duration-300" />
               <div className="absolute inset-0 bg-gradient-to-tr from-[#d87aff]/20 to-transparent opacity-50"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-white tracking-tight">{osCommands[activeOs].name}</h3>
              <p className="text-zinc-500 text-sm truncate">{osCommands[activeOs].slogan}</p>
            </div>
            {isAutoPlaying && (
              <div className="px-2 py-1 rounded bg-white/5 text-[10px] font-mono text-zinc-500 uppercase tracking-widest animate-pulse">
                Auto
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0c0c11] shadow-2xl overflow-hidden font-mono text-sm mx-auto group flex flex-col md:flex-row">
          
          {/* OS Selector Sidebar */}
          <div className="w-full md:w-64 bg-black/40 border-b md:border-b-0 md:border-r border-white/5 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto">
            {(Object.keys(osCommands) as OsType[]).map((os) => {
              const Icon = osCommands[os].icon;
              return (
                <button
                  key={os}
                  onClick={() => handleOsClick(os)}
                  className={`text-left px-4 py-3 rounded-lg text-sm font-sans font-medium transition-all flex items-center gap-3 ${
                    activeOs === os 
                      ? "bg-[#d87aff]/10 text-[#d87aff] border border-[#d87aff]/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" 
                      : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300 border border-transparent"
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${activeOs === os ? "opacity-100" : "opacity-50"}`} />
                  <span className="flex-1 capitalize">{osCommands[os].name}</span>
                  {activeOs === os && <IconArrowRight className="h-4 w-4 opacity-50 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Terminal Content */}
          <div className="flex-1 flex flex-col relative">
            <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-6 py-4">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
                <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <span className="text-xs text-zinc-500 font-sans">bash — update</span>
              <button
                onClick={() => handleCopy(osCommands[activeOs].update)}
                className="text-zinc-500 hover:text-white transition-colors"
                title="Copy update command"
              >
                {copied === osCommands[activeOs].update ? <IconCheck className="h-4 w-4 text-green-400" /> : <IconCopy className="h-4 w-4" />}
              </button>
            </div>
            
            <div className="p-6 md:p-8 bg-black/20 flex-1 relative overflow-hidden">
              <ActiveIcon className="absolute -bottom-10 -right-10 h-64 w-64 text-white/[0.02] pointer-events-none" />
              
              <div className="relative z-10">
                <div className="text-zinc-500 mb-2 select-none">1. Synchronize package databases and update system</div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-[#d87aff] select-none font-bold">$</span>
                  <span className="text-white">{osCommands[activeOs].update}</span>
                </div>

                <div className="mt-8 p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 font-sans">
                  <div className="flex items-start gap-3">
                    <IconServer className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-blue-100 mb-1 capitalize">{osCommands[activeOs].name} Notes</h4>
                      <p className="text-sm text-blue-200/70 leading-relaxed">
                        {osCommands[activeOs].notes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Distro Compatibility */}
      <section id="support" className="mx-auto max-w-6xl px-6 py-24 border-b border-white/5">
        <div className="mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d87aff] mb-3">Phase 02</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Distribution Support Matrix</h2>
          <p className="text-zinc-400 max-w-2xl text-lg">Wayland and Hyprland require bleeding-edge graphics drivers, kernel modules, and compositor libraries. Not all distributions are created equal for this setup.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Tier 1 */}
          <div className="rounded-3xl border border-green-500/20 bg-green-500/[0.02] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="inline-flex items-center justify-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-400">
                Tier 1 - Native
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Rolling Release</h3>
            <p className="text-zinc-400 text-sm mb-6 border-b border-white/5 pb-6">Best experience. Packages are fresh and directly available in official repos.</p>
            <ul className="space-y-3 font-medium text-sm text-zinc-300">
              <li className="flex items-center gap-3"><IconCheck className="h-4 w-4 text-green-400" /> Arch Linux (Recommended)</li>
              <li className="flex items-center gap-3"><IconCheck className="h-4 w-4 text-green-400" /> Fedora (39+)</li>
              <li className="flex items-center gap-3"><IconCheck className="h-4 w-4 text-green-400" /> openSUSE Tumbleweed</li>
              <li className="flex items-center gap-3"><IconCheck className="h-4 w-4 text-green-400" /> NixOS (Flakes supported)</li>
            </ul>
          </div>

          {/* Tier 2 */}
          <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/[0.02] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="inline-flex items-center justify-center rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-xs font-medium text-yellow-400">
                Tier 2 - Workable
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Advanced Linux</h3>
            <p className="text-zinc-400 text-sm mb-6 border-b border-white/5 pb-6">Works flawlessly, but requires manual compilation or heavy system configuration.</p>
            <ul className="space-y-3 font-medium text-sm text-zinc-300">
              <li className="flex items-center gap-3"><IconCheck className="h-4 w-4 text-yellow-400" /> Void Linux</li>
              <li className="flex items-center gap-3"><IconCheck className="h-4 w-4 text-yellow-400" /> Gentoo</li>
              <li className="flex items-center gap-3"><IconCheck className="h-4 w-4 text-yellow-400" /> Alpine Linux</li>
              <li className="flex items-center gap-3"><IconCheck className="h-4 w-4 text-yellow-400" /> Pop!_OS (via PPA)</li>
            </ul>
          </div>

          {/* Tier 3 */}
          <div className="rounded-3xl border border-red-500/20 bg-red-500/[0.02] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="inline-flex items-center justify-center rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-400">
                Tier 3 - Avoid
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Static / LTS</h3>
            <p className="text-zinc-400 text-sm mb-6 border-b border-white/5 pb-6">Severely outdated dependencies. Installation requires overriding core system libraries.</p>
            <ul className="space-y-3 font-medium text-sm text-zinc-300">
              <li className="flex items-center gap-3"><IconShieldAlert className="h-4 w-4 text-red-400" /> Debian Stable</li>
              <li className="flex items-center gap-3"><IconShieldAlert className="h-4 w-4 text-red-400" /> Ubuntu LTS</li>
              <li className="flex items-center gap-3"><IconShieldAlert className="h-4 w-4 text-red-400" /> Linux Mint</li>
              <li className="flex items-center gap-3"><IconShieldAlert className="h-4 w-4 text-red-400" /> CentOS / RHEL</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: Detailed Installation Guide */}
      <section id="install" className="mx-auto max-w-6xl px-6 py-24 border-b border-white/5">
        <div className="mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d87aff] mb-3">Phase 03</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Core Installation</h2>
          <p className="text-zinc-400 max-w-2xl text-lg mb-8">Follow these steps carefully. The package string contains necessary tools like CopyQ for clipboards and Swayidle for power management.</p>

          {/* Sleek Dynamic OS Indicator (Duplicated for context) */}
          <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/[0.02] border border-white/10 w-full max-w-md backdrop-blur-sm transition-all duration-500">
            <div className="h-14 w-14 rounded-xl bg-[#d87aff]/10 border border-[#d87aff]/30 flex items-center justify-center text-[#d87aff] shadow-[0_0_20px_-5px_rgba(216,122,255,0.4)] relative overflow-hidden">
               <ActiveIcon className="h-7 w-7 relative z-10 transition-transform duration-300" />
               <div className="absolute inset-0 bg-gradient-to-tr from-[#d87aff]/20 to-transparent opacity-50"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-white tracking-tight">{osCommands[activeOs].name}</h3>
              <p className="text-zinc-500 text-sm truncate">{osCommands[activeOs].slogan}</p>
            </div>
            {isAutoPlaying && (
              <div className="px-2 py-1 rounded bg-white/5 text-[10px] font-mono text-zinc-500 uppercase tracking-widest animate-pulse">
                Auto
              </div>
            )}
          </div>
        </div>

        <div className="space-y-12">
          {/* Step 1: Packages (Now with dynamic sidebar terminal) */}
          <div className="grid lg:grid-cols-[1fr_2.5fr] gap-8">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d87aff]/10 text-xl font-bold text-[#d87aff] mb-6 border border-[#d87aff]/20">1</div>
              <h3 className="text-2xl font-bold text-white mb-3">Install Base Packages</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Beyond the compositor (Hyprland), bar, and terminal, we are pulling in critical utilities. <code className="bg-white/10 px-1 rounded text-white">swaylock</code> handles security, while <code className="bg-white/10 px-1 rounded text-white">copyq</code> + <code className="bg-white/10 px-1 rounded text-white">wl-clipboard</code> handle memory buffers on Wayland.
              </p>
            </div>
            
            {/* Split Terminal Layout */}
            <div className="rounded-2xl border border-white/10 bg-[#0c0c11] shadow-2xl overflow-hidden font-mono text-sm group flex flex-col md:flex-row">
              {/* OS Selector Sidebar */}
              <div className="w-full md:w-56 bg-black/40 border-b md:border-b-0 md:border-r border-white/5 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto shrink-0">
                {(Object.keys(osCommands) as OsType[]).map((os) => {
                  const Icon = osCommands[os].icon;
                  return (
                    <button
                      key={os}
                      onClick={() => handleOsClick(os)}
                      className={`text-left px-3 py-2.5 rounded-lg text-xs font-sans font-medium transition-all flex items-center gap-3 ${
                        activeOs === os 
                          ? "bg-[#d87aff]/10 text-[#d87aff] border border-[#d87aff]/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" 
                          : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300 border border-transparent"
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${activeOs === os ? "opacity-100" : "opacity-50"}`} />
                      <span className="flex-1 capitalize truncate">{osCommands[os].name}</span>
                      {activeOs === os && <IconArrowRight className="h-3 w-3 opacity-50 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Terminal Content */}
              <div className="flex-1 flex flex-col relative min-w-0">
                <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-3">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
                  </div>
                  <span className="text-[11px] text-zinc-500 font-sans tracking-wide">bash — install</span>
                  <button
                    onClick={() => handleCopy(osCommands[activeOs].install)}
                    className="text-zinc-500 hover:text-white transition-colors"
                    title="Copy install command"
                  >
                    {copied === osCommands[activeOs].install ? <IconCheck className="h-4 w-4 text-green-400" /> : <IconCopy className="h-4 w-4" />}
                  </button>
                </div>
                
                <div className="p-5 md:p-6 bg-black/20 flex-1 relative overflow-hidden">
                  <ActiveIcon className="absolute -bottom-10 -right-10 h-64 w-64 text-white/[0.02] pointer-events-none" />
                  <div className="relative z-10">
                    <div className="text-zinc-500 mb-4 select-none"># Install required packages for {osCommands[activeOs].name}</div>
                    <div className="text-white whitespace-pre-wrap leading-relaxed break-all">
                      <span className="text-[#d87aff] select-none font-bold mr-3">~ $</span>
                      {osCommands[activeOs].install}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Fonts */}
          <div className="grid lg:grid-cols-[1fr_2.5fr] gap-8">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d87aff]/10 text-xl font-bold text-[#d87aff] mb-6 border border-[#d87aff]/20">2</div>
              <h3 className="text-2xl font-bold text-white mb-3">Install Nerd Fonts</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Waybar and Kitty rely heavily on glyphs and icons. Without a patched Nerd Font, your bar will display missing character boxes (tofu).
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#0c0c11] shadow-2xl p-6 flex flex-col font-mono text-sm relative">
              <div className="text-zinc-500 mb-2 select-none"># Download JetBrainsMono Nerd Font</div>
              <div className="text-white mb-6">
                wget https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
              </div>
              <div className="text-zinc-500 mb-2 select-none"># Extract to local fonts directory and refresh cache</div>
              <div className="text-white">
                unzip JetBrainsMono.zip -d ~/.local/share/fonts/<br/>
                fc-cache -fv
              </div>
            </div>
          </div>

          {/* Step 3: Symlinking configs */}
          <div className="grid lg:grid-cols-[1fr_2.5fr] gap-8">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d87aff]/10 text-xl font-bold text-[#d87aff] mb-6 border border-[#d87aff]/20">3</div>
              <h3 className="text-2xl font-bold text-white mb-3">Apply Configurations</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Move the files from the cloned repository into your <code className="bg-white/10 px-1 py-0.5 rounded text-zinc-300">~/.config</code> directory. Standard copy is safer for beginners, GNU Stow is better for developers.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#0c0c11] shadow-2xl p-6 flex flex-col font-mono text-sm relative">
              <div className="text-zinc-500 mb-2 select-none"># Option A: Standard Copy (Recommended for beginners)</div>
              <div className="text-white mb-6">
                cp -r dotfiles/.config/* ~/.config/
              </div>
              <div className="text-zinc-500 mb-2 select-none"># Option B: GNU Stow (Creates symlinks for easy git updates)</div>
              <div className="text-white">
                cd dotfiles<br/>
                stow .config
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Detailed Documentation & Configurations */}
      <section id="docs" className="mx-auto max-w-6xl px-6 py-24 border-b border-white/5">
        <div className="mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d87aff] mb-3">Phase 04</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Architecture & Modules</h2>
          <p className="text-zinc-400 max-w-2xl text-lg">Understanding how the files interact is critical for customizing your environment further. Below is a breakdown of the core configuration modules.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Hyprland Docs */}
          <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 flex flex-col">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">Hyprland Config</h3>
              <a href="https://wiki.hyprland.org/Configuring/Configuring-Hyprland/" target="_blank" rel="noreferrer" className="text-[#d87aff] hover:text-white transition-colors bg-[#d87aff]/10 p-2 rounded-full">
                <IconExternalLink className="h-5 w-5" />
              </a>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Located at <code className="text-[#d87aff] bg-[#d87aff]/10 px-1.5 py-0.5 rounded font-mono text-xs">~/.config/hypr/hyprland.conf</code>. This is the master configuration file for your compositor where window rules, autostart programs, and visual settings are defined.
            </p>
            <div className="bg-black/40 rounded-xl p-4 font-mono text-xs text-zinc-300 border border-white/5 flex-1">
              <span className="text-zinc-500"># Monitor setup syntax:</span><br/>
              <span className="text-blue-400">monitor</span>=DP-1,2560x1440@144,0x0,1<br/><br/>
              <span className="text-zinc-500"># Executing core apps on start:</span><br/>
              <span className="text-green-400">exec-once</span> = waybar & swaybg -i ~/wallpaper.jpg<br/><br/>
              <span className="text-zinc-500"># Setting border aesthetics:</span><br/>
              <span className="text-purple-400">general</span> {'{'}<br/>
              &nbsp;&nbsp;gaps_in = 5<br/>
              &nbsp;&nbsp;col.active_border = rgba(d87affee)<br/>
              {'}'}
            </div>
          </div>

          {/* Waybar Docs */}
          <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 flex flex-col">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">Waybar Styling</h3>
              <a href="https://github.com/Alexays/Waybar/wiki" target="_blank" rel="noreferrer" className="text-[#d87aff] hover:text-white transition-colors bg-[#d87aff]/10 p-2 rounded-full">
                <IconExternalLink className="h-5 w-5" />
              </a>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Located at <code className="text-[#d87aff] bg-[#d87aff]/10 px-1.5 py-0.5 rounded font-mono text-xs">~/.config/waybar/</code>. Contains two files: <code className="text-white">config.jsonc</code> for logical modules (clock, network, workspaces) and <code className="text-white">style.css</code> for UI theming.
            </p>
            <div className="bg-black/40 rounded-xl p-4 font-mono text-xs text-zinc-300 border border-white/5 flex-1">
              <span className="text-zinc-500">/* style.css example for floating bar */</span><br/>
              <span className="text-blue-400">window#waybar</span> {'{'}<br/>
              &nbsp;&nbsp;background-color: rgba(10, 10, 15, 0.9);<br/>
              &nbsp;&nbsp;border-radius: 12px;<br/>
              &nbsp;&nbsp;margin: 10px 10px 0px 10px;<br/>
              &nbsp;&nbsp;color: #ffffff;<br/>
              {'}'}
            </div>
          </div>
          
          {/* Clipboard Management Docs (CopyQ & wl-clipboard) */}
          <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 flex flex-col">
            <div className="mb-6 flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><IconClipboard className="h-6 w-6" /></div>
              <h3 className="text-2xl font-bold text-white">Clipboard (CopyQ)</h3>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Wayland handles clipboard buffers strictly. To maintain clipboard history and support image copying, we utilize <code className="text-white">wl-clipboard</code> as the backend and <code className="text-white">CopyQ</code> as the frontend manager.
            </p>
            <ul className="space-y-3 text-sm text-zinc-300 mb-4 bg-black/40 p-4 rounded-xl border border-white/5 flex-1">
              <li><strong className="text-[#d87aff] font-mono">Daemon Start:</strong> We launch the daemon silently in hyprland via <code className="font-mono text-xs">exec-once = copyq --start-server</code>.</li>
              <li><strong className="text-[#d87aff] font-mono">Keybind:</strong> Pressing <code className="font-mono text-xs">SUPER + V</code> triggers <code className="font-mono text-xs">copyq toggle</code>, bringing up a floating history window.</li>
              <li><strong className="text-[#d87aff] font-mono">Features:</strong> Stores images, text, and rich formats across reboots.</li>
            </ul>
          </div>

          {/* Session Security (Swayidle & Swaylock) */}
          <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 flex flex-col">
            <div className="mb-6 flex items-center gap-3">
              <div className="p-2 bg-red-500/10 text-red-400 rounded-lg"><IconLock className="h-6 w-6" /></div>
              <h3 className="text-2xl font-bold text-white">Session Security</h3>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Unlike X11 desktop environments, Wayland tiling window managers require manual configuration for power management and secure screen locking.
            </p>
            <ul className="space-y-3 text-sm text-zinc-300 mb-4 bg-black/40 p-4 rounded-xl border border-white/5 flex-1">
              <li>
                <strong className="text-white font-mono">Swayidle:</strong> The idle management daemon. It listens for inactivity (e.g., 300 seconds) and triggers actions like turning off the monitor via <code className="font-mono text-xs">dpms off</code>.
              </li>
              <li>
                <strong className="text-white font-mono">Swaylock:</strong> A secure screen locker customized for Wayland. In our dotfiles, it is configured in <code className="font-mono text-xs">~/.config/swaylock/config</code> to blur the desktop and present a sleek, colorful ring indicator for password entry.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5: Keybindings & Troubleshooting */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d87aff] mb-3">Phase 05</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Operations & Troubleshooting</h2>
          <p className="text-zinc-400 max-w-2xl text-lg">Once you launch Hyprland from your TTY, use these predefined keybindings to navigate. If things break, check the troubleshooting table.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Keybinds Table */}
          <div className="bg-[#0c0c11] rounded-2xl border border-white/10 overflow-hidden">
            <div className="border-b border-white/10 bg-white/[0.02] p-4">
              <h3 className="text-lg font-bold text-white">Essential Keybindings</h3>
            </div>
            <div className="p-4">
              <table className="w-full text-sm text-left">
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-2"><kbd className="bg-white/10 px-2 py-1 rounded text-zinc-300 border border-white/10 font-mono text-xs">SUPER + T</kbd></td>
                    <td className="py-3 px-2 text-zinc-400">Launch Kitty Terminal</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-2"><kbd className="bg-white/10 px-2 py-1 rounded text-zinc-300 border border-white/10 font-mono text-xs">SUPER + SPACE</kbd></td>
                    <td className="py-3 px-2 text-zinc-400">Open Wofi App Launcher</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-2"><kbd className="bg-white/10 px-2 py-1 rounded text-zinc-300 border border-white/10 font-mono text-xs">SUPER + V</kbd></td>
                    <td className="py-3 px-2 text-zinc-400">Open CopyQ Clipboard</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-2"><kbd className="bg-white/10 px-2 py-1 rounded text-zinc-300 border border-white/10 font-mono text-xs">SUPER + Q</kbd></td>
                    <td className="py-3 px-2 text-zinc-400">Close Active Window</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-2"><kbd className="bg-white/10 px-2 py-1 rounded text-zinc-300 border border-white/10 font-mono text-xs">SUPER + F</kbd></td>
                    <td className="py-3 px-2 text-zinc-400">Toggle Float Mode</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2"><kbd className="bg-white/10 px-2 py-1 rounded text-red-400 border border-red-500/20 bg-red-500/10 font-mono text-xs">SUPER + SHIFT + E</kbd></td>
                    <td className="py-3 px-2 text-zinc-400">Exit Hyprland Session</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Troubleshooting Cards */}
          <div className="space-y-4">
            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-6 flex gap-4">
              <IconTriangleAlert className="h-6 w-6 text-yellow-500 shrink-0" />
              <div>
                <h4 className="text-white font-bold mb-1">Nvidia Users: Black Screen</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">Ensure you have exported the necessary hardware cursors and GBM backend variables in your bash profile. E.g. <code className="text-yellow-400 font-mono text-xs">WLR_NO_HARDWARE_CURSORS=1</code></p>
              </div>
            </div>
            
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 flex gap-4">
              <IconShieldAlert className="h-6 w-6 text-red-500 shrink-0" />
              <div>
                <h4 className="text-white font-bold mb-1">Polkit Authentication Fails</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">If apps requiring root (like GParted) fail to launch, ensure your polkit agent is starting in your `hyprland.conf` via <code className="text-red-400 font-mono text-xs">exec-once = /usr/libexec/polkit-gnome-authentication-agent-1</code>.</p>
              </div>
            </div>
            
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-6 flex gap-4">
              <IconTerminal className="h-6 w-6 text-blue-500 shrink-0" />
              <div>
                <h4 className="text-white font-bold mb-1">Waybar Not Starting</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">Run <code className="text-blue-400 font-mono text-xs">waybar</code> directly in the terminal to read the error logs. It usually means a module font is missing or a custom script failed to execute.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-12 text-center flex flex-col items-center justify-center gap-4">
        <span className="font-bold tracking-tight text-lg text-white">
          dot<span className="text-[#d87aff]">Files</span>
        </span>
        <p className="text-xs font-medium text-zinc-600 max-w-sm text-center leading-relaxed">
          Open source configuration files. Use responsibly. <br/>
          Built with Hyprland, Wayland, and React. — © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}