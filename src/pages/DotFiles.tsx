import { useState } from "react";

// --- NATIVE INLINE ICONS (Zero Dependencies) ---
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
const IconArrowRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
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

const repoUrl = "https://github.com/kulj33t/dotfiles";
const installCommand = `git clone ${repoUrl} && cd dotfiles && chmod +x install.sh && ./install.sh`;

const steps = [
  {
    n: "01",
    icon: IconDownload,
    title: "Prerequisites",
    desc: "A fresh Fedora Asahi Remix install on Apple Silicon (or any modern Linux). You need git, curl, and stow. Ensure you have sudo privileges.",
    code: "sudo dnf install -y git curl stow",
  },
  {
    n: "02",
    icon: IconTerminal,
    title: "Clone the repo",
    desc: "Pull the dotfiles from GitHub. This gives you the full install script plus every config in one place.",
    code: `git clone ${repoUrl}`,
  },
  {
    n: "03",
    icon: IconFolder,
    title: "Enter the directory",
    desc: "Change into the cloned dotfiles folder so the installer can find the configs it needs to symlink.",
    code: "cd dotfiles",
  },
  {
    n: "04",
    icon: IconTerminal,
    title: "Make it executable",
    desc: "Because the script is run directly, you must give it execute permission first.",
    code: "chmod +x install.sh",
  },
  {
    n: "05",
    icon: IconRocket,
    title: "Run the installer",
    desc: "Launch the script. It backs up existing configs and walks you through setting up the environment.",
    code: "./install.sh",
  },
];

const gotchas = [
  {
    icon: IconShieldAlert,
    title: "Do not run as root",
    body: "The script checks for root and exits if it sees EUID 0. Run it as a normal user and let it call sudo only for package installs.",
  },
  {
    icon: IconTriangleAlert,
    title: "Permission denied?",
    body: "If you see 'permission denied' when running ./install.sh, you skipped 'chmod +x install.sh'. Run that command first, then try again.",
  },
  {
    icon: IconTerminal,
    title: "Repo already exists",
    body: "If git clone fails because the folder exists, either remove it, rename it, or 'cd dotfiles && git pull' to update.",
  },
];

const features = [
  {
    title: "Fedora Asahi Remix",
    url: "https://asahilinux.org/fedora/",
    body: "Optimized for bare-metal performance on Apple Silicon (M1 MacBook Air). This entire setup wouldn't be possible without the incredible reverse-engineering work of the Asahi Linux project, bringing native, upstream Linux to ARM architecture.",
  },
  {
    title: "Wayland Architecture",
    url: "https://wayland.freedesktop.org/",
    body: "X11 is deprecated in favor of Wayland. It offers a much more secure architecture and provides direct rendering to the hardware, which means zero screen tearing and significantly reduced input lag.",
  },
  {
    title: "Hyprland Compositor",
    url: "https://hyprland.org/",
    body: "A dynamic tiling Wayland compositor that replaces traditional desktop environments. It prioritizes fluid animation and aesthetic customizability without sacrificing system performance.",
  },
  {
    title: "Kitty Terminal",
    url: "https://sw.kovidgoyal.net/kitty/",
    body: "A GPU-accelerated terminal emulator designed for power users. It handles large volumes of text rendering effortlessly—crucial for heavy C++ compilation output—and natively supports font ligatures.",
  },
  {
    title: "Waybar",
    url: "https://github.com/Alexays/Waybar",
    body: "A highly customizable Wayland bar for Sway and Wlroots based compositors. It handles our system status, workspace indicators, and tray icons with complete CSS styling control.",
  },
  {
    title: "Wofi",
    url: "https://hg.sr.ht/~scoopta/wofi",
    body: "A fast, highly customizable application launcher and menu program for wlroots-based Wayland compositors. It serves as the primary search and application runner for this configuration.",
  },
  {
    title: "SwayNC & Utilities",
    url: "https://github.com/ErikReider/SwayNotificationCenter",
    body: "Leveraging the Sway ecosystem for Wayland essentials: SwayNotificationCenter (SwayNC) provides beautiful, GTK-based notification popups, while Swaybg handles wallpapers and Swaylock secures the screen.",
  },
  {
    title: "PipeWire Audio",
    url: "https://pipewire.org/",
    body: "A modern multimedia server that vastly improves audio and video handling under Linux. It provides a low-latency, secure, and robust routing system for both PulseAudio and JACK applications.",
  },
  {
    title: "BlueZ (bluetoothctl)",
    url: "https://github.com/bluez/",
    body: "The official Linux Bluetooth protocol stack. We utilize bluetoothctl as a lightweight, reliable command-line utility to pair and manage audio devices without relying on heavy GUI overhead.",
  },
];

