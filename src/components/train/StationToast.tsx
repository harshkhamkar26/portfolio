"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StationData } from "./useTrainScroll";

interface StationToastProps {
  currentStation: StationData;
}

/**
 * Vintage Enamel & Cast Brass Railway Station Plaque Notification
 * Matches the classic luxury railway aesthetic with Victorian serif typography.
 */
export function StationToast({ currentStation }: StationToastProps) {
  const [prevStationId, setPrevStationId] = useState(currentStation.id);
  const [visible, setVisible] = useState(true);

  // Sync state during render when station prop changes
  if (currentStation.id !== prevStationId) {
    setPrevStationId(currentStation.id);
    setVisible(true);
  }

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      setVisible(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, [visible, currentStation.id]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-16 left-1/2 -translate-x-1/2 z-40 select-none"
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            key={currentStation.id}
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center gap-3 border border-[#d4af37]/80 bg-[#14161c]/95 px-4 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.85)] backdrop-blur-md rounded-xs"
          >
            {/* Vintage Brass Station Lantern Beacon */}
            <div className="relative flex h-2.5 w-2.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4af37] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d4af37] shadow-[0_0_8px_#ffd23a]" />
            </div>

            {/* Arriving Station Information (Victorian Serif Callout) */}
            <div className="flex items-baseline gap-2 font-serif">
              <span className="text-[10px] uppercase tracking-widest text-[#d4af37]/85">
                NOW CALLING AT:
              </span>
              <span className="text-[11px] font-bold tracking-wider text-[#ffd23a]">
                STATION NO. {currentStation.no}
              </span>
              <span className="text-[#d4af37]/40">·</span>
              <span className="text-[12px] font-bold tracking-widest text-[#ece5d5] uppercase">
                {currentStation.name}
              </span>
            </div>

            {/* Classic Brass Seal Indicator */}
            <span className="hidden sm:inline-block border border-[#d4af37]/60 bg-[#d4af37]/10 px-2 py-0.5 font-serif text-[9px] text-[#e5c07b] uppercase tracking-widest">
              SCHEDULED STOP
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
