"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stationStops } from "@/lib/data/site";
import { sounds } from "@/components/layout/sound-manager";

export function LineProgress() {
  const [activeStation, setActiveStation] = useState("hero");
  const [hoveredStation, setHoveredStation] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.38;

      for (let i = stationStops.length - 1; i >= 0; i--) {
        const station = stationStops[i];
        const el = document.getElementById(station.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveStation(station.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    sounds.playClick();
    const el = document.getElementById(id);
    if (el) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement, opts?: { offset?: number }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -60 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const activeIndex = stationStops.findIndex((s) => s.id === activeStation);
  const progressRatio = activeIndex >= 0 ? activeIndex / (stationStops.length - 1) : 0;

  return (
    <nav
      className="hidden md:flex fixed right-4 xl:right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end select-none pointer-events-auto"
      aria-label="Railway station progress"
    >
      <div className="relative flex flex-col items-center py-3">
        {/* Continuous Steel Track Backbone */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-white/10 rounded-full" />

        {/* Dynamic Glowing Live Rail Energy Beam */}
        <motion.div
          animate={{ height: `${progressRatio * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute top-0 w-[2px] bg-gradient-to-b from-[#ffd23a] via-[#ff6a1a] to-[#9dfc3f] shadow-[0_0_12px_#ff6a1a] origin-top rounded-full"
        />

        {/* 8 Interactive Station Waypoint Markers */}
        <div className="relative z-10 flex flex-col items-center gap-4 xl:gap-5">
          {stationStops.map((st, idx) => {
            const isCurrent = activeStation === st.id;
            const isPassed = idx < activeIndex;
            const isHovered = hoveredStation === st.id;

            return (
              <div
                key={st.id}
                className="relative flex items-center justify-end"
                onMouseEnter={() => {
                  setHoveredStation(st.id);
                  sounds.playHover();
                }}
                onMouseLeave={() => setHoveredStation(null)}
              >
                {/* Interactive Flyout Waypoint Telemetry Plaque */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: 8, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 8, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      className="pointer-events-none absolute right-7 z-50 flex items-center gap-2 whitespace-nowrap rounded-xs border border-[#ff6a1a] bg-[#12141a]/95 px-3 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[9px] font-bold text-[#ff6a1a]">
                            STATION {st.no}
                          </span>
                          <span className="text-white/20">|</span>
                          <span className="font-display text-xs font-black uppercase tracking-wider text-white">
                            {st.name}
                          </span>
                        </div>
                        <span className="font-mono text-[8px] text-white/50">
                          {st.label} · CLICK TO CRUISE
                        </span>
                      </div>
                      <span className="rounded-xs bg-[#ff6a1a]/20 px-1 py-0.5 font-mono text-[8px] font-bold text-[#ff6a1a]">
                        {isCurrent ? "DOCKED" : isPassed ? "PASSED" : "EN ROUTE"}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Waypoint Interactive Anchor Button */}
                <a
                  href={`#${st.id}`}
                  aria-current={isCurrent ? "true" : "false"}
                  onClick={(e) => handleClick(e, st.id)}
                  className={`group relative flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-200 hover:scale-125 focus:outline-none cursor-pointer ${
                    isCurrent ? "scale-110" : ""
                  }`}
                  title={`${st.no} · ${st.name}`}
                >
                  {/* Outer Pulsing Aura on Active Station */}
                  {isCurrent && (
                    <span className="absolute inset-0 rounded-full bg-[#ff6a1a]/30 animate-ping opacity-75" />
                  )}

                  {/* Waypoint Dot Capsule */}
                  <div
                    className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border transition-all duration-300 ${
                      isCurrent
                        ? "border-[#ffd23a] bg-[#ff6a1a] shadow-[0_0_14px_#ff6a1a] scale-110"
                        : isPassed
                        ? "border-[#9dfc3f]/80 bg-[#9dfc3f]/40 hover:bg-[#9dfc3f]"
                        : "border-white/25 bg-[#16181c] group-hover:border-white/60 group-hover:bg-[#20222a]"
                    }`}
                  >
                    {isCurrent ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_4px_white]" />
                    ) : isPassed ? (
                      <span className="h-1 w-1 rounded-full bg-[#9dfc3f]" />
                    ) : null}
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
