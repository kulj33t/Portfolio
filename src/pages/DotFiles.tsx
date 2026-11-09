import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

// --- SVG Icons ---
const IconCheck = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconCopy = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);
const IconTerminal = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" x2="20" y1="19" y2="19" />
  </svg>
);
const IconGithub = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const IconShieldAlert = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.5 0 4.7 1.1 7 2a1 1 0 0 1 1 1Z" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);
const IconTriangleAlert = ({
  className = "h-4 w-4",
}: {
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);
const IconExternalLink = ({
  className = "h-4 w-4",
}: {
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);
const IconServer = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
    <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
    <line x1="6" x2="6.01" y1="6" y2="6" />
    <line x1="6" x2="6.01" y1="18" y2="18" />
  </svg>
);
const IconArrowRight = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
const IconArrowLeft = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </svg>
);
const IconClipboard = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M9 14h6" />
    <path d="M9 10h6" />
  </svg>
);
const IconLock = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const IconBookOpen = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);
const IconPackage = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" x2="12" y1="22.08" y2="12" />
  </svg>
);
const IconSparkles = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);
const IconSearch = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const IconDownload = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);
const IconFolder = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </svg>
);
const IconFileCode = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="m10 13-2 2 2 2" />
    <path d="m14 17 2-2-2-2" />
  </svg>
);
const IconKeyboard = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="M6 8h.01" />
    <path d="M10 8h.01" />
    <path d="M14 8h.01" />
    <path d="M18 8h.01" />
    <path d="M6 12h.01" />
    <path d="M10 12h.01" />
    <path d="M14 12h.01" />
    <path d="M18 12h.01" />
    <path d="M7 16h10" />
  </svg>
);
const IconCpu = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="16" height="16" x="4" y="4" rx="2" />
    <rect width="6" height="6" x="9" y="9" rx="1" />
    <path d="M15 2v2" />
    <path d="M15 20v2" />
    <path d="M2 15h2" />
    <path d="M2 9h2" />
    <path d="M20 15h2" />
    <path d="M20 9h2" />
    <path d="M9 2v2" />
    <path d="M9 20v2" />
  </svg>
);
const IconArrowUp = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
);
const IconPause = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="4" height="16" x="6" y="4" />
    <rect width="4" height="16" x="14" y="4" />
  </svg>
);
const IconPlay = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

// --- Distro Logos ---
const IconArch = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2L2 22h4.5l5.5-10.5L17.5 22H22L12 2z" />
    <path d="M7 16.5c2-1 8-1 10 0" />
  </svg>
);
const IconFedora = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M14.5 17.5v-2h-3v-2h3v-4c0-1.5-.5-3-3-3H9v2h2.5c.5 0 .5.5.5.5v4.5h-3v2h3v2z" />
  </svg>
);
const IconUbuntu = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="3" r="2.5" />
    <circle cx="4.5" cy="17.5" r="2.5" />
    <circle cx="19.5" cy="17.5" r="2.5" />
  </svg>
);
const IconSuse = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="9" cy="10" r="1.5" />
    <circle cx="15" cy="10" r="1.5" />
    <path d="M9 15c1 1 5 1 6 0" />
  </svg>
);

// Constants
const REPO_OWNER = "kulj33t";
const REPO_NAME = "dotfiles";
const REPO_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}`;
const PRIMARY_CLONE_COMMAND = `git clone https://github.com/kulj33t/dotfiles && cd dotfiles`;
const SSH_CLONE_COMMAND = `git clone git@github.com:kulj33t/dotfiles.git && cd dotfiles`;
const GH_CLI_CLONE_COMMAND = `gh repo clone kulj33t/dotfiles && cd dotfiles`;

type OsType = "arch" | "fedora" | "opensuse" | "ubuntu";

const osCommands: Record<
  OsType,
  {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    slogan: string;
    update: string;
    install: string;
    notes: string;
    badge: string;
    tier: string;
  }
> = {
  arch: {
    name: "Arch Linux",
    icon: IconArch,
    slogan:
      "A simple, lightweight distribution with rolling bleeding-edge packages.",
    update: "sudo pacman -Syu",
    install:
      "sudo pacman -S hyprland waybar wofi kitty swaybg swayidle swaylock copyq mako grim slurp wl-clipboard polkit-kde-agent ttf-jetbrains-mono-nerd stow fastfetch",
    notes:
      "Arch Linux provides Hyprland natively in the official 'extra' repository. It delivers the most seamless, turnkey experience with zero legacy library conflicts.",
    badge: "Official & Recommended",
    tier: "Tier 1 - Native",
  },
  fedora: {
    name: "Fedora",
    icon: IconFedora,
    slogan:
      "Innovative, modern, and open-source Linux with fresh upstream Wayland stack.",
    update: "sudo dnf upgrade --refresh",
    install:
      "sudo dnf install hyprland waybar wofi kitty swaybg swayidle swaylock copyq mako grim slurp wl-clipboard polkit-gnome stow",
    notes:
      "Fedora provides Hyprland natively in official repositories starting from Fedora 39. SELinux is supported and requires no special overrides.",
    badge: "Native Support (F39+)",
    tier: "Tier 1 - Native",
  },
  opensuse: {
    name: "openSUSE",
    icon: IconSuse,
    slogan:
      "The makers' choice for sysadmins and developers with rock-solid snapshots.",
    update: "sudo zypper dup",
    install:
      "sudo zypper install hyprland waybar wofi kitty swaybg swayidle swaylock copyq mako grim slurp wl-clipboard stow",
    notes:
      "openSUSE Tumbleweed (Rolling) is fully compatible. Leap users should consider Tumbleweed or add the openSUSE X11:Wayland OBS repository.",
    badge: "Tumbleweed Rolling",
    tier: "Tier 1 - Native",
  },
  ubuntu: {
    name: "Ubuntu / Debian",
    icon: IconUbuntu,
    slogan:
      "Static LTS distributions require third-party PPAs or building from source.",
    update: "sudo apt update && sudo apt upgrade",
    install: `# Hyprland is NOT packaged in official Ubuntu LTS repos.\n# Add community PPA or compile via CMake:\nsudo add-apt-repository ppa:hyprland-community/ppa\nsudo apt update\nsudo apt install hyprland kitty waybar wofi swaybg swayidle swaylock copyq mako-notifier grim slurp wl-clipboard stow`,
    notes:
      "Ubuntu LTS ships with older glibc and wlroots versions. The Hyprland maintainers officially recommend rolling distributions like Arch or Fedora.",
    badge: "PPA / Manual Source",
    tier: "Tier 3 - Static/LTS",
  },
};

// --- Package Data with Official Documentation & Working Links ---
interface PackageInfo {
  name: string;
  category:
    | "Compositor & Display"
    | "Terminal & Launcher"
    | "Daemons & System"
    | "Clipboard & Utilities"
    | "Fonts & Theming";
  description: string;
  role: string;
  installCommand: string;
  docsUrl: string;
  websiteUrl?: string;
  githubUrl: string;
  tags: string[];
}

