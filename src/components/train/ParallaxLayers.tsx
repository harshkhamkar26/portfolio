"use client";

import { useTransform, motion, MotionValue, useReducedMotion } from "framer-motion";

interface ParallaxLayersProps {
  smoothProgress: MotionValue<number>;
  speedFactor: MotionValue<number>;
}

export function ParallaxLayers({ smoothProgress, speedFactor }: ParallaxLayersProps) {
  const shouldReduceMotion = useReducedMotion();

  // Layer 1: Moon & Night Sky Stars (Slowest drift: -5vw)
  const starsX = useTransform(smoothProgress, [0, 1], ["0vw", "-5vw"]);

  // Layer 2: Distant Mountain Ridges & Pine Tree Silhouette Peaks (-16vw)
  const mountainsX = useTransform(smoothProgress, [0, 1], ["0vw", "-16vw"]);

  // Layer 3: Victorian Stone Viaduct Bridge Arches & Water Towers (-32vw)
  const viaductX = useTransform(smoothProgress, [0, 1], ["0vw", "-32vw"]);

  // Layer 4: Foreground Wooden Telegraph Poles with Crossarms & Sagging Wires (-68vw)
  const telegraphPolesX = useTransform(smoothProgress, [0, 1], ["0vw", "-68vw"]);

  // Motion streak opacity tied to scroll speed
  const speedStreakOpacity = useTransform(speedFactor, [0, 0.2, 0.9], [0, 0.2, 0.65]);

  if (shouldReduceMotion) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-30 select-none"
      >
        <svg className="absolute bottom-20 h-44 w-full" preserveAspectRatio="none">
          <path
            d="M0 120 L120 70 L240 110 L360 65 L480 95 L600 60 L720 100 L840 70 L960 110 L1080 60 L1200 95 L1320 70 L1440 120 L1440 180 L0 180 Z"
            fill="#121316"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
          LAYER 1: Silver Night Moon, Clouds & Star Field
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{ x: starsX }}
        className="absolute inset-0 h-full w-[120vw] will-change-transform opacity-45"
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff9e6" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#ffd875" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Glowing Full Silver Moon (Upper Left-Center Sky) */}
          <circle cx="22%" cy="16%" r="28" fill="url(#moonGlow)" />
          <circle cx="22%" cy="16%" r="14" fill="#fffaea" />
          <circle cx="20%" cy="14%" r="3" fill="#e8dfc8" opacity="0.4" />
          <circle cx="24%" cy="18%" r="4" fill="#e8dfc8" opacity="0.3" />

          {/* Twinkling Night Sky Stars */}
          {[
            { cx: "8%", cy: "12%", r: 1.1 },
            { cx: "14%", cy: "24%", r: 1.4 },
            { cx: "32%", cy: "10%", r: 0.9 },
            { cx: "42%", cy: "22%", r: 1.6 },
            { cx: "56%", cy: "12%", r: 1.2 },
            { cx: "68%", cy: "28%", r: 1.5 },
            { cx: "78%", cy: "14%", r: 1.8 },
            { cx: "88%", cy: "22%", r: 1.1 },
            { cx: "98%", cy: "10%", r: 1.3 },
            { cx: "108%", cy: "26%", r: 1.4 },
          ].map((pt, i) => (
            <circle
              key={i}
              cx={pt.cx}
              cy={pt.cy}
              r={pt.r}
              fill="#ece5d5"
              opacity={0.45 + (i % 3) * 0.2}
            />
          ))}
        </svg>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 2: Misty Rolling Mountain Ridges & Pine Forests
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{ x: mountainsX }}
        className="absolute bottom-20 sm:bottom-24 h-56 sm:h-72 w-[140vw] will-change-transform opacity-35"
      >
        <svg
          className="h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 1600 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Distant Mountain Peaks & Pine Forest Silhouette */}
          <path
            d="M0 240 L0 160 L60 130 L110 145 L180 110 L250 150 L320 120 L380 135 L440 95 L510 140 L580 115 L660 150 L730 100 L810 140 L890 120 L960 90 L1040 130 L1120 105 L1190 140 L1260 115 L1340 145 L1420 100 L1500 135 L1600 110 L1600 240 Z"
            fill="#13151a"
          />
          {/* Pine Tree Peaks Spanning the Ridge */}
          {[90, 210, 340, 480, 620, 760, 920, 1070, 1220, 1370, 1520].map((tx, idx) => (
            <polygon
              key={idx}
              points={`${tx},130 ${tx + 8},110 ${tx + 16},130`}
              fill="#181a20"
            />
          ))}
        </svg>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 3: Victorian Stone Viaduct Bridge Arches & Water Tower
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{ x: viaductX }}
        className="absolute bottom-16 sm:bottom-20 h-40 sm:h-52 w-[180vw] will-change-transform opacity-45"
      >
        <svg
          className="h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 2000 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Solid Masonry Viaduct Deck */}
          <rect x="0" y="80" width="2000" height="12" fill="#181a20" stroke="#453d32" strokeWidth="1" />

          {/* Stone Viaduct Arches Spanning Valley */}
          {[120, 360, 600, 840, 1080, 1320, 1560, 1800].map((archX, idx) => (
            <g key={idx}>
              {/* Massive Stone Pillar Pier */}
              <rect x={archX} y="92" width="28" height="88" fill="#131418" stroke="#352e25" strokeWidth="1" />
              {/* Arched Opening Between Pillars */}
              <path
                d={`M${archX + 28} 180 L${archX + 28} 115 Q ${archX + 104} 95, ${archX + 180} 115 L${archX + 180} 180 Z`}
                fill="#0d0e12"
                stroke="#453d32"
                strokeWidth="1.2"
              />
            </g>
          ))}

          {/* Classic Brick Railway Water Tank Tower (Station Refueling Point) */}
          <g transform="translate(720, 25)">
            <rect x="0" y="25" width="45" height="30" rx="3" fill="#20222a" stroke="#d4af37" strokeWidth="1" />
            <rect x="5" y="55" width="35" height="40" fill="#16181d" stroke="#3e3930" strokeWidth="1" />
            <line x1="42" y1="35" x2="60" y2="48" stroke="#d4af37" strokeWidth="2.5" />
          </g>
        </svg>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 4: Foreground Wooden Telegraph Poles & Sagging Wires
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{ x: telegraphPolesX }}
        className="absolute bottom-10 h-36 w-[260vw] will-change-transform opacity-35 pointer-events-none"
      >
        <svg
          className="h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 2800 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Copper Telegraph Wires with authentic catenary sag */}
          <path
            d="M0 45 Q 225 60, 450 45 Q 675 60, 900 45 Q 1125 60, 1350 45 Q 1575 60, 1800 45 Q 2025 60, 2250 45 Q 2475 60, 2700 45 L2800 45"
            stroke="#d4af37"
            strokeWidth="0.8"
            opacity="0.6"
            fill="none"
          />
          <path
            d="M0 52 Q 225 68, 450 52 Q 675 68, 900 52 Q 1125 68, 1350 52 Q 1575 68, 1800 52 Q 2025 68, 2250 52 Q 2475 68, 2700 52 L2800 52"
            stroke="#d4af37"
            strokeWidth="0.6"
            opacity="0.45"
            fill="none"
          />

          {/* Wooden Timber Telegraph Poles with Crossarms & Ceramic Insulators */}
          {[0, 450, 900, 1350, 1800, 2250, 2700].map((poleX, idx) => (
            <g key={idx}>
              {/* Main Vertical Wooden Pole */}
              <line x1={poleX + 50} y1="140" x2={poleX + 50} y2="35" stroke="#382c20" strokeWidth="3" />
              {/* Horizontal Timber Crossarm */}
              <line x1={poleX + 28} y1="45" x2={poleX + 72} y2="45" stroke="#544433" strokeWidth="2.5" />
              {/* Diagonal Crossarm Bracing Struts */}
              <line x1={poleX + 50} y1="58" x2={poleX + 38} y2="46" stroke="#382c20" strokeWidth="1.2" />
              <line x1={poleX + 50} y1="58" x2={poleX + 62} y2="46" stroke="#382c20" strokeWidth="1.2" />

              {/* Glass / Ceramic Insulators */}
              <circle cx={poleX + 32} cy="42" r="1.8" fill="#d4af37" />
              <circle cx={poleX + 44} cy="42" r="1.8" fill="#d4af37" />
              <circle cx={poleX + 56} cy="42" r="1.8" fill="#d4af37" />
              <circle cx={poleX + 68} cy="42" r="1.8" fill="#d4af37" />
            </g>
          ))}
        </svg>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 5: Soft Atmospheric Speed Streaks (During High Throttle)
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: speedStreakOpacity }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-[32%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ffd23a]/30 to-transparent blur-[0.6px]" />
        <div className="absolute top-[48%] left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent blur-[0.8px]" />
        <div className="absolute top-[64%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#e5c07b]/25 to-transparent blur-[0.6px]" />
      </motion.div>
    </div>
  );
}
