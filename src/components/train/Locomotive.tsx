"use client";

import { useTransform, motion, MotionValue, useReducedMotion } from "framer-motion";

interface LocomotiveProps {
  smoothProgress: MotionValue<number>;
  speedFactor: MotionValue<number>;
  scrollPercent: number;
}

export function Locomotive({ smoothProgress, speedFactor, scrollPercent }: LocomotiveProps) {
  const shouldReduceMotion = useReducedMotion();

  // Wheels rotate based on overall distance traveled (24 full revolutions across page)
  const wheelRotate = useTransform(smoothProgress, [0, 1], [0, 360 * 24]);

  // Locomotive horizontal positioning across the bottom track:
  // - 0 to 12%: Parked at origin platform (x: 4vw)
  // - 12 to 88%: Glides forward to cruising position (x: 20vw on desktop, 12vw on mobile)
  // - 88 to 100%: Decelerates and docks precisely into Station 08 Terminus Buffer (x: 36vw on desktop)
  const trainX = useTransform(
    smoothProgress,
    [0, 0.14, 0.86, 1],
    ["2vw", "18vw", "22vw", "34vw"]
  );

  // Subtle rail suspension bounce & track vibration (dampened when stopped)
  const vibrationY = useTransform(speedFactor, [0, 1], [0, -2]);

  // Headlight beam brightness intensifies with speed
  const headlightBeamOpacity = useTransform(speedFactor, [0, 0.3, 1], [0.35, 0.6, 0.95]);
  const headlightBeamWidth = useTransform(speedFactor, [0, 1], ["220px", "380px"]);

  return (
    <motion.div
      style={{
        x: shouldReduceMotion ? "18vw" : trainX,
        y: shouldReduceMotion ? 0 : vibrationY,
      }}
      className="pointer-events-none fixed bottom-5 z-30 select-none will-change-transform"
      aria-label="The Portfolio Express Locomotive"
    >
      <div className="relative flex items-end">
        {/* ─────────────────────────────────────────────────────────────
            AERODYNAMIC HIGH-SPEED CYBER LOCOMOTIVE CHASSIS
            ───────────────────────────────────────────────────────────── */}
        <div className="relative h-18 w-56 sm:h-24 sm:w-80">
          <svg
            className="h-full w-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)]"
            viewBox="0 0 320 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Aerodynamic Locomotive Body Shell */}
            <path
              d="
                M10 82 
                L20 82 L20 72 L270 72 
                C285 72 300 60 310 46 
                C316 38 318 28 312 24 
                C305 20 285 16 260 16 
                L80 16 
                C50 16 30 24 20 40 
                L10 65 Z
              "
              fill="url(#locoBodyGrad)"
              stroke="rgba(236,229,213,0.25)"
              strokeWidth="1.5"
            />

            {/* Cyber Livery Racing Stripes */}
            <path
              d="M15 62 L260 62 C285 62 300 50 308 42 L310 40 L260 48 L20 48 Z"
              fill="#ff6a1a"
            />
            <path
              d="M25 56 L255 56 C275 56 290 48 298 42 L250 46 L30 46 Z"
              fill="#9dfc3f"
            />

            {/* Aerodynamic Cockpit Glass Visor (Cyan HUD Glow) */}
            <path
              d="M240 22 L275 22 C290 22 298 28 302 36 L248 36 Z"
              fill="#00e5ff"
              opacity="0.85"
            />
            {/* Interior Pilot Console HUD Silhouette */}
            <line x1="260" y1="26" x2="280" y2="26" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
            <circle cx="270" cy="30" r="1.5" fill="#ffd23a" />

            {/* Aerodynamic Roof Air Intake Scoop */}
            <rect x="110" y="10" width="60" height="6" rx="2" fill="#121316" stroke="rgba(255,255,255,0.15)" />
            <line x1="120" y1="13" x2="160" y2="13" stroke="#3ad7ff" strokeWidth="1" />

            {/* High-Voltage Pantograph Retracted Fairing */}
            <path
              d="M50 16 L65 7 L85 16"
              stroke="#3ad7ff"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            {/* Locomotive ID Plate */}
            <g>
              <rect x="172" y="32" width="64" height="12" rx="1" fill="#0d0e12" stroke="#ff6a1a" strokeWidth="0.8" />
              <text
                x="204"
                y="41"
                fill="#ece5d5"
                fontSize="6"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
                letterSpacing="0.08em"
              >
                HK-EXP · {scrollPercent}%
              </text>
            </g>

            {/* Underbody Chassis Bogie Skirt */}
            <rect x="25" y="72" width="240" height="12" fill="#0d0e12" stroke="#252830" strokeWidth="1" />

            {/* High-Intensity Forward Headlight Lenses */}
            <circle cx="310" cy="48" r="4.5" fill="#ffd23a" filter="url(#headlightGlowFilter)" />
            <circle cx="310" cy="48" r="2.5" fill="#ffffff" />
            <circle cx="295" cy="56" r="3" fill="#3ad7ff" />

            {/* Visual Gradients */}
            <defs>
              <linearGradient id="locoBodyGrad" x1="0%" y1="0%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#1e2026" />
                <stop offset="60%" stopColor="#282a34" />
                <stop offset="100%" stopColor="#16181c" />
              </linearGradient>
              <filter id="headlightGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              </filter>
            </defs>
          </svg>

          {/* ─────────────────────────────────────────────────────────────
              VOLUMETRIC FORWARD HEADLIGHT BEAM PROJECTION
              ───────────────────────────────────────────────────────────── */}
          <motion.div
            style={{
              opacity: shouldReduceMotion ? 0.4 : headlightBeamOpacity,
              width: shouldReduceMotion ? "260px" : headlightBeamWidth,
            }}
            className="absolute -right-36 sm:-right-64 top-7 h-16 origin-left -rotate-3 rounded-r-full bg-gradient-to-r from-[#ffd23a]/45 via-[#3ad7ff]/20 to-transparent blur-md pointer-events-none will-change-[width,opacity]"
          />

          {/* ─────────────────────────────────────────────────────────────
              REVOLVING SPOKED BOGIE WHEELSETS (Scroll-driven rotation)
              ───────────────────────────────────────────────────────────── */}
          <div className="absolute -bottom-2 inset-x-8 flex justify-between px-3">
            {/* Front Wheelset */}
            <div className="flex gap-4">
              <WheelUnit rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
              <WheelUnit rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
            </div>

            {/* Rear Wheelset */}
            <div className="flex gap-4">
              <WheelUnit rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
              <WheelUnit rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
            </div>
          </div>
        </div>

        {/* Rear Inter-Carriage Coupling Link */}
        <div className="h-4 w-3 bg-[#3a3d47] border border-white/20 -mr-1 mb-2" />
      </div>
    </motion.div>
  );
}