const packagesList: PackageInfo[] = [
  {
    name: "Hyprland",
    category: "Compositor & Display",
    description:
      "Dynamic tiling Wayland compositor that doesn't sacrifice on looks. Features custom bezier animations, fluid window transitions, rounded corners, and native Gaussian blur.",
    role: "The core desktop compositor orchestrating window tiling, workspaces, gestures, and monitor displays.",
    installCommand: "sudo pacman -S hyprland",
    docsUrl: "https://wiki.hyprland.org/",
    websiteUrl: "https://hyprland.org/",
    githubUrl: "https://github.com/hyprwm/Hyprland",
    tags: ["Wayland", "Compositor", "C++", "Tiling", "Core"],
  },
  {
    name: "Waybar",
    category: "Compositor & Display",
    description:
      "Highly customizable GTK status bar designed specifically for Sway and wlroots/Wayland compositors. Configured via JSONC and fully styled with CSS.",
    role: "Top status bar showing active workspaces, running task status, volume slider, battery gauge, CPU/RAM meters, and clock.",
    installCommand: "sudo pacman -S waybar",
    docsUrl: "https://github.com/Alexays/Waybar/wiki",
    githubUrl: "https://github.com/Alexays/Waybar",
    tags: ["Status Bar", "GTK3", "CSS", "JSONC"],
  },
  {
    name: "Kitty",
    category: "Terminal & Launcher",
    description:
      "Blazingly fast, feature-rich, GPU-accelerated terminal emulator written in C and Python. Supports font ligatures, Kitty Graphics Protocol, and true-color rendering.",
    role: "Primary terminal emulator invoked via SUPER + T, configured with slight background opacity and Nerd Font glyphs.",
    installCommand: "sudo pacman -S kitty",
    docsUrl: "https://sw.kovidgoyal.net/kitty/",
    websiteUrl: "https://sw.kovidgoyal.net/kitty/",
    githubUrl: "https://github.com/kovidgoyal/kitty",
    tags: ["Terminal", "GPU-Accelerated", "OpenGL", "Kitty-Graphics"],
  },
  {
    name: "Wofi",
    category: "Terminal & Launcher",
    description:
      "A launcher and menu program for wlroots-based Wayland compositors, serving as a modern Wayland native replacement for dmenu and rofi.",
    role: "Application launcher and command menu triggered by SUPER + SPACE, styled with blurred background and glowing violet highlights.",
    installCommand: "sudo pacman -S wofi",
    docsUrl: "https://man.archlinux.org/man/wofi.1",
    websiteUrl: "https://hg.sr.ht/~scoopta/wofi",
    githubUrl: "https://github.com/rliang/wofi",
    tags: ["App Launcher", "Wayland Menu", "CSS Theming"],
  },
  {
    name: "CopyQ",
    category: "Clipboard & Utilities",
    description:
      "Advanced clipboard manager with searchable and editable history, support for rich text, image buffers, custom scripts, and global hotkeys.",
    role: "Saves clipboard history across reboots; opened floating via SUPER + V for instant pasting and snippet recall.",
    installCommand: "sudo pacman -S copyq",
    docsUrl: "https://copyq.readthedocs.io/en/latest/",
    websiteUrl: "https://hluk.github.io/CopyQ/",
    githubUrl: "https://github.com/hluk/CopyQ",
    tags: ["Clipboard", "History", "Qt", "Images & Text"],
  },
  {
    name: "wl-clipboard",
    category: "Clipboard & Utilities",
    description:
      "Command-line copy/paste utilities for Wayland (providing the wl-copy and wl-paste binaries) that implement clipboard protocol extensions.",
    role: "Powers clipboard pipe commands in the terminal and acts as the low-level Wayland clipboard protocol backend.",
    installCommand: "sudo pacman -S wl-clipboard",
    docsUrl: "https://man.archlinux.org/man/wl-clipboard.1",
    githubUrl: "https://github.com/bugaevc/wl-clipboard",
    tags: ["CLI", "Wayland Protocol", "wl-copy", "wl-paste"],
  },
  {
    name: "Mako",
    category: "Daemons & System",
    description:
      "Lightweight and fast notification daemon for Wayland compositors. Supports the Desktop Notifications specification with custom border radius and colors.",
    role: "Displays system and application notifications in the upper right corner with auto-dismiss timers and action click handlers.",
    installCommand: "sudo pacman -S mako",
    docsUrl: "https://man.archlinux.org/man/mako.1",
    githubUrl: "https://github.com/emersion/mako",
    tags: ["Notifications", "Wayland", "Lightweight", "D-Bus"],
  },
  {
    name: "Swaylock",
    category: "Daemons & System",
    description:
      "Screen locker utility for Wayland compositors. Validates credentials through PAM and locks the display with interactive unlock animations.",
    role: "Locks the workstation when idling or triggered via SUPER + L, blurring the background screen to prevent shoulder surfing.",
    installCommand: "sudo pacman -S swaylock",
    docsUrl: "https://man.archlinux.org/man/swaylock.1",
    githubUrl: "https://github.com/swaywm/swaylock",
    tags: ["Security", "Screen Locker", "PAM Auth"],
  },
  {
    name: "Swayidle",
    category: "Daemons & System",
    description:
      "Idle management daemon for Wayland compositors using the ext-idle-notify-v1 and wlr-idle protocols.",
    role: "Monitors mouse/keyboard inactivity to dim display brightness, turn off display outputs (DPMS off), and invoke swaylock.",
    installCommand: "sudo pacman -S swayidle",
    docsUrl: "https://man.archlinux.org/man/swayidle.1",
    githubUrl: "https://github.com/swaywm/swayidle",
    tags: ["Power Management", "Idle Daemon", "DPMS"],
  },
  {
    name: "Swaybg",
    category: "Compositor & Display",
    description:
      "Wallpaper utility for Wayland compositors. Lightweight daemon that renders wallpapers onto Wayland surfaces across multiple outputs.",
    role: "Sets high-resolution wallpapers at Hyprland startup with automatic scaling across multiple displays.",
    installCommand: "sudo pacman -S swaybg",
    docsUrl: "https://man.archlinux.org/man/swaybg.1",
    githubUrl: "https://github.com/swaywm/swaybg",
    tags: ["Wallpaper", "Wayland Surface", "Multi-Monitor"],
  },
  {
    name: "Grim",
    category: "Clipboard & Utilities",
    description:
      "Grab images from a Wayland compositor. Fast screenshot tool that leverages the wlr-screencopy protocol to capture individual screens or coordinates.",
    role: "Takes instant screenshots of entire monitors or piped geometric regions, outputting PNG data directly.",
    installCommand: "sudo pacman -S grim",
    docsUrl: "https://man.archlinux.org/man/grim.1",
    websiteUrl: "https://sr.ht/~emersion/grim/",
    githubUrl: "https://github.com/emersion/grim",
    tags: ["Screenshots", "Wayland Native", "CLI Tool"],
  },
  {
    name: "Slurp",
    category: "Clipboard & Utilities",
    description:
      "Interactive region selection tool for Wayland compositors. Allows the user to click or drag a box on screen and outputs geometry coordinates.",
    role: 'Pairs seamlessly with grim (grim -g "$(slurp)" - | wl-copy) for selective screen snips copied straight to clipboard.',
    installCommand: "sudo pacman -S slurp",
    docsUrl: "https://man.archlinux.org/man/slurp.1",
    githubUrl: "https://github.com/emersion/slurp",
    tags: ["Region Selector", "Screen Snip", "Geometry Output"],
  },
  {
    name: "Polkit Agent (KDE / GNOME)",
    category: "Daemons & System",
    description:
      "PolicyKit authentication agent providing graphical dialogs when an unprivileged process requests administrative or root credentials.",
    role: "Ensures GUI tools like GParted, Wireshark, or package managers can prompt for sudo password without failing silently in the background.",
    installCommand: "sudo pacman -S polkit-kde-agent",
    docsUrl: "https://wiki.archlinux.org/title/Polkit",
    githubUrl:
      "https://gitlab.archlinux.org/archlinux/packaging/packages/polkit-kde-agent",
    tags: ["Authentication", "Privilege Escalation", "Security", "D-Bus"],
  },
  {
    name: "JetBrains Mono Nerd Font",
    category: "Fonts & Theming",
    description:
      "Monospaced developer typeface patched with over 3,000 glyphs, ligatures, icons (Font Awesome, Material, Devicons, Weather) for status bars and CLI tools.",
    role: "Renders icons inside Waybar (battery, wifi, volume), Kitty terminal, and CLI status tools without missing glyph tofu blocks.",
    installCommand: "sudo pacman -S ttf-jetbrains-mono-nerd",
    docsUrl: "https://www.nerdfonts.com/",
    websiteUrl: "https://www.nerdfonts.com/",
    githubUrl: "https://github.com/ryanoasis/nerd-fonts",
    tags: ["Typography", "Nerd Fonts", "Ligatures", "Glyphs"],
  },
  {
    name: "GNU Stow",
    category: "Fonts & Theming",
    description:
      "Symlink farm manager that manages packages of symlinks to files in separate directories, ideal for centralizing dotfiles inside Git repositories.",
    role: "Allows deploying ~/.config modules with a single command (stow .config) without manually copying files back and forth.",
    installCommand: "sudo pacman -S stow",
    docsUrl: "https://www.gnu.org/software/stow/manual/stow.html",
    websiteUrl: "https://www.gnu.org/software/stow/",
    githubUrl: "https://git.savannah.gnu.org/cgit/stow.git",
    tags: ["Symlinks", "Dotfiles Manager", "GNU Tool"],
  },
  {
    name: "Fastfetch",
    category: "Terminal & Launcher",
    description:
      "Blazingly fast, modern, and highly configurable CLI system information tool written in C. Neofetch-like tool optimized for speed and Wayland detection.",
    role: "Displays OS logo, kernel version, Hyprland compositor name, uptime, memory, and Kitty terminal specs upon opening a new shell.",
    installCommand: "sudo pacman -S fastfetch",
    docsUrl: "https://github.com/fastfetch-cli/fastfetch/wiki",
    githubUrl: "https://github.com/fastfetch-cli/fastfetch",
    tags: ["System Info", "Fetch", "C", "Neofetch Alternative"],
  },
];

// --- Keybindings List ---
interface Keybind {
  combo: string;
  action: string;
  category:
    | "Window Management"
    | "Launchers"
    | "Workspaces"
    | "Session & Security";
  description: string;
}

const keybindingsList: Keybind[] = [
  {
    combo: "SUPER + T",
    action: "Launch Kitty Terminal",
    category: "Launchers",
    description: "Opens high-performance GPU terminal with default shell",
  },
  {
    combo: "SUPER + SPACE",
    action: "Open Wofi Launcher",
    category: "Launchers",
    description: "Opens application launcher with fuzzy search",
  },
  {
    combo: "SUPER + V",
    action: "Open CopyQ Clipboard",
    category: "Launchers",
    description: "Opens floating clipboard history for instant paste",
  },
  {
    combo: "SUPER + SHIFT + S",
    action: "Screen Region Capture",
    category: "Launchers",
    description: "Invokes slurp + grim and copies screenshot to clipboard",
  },
  {
    combo: "SUPER + Q",
    action: "Kill Active Window",
    category: "Window Management",
    description: "Gracefully terminates current focused window",
  },
  {
    combo: "SUPER + F",
    action: "Toggle Floating Window",
    category: "Window Management",
    description: "Switches current window between tiled and floating mode",
  },
  {
    combo: "SUPER + M",
    action: "Toggle Fullscreen",
    category: "Window Management",
    description: "Maximizes focused window to occupy the entire monitor",
  },
  {
    combo: "SUPER + LEFT/RIGHT/UP/DOWN",
    action: "Move Window Focus",
    category: "Window Management",
    description: "Navigates focus between tiled windows in specified direction",
  },
  {
    combo: "SUPER + SHIFT + ARROWS",
    action: "Swap Window Position",
    category: "Window Management",
    description: "Swaps active window position with neighbor",
  },
  {
    combo: "SUPER + 1 .. 9",
    action: "Switch to Workspace [1-9]",
    category: "Workspaces",
    description: "Instant virtual desktop workspace switcher",
  },
  {
    combo: "SUPER + SHIFT + 1 .. 9",
    action: "Move Window to Workspace [1-9]",
    category: "Workspaces",
    description: "Transfers active window to target workspace",
  },
  {
    combo: "SUPER + L",
    action: "Lock Workstation",
    category: "Session & Security",
    description: "Invokes swaylock with desktop background blur",
  },
  {
    combo: "SUPER + SHIFT + E",
    action: "Exit Hyprland Session",
    category: "Session & Security",
    description: "Terminates compositor and returns safely to TTY console",
  },
];

// --- Config Files Explorer Data ---
interface ConfigFileItem {
  id: string;
  name: string;
  path: string;
  description: string;
  language: string;
  snippet: string;
}

