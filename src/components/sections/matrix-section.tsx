"use client";

import { motion } from "framer-motion";
import { Award, Trophy } from "lucide-react";
import { certifications, leadership } from "@/lib/data/site";
import { sounds } from "@/components/layout/sound-manager";

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
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#ff2e97]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff2e97]" />
              STATION 07 // CREDENTIALS &amp; ATHLETIC HONORS
            </div>
            <h2
              id="matrix-heading"
              className="mt-2 text-3xl font-black uppercase tracking-tight text-[#ece5d5] sm:text-5xl font-display"
            >
              CERTIFICATIONS &amp; LEADERSHIP MATRIX
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs leading-relaxed text-[#ece5d5]/70">
            Validated technical proficiencies backed by edX, Columbia University, DataCamp, HCLTech, and competitive championship sports.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="mt-12">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff6a1a] mb-6 flex items-center gap-2">
            <Award size={16} /> VERIFIED ACCREDITATIONS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                onMouseEnter={() => sounds.playHover()}
                className="group border border-[#ece5d5]/15 bg-[#1a1c22] p-5 transition-all hover:border-white/30"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border"
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

                <h4 className="mt-3 font-display text-lg font-bold text-white group-hover:text-[#ece5d5]">
                  {cert.name}
                </h4>
                <p className="font-mono text-xs text-[#9dfc3f] mt-0.5">{cert.issuer}</p>

                <p className="mt-3 text-xs text-[#ece5d5]/70 leading-relaxed">
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leadership & Athletic Honors */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#3ad7ff] mb-6 flex items-center gap-2">
            <Trophy size={16} /> EXECUTIVE LEADERSHIP &amp; VARSITY ATHLETICS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leadership.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                onMouseEnter={() => sounds.playHover()}
                className="group border border-white/15 bg-[#14151a] p-6 transition-all hover:border-[#3ad7ff]/50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border border-[#3ad7ff]/40 text-[#3ad7ff] bg-[#3ad7ff]/10">
                    {item.badge}
                  </span>
                  <Trophy size={16} className="text-[#ffd23a]" />
                </div>

                <h4 className="mt-3 font-display text-xl font-black uppercase text-white group-hover:text-[#3ad7ff]">
                  {item.title}
                </h4>
                <p className="font-mono text-xs text-[#ece5d5]/60 mt-0.5">
                  {item.org}
                </p>

                <p className="mt-3 text-xs leading-relaxed text-[#ece5d5]/75">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