/**
 * High-precision spoked wheel with mechanical counterweight & bolt hubs
 */
function WheelUnit({
  rotateValue,
  shouldReduceMotion,
}: {
  rotateValue: MotionValue<number>;
  shouldReduceMotion: boolean;
}) {
  return (
    <div className="relative h-6 w-6 sm:h-8 sm:w-8">
      {/* Outer Steel Wheel Flange */}
      <div className="absolute inset-0 rounded-full border-2 border-[#747986] bg-[#121316] shadow-[0_0_8px_rgba(0,0,0,0.9)]" />

      {/* Rotating Spoked Wheel Hub */}
      <motion.div
        style={{ rotate: shouldReduceMotion ? 0 : rotateValue }}
        className="absolute inset-0 flex items-center justify-center will-change-transform"
      >
        <svg className="h-full w-full" viewBox="0 0 40 40" fill="none">
          {/* Wheel rim tread */}
          <circle cx="20" cy="20" r="17" stroke="#3a3d47" strokeWidth="2.5" />
          <circle cx="20" cy="20" r="15" stroke="#9dfc3f" strokeWidth="0.8" opacity="0.4" />

          {/* 6 Radial Spokes */}
          <line x1="20" y1="3" x2="20" y2="37" stroke="#8c919e" strokeWidth="1.8" />
          <line x1="5.3" y1="11.5" x2="34.7" y2="28.5" stroke="#8c919e" strokeWidth="1.8" />
          <line x1="5.3" y1="28.5" x2="34.7" y2="11.5" stroke="#8c919e" strokeWidth="1.8" />

          {/* Counter-weight wedge block */}
          <path d="M12 28 A 15 15 0 0 0 28 28 Z" fill="#ff6a1a" opacity="0.85" />

          {/* Center Axle Bolt Hub */}
          <circle cx="20" cy="20" r="4.5" fill="#252830" stroke="#ece5d5" strokeWidth="1" />
          <circle cx="20" cy="20" r="2" fill="#ffd23a" />
        </svg>
      </motion.div>
    </div>
  );
}