const configFiles: ConfigFileItem[] = [
  {
    id: "hyprland",
    name: "hyprland.conf",
    path: "~/.config/hypr/hyprland.conf",
    description:
      "The primary orchestrator: sets display resolutions, gaps, borders, autostart daemons, and window rules.",
    language: "ini",
    snippet: `# Monitor configuration (Auto-detect & 144Hz preferred)
monitor=,preferred,auto,1

# Autostart essential daemons
exec-once = waybar
exec-once = swaybg -i ~/.config/wallpapers/neon.jpg
exec-once = copyq --start-server
exec-once = mako
exec-once = swayidle -w timeout 300 'swaylock -f' timeout 600 'hyprctl dispatch dpms off' resume 'hyprctl dispatch dpms on'
exec-once = /usr/lib/polkit-kde-authentication-agent-1

# Appearance & Gaps
general {
    gaps_in = 6
    gaps_out = 12
    border_size = 2
    col.active_border = rgba(d87affee) rgba(9a44ffee) 45deg
    col.inactive_border = rgba(1e1e2eff)
    layout = dwindle
}

decoration {
    rounding = 10
    blur {
        enabled = true
        size = 8
        passes = 3
        new_optimizations = true
    }
    drop_shadow = true
    shadow_range = 15
    shadow_render_power = 3
    col.shadow = rgba(1a1a1aee)
}`,
  },
  {
    id: "waybar-config",
    name: "config.jsonc",
    path: "~/.config/waybar/config.jsonc",
    description:
      "Configures the top floating status bar: workspace indicators, audio sink, memory monitor, and system tray.",
    language: "json",
    snippet: `{
  "layer": "top",
  "position": "top",
  "margin-top": 8,
  "margin-left": 14,
  "margin-right": 14,
  "modules-left": ["hyprland/workspaces", "hyprland/window"],
  "modules-center": ["clock"],
  "modules-right": ["pulseaudio", "memory", "cpu", "battery", "tray"],

  "hyprland/workspaces": {
    "disable-scroll": true,
    "all-outputs": true,
    "format": "{icon}"
  },
  "clock": {
    "format": " {:%H:%M   %d %b}",
    "tooltip-format": "<big>{:%Y %B}</big>\\n<tt><small>{calendar}</small></tt>"
  },
  "pulseaudio": {
    "format": "{icon} {volume}%",
    "format-muted": " Muted",
    "format-icons": { "default": ["", "", ""] }
  }
}`,
  },
  {
    id: "waybar-style",
    name: "style.css",
    path: "~/.config/waybar/style.css",
    description:
      "CSS styling for Waybar: dark glassmorphism, glowing violet accents, and smooth hover pill highlights.",
    language: "css",
    snippet: `* {
  border: none;
  font-family: "JetBrainsMono Nerd Font", monospace;
  font-size: 13px;
  font-weight: bold;
}

window#waybar {
  background: rgba(12, 12, 18, 0.75);
  border: 1px solid rgba(216, 122, 255, 0.2);
  border-radius: 12px;
  color: #cdd6f4;
}

#workspaces button {
  padding: 0 10px;
  background: transparent;
  color: #6c7086;
  border-radius: 8px;
  transition: all 0.2s ease;
}

#workspaces button.active {
  color: #ffffff;
  background: rgba(216, 122, 255, 0.25);
  border-bottom: 2px solid #d87aff;
}

#clock, #pulseaudio, #memory, #cpu {
  padding: 0 12px;
  margin: 4px 2px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 8px;
}`,
  },
  {
    id: "kitty",
    name: "kitty.conf",
    path: "~/.config/kitty/kitty.conf",
    description:
      "GPU accelerated terminal styling with JetBrains Mono, slight opacity blur, and custom violet cursor.",
    language: "ini",
    snippet: `font_family      JetBrainsMono Nerd Font
bold_font        JetBrainsMono Nerd Font Bold
italic_font      JetBrainsMono Nerd Font Italic
font_size        12.0

window_padding_width 14
background_opacity 0.88
blur 1

# Color Palette (Violet / Deep Night Rice)
foreground #cdd6f4
background #0a0a0f
cursor #d87aff
selection_background #d87aff
selection_foreground #000000

# Window management & bell
enable_audio_bell no
confirm_os_window_close 0`,
  },
  {
    id: "wofi",
    name: "style.css (Wofi)",
    path: "~/.config/wofi/style.css",
    description:
      "Minimalist blurred popup launcher styling with violet selection outlines and rounded margins.",
    language: "css",
    snippet: `window {
  margin: 0px;
  border: 2px solid rgba(216, 122, 255, 0.4);
  border-radius: 16px;
  background-color: rgba(10, 10, 15, 0.9);
  font-family: 'JetBrainsMono Nerd Font', monospace;
  font-size: 14px;
}

#input {
  margin: 14px;
  padding: 10px 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.05);
}

#entry:selected {
  background-color: rgba(216, 122, 255, 0.25);
  border-radius: 8px;
  border: 1px solid #d87aff;
}`,
  },
  {
    id: "swaylock",
    name: "config (Swaylock)",
    path: "~/.config/swaylock/config",
    description:
      "Lockscreen theme featuring desktop blur, password ring indicators, and error feedback.",
    language: "ini",
    snippet: `daemonize
clock
indicator
screenshots
effect-blur=7x5
effect-vignette=0.5:0.5

ring-color=d87aff44
ring-clear-color=27c93f88
ring-ver-color=3b82f688
ring-wrong-color=ff5f5688

key-hl-color=d87affee
bs-hl-color=ff5f56ee
text-color=ffffff`,
  },
];

// --- Raw Markdown for README.md ---
const RAW_README_MD = `#kulj33t's Dotfiles — Hyprland & Wayland Rice

> A sleek, aesthetic, and ultra-fast Wayland desktop environment powered by **Hyprland**, **Waybar**, and **Kitty**.

[![Hyprland](https://img.shields.io/badge/Hyprland-v0.40+-purple?style=flat-square&logo=hyprland)](https://hyprland.org)
[![Platform](https://img.shields.io/badge/Platform-Arch%20%7C%20Fedora%20%7C%20openSUSE-blue?style=flat-square)](https://github.com/kulj33t/dotfiles)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)
[![Font](https://img.shields.io/badge/Font-JetBrains%20Mono%20Nerd%20Font-pink?style=flat-square)](https://www.nerdfonts.com)
[![Dotfiles](https://img.shields.io/badge/Repo-kulj33t%2Fdotfiles-violet?style=flat-square&logo=github)](https://github.com/kulj33t/dotfiles)

---

## 🌟 Overview

Welcome to my personal dotfiles repository! This setup is tailored for dynamic tiling, minimal distractions, ultra-fast key-driven workflow, and a cohesive cyberpunk-violet aesthetic.

Designed for modern Wayland environments with hardware acceleration, high-refresh-rate displays, and full clipboard/power daemon integration.

### ✨ Highlights
- **Compositor**: [Hyprland](https://hyprland.org) with fluid bezier animations, active borders, and window blur.
- **Status Bar**: [Waybar](https://github.com/Alexays/Waybar) with workspaces, audio slider, memory, battery, and clock.
- **Terminal**: [Kitty](https://sw.kovidgoyal.net/kitty/) configured with JetBrains Mono Nerd Font and transparency.
- **Launcher**: [Wofi](https://hg.sr.ht/~scoopta/wofi) with custom CSS styling and fuzzy matching.
- **Clipboard**: [CopyQ](https://hluk.github.io/CopyQ/) + [wl-clipboard](https://github.com/bugaevc/wl-clipboard) persistent history on \`SUPER + V\`.
- **Security**: [Swaylock](https://github.com/swaywm/swaylock) + [Swayidle](https://github.com/swaywm/swayidle) for screen locking and DPMS management.
- **Notifications**: [Mako](https://github.com/emersion/mako) lightweight Wayland notification daemon.
- **Screenshots**: [Grim](https://sr.ht/~emersion/grim/) + [Slurp](https://github.com/emersion/slurp) for interactive area captures.

---

## 🚀 Quickstart Installation

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/kulj33t/dotfiles && cd dotfiles
\`\`\`

### 2. Install Packages

#### Arch Linux (Recommended)
\`\`\`bash
sudo pacman -Syu
sudo pacman -S hyprland waybar wofi kitty swaybg swayidle swaylock copyq mako grim slurp wl-clipboard polkit-kde-agent ttf-jetbrains-mono-nerd stow fastfetch
\`\`\`

#### Fedora (39+)
\`\`\`bash
sudo dnf upgrade --refresh
sudo dnf install hyprland waybar wofi kitty swaybg swayidle swaylock copyq mako grim slurp wl-clipboard polkit-gnome stow
\`\`\`

#### openSUSE (Tumbleweed)
\`\`\`bash
sudo zypper dup
sudo zypper install hyprland waybar wofi kitty swaybg swayidle swaylock copyq mako grim slurp wl-clipboard stow
\`\`\`

### 3. Install JetBrains Mono Nerd Font (If not installed via package manager)
\`\`\`bash
wget https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
unzip JetBrainsMono.zip -d ~/.local/share/fonts/
fc-cache -fv
\`\`\`

### 4. Deploy Configuration Files

#### Option A: GNU Stow (Recommended for Git tracking)
\`\`\`bash
cd dotfiles
stow .config
\`\`\`

#### Option B: Direct Copy
\`\`\`bash
cp -r dotfiles/.config/* ~/.config/
\`\`\`

### 5. Launch Hyprland
From your TTY (virtual terminal), run:
\`\`\`bash
Hyprland
\`\`\`

---

## ⌨️ Essential Keybindings

| Keybinding | Action | Description |
| :--- | :--- | :--- |
| \`SUPER + T\` | Open Kitty Terminal | Fast GPU-accelerated terminal |
| \`SUPER + SPACE\` | Launch Wofi Application Menu | Fuzzy application search |
| \`SUPER + V\` | Open CopyQ Clipboard History | Searchable paste history |
| \`SUPER + SHIFT + S\` | Screenshot Region | Capture area directly to clipboard |
| \`SUPER + Q\` | Close Active Window | Graceful window termination |
| \`SUPER + F\` | Toggle Floating Mode | Switch between tiled & float |
| \`SUPER + M\` | Toggle Fullscreen | Maximize window to full monitor |
| \`SUPER + Arrows\` | Change Focus | Navigate active tiled windows |
| \`SUPER + 1 .. 9\` | Switch Workspace [1-9] | Jump to designated desktop |
| \`SUPER + SHIFT + 1 .. 9\` | Move Window to Workspace | Relocate window to desktop |
| \`SUPER + L\` | Lock Screen | Lock workstation with swaylock |
| \`SUPER + SHIFT + E\` | Exit Session | Quit Hyprland back to TTY |

---

## 📦 Core Packages & Documentation

| Package | Role | Official Docs | Repository |
| :--- | :--- | :--- | :--- |
| **Hyprland** | Wayland Compositor | [Wiki](https://wiki.hyprland.org) | [GitHub](https://github.com/hyprwm/Hyprland) |
| **Waybar** | Status Bar | [Wiki](https://github.com/Alexays/Waybar/wiki) | [GitHub](https://github.com/Alexays/Waybar) |
| **Kitty** | GPU Terminal | [Docs](https://sw.kovidgoyal.net/kitty/) | [GitHub](https://github.com/kovidgoyal/kitty) |
| **Wofi** | App Launcher | [Manpage](https://man.archlinux.org/man/wofi.1) | [Source](https://hg.sr.ht/~scoopta/wofi) |
| **CopyQ** | Clipboard Manager | [Docs](https://copyq.readthedocs.io/) | [GitHub](https://github.com/hluk/CopyQ) |
| **wl-clipboard** | Wayland Clipboard CLI | [Manpage](https://man.archlinux.org/man/wl-clipboard.1) | [GitHub](https://github.com/bugaevc/wl-clipboard) |
| **Mako** | Notification Daemon | [Manpage](https://man.archlinux.org/man/mako.1) | [GitHub](https://github.com/emersion/mako) |
| **Swaylock** | Screen Locker | [Manpage](https://man.archlinux.org/man/swaylock.1) | [GitHub](https://github.com/swaywm/swaylock) |
| **Swayidle** | Idle Manager | [Manpage](https://man.archlinux.org/man/swayidle.1) | [GitHub](https://github.com/swaywm/swayidle) |
| **Swaybg** | Wallpaper Daemon | [Manpage](https://man.archlinux.org/man/swaybg.1) | [GitHub](https://github.com/swaywm/swaybg) |
| **Grim** | Screenshot Tool | [Manpage](https://man.archlinux.org/man/grim.1) | [Source](https://sr.ht/~emersion/grim/) |
| **Slurp** | Region Selector | [Manpage](https://man.archlinux.org/man/slurp.1) | [GitHub](https://github.com/emersion/slurp) |
| **Polkit KDE** | GUI Auth Agent | [ArchWiki](https://wiki.archlinux.org/title/Polkit) | [Arch Linux](https://archlinux.org/packages/extra/x86_64/polkit-kde-agent/) |
| **Nerd Fonts** | Icon Fonts | [Website](https://www.nerdfonts.com) | [GitHub](https://github.com/ryanoasis/nerd-fonts) |
| **GNU Stow** | Symlink Manager | [Manual](https://www.gnu.org/software/stow/manual/stow.html) | [GNU](https://www.gnu.org/software/stow/) |
| **Fastfetch** | System Info CLI | [Wiki](https://github.com/fastfetch-cli/fastfetch/wiki) | [GitHub](https://github.com/fastfetch-cli/fastfetch) |

---

## 🛠️ Nvidia Specific Troubleshooting

If you are using an Nvidia GPU, add these environment variables to \`~/.config/hypr/hyprland.conf\`:
\`\`\`ini
env = LIBVA_DRIVER_NAME,nvidia
env = XDG_SESSION_TYPE,wayland
env = GBM_BACKEND,nvidia-drm
env = __GLX_VENDOR_LIBRARY_NAME,nvidia
env = WLR_NO_HARDWARE_CURSORS,1
\`\`\`

---

## 📄 License
MIT © [Kuljeet](https://github.com/kulj33t)
`;

