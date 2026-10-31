"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface CoachFrameProps {
  children: React.ReactNode;
  coachNumber: number;
  coachTitle: string;
  domain?: string;
  accentColor?: string;
  className?: string;
}

/**
 * Reusable Train Carriage Wrapper Component
 * Transforms any project card into an authentic cyber train compartment
 * without modifying its inner content, layout, buttons, or typography.
 */
export function CoachFrame({
  children,
  coachNumber,
  coachTitle,
  domain,
  accentColor = "#ff6a1a",
  className = "",
}: CoachFrameProps) {
  const shouldReduceMotion = useReducedMotion();
  const formattedNo = coachNumber.toString().padStart(2, "0");

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { duration: 0.25 } }}
      className={`group relative flex flex-col ${className}`}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. INTER-CARRIAGE COUPLINGS (Left & Right Mechanical Joints)
          ───────────────────────────────────────────────────────────── */}
      {/* Left Coupler Knuckle */}
      <div
        aria-hidden="true"
        className="hidden md:flex absolute -left-3.5 top-1/2 -translate-y-1/2 z-20 flex-col items-center pointer-events-none"
      >
        <div className="h-6 w-3.5 rounded-l-xs border border-white/20 bg-gradient-to-r from-[#101114] to-[#252832] shadow-md flex items-center justify-center">
          <div className="h-2 w-1 bg-[#ff6a1a] rounded-xs" />
        </div>
        {/* Flexible pneumatic jumper hoses */}
        <div className="h-3 w-1.5 bg-[#3a3d47] border-l border-white/20 -mt-0.5" />
      </div>

      {/* Right Coupler Knuckle */}
      <div
        aria-hidden="true"
        className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 flex-col items-center pointer-events-none"
      >
        <div className="h-6 w-3.5 rounded-r-xs border border-white/20 bg-gradient-to-l from-[#101114] to-[#252832] shadow-md flex items-center justify-center">
          <div className="h-2 w-1 bg-[#3ad7ff] rounded-xs" />
        </div>
        {/* Flexible pneumatic jumper hoses */}
        <div className="h-3 w-1.5 bg-[#3a3d47] border-r border-white/20 -mt-0.5" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CARRIAGE ROOF STRUCTURE & IDENTIFICATION PLATE
          ───────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="relative z-10 flex items-center justify-between border-t-2 border-x border-b border-white/15 bg-gradient-to-r from-[#1a1c22] via-[#22242c] to-[#1a1c22] px-3.5 py-2 shadow-inner"
        style={{ borderTopColor: accentColor }}
      >
        {/* Coach Designation Plate */}
        <div className="flex items-center gap-2">
          <span
            className="flex items-center justify-center border px-1.5 py-0.5 font-mono text-[9px] font-black uppercase tracking-widest"
            style={{
              borderColor: `${accentColor}60`,
              color: accentColor,
              backgroundColor: `${accentColor}12`,
            }}
          >
            COACH {formattedNo}
          </span>
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-white truncate max-w-[210px] sm:max-w-none">
            {coachTitle}
          </span>
        </div>

        {/* Running Gear Telemetry Badge */}
        <div className="hidden sm:flex items-center gap-2 font-mono text-[9px] text-[#ece5d5]/55">
          {domain && (
            <span className="text-[#9dfc3f] border border-[#9dfc3f]/30 px-1 py-0.2 bg-[#9dfc3f]/5">
              {domain}
            </span>
          )}
          <span>{`CAR #${formattedNo} // LOCKED`}</span>
        </div>

        {/* Flush Rivets Along Roof Cowling */}
        <div className="flex gap-1 opacity-40">
          <div className="h-1 w-1 rounded-full bg-white" />
          <div className="h-1 w-1 rounded-full bg-white" />
          <div className="h-1 w-1 rounded-full bg-white" />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. COMPARTMENT CABIN (Window Frame Housing Original Card)
          ───────────────────────────────────────────────────────────── */}
      <div className="relative flex-1 border-x border-b border-white/15 bg-[#14151a] shadow-xl">
        {/* Subtle Observation Window Tint Reflection (Non-blocking) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.015] to-[#3ad7ff]/[0.025] z-1"
        />

        {/* Corner Reinforcement Brackets */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-2.5 w-2.5 border-t border-l border-white/30 z-2"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 h-2.5 w-2.5 border-t border-r border-white/30 z-2"
        />

        {/* Render child content completely intact */}
        <div className="relative z-0 h-full">
          {children}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. CARRIAGE UNDERBODY SKIRT & BOGIE SUSPENSION SILL
          ───────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="relative z-10 flex items-center justify-between border-x border-b border-white/10 bg-[#0e0f13] px-3 py-1 font-mono text-[8px] text-white/40 pointer-events-none"
      >
        <div className="flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-[#9dfc3f]" />
          <span>BOGIE AIR-SPRING: OK</span>
        </div>
        <div className="flex gap-3">
          <span>AXLE 1: 0 RPM</span>
          <span>AXLE 2: 0 RPM</span>
        </div>
      </div>
    </motion.div>
  );
}
