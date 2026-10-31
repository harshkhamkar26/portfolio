"use client";

import { useTransform, motion, MotionValue, useReducedMotion } from "framer-motion";

interface ParallaxLayersProps {
  smoothProgress: MotionValue<number>;
  speedFactor: MotionValue<number>;
}

export function ParallaxLayers({ smoothProgress, speedFactor }: ParallaxLayersProps) {
  const shouldReduceMotion = useReducedMotion();

  // Parallax displacement ranges (opposite to train travel: scrolling forward translates scenery backward/leftward)
  const skyX = useTransform(smoothProgress, [0, 1], ["0%", "-15%"]);
  const skylineX = useTransform(smoothProgress, [0, 1], ["0%", "-38%"]);
  const terrainX = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);
  const catenaryX = useTransform(smoothProgress, [0, 1], ["0%", "-145%"]);

  // Dynamic speed streak opacity coupled directly to scroll velocity
  const streakOpacity = useTransform(speedFactor, [0.05, 0.4, 1], [0, 0.28, 0.65]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
          LAYER 1: DEEP COSMIC SKY & CYBER CONSTELLATION GRID (-15%)
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{ x: shouldReduceMotion ? "0%" : skyX }}
        className="absolute inset-0 h-full w-[130%] opacity-40 will-change-transform"
      >
        <svg
          className="h-full w-full object-cover"
          viewBox="0 0 1920 1080"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Subtle cyber coordinate grid */}
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0d0f12" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#16181c" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#16181c" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="nebulaGlow" cx="60%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#3ad7ff" stopOpacity="0.12" />
              <stop offset="50%" stopColor="#ff6a1a" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#16181c" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="1920" height="1080" fill="url(#skyGrad)" />
          <rect width="1920" height="1080" fill="url(#nebulaGlow)" />

          {/* Twinkling cyber navigational stars */}
          <g fill="#ece5d5" opacity="0.45">
            <circle cx="120" cy="80" r="1.5" />
            <circle cx="280" cy="140" r="1.2" />
            <circle cx="450" cy="95" r="2" />
            <circle cx="620" cy="180" r="1" />
            <circle cx="810" cy="70" r="2.2" />
            <circle cx="990" cy="130" r="1.5" />
            <circle cx="1180" cy="90" r="1.8" />
            <circle cx="1360" cy="160" r="1.2" />
            <circle cx="1540" cy="75" r="2" />
            <circle cx="1720" cy="115" r="1.4" />
            <circle cx="1880" cy="190" r="1.6" />

            <circle cx="210" cy="220" r="1" />
            <circle cx="530" cy="260" r="1.6" />
            <circle cx="890" cy="210" r="1.2" />
            <circle cx="1250" cy="240" r="1.4" />
            <circle cx="1620" cy="230" r="1.1" />
          </g>

          {/* Cyan waypoint satellite beacons */}
          <circle cx="450" cy="95" r="3.5" fill="#3ad7ff" opacity="0.3" />
          <circle cx="810" cy="70" r="4.5" fill="#ffd23a" opacity="0.25" />
          <circle cx="1540" cy="75" r="4" fill="#3ad7ff" opacity="0.3" />

          {/* Constellation vector vectors */}
          <path
            d="M120 80 L280 140 L450 95 L620 180 M990 130 L1180 90 L1360 160 L1540 75"
            stroke="#3ad7ff"
            strokeWidth="0.5"
            strokeDasharray="4 6"
            opacity="0.2"
          />
        </svg>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 2: FAR FUTURISTIC MEGA-CITY SILHOUETTE (-38%)
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{ x: shouldReduceMotion ? "0%" : skylineX }}
        className="absolute bottom-20 left-0 h-[42vh] w-[150%] opacity-25 will-change-transform"
      >
        <svg
          className="h-full w-full object-fill"
          viewBox="0 0 2400 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Cyber Megacity Silhouettes */}
          <path
            d="
              M0 600 L0 380 L40 380 L40 420 L70 420 L70 340 L100 340 L100 300 L115 220 L130 300 L160 300 L160 410 
              L220 410 L220 280 L260 280 L260 210 L275 160 L290 210 L330 210 L330 430 L380 430 L380 360 L420 360 
              L450 310 L480 360 L510 360 L510 440 L580 440 L580 260 L620 260 L620 180 L635 120 L650 180 L700 180 
              L700 420 L750 420 L750 370 L800 370 L800 450 L880 450 L880 330 L930 330 L930 290 L960 290 L960 460 
              L1040 460 L1040 240 L1070 240 L1070 190 L1085 140 L1100 190 L1140 190 L1140 430 L1200 430 L1200 350 
              L1250 350 L1250 440 L1320 440 L1320 270 L1370 270 L1370 200 L1410 200 L1410 420 L1470 420 L1470 330 
              L1530 330 L1530 450 L1600 450 L1600 290 L1650 290 L1650 220 L1665 170 L1680 220 L1720 220 L1720 440 
              L1800 440 L1800 360 L1850 360 L1850 430 L1940 430 L1940 250 L1980 250 L1980 190 L2020 190 L2020 450 
              L2120 450 L2120 340 L2170 340 L2170 430 L2260 430 L2260 300 L2310 300 L2310 420 L2400 420 L2400 600 Z
            "
            fill="#121317"
            stroke="rgba(236,229,213,0.06)"
            strokeWidth="1"
          />

          {/* Rooftop communication beacon LEDs */}
          <g>
            <circle cx="275" cy="160" r="3" fill="#ff2e97" />
            <circle cx="635" cy="120" r="3" fill="#3ad7ff" />
            <circle cx="1085" cy="140" r="3" fill="#ffd23a" />
            <circle cx="1665" cy="170" r="3" fill="#ff2e97" />
            <circle cx="1980" cy="190" r="3" fill="#3ad7ff" />
          </g>

          {/* Monolith window matrix bands */}
          <g fill="#ece5d5" opacity="0.12">
            <rect x="235" y="300" width="12" height="60" />
            <rect x="600" y="280" width="15" height="90" />
            <rect x="1055" y="260" width="14" height="110" />
            <rect x="1335" y="290" width="20" height="70" />
            <rect x="1620" y="310" width="18" height="80" />
          </g>
        </svg>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 3: MID MOUNTAINS, TUNNEL ARCHES & MAGLEV PYLONS (-75%)
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{ x: shouldReduceMotion ? "0%" : terrainX }}
        className="hidden sm:block absolute bottom-14 left-0 h-[30vh] w-[190%] opacity-35 will-change-transform"
      >
        <svg
          className="h-full w-full object-fill"
          viewBox="0 0 3000 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Rugged polygon ridges and tunnel portals */}
          <path
            d="
              M0 450 L0 320 L180 240 L340 310 L520 190 L710 290 L880 220 L1060 300 
              L1240 180 L1420 280 L1580 210 L1760 300 L1940 190 L2120 290 L2300 230 
              L2480 310 L2660 200 L2840 280 L3000 240 L3000 450 Z
            "
            fill="#101114"
            stroke="rgba(58,215,255,0.08)"
            strokeWidth="1.5"
          />

          {/* Cyber tunnel rib portal arches (Station transitions) */}
          <g stroke="#ff6a1a" strokeWidth="1.5" opacity="0.3">
            <path d="M480 380 L520 190 L560 380" fill="none" />
            <path d="M500 380 L520 220 L540 380" fill="none" />
            <path d="M1200 380 L1240 180 L1280 380" fill="none" />
            <path d="M1900 380 L1940 190 L1980 380" fill="none" />
          </g>

          {/* Neon trackside perimeter guide lights */}
          <g fill="#9dfc3f" opacity="0.6">
            <circle cx="200" cy="360" r="2" />
            <circle cx="520" cy="360" r="2" />
            <circle cx="840" cy="360" r="2" />
            <circle cx="1160" cy="360" r="2" />
            <circle cx="1480" cy="360" r="2" />
            <circle cx="1800" cy="360" r="2" />
            <circle cx="2120" cy="360" r="2" />
            <circle cx="2440" cy="360" r="2" />
            <circle cx="2760" cy="360" r="2" />
          </g>
        </svg>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 4: NEAR HIGH-VOLTAGE CATENARY GANTRIES & WIRES (-145%)
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{ x: shouldReduceMotion ? "0%" : catenaryX }}
        className="hidden md:block absolute bottom-0 left-0 h-[65vh] w-[260%] opacity-20 will-change-transform"
      >
        <svg
          className="h-full w-full object-fill"
          viewBox="0 0 4200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Overhead catenary high-voltage suspension wires */}
          <path
            d="
              M0 160 Q350 200 700 160 Q1050 200 1400 160 Q1750 200 2100 160 
              Q2450 200 2800 160 Q3150 200 3500 160 Q3850 200 4200 160
            "
            stroke="#ece5d5"
            strokeWidth="1.5"
            opacity="0.4"
          />
          <path
            d="M0 210 L4200 210"
            stroke="#3ad7ff"
            strokeWidth="1"
            opacity="0.5"
          />

          {/* Dropper suspension links */}
          <g stroke="rgba(236,229,213,0.3)" strokeWidth="0.8">
            {Array.from({ length: 42 }).map((_, i) => (
              <line key={i} x1={i * 100 + 50} y1="180" x2={i * 100 + 50} y2="210" />
            ))}
          </g>

          {/* Catenary Mast Pylons standing every 700 units */}
          {Array.from({ length: 7 }).map((_, i) => {
            const px = i * 700 + 350;
            return (
              <g key={i}>
                {/* Steel truss mast */}
                <line x1={px} y1="100" x2={px} y2="800" stroke="#252830" strokeWidth="8" />
                <line x1={px} y1="100" x2={px} y2="800" stroke="#3ad7ff" strokeWidth="1" opacity="0.4" />
                {/* Horizontal cantilever arm */}
                <line x1={px - 80} y1="130" x2={px + 80} y2="130" stroke="#252830" strokeWidth="6" />
                {/* Ceramic insulator bells */}
                <circle cx={px} cy="155" r="5" fill="#ffd23a" opacity="0.8" />
                <circle cx={px} cy="205" r="4" fill="#3ad7ff" opacity="0.9" />
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 5: WARP VELOCITY SPEED STREAKS (Coupled to Velocity)
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: shouldReduceMotion ? 0 : streakOpacity }}
        className="absolute inset-0 pointer-events-none will-change-opacity"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3ad7ff]/[0.025] to-transparent" />
        <svg
          className="h-full w-full object-cover"
          viewBox="0 0 1920 1080"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* High-speed motion blur horizontal laser streaks */}
          <g stroke="url(#streakGradCyan)" strokeWidth="1.5">
            <line x1="0" y1="220" x2="1920" y2="220" strokeDasharray="300 200" />
            <line x1="0" y1="410" x2="1920" y2="410" strokeDasharray="450 150" />
            <line x1="0" y1="580" x2="1920" y2="580" strokeDasharray="600 250" />
            <line x1="0" y1="740" x2="1920" y2="740" strokeDasharray="380 180" />
            <line x1="0" y1="890" x2="1920" y2="890" strokeDasharray="520 120" />
          </g>
          <g stroke="url(#streakGradOrange)" strokeWidth="1">
            <line x1="0" y1="310" x2="1920" y2="310" strokeDasharray="400 300" />
            <line x1="0" y1="670" x2="1920" y2="670" strokeDasharray="500 250" />
            <line x1="0" y1="820" x2="1920" y2="820" strokeDasharray="350 200" />
          </g>

          <defs>
            <linearGradient id="streakGradCyan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3ad7ff" stopOpacity="0" />
              <stop offset="50%" stopColor="#3ad7ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3ad7ff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="streakGradOrange" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6a1a" stopOpacity="0" />
              <stop offset="50%" stopColor="#ff6a1a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ff6a1a" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}
