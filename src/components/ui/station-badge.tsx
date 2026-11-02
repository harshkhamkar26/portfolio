"use client";

import { motion } from "framer-motion";
import { ArrowRight, Navigation } from "lucide-react";
import { sounds } from "@/components/layout/sound-manager";

interface StationBadgeProps {
  stationNo: string;
  title: string;
  nextStationId?: string;
  nextStationName?: string;
  accentColor?: string;
  className?: string;
}

/**
 * Interactive Cyber-Railway Station Waypoint Badge
 * Eye-catching glowing beacon, live status indicator, and interactive waypoint jumping.
 */
export function StationBadge({
  stationNo,
  title,
  nextStationId,
  nextStationName,
  accentColor = "#9dfc3f",
  className = "",
}: StationBadgeProps) {
  const handleNextClick = () => {
    if (!nextStationId) return;
    sounds.playClick();
    const target = document.getElementById(nextStationId);
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
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`inline-flex flex-wrap items-center gap-2 select-none ${className}`}
    >
      {/* Primary Interactive Station Waypoint Capsule */}
      <div
        onMouseEnter={() => sounds.playHover()}
        className="group relative flex items-center gap-2.5 rounded-full border border-white/15 bg-[#14161c]/90 px-3.5 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 hover:border-white/35 hover:shadow-[0_0_20px_rgba(255,106,26,0.25)]"
      >
        {/* Animated Radar Beacon / Waypoint LED */}
        <div className="relative flex h-2.5 w-2.5 items-center justify-center">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            style={{ backgroundColor: accentColor }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full shadow-[0_0_8px]"
            style={{ backgroundColor: accentColor, color: accentColor }}
          />
        </div>

        {/* Station Number Badge */}
        <span
          className="rounded-xs px-1.5 py-0.5 font-mono text-[9px] font-black uppercase tracking-wider text-[#16181c]"
          style={{ backgroundColor: accentColor }}
        >
          STATION {stationNo}
        </span>

        {/* Waypoint Divider */}
        <span className="text-white/20">//</span>

        {/* Station Title */}
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#ece5d5] group-hover:text-white">
          {title}
        </span>

        {/* High-tech telemetry coordinate pulse */}
        <span className="hidden sm:inline-block font-mono text-[8px] text-white/40 tracking-widest pl-1 border-l border-white/10">
          NODE {stationNo}/08
        </span>
      </div>

      {/* Optional Interactive Next Station Cruise Pill */}
      {nextStationId && (
        <button
          onClick={handleNextClick}
          onMouseEnter={() => sounds.playHover()}
          className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-[10px] text-white/60 transition-all hover:border-[#ff6a1a] hover:bg-[#ff6a1a]/10 hover:text-[#ff6a1a] cursor-pointer"
          title={`Cruise to Station ${nextStationName || nextStationId}`}
          aria-label={`Jump to Station ${nextStationName || nextStationId}`}
        >
          <Navigation size={10} className="text-[#ff6a1a] transition-transform group-hover:rotate-45" />
          <span>NEXT: {nextStationName || `STATION`}</span>
          <ArrowRight size={10} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      )}
    </motion.div>
  );
}
