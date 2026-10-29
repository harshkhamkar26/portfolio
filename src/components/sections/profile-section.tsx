"use client";

import Image from "next/image";
import { Download, ShieldCheck, Trophy, Briefcase, GraduationCap } from "lucide-react";
import { atsKeywords } from "@/lib/data/site";
import { sounds } from "@/components/layout/sound-manager";

export function ProfileSection() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 bg-[#131418] border-b border-[#ece5d5]/10"
      aria-labelledby="profile-heading"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-[#ece5d5]/15">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#3ad7ff]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3ad7ff]" />
              STATION 05 // AGENT PROFILE &amp; BIOMETRICS
            </div>
            <h2
              id="profile-heading"
              className="mt-2 text-3xl font-black uppercase tracking-tight text-[#ece5d5] sm:text-5xl font-display"
            >
              ABOUT HARSH KHAMKAR
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs leading-relaxed text-[#ece5d5]/70">
            A portrait of academic precision, athletic leadership, and industry engineering discipline.
          </p>
        </div>

        {/* Profile Content Grid */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
          {/* Left Column: Cyberpunk Tactical Photo HUD (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[440px] border border-[#ece5d5]/20 bg-[#16181c] p-3 shadow-2xl">
              {/* Tactical Corner Brackets */}
              <div className="absolute -top-1.5 -left-1.5 h-5 w-5 border-t-2 border-l-2 border-[#ff6a1a]" />
              <div className="absolute -top-1.5 -right-1.5 h-5 w-5 border-t-2 border-r-2 border-[#ff6a1a]" />
              <div className="absolute -bottom-1.5 -left-1.5 h-5 w-5 border-b-2 border-l-2 border-[#ff6a1a]" />
              <div className="absolute -bottom-1.5 -right-1.5 h-5 w-5 border-b-2 border-r-2 border-[#ff6a1a]" />

              {/* Status Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 px-2 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/60">
                <span className="flex items-center gap-1.5 text-[#9dfc3f]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#9dfc3f] animate-ping" />
                  ID // HK-2026-AI
                </span>
                <span>STATUS: OPERATIONAL</span>
              </div>

              {/* Harsh's Real Photo with Cyber Holographic Frame */}
              <div className="relative mt-2 overflow-hidden border border-white/10 bg-[#0c0d10] aspect-[4/5] group">
                <Image
                  src="/images/harsh-khamkar.jpg"
                  alt="Harsh Khamkar - Data Science Engineer & Data Analyst"
                  fill
                  sizes="(max-width: 768px) 100vw, 440px"
                  className="object-cover object-top contrast-105 transition-all duration-700 group-hover:scale-105"
                  priority
                />

                {/* Tactical Scanlines & Crosshair */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#16181c] via-transparent to-transparent opacity-70 pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 font-mono text-[10px] text-[#ece5d5] bg-black/75 backdrop-blur-md px-3 py-2 border border-white/15">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#ffd23a]">HARSH KHAMKAR</span>
                    <span className="text-[#9dfc3f]">DATA SCIENCE ENG</span>
                  </div>
                  <div className="text-[9px] text-white/70 mt-0.5">
                    UNIVERSAL AI UNIVERSITY · MUMBAI, INDIA
                  </div>
                </div>
              </div>

              {/* Bottom Telemetry Pills */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-center font-mono text-[10px] text-white/70">
                <div className="border border-white/10 bg-black/30 p-2">
                  <span className="block text-[#ff6a1a] font-bold">2+ INTERNSHIPS</span>
                  <span>INDUSTRY READY</span>
                </div>
                <div className="border border-white/10 bg-black/30 p-2">
                  <span className="block text-[#3ad7ff] font-bold">SPORTS PRESIDENT</span>
                  <span>VARSITY LEADER</span>
                </div>
              </div>

              {/* Direct Resume Download */}
              <div className="mt-4">
                <a
                  href="/resume.pdf"
                  download="Harsh_Khamkar_Resume.pdf"
                  onClick={() => sounds.playClick()}
                  onMouseEnter={() => sounds.playHover()}
                  className="w-full flex items-center justify-center gap-2 border-2 border-[#ff6a1a] bg-[#ff6a1a] py-3 text-center font-mono text-xs font-bold uppercase tracking-wider text-[#16181c] transition-all hover:bg-transparent hover:text-[#ff6a1a]"
                >
                  <Download size={14} />
                  <span>DOWNLOAD VERIFIED ATS RESUME</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Credentials & ATS Skill Matrix (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#ff6a1a]">
                OPERATIONAL SUMMARY
              </span>
              <h3 className="mt-2 font-display text-2xl sm:text-4xl font-black uppercase text-white leading-tight">
                Architecting transparent AI models and high-throughput data engines.
              </h3>

              <div className="mt-6 space-y-4 font-mono text-xs sm:text-sm leading-relaxed text-[#ece5d5]/80">
                <p>
                  I am a B.Tech undergraduate at <strong className="text-white">Universal AI University, Mumbai</strong>, specializing in Artificial Intelligence, Machine Learning, and Data Science. My engineering philosophy focuses on moving beyond black-box ML models toward <strong className="text-[#9dfc3f]">auditable, explainable decision frameworks (TreeSHAP)</strong> and resilient production data pipelines.
                </p>
                <p>
                  As a <strong className="text-white">Data Analyst &amp; Business Analyst Intern at Choice India</strong>, I process large-scale datasets exceeding <span className="text-[#ffd23a] font-bold">128,000 records</span>, engineering automated Power BI dashboards and Zoho Analytics pipelines that power cross-departmental operations. Previously at <strong className="text-white">One Globe Build Con</strong>, I delivered production React frontends and evaluated machine learning workflows.
                </p>
                <p>
                  Beyond engineering, I serve as <strong className="text-white">President of the UAI Sports Club</strong> and compete as a <strong className="text-[#3ad7ff]">National &amp; State Level Basketball Athlete</strong>, instilling tactical composure, decisive execution, and relentless stamina under high-pressure stakes.
                </p>
              </div>

              {/* Academic & Leadership Highlights */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="border border-white/10 bg-[#16181c] p-4">
                  <GraduationCap className="text-[#ff6a1a] mb-2" size={20} />
                  <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest">EDUCATION</p>
                  <p className="font-display font-bold text-sm text-white mt-1">Universal AI University</p>
                  <p className="font-mono text-[10px] text-[#ece5d5]/60 mt-0.5">B.Tech AI/ML &amp; Data Science (2024–28)</p>
                </div>

                <div className="border border-white/10 bg-[#16181c] p-4">
                  <Briefcase className="text-[#9dfc3f] mb-2" size={20} />
                  <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest">ACTIVE INTERNSHIP</p>
                  <p className="font-display font-bold text-sm text-white mt-1">Choice India</p>
                  <p className="font-mono text-[10px] text-[#ece5d5]/60 mt-0.5">128K+ Records &amp; 11 Dashboards</p>
                </div>

                <div className="border border-white/10 bg-[#16181c] p-4">
                  <Trophy className="text-[#3ad7ff] mb-2" size={20} />
                  <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest">EXECUTIVE ATHLETICS</p>
                  <p className="font-display font-bold text-sm text-white mt-1">Sports Club President</p>
                  <p className="font-mono text-[10px] text-[#ece5d5]/60 mt-0.5">National Level Basketball Player</p>
                </div>
              </div>
            </div>

            {/* ATS Technical Skills Verification Matrix */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-white/70">
                  ATS VERIFIED TECHNICAL COMPETENCIES
                </span>
                <span className="font-mono text-[10px] text-[#9dfc3f] flex items-center gap-1">
                  <ShieldCheck size={13} /> 100% RESUME-ALIGNED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {atsKeywords.map((item) => (
                  <div key={item.keyword} className="border border-white/10 bg-black/25 p-3">
                    <div className="flex justify-between font-mono text-xs mb-1.5">
                      <span className="text-white/80">{item.keyword}</span>
                      <span className="text-[#ff6a1a] font-bold">{item.coverage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-none overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#ff6a1a] to-[#9dfc3f]"
                        style={{ width: `${item.coverage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
