"use client";

import { motion } from "framer-motion";
import { tracks } from "@/lib/data/site";
import { sounds } from "@/components/layout/sound-manager";
import { StationBadge } from "@/components/ui/station-badge";
import { ArrowUpRight, CheckCircle2, Layers } from "lucide-react";

export function TracksSection() {
  return (
    <section
      id="tracks"
      className="relative py-24 sm:py-32 bg-[#14161c] border-b border-[#ece5d5]/10"
      aria-labelledby="tracks-heading"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-[#ece5d5]/15">
          <div>
            <StationBadge stationNo="02" title="TECHNICAL TRACKS" nextStationId="showcase" nextStationName="FLAGSHIP" accentColor="#3ad7ff" />
            <h2
              id="tracks-heading"
              className="mt-2 text-3xl font-black uppercase tracking-tight text-[#ece5d5] sm:text-5xl font-display"
            >
              4 CORE TECHNICAL DISCIPLINES
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs leading-relaxed text-[#ece5d5]/70">
            Disciplines engineered to bridge academic rigor with enterprise deployment. Grounded in quantitative reasoning, verifiable evidence, and transparent AI system design.
          </p>
        </div>

        {/* 4-Column Core Engineering & Quantitative Tracks */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tracks.map((track, i) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              onMouseEnter={() => sounds.playHover()}
              className="group relative flex flex-col justify-between border border-[#ece5d5]/15 bg-[#181a22] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/30"
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
                    CORE DISCIPLINE
                  </span>
                </div>

                {/* Track Title */}
                <h3 className="mt-4 font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#ece5d5]">
                  {track.name}
                </h3>
                <p className="mt-1 font-mono text-xs font-medium text-white/50">
                  {track.long}
                </p>

                {/* Description Line */}
                <p className="mt-4 text-xs leading-relaxed text-[#ece5d5]/75 font-mono">
                  {track.line}
                </p>

                {/* Relevant Skills */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <span className="font-mono text-[10px] uppercase font-bold text-white/50 block mb-2">
                    RELEVANT SKILLS:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {track.skills.map((sk) => (
                      <span
                        key={sk}
                        className="border border-white/10 bg-black/40 px-2 py-0.5 font-mono text-[10px] text-white/80"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Practical Applications */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <span className="font-mono text-[10px] uppercase font-bold text-white/50 block mb-2">
                    PRACTICAL APPLICATIONS:
                  </span>
                  <ul className="space-y-1 font-mono text-[11px] text-[#ece5d5]/70">
                    {track.applications.map((app, aIdx) => (
                      <li key={aIdx} className="flex gap-1.5 items-start">
                        <span style={{ color: track.accent }}>▸</span>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Related Projects & Actual Evidence from Work */}
              <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-white/50 block mb-1.5">
                    RELATED WORK:
                  </span>
                  <div className="space-y-1">
                    {track.relatedProjects.map((rp) => (
                      <a
                        key={rp.slug}
                        href="#depot"
                        className="flex items-center justify-between font-mono text-[11px] text-white/90 hover:underline"
                        style={{ color: track.accent }}
                      >
                        <span>{rp.name}</span>
                        <ArrowUpRight size={11} />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 bg-black/40 border border-white/10 text-[10px] font-mono text-[#ece5d5]/70 leading-relaxed">
                  <span className="text-[#9dfc3f] font-bold block mb-0.5 flex items-center gap-1">
                    <CheckCircle2 size={11} /> VERIFIABLE EVIDENCE:
                  </span>
                  {track.evidence}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
