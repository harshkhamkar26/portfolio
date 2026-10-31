"use client";

import { motion, MotionValue, useTransform, useReducedMotion } from "framer-motion";

interface CoachProps {
  coachNumber: number;
  title: string;
  tagline?: string;
  accentColor?: string;
  smoothProgress?: MotionValue<number>;
  className?: string;
}

/**
 * Classic Pullman / Orient Express Luxury Passenger Coach
 * Featuring a classic clerestory monitor roof, arched mahogany-trimmed windows,
 * gold leaf filigree, brass coach designation plate, and spoked iron bogies.
 */
export function Coach({
  coachNumber,
  title,
  tagline = "FIRST CLASS · CONTINENTAL EXPRESS",
  accentColor = "#d4af37",
  smoothProgress,
  className = "",
}: CoachProps) {
  const shouldReduceMotion = useReducedMotion();

  // Wheels rotate if smoothProgress is provided
  const wheelRotate = useTransform(
    smoothProgress || new MotionValue(0),
    [0, 1],
    [0, 360 * 24]
  );

  return (
    <div
      aria-hidden="true"
      className={`relative select-none ${className}`}
    >
      {/* ─────────────────────────────────────────────────────────────
          VINTAGE PULLMAN PASSENGER CARRIAGE CHASSIS
          ───────────────────────────────────────────────────────────── */}
      <div className="relative h-20 w-72 sm:h-24 sm:w-84">
        <svg
          className="h-full w-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]"
          viewBox="0 0 340 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Wooden/Iron Coach Body Box */}
          <path
            d="M12 75 L328 75 L328 20 C328 20 310 16 280 16 L60 16 C30 16 12 20 12 20 Z"
            fill="url(#classicCoachGrad)"
            stroke="#453d32"
            strokeWidth="1.2"
          />

          {/* Clerestory Monitor Roof (Raised Center Tier with Vents) */}
          <rect x="55" y="10" width="230" height="7" rx="2" fill="#121317" stroke="#d4af37" strokeWidth="0.8" />
          {/* Clerestory Small Glass Ventilators */}
          {[65, 85, 105, 125, 145, 165, 185, 205, 225, 245, 265].map((vx) => (
            <rect key={vx} x={vx} y="12" width="12" height="3" rx="0.5" fill="#ffd23a" opacity="0.6" />
          ))}

          {/* Roof Edge Gilded Molding */}
          <line x1="20" y1="18" x2="320" y2="18" stroke="#d4af37" strokeWidth="1.2" />

          {/* Arched Vintage Compartment Windows (Warm Amber Oil Lamp Glow) */}
          {[36, 92, 148, 204, 260].map((wx, idx) => (
            <g key={idx}>
              {/* Arched Window Opening */}
              <path
                d={`M${wx} 46 L${wx} 28 C${wx} 22, ${wx + 34} 22, ${wx + 34} 28 L${wx + 34} 46 Z`}
                fill="url(#coachWindowGlow)"
                stroke="#d4af37"
                strokeWidth="1"
              />
              {/* Window Velvet Curtain Drapes / Pelmet */}
              <path
                d={`M${wx} 28 Q ${wx + 17} 32, ${wx + 34} 28`}
                stroke="#681b1b"
                strokeWidth="2.5"
                fill="none"
              />
              {/* Center Mullion Division */}
              <line x1={wx + 17} y1="24" x2={wx + 17} y2="46" stroke="#453d32" strokeWidth="0.8" />
            </g>
          ))}

          {/* Gold Filigree & Coach Belt Rail */}
          <line x1="12" y1="52" x2="328" y2="52" stroke="#d4af37" strokeWidth="1.4" />
          <line x1="12" y1="56" x2="328" y2="56" stroke="#d4af37" strokeWidth="0.8" opacity="0.7" />

          {/* Gilded Cast Brass Carriage Nameplate (Center) */}
          <g>
            <rect x="100" y="58" width="140" height="13" rx="1.5" fill="#121316" stroke={accentColor} strokeWidth="1" />
            <text
              x="170"
              y="65"
              fill={accentColor}
              fontSize="5.5"
              fontFamily="serif"
              fontWeight="bold"
              textAnchor="middle"
              letterSpacing="0.12em"
            >
              CARRIAGE NO. {coachNumber.toString().padStart(2, "0")} · {title.slice(0, 16).toUpperCase()}
            </text>
            <text
              x="170"
              y="69.5"
              fill="#ece5d5"
              fontSize="3.5"
              fontFamily="serif"
              textAnchor="middle"
              letterSpacing="0.1em"
              opacity="0.8"
            >
              {tagline.slice(0, 32).toUpperCase()}
            </text>
          </g>

          {/* Coach Underbody Wooden Siding & Truss Rods */}
          <line x1="12" y1="74" x2="328" y2="74" stroke="#d4af37" strokeWidth="1" />
          <path d="M45 75 L170 82 L295 75" stroke="#453d32" strokeWidth="1.2" fill="none" />
          <line x1="170" y1="75" x2="170" y2="82" stroke="#d4af37" strokeWidth="1" />

          {/* Accordion Gangway End Bellows */}
          <rect x="4" y="24" width="8" height="48" rx="1" fill="#1b1c22" stroke="#3c3e47" />
          <line x1="8" y1="24" x2="8" y2="72" stroke="#121316" strokeWidth="1.5" />
          <rect x="328" y="24" width="8" height="48" rx="1" fill="#1b1c22" stroke="#3c3e47" />
          <line x1="332" y1="24" x2="332" y2="72" stroke="#121316" strokeWidth="1.5" />

          {/* Gradients */}
          <defs>
            <linearGradient id="classicCoachGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#252932" />
              <stop offset="35%" stopColor="#1e2129" />
              <stop offset="75%" stopColor="#171920" />
              <stop offset="100%" stopColor="#0f1014" />
            </linearGradient>
            <linearGradient id="coachWindowGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fff2a8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ffb020" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>

        {/* ─────────────────────────────────────────────────────────────
            WHEELSETS UNDER COACH COMPARTMENT
            ───────────────────────────────────────────────────────────── */}
        <div className="absolute -bottom-2 inset-x-8 flex justify-between px-3">
          <div className="flex gap-4">
            <CoachVintageWheel rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
            <CoachVintageWheel rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
          </div>
          <div className="flex gap-4">
            <CoachVintageWheel rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
            <CoachVintageWheel rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
          </div>
        </div>
      </div>
    </div>
  );
}

function CoachVintageWheel({
  rotateValue,
  shouldReduceMotion,
}: {
  rotateValue: MotionValue<number>;
  shouldReduceMotion: boolean;
}) {
  return (
    <motion.div
      style={{ rotate: shouldReduceMotion ? 0 : rotateValue }}
      className="relative h-6 w-6 rounded-full border-2 border-[#d4af37]/70 bg-[#16181c] shadow-md will-change-transform"
    >
      <div className="absolute inset-x-0 top-1/2 h-[1px] -translate-y-1/2 bg-[#ece5d5]/50" />
      <div className="absolute inset-y-0 left-1/2 w-[1px] -translate-x-1/2 bg-[#ece5d5]/50" />
      <div className="absolute inset-0 m-auto h-2 w-2 rounded-full border border-white/40 bg-[#d4af37]" />
    </motion.div>
  );
}
