"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandPalette } from "@/components/layout/command-palette";
import { HeroSection } from "@/components/sections/hero-section";
import { TracksSection } from "@/components/sections/tracks-section";
import { CircularCarousel } from "@/components/sections/circular-carousel";
import { DepotSection } from "@/components/sections/depot-section";
import { ProfileSection } from "@/components/sections/profile-section";
import { ExpeditionSection } from "@/components/sections/expedition-section";
import { MatrixSection } from "@/components/sections/matrix-section";
import { DispatchTerminal } from "@/components/sections/dispatch-terminal";
import { SmoothScrollProvider } from "@/components/effects/smooth-scroll";
import { TrainJourney } from "@/components/train/TrainJourney";

const AIAssistant = dynamic(
  () => import("@/components/sections/ai-assistant").then((m) => m.AIAssistant),
  { ssr: false, loading: () => null }
);

export function HomeClient() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <SmoothScrollProvider>
      {/* ─────────────────────────────────────────────────────────────
          THE PORTFOLIO EXPRESS: Fixed Animated Steam Railway Background Layer
          Fixed viewport, zero click-blocking (pointer-events: none)
          ───────────────────────────────────────────────────────────── */}
      <TrainJourney />

      {/* Film grain overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Main navigation */}
      <Navbar onCommandOpen={() => setCommandOpen(true)} />

      <main className="relative z-10">
        {/* Station 01: Hero Origin */}
        <HeroSection />

        {/* Station 02: 4 Core Technical Disciplines */}
        <TracksSection />

        {/* Station 03: Flagship Work in 3D Orbit */}
        <CircularCarousel />

        {/* Station 04: Project Depot Fleet & Research Manuscripts */}
        <DepotSection />

        {/* Station 05: Data Science Engineer Profile & Arsenal */}
        <ProfileSection />

        {/* Station 06: Career Expedition & Research Milestones */}
        <ExpeditionSection />

        {/* Station 07: Competency Matrix & Athletic Accolades */}
        <MatrixSection />

        {/* Station 08: Dispatch Terminal & Secure Transmission */}
        <DispatchTerminal />
      </main>

      {/* Terminal Footer */}
      <Footer />

      {/* Interactive AI Locomotive Engineer Assistant (Conductor AI) */}
      <AIAssistant />

      {/* Keyboard Command Palette (Ctrl+K) */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </SmoothScrollProvider>
  );
}
