"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LineProgress } from "@/components/layout/line-progress";
import { HudDisplay } from "@/components/layout/hud-display";
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
          THE PORTFOLIO EXPRESS: Fixed Animated Cyber-Train Background Layer
          Fixed viewport, zero click-blocking (pointer-events: none)
          ───────────────────────────────────────────────────────────── */}
      <TrainJourney />

      {/* Film grain overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Right-side vertical railway station progress tracker */}
      <LineProgress />

      {/* Bottom-left telemetry HUD */}
      <HudDisplay />

      {/* Main navigation */}
      <Navbar onCommandOpen={() => setCommandOpen(true)} />

      <main className="relative z-10">
        {/* Station 01: Hero Origin */}
        <HeroSection />

        {/* Station 02: 5 Core Technical Tracks */}
        <TracksSection />

        {/* Station 03: 3D Cylinder Orbit Showcase */}
        <CircularCarousel />

        {/* Station 04: Project Depot Fleet & GitHub API Sync */}
        <DepotSection />

        {/* Station 05: Profile & Tactical Photo HUD */}
        <ProfileSection />

        {/* Station 06: Expedition Journey Timeline */}
        <ExpeditionSection />

        {/* Station 07: Certifications & Athletic Matrix */}
        <MatrixSection />

        {/* Station 08: Comms Dispatch & CLI Terminal */}
        <DispatchTerminal />
      </main>

      <Footer />

      {/* Command Palette */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />

      {/* Optional AI Assistant Drawer */}
      <AIAssistant />
    </SmoothScrollProvider>
  );
}
