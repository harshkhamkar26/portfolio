"use client";

import { motion } from "framer-motion";
import { experiences, journeyTimeline } from "@/lib/data/site";
import { sounds } from "@/components/layout/sound-manager";
import { StationBadge } from "@/components/ui/station-badge";
import { Briefcase, BookOpen, GraduationCap, ArrowUpRight } from "lucide-react";

export function ExpeditionSection() {
  const internships = experiences.filter((e) => e.badge === "Industry Internship");
  const institutional = experiences.filter((e) => e.badge === "Institutional Leadership");

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
            <StationBadge stationNo="06" title="EXPERIENCE & TIMELINE" nextStationId="matrix" nextStationName="MATRIX" accentColor="#ff6a1a" />
            <h2
              id="expedition-heading"
              className="mt-2 text-3xl font-black uppercase tracking-tight text-[#ece5d5] sm:text-5xl font-display"
            >
              INDUSTRY EXPERIENCE &amp; ROADMAP
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs leading-relaxed text-[#ece5d5]/70">
            Chronological log separating corporate industry internships, academic research milestones, and institutional field operations.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SUBSECTION 1: INDUSTRY INTERNSHIPS (Choice India & One Globe)
            ───────────────────────────────────────────────────────────── */}
        <div className="mt-14">
          <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-3">
            <Briefcase size={16} className="text-[#3ad7ff]" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#3ad7ff] font-bold">
              INDUSTRY INTERNSHIPS &amp; CORPORATE ANALYTICS
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {internships.map((exp, idx) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => sounds.playHover()}
                className="border border-[#ece5d5]/15 bg-[#181a22] p-6 sm:p-8 flex flex-col justify-between shadow-xl"
                style={{ borderLeft: `4px solid ${exp.color}` }}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 mb-4">
                    <span
                      className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border"
                      style={{
                        borderColor: `${exp.color}50`,
                        color: exp.color,
                        backgroundColor: `${exp.color}15`,
                      }}
                    >
                      {exp.badge}
                    </span>
                    <span className="font-mono text-xs text-white/50">{exp.period}</span>
                  </div>

                  <h4 className="font-display text-xl sm:text-2xl font-black uppercase text-white">
                    {exp.company}
                  </h4>
                  <p className="font-mono text-xs font-bold mt-1" style={{ color: exp.color }}>
                    {exp.role} · {exp.location}
                  </p>

                  <ul className="mt-5 space-y-2.5 font-mono text-xs text-[#ece5d5]/85">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2.5 items-start">
                        <span style={{ color: exp.color }} className="shrink-0 mt-0.5">▸</span>
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[10px] text-white/50 flex justify-between">
                  <span>VERIFICATION: Direct Internship Certificate &amp; Deliverables</span>
                  <span className="text-[#9dfc3f]">ACTIVE / COMPLETED</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SUBSECTION 2: INSTITUTIONAL LEADERSHIP & FIELD ENGAGEMENTS
            ───────────────────────────────────────────────────────────── */}
        <div className="mt-14 pt-10 border-t border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap size={16} className="text-[#9dfc3f]" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#9dfc3f] font-bold">
              INSTITUTIONAL FIELD OPERATIONS &amp; DEMOGRAPHIC RESEARCH
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {institutional.map((exp) => (
              <div
                key={exp.company}
                className="border border-white/15 bg-[#161820] p-6 sm:p-7 shadow-lg"
                style={{ borderLeft: `4px solid ${exp.color}` }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 mb-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#3ad7ff]">
                    {exp.badge}
                  </span>
                  <span className="font-mono text-xs text-white/50">{exp.period}</span>
                </div>

                <h4 className="font-display text-xl font-bold uppercase text-white">
                  {exp.company}
                </h4>
                <p className="font-mono text-xs text-[#3ad7ff] mt-0.5">
                  {exp.role} · {exp.location}
                </p>

                <ul className="mt-4 space-y-2 font-mono text-xs text-[#ece5d5]/80">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="text-[#3ad7ff]">▸</span>
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SUBSECTION 3: ACADEMIC & RESEARCH ROADMAP
            ───────────────────────────────────────────────────────────── */}
        <div className="mt-14 border border-[#ece5d5]/15 bg-[#16181c] p-6 sm:p-8">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-6">
            <BookOpen size={16} className="text-[#ffd23a]" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#ffd23a] font-bold">
              INTEGRATED CAREER &amp; RESEARCH TRAJECTORY
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {journeyTimeline.map((item, idx) => (
              <div key={idx} className="border border-white/10 bg-black/30 p-4 font-mono text-xs flex flex-col justify-between">
                <div>
                  <span className="text-[#3ad7ff] font-bold text-[10px] block mb-1">
                    {item.year}
                  </span>
                  <p className="font-bold text-white text-[12px]">{item.title}</p>
                  <p className="text-white/50 text-[10px] mt-0.5">{item.institution}</p>
                  <p className="mt-2.5 text-[11px] text-[#ece5d5]/75 leading-relaxed">
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