export default function DotFiles() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeOs, setActiveOs] = useState<OsType>("arch");
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [cloneProtocol, setCloneProtocol] = useState<"https" | "ssh" | "cli">(
    "https",
  );
  const [packageCategory, setPackageCategory] = useState<string>("All");
  const [packageSearch, setPackageSearch] = useState<string>("");
  const [selectedConfigFile, setSelectedConfigFile] =
    useState<string>("hyprland");
  const [readmeMode, setReadmeMode] = useState<"visual" | "raw">("visual");
  const [keybindSearch, setKeybindSearch] = useState<string>("");
  const [keybindFilter, setKeybindFilter] = useState<string>("All");
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Auto-play timer for distro rotation
  useEffect(() => {
    if (!isAutoPlaying) return;
    const osList: OsType[] = ["arch", "fedora", "opensuse", "ubuntu"];
    const timer = setInterval(() => {
      setActiveOs((currentOs) => {
        const currentIndex = osList.indexOf(currentOs);
        const nextIndex = (currentIndex + 1) % osList.length;
        return osList[nextIndex];
      });
    }, 3500);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Back to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = (text: string, label: string = text) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2500);
  };

  const downloadReadme = () => {
    const element = document.createElement("a");
    const file = new Blob([RAW_README_MD], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = "README.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getCloneString = () => {
    switch (cloneProtocol) {
      case "ssh":
        return SSH_CLONE_COMMAND;
      case "cli":
        return GH_CLI_CLONE_COMMAND;
      case "https":
      default:
        return PRIMARY_CLONE_COMMAND;
    }
  };

  // Filter packages
  const filteredPackages = useMemo(() => {
    return packagesList.filter((pkg) => {
      const matchesCategory =
        packageCategory === "All" || pkg.category === packageCategory;
      const matchesSearch =
        packageSearch.trim() === "" ||
        pkg.name.toLowerCase().includes(packageSearch.toLowerCase()) ||
        pkg.description.toLowerCase().includes(packageSearch.toLowerCase()) ||
        pkg.tags.some((tag) =>
          tag.toLowerCase().includes(packageSearch.toLowerCase()),
        );
      return matchesCategory && matchesSearch;
    });
  }, [packageCategory, packageSearch]);

  // Filter keybindings
  const filteredKeybindings = useMemo(() => {
    return keybindingsList.filter((kb) => {
      const matchesFilter =
        keybindFilter === "All" || kb.category === keybindFilter;
      const matchesSearch =
        keybindSearch.trim() === "" ||
        kb.combo.toLowerCase().includes(keybindSearch.toLowerCase()) ||
        kb.action.toLowerCase().includes(keybindSearch.toLowerCase()) ||
        kb.description.toLowerCase().includes(keybindSearch.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [keybindFilter, keybindSearch]);

  const activeConfigFile = useMemo(() => {
    return (
      configFiles.find((c) => c.id === selectedConfigFile) || configFiles[0]
    );
  }, [selectedConfigFile]);

  const ActiveIcon = osCommands[activeOs].icon;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full bg-[#07070a] text-zinc-300 font-sans selection:bg-[#d87aff]/30 selection:text-white font-inter relative pb-20">
      {/* Toast Notification */}
      {copied && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-[#d87aff]/40 bg-[#120d1a] px-4 py-3 text-sm font-medium text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d87aff] text-black">
            <IconCheck className="h-4 w-4" />
          </div>
          <div>
            <p className="font-semibold text-white">Copied to clipboard!</p>
            <p className="text-xs text-zinc-400 font-mono truncate max-w-xs">
              {copied}
            </p>
          </div>
        </div>
      )}

      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#07070a]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-semibold text-zinc-300 transition-all hover:border-[#d87aff]/50 hover:bg-[#d87aff]/10 hover:text-white"
            >
              <IconArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Portfolio</span>
            </Link>

            <a
              href="#"
              className="font-bold tracking-tight text-xl text-white group flex items-center gap-1.5"
            >
              <span>dot</span>
              <span className="text-[#d87aff] transition-colors group-hover:text-[#e59bff]">
                Files
              </span>
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <a href="#overview" className="hover:text-white transition-colors">
              Overview
            </a>
            <a href="#packages" className="hover:text-white transition-colors">
              Packages & Docs
            </a>
            <a href="#configs" className="hover:text-white transition-colors">
              Config Files
            </a>
            <a href="#prep" className="hover:text-white transition-colors">
              OS Setup
            </a>
            <a href="#install" className="hover:text-white transition-colors">
              Installation
            </a>
            <a href="#keybinds" className="hover:text-white transition-colors">
              Keybindings
            </a>
            <a
              href="#readme"
              className="hover:text-white transition-colors text-[#d87aff] font-semibold"
            >
              README.md
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-white transition-all hover:border-[#d87aff]/60 hover:bg-[#d87aff]/15 shadow-sm"
            >
              <IconGithub className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub Repo</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        id="overview"
        className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pt-20 pb-28 text-center"
      >
        {/* Subtle Background Glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 -z-10 h-72 w-96 rounded-full bg-[#d87aff]/15 blur-[120px] pointer-events-none" />

        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d87aff]/30 bg-[#d87aff]/10 px-4 py-1.5 text-xs font-semibold text-[#d87aff] mb-8 shadow-[0_0_20px_-5px_rgba(216,122,255,0.3)]">
          <IconSparkles className="h-3.5 w-3.5" />
          <span>Curated Hyprland Rice</span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white mb-6">
          dot
          <span className="text-[#d87aff] drop-shadow-[0_0_35px_rgba(216,122,255,0.4)]">
            Files
          </span>
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-zinc-300 leading-relaxed mb-10 font-normal">
          A fast, customizable Linux desktop setup that makes your computer look
          great and work smoothly. Includes easy installation, automatic
          configuration, and step-by-step setup guides for different Linux
          distributions.
        </p>

        {/* Clone Box with Protocol Selector */}
        <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-[#0c0c14] p-3 shadow-2xl backdrop-blur-xl">
          {/* Protocol selector tabs */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5 px-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                Clone Repository:
              </span>
              <button
                onClick={() => setCloneProtocol("https")}
                className={`text-xs px-2.5 py-1 rounded-md font-mono transition-all ${
                  cloneProtocol === "https"
                    ? "bg-[#d87aff]/20 text-[#d87aff] font-bold border border-[#d87aff]/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                HTTPS
              </button>
              <button
                onClick={() => setCloneProtocol("ssh")}
                className={`text-xs px-2.5 py-1 rounded-md font-mono transition-all ${
                  cloneProtocol === "ssh"
                    ? "bg-[#d87aff]/20 text-[#d87aff] font-bold border border-[#d87aff]/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                SSH
              </button>
              <button
                onClick={() => setCloneProtocol("cli")}
                className={`text-xs px-2.5 py-1 rounded-md font-mono transition-all ${
                  cloneProtocol === "cli"
                    ? "bg-[#d87aff]/20 text-[#d87aff] font-bold border border-[#d87aff]/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                GitHub CLI
              </button>
            </div>

            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <span>View repo</span>
              <IconExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Actual Command Display */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-[#d87aff]/20 bg-black/50 p-2 sm:pl-4">
            <div className="flex items-center gap-3 overflow-hidden text-sm md:text-base font-mono w-full sm:w-auto text-left">
              <span className="text-[#d87aff] font-bold select-none">$</span>
              <span className="truncate text-zinc-200 select-all">
                {getCloneString()}
              </span>
            </div>
            <button
              onClick={() => handleCopy(getCloneString(), "Git Clone Command")}
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-lg bg-[#d87aff] px-6 py-2.5 text-sm font-bold text-black transition-all hover:scale-102 active:scale-98 hover:bg-[#e494ff] shadow-lg cursor-pointer"
            >
              {copied === "Git Clone Command" ? (
                <IconCheck className="h-4 w-4" />
              ) : (
                <IconCopy className="h-4 w-4" />
              )}
              <span>
                {copied === "Git Clone Command" ? "Copied!" : "Copy Command"}
              </span>
            </button>
          </div>
        </div>

        {/* Feature Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12 w-full max-w-4xl text-left">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="text-[#d87aff] font-bold text-lg mb-1">
              16+ Packages
            </div>
            <div className="text-xs text-zinc-400">
              Curated, minimal & audited system stack
            </div>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="text-[#d87aff] font-bold text-lg mb-1">
              Wayland Native
            </div>
            <div className="text-xs text-zinc-400">
              Pure wlroots & xdg-desktop-portal support
            </div>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="text-[#d87aff] font-bold text-lg mb-1">
              GNU Stow Ready
            </div>
            <div className="text-xs text-zinc-400">
              Symlink farm deployment in 1 command
            </div>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="text-[#d87aff] font-bold text-lg mb-1">
              Nerd Font Icons
            </div>
            <div className="text-xs text-zinc-400">
              JetBrains Mono patched glyph integration
            </div>
          </div>
        </div>
      </header>

      {/* Section: Packages & Documentation Showcase */}
      <section
        id="packages"
        className="mx-auto max-w-6xl px-6 py-20 border-t border-white/5"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d87aff] mb-2 flex items-center gap-2">
              <IconPackage className="h-3.5 w-3.5" />
              <span>Ecosystem & Dependencies</span>
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
              Packages & Documentation
            </h2>
            <p className="text-zinc-400 max-w-2xl text-base">
              Every package utilized in this rice, with exact roles,
              installation commands, and official links to their verified
              documentation, wikis, and GitHub repositories.
            </p>
          </div>

          <div className="text-sm font-mono text-zinc-400 bg-white/[0.03] border border-white/10 px-4 py-2 rounded-xl shrink-0 self-start md:self-auto">
            Showing{" "}
            <span className="text-[#d87aff] font-bold">
              {filteredPackages.length}
            </span>{" "}
            of {packagesList.length} packages
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {[
              "All",
              "Compositor & Display",
              "Terminal & Launcher",
              "Daemons & System",
              "Clipboard & Utilities",
              "Fonts & Theming",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setPackageCategory(cat)}
                className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  packageCategory === cat
                    ? "bg-[#d87aff] text-black font-bold shadow-md"
                    : "bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.07] border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search packages, docs, tags..."
              value={packageSearch}
              onChange={(e) => setPackageSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:border-[#d87aff] focus:outline-none focus:ring-1 focus:ring-[#d87aff]"
            />
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.name}
              className="group rounded-2xl border border-white/10 bg-[#0d0d14] p-6 transition-all duration-300 hover:border-[#d87aff]/50 hover:bg-[#11111c] flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#d87aff] transition-colors">
                      {pkg.name}
                    </h3>
                    <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wide">
                      {pkg.category}
                    </span>
                  </div>
                  <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono text-zinc-400">
                    Active
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  {pkg.description}
                </p>

                {/* Role Note */}
                <div className="rounded-lg border border-white/5 bg-black/40 p-3 mb-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#d87aff] mb-1">
                    Role in Rice
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    {pkg.role}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {pkg.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] font-mono text-zinc-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                {/* Install Command Snippet */}
                <div className="flex items-center justify-between rounded-lg border border-white/5 bg-black/60 px-3 py-2 text-xs font-mono text-zinc-300 mb-4">
                  <span className="truncate text-zinc-400">
                    $ {pkg.installCommand}
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(pkg.installCommand, `${pkg.name} install`)
                    }
                    className="ml-2 text-zinc-500 hover:text-white transition-colors"
                    title="Copy command"
                  >
                    {copied === `${pkg.name} install` ? (
                      <IconCheck className="h-3.5 w-3.5 text-green-400" />
                    ) : (
                      <IconCopy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <a
                    href={pkg.docsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-xs font-semibold text-zinc-200 transition-all hover:bg-[#d87aff]/15 hover:border-[#d87aff]/40 hover:text-white"
                  >
                    <IconBookOpen className="h-3.5 w-3.5 text-[#d87aff]" />
                    <span>Documentation</span>
                    <IconExternalLink className="h-3 w-3 opacity-60" />
                  </a>

                  {pkg.websiteUrl && (
                    <a
                      href={pkg.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg border border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all"
                      title="Official Website"
                    >
                      <IconExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}

                  <a
                    href={pkg.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg border border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all"
                    title="Source / GitHub"
                  >
                    <IconGithub className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Config Architecture & File Explorer */}
      <section
        id="configs"
        className="mx-auto max-w-6xl px-6 py-20 border-t border-white/5"
      >
        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d87aff] mb-2 flex items-center gap-2">
            <IconFolder className="h-3.5 w-3.5" />
            <span>Architecture Breakdown</span>
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
            Configuration File Structure
          </h2>
          <p className="text-zinc-400 max-w-2xl text-base">
            Inspect the key files included in this repository. Select any
            configuration file below to explore its path, purpose, and snippet.
          </p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6 rounded-2xl border border-white/10 bg-[#0c0c12] p-4 lg:p-6 shadow-2xl">
          {/* File selector list */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 border-b lg:border-b-0 lg:border-r border-white/5 pr-0 lg:pr-4">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2 hidden lg:block">
              Repository Files (~/.config)
            </div>
            {configFiles.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedConfigFile(item.id)}
                className={`text-left px-3.5 py-3 rounded-xl text-xs font-mono transition-all flex items-center gap-3 shrink-0 lg:shrink ${
                  selectedConfigFile === item.id
                    ? "bg-[#d87aff]/15 text-[#d87aff] border border-[#d87aff]/40 shadow-[0_0_15px_-3px_rgba(216,122,255,0.2)] font-bold"
                    : "text-zinc-400 hover:bg-white/[0.03] hover:text-white border border-transparent"
                }`}
              >
                <IconFileCode
                  className={`h-4 w-4 ${selectedConfigFile === item.id ? "text-[#d87aff]" : "text-zinc-500"}`}
                />
                <span className="truncate flex-1">{item.name}</span>
                {selectedConfigFile === item.id && (
                  <IconArrowRight className="h-3.5 w-3.5 opacity-70 hidden lg:inline" />
                )}
              </button>
            ))}
          </div>

          {/* File content & preview */}
          <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-white">
                    {activeConfigFile.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#d87aff] bg-[#d87aff]/10 border border-[#d87aff]/20 px-2 py-0.5 rounded">
                    {activeConfigFile.language.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  {activeConfigFile.path}
                </p>
              </div>

              <button
                onClick={() =>
                  handleCopy(activeConfigFile.snippet, activeConfigFile.name)
                }
                className="self-start sm:self-auto inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/[0.08] hover:text-white transition-all"
              >
                {copied === activeConfigFile.name ? (
                  <IconCheck className="h-3.5 w-3.5 text-green-400" />
                ) : (
                  <IconCopy className="h-3.5 w-3.5" />
                )}
                <span>
                  {copied === activeConfigFile.name ? "Copied" : "Copy Snippet"}
                </span>
              </button>
            </div>

            <p className="text-xs text-zinc-300 mb-4 bg-white/[0.02] border border-white/5 p-3 rounded-xl leading-relaxed">
              {activeConfigFile.description}
            </p>

            {/* Code Block */}
            <div className="relative rounded-xl border border-white/5 bg-black/60 p-4 font-mono text-xs overflow-x-auto text-zinc-300 max-h-[420px] scrollbar-thin">
              <pre className="leading-relaxed">
                <code>{activeConfigFile.snippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Section: OS System Prep (Phase 01) */}
      <section
        id="prep"
        className="mx-auto max-w-6xl px-6 py-20 border-t border-white/5"
      >
        <div className="mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d87aff] mb-2 flex items-center gap-2">
            <IconCpu className="h-3.5 w-3.5" />
            <span>Phase 01</span>
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
            System Preparation & Update
          </h2>
          <p className="text-zinc-400 max-w-2xl text-base">
            Wayland compositors require cutting-edge graphics stacks, DRM
            drivers, and compositor protocols. Ensure your repository mirrors
            and system packages are completely up to date.
          </p>
        </div>

        {/* Dynamic Distro Showcase */}
        <div className="rounded-2xl border border-white/10 bg-[#0c0c12] shadow-2xl overflow-hidden font-mono text-sm mx-auto flex flex-col md:flex-row">
          {/* OS Selector Sidebar */}
          <div className="w-full md:w-64 bg-black/40 border-b md:border-b-0 md:border-r border-white/5 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto">
            <div className="flex items-center justify-between mb-2 px-2 hidden md:flex">
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                Distribution
              </span>
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-[10px] text-zinc-500 hover:text-[#d87aff] flex items-center gap-1 transition-colors"
                title={
                  isAutoPlaying ? "Pause auto-switch" : "Resume auto-switch"
                }
              >
                {isAutoPlaying ? (
                  <IconPause className="h-3 w-3" />
                ) : (
                  <IconPlay className="h-3 w-3" />
                )}
                <span>{isAutoPlaying ? "Auto" : "Paused"}</span>
              </button>
            </div>

            {(Object.keys(osCommands) as OsType[]).map((os) => {
              const Icon = osCommands[os].icon;
              return (
                <button
                  key={os}
                  onClick={() => {
                    setActiveOs(os);
                    setIsAutoPlaying(false);
                  }}
                  className={`text-left px-3.5 py-3 rounded-xl text-xs font-sans font-medium transition-all flex items-center gap-3 shrink-0 md:shrink ${
                    activeOs === os
                      ? "bg-[#d87aff]/15 text-[#d87aff] border border-[#d87aff]/30 shadow-[0_0_15px_-3px_rgba(216,122,255,0.25)] font-bold"
                      : "text-zinc-400 hover:bg-white/[0.04] hover:text-white border border-transparent"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 ${activeOs === os ? "text-[#d87aff]" : "opacity-60"}`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{osCommands[os].name}</div>
                    <div className="text-[10px] text-zinc-500 font-mono truncate">
                      {osCommands[os].badge}
                    </div>
                  </div>
                  {activeOs === os && (
                    <IconArrowRight className="h-3.5 w-3.5 opacity-70 shrink-0 hidden md:inline" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Terminal Update View */}
          <div className="flex-1 flex flex-col relative min-w-0">
            <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-6 py-3.5">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
                <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
                <span className="text-xs text-zinc-400 font-sans ml-2">
                  {osCommands[activeOs].name} Terminal — Update
                </span>
              </div>
              <button
                onClick={() =>
                  handleCopy(osCommands[activeOs].update, `${activeOs} update`)
                }
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                title="Copy update command"
              >
                {copied === `${activeOs} update` ? (
                  <IconCheck className="h-3.5 w-3.5 text-green-400" />
                ) : (
                  <IconCopy className="h-3.5 w-3.5" />
                )}
                <span>
                  {copied === `${activeOs} update` ? "Copied" : "Copy"}
                </span>
              </button>
            </div>

            <div className="p-6 md:p-8 bg-black/30 flex-1 relative overflow-hidden flex flex-col justify-between">
              <ActiveIcon className="absolute -bottom-10 -right-10 h-64 w-64 text-white/[0.02] pointer-events-none" />

              <div className="relative z-10 mb-6">
                <div className="text-zinc-500 mb-2 select-none text-xs">
                  # 1. Synchronize package databases and run system upgrade
                </div>
                <div className="flex items-center gap-3 text-base">
                  <span className="text-[#d87aff] select-none font-bold">
                    ~ $
                  </span>
                  <span className="text-white font-mono break-all">
                    {osCommands[activeOs].update}
                  </span>
                </div>
              </div>

              <div className="relative z-10 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 font-sans">
                <div className="flex items-start gap-3">
                  <IconServer className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-blue-200 mb-1">
                      {osCommands[activeOs].name} Distribution Notes
                    </h4>
                    <p className="text-xs text-blue-300/80 leading-relaxed">
                      {osCommands[activeOs].notes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Support Matrix (Phase 02) */}
      <section
        id="support"
        className="mx-auto max-w-6xl px-6 py-20 border-t border-white/5"
      >
        <div className="mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d87aff] mb-2">
            Phase 02
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
            Distribution Compatibility Matrix
          </h2>
          <p className="text-zinc-400 max-w-2xl text-base">
            Not all Linux distributions support Wayland compositors smoothly.
            Here is an honest breakdown of compatibility tiers based on kernel
            modules, wlroots, and glibc versions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Tier 1 */}
          <div className="rounded-2xl border border-green-500/30 bg-green-500/[0.03] p-6 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-bold text-green-400 border border-green-500/20">
                  Tier 1 — First-Class
                </span>
                <IconCheck className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Rolling / Bleeding-Edge
              </h3>
              <p className="text-zinc-400 text-xs mb-6 border-b border-white/5 pb-4 leading-relaxed">
                Highest performance and turnkey compatibility. Wayland and
                Hyprland packages are maintained natively in official
                repositories.
              </p>
              <ul className="space-y-3 text-xs text-zinc-300 font-medium">
                <li className="flex items-center gap-2.5">
                  <IconCheck className="h-3.5 w-3.5 text-green-400" />{" "}
                  <strong>Arch Linux</strong> (Recommended)
                </li>
                <li className="flex items-center gap-2.5">
                  <IconCheck className="h-3.5 w-3.5 text-green-400" />{" "}
                  <strong>Fedora (39+)</strong> (Native repos)
                </li>
                <li className="flex items-center gap-2.5">
                  <IconCheck className="h-3.5 w-3.5 text-green-400" />{" "}
                  <strong>openSUSE Tumbleweed</strong>
                </li>
                <li className="flex items-center gap-2.5">
                  <IconCheck className="h-3.5 w-3.5 text-green-400" />{" "}
                  <strong>NixOS</strong> (Hyprland flake module)
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-green-400/80 font-mono">
              ✓ Guaranteed 100% feature parity
            </div>
          </div>

          {/* Tier 2 */}
          <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/[0.03] p-6 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center rounded-full bg-yellow-500/10 px-2.5 py-1 text-xs font-bold text-yellow-400 border border-yellow-500/20">
                  Tier 2 — Workable
                </span>
                <IconTriangleAlert className="h-5 w-5 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Advanced Source / PPAs
              </h3>
              <p className="text-zinc-400 text-xs mb-6 border-b border-white/5 pb-4 leading-relaxed">
                Functions smoothly once installed, but requires manual
                compilation, third-party overlays, or specialized package flags.
              </p>
              <ul className="space-y-3 text-xs text-zinc-300 font-medium">
                <li className="flex items-center gap-2.5">
                  <IconCheck className="h-3.5 w-3.5 text-yellow-400" />{" "}
                  <strong>Void Linux</strong> (xbps-src)
                </li>
                <li className="flex items-center gap-2.5">
                  <IconCheck className="h-3.5 w-3.5 text-yellow-400" />{" "}
                  <strong>Gentoo</strong> (wayland overlay)
                </li>
                <li className="flex items-center gap-2.5">
                  <IconCheck className="h-3.5 w-3.5 text-yellow-400" />{" "}
                  <strong>Alpine Linux</strong> (edge testing)
                </li>
                <li className="flex items-center gap-2.5">
                  <IconCheck className="h-3.5 w-3.5 text-yellow-400" />{" "}
                  <strong>Pop!_OS</strong> (via community PPA)
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-yellow-400/80 font-mono">
              ⚠ Requires package management familiarity
            </div>
          </div>

          {/* Tier 3 */}
          <div className="rounded-2xl border border-red-500/30 bg-red-500/[0.03] p-6 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-bold text-red-400 border border-red-500/20">
                  Tier 3 — Discouraged
                </span>
                <IconShieldAlert className="h-5 w-5 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Static / Old LTS
              </h3>
              <p className="text-zinc-400 text-xs mb-6 border-b border-white/5 pb-4 leading-relaxed">
                Not recommended. Ships with outdated dependencies (libc, mesa,
                libdrm) that will break compositor compilation or runtime.
              </p>
              <ul className="space-y-3 text-xs text-zinc-300 font-medium">
                <li className="flex items-center gap-2.5">
                  <IconShieldAlert className="h-3.5 w-3.5 text-red-400" />{" "}
                  <strong>Debian Stable</strong> (Outdated libraries)
                </li>
                <li className="flex items-center gap-2.5">
                  <IconShieldAlert className="h-3.5 w-3.5 text-red-400" />{" "}
                  <strong>Ubuntu LTS (22.04)</strong> (Older wlroots)
                </li>
                <li className="flex items-center gap-2.5">
                  <IconShieldAlert className="h-3.5 w-3.5 text-red-400" />{" "}
                  <strong>Linux Mint</strong> (Static base)
                </li>
                <li className="flex items-center gap-2.5">
                  <IconShieldAlert className="h-3.5 w-3.5 text-red-400" />{" "}
                  <strong>CentOS / RHEL</strong>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-red-400/80 font-mono">
              ✕ High probability of dependency errors
            </div>
          </div>
        </div>
      </section>

      {/* Section: Installation Guide (Phase 03) */}
      <section
        id="install"
        className="mx-auto max-w-6xl px-6 py-20 border-t border-white/5"
      >
        <div className="mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d87aff] mb-2">
            Phase 03
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
            Complete Installation Walkthrough
          </h2>
          <p className="text-zinc-400 max-w-2xl text-base">
            Follow these sequential steps to clone the repository, install the
            dependencies, deploy fonts, and link your configuration files.
          </p>
        </div>

        <div className="space-y-10">
          {/* Step 1: Clone Repository */}
          <div className="grid lg:grid-cols-[1fr_2fr] gap-6 rounded-2xl border border-white/10 bg-[#0c0c12] p-6">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d87aff]/15 text-lg font-bold text-[#d87aff] mb-4 border border-[#d87aff]/30">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Clone kulj33t's Dotfiles
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                Clone the repository directly to your user folder. The folder
                contains all the dotfile directories under{" "}
                <code className="text-white font-mono bg-white/10 px-1 py-0.5 rounded">
                  .config/
                </code>
                .
              </p>
              <div className="text-[11px] text-zinc-500 font-mono">
                Repository:{" "}
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#d87aff] hover:underline"
                >
                  github.com/kulj33t/dotfiles
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-xl border border-white/5 bg-black/60 p-4 font-mono text-xs">
              <div>
                <div className="text-zinc-500 mb-2 select-none">
                  # Clone via HTTPS:
                </div>
                <div className="text-white mb-4 flex items-center justify-between">
                  <span className="text-[#d87aff] mr-2">$</span>
                  <span className="flex-1 truncate">
                    {PRIMARY_CLONE_COMMAND}
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(PRIMARY_CLONE_COMMAND, "Clone HTTPS")
                    }
                    className="ml-3 text-zinc-400 hover:text-white"
                  >
                    {copied === "Clone HTTPS" ? (
                      <IconCheck className="h-4 w-4 text-green-400" />
                    ) : (
                      <IconCopy className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <div className="text-zinc-500 mb-2 select-none">
                  # Alternatively, clone via SSH:
                </div>
                <div className="text-zinc-300 flex items-center justify-between">
                  <span className="text-[#d87aff] mr-2">$</span>
                  <span className="flex-1 truncate">{SSH_CLONE_COMMAND}</span>
                  <button
                    onClick={() => handleCopy(SSH_CLONE_COMMAND, "Clone SSH")}
                    className="ml-3 text-zinc-400 hover:text-white"
                  >
                    {copied === "Clone SSH" ? (
                      <IconCheck className="h-4 w-4 text-green-400" />
                    ) : (
                      <IconCopy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Install Packages (Dynamic based on selected OS) */}
          <div className="grid lg:grid-cols-[1fr_2fr] gap-6 rounded-2xl border border-white/10 bg-[#0c0c12] p-6">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d87aff]/15 text-lg font-bold text-[#d87aff] mb-4 border border-[#d87aff]/30">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Install Base Dependencies
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                Install all core tools: compositor, bar, terminal, clipboard
                tools (CopyQ + wl-clipboard), lockscreen, and polkit agent.
              </p>

              {/* Distro switcher pills */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {(Object.keys(osCommands) as OsType[]).map((os) => (
                  <button
                    key={os}
                    onClick={() => setActiveOs(os)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                      activeOs === os
                        ? "bg-[#d87aff] text-black font-bold"
                        : "bg-white/[0.04] text-zinc-400 hover:text-white"
                    }`}
                  >
                    {osCommands[os].name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-xl border border-white/5 bg-black/60 p-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                <span className="text-[11px] text-zinc-500 uppercase tracking-wider">
                  {osCommands[activeOs].name} Command
                </span>
                <button
                  onClick={() =>
                    handleCopy(
                      osCommands[activeOs].install,
                      `${activeOs} install`,
                    )
                  }
                  className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white"
                >
                  {copied === `${activeOs} install` ? (
                    <IconCheck className="h-3.5 w-3.5 text-green-400" />
                  ) : (
                    <IconCopy className="h-3.5 w-3.5" />
                  )}
                  <span>
                    {copied === `${activeOs} install` ? "Copied" : "Copy"}
                  </span>
                </button>
              </div>

              <div className="text-white whitespace-pre-wrap leading-relaxed break-all font-mono">
                <span className="text-[#d87aff] select-none font-bold mr-2">
                  $
                </span>
                {osCommands[activeOs].install}
              </div>
            </div>
          </div>

          {/* Step 3: Install Fonts */}
          <div className="grid lg:grid-cols-[1fr_2fr] gap-6 rounded-2xl border border-white/10 bg-[#0c0c12] p-6">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d87aff]/15 text-lg font-bold text-[#d87aff] mb-4 border border-[#d87aff]/30">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                JetBrains Mono Nerd Font
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                Waybar and Kitty depend on Nerd Font glyphs for battery, volume,
                workspaces, and system meters. Without this font, symbols will
                render as missing square boxes.
              </p>
              <a
                href="https://www.nerdfonts.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#d87aff] hover:underline font-mono"
              >
                <span>nerdfonts.com</span>
                <IconExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="rounded-xl border border-white/5 bg-black/60 p-4 font-mono text-xs text-zinc-300 flex flex-col justify-between">
              <div className="text-zinc-500 mb-2 select-none">
                # Download release & refresh font cache:
              </div>
              <div className="space-y-2 mb-4">
                <div>mkdir -p ~/.local/share/fonts</div>
                <div>
                  wget
                  https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
                </div>
                <div>unzip JetBrainsMono.zip -d ~/.local/share/fonts/</div>
                <div>fc-cache -fv</div>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    "mkdir -p ~/.local/share/fonts && wget https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip && unzip JetBrainsMono.zip -d ~/.local/share/fonts/ && fc-cache -fv",
                    "Font Command",
                  )
                }
                className="self-start inline-flex items-center gap-1.5 text-xs text-[#d87aff] hover:text-white"
              >
                {copied === "Font Command" ? (
                  <IconCheck className="h-3.5 w-3.5" />
                ) : (
                  <IconCopy className="h-3.5 w-3.5" />
                )}
                <span>
                  {copied === "Font Command"
                    ? "Copied All Font Commands"
                    : "Copy All Commands"}
                </span>
              </button>
            </div>
          </div>

          {/* Step 4: Apply Configurations */}
          <div className="grid lg:grid-cols-[1fr_2fr] gap-6 rounded-2xl border border-white/10 bg-[#0c0c12] p-6">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d87aff]/15 text-lg font-bold text-[#d87aff] mb-4 border border-[#d87aff]/30">
                4
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Deploy Configuration Files
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                Deploy the files to your{" "}
                <code className="text-white font-mono bg-white/10 px-1 py-0.5 rounded">
                  ~/.config/
                </code>{" "}
                directory. You can use standard copy or GNU Stow symlinks.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Option A */}
              <div className="rounded-xl border border-white/5 bg-black/60 p-4 font-mono text-xs flex flex-col justify-between">
                <div>
                  <div className="text-[#d87aff] font-bold mb-1">
                    Option A: GNU Stow (Recommended)
                  </div>
                  <div className="text-zinc-500 text-[11px] mb-3">
                    Creates symlinks so git pulls auto-update configs:
                  </div>
                  <div className="text-zinc-200 space-y-1 mb-4">
                    <div>cd dotfiles</div>
                    <div>stow .config</div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleCopy("cd dotfiles && stow .config", "Stow Command")
                  }
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white"
                >
                  {copied === "Stow Command" ? (
                    <IconCheck className="h-3.5 w-3.5 text-green-400" />
                  ) : (
                    <IconCopy className="h-3.5 w-3.5" />
                  )}
                  <span>Copy Stow</span>
                </button>
              </div>

              {/* Option B */}
              <div className="rounded-xl border border-white/5 bg-black/60 p-4 font-mono text-xs flex flex-col justify-between">
                <div>
                  <div className="text-white font-bold mb-1">
                    Option B: Direct Copy
                  </div>
                  <div className="text-zinc-500 text-[11px] mb-3">
                    Safely copies files without linking:
                  </div>
                  <div className="text-zinc-200 mb-4">
                    cp -r dotfiles/.config/* ~/.config/
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleCopy(
                      "cp -r dotfiles/.config/* ~/.config/",
                      "Copy Command",
                    )
                  }
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white"
                >
                  {copied === "Copy Command" ? (
                    <IconCheck className="h-3.5 w-3.5 text-green-400" />
                  ) : (
                    <IconCopy className="h-3.5 w-3.5" />
                  )}
                  <span>Copy Command</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Keybindings Cheatsheet (Phase 04) */}
      <section
        id="keybinds"
        className="mx-auto max-w-6xl px-6 py-20 border-t border-white/5"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d87aff] mb-2 flex items-center gap-2">
              <IconKeyboard className="h-3.5 w-3.5" />
              <span>Phase 04</span>
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
              Keybindings Cheatsheet
            </h2>
            <p className="text-zinc-400 max-w-2xl text-base">
              Supercharge your productivity with these pre-configured key
              shortcuts. The default modifier key is{" "}
              <strong className="text-white font-mono">SUPER</strong> (the
              Windows / Command key).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative min-w-[220px]">
              <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search shortcuts..."
                value={keybindSearch}
                onChange={(e) => setKeybindSearch(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/40 pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-[#d87aff] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
          {[
            "All",
            "Launchers",
            "Window Management",
            "Workspaces",
            "Session & Security",
          ].map((filter) => (
            <button
              key={filter}
              onClick={() => setKeybindFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                keybindFilter === filter
                  ? "bg-[#d87aff] text-black font-bold"
                  : "bg-white/[0.03] text-zinc-400 hover:text-white border border-white/5"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Keybindings Table */}
        <div className="rounded-2xl border border-white/10 bg-[#0c0c12] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b border-white/10 bg-white/[0.02] text-zinc-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-6 font-semibold">Keybinding</th>
                  <th className="py-3.5 px-6 font-semibold">Action</th>
                  <th className="py-3.5 px-6 font-semibold hidden sm:table-cell">
                    Category
                  </th>
                  <th className="py-3.5 px-6 font-semibold hidden md:table-cell">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredKeybindings.map((kb) => (
                  <tr
                    key={kb.combo}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3.5 px-6 whitespace-nowrap">
                      <kbd className="inline-block rounded-md border border-[#d87aff]/30 bg-[#d87aff]/10 px-2.5 py-1 text-xs font-mono font-bold text-[#d87aff] shadow-sm">
                        {kb.combo}
                      </kbd>
                    </td>
                    <td className="py-3.5 px-6 font-sans font-semibold text-white whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {kb.combo === "SUPER + V" && (
                          <IconClipboard className="h-4 w-4 text-[#d87aff] shrink-0" />
                        )}
                        {kb.combo === "SUPER + L" && (
                          <IconLock className="h-4 w-4 text-red-400 shrink-0" />
                        )}
                        <span>{kb.action}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 text-zinc-400 hidden sm:table-cell whitespace-nowrap">
                      <span className="rounded bg-white/[0.04] px-2 py-0.5 text-[10px]">
                        {kb.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 font-sans text-zinc-400 text-xs hidden md:table-cell">
                      {kb.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section: Comprehensive README.md Documentation Hub (Phase 05) */}
      <section
        id="readme"
        className="mx-auto max-w-6xl px-6 py-20 border-t border-white/5"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d87aff] mb-2 flex items-center gap-2">
              <IconBookOpen className="h-3.5 w-3.5" />
              <span>Phase 05</span>
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
              README & Documentation Hub
            </h2>
            <p className="text-zinc-400 max-w-2xl text-base">
              The full, production-ready{" "}
              <code className="text-white font-mono bg-white/10 px-1 py-0.5 rounded">
                README.md
              </code>{" "}
              for kulj33t's dotfiles repository. Switch between the rich visual
              format or copy the raw GitHub markdown.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-xl border border-white/10 bg-black/40 p-1">
              <button
                onClick={() => setReadmeMode("visual")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  readmeMode === "visual"
                    ? "bg-[#d87aff] text-black font-bold shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Visual Guide
              </button>
              <button
                onClick={() => setReadmeMode("raw")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  readmeMode === "raw"
                    ? "bg-[#d87aff] text-black font-bold shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Raw README.md
              </button>
            </div>

            <button
              onClick={() => handleCopy(RAW_README_MD, "Full README.md")}
              className="inline-flex items-center gap-2 rounded-xl bg-white/[0.06] border border-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-[#d87aff]/15 hover:border-[#d87aff]/40 transition-all cursor-pointer"
            >
              {copied === "Full README.md" ? (
                <IconCheck className="h-3.5 w-3.5 text-green-400" />
              ) : (
                <IconCopy className="h-3.5 w-3.5 text-[#d87aff]" />
              )}
              <span>
                {copied === "Full README.md"
                  ? "Copied README.md"
                  : "Copy README.md"}
              </span>
            </button>

            <button
              onClick={downloadReadme}
              className="inline-flex items-center gap-2 rounded-xl bg-[#d87aff] px-4 py-2 text-xs font-bold text-black hover:bg-[#e494ff] transition-all cursor-pointer"
              title="Download README.md directly"
            >
              <IconDownload className="h-3.5 w-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* README Content Container */}
        <div className="rounded-2xl border border-white/10 bg-[#0c0c14] shadow-2xl overflow-hidden">
          {readmeMode === "visual" ? (
            <div className="p-8 md:p-12 space-y-10 text-zinc-300">
              {/* Header Box */}
              <div className="border-b border-white/10 pb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-1 text-xs font-mono">
                    Hyprland v0.40+
                  </span>
                  <span className="rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-1 text-xs font-mono">
                    Arch | Fedora | openSUSE
                  </span>
                  <span className="rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 text-xs font-mono">
                    MIT License
                  </span>
                  <span className="rounded-md bg-pink-500/20 text-pink-300 border border-pink-500/30 px-2.5 py-1 text-xs font-mono">
                    JetBrains Mono Nerd Font
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
                  kulj33t's Dotfiles — Hyprland & Wayland Rice
                </h3>
                <p className="text-base text-zinc-400 leading-relaxed max-w-3xl">
                  A high-aesthetic, lightning-fast tiling window manager
                  environment built for daily programming, terminal immersion,
                  and zero-distraction focus.
                </p>
              </div>

              {/* Quick Installation in 3 Steps */}
              <div>
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-[#d87aff]">#</span>
                  <span>Quickstart in 3 Steps</span>
                </h4>

                <div className="space-y-4">
                  <div className="rounded-xl border border-white/5 bg-black/40 p-4 font-mono text-xs">
                    <div className="text-zinc-500 mb-1">
                      1. Clone repository:
                    </div>
                    <div className="text-white">
                      $ git clone https://github.com/kulj33t/dotfiles && cd
                      dotfiles
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-black/40 p-4 font-mono text-xs">
                    <div className="text-zinc-500 mb-1">
                      2. Install packages (Arch Linux):
                    </div>
                    <div className="text-white">
                      $ sudo pacman -S hyprland waybar wofi kitty swaybg
                      swayidle swaylock copyq mako grim slurp wl-clipboard
                      polkit-kde-agent ttf-jetbrains-mono-nerd stow
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-black/40 p-4 font-mono text-xs">
                    <div className="text-zinc-500 mb-1">
                      3. Apply symlinks & start:
                    </div>
                    <div className="text-white">$ stow .config && Hyprland</div>
                  </div>
                </div>
              </div>

              {/* Included Components Grid */}
              <div>
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-[#d87aff]">#</span>
                  <span>Environment Stack</span>
                </h4>

                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="text-zinc-500 uppercase text-[10px] mb-1">
                      Compositor
                    </div>
                    <div className="text-white font-bold text-sm">Hyprland</div>
                    <div className="text-zinc-400 text-[11px] mt-1">
                      Bezier animations, blur
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="text-zinc-500 uppercase text-[10px] mb-1">
                      Status Bar
                    </div>
                    <div className="text-white font-bold text-sm">Waybar</div>
                    <div className="text-zinc-400 text-[11px] mt-1">
                      CSS styled floating bar
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="text-zinc-500 uppercase text-[10px] mb-1">
                      Terminal
                    </div>
                    <div className="text-white font-bold text-sm">Kitty</div>
                    <div className="text-zinc-400 text-[11px] mt-1">
                      GPU accelerated OpenGL
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="text-zinc-500 uppercase text-[10px] mb-1">
                      App Launcher
                    </div>
                    <div className="text-white font-bold text-sm">Wofi</div>
                    <div className="text-zinc-400 text-[11px] mt-1">
                      Fuzzy search & CSS theming
                    </div>
                  </div>
                </div>
              </div>

              {/* Hardware & Nvidia Advisory */}
              <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-6">
                <h4 className="text-base font-bold text-yellow-300 mb-2 flex items-center gap-2">
                  <IconTriangleAlert className="h-4 w-4" />
                  <span>Nvidia GPU Configuration</span>
                </h4>
                <p className="text-xs text-yellow-200/80 leading-relaxed mb-3">
                  If running on an Nvidia card with proprietary drivers, declare
                  these environment variables in your{" "}
                  <code className="bg-yellow-500/10 px-1 py-0.5 rounded text-yellow-200 font-mono">
                    hyprland.conf
                  </code>{" "}
                  to prevent black screens or flickering cursors:
                </p>
                <div className="bg-black/60 rounded-lg p-3 font-mono text-xs text-yellow-100">
                  env = LIBVA_DRIVER_NAME,nvidia
                  <br />
                  env = XDG_SESSION_TYPE,wayland
                  <br />
                  env = GBM_BACKEND,nvidia-drm
                  <br />
                  env = __GLX_VENDOR_LIBRARY_NAME,nvidia
                  <br />
                  env = WLR_NO_HARDWARE_CURSORS,1
                </div>
              </div>

              {/* GitHub Repo Link Badge */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-[#d87aff]/30 bg-[#d87aff]/5">
                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    Ready to inspect the live Git tree?
                  </h4>
                  <p className="text-xs text-zinc-400">
                    View source code, commit history, and submit issues directly
                    on GitHub.
                  </p>
                </div>
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#d87aff] px-5 py-2.5 text-xs font-bold text-black hover:bg-[#e494ff] transition-all"
                >
                  <IconGithub className="h-4 w-4" />
                  <span>Open github.com/kulj33t/dotfiles</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-black/70 font-mono text-xs text-zinc-300 overflow-x-auto max-h-[600px] scrollbar-thin">
              <pre className="leading-relaxed">
                <code>{RAW_README_MD}</code>
              </pre>
            </div>
          )}
        </div>
      </section>

      {/* Section: Operations & Troubleshooting (Phase 06) */}
      <section
        id="troubleshooting"
        className="mx-auto max-w-6xl px-6 py-20 border-t border-white/5"
      >
        <div className="mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d87aff] mb-2">
            Phase 06
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
            Operations & Troubleshooting
          </h2>
          <p className="text-zinc-400 max-w-2xl text-base">
            Common edge cases encountered with Wayland window managers,
            including graphical authentication prompts, multi-monitor
            configuration, and sound servers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.03] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-yellow-400 mb-3 font-bold text-sm">
                <IconTriangleAlert className="h-4 w-4" />
                <span>Nvidia Black Screen</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                If Hyprland fails to draw or displays an invisible cursor on
                Nvidia, ensure hardware cursors are disabled via:
              </p>
              <div className="rounded-lg bg-black/60 p-2.5 font-mono text-[11px] text-yellow-300 border border-yellow-500/20">
                env = WLR_NO_HARDWARE_CURSORS,1
              </div>
            </div>
            <div className="mt-4 text-[10px] text-zinc-500 font-mono">
              Also check: nvidia-drm.modeset=1 in kernel cmdline.
            </div>
          </div>

          <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-red-400 mb-3 font-bold text-sm">
                <IconShieldAlert className="h-4 w-4" />
                <span>Polkit Authentication</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                If root GUI utilities fail to trigger password dialogs, verify
                that an authentication agent is starting automatically:
              </p>
              <div className="rounded-lg bg-black/60 p-2.5 font-mono text-[11px] text-red-300 border border-red-500/20">
                exec-once = /usr/lib/polkit-kde-authentication-agent-1
              </div>
            </div>
            <div className="mt-4 text-[10px] text-zinc-500 font-mono">
              Fedora uses /usr/libexec/polkit-gnome-authentication-agent-1.
            </div>
          </div>

          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.03] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-blue-400 mb-3 font-bold text-sm">
                <IconTerminal className="h-4 w-4" />
                <span>Waybar Debugging</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                If the status bar crashes or does not render on start, execute
                it in a terminal to inspect stderr JSON parsing errors:
              </p>
              <div className="rounded-lg bg-black/60 p-2.5 font-mono text-[11px] text-blue-300 border border-blue-500/20">
                waybar -l trace
              </div>
            </div>
            <div className="mt-4 text-[10px] text-zinc-500 font-mono">
              Usually indicates a missing Nerd Font or trailing JSON comma.
            </div>
          </div>
        </div>
      </section>

      {/* Floating Back To Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#0d0d14]/90 text-zinc-300 shadow-2xl backdrop-blur-md hover:border-[#d87aff] hover:text-white transition-all cursor-pointer"
          title="Scroll to top"
        >
          <IconArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 pt-16 pb-12 text-center flex flex-col items-center justify-center gap-6">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            Portfolio Home
          </Link>
          <span className="text-zinc-600">•</span>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-zinc-400 hover:text-[#d87aff] transition-colors"
          >
            GitHub Repository
          </a>
          <span className="text-zinc-600">•</span>
          <a
            href="https://github.com/kulj33t"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            @kulj33t on GitHub
          </a>
        </div>

        <div className="font-bold tracking-tight text-xl text-white">
          dot<span className="text-[#d87aff]">Files</span>
        </div>

        <p className="text-xs font-medium text-zinc-500 max-w-md text-center leading-relaxed">
          Open-source Linux configuration files crafted by{" "}
          <a
            href="https://github.com/kulj33t"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-300 hover:text-white underline underline-offset-4"
          >
            Kuljeet
          </a>
          . Released under the MIT License.
        </p>
      </footer>
    </div>
  );
}
