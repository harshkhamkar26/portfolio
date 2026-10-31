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

export function Coach({
  coachNumber,
  title,
  tagline = "PRESSURIZED · HIGH SPEED TRANSIT",
  accentColor = "#3ad7ff",
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
          CYBER CARRIAGE COMPARTMENT CHASSIS
          ───────────────────────────────────────────────────────────── */}
      <div className="relative h-20 w-72 sm:h-24 sm:w-84">
        <svg
          className="h-full w-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]"
          viewBox="0 0 340 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Coach Body Box */}
          <path
            d="M12 75 L328 75 L328 18 C328 18 310 14 280 14 L60 14 C30 14 12 18 12 18 Z"
            fill="url(#coachBodyGrad)"
            stroke="rgba(236,229,213,0.2)"
            strokeWidth="1.2"
          />

          {/* Roof Cowling & Flutes */}
          <rect x="30" y="10" width="280" height="4" rx="2" fill="#121316" stroke="rgba(255,255,255,0.1)" />
          <line x1="50" y1="12" x2="290" y2="12" stroke={accentColor} strokeWidth="1" opacity="0.6" />

          {/* Coach Accent Livery Band */}
          <rect x="12" y="56" width="316" height="5" fill={accentColor} opacity="0.9" />
          <rect x="12" y="62" width="316" height="2" fill="#ff6a1a" opacity="0.8" />

          {/* Panoramic Tinted Observation Windows (3 Compartment Bays) */}
          <g fill="#00e5ff" opacity="0.18">
            <rect x="35" y="24" width="70" height="24" rx="3" stroke="rgba(255,255,255,0.3)" />
            <rect x="135" y="24" width="70" height="24" rx="3" stroke="rgba(255,255,255,0.3)" />
            <rect x="235" y="24" width="70" height="24" rx="3" stroke="rgba(255,255,255,0.3)" />
          </g>

          {/* Window Reflection Sheen */}
          <g stroke="rgba(255,255,255,0.35)" strokeWidth="0.8">
            <line x1="45" y1="26" x2="65" y2="46" />
            <line x1="145" y1="26" x2="165" y2="46" />
            <line x1="245" y1="26" x2="265" y2="46" />
          </g>

          {/* Coach Designation Plate */}
          <g>
            <rect x="110" y="48" width="120" height="15" rx="1" fill="#0d0e12" stroke="#ece5d5" strokeWidth="0.6" />
            <text
              x="170"
              y="56"
              fill="#ece5d5"
              fontSize="6"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="middle"
              letterSpacing="0.1em"
            >
              COACH {coachNumber.toString().padStart(2, "0")} · {title.slice(0, 16).toUpperCase()}
            </text>
            <text
              x="170"
              y="61"
              fill={accentColor}
              fontSize="3.8"
              fontFamily="monospace"
              textAnchor="middle"
              letterSpacing="0.08em"
              opacity="0.85"
            >
              {tagline.slice(0, 30).toUpperCase()}
            </text>
          </g>

          {/* Inter-Carriage Coupler Knuckles at Both Ends */}
          <rect x="2" y="68" width="10" height="6" fill="#3a3d47" stroke="#16181c" />
          <rect x="328" y="68" width="10" height="6" fill="#3a3d47" stroke="#16181c" />

          {/* Bogie Underframe Skirts */}
          <rect x="28" y="75" width="284" height="10" fill="#0d0e12" stroke="#252830" strokeWidth="1" />

          {/* Gradients */}
          <defs>
            <linearGradient id="coachBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e2026" />
              <stop offset="50%" stopColor="#242630" />
              <stop offset="100%" stopColor="#181a20" />
            </linearGradient>
          </defs>
        </svg>

        {/* ─────────────────────────────────────────────────────────────
            REVOLVING WHEELSETS BENEATH CARRIAGE
            ───────────────────────────────────────────────────────────── */}
        <div className="absolute -bottom-2 inset-x-8 flex justify-between px-2">
          {/* Left Bogie */}
          <div className="flex gap-4">
            <CoachWheel rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
            <CoachWheel rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
          </div>

          {/* Right Bogie */}
          <div className="flex gap-4">
            <CoachWheel rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
            <CoachWheel rotateValue={wheelRotate} shouldReduceMotion={!!shouldReduceMotion} />
          </div>
        </div>
      </div>
    </div>
  );
}

function CoachWheel({
  rotateValue,
  shouldReduceMotion,
}: {
  rotateValue: MotionValue<number>;
  shouldReduceMotion: boolean;
}) {
  return (
    <div className="relative h-6 w-6 sm:h-7 sm:w-7">
      <div className="absolute inset-0 rounded-full border-2 border-[#545763] bg-[#121316]" />
      <motion.div
        style={{ rotate: shouldReduceMotion ? 0 : rotateValue }}
        className="absolute inset-0 flex items-center justify-center will-change-transform"
      >
        <svg className="h-full w-full" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="13" stroke="#3a3d47" strokeWidth="2" />
          <line x1="16" y1="3" x2="16" y2="29" stroke="#8c919e" strokeWidth="1.5" />
          <line x1="3" y1="16" x2="29" y2="16" stroke="#8c919e" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="3.5" fill="#252830" stroke="#ffd23a" strokeWidth="1" />
        </svg>
      </motion.div>
    </div>
  );
}
