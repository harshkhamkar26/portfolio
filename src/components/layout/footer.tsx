"use client";

import { ArrowUp, Download } from "lucide-react";
import { siteConfig, stationStops } from "@/lib/data/site";
import { sounds } from "@/components/layout/sound-manager";

export function Footer() {
  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStationClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    sounds.playClick();
    const target = document.getElementById(id);
    if (target) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: { offset?: number }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(target, { offset: -60 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="border-t border-[#ece5d5]/15 bg-[#101114] py-14 text-[#ece5d5]">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-14">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-white/10">
          <div>
            <span className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              HARSH KHAMKAR<span className="text-[#ff6a1a]">.</span>
            </span>
            <p className="mt-2 font-mono text-xs text-[#ece5d5]/60 max-w-lg">
              AI/ML Engineer · Data Science Researcher · Financial Analytics · Universal AI University, Mumbai.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 border border-white/20 bg-[#16181c] px-4 py-2 font-mono text-xs font-bold uppercase text-white hover:border-[#ff6a1a] hover:text-[#ff6a1a] transition-all cursor-pointer"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp size={14} />
            </button>

            <a
              href="/resume.pdf"
              download="Harsh_Khamkar_Resume.pdf"
              className="flex items-center gap-2 border-2 border-[#ff6a1a] bg-[#ff6a1a] px-4 py-2 font-mono text-xs font-bold uppercase text-[#16181c] hover:bg-transparent hover:text-[#ff6a1a] transition-all cursor-pointer shadow-[0_0_12px_rgba(255,106,26,0.25)]"
            >
              <Download size={14} />
              <span>GET RESUME</span>
            </a>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            INTERACTIVE FOOTER RAILWAY ROUTE DIRECTORY
            ───────────────────────────────────────────────────────────── */}
        <div className="mt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 font-mono text-xs text-[#ece5d5]/55">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest mr-1">
              ROUTE MAP:
            </span>
            {stationStops.map((st) => (
              <a
                key={st.id}
                href={`#${st.id}`}
                onClick={(e) => handleStationClick(e, st.id)}
                onMouseEnter={() => sounds.playHover()}
                className="group flex items-center gap-1.5 rounded-full border border-white/10 bg-[#161820] px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/60 transition-all hover:border-[#ff6a1a] hover:bg-[#ff6a1a]/10 hover:text-white cursor-pointer"
                title={`Jump to Station ${st.no}: ${st.name}`}
              >
                <span className="font-mono text-[#ff6a1a] font-bold group-hover:text-[#ffd23a]">
                  {st.no}
                </span>
                <span>{st.name}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6 text-xs">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#9dfc3f] transition-colors"
            >
              GitHub
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#3ad7ff] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-[#ff6a1a] transition-colors"
            >
              Email
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center font-mono text-[11px] text-white/40">
          <p>© {new Date().getFullYear()} Harsh Khamkar. Architected, engineered &amp; driven by relentless creative energy.</p>
          <p className="mt-2 sm:mt-0 text-[#9dfc3f]">COORDS: 18.98° N, 72.82° E · MUMBAI, INDIA</p>
        </div>
      </div>
    </footer>
  );
}
