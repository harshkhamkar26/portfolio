"use client";

import { motion } from "framer-motion";
import { tracks } from "@/lib/data/site";
import { sounds } from "@/components/layout/sound-manager";

export function TracksSection() {
  return (
    <section
      id="tracks"
      className="relative py-24 sm:py-32 bg-[#16181c] border-b border-[#ece5d5]/10"
      aria-labelledby="tracks-heading"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-[#ece5d5]/15">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#9dfc3f]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9dfc3f]" />
              STATION 02 // TECHNICAL TRACKS
            </div>
            <h2
              id="tracks-heading"
              className="mt-2 text-3xl font-black uppercase tracking-tight text-[#ece5d5] sm:text-5xl font-display"
            >
              5 CORE SPECIALIZATION TRACKS
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs leading-relaxed text-[#ece5d5]/70">
            Disciplines engineered to bridge academic rigor with real-world enterprise deployment. Select a track to explore competencies.
          </p>
        </div>

        {/* Tracks Grid (Replicating Hack on Track 5-column layout) */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {tracks.map((track, i) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              onMouseEnter={() => sounds.playHover()}
              className="group relative flex flex-col justify-between border border-[#ece5d5]/15 bg-[#1a1c22] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/30"
              style={{
                boxShadow: `0 0 0 1px transparent`,
              }}
            >
              {/* Top Accent Stripe on Hover */}
              <div
                className="absolute top-0 left-0 right-0 h-1 opacity-0 transition-opacity group-hover:opacity-100"
                style={{ backgroundColor: track.accent }}
              />

              <div>
                {/* Track Number & Accent Tag */}
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-2xl font-black tracking-tight"
                    style={{ color: track.accent }}
                  >
                    {track.no}
                  </span>
                  <span
                    className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border"
                    style={{
                      borderColor: `${track.accent}40`,
                      color: track.accent,
                      backgroundColor: `${track.accent}10`,
                    }}
                  >
                    TRACK
                  </span>
                </div>

                {/* Track Title */}
                <h3 className="mt-4 font-display text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#ece5d5]">
                  {track.name}
                </h3>
                <p className="mt-1 font-mono text-xs font-medium text-white/50">
                  {track.long}
                </p>

                {/* Description Line */}
                <p className="mt-4 text-xs leading-relaxed text-[#ece5d5]/75">
                  {track.line}
                </p>
              </div>

              {/* Keywords Pills */}
              <div className="mt-8 pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {track.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="border border-white/10 bg-black/40 px-2 py-0.5 font-mono text-[10px] text-white/70"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
