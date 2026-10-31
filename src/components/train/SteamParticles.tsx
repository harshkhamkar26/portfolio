"use client";

import { useTransform, motion, MotionValue, useReducedMotion } from "framer-motion";

interface SteamParticlesProps {
  smoothProgress: MotionValue<number>;
  speedFactor: MotionValue<number>;
  scrollPercent: number;
}

// Pre-calculated deterministic trajectories for vintage brake sparks (pure rendering)
const FRONT_BRAKE_SPARKS = [
  { x: -28, y: -16, delay: 0.04, repeatDelay: 0.1 },
  { x: -44, y: -24, delay: 0.12, repeatDelay: 0.08 },
  { x: -22, y: -10, delay: 0.19, repeatDelay: 0.15 },
  { x: -38, y: -20, delay: 0.27, repeatDelay: 0.07 },
  { x: -50, y: -14, delay: 0.35, repeatDelay: 0.11 },
];

const REAR_BRAKE_SPARKS = [
  { x: -24, y: -12, delay: 0.05, repeatDelay: 0.09 },
  { x: -36, y: -18, delay: 0.11, repeatDelay: 0.13 },
  { x: -20, y: -8, delay: 0.17, repeatDelay: 0.07 },
  { x: -32, y: -16, delay: 0.24, repeatDelay: 0.12 },
  { x: -42, y: -10, delay: 0.31, repeatDelay: 0.08 },
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
    ["1vw", "16vw", "20vw", "32vw"]
  );

  // Steam puff density, expansion, and horizontal drift react to speed
  const steamOpacity = useTransform(speedFactor, [0, 0.2, 1], [0.35, 0.65, 0.95]);
  const steamDriftX = useTransform(speedFactor, [0, 1], ["-15px", "-120px"]);

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
          1. BILLOWING SMOKESTACK STEAM PLUMES (From Tall Vintage Chimney)
          Positioned right at the smokestack (top-right of locomotive)
          ───────────────────────────────────────────────────────────── */}
      <div className="relative left-60 sm:left-76 bottom-14 sm:bottom-18">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={`steam-plume-${i}`}
            style={{
              opacity: steamOpacity,
              x: steamDriftX,
              width: `${26 + i * 10}px`,
              height: `${26 + i * 10}px`,
            }}
            animate={{
              y: [-6, -65 - i * 18],
              x: [0, -45 - i * 28],
              scale: [0.65, 2.2 + i * 0.45],
              opacity: [0.85, 0],
            }}
            transition={{
              duration: 2.1 + i * 0.25,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.32,
            }}
            className="absolute rounded-full bg-gradient-to-tr from-[#fbf8f1]/50 via-[#e2ded6]/35 to-transparent blur-md"
          />
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. UNDERBODY FIREBOX COAL EMBERS (Flickering under cab)
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute left-28 sm:left-34 bottom-[-4px]">
        <motion.div
          animate={{
            opacity: [0.5, 0.9, 0.6, 1, 0.5],
            scale: [0.95, 1.05, 0.98, 1.08, 0.95],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-3 w-12 rounded-full bg-[#ff7a00] blur-sm shadow-[0_0_14px_#ff3d00]"
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. TERMINUS STEAM BRAKE RELEASE & WHEEL SPARKS (At Station 08)
          ───────────────────────────────────────────────────────────── */}
      {isBrakingTerminus && (
        <>
          {/* Wheel Brake Spark Jets jumping from cast iron brake shoes */}
          <div className="absolute left-32 sm:left-42 bottom-[-8px] flex gap-16">
            {/* Front Bogey Sparks */}
            <div className="relative">
              {FRONT_BRAKE_SPARKS.map((spark, s) => (
                <motion.div
                  key={`spark-f-${s}`}
                  animate={{
                    x: [-4, spark.x],
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

            {/* Rear Driving Wheel Sparks */}
            <div className="relative">
              {REAR_BRAKE_SPARKS.map((spark, s) => (
                <motion.div
                  key={`spark-r-${s}`}
                  animate={{
                    x: [-4, spark.x],
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

          {/* Steam Pressure Cylinder Release Cloud (Pneumatic Hiss) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.9, 0], scale: [0.6, 2.5, 3.2] }}
            transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.0, ease: "easeOut" }}
            className="absolute left-20 bottom-[-4px] h-16 w-36 rounded-full bg-[#fbf8f1]/55 blur-lg"
          />
        </>
      )}
    </motion.div>
  );
}
