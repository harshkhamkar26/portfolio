"use client";

import { motion } from "framer-motion";
import { experiences, journeyTimeline } from "@/lib/data/site";
import { sounds } from "@/components/layout/sound-manager";

export function ExpeditionSection() {
  return (
    <section
      id="expedition"
      className="relative py-24 sm:py-32 bg-[#131418] border-b border-[#ece5d5]/10"
      aria-labelledby="expedition-heading"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-[#ece5d5]/15">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#ffd23a]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ffd23a]" />
              STATION 06 // EXPEDITION TIMELINE
            </div>
            <h2
              id="expedition-heading"
              className="mt-2 text-3xl font-black uppercase tracking-tight text-[#ece5d5] sm:text-5xl font-display"
            >
              CHRONICLES OF INDUSTRY &amp; CAMPUS
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs leading-relaxed text-[#ece5d5]/70">
            A milestone-by-milestone traversal of corporate internships, campus leadership, and analytical engineering.
          </p>
        </div>

        {/* Railway Timeline Track */}
        <div className="relative mt-16">
          {/* Vertical Glowing Track Line */}
          <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ff6a1a] via-[#9dfc3f] to-[#3ad7ff] md:left-1/2 md:-translate-x-1/2 opacity-60" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  onMouseEnter={() => sounds.playHover()}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Waypoint Dot */}
                  <div
                    className="absolute left-4 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-[#16181c] md:left-1/2 z-10"
                    style={{ borderColor: exp.color }}
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: exp.color }}
                    />
                  </div>

                  {/* Empty Spacer Half */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card Content Half */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      isEven ? "md:pr-12" : "md:pl-12"
                    } w-full`}
                  >
                    <div
                      className="border border-[#ece5d5]/15 bg-[#1a1c22] p-6 sm:p-8 transition-all hover:border-white/30"
                      style={{ borderLeftColor: exp.color, borderLeftWidth: "4px" }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                        <span
                          className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border"
                          style={{
                            borderColor: `${exp.color}50`,
                            color: exp.color,
                            backgroundColor: `${exp.color}10`,
                          }}
                        >
                          {exp.badge}
                        </span>
                        <span className="font-mono text-xs text-white/50">
                          {exp.period}
                        </span>
                      </div>

                      <h3 className="mt-3 font-display text-xl sm:text-2xl font-black uppercase text-white">
                        {exp.company}
                      </h3>
                      <p
                        className="font-mono text-xs font-bold mt-0.5"
                        style={{ color: exp.color }}
                      >
                        {exp.role} · {exp.location}
                      </p>

                      <ul className="mt-4 space-y-2 font-mono text-xs text-[#ece5d5]/80">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="flex gap-2">
                            <span style={{ color: exp.color }}>▸</span>
                            <span className="leading-relaxed">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Academic Journey Roadmap */}
        <div className="mt-20 border border-[#ece5d5]/15 bg-[#16181c] p-6 sm:p-8">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#9dfc3f] mb-4">
            <span>STATION WAYPOINTS // ACADEMIC ROADMAP</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {journeyTimeline.map((item, i) => (
              <div key={i} className="border border-white/10 bg-black/25 p-4">
                <span className="font-mono text-xs font-black text-[#ff6a1a]">
                  {item.year}
                </span>
                <p className="mt-1 font-display text-sm font-bold text-white">
                  {item.title}
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-[#9dfc3f]">
                  {item.institution}
                </p>
                <p className="mt-2 text-xs text-[#ece5d5]/65 leading-relaxed">
                  {item.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
