"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Github, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { sounds } from "@/components/layout/sound-manager";

export function HeroSection() {
  const marqueeItems = [
    "JOURNAL PAPER (UNDER REVIEW): EXPLAINABLE HYPERPARAMETER OPTIMIZATION",
    "CONFERENCE PAPER (UNDER REVIEW): SHAP-BASED STUDENT PERFORMANCE PREDICTION",
    "EXPLAINABLE AI (TREE-SHAP & OPTUNA)",
    "128,000+ ENTERPRISE RECORDS",
    "DATA ANALYST INTERN @ CHOICE INDIA",
    "MULTIMODAL DEEPFAKE DETECTION",
    "AGENTIC SOC (SENTINEL-X)",
    "B.TECH IN AI/ML · UNIVERSAL AI UNIVERSITY",
    "POWER BI & ZOHO ANALYTICS",
    "PRESIDENT · UAI SPORTS CLUB",
    "NATIONAL BASKETBALL ATHLETE",
  ];

  return (
    <section
      id="hero"
      aria-label="Terminal Origin"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#16181c] pt-24 pb-16 flex flex-col justify-between"
    >
      {/* Background Cyber-Railway Grid & Ambient Glows */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="railway-grid absolute inset-0 opacity-40" />
        
        {/* Neon Light Flares */}
        <div className="absolute -top-32 right-[10%] h-[32rem] w-[32rem] rounded-full bg-[#ff6a1a]/12 blur-[140px]" />
        <div className="absolute bottom-10 -left-20 h-[30rem] w-[30rem] rounded-full bg-[#9dfc3f]/10 blur-[140px]" />
        <div className="absolute top-1/2 left-1/3 h-[24rem] w-[24rem] rounded-full bg-[#3ad7ff]/8 blur-[120px]" />

        {/* Rail Tracks */}
        <div className="absolute right-[14%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#ff6a1a]/40 to-transparent" />
        <div className="absolute right-[14.5%] top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-[#ff6a1a]/60 to-transparent" />
        <div className="absolute right-[32%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#ece5d5]/15 to-transparent" />
        <div className="absolute bottom-[22%] left-0 right-0 h-[1px] bg-[#ece5d5]/15" />
        <div className="absolute bottom-[21.5%] left-0 right-0 h-[2px] bg-[#ff6a1a]/50 shadow-[0_0_20px_#ff6a1a]" />
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

          <div className="inline-flex items-center gap-2 border border-[#9dfc3f]/50 bg-[#9dfc3f]/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#9dfc3f]">
            <span className="h-2 w-2 rounded-full bg-[#9dfc3f] animate-ping opacity-80" />
            <span className="h-2 w-2 rounded-full bg-[#9dfc3f] -ml-4" />
            STATION 01 // ONLINE
          </div>

          <div className="inline-flex items-center gap-1.5 border border-[#ffd23a]/50 bg-[#ffd23a]/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#ffd23a]">
            <Sparkles size={12} />
            <span>2 PAPERS UNDER REVIEW</span>
          </div>

          <div className="border border-[#ece5d5]/20 bg-[#1e2026]/60 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[#ece5d5]/70">
            MUMBAI, IN · 18.98° N
          </div>
        </motion.div>

        {/* Big Bold Condensed Headline (Fluid & Mobile Optimized) */}
        <div className="max-w-6xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-baseline gap-4"
          >
            <h1 className="hero-display text-[clamp(2.5rem,10vw,9.5rem)] text-[#ece5d5] leading-[0.88] break-words">
              HARSH KHAMKAR
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 sm:mt-0"
          >
            <span className="hero-display text-[clamp(1.75rem,7.5vw,7.5rem)] text-transparent [-webkit-text-stroke:1.5px_#ff6a1a] sm:[-webkit-text-stroke:2px_#ff6a1a] drop-shadow-[0_0_24px_rgba(255,106,26,0.35)] leading-tight">
              DATA SCIENCE ENGINEER
            </span>
            <span className="font-marker text-lg sm:text-2xl text-[#9dfc3f] -rotate-3 sm:ml-2">
              &amp; ML Researcher
            </span>
          </motion.div>

          {/* Punchy statement */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 max-w-3xl font-mono text-xs sm:text-base leading-relaxed text-[#ece5d5]/85"
          >
            B.Tech in Artificial Intelligence &amp; Data Science at{" "}
            <strong className="text-white font-bold underline decoration-[#ff6a1a] decoration-2 underline-offset-4">
              Universal AI University
            </strong>
            . Turning high-dimensional complexity into auditable signals through explainable machine learning (TreeSHAP), 2 peer-reviewed research papers under review, and 128k+ row enterprise analytics pipelines.
          </motion.p>
        </div>

        {/* CTA Launch Buttons (Fluid on Mobile) */}
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
            className="group flex items-center justify-center gap-2.5 border-2 border-[#ff6a1a] bg-[#ff6a1a] px-6 py-3 font-mono text-xs sm:text-sm font-black uppercase tracking-wider text-[#16181c] transition-all hover:bg-transparent hover:text-[#ff6a1a]"
          >
            <span>EXPLORE WORK &amp; PAPERS</span>
            <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            onMouseEnter={() => sounds.playHover()}
            className="group flex items-center justify-center gap-2 border border-[#ece5d5]/25 bg-[#1e2026]/90 px-5 py-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#ece5d5] transition-all hover:border-[#9dfc3f] hover:text-[#9dfc3f]"
          >
            <Github size={16} />
            <span>GITHUB [@harshkhamkar26]</span>
          </a>

          <a
            href="/resume.pdf"
            download="Harsh_Khamkar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            onMouseEnter={() => sounds.playHover()}
            className="flex items-center justify-center gap-2 border border-[#ece5d5]/20 bg-[#16181c] px-4 py-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#ece5d5]/80 transition hover:border-[#ffd23a] hover:text-[#ffd23a]"
          >
            <Download size={15} />
            <span>RESUME (ATS OPTIMIZED)</span>
          </a>
        </motion.div>

        {/* Live Station Indicators Matrix */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-px border border-[#ece5d5]/15 bg-[#ece5d5]/15"
        >
          {[
            { tag: "01 // CURRENT INTERNSHIP", val: "Choice India", sub: "Data Analyst & Business Analyst" },
            { tag: "02 // PREV EXPERIENCE", val: "One Globe Build Con", sub: "Tech & Innovation Division" },
            { tag: "03 // ATHLETIC DRIVE", val: "UAI Sports Club", sub: "President & Varsity Athlete" },
            { tag: "04 // RESEARCH STATUS", val: "2 Papers Under Review", sub: "Journal & Conference XAI" },
          ].map((item, idx) => (
            <div key={idx} className="bg-[#16181c]/95 p-3.5 sm:p-5">
              <span className="block font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#ff6a1a]">
                {item.tag}
              </span>
              <p className="mt-1 font-display text-sm sm:text-lg font-bold text-white truncate">
                {item.val}
              </p>
              <p className="font-mono text-[10px] sm:text-[11px] text-[#ece5d5]/60 truncate">
                {item.sub}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee Caution Warning Ribbon at bottom of Hero (Seamless Gapless Loop) */}
      <div className="mt-10 w-full overflow-hidden border-y border-[#ff6a1a]/40 bg-[#101114] py-2.5">
        <div className="animate-ticker flex">
          <div className="flex shrink-0 items-center gap-6 pr-6">
            {marqueeItems.map((text, i) => (
              <span
                key={`primary-${i}`}
                className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-[#ece5d5]/90 whitespace-nowrap"
              >
                <span className="text-[#ff6a1a] font-bold">✦</span>
                <span className={i % 2 === 0 ? "text-[#9dfc3f]" : "text-[#ece5d5]"}>{text}</span>
              </span>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-6 pr-6" aria-hidden="true">
            {marqueeItems.map((text, i) => (
              <span
                key={`secondary-${i}`}
                className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-[#ece5d5]/90 whitespace-nowrap"
              >
                <span className="text-[#ff6a1a] font-bold">✦</span>
                <span className={i % 2 === 0 ? "text-[#9dfc3f]" : "text-[#ece5d5]"}>{text}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