export default function DotFiles() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#07070a] text-zinc-300 font-sans selection:bg-fuchsia-500/30 font-inter">
      {/* Navigation */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
        <span className="font-bold tracking-tight text-xl text-white">
          dot<span className="text-[#d87aff]">Files</span>
        </span>
        <div className="flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#install" className="hover:text-white transition-colors hidden sm:inline">Install</a>
          <a href="#stack" className="hover:text-white transition-colors hidden sm:inline">Stack</a>
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
      <header className="mx-auto flex max-w-4xl flex-col items-center px-6 pt-16 pb-24 text-center">
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
          dot<span className="text-[#d87aff]">Files</span>
        </h1>
        
        <p className="max-w-2xl text-base md:text-lg text-zinc-400 leading-relaxed">
          Universal dotfiles & a custom Linux configuration — a step-by-step guide to getting a Hyprland, Wayland & Kitty environment running on Fedora Asahi.
        </p>

        {/* Hero Install Command Pill */}
        <div className="mt-12 flex w-full max-w-2xl items-center justify-between gap-3 rounded-full border border-white/10 bg-white/[0.03] p-2 pl-6 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 overflow-hidden text-sm md:text-base font-mono">
            <span className="text-zinc-500 font-bold">$</span>
            <span className="truncate text-zinc-200">{installCommand}</span>
          </div>
          <button
            onClick={() => handleCopy(installCommand)}
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#d87aff] px-5 py-2.5 text-sm font-semibold text-black transition-transform active:scale-95 hover:bg-[#e085ff]"
          >
            {copied === installCommand ? <IconCheck className="h-4 w-4" /> : <IconCopy className="h-4 w-4" />}
            {copied === installCommand ? "Copied" : "Copy"}
          </button>
        </div>
      </header>

      {/* Guide Section */}
      <section id="install" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3">Guide</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Install in five steps</h2>
          </div>
          <IconArrowRight className="hidden md:block h-6 w-6 text-zinc-500" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="group relative rounded-3xl border border-white/5 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04] overflow-hidden"
            >
              {/* Subtle hover gradient background */}
              {i === 2 && (
                 <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#d87aff]/10 blur-[80px]" />
              )}
              
              <div className="relative z-10 flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d87aff] text-black">
                  <s.icon className="h-6 w-6" />
                </div>
                <div className="w-full min-w-0">
                  <div className="mb-2 text-[11px] font-bold font-mono tracking-wider text-[#d87aff]">
                    STEP {s.n}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">{s.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-zinc-400">{s.desc}</p>
                  
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/40 p-3">
                    <code className="truncate font-mono text-xs text-zinc-300">{s.code}</code>
                    <button
                      onClick={() => handleCopy(s.code)}
                      className="shrink-0 p-1.5 text-zinc-500 hover:text-white transition-colors"
                      title="Copy"
                    >
                      {copied === s.code ? <IconCheck className="h-4 w-4 text-green-400" /> : <IconCopy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Troubleshooting Section */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3">Troubleshooting</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Common gotchas</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {gotchas.map((g) => (
            <div
              key={g.title}
              className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 transition-colors hover:bg-white/[0.04]"
            >
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#d87aff]/20 text-[#d87aff]">
                <g.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-white">{g.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{g.body}</p>
            </div>
          ))}
        </div>
      </section>

     {/* Configuration Terminal Section */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3">Configuration</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Make it your own</h2>
        </div>
        
        <div className="rounded-2xl border border-white/10 bg-[#0c0c11] shadow-2xl overflow-hidden font-mono text-sm mx-auto">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
              <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <span className="ml-4 text-xs text-zinc-500 font-sans flex-1 text-center pr-12">hyprland.conf — nvim</span>
          </div>
          
          {/* Terminal Body */}
          <div className="p-6 md:p-8 text-zinc-300 leading-relaxed font-sans">
            <p className="text-zinc-400 mb-6 text-base">
              The brain of your new setup is the <code className="text-[#d87aff] bg-[#d87aff]/10 px-1.5 py-0.5 rounded font-mono text-sm">hyprland.conf</code> file. This is where you define your monitor resolutions, keybindings, startup apps, and visual preferences like gaps, blurs, and borders.
            </p>
            
            <div className="flex flex-col gap-2 font-mono text-sm bg-black/40 p-5 rounded-xl border border-white/5">
              <div className="text-zinc-500"># Open the configuration file in Neovim</div>
              <div className="flex items-center gap-3">
                <span className="text-[#d87aff] select-none">~ $</span>
                <span className="text-white">nvim ~/.config/hypr/hyprland.conf</span>
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-zinc-500 border-t border-white/5 pt-6">
              <span className="flex items-center gap-2">
                <kbd className="bg-white/10 px-2 py-1 rounded text-zinc-300 border border-white/10 font-mono">SUPER + T</kbd> to launch Kitty
              </span>
              <span className="flex items-center gap-2">
                <kbd className="bg-white/10 px-2 py-1 rounded text-zinc-300 border border-white/10 font-mono">SUPER + SPACE</kbd> to open Wofi
              </span>
              <span className="flex items-center gap-2">
                <kbd className="bg-white/10 px-2 py-1 rounded text-zinc-300 border border-white/10 font-mono">SUPER + Q</kbd> to close window
              </span>
              <span className="flex items-center gap-2">
                <kbd className="bg-white/10 px-2 py-1 rounded text-zinc-300 border border-white/10 font-mono">SUPER + F</kbd> to float window
              </span>
              <span className="flex items-center gap-2">
                <kbd className="bg-white/10 px-2 py-1 rounded text-zinc-300 border border-white/10 font-mono">SUPER + CTRL + SHIFT + Q</kbd> to exit Hyprland
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stack Section */}
      <section id="stack" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3">The Stack</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Everything that makes it tick</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col justify-between rounded-3xl border border-white/5 bg-white/[0.02] p-8 transition-colors hover:bg-white/[0.04]"
            >
              <div>
                <h3 className="mb-4 text-base font-bold uppercase tracking-widest text-[#d87aff]">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">{f.body}</p>
              </div>
              
              <a 
                href={f.url}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-[#d87aff] transition-colors"
              >
                Official Site <IconExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 text-center text-xs font-medium text-zinc-600">
        Built with Hyprland · Wayland · Kitty — © {new Date().getFullYear()} dotFiles
      </footer>
    </div>
  );
}