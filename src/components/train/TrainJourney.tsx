"use client";

import { useTrainScroll } from "./useTrainScroll";
import { ParallaxLayers } from "./ParallaxLayers";
import { Track } from "./Track";
import { Locomotive } from "./Locomotive";
import { SteamParticles } from "./SteamParticles";
import { StationToast } from "./StationToast";
import { stationStops } from "@/lib/data/site";

/**
 * The Portfolio Express - Master Train Journey Orchestrator
 * Full-screen fixed layer (pointer-events: none) providing the cinematic
 * railway scroll experience without altering any existing section layouts.
 */
export function TrainJourney() {
  const {
    smoothProgress,
    speedFactor,
    scrollPercent,
    currentStation,
    activeStationIndex,
    isTerminus,
  } = useTrainScroll();

  return (
    <div
      aria-hidden="true"
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
          3. STEAM & BRAKE SPARK PARTICLE EMITTER
          ───────────────────────────────────────────────────────────── */}
      <SteamParticles
        smoothProgress={smoothProgress}
        speedFactor={speedFactor}
        scrollPercent={scrollPercent}
      />

      {/* ─────────────────────────────────────────────────────────────
          4. THE CYBER BULLET LOCOMOTIVE
          ───────────────────────────────────────────────────────────── */}
      <Locomotive
        smoothProgress={smoothProgress}
        speedFactor={speedFactor}
        scrollPercent={scrollPercent}
      />

      {/* ─────────────────────────────────────────────────────────────
          5. STATION WAYPOINT TOAST NOTIFICATION
          ───────────────────────────────────────────────────────────── */}
      <StationToast currentStation={currentStation} />

      {/* ─────────────────────────────────────────────────────────────
          6. MINI TRAIN-POSITION HUD RAIL PROGRESS BAR (Left Edge)
          ───────────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex fixed left-5 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3">
        {/* Rail Vertical Guide */}
        <div className="relative flex flex-col items-center py-2">
          <div className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ff6a1a] via-[#3ad7ff] to-[#9dfc3f] opacity-30" />

          {/* 8 Station Waypoint Indicators */}
          <div className="relative z-10 flex flex-col items-center gap-5">
            {stationStops.map((st, i) => {
              const isActive = i === activeStationIndex;
              const isPassed = i < activeStationIndex;

              return (
                <div
                  key={st.id}
                  className="group relative flex items-center"
                  title={`Station ${st.no}: ${st.name}`}
                >
                  {/* Waypoint Dot */}
                  <div
                    className={`h-2 w-2 rounded-full border transition-all duration-300 ${
                      isActive
                        ? "border-[#ff6a1a] bg-[#ff6a1a] shadow-[0_0_10px_#ff6a1a] scale-125"
                        : isPassed
                        ? "border-[#9dfc3f] bg-[#9dfc3f]/40"
                        : "border-white/20 bg-[#16181c]"
                    }`}
                  />

                  {/* Waypoint Station Label on Hover */}
                  <span className="pointer-events-none absolute left-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 font-mono text-[9px] uppercase tracking-widest text-white whitespace-nowrap bg-black/80 px-2 py-0.5 border border-white/10">
                    {st.no} · {st.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Miniature Train Icon Indicator */}
        <div className="border border-white/15 bg-black/80 px-1.5 py-0.5 font-mono text-[8px] text-[#3ad7ff] tracking-widest shadow-md">
          {scrollPercent}% EXP
        </div>
      </div>
    </div>
  );
}
