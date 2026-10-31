"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StationData } from "./useTrainScroll";
import { sounds } from "@/components/layout/sound-manager";

interface StationToastProps {
  currentStation: StationData;
}

export function StationToast({ currentStation }: StationToastProps) {
  const [visible, setVisible] = useState(false);
  const prevStationIndexRef = useRef(currentStation.index);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // When station index changes, trigger toast flash
    if (prevStationIndexRef.current !== currentStation.index) {
      prevStationIndexRef.current = currentStation.index;
      setVisible(true);

      // Audio feedback when crossing station waypoint
      sounds.playSwitch();

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setVisible(false);
      }, 3400);
    }
  }, [currentStation.index]);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed top-18 sm:top-20 inset-x-0 z-40 flex justify-center px-4 select-none"
    >
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={currentStation.id}
            initial={{ opacity: 0, y: -20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex items-center gap-3 border border-[#3ad7ff]/40 bg-[#16181c]/95 px-4 py-2 shadow-[0_0_24px_rgba(58,215,255,0.25)] backdrop-blur-xl"
          >
            {/* Blinking track sensor pulse */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9dfc3f] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#9dfc3f]" />
            </span>

            {/* Station Arrival Text */}
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff6a1a]">
                WAYPOINT APPROACHING //
              </span>
              <span className="font-mono text-xs font-black uppercase tracking-wider text-white">
                STATION {currentStation.no} · {currentStation.name}
              </span>
              <span className="hidden sm:inline font-mono text-[10px] text-[#ece5d5]/60">
                [{currentStation.label}]
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
