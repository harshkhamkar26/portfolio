"use client";

import { useTransform, motion, MotionValue, useReducedMotion } from "framer-motion";

interface LocomotiveProps {
  smoothProgress: MotionValue<number>;
  speedFactor: MotionValue<number>;
  scrollPercent: number;
}

/**
 * Classic Steam Locomotive ("The Iron Horse" / Vintage 4-6-2 Pacific Class)
 * Features cast-iron boiler, brass bands, tall chimney, cowcatcher,
 * glowing firebox, round brass lantern headlight, and reciprocating side driving rods.
 */
export function Locomotive({ smoothProgress, speedFactor, scrollPercent }: LocomotiveProps) {
  const shouldReduceMotion = useReducedMotion();

  // Driving wheels rotate based on overall distance traveled (24 full revolutions)
  const wheelRotate = useTransform(smoothProgress, [0, 1], [0, 360 * 24]);

  // Reciprocating side driving rod follows circular crank-pin orbit (radius = 6px)
  const rodX = useTransform(wheelRotate, (r) => Math.cos((r * Math.PI) / 180) * 6);
  const rodY = useTransform(wheelRotate, (r) => Math.sin((r * Math.PI) / 180) * 6);

  // Locomotive horizontal positioning across the bottom track:
  // - 0 to 14%: Standing at Origin Platform 01
  // - 14 to 86%: High-speed cruising through landscape
  // - 86 to 100%: Decelerates and halts at Terminus Buffer
  const trainX = useTransform(
    smoothProgress,
    [0, 0.14, 0.86, 1],
    ["1vw", "16vw", "20vw", "32vw"]
  );

  // Gentle rail suspension bounce & track vibration
  const vibrationY = useTransform(speedFactor, [0, 1], [0, -1.8]);

  // Vintage parabolic lantern headlight beam
  const lanternBeamOpacity = useTransform(speedFactor, [0, 0.3, 1], [0.4, 0.65, 0.95]);
  const lanternBeamWidth = useTransform(speedFactor, [0, 1], ["240px", "390px"]);

  return (
    <motion.div
      style={{
        x: shouldReduceMotion ? "16vw" : trainX,
        y: shouldReduceMotion ? 0 : vibrationY,
      }}
      className="pointer-events-none fixed bottom-5 z-30 select-none will-change-transform"
      aria-hidden="true"
    >
      <div className="relative flex items-end">
        {/* ─────────────────────────────────────────────────────────────
            CLASSIC STEAM LOCOMOTIVE & COAL TENDER (Inline SVG)
            ───────────────────────────────────────────────────────────── */}
        <div className="relative h-22 w-88 sm:h-26 sm:w-104">
          <svg
            className="h-full w-full drop-shadow-[0_16px_32px_rgba(0,0,0,0.95)]"
            viewBox="0 0 420 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 1. COAL TENDER (Fuel & Water Car directly behind cab) */}
            <g id="coal-tender">
              {/* Tender Coal Heap (Textured irregular fuel chunks) */}
              <path
                d="M12 48 Q 28 32, 50 30 Q 75 34, 98 48 Z"
                fill="#121316"
                stroke="#2a2b30"
                strokeWidth="1.2"
              />
              <circle cx="34" cy="38" r="3" fill="#1c1d22" />
              <circle cx="52" cy="35" r="3.5" fill="#18191e" />
              <circle cx="70" cy="37" r="3" fill="#1c1d22" />
              <circle cx="85" cy="42" r="2.5" fill="#18191e" />

              {/* Tender Body Box (Dark Iron with Brass Trim) */}
              <rect
                x="8"
                y="46"
                width="95"
                height="34"
                rx="2"
                fill="url(#tenderBodyGrad)"
                stroke="#3e372e"
                strokeWidth="1.2"
              />
              {/* Tender Gold / Brass Pinstriping */}
              <rect x="12" y="50" width="87" height="26" rx="1" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.75" />
              {/* Tender Rivet Strip */}
              <line x1="8" y1="76" x2="103" y2="76" stroke="#5a5245" strokeWidth="1" strokeDasharray="2,3" />

              {/* Water Tank Filler Cap */}
              <rect x="82" y="42" width="12" height="4" rx="1" fill="#d4af37" stroke="#8c7322" strokeWidth="0.8" />
              {/* Handrail on Tender Rear */}
              <line x1="12" y1="46" x2="12" y2="76" stroke="#d4af37" strokeWidth="1" />
            </g>

            {/* Coupler Link between Tender and Locomotive */}
            <rect x="103" y="66" width="10" height="5" fill="#25272e" stroke="#121316" />

            {/* 2. CABIN (Engineers' Vintage Cab with Arched Windows) */}
            <g id="engineers-cab">
              {/* Cab Floor & Sides */}
              <path
                d="M112 80 L112 30 L168 30 L168 55 L164 80 Z"
                fill="url(#ironLocoGrad)"
                stroke="#3e372e"
                strokeWidth="1.2"
              />
              {/* Curved Overhanging Cab Roof with Eaves */}
              <path
                d="M108 30 C125 24, 155 24, 172 30 L174 33 L106 33 Z"
                fill="#16181d"
                stroke="#d4af37"
                strokeWidth="1"
              />

              {/* Arched Driver's Side Window with Warm Golden Firebox Light */}
              <path
                d="M120 52 L120 40 C120 36, 134 36, 134 40 L134 52 Z"
                fill="url(#warmGlowGrad)"
                stroke="#d4af37"
                strokeWidth="1"
              />
              <path
                d="M142 52 L142 40 C142 36, 156 36, 156 40 L156 52 Z"
                fill="url(#warmGlowGrad)"
                stroke="#d4af37"
                strokeWidth="1"
              />
              {/* Silhouette of Driver Inside Window */}
              <circle cx="149" cy="44" r="3.2" fill="#221e18" opacity="0.85" />
              <path d="M144 52 C144 48, 154 48, 154 52 Z" fill="#221e18" opacity="0.85" />

              {/* Brass Rail / Cab Handrail */}
              <line x1="115" y1="36" x2="115" y2="76" stroke="#d4af37" strokeWidth="1" />
            </g>

            {/* 3. CYLINDRICAL STEAM BOILER & RUNNING BOARD */}
            <g id="steam-boiler">
              {/* Boiler Barrel Cylinder */}
              <rect
                x="166"
                y="34"
                width="168"
                height="46"
                rx="4"
                fill="url(#ironLocoGrad)"
                stroke="#3e372e"
                strokeWidth="1.2"
              />

              {/* Polished Brass Boiler Wrapper Bands */}
              <line x1="195" y1="34" x2="195" y2="80" stroke="#d4af37" strokeWidth="2" />
              <line x1="230" y1="34" x2="230" y2="80" stroke="#d4af37" strokeWidth="2" />
              <line x1="265" y1="34" x2="265" y2="80" stroke="#d4af37" strokeWidth="2" />
              <line x1="300" y1="34" x2="300" y2="80" stroke="#d4af37" strokeWidth="2" />

              {/* Long Polished Brass Running Board Handrail */}
              <line x1="168" y1="62" x2="334" y2="62" stroke="#e5c07b" strokeWidth="1.4" />
              <circle cx="170" cy="62" r="1.5" fill="#d4af37" />
              <circle cx="230" cy="62" r="1.5" fill="#d4af37" />
              <circle cx="290" cy="62" r="1.5" fill="#d4af37" />
              <circle cx="334" cy="62" r="1.5" fill="#d4af37" />

              {/* Polished Brass Steam Dome (Middle Top) */}
              <path
                d="M214 34 C214 22, 234 22, 234 34 Z"
                fill="url(#brassGrad)"
                stroke="#8c7322"
                strokeWidth="1"
              />

              {/* Brass Steam Whistle (Behind Dome) */}
              <line x1="184" y1="34" x2="184" y2="24" stroke="#d4af37" strokeWidth="2" />
              <rect x="182" y="21" width="4" height="4" rx="1" fill="#d4af37" />

              {/* Polished Brass Sand Dome (Forward Top) */}
              <path
                d="M276 34 C276 25, 292 25, 292 34 Z"
                fill="url(#brassGrad)"
                stroke="#8c7322"
                strokeWidth="1"
              />

              {/* Tall Flanged Vintage Chimney / Smokestack */}
              <path
                d="M312 34 L314 14 L308 10 L328 10 L322 14 L324 34 Z"
                fill="url(#chimneyGrad)"
                stroke="#3e372e"
                strokeWidth="1.2"
              />
              {/* Flared Chimney Brass Lip */}
              <ellipse cx="318" cy="10" rx="10" ry="2.5" fill="#d4af37" stroke="#8c7322" strokeWidth="0.8" />
            </g>

            {/* 4. SMOKEBOX, ROUND BOILER DOOR & BRASS NUMBER PLATE */}
            <g id="smokebox-front">
              {/* Front Smokebox Barrel */}
              <path
                d="M334 34 L348 38 C354 44, 354 70, 348 76 L334 80 Z"
                fill="#15161b"
                stroke="#3a3c44"
                strokeWidth="1.2"
              />

              {/* Round Boiler Access Door */}
              <ellipse cx="348" cy="57" rx="3.5" ry="16" fill="#1a1c22" stroke="#504639" strokeWidth="1" />

              {/* Classic Brass Locomotive Number Plate */}
              <rect x="343" y="52" width="10" height="10" rx="1" fill="#d4af37" stroke="#1c1d22" strokeWidth="0.8" />
              <text
                x="348"
                y="59.5"
                fill="#16181c"
                fontSize="5.5"
                fontFamily="serif"
                fontWeight="bold"
                textAnchor="middle"
              >
                26
              </text>

              {/* Locomotive Telemetry Ribbon along running board */}
              <text
                x="250"
                y="56"
                fill="#d4af37"
                fontSize="6"
                fontFamily="serif"
                fontWeight="bold"
                letterSpacing="0.16em"
                opacity="0.85"
              >
                THE HARSH EXPRESS · {scrollPercent}%
              </text>
            </g>

            {/* 5. VINTAGE PARABOLIC LANTERN (Brass Headlight) */}
            <g id="brass-headlight">
              {/* Cast Iron Mounting Bracket */}
              <path d="M346 42 L356 42 L356 46" stroke="#d4af37" strokeWidth="1.5" fill="none" />
              {/* Lantern Housing */}
              <rect x="354" y="32" width="12" height="15" rx="2" fill="url(#brassGrad)" stroke="#8c7322" strokeWidth="1" />
              {/* Beveled Lantern Glass Lens */}
              <ellipse cx="366" cy="39.5" rx="2.5" ry="6.5" fill="#fffbe8" filter="url(#lanternGlowFilter)" />
              <ellipse cx="366" cy="39.5" rx="1.5" ry="4.5" fill="#ffffff" />
            </g>

            {/* 6. PILOT COWCATCHER (Triangular Iron Cattle Guard at Rails) */}
            <g id="cowcatcher">
              <path
                d="M344 80 L378 86 L378 88 L334 88 Z"
                fill="#181a20"
                stroke="#544c3d"
                strokeWidth="1.2"
              />
              {/* Vertical / Diagonal Wooden/Steel Pilot Slats */}
              <line x1="344" y1="80" x2="344" y2="88" stroke="#d4af37" strokeWidth="1.2" />
              <line x1="352" y1="82" x2="352" y2="88" stroke="#d4af37" strokeWidth="1.2" />
              <line x1="360" y1="83.5" x2="360" y2="88" stroke="#d4af37" strokeWidth="1.2" />
              <line x1="368" y1="85" x2="368" y2="88" stroke="#d4af37" strokeWidth="1.2" />
              <line x1="376" y1="86" x2="376" y2="88" stroke="#d4af37" strokeWidth="1.2" />
            </g>

            {/* 7. GLOWING FIREBOX (Coal Grate Under Cab) */}
            <rect x="120" y="78" width="40" height="4" fill="#ff6a1a" opacity="0.8" filter="url(#fireboxGlowFilter)" />

            {/* 8. STEAM CYLINDER & PISTON CASING (Front Running Gear) */}
            <rect x="306" y="74" width="28" height="12" rx="2" fill="#1b1c22" stroke="#504639" strokeWidth="1" />
            <line x1="306" y1="80" x2="334" y2="80" stroke="#d4af37" strokeWidth="1" />

            {/* Gradient & Filter Definitions */}
            <defs>
              <linearGradient id="tenderBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#252830" />
                <stop offset="60%" stopColor="#1a1c22" />
                <stop offset="100%" stopColor="#121317" />
              </linearGradient>
              <linearGradient id="ironLocoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2c2f38" />
                <stop offset="40%" stopColor="#20222a" />
                <stop offset="85%" stopColor="#15161b" />
                <stop offset="100%" stopColor="#0d0e12" />
              </linearGradient>
              <linearGradient id="chimneyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#16181d" />
                <stop offset="50%" stopColor="#2d303a" />
                <stop offset="100%" stopColor="#121316" />
              </linearGradient>
              <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f7e199" />
                <stop offset="40%" stopColor="#d4af37" />
                <stop offset="80%" stopColor="#aa820a" />
                <stop offset="100%" stopColor="#5a4505" />
              </linearGradient>
              <linearGradient id="warmGlowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fff3b0" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ff9800" stopOpacity="0.75" />
              </linearGradient>
              <filter id="lanternGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
              </filter>
              <filter id="fireboxGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
              </filter>
            </defs>
          </svg>

          {/* ─────────────────────────────────────────────────────────────
              WARM GOLDEN PARABOLIC LANTERN BEAM PROJECTION
              ───────────────────────────────────────────────────────────── */}
          <motion.div
            style={{
              opacity: shouldReduceMotion ? 0.45 : lanternBeamOpacity,
              width: shouldReduceMotion ? "270px" : lanternBeamWidth,
            }}
            className="absolute -right-36 sm:-right-68 top-6 h-18 origin-left -rotate-2 rounded-r-full bg-gradient-to-r from-[#ffe894]/50 via-[#ffd23a]/20 to-transparent blur-md pointer-events-none will-change-[width,opacity]"
          />

          {/* ─────────────────────────────────────────────────────────────
              REVOLVING STEEL WHEELSETS (Scroll-driven rotation)
              ───────────────────────────────────────────────────────────── */}
          {/* A. Tender Wheels (2 Dual-Axle Bogies: x ~ 24, 46, 72, 92) */}
          <div className="absolute -bottom-2.5 left-4 flex gap-3.5">
            <ClassicSmallWheel rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
            <ClassicSmallWheel rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
          </div>
          <div className="absolute -bottom-2.5 left-18 flex gap-3.5">
            <ClassicSmallWheel rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
            <ClassicSmallWheel rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
          </div>

          {/* B. Front Pilot Truck (Small Leading Wheel: x ~ 335) */}
          <div className="absolute -bottom-2.5 right-11">
            <ClassicSmallWheel rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
          </div>

          {/* C. 3 Massive Driving Wheels (4-6-2 Pacific Main Wheelset) */}
          <div className="absolute -bottom-4 left-38 flex gap-4">
            <ClassicBigDrivingWheel rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
            <ClassicBigDrivingWheel rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
            <ClassicBigDrivingWheel rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RECIPROCATING SIDE DRIVING ROD (Mechanical linkage in motion!)
              ───────────────────────────────────────────────────────────── */}
          <motion.div
            style={{
              x: shouldReduceMotion ? 0 : rodX,
              y: shouldReduceMotion ? 0 : rodY,
            }}
            className="absolute bottom-[-1px] left-41 pointer-events-none will-change-transform"
          >
            {/* The Horizontal Polished Steel Side Rod */}
            <div className="relative h-2 w-32 rounded-full border border-white/50 bg-gradient-to-r from-[#ece5d5] via-[#8c8e96] to-[#ece5d5] shadow-md flex items-center justify-between px-1">
              {/* Connecting Pins on the 3 Driving Wheel Hubs */}
              <div className="h-2 w-2 rounded-full border border-black bg-[#d4af37]" />
              <div className="h-2 w-2 rounded-full border border-black bg-[#d4af37]" />
              <div className="h-2 w-2 rounded-full border border-black bg-[#d4af37]" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Small Spoked Railway Wheel (Tender & Leading Bogies)
 */
function ClassicSmallWheel({
  rotateValue,
  shouldReduceMotion,
}: {
  rotateValue: MotionValue<number>;
  shouldReduceMotion: boolean;
}) {
  return (
    <motion.div
      style={{ rotate: shouldReduceMotion ? 0 : rotateValue }}
      className="relative h-6 w-6 rounded-full border-2 border-[#d4af37]/70 bg-[#16181c] shadow-[0_2px_4px_rgba(0,0,0,0.9)] will-change-transform"
    >
      {/* 4 Iron Spokes */}
      <div className="absolute inset-x-0 top-1/2 h-[1px] -translate-y-1/2 bg-[#ece5d5]/50" />
      <div className="absolute inset-y-0 left-1/2 w-[1px] -translate-x-1/2 bg-[#ece5d5]/50" />
      <div className="absolute inset-0 m-auto h-[1px] w-full rotate-45 bg-[#ece5d5]/35" />
      <div className="absolute inset-0 m-auto h-[1px] w-full -rotate-45 bg-[#ece5d5]/35" />
      {/* Center Brass Hubcap */}
      <div className="absolute inset-0 m-auto h-2 w-2 rounded-full border border-white/40 bg-[#d4af37]" />
    </motion.div>
  );
}

/**
 * Massive Steam Driving Wheel with Crescent Counterweight & Crank Pin
 */
function ClassicBigDrivingWheel({
  rotateValue,
  shouldReduceMotion,
}: {
  rotateValue: MotionValue<number>;
  shouldReduceMotion: boolean;
}) {
  return (
    <motion.div
      style={{ rotate: shouldReduceMotion ? 0 : rotateValue }}
      className="relative h-9 w-9 rounded-full border-2 border-[#d4af37] bg-[#121316] shadow-[0_4px_8px_rgba(0,0,0,0.95)] will-change-transform"
    >
      {/* 8 Steel Radial Spokes */}
      <div className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-[#ece5d5]/60" />
      <div className="absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-[#ece5d5]/60" />
      <div className="absolute inset-0 m-auto h-[1.5px] w-full rotate-45 bg-[#ece5d5]/45" />
      <div className="absolute inset-0 m-auto h-[1.5px] w-full -rotate-45 bg-[#ece5d5]/45" />
      <div className="absolute inset-0 m-auto h-[1.2px] w-full rotate-[22.5deg] bg-[#ece5d5]/30" />
      <div className="absolute inset-0 m-auto h-[1.2px] w-full -rotate-[22.5deg] bg-[#ece5d5]/30" />

      {/* Cast Iron Crescent Counterweight (Balanced opposite the crank pin) */}
      <div className="absolute top-0.5 inset-x-1.5 h-3 rounded-t-full bg-[#2a2d36] border-b border-black/40" />

      {/* Center Axle Hub with Crank Pin */}
      <div className="absolute inset-0 m-auto h-3 w-3 rounded-full border border-white/70 bg-[#d4af37] shadow-inner flex items-center justify-center">
        <div className="h-1 w-1 rounded-full bg-[#16181c]" />
      </div>
    </motion.div>
  );
}
