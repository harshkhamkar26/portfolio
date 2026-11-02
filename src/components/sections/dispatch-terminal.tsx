"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Linkedin, Github, Download, ArrowUpRight, Check, Copy, Terminal as TerminalIcon, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { projects } from "@/lib/data/projects";
import { sounds } from "@/components/layout/sound-manager";
import { StationBadge } from "@/components/ui/station-badge";

type TerminalHistory = {
  command: string;
  output: string | React.ReactNode;
};

const QUICK_COMMANDS = [
  "help",
  "papers",
  "projects",
  "internships",
  "skills",
  "resume",
  "bio",
  "contact",
  "clear",
];

export function DispatchTerminal() {
  const [copied, setCopied] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolledUp, setIsScrolledUp] = useState(false);

  const [history, setHistory] = useState<TerminalHistory[]>([
    {
      command: "sysinfo",
      output: (
        <div className="space-y-1 text-xs font-mono text-[#ece5d5]/80">
          <p className="text-[#9dfc3f] font-bold">OPERATING SYSTEM: HK-AI-CORE v2026.1</p>
          <p>ENGINEER: Harsh Khamkar (Universal AI University, Mumbai)</p>
          <p>ROLE: Data Science Engineer · Data Analyst Intern @ Choice India</p>
          <p className="text-[#ffd23a]">
            Type <span className="underline font-bold">help</span> or click the quick command chips below.
          </p>
        </div>
      ),
    },
  ]);

  // Auto-scroll to bottom whenever history changes
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleScroll = () => {
    if (!terminalContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = terminalContainerRef.current;
    setIsScrolledUp(scrollHeight - scrollTop - clientHeight > 60);
  };

  const handleCopyEmail = () => {
    sounds.playClick();
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const executeCommand = (rawCmd: string) => {
    sounds.playClick();
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    let output: string | React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1 text-xs font-mono text-[#ece5d5]/85">
            <p className="text-[#9dfc3f] font-bold">AVAILABLE COMMANDS:</p>
            <p>▸ <strong className="text-white">papers</strong> — View 2 peer-reviewed research papers under review</p>
            <p>▸ <strong className="text-white">projects</strong> — List flagship machine learning &amp; data projects</p>
            <p>▸ <strong className="text-white">internships</strong> — Choice India (128K+ records) &amp; One Globe Build Con</p>
            <p>▸ <strong className="text-white">skills</strong> — Technical stack (Python, SQL, SHAP, Power BI)</p>
            <p>▸ <strong className="text-white">bio</strong> — Education, CGPA 8.17 &amp; athletic leadership</p>
            <p>▸ <strong className="text-white">resume</strong> — Download verified ATS 1-page resume PDF</p>
            <p>▸ <strong className="text-white">contact</strong> — Direct email, LinkedIn &amp; phone coordinates</p>
            <p>▸ <strong className="text-white">clear</strong> — Clear terminal screen</p>
          </div>
        );
        break;

      case "papers":
      case "publications":
      case "research":
        output = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-[#ffd23a] font-bold">PEER-REVIEWED RESEARCH PAPERS (UNDER REVIEW):</p>
            <div className="pl-3 border-l-2 border-[#9dfc3f] space-y-0.5">
              <p className="text-[#9dfc3f] font-bold">1. [Journal Paper – Under Review]</p>
              <p className="text-white">&ldquo;Explainable Hyperparameter Optimization for Imbalanced Tabular Classification&rdquo;</p>
              <p className="text-white/60">Venue: Peer-Reviewed Scientific Journal · Authors: Harsh Khamkar et al.</p>
              <p className="text-[#9dfc3f]/80 text-[11px]">Features: Optuna Bayesian Search, SMOTE-NC, TreeSHAP Attribution Stability</p>
            </div>
            <div className="pl-3 border-l-2 border-[#3ad7ff] space-y-0.5">
              <p className="text-[#3ad7ff] font-bold">2. [Conference Paper – Under Review]</p>
              <p className="text-white">&ldquo;SHAP-Based Explainable Student Performance Prediction Using Random Forest, SVM, and Logistic Regression&rdquo;</p>
              <p className="text-white/60">Venue: International Academic Conference · Authors: Harsh Khamkar et al.</p>
              <p className="text-[#3ad7ff]/80 text-[11px]">Features: Zero-leakage behavioral isolation, TreeSHAP &amp; KernelSHAP counseling blueprints</p>
            </div>
          </div>
        );
        break;

      case "bio":
        output = `Harsh Khamkar · B.Tech in AI/ML & Data Science at Universal AI University, Mumbai (Expected 2028 · CGPA: 8.17). Specialized in explainable AI (SHAP), 128K+ record enterprise analytics, and predictive data pipelines. President of UAI Sports Club & National Basketball Player.`;
        break;

      case "projects":
        output = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-[#ffd23a] font-bold">FLAGSHIP DATA SCIENCE &amp; ML REPOSITORIES:</p>
            {projects.slice(0, 5).map((p) => (
              <div key={p.slug} className="text-[#ece5d5]/90 pl-2 border-l border-white/20">
                <span className="text-[#ff6a1a] font-bold">[{p.domain}]</span>{" "}
                <span className="text-white font-semibold">{p.title}</span>
                <p className="text-white/50 text-[11px] truncate">{p.description}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "internships":
        output = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-[#ffd23a] font-bold">PROFESSIONAL WORK EXPERIENCE:</p>
            <div className="pl-2 border-l border-[#ff6a1a]">
              <p className="text-white font-bold">1. Choice India (The Joy of Earning) — Data &amp; Business Analyst Intern</p>
              <p className="text-white/70">May 2026 – Present · Mumbai, India</p>
              <p className="text-[#ece5d5]/80">Preprocessed 128,000+ financial records, engineered 11+ Power BI dashboards &amp; Zoho Analytics reports, reduced reporting overhead by 40%.</p>
            </div>
            <div className="pl-2 border-l border-white/30">
              <p className="text-white font-bold">2. One Globe Build Con LLP — Tech &amp; Innovation Intern</p>
              <p className="text-white/70">Apr 2025 – Jul 2025 · Mumbai, India</p>
              <p className="text-[#ece5d5]/80">Modular React frontends, Scikit-learn supervised learning workflows &amp; Pandas analytics.</p>
            </div>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-[#9dfc3f] font-bold">TECHNICAL SKILL ARSENAL:</p>
            <p><strong className="text-white">Languages:</strong> Python, SQL, C++, TypeScript, HTML/CSS, Java</p>
            <p><strong className="text-white">ML &amp; XAI:</strong> SHAP (Tree/Kernel), Optuna Bayesian Optimization, Scikit-learn, PyTorch, SMOTE-NC</p>
            <p><strong className="text-white">Analytics &amp; BI:</strong> Power BI (11+ Dashboards, Star Schema, DAX), Zoho Analytics, Pandas, Excel VBA</p>
            <p><strong className="text-white">Data Engineering:</strong> Apache Kafka, Hadoop, REST APIs, Star Schema ETL</p>
            <p><strong className="text-white">Full-Stack:</strong> Next.js 16, React 19, Tailwind CSS v4, Three.js / WebGL</p>
          </div>
        );
        break;

      case "resume":
        window.open("/resume.pdf", "_blank");
        output = "Opening and downloading verified 1-page ATS Resume (PDF)...";
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-xs font-mono">
            <p><strong className="text-[#ffd23a]">Email:</strong> {siteConfig.email}</p>
            <p><strong className="text-[#ffd23a]">LinkedIn:</strong> {siteConfig.linkedin}</p>
            <p><strong className="text-[#ffd23a]">GitHub:</strong> {siteConfig.github}</p>
            <p><strong className="text-[#ffd23a]">Phone:</strong> {siteConfig.phone}</p>
            <p><strong className="text-[#ffd23a]">Location:</strong> Mumbai, Maharashtra, India</p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setTerminalInput("");
        return;

      default:
        output = `Command not recognized: '${cmd}'. Type 'help' or click the quick command chips above.`;
        break;
    }

    setHistory((prev) => [...prev, { command: rawCmd, output }]);
    setTerminalInput("");
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(terminalInput);
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
            <StationBadge stationNo="08" title="COMMS DISPATCH & CLI TERMINAL" accentColor="#9dfc3f" />
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
                    className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5 text-white/80 hover:text-white cursor-pointer transition"
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
                  className="flex items-center justify-between border border-white/10 bg-[#1e2026] p-3 text-xs font-mono text-white hover:border-[#3ad7ff] hover:text-[#3ad7ff] transition"
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
                  className="flex items-center justify-between border border-white/10 bg-[#1e2026] p-3 text-xs font-mono text-white hover:border-[#9dfc3f] hover:text-[#9dfc3f] transition"
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
                  className="w-full flex items-center justify-center gap-2 border-2 border-[#ff6a1a] bg-[#ff6a1a] py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#16181c] transition-all hover:bg-transparent hover:text-[#ff6a1a] cursor-pointer shadow-[0_0_12px_rgba(255,106,26,0.3)]"
                >
                  <Download size={15} />
                  <span>DOWNLOAD COMPLETE ATS RESUME (PDF)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive CLI Command Terminal (7 Cols) */}
          <div className="lg:col-span-7 border border-[#ece5d5]/25 bg-[#0e1013] shadow-2xl relative">
            {/* Terminal Top Window Bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#16181c] px-4 py-2.5 font-mono text-xs text-white/70">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-[11px] text-white/60 flex items-center gap-1.5">
                  <TerminalIcon size={12} className="text-[#ff6a1a]" /> hk-terminal · bash · 80x24
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded-xs border border-[#9dfc3f]/40 bg-[#9dfc3f]/10 text-[#9dfc3f]">
                  READY
                </span>
                <span className="hidden sm:inline font-mono text-[9px] text-white/40">
                  SCROLL ENABLED
                </span>
              </div>
            </div>

            {/* Quick Interactive Command Chips Bar */}
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#121418] px-3 py-1.5 overflow-x-auto custom-scrollbar">
              <span className="text-[9px] font-mono font-bold uppercase text-[#ff6a1a] shrink-0 tracking-wider">
                COMMANDS:
              </span>
              {QUICK_COMMANDS.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => executeCommand(cmd)}
                  className="px-2 py-0.5 rounded-xs border border-white/15 bg-black/40 font-mono text-[10px] text-[#ece5d5]/80 hover:border-[#ff6a1a] hover:text-white hover:bg-[#ff6a1a]/15 transition shrink-0 cursor-pointer"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Terminal Body with High-Visibility Amber Scrollbar */}
            <div
              ref={terminalContainerRef}
              onScroll={handleScroll}
              className="p-5 font-mono text-xs min-h-[380px] max-h-[480px] sm:max-h-[520px] overflow-y-auto custom-scrollbar space-y-4 relative"
            >
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-white/50">
                    <span className="text-[#9dfc3f] font-bold">visitor@harsh-sys:~$</span>
                    <span className="text-white font-bold">{item.command}</span>
                  </div>
                  <div className="text-[#ece5d5]/85 pl-4 border-l-2 border-white/20 py-0.5">
                    {item.output}
                  </div>
                </div>
              ))}

              {/* Input Line */}
              <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-2">
                <span className="text-[#9dfc3f] font-bold shrink-0">visitor@harsh-sys:~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="type 'help', 'papers', 'projects', 'resume'..."
                  className="w-full bg-transparent text-white font-mono text-xs focus:outline-none placeholder-white/30"
                  autoCapitalize="off"
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>

              {/* Anchor for auto-scroll */}
              <div ref={terminalEndRef} />
            </div>

            {/* Floating Jump to Latest Button when Scrolled Up */}
            {isScrolledUp && (
              <button
                onClick={() => terminalEndRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="absolute bottom-3 right-4 flex items-center gap-1.5 border border-[#ff6a1a] bg-[#16181c]/95 px-2.5 py-1 font-mono text-[10px] text-[#ff6a1a] shadow-xl backdrop-blur-md cursor-pointer hover:bg-[#ff6a1a] hover:text-[#16181c] transition"
              >
                <span>JUMP TO LATEST</span>
                <ChevronDown size={12} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
