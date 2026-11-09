import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Icons
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
const IconFileText = ({ className = "h-4 w-4" }: { className?: string }) => (
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
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>
);
const IconPrinter = ({ className = "h-4 w-4" }: { className?: string }) => (
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
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect width="12" height="8" x="6" y="14" />
  </svg>
);

export default function ResumePage() {
  const [isMobile, setIsMobile] = useState(false);
  const pdfUrl = "/resume.pdf";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen w-full bg-[#07070a] text-zinc-300 font-sans selection:bg-[#d87aff]/30 selection:text-white relative flex flex-col">
      {/* Background Ambience Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-100 sm:w-175 h-75 bg-[#d87aff]/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#07070a]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
          {/* Back to Portfolio Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 transition-all hover:border-[#d87aff]/50 hover:bg-[#d87aff]/10 hover:text-white"
          >
            <IconArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Portfolio</span>
          </Link>

          {/* Title Badge */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-zinc-400">
            <IconFileText className="h-4 w-4 text-[#d87aff]" />
            <span className="font-bold text-white">Kuljeet Singh</span>
            <span>—</span>
            <span>Resume (PDF)</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/4 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/8 hover:text-white transition-all cursor-pointer"
              title="Print Resume"
            >
              <IconPrinter className="h-3.5 w-3.5" />
              <span>Print</span>
            </button>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/4 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/8 hover:text-white transition-all"
              title="Open PDF directly in new tab"
            >
              <IconExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Open in Tab</span>
            </a>

            <a
              href={pdfUrl}
              download="Kuljeet_Singh_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-lg bg-[#d87aff] px-4 py-1.5 text-xs font-bold text-black hover:bg-[#e494ff] transition-all shadow-md active:scale-95 cursor-pointer"
              title="Download Resume PDF file"
            >
              <IconDownload className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Resume Viewer Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 sm:p-6 max-w-6xl w-full mx-auto">
        {/* Mobile Quick Action Banner */}
        {isMobile && (
          <div className="w-full mb-4 rounded-xl border border-[#d87aff]/30 bg-[#d87aff]/10 p-3.5 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <IconFileText className="h-4 w-4 text-[#d87aff] shrink-0" />
              <span className="text-zinc-200">Viewing resume on mobile</span>
            </div>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 rounded-md bg-[#d87aff] px-2.5 py-1 text-black font-bold text-[11px]"
            >
              <span>Full Screen</span>
              <IconExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}

        {/* Embedded Native PDF Viewer */}
        <div className="w-full flex-1 min-h-[75vh] md:min-h-[82vh] rounded-2xl border border-white/10 bg-[#0d0d14] overflow-hidden shadow-2xl relative flex flex-col">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
            className="w-full h-full flex-1 border-0"
            title="Kuljeet Singh Resume"
          />
        </div>
      </main>
    </div>
  );
}
