"use client";

import { useState } from "react";
import Image from "next/image";
import { Linkedin, Github, Download, ArrowUpRight, Check, Copy } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { projects } from "@/lib/data/projects";
import { sounds } from "@/components/layout/sound-manager";

type TerminalHistory = {
  command: string;
  output: string | React.ReactNode;
};

export function DispatchTerminal() {
  const [copied, setCopied] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [history, setHistory] = useState<TerminalHistory[]>([
    {
      command: "sysinfo",
      output: (
        <div className="space-y-1 text-xs font-mono text-[#ece5d5]/80">
          <p className="text-[#9dfc3f]">OPERATING SYSTEM: HK-AI-CORE v2026.1</p>
          <p>ENGINEER: Harsh Khamkar (Universal AI University, Mumbai)</p>
          <p>ROLE: Data Science Engineer · Data Analyst Intern @ Choice India</p>
          <p className="text-[#ffd23a]">Type <span className="underline font-bold">help</span> to list available subroutines.</p>
        </div>
      ),
    },
  ]);

  const handleCopyEmail = () => {
    sounds.playClick();
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let output: string | React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-0.5 text-xs font-mono text-[#ece5d5]/80">
            <p className="text-[#9dfc3f] font-bold">AVAILABLE COMMANDS:</p>
            <p>▸ <strong className="text-white">papers</strong> — View peer-reviewed research papers under review</p>
            <p>▸ <strong className="text-white">bio</strong> — Display Harsh&apos;s education &amp; summary</p>
            <p>▸ <strong className="text-white">projects</strong> — List flagship machine learning &amp; data projects</p>
            <p>▸ <strong className="text-white">internships</strong> — View active &amp; completed work experience</p>
            <p>▸ <strong className="text-white">skills</strong> — Enumerate technical stack and tools</p>
            <p>▸ <strong className="text-white">resume</strong> — Download verified ATS resume PDF</p>
            <p>▸ <strong className="text-white">contact</strong> — Output contact details</p>
            <p>▸ <strong className="text-white">clear</strong> — Clear terminal screen</p>
          </div>
        );
        break;

      case "papers":
      case "publications":
      case "research":
        output = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-[#ffd23a] font-bold">PEER-REVIEWED RESEARCH PAPERS (UNDER REVIEW):</p>
            <div className="pl-3 border-l border-[#9dfc3f]">
              <p className="text-[#9dfc3f] font-bold">1. [Journal Paper – Under Review]</p>
              <p className="text-white">&ldquo;Explainable Hyperparameter Optimization for Imbalanced Tabular Classification&rdquo;</p>
              <p className="text-white/60">Venue: Peer-Reviewed Scientific Journal · Authors: Harsh Khamkar et al.</p>
            </div>
            <div className="pl-3 border-l border-[#3ad7ff]">
              <p className="text-[#3ad7ff] font-bold">2. [Conference Paper – Under Review]</p>
              <p className="text-white">&ldquo;SHAP-Based Explainable Student Performance Prediction Using Random Forest, SVM, and Logistic Regression&rdquo;</p>
              <p className="text-white/60">Venue: International Academic Conference · Authors: Harsh Khamkar et al.</p>
            </div>
          </div>
        );
        break;

      case "bio":
        output = `Harsh Khamkar · B.Tech in AI/ML & Data Science at Universal AI University, Mumbai (2024–2028). Specialized in explainable AI (SHAP), 128k+ record enterprise analytics, and sports analytics. President of UAI Sports Club & National Basketball Player.`;
        break;

      case "projects":
        output = (
          <ul className="space-y-1 text-xs font-mono">
            {projects.slice(0, 5).map((p) => (
              <li key={p.slug} className="text-[#ece5d5]/90">
                <span className="text-[#ff6a1a] font-bold">[{p.domain}]</span> {p.title} → {p.github}
              </li>
            ))}
          </ul>
        );
        break;

      case "internships":
        output = `1. Choice India (May 2026–Present): Data Analyst & Business Analyst Intern · 128K+ records & 11 dashboards. \n2. One Globe Build Con (Apr–Jul 2025): Tech & Innovation Division · React frontend & Scikit-learn pipelines.`;
        break;

      case "skills":
        output = `Languages: Python, SQL, C++, TypeScript, HTML/CSS, Java\nML/AI: SHAP, Optuna, Scikit-learn, PyTorch, Deepfake Detection\nBI & Analytics: Power BI (11+ Dashboards), Zoho Analytics, Pandas, Excel VBA\nData Eng: Apache Kafka, Hadoop, REST APIs\nWeb: Next.js 16, React 19, Tailwind CSS`;
        break;

      case "resume":
        window.open("/resume.pdf", "_blank");
        output = "Triggering download for Harsh_Khamkar_Resume.pdf...";
        break;

      case "contact":
        output = `Email: harshkhamkar26@gmail.com | LinkedIn: https://linkedin.com/in/harshkhamkar | GitHub: https://github.com/harshkhamkar26`;
        break;

      case "clear":
        setHistory([]);
        setTerminalInput("");
        return;

      default:
        output = `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
        break;
    }

    setHistory((prev) => [...prev, { command: terminalInput, output }]);
    setTerminalInput("");
  };

  return (
    <section
      id="terminal"
      className="relative py-24 sm:py-32 bg-[#131418]"
      aria-labelledby="terminal-heading"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-[#ece5d5]/15">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#9dfc3f]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9dfc3f]" />
              STATION 08 // COMMS DISPATCH &amp; CLI
            </div>
            <h2
              id="terminal-heading"
              className="mt-2 text-3xl font-black uppercase tracking-tight text-[#ece5d5] sm:text-5xl font-display"
            >
              INITIALIZE COMMUNICATION
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs leading-relaxed text-[#ece5d5]/70">
            Direct dispatch channels for full-time roles, internships, AI/ML research collaborations, or technical consultations.
          </p>
        </div>

        {/* 2-Column Layout: Direct Comms & Interactive CLI Terminal */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Comms Box (5 Cols) */}
          <div className="lg:col-span-5 border border-[#ece5d5]/20 bg-[#16181c] p-6 sm:p-8">
            <div className="flex items-center gap-3.5 border-b border-white/10 pb-4 mb-4">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden border-2 border-[#ff6a1a]">
                <Image
                  src="/images/harsh-khamkar.jpg"
                  alt="Harsh Khamkar"
                  fill
                  sizes="48px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#ff6a1a]">
                  DIRECT SECURE CHANNEL
                </span>
                <h3 className="font-display text-lg font-black uppercase text-white">
                  Harsh Khamkar
                </h3>
                <p className="font-mono text-[11px] text-[#9dfc3f]">
                  Data Science Engineer &amp; Data Analyst
                </p>
              </div>
            </div>

            <p className="font-mono text-xs text-[#ece5d5]/70 leading-relaxed">
              Based in Mumbai, open to on-site and remote opportunities across Data Science, Analytics Engineering, and AI systems.
            </p>

            <div className="mt-6 space-y-4">
              {/* Email Address with Copy Button */}
              <div className="border border-white/10 bg-black/30 p-4">
                <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">
                  PRIMARY EMAIL
                </span>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${siteConfig.email}?subject=Opportunity%20via%20AI%20Portfolio`}
                    className="font-mono text-sm sm:text-base font-bold text-white hover:text-[#ff6a1a] truncate"
                  >
                    {siteConfig.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5 text-white/80 hover:text-white"
                    title="Copy Email"
                  >
                    {copied ? <Check size={14} className="text-[#9dfc3f]" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => sounds.playHover()}
                  className="flex items-center justify-between border border-white/10 bg-[#1e2026] p-3 text-xs font-mono text-white hover:border-[#3ad7ff] hover:text-[#3ad7ff]"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin size={15} /> LinkedIn
                  </span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => sounds.playHover()}
                  className="flex items-center justify-between border border-white/10 bg-[#1e2026] p-3 text-xs font-mono text-white hover:border-[#9dfc3f] hover:text-[#9dfc3f]"
                >
                  <span className="flex items-center gap-2">
                    <Github size={15} /> GitHub
                  </span>
                  <ArrowUpRight size={14} />
                </a>
              </div>

              {/* Resume Download Banner */}
              <div className="pt-2">
                <a
                  href="/resume.pdf"
                  download="Harsh_Khamkar_Resume.pdf"
                  onClick={() => sounds.playClick()}
                  onMouseEnter={() => sounds.playHover()}
                  className="w-full flex items-center justify-center gap-2 border-2 border-[#ff6a1a] bg-[#ff6a1a] py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#16181c] transition-all hover:bg-transparent hover:text-[#ff6a1a]"
                >
                  <Download size={15} />
                  <span>DOWNLOAD COMPLETE ATS RESUME (PDF)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive CLI Command Terminal (7 Cols) */}
          <div className="lg:col-span-7 border border-[#ece5d5]/20 bg-[#0e1013] shadow-2xl">
            {/* Terminal Top Window Bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#16181c] px-4 py-2.5 font-mono text-xs text-white/70">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-[11px] text-white/50">hk-terminal · bash · 80x24</span>
              </div>
              <span className="font-mono text-[10px] text-[#9dfc3f]">READY</span>
            </div>

            {/* Terminal Body */}
            <div className="p-5 font-mono text-xs min-h-[360px] max-h-[460px] overflow-y-auto space-y-4">
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-white/50">
                    <span className="text-[#9dfc3f]">visitor@harsh-sys:~$</span>
                    <span className="text-white font-bold">{item.command}</span>
                  </div>
                  <div className="text-[#ece5d5]/85 pl-4 border-l border-white/15">
                    {item.output}
                  </div>
                </div>
              ))}

              {/* Input Line */}
              <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-2">
                <span className="text-[#9dfc3f] shrink-0">visitor@harsh-sys:~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="type 'help', 'projects', 'resume'..."
                  className="w-full bg-transparent text-white font-mono text-xs focus:outline-none placeholder-white/30"
                  autoCapitalize="off"
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
