"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Github, Sparkles, ShieldCheck, Terminal } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { sounds } from "@/components/layout/sound-manager";
import { StationBadge } from "@/components/ui/station-badge";

export function HeroSection() {
  const marqueeItems = [
    "SENTINEL-X: AUTONOMOUS CYBERSECURITY INVESTIGATION AGENT",
    "JOURNAL PAPER (UNDER REVIEW): EXPLAINABLE HYPERPARAMETER OPTIMIZATION",
    "CONFERENCE PAPER (UNDER REVIEW): SHAP-BASED STUDENT PERFORMANCE PREDICTION",
    "MULTIMODAL DEEPFAKE DETECTION (AUDIO & VIDEO FUSION)",
    "128,000+ ENTERPRISE RECORDS PREPROCESSED @ CHOICE INDIA",
    "EXPLAINABLE AI (TREESHAP & KERNELSHAP)",
    "OPTUNA BAYESIAN OPTIMIZATION FOR IMBALANCED TABULAR DATA",
    "11 PRODUCTION POWER BI DASHBOARDS & ZOHO ANALYTICS",
    "B.TECH IN AI/ML & DATA SCIENCE · CGPA: 8.17",
  ];

  return (
    <section
      id="hero"
      aria-label="Terminal Origin"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#16181c] pt-24 pb-16 flex flex-col justify-between"
    >
      {/* Background Institutional Railway Grid & Ambient Glows */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="railway-grid absolute inset-0 opacity-35" />
        
        {/* Navy & Restrained Teal Flares */}
        <div className="absolute -top-32 right-[10%] h-[32rem] w-[32rem] rounded-full bg-[#3ad7ff]/10 blur-[150px]" />
        <div className="absolute bottom-10 -left-20 h-[30rem] w-[30rem] rounded-full bg-[#9dfc3f]/8 blur-[150px]" />
        <div className="absolute top-1/2 left-1/3 h-[24rem] w-[24rem] rounded-full bg-[#ff6a1a]/8 blur-[140px]" />

        {/* Rail Tracks */}
        <div className="absolute right-[14%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#3ad7ff]/30 to-transparent" />
        <div className="absolute right-[14.5%] top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-[#3ad7ff]/50 to-transparent" />
        <div className="absolute right-[32%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#ece5d5]/15 to-transparent" />
        <div className="absolute bottom-[22%] left-0 right-0 h-[1px] bg-[#ece5d5]/15" />
        <div className="absolute bottom-[21.5%] left-0 right-0 h-[2px] bg-[#3ad7ff]/40 shadow-[0_0_20px_#3ad7ff]" />
      </div>

      {/* Main Content Area */}
      <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-10 lg:px-14 flex-1 flex flex-col justify-center">
        {/* Top Badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 flex flex-wrap items-center gap-2 sm:gap-3"
        >
          <div className="flex items-center gap-2 border border-[#ece5d5]/25 bg-[#1a1c22] p-1 pr-3 font-mono text-[11px] text-[#ece5d5]">
            <div className="relative h-7 w-7 overflow-hidden border border-[#ff6a1a] shrink-0">
              <Image
                src="/images/harsh-khamkar.jpg"
                alt="Harsh Khamkar"
                fill
                sizes="28px"
                className="object-cover object-top"
                priority
              />
            </div>
            <span className="font-bold tracking-wider">HARSH KHAMKAR</span>
          </div>

          <StationBadge stationNo="01" title="ONLINE · ORIGIN" nextStationId="tracks" nextStationName="TRACKS" accentColor="#3ad7ff" />

          <div className="inline-flex items-center gap-1.5 border border-[#3ad7ff]/50 bg-[#3ad7ff]/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#3ad7ff]">
            <Sparkles size={12} />
            <span>AI/ML & DATA SCIENCE ENGINEER</span>
          </div>

          <div className="inline-flex items-center gap-1.5 border border-[#ffd23a]/50 bg-[#ffd23a]/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#ffd23a]">
            <ShieldCheck size={12} />
            <span>2 PAPERS UNDER REVIEW</span>
          </div>

          <div className="border border-[#ece5d5]/20 bg-[#1e2026]/60 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[#ece5d5]/70">
            UNIVERSAL AI UNIVERSITY · CGPA: 8.17
          </div>
        </motion.div>

        {/* Primary Headline & Professional Positioning */}
        <div className="max-w-6xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-baseline gap-4"
          >
            <h1 className="hero-display text-[clamp(2.5rem,9.5vw,9rem)] text-[#ece5d5] leading-[0.88] break-words">
              HARSH KHAMKAR
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 sm:mt-1 font-mono"
          >
            <span className="text-sm sm:text-2xl font-bold uppercase tracking-wider text-[#3ad7ff]">
              AI/ML ENGINEER
            </span>
            <span className="text-white/40">|</span>
            <span className="text-sm sm:text-2xl font-bold uppercase tracking-wider text-[#9dfc3f]">
              DATA SCIENCE RESEARCHER
            </span>
            <span className="text-white/40">|</span>
            <span className="text-sm sm:text-2xl font-bold uppercase tracking-wider text-[#ffd23a]">
              FINANCIAL ANALYTICS
            </span>
          </motion.div>

          {/* Professional Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 max-w-3xl font-mono text-xs sm:text-base leading-relaxed text-[#ece5d5]/90"
          >
            Building explainable machine-learning systems, evidence-grounded AI agents and data-driven analytical solutions for complex financial and business problems.
          </motion.p>
        </div>

        {/* CTA Launch Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
        >
          <a
            href="#depot"
            onClick={() => sounds.playClick()}
            onMouseEnter={() => sounds.playHover()}
            className="group flex items-center justify-center gap-2.5 border-2 border-[#ff6a1a] bg-[#ff6a1a] px-6 py-3 font-mono text-xs sm:text-sm font-black uppercase tracking-wider text-[#0c1017] transition-all hover:bg-transparent hover:text-[#ff6a1a] shadow-[0_0_18px_rgba(255,106,26,0.3)]"
          >
            <Terminal size={16} />
            <span>EXPLORE RESEARCH &amp; PROJECTS</span>
            <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="#depot"
            onClick={() => sounds.playClick()}
            onMouseEnter={() => sounds.playHover()}
            className="group flex items-center justify-center gap-2.5 border border-[#ece5d5]/25 bg-[#1e2026]/90 px-5 py-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#ece5d5] transition-all hover:border-[#ffd23a] hover:text-[#ffd23a]"
          >
            <span>2 PAPERS UNDER REVIEW</span>
          </a>

          <a
            href="/resume.pdf"
            download="Harsh_Khamkar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            onMouseEnter={() => sounds.playHover()}
            className="flex items-center justify-center gap-2 border border-[#ece5d5]/20 bg-[#16181c] px-4 py-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#ece5d5]/80 transition hover:border-[#9dfc3f] hover:text-[#9dfc3f]"
          >
            <Download size={15} />
            <span>VERIFIED ATS RESUME (PDF)</span>
          </a>
        </motion.div>

        {/* Live Verifiable Evidence Matrix */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-px border border-[#ece5d5]/15 bg-[#ece5d5]/15"
        >
          {[
            { tag: "01 // ACADEMIC RESEARCH", val: "2 Papers Under Review", sub: "Optuna Bayesian & SHAP Explainability" },
            { tag: "02 // ENTERPRISE ANALYTICS", val: "128,000+ Records", sub: "Choice India · 11 Power BI Dashboards" },
            { tag: "03 // ATHLETIC LEADERSHIP", val: "UAI Sports Club", sub: "President & Varsity Athlete" },
            { tag: "04 // DEGREE & CGPA", val: "Universal AI University", sub: "B.Tech AI/ML & Data Science · 8.17 CGPA" },
          ].map((item, idx) => (
            <div key={idx} className="bg-[#16181c]/95 p-3.5 sm:p-5">
              <span className="block font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#3ad7ff]">
                {item.tag}
              </span>
              <p className="mt-1 font-display text-sm sm:text-base font-bold text-white truncate">
                {item.val}
              </p>
              <p className="font-mono text-[10px] sm:text-[11px] text-[#ece5d5]/60 truncate">
                {item.sub}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee Caution Warning Ribbon at bottom of Hero */}
      <div className="mt-10 w-full overflow-hidden border-y border-white/10 bg-[#101114] py-2.5">
        <div className="animate-ticker flex">
          <div className="flex shrink-0 items-center gap-6 pr-6">
            {marqueeItems.map((text, i) => (
              <span
                key={`primary-${i}`}
                className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-[#ece5d5]/90 whitespace-nowrap"
              >
                <span className="text-[#3ad7ff] font-bold">✦</span>
                <span className={i % 2 === 0 ? "text-[#3ad7ff]" : "text-[#ece5d5]"}>{text}</span>
              </span>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-6 pr-6" aria-hidden="true">
            {marqueeItems.map((text, i) => (
              <span
                key={`secondary-${i}`}
                className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-[#ece5d5]/90 whitespace-nowrap"
              >
                <span className="text-[#3ad7ff] font-bold">✦</span>
                <span className={i % 2 === 0 ? "text-[#3ad7ff]" : "text-[#ece5d5]"}>{text}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
