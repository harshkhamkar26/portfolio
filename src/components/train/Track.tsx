"use client";

import { useTransform, motion, MotionValue, useReducedMotion } from "framer-motion";

interface TrackProps {
  smoothProgress: MotionValue<number>;
  scrollPercent: number;
  isTerminus: boolean;
}

export function Track({ smoothProgress, isTerminus }: TrackProps) {
  const shouldReduceMotion = useReducedMotion();

  // Wooden sleepers translate rapidly leftward across scroll
  const sleepersX = useTransform(smoothProgress, [0, 1], ["0px", "-960px"]);

  // Mechanical semaphore signal blade drops 45° when clear at Terminus
  const semaphoreRotate = isTerminus ? 45 : 0;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-20 h-16 sm:h-20 select-none overflow-hidden"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. CRUSHED GRANITE STONE BALLAST BEDDING
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0e0f12] via-[#1a1c22] to-transparent border-t border-[#d4af37]/10" />

      {/* ─────────────────────────────────────────────────────────────
          2. VINTAGE WOODEN SLEEPERS / TIMBER TIES (With Cast Iron Plates)
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-x-0 bottom-3 h-5 overflow-hidden">
        <motion.div
          style={{ x: shouldReduceMotion ? 0 : sleepersX }}
          className="flex h-full w-[300vw] items-center gap-6 will-change-transform"
        >
          {Array.from({ length: 90 }).map((_, i) => (
            <div
              key={i}
              className="relative h-3.5 w-2.5 shrink-0 rounded-xs border-t border-[#544435] shadow-[0_2px_4px_rgba(0,0,0,0.85)]"
              style={{
                background:
                  i % 3 === 0
                    ? "#2b2017"
                    : i % 3 === 1
                    ? "#382b20"
                    : "#221811",
              }}
            >
              {/* Cast Iron Tie Plate with Twin Spikes */}
              <div className="absolute top-0.5 inset-x-0.5 h-1 bg-[#1a1b20] border-t border-[#d4af37]/40" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. DUAL POLISHED HEAVY STEEL RAILS
          ───────────────────────────────────────────────────────────── */}
      {/* Top Running Steel Rail with Golden Lantern Sheen */}
      <div className="absolute inset-x-0 bottom-7 h-[2.5px] bg-gradient-to-r from-[#d4af37]/40 via-white to-[#d4af37]/40 shadow-[0_0_8px_rgba(255,245,210,0.35)]" />
      {/* Rail Web Shadow */}
      <div className="absolute inset-x-0 bottom-[26px] h-[1px] bg-black/90" />
      {/* Bottom Guard Rail */}
      <div className="absolute inset-x-0 bottom-4 h-[1.5px] bg-[#3a352d]" />

      {/* ─────────────────────────────────────────────────────────────
          4. STATION 01 ORIGIN PLATFORM (Victorian Cut Stone & Gas Lamp)
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute left-0 bottom-4 flex items-end">
        <div className="flex items-end">
          {/* Brick / Cut Stone Platform Slab */}
          <div className="h-8 w-32 sm:w-48 border-r-2 border-[#d4af37] bg-gradient-to-t from-[#14151a] to-[#25221c] px-3 py-1 shadow-2xl">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-ping" />
              <span className="font-serif text-[9px] font-bold tracking-widest text-[#d4af37]">
                PLATFORM NO. 1
              </span>
            </div>
            <span className="font-serif text-[8px] tracking-wider text-[#ece5d5]/80">
              ORIGIN · WATER TANK BERTH
            </span>
          </div>

          {/* Victorian Cast Iron Gas Lamp Post */}
          <div className="relative mb-2 ml-[-12px] flex flex-col items-center">
            {/* Glowing Lantern Hexagon Head */}
            <div className="h-4 w-4 rounded-xs border border-[#d4af37] bg-[#ffdb65]/30 shadow-[0_0_12px_#ffd23a] flex items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-[#fff2a8] animate-pulse" />
            </div>
            {/* Iron Fluted Post */}
            <div className="h-6 w-1 bg-[#1a1b20] border-x border-[#d4af37]/40" />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. STATION 08 TERMINUS (Timber Buffer Stop & Mechanical Semaphore)
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute right-0 bottom-3 flex items-end">
        <div className="flex items-end gap-2 pr-2">
          {/* Authentic Victorian Mechanical Semaphore Signal Post */}
          <div className="relative flex flex-col items-center mb-1">
            {/* Signal Spectacle Roundel & Arm */}
            <div className="relative h-6 w-10">
              {/* Rotating Semaphore Arm */}
              <motion.div
                animate={{ rotate: semaphoreRotate }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ originX: 0.15, originY: 0.5 }}
                className="absolute left-1 top-1 flex items-center"
              >
                {/* Red Signal Blade with White Stripe */}
                <div className="h-2.5 w-8 bg-[#b82e2e] border border-black flex items-center justify-center shadow-md">
                  <div className="h-full w-2 bg-white" />
                </div>
                {/* Roundel Glasses: Red & Green */}
                <div className="ml-[-3px] flex flex-col gap-0.5">
                  <div
                    className={`h-2 w-2 rounded-full border border-black transition-opacity duration-500 ${
                      !isTerminus ? "bg-red-500 shadow-[0_0_8px_#ef4444]" : "bg-red-950 opacity-30"
                    }`}
                  />
                  <div
                    className={`h-2 w-2 rounded-full border border-black transition-opacity duration-500 ${
                      isTerminus ? "bg-[#9dfc3f] shadow-[0_0_10px_#9dfc3f]" : "bg-emerald-950 opacity-30"
                    }`}
                  />
                </div>
              </motion.div>
            </div>

            {/* Lattice Mast */}
            <div className="h-7 w-1.5 bg-[#1a1b22] border-x border-[#d4af37]/40" />
          </div>

          {/* Heavy Baulk Timber Railway Buffer Stop with Impact Cushions */}
          <div className="flex flex-col items-center border-l-2 border-[#d4af37]/40 bg-[#171920] px-3 py-1.5 shadow-2xl">
            {/* Twin Round Buffer Impact Plates */}
            <div className="flex gap-4 pb-1">
              <div className="h-3 w-3 rounded-full border border-[#d4af37] bg-[#242732] shadow-inner" />
              <div className="h-3 w-3 rounded-full border border-[#d4af37] bg-[#242732] shadow-inner" />
            </div>

            {/* Heavy Timber Crossbeam with Chevron Stripes */}
            <div className="flex h-5 w-20 items-center justify-center border border-[#d4af37] bg-[repeating-linear-gradient(45deg,#121316,#121316_6px,#d4af37_6px,#d4af37_12px)]">
              <span className="bg-black/90 px-1 font-serif text-[8px] font-bold text-[#d4af37]">
                TERMINUS · 08
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
