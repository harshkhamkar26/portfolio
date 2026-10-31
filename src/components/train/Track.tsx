"use client";

import { useTransform, motion, MotionValue, useReducedMotion } from "framer-motion";

interface TrackProps {
  smoothProgress: MotionValue<number>;
  scrollPercent: number;
  isTerminus: boolean;
}

export function Track({ smoothProgress, scrollPercent, isTerminus }: TrackProps) {
  const shouldReduceMotion = useReducedMotion();

  // Sleepers translate leftward based on scroll (forward motion illusion)
  // We translate across a 3200px span for seamless high-speed track motion
  const sleeperTranslateX = useTransform(smoothProgress, [0, 1], ["0px", "-3200px"]);

  // Origin platform fades out as train departs (0 -> 14% scroll)
  const originPlatformOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);
  const originPlatformX = useTransform(smoothProgress, [0, 0.14], ["0px", "-450px"]);

  // Terminus buffer & platform fades in as train arrives (88 -> 100% scroll)
  const terminusPlatformOpacity = useTransform(smoothProgress, [0.86, 0.98], [0, 1]);
  const terminusPlatformX = useTransform(smoothProgress, [0.86, 1], ["300px", "0px"]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-20 h-16 sm:h-20 select-none overflow-hidden"
    >
      {/* Track Ballast Base */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0e0f13] via-[#16181c] to-transparent border-t border-white/[0.06]" />

      {/* ─────────────────────────────────────────────────────────────
          MOVING RAIL SLEEPERS (TIES)
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{ x: shouldReduceMotion ? "0px" : sleeperTranslateX }}
        className="absolute bottom-3 left-0 flex h-4 w-[6000px] gap-6 will-change-transform"
      >
        {Array.from({ length: 180 }).map((_, i) => (
          <div
            key={i}
            className="h-full w-4 shrink-0 rounded-xs bg-gradient-to-b from-[#2a2c34] to-[#121316] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_2px_4px_rgba(0,0,0,0.8)] border-x border-black/40"
          >
            {/* Fastener bolts */}
            <div className="mx-auto mt-0.5 h-1 w-2 rounded-xs bg-[#ff6a1a]/30" />
            <div className="mx-auto mt-1 h-1 w-2 rounded-xs bg-[#3ad7ff]/30" />
          </div>
        ))}
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          TWIN CONTINUOUS STEEL RAILS
          ───────────────────────────────────────────────────────────── */}
      {/* Lower Rail */}
      <div className="absolute bottom-5 inset-x-0 h-[3px] bg-gradient-to-r from-[#3a3d47] via-[#8c919e] to-[#3a3d47] shadow-[0_1px_0_#ece5d5,0_0_8px_rgba(58,215,255,0.4)]" />
      {/* Upper Running Rail */}
      <div className="absolute bottom-9 inset-x-0 h-[2px] bg-gradient-to-r from-[#2f323a] via-[#747986] to-[#2f323a] shadow-[0_1px_0_rgba(255,255,255,0.3)]" />

      {/* ─────────────────────────────────────────────────────────────
          ORIGIN DEPARTURE PLATFORM (#hero, 0% Scroll)
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          opacity: shouldReduceMotion ? 1 : originPlatformOpacity,
          x: shouldReduceMotion ? "0px" : originPlatformX,
        }}
        className="absolute bottom-3 left-4 sm:left-12 flex items-end gap-3 will-change-transform"
      >
        {/* Origin Station Signboard */}
        <div className="border border-[#ff6a1a] bg-[#16181c]/95 px-3 py-1.5 shadow-[0_0_20px_rgba(255,106,26,0.35)] backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#ff6a1a] animate-ping" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-[#ff6a1a]">
              ORIGIN · STATION 01
            </span>
          </div>
          <p className="font-mono text-[9px] text-[#ece5d5]/60 tracking-wider">
            PLATFORM 01 · DEPARTURE READY
          </p>
        </div>

        {/* Platform Concrete Edge with Yellow Hazard Chevrons */}
        <div className="hidden sm:block h-6 w-56 border-t-2 border-[#ffd23a] hazard-stripe opacity-75" />
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          FINAL TERMINUS PLATFORM & BUFFER STOP (#terminal, 100% Scroll)
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          opacity: shouldReduceMotion ? (isTerminus ? 1 : 0) : terminusPlatformOpacity,
          x: shouldReduceMotion ? "0px" : terminusPlatformX,
        }}
        className="absolute bottom-2 right-4 sm:right-12 flex items-end gap-3 will-change-transform"
      >
        {/* Platform Concrete Buffer Edge */}
        <div className="hidden sm:block h-6 w-48 border-t-2 border-[#ff2e97] hazard-stripe opacity-80" />

        {/* Heavy Hydraulic Terminal Buffer */}
        <div className="relative flex flex-col items-center">
          {/* Hydraulic Ram Piston */}
          <div className="h-7 w-8 border border-[#ece5d5]/30 bg-[#232630] shadow-lg flex items-center justify-center">
            <div className="h-4 w-4 rounded-xs bg-[#ff6a1a]/80 animate-pulse" />
          </div>
          <div className="h-5 w-12 bg-gradient-to-b from-[#ff2e97] to-[#16181c] border border-white/20" />
        </div>

        {/* Dual-Aspect Station Track Signal Post */}
        <div className="flex flex-col items-center">
          {/* Signal Head */}
          <div className="flex flex-col gap-1.5 rounded-sm border border-white/20 bg-black/90 p-1.5 shadow-2xl">
            {/* RED Aspect: Lit during journey, extinguishes at terminus */}
            <div
              className={`h-3 w-3 rounded-full transition-all duration-500 ${
                scrollPercent >= 96
                  ? "bg-[#ff2e97]/20 border border-white/10"
                  : "bg-[#ff2e97] shadow-[0_0_12px_#ff2e97] animate-pulse"
              }`}
            />
            {/* GREEN Aspect: Ignites when arrival at Terminus is reached */}
            <div
              className={`h-3 w-3 rounded-full transition-all duration-500 ${
                scrollPercent >= 96
                  ? "bg-[#9dfc3f] shadow-[0_0_16px_#9dfc3f] scale-110"
                  : "bg-[#9dfc3f]/20 border border-white/10"
              }`}
            />
          </div>
          {/* Mast Pole */}
          <div className="h-8 w-1.5 bg-[#3a3d47]" />
        </div>

        {/* Terminus Station Sign */}
        <div className="border border-[#9dfc3f] bg-[#16181c]/95 px-3 py-1.5 shadow-[0_0_24px_rgba(157,252,63,0.35)] backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                scrollPercent >= 96 ? "bg-[#9dfc3f] animate-ping" : "bg-[#ff2e97]"
              }`}
            />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-[#9dfc3f]">
              TERMINUS · STATION 08
            </span>
          </div>
          <p className="font-mono text-[9px] text-[#ece5d5]/60 tracking-wider">
            COMMS TERMINAL · BRAKE LOCKED
          </p>
        </div>
      </motion.div>
    </div>
  );
}
