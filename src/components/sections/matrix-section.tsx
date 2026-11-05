"use client";

import { motion } from "framer-motion";
import { Award, Trophy, CheckCircle2, ShieldCheck, Code, Layers } from "lucide-react";
import { certifications, leadership } from "@/lib/data/site";
import { verifiedSkillsData } from "@/lib/data/skills";
import { sounds } from "@/components/layout/sound-manager";
import { StationBadge } from "@/components/ui/station-badge";

export function MatrixSection() {
  return (
    <section
      id="matrix"
      className="relative py-24 sm:py-32 bg-[#16181c] border-b border-[#ece5d5]/10"
      aria-labelledby="matrix-heading"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-[#ece5d5]/15">
          <div>
            <StationBadge stationNo="07" title="SKILLS & ACCREDITATIONS MATRIX" nextStationId="terminal" nextStationName="COMMS" accentColor="#ffd23a" />
            <h2
              id="matrix-heading"
              className="mt-2 text-3xl font-black uppercase tracking-tight text-[#ece5d5] sm:text-5xl font-display"
            >
              TECHNICAL SKILLS &amp; CREDENTIALS MATRIX
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs leading-relaxed text-[#ece5d5]/70">
            Categorized technical stack substantiated by project implementations, research manuscripts, verified coursework, and executive athletics.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SUBSECTION 1: 7 VERIFIED TECHNICAL SKILL CATEGORIES
            Substantiated evidence for each tool
            ───────────────────────────────────────────────────────────── */}
        <div className="mt-14">
          <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-3">
            <Code size={16} className="text-[#3ad7ff]" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#3ad7ff] font-bold">
              VERIFIABLE TECHNICAL PROFICIENCY &amp; TOOLS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verifiedSkillsData.map((group, idx) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="border border-[#ece5d5]/15 bg-[#191b22] p-5 sm:p-6 flex flex-col justify-between shadow-lg"
                style={{ borderTop: `3px solid ${group.accent}` }}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                    <span className="font-mono text-[10px] text-white/50">{group.code}</span>
                    <span
                      className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border"
                      style={{
                        borderColor: `${group.accent}50`,
                        color: group.accent,
                        backgroundColor: `${group.accent}15`,
                      }}
                    >
                      VERIFIED
                    </span>
                  </div>

                  <h4 className="font-display text-lg font-black uppercase text-white">
                    {group.category}
                  </h4>
                  <p className="font-mono text-[11px] text-[#ece5d5]/60 mt-1 leading-relaxed">
                    {group.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/10 space-y-2.5">
                    {group.skills.map((sk) => (
                      <div key={sk.name} className="font-mono text-xs">
                        <div className="flex items-center gap-1.5 text-white font-bold">
                          <span style={{ color: group.accent }}>▪</span>
                          <span>{sk.name}</span>
                        </div>
                        <p className="text-[10px] text-white/60 pl-3 leading-snug mt-0.5">
                          {sk.verification}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SUBSECTION 2: VERIFIED ACCREDITATIONS & CERTIFICATIONS
            ───────────────────────────────────────────────────────────── */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <Award size={16} className="text-[#ffd23a]" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#ffd23a] font-bold">
              FORMAL TECHNICAL ACCREDITATIONS
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                onMouseEnter={() => sounds.playHover()}
                className="group border border-[#ece5d5]/15 bg-[#191b22] p-5 transition-all hover:border-white/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border"
                      style={{
                        borderColor: `${cert.accent}50`,
                        color: cert.accent,
                        backgroundColor: `${cert.accent}10`,
                      }}
                    >
                      {cert.tag}
                    </span>
                    <span className="font-mono text-xs text-white/50">{cert.year}</span>
                  </div>

                  <h4 className="mt-3 font-display text-base font-bold text-white group-hover:text-[#ece5d5]">
                    {cert.name}
                  </h4>
                  <p className="font-mono text-xs text-[#3ad7ff] mt-0.5">{cert.issuer}</p>

                  <p className="mt-2.5 text-xs text-[#ece5d5]/70 leading-relaxed font-mono">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 font-mono text-[10px] text-white/40">
                  VERIFIED CREDENTIAL
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SUBSECTION 3: EXECUTIVE LEADERSHIP & VARSITY ATHLETICS
            ───────────────────────────────────────────────────────────── */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <Trophy size={16} className="text-[#9dfc3f]" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#9dfc3f] font-bold">
              EXECUTIVE ATHLETICS &amp; HIGH-PRESSURE COMPOSURE
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadership.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                onMouseEnter={() => sounds.playHover()}
                className="group border border-white/15 bg-[#14151a] p-6 transition-all hover:border-[#9dfc3f]/50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-[#9dfc3f]/40 text-[#9dfc3f] bg-[#9dfc3f]/10">
                      {item.badge}
                    </span>
                    <Trophy size={15} className="text-[#ffd23a]" />
                  </div>

                  <h4 className="mt-3 font-display text-lg font-black uppercase text-white group-hover:text-[#9dfc3f]">
                    {item.title}
                  </h4>
                  <p className="font-mono text-xs text-[#ece5d5]/60 mt-0.5">
                    {item.org}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-[#ece5d5]/75 font-mono">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
