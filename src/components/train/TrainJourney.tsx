"use client";

import { useTrainScroll } from "./useTrainScroll";
import { ParallaxLayers } from "./ParallaxLayers";
import { Track } from "./Track";
import { Locomotive } from "./Locomotive";
import { StationToast } from "./StationToast";

/**
 * The Portfolio Express - Master Train Journey Orchestrator (Classic Steam Railway)
 * Full-screen fixed layer providing the nostalgic Orient Express steam railway
 * interactive scroll experience with responsive movements, audio cues, and waypoints.
 * Pointer-events none to guarantee zero interference with page controls.
 */
export function TrainJourney() {
  const {
    smoothProgress,
    velocity,
    speedFactor,
    scrollPercent,
    currentStation,
    isTerminus,
  } = useTrainScroll();

  return (
    <div
      aria-hidden="false"
      className="pointer-events-none fixed inset-0 z-15 overflow-hidden select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. PARALLAX SCENERY LAYERS (Moving in opposite direction)
          ───────────────────────────────────────────────────────────── */}
      <ParallaxLayers
        smoothProgress={smoothProgress}
        speedFactor={speedFactor}
      />

      {/* ─────────────────────────────────────────────────────────────
          2. FIXED CONTINUOUS RAIL TRACK & STATION BUFFERS
          ───────────────────────────────────────────────────────────── */}
      <Track
        smoothProgress={smoothProgress}
        scrollPercent={scrollPercent}
        isTerminus={isTerminus}
      />

      {/* ─────────────────────────────────────────────────────────────
          3. THE INTERACTIVE CLASSIC STEAM LOCOMOTIVE & LUXURY COACH
          ───────────────────────────────────────────────────────────── */}
      <Locomotive
        smoothProgress={smoothProgress}
        speedFactor={speedFactor}
        velocity={velocity}
        scrollPercent={scrollPercent}
        currentStation={currentStation}
      />

      {/* ─────────────────────────────────────────────────────────────
          4. STATION WAYPOINT TOAST NOTIFICATION
          ───────────────────────────────────────────────────────────── */}
      <StationToast currentStation={currentStation} />
    </div>
  );
}
