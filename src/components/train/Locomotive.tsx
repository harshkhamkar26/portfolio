"use client";

import { useState, useEffect, useRef } from "react";
import { useTransform, motion, MotionValue, useReducedMotion } from "framer-motion";
import { sounds } from "@/components/layout/sound-manager";
import { StationData } from "./useTrainScroll";
import { Coach } from "./Coach";

interface LocomotiveProps {
  smoothProgress: MotionValue<number>;
  speedFactor: MotionValue<number>;
  velocity?: MotionValue<number>;
  scrollPercent: number;
  currentStation?: StationData;
}

/**
 * Classic Steam Locomotive ("The Harsh Express" / Pacific Class 4-6-2)
 * Features responsive track movement across all 8 stations, interactive steam whistle,
 * reciprocating side driving rods, spoked iron wheels, glowing firebox,
 * parabolic headlight beam, smokestack steam plumes, and luxury Pullman coach coupling.
 */
export function Locomotive({
  smoothProgress,
  speedFactor,
  velocity,
  scrollPercent,
  currentStation,
}: LocomotiveProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isWhistling, setIsWhistling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const whistleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive track distance calculation:
  // Starts at Station 01 Origin Platform (left) and docks at Station 08 Terminus Buffer Stop (right).
  const [travelDistance, setTravelDistance] = useState({ start: 8, max: 640 });

  useEffect(() => {
    const updateBounds = () => {
      if (typeof window === "undefined") return;
      const vw = window.innerWidth;
      const isMobile = vw < 640;
      const isTablet = vw < 1024;

      // Effective scaled train width
      const trainWidth = isMobile ? 220 : isTablet ? 320 : 420;
      const bufferOffset = isMobile ? 80 : 140;
      const startX = isMobile ? 4 : 16;
      const maxX = Math.max(vw - trainWidth - bufferOffset, 60);

      setTravelDistance({ start: startX, max: maxX });
    };

    updateBounds();
    window.addEventListener("resize", updateBounds, { passive: true });
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  // ─────────────────────────────────────────────────────────────
  // 1. PROPER CONTINUOUS RAIL MOVEMENT ACROSS THE WHOLE JOURNEY
  // Translates smoothly from Station 01 Origin to Station 08 Terminus
  // ─────────────────────────────────────────────────────────────
  const trainX = useTransform(
    smoothProgress,
    [0, 1],
    [travelDistance.start, travelDistance.max]
  );

  // Driving wheels rotate continuously with distance traveled (36 full revolutions)
  const wheelRotate = useTransform(smoothProgress, [0, 1], [0, 360 * 36]);

  // Reciprocating side driving rod follows circular crank-pin orbit (radius = 6px)
  const rodX = useTransform(wheelRotate, (r) => Math.cos((r * Math.PI) / 180) * 6);
  const rodY = useTransform(wheelRotate, (r) => Math.sin((r * Math.PI) / 180) * 6);

  // Gentle rail suspension bounce & track vibration based on speed
  const vibrationY = useTransform(speedFactor, [0, 1], [0, -2]);

  // Vintage parabolic lantern headlight beam reacts to throttle
  const lanternBeamOpacity = useTransform(speedFactor, [0, 0.3, 1], [0.45, 0.7, 0.98]);
  const lanternBeamWidth = useTransform(speedFactor, [0, 1], ["240px", "420px"]);

  // Billowing steam drift backwards according to speed
  const steamDriftX = useTransform(speedFactor, [0, 1], ["-12px", "-95px"]);
  const steamDriftOpacity = useTransform(speedFactor, [0, 0.2, 1], [0.35, 0.65, 0.9]);

  // Interactive Whistle Trigger
  const handleWhistle = () => {
    sounds.playWhistle();
    setIsWhistling(true);
    if (whistleTimeoutRef.current) {
      clearTimeout(whistleTimeoutRef.current);
    }
    whistleTimeoutRef.current = setTimeout(() => {
      setIsWhistling(false);
    }, 950);
  };

  const isBraking = scrollPercent >= 90;

  return (
    <motion.div
      style={{
        x: shouldReduceMotion ? "16vw" : trainX,
        y: shouldReduceMotion ? 0 : vibrationY,
      }}
      className="pointer-events-auto fixed bottom-3 sm:bottom-5 z-30 select-none will-change-transform origin-bottom-left scale-[0.58] sm:scale-75 md:scale-85 lg:scale-100"
      aria-label="The Harsh Express Steam Locomotive"
      onMouseEnter={() => {
        setIsHovered(true);
        sounds.playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleWhistle}
    >
      {/* ─────────────────────────────────────────────────────────────
          INTERACTIVE HUD PLAQUE TOOLTIP (Floats above locomotive on hover)
          ───────────────────────────────────────────────────────────── */}
      <div
        className={`pointer-events-none absolute -top-16 left-12 sm:left-24 z-40 transition-all duration-300 ${
          isHovered || isWhistling
            ? "opacity-100 -translate-y-1 scale-100"
            : "opacity-0 translate-y-2 scale-95"
        }`}
      >
        <div className="flex items-center gap-2.5 rounded-xs border border-[#d4af37] bg-[#12141a]/95 px-3 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.9)] backdrop-blur-md whitespace-nowrap">
          <span className="h-2 w-2 rounded-full bg-[#d4af37] animate-pulse" />
          <div className="font-serif text-[10px]">
            <span className="font-bold text-[#ffd23a]">THE HARSH EXPRESS · NO. 26</span>
            <span className="mx-1 text-[#d4af37]/40">|</span>
            <span className="text-[#ece5d5]/85 uppercase tracking-wider">
              {currentStation ? `STATION ${currentStation.no} · ${currentStation.name}` : "EN ROUTE"}
            </span>
          </div>
          <span className="border border-[#d4af37]/50 bg-[#d4af37]/15 px-1.5 py-0.5 font-mono text-[8px] text-[#ffd23a] uppercase">
            CLICK TO WHISTLE
          </span>
        </div>
      </div>

      {/* Train Assembly Container */}
      <div className="relative flex items-end cursor-pointer group">
        {/* Luxury Pullman Passenger Carriage (Coupled behind on large desktop) */}
        <div className="hidden xl:flex items-end mr-[-4px]">
          <Coach
            coachNumber={1}
            title="THE HARSH EXPRESS"
            tagline="DATA SCIENCE &amp; ML RESEARCH"
            smoothProgress={smoothProgress}
          />
          {/* Inter-carriage Screw Link Coupler */}
          <div className="relative bottom-5 h-2 w-4 bg-[#252830] border-t border-b border-[#d4af37]/60" />
        </div>

        {/* ─────────────────────────────────────────────────────────────
            CLASSIC STEAM LOCOMOTIVE & COAL TENDER (Vector SVG)
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
              {/* Tender Coal Heap (Irregular fuel chunks) */}
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

              {/* Arched Driver's Side Windows with Warm Golden Firebox Light */}
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

              {/* Brass Steam Whistle (Behind Dome - x: 184) */}
              <line x1="184" y1="34" x2="184" y2="24" stroke="#d4af37" strokeWidth="2" />
              <rect x="182" y="21" width="4" height="4" rx="1" fill="#d4af37" />

              {/* Polished Brass Sand Dome (Forward Top) */}
              <path
                d="M276 34 C276 25, 292 25, 292 34 Z"
                fill="url(#brassGrad)"
                stroke="#8c7322"
                strokeWidth="1"
              />

              {/* Tall Flanged Vintage Chimney / Smokestack (x: 312-328) */}
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
              SMOKESTACK CONTINUOUS BILLOWING STEAM PLUMES (From Chimney x: 318)
              ───────────────────────────────────────────────────────────── */}
          {!shouldReduceMotion && (
            <div className="absolute left-[75.7%] top-[-8px] pointer-events-none">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={`loco-steam-${i}`}
                  style={{
                    x: steamDriftX,
                    opacity: steamDriftOpacity,
                  }}
                  animate={{
                    y: [-4, -50 - i * 14],
                    x: [0, -35 - i * 22],
                    scale: [0.6, 2.0 + i * 0.4],
                    opacity: [0.85, 0],
                  }}
                  transition={{
                    duration: 1.8 + i * 0.22,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: i * 0.28,
                  }}
                  className="absolute h-7 w-7 rounded-full bg-gradient-to-tr from-[#fbf8f1]/60 via-[#e2ded6]/35 to-transparent blur-sm"
                />
              ))}
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              INTERACTIVE STEAM WHISTLE BLAST JET (Triggered on click/tap!)
              ───────────────────────────────────────────────────────────── */}
          {isWhistling && !shouldReduceMotion && (
            <div className="absolute left-[43.8%] top-[-10px] pointer-events-none z-50">
              {/* High-pressure sharp vertical steam jet */}
              <motion.div
                initial={{ opacity: 0, scaleY: 0.2, y: 0 }}
                animate={{ opacity: [0.95, 0.8, 0], scaleY: [1, 2.4, 3], y: [0, -45, -75] }}
                transition={{ duration: 0.85, ease: "easeOut" }}
                className="w-4 h-12 origin-bottom rounded-full bg-gradient-to-t from-white via-[#f3f0e8]/80 to-transparent blur-[2px]"
              />
              {/* Expanding cloud around whistle bell */}
              <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: [0.9, 0.6, 0], scale: [0.6, 1.8, 2.5], y: -20 }}
                transition={{ duration: 0.85, ease: "easeOut" }}
                className="absolute -left-3 -top-6 w-10 h-10 rounded-full bg-white/70 blur-md"
              />
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              BRAKE SPARK PARTICLES (Active during deceleration at Terminus)
              ───────────────────────────────────────────────────────────── */}
          {isBraking && !shouldReduceMotion && (
            <div className="absolute left-36 -bottom-1 pointer-events-none z-40">
              {[0, 1, 2, 3, 4, 5].map((s) => (
                <motion.div
                  key={`spark-${s}`}
                  animate={{
                    x: [0, -25 - s * 8],
                    y: [0, -6 - (s % 3) * 6, 2],
                    opacity: [1, 0.8, 0],
                    scale: [1, 0.5],
                  }}
                  transition={{
                    duration: 0.45 + s * 0.08,
                    repeat: Infinity,
                    repeatDelay: 0.05,
                    ease: "easeOut",
                    delay: s * 0.06,
                  }}
                  className="absolute h-1.5 w-1.5 rounded-full bg-[#ffb020] shadow-[0_0_6px_#ff6a1a]"
                />
              ))}
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              REVOLVING STEEL WHEELSETS (Scroll-driven rotation)
              ───────────────────────────────────────────────────────────── */}
          {/* A. Tender Wheels (2 Dual-Axle Bogies) */}
          <div className="absolute -bottom-2.5 left-4 flex gap-3.5">
            <ClassicSmallWheel rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
            <ClassicSmallWheel rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
          </div>
          <div className="absolute -bottom-2.5 left-18 flex gap-3.5">
            <ClassicSmallWheel rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
            <ClassicSmallWheel rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
          </div>

          {/* B. Front Pilot Truck (Small Leading Wheel) */}
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
      <div className="absolute inset-x-0 top-1/2 h-[1px] -translate-y-1/2 bg-[#ece5d5]/50" />
      <div className="absolute inset-y-0 left-1/2 w-[1px] -translate-x-1/2 bg-[#ece5d5]/50" />
      <div className="absolute inset-0 m-auto h-[1px] w-full rotate-45 bg-[#ece5d5]/35" />
      <div className="absolute inset-0 m-auto h-[1px] w-full -rotate-45 bg-[#ece5d5]/35" />
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
      <div className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-[#ece5d5]/60" />
      <div className="absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-[#ece5d5]/60" />
      <div className="absolute inset-0 m-auto h-[1.5px] w-full rotate-45 bg-[#ece5d5]/45" />
      <div className="absolute inset-0 m-auto h-[1.5px] w-full -rotate-45 bg-[#ece5d5]/45" />
      <div className="absolute inset-0 m-auto h-[1.2px] w-full rotate-[22.5deg] bg-[#ece5d5]/30" />
      <div className="absolute inset-0 m-auto h-[1.2px] w-full -rotate-[22.5deg] bg-[#ece5d5]/30" />

      {/* Cast Iron Crescent Counterweight */}
      <div className="absolute top-0.5 inset-x-1.5 h-3 rounded-t-full bg-[#2a2d36] border-b border-black/40" />

      {/* Center Axle Hub with Crank Pin */}
      <div className="absolute inset-0 m-auto h-3 w-3 rounded-full border border-white/70 bg-[#d4af37] shadow-inner flex items-center justify-center">
        <div className="h-1 w-1 rounded-full bg-[#16181c]" />
      </div>
    </motion.div>
  );
}
