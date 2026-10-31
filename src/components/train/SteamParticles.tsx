"use client";

import { useTransform, motion, MotionValue, useReducedMotion } from "framer-motion";

interface SteamParticlesProps {
  smoothProgress: MotionValue<number>;
  speedFactor: MotionValue<number>;
  scrollPercent: number;
}

// Pre-calculated deterministic trajectories for brake spark particles (pure rendering)
const FRONT_SPARKS = [
  { x: -32, y: -18, delay: 0.05, repeatDelay: 0.1 },
  { x: -48, y: -26, delay: 0.13, repeatDelay: 0.08 },
  { x: -25, y: -12, delay: 0.21, repeatDelay: 0.14 },
  { x: -42, y: -22, delay: 0.29, repeatDelay: 0.06 },
  { x: -55, y: -15, delay: 0.37, repeatDelay: 0.12 },
];

const REAR_SPARKS = [
  { x: -28, y: -14, delay: 0.04, repeatDelay: 0.09 },
  { x: -40, y: -20, delay: 0.11, repeatDelay: 0.13 },
  { x: -22, y: -9, delay: 0.18, repeatDelay: 0.07 },
  { x: -36, y: -18, delay: 0.25, repeatDelay: 0.11 },
  { x: -46, y: -12, delay: 0.32, repeatDelay: 0.08 },
];

export function SteamParticles({
  smoothProgress,
  speedFactor,
  scrollPercent,
}: SteamParticlesProps) {
  const shouldReduceMotion = useReducedMotion();

  // Steam particle trail follows locomotive position across the track
  const trainX = useTransform(
    smoothProgress,
    [0, 0.14, 0.86, 1],
    ["2vw", "18vw", "22vw", "34vw"]
  );

  // Steam puff opacity and horizontal drift stretch react to scroll speed
  const steamOpacity = useTransform(speedFactor, [0, 0.2, 1], [0.25, 0.45, 0.85]);
  const steamDriftX = useTransform(speedFactor, [0, 1], ["-10px", "-90px"]);

  // Terminus brake event (active when scrollPercent >= 96%)
  const isBrakingTerminus = scrollPercent >= 96;

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      style={{ x: trainX }}
      className="pointer-events-none fixed bottom-12 z-25 select-none will-change-transform"
      aria-hidden="true"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. AMBIENT LOCOMOTIVE ROOF EXHAUST (Cruising Steam Vents)
          ───────────────────────────────────────────────────────────── */}
      <div className="relative left-14 sm:left-24 bottom-6 sm:bottom-10">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={`steam-${i}`}
            style={{
              opacity: steamOpacity,
              x: steamDriftX,
              width: `${24 + i * 8}px`,
              height: `${24 + i * 8}px`,
            }}
            animate={{
              y: [-10, -55 - i * 15],
              x: [0, -35 - i * 22],
              scale: [0.6, 1.8 + i * 0.4],
              opacity: [0.7, 0],
            }}
            transition={{
              duration: 1.8 + i * 0.25,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.35,
            }}
            className="absolute rounded-full bg-gradient-to-tr from-[#ece5d5]/30 via-[#3ad7ff]/15 to-transparent blur-md"
          />
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. FINAL TERMINUS BRAKE SPARKS & PNEUMATIC BURST (100% Scroll)
          ───────────────────────────────────────────────────────────── */}
      {isBrakingTerminus && (
        <>
          {/* Wheel Brake Spark Jets jumping from steel wheels to rail */}
          <div className="absolute left-10 sm:left-20 bottom-[-10px] flex gap-20">
            {/* Front Bogey Sparks */}
            <div className="relative">
              {FRONT_SPARKS.map((spark, s) => (
                <motion.div
                  key={`spark-f-${s}`}
                  animate={{
                    x: [-5, spark.x],
                    y: [0, spark.y],
                    opacity: [1, 0],
                    scale: [1, 0.2],
                  }}
                  transition={{
                    duration: 0.45,
                    repeat: Infinity,
                    repeatDelay: spark.repeatDelay,
                    ease: "easeOut",
                    delay: spark.delay,
                  }}
                  className="absolute h-1.5 w-1.5 rounded-full bg-[#ffd23a] shadow-[0_0_8px_#ff6a1a]"
                />
              ))}
            </div>

            {/* Rear Bogey Sparks */}
            <div className="relative">
              {REAR_SPARKS.map((spark, s) => (
                <motion.div
                  key={`spark-r-${s}`}
                  animate={{
                    x: [-5, spark.x],
                    y: [0, spark.y],
                    opacity: [1, 0],
                    scale: [1, 0.2],
                  }}
                  transition={{
                    duration: 0.4,
                    repeat: Infinity,
                    repeatDelay: spark.repeatDelay,
                    ease: "easeOut",
                    delay: spark.delay,
                  }}
                  className="absolute h-1.5 w-1.5 rounded-full bg-[#ff6a1a] shadow-[0_0_8px_#ffd23a]"
                />
              ))}
            </div>
          </div>

          {/* High-Pressure Pneumatic Air-Brake Cloud Burst */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0, 0.85, 0], scale: [0.6, 2.2, 3] }}
            transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.2, ease: "easeOut" }}
            className="absolute left-6 bottom-[-4px] h-14 w-28 rounded-full bg-[#ece5d5]/40 blur-lg"
          />
        </>
      )}
    </motion.div>
  );
}
