"use client";

import { ArrowUp, Download } from "lucide-react";
import { siteConfig, stationStops } from "@/lib/data/site";
import { sounds } from "@/components/layout/sound-manager";

export function Footer() {
  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
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
              Data Science Engineer · B.Tech in Artificial Intelligence &amp; Data Science · Universal AI University, Mumbai.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 border border-white/20 bg-[#16181c] px-4 py-2 font-mono text-xs font-bold uppercase text-white hover:border-[#ff6a1a] hover:text-[#ff6a1a]"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp size={14} />
            </button>

            <a
              href="/resume.pdf"
              download="Harsh_Khamkar_Resume.pdf"
              className="flex items-center gap-2 border-2 border-[#ff6a1a] bg-[#ff6a1a] px-4 py-2 font-mono text-xs font-bold uppercase text-[#16181c] hover:bg-transparent hover:text-[#ff6a1a]"
            >
              <Download size={14} />
              <span>GET RESUME</span>
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-[#ece5d5]/55">
          <div className="flex flex-wrap items-center gap-4">
            {stationStops.map((st) => (
              <a
                key={st.id}
                href={`#${st.id}`}
                className="hover:text-white transition-colors"
              >
                {st.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
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
          <p>© {new Date().getFullYear()} Harsh Khamkar. Replicating the AI Expo / Hack on Track dynamic experience.</p>
          <p className="mt-2 sm:mt-0 text-[#9dfc3f]">COORDS: 18.98° N, 72.82° E · MUMBAI, INDIA</p>
        </div>
      </div>
    </footer>
  );
}
