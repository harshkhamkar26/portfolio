"use client";

import React from "react";
import { motion } from "framer-motion";

interface CoachFrameProps {
  coachNumber: number;
  coachTitle: string;
  domain?: string;
  accentColor?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable Classic Train Carriage Wrapper Component
 * Encases any existing project card without modifying its layout or interactive buttons.
 * Adds authentic Orient Express / Pullman carriage styling: brass filigree corner brackets,
 * gold leaf pinstripes, embossed coach plates, and safety chain couplings.
 */
export function CoachFrame({
  coachNumber,
  coachTitle,
  domain,
  accentColor = "#d4af37",
  children,
  className = "",
}: CoachFrameProps) {
  const formattedNo = coachNumber.toString().padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`group relative flex flex-col transition-transform duration-300 hover:-translate-y-1 ${className}`}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. INTER-CARRIAGE COUPLING & SAFETY CHAINS
          ───────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none flex items-center justify-between px-4 pb-1 opacity-75"
      >
        {/* Left Screw-Link Hook & Chains */}
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-3 rounded-xs border border-[#d4af37]/60 bg-[#252830]" />
          <div className="h-1 w-5 rounded-full border-t border-b border-[#d4af37]/50" />
        </div>

        {/* Vintage Vacuum Brake Hoses & Steam Heating Pipe */}
        <div className="flex items-center gap-2">
          <div className="h-2 w-1 rounded-full bg-[#8c2a2a]" title="Vacuum Brake Pipe" />
          <div className="h-2 w-1 rounded-full bg-[#d4af37]" title="Steam Heating" />
          <span className="font-serif text-[8px] tracking-wider text-[#d4af37]/80 uppercase">
            PULLMAN INTER-CONNECT
          </span>
          <div className="h-2 w-1 rounded-full bg-[#d4af37]" title="Steam Heating" />
          <div className="h-2 w-1 rounded-full bg-[#8c2a2a]" title="Vacuum Brake Pipe" />
        </div>

        {/* Right Screw-Link Hook */}
        <div className="flex items-center gap-1.5">
          <div className="h-1 w-5 rounded-full border-t border-b border-[#d4af37]/50" />
          <div className="h-2.5 w-3 rounded-xs border border-[#d4af37]/60 bg-[#252830]" />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CARRIAGE ROOF COWLING & EMBOSSED GILDED NAMEPLATE
          ───────────────────────────────────────────────────────────── */}
      <div
        className="relative flex items-center justify-between border-t-2 border-x border-b border-[#d4af37]/40 bg-gradient-to-r from-[#171920] via-[#222530] to-[#171920] px-4 py-2 shadow-md"
        style={{ borderTopColor: accentColor }}
      >
        {/* Ornate Brass Coach Number Badge */}
        <div className="flex items-center gap-2.5">
          <span
            className="font-serif text-[10px] font-bold px-2 py-0.5 bg-black/80 border border-[#d4af37]/60 rounded-xs shadow-inner"
            style={{ color: accentColor }}
          >
            CAR NO. {formattedNo}
          </span>
          <span className="font-serif text-[11px] font-bold tracking-wider text-[#ece5d5] truncate max-w-[210px] sm:max-w-none">
            {coachTitle}
          </span>
        </div>

        {/* Carriage Class & Domain Telemetry */}
        <div className="hidden sm:flex items-center gap-2 font-serif text-[9px] text-[#d4af37]/80">
          {domain && (
            <span className="text-[#e5c07b] border border-[#d4af37]/40 px-1.5 py-0.2 bg-[#d4af37]/10 uppercase tracking-widest">
              {domain}
            </span>
          )}
          <span>{`SALOON // CAR NO. ${formattedNo}`}</span>
        </div>

        {/* Polished Brass Corner Rivets */}
        <div className="flex gap-1.5 opacity-60">
          <div className="h-1.5 w-1.5 rounded-full bg-[#d4af37] shadow-[0_0_2px_#d4af37]" />
          <div className="h-1.5 w-1.5 rounded-full bg-[#d4af37] shadow-[0_0_2px_#d4af37]" />
          <div className="h-1.5 w-1.5 rounded-full bg-[#d4af37] shadow-[0_0_2px_#d4af37]" />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. COMPARTMENT CABIN (Window Frame Housing Original Card)
          ───────────────────────────────────────────────────────────── */}
      <div className="relative flex-1 border-x border-b border-[#d4af37]/30 bg-[#131418] shadow-2xl">
        {/* Subtle Warm Amber Interior Lamp Light Sheen (Non-blocking) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.015] to-[#ffd23a]/[0.035] z-1"
        />

        {/* Preserved Original Project Card Content */}
        <div className="relative z-2 h-full">
          {children}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. UNDERBODY RUNNING GEAR & CAST IRON TRUCK SILL
          ───────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none flex items-center justify-between border-x border-b border-[#d4af37]/30 bg-[#0e0f13] px-5 py-1.5 opacity-85"
      >
        {/* Front Bogie Axle Box & Equalizer Beam */}
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full border border-[#d4af37]/50 bg-[#282a34]" />
          <div className="h-1 w-7 bg-[#d4af37]/30" />
          <div className="h-2.5 w-2.5 rounded-full border border-[#d4af37]/50 bg-[#282a34]" />
        </div>

        {/* Underfloor Cast Iron Battery / Dynamo Box */}
        <div className="h-2.5 w-20 rounded-xs border border-[#d4af37]/30 bg-[#16181c] flex items-center justify-center">
          <span className="font-serif text-[7px] text-[#d4af37]/70 tracking-widest uppercase">
            STONE DYNAMO
          </span>
        </div>

        {/* Rear Bogie Axle Box */}
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full border border-[#d4af37]/50 bg-[#282a34]" />
          <div className="h-1 w-7 bg-[#d4af37]/30" />
          <div className="h-2.5 w-2.5 rounded-full border border-[#d4af37]/50 bg-[#282a34]" />
        </div>
      </div>
    </motion.div>
  );
}
