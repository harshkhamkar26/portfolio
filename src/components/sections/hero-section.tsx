"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, Mail } from "lucide-react";
import { siteConfig } from "@/lib/data/site";

const words = ["DATA", "INTO", "DECISIONS."];

export function HeroSection() {
  return (
    <section id="hero" aria-label="Introduction" className="relative isolate min-h-[100svh] overflow-hidden bg-[#09090d]">
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="station-grid absolute inset-0 opacity-50" />
        <div className="absolute -right-24 top-24 h-[34rem] w-[34rem] rounded-full bg-[#c7ff3d]/10 blur-[120px]" />
        <div className="absolute -left-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#ff572e]/10 blur-[120px]" />
        <div className="station-beam absolute right-[12%] top-0 h-full w-px bg-gradient-to-b from-transparent via-[#c7ff3d]/50 to-transparent" />
        <div className="station-beam station-beam-delay absolute right-[28%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-[18%] left-0 right-0 h-px bg-white/15" />
        <div className="absolute bottom-[17.5%] left-0 right-0 h-[2px] bg-[#c7ff3d]/50 shadow-[0_0_20px_rgba(199,255,61,.5)]" />
        <div className="train-silhouette absolute bottom-[18%] right-[-4%] hidden h-36 w-[54%] border border-white/20 bg-gradient-to-b from-[#24242b]/95 to-[#101015] shadow-2xl md:block">
          <div className="flex h-full items-start gap-2 p-3 opacity-80">
            {Array.from({ length: 7 }).map((_, i) => <div key={i} className="h-16 flex-1 border border-white/20 bg-[#111117]"><div className="m-1 h-2/3 border border-[#c7ff3d]/20 bg-gradient-to-br from-[#20252b] to-[#0a0a0e]" /></div>)}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#ff572e]" />
          <span className="absolute -top-7 right-5 font-mono text-[10px] tracking-[.35em] text-[#c7ff3d]">NEXT STOP // OPPORTUNITY</span>
        </div>
        <div className="absolute bottom-[8%] left-0 right-0 flex justify-between px-6 font-mono text-[9px] tracking-[.3em] text-white/30 sm:px-12">
          <span>19° 04′ N / 72° 52′ E</span><span>INDEPENDENT THINKING · REAL-WORLD DATA</span>
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-center px-5 pb-28 pt-28 sm:px-10 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }} className="mb-7 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 border border-[#c7ff3d]/40 bg-[#c7ff3d]/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[.22em] text-[#d7ff7c]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#c7ff3d]" /> {siteConfig.location} / AVAILABLE FOR OPPORTUNITIES
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[.2em] text-white/40">Portfolio 2026—27</span>
        </motion.div>

        <div className="relative max-w-5xl">
          {words.map((word, index) => (
            <motion.h1 key={word} initial={{ opacity: 0, x: -36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7, delay: .12 + index * .12 }} className={`hero-display leading-[.78] ${index === 1 ? "text-transparent [-webkit-text-stroke:1px_rgba(245,245,240,.65)]" : "text-[#f4f1e8]"} ${index === 2 ? "text-[#c7ff3d]" : ""}`}>
              {word}
            </motion.h1>
          ))}
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: .8, delay: .55 }} className="mt-6 h-1 w-32 origin-left bg-[#ff572e] sm:w-48" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .7 }} className="mt-6 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
            I turn complex data into useful intelligence through <strong className="font-semibold text-white">machine learning, explainable AI, and business analytics.</strong>
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .85 }} className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="group inline-flex min-h-12 items-center gap-3 bg-[#c7ff3d] px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#101015] transition hover:bg-white">Explore selected work <ArrowUpRight size={17} /></a>
          <Link href={siteConfig.resumeUrl} className="inline-flex min-h-12 items-center gap-3 border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-[#c7ff3d] hover:text-[#c7ff3d]"><Download size={16} /> Resume & ATS</Link>
          <a href="#contact" className="inline-flex min-h-12 items-center gap-3 px-4 py-3 text-sm text-white/65 transition hover:text-white"><Mail size={16} /> Contact</a>
        </motion.div>

        <div className="mt-12 grid max-w-3xl grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4">
          {[["01", "Machine learning"], ["02", "Explainable AI"], ["03", "Data analytics"], ["04", "Research & build"]].map(([n, label]) => (
            <div key={n} className="bg-[#0c0c12]/95 p-4 sm:p-5"><p className="font-mono text-xs text-[#ff704e]">{n} /</p><p className="mt-2 text-sm text-white/80">{label}</p></div>
          ))}
        </div>

        <a href="#about" className="absolute bottom-7 right-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.24em] text-white/45 transition hover:text-[#c7ff3d] sm:right-10 lg:right-16"><span>Scroll to explore</span><ArrowDown size={15} /></a>
      </div>
      <div aria-hidden="true" className="absolute right-5 top-1/2 hidden -translate-y-1/2 [writing-mode:vertical-rl] font-mono text-[9px] tracking-[.4em] text-white/25 xl:block">HARSH KHAMKAR · DATA / AI / IMPACT</div>
    </section>
  );
}
