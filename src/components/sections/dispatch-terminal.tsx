"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Linkedin, Github, Download, ArrowUpRight, Check, Copy, Terminal as TerminalIcon, ChevronDown, Mail, Sparkles } from "lucide-react";
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
  "financial-ai",
  "papers",
  "projects",
  "experience",
  "skills",
  "resume",
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
          <p className="text-[#3ad7ff] font-bold">SYSTEM: HK-AI-CORE v2026.4 [PL CAPITAL PREVIEW]</p>
          <p>ENGINEER: Harsh Khamkar (Universal AI University, Mumbai · CGPA 8.17)</p>
          <p>ROLE: AI/ML Engineer · Data Science Researcher · Financial Analytics</p>
          <p className="text-[#ffd23a]">
            Type <span className="underline font-bold">help</span> or click the command chips below to inspect verified outputs.
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
            <p className="text-[#3ad7ff] font-bold">AVAILABLE COMMANDS:</p>
            <p>▸ <strong className="text-white">financial-ai</strong> — Architecture of the AI Portfolio Analytics Agent (PL Capital Assessment)</p>
            <p>▸ <strong className="text-white">papers</strong> — 2 peer-reviewed research papers under review (Journal &amp; Conference)</p>
            <p>▸ <strong className="text-white">projects</strong> — Flagship AI, Machine Learning &amp; Analytics repositories</p>
            <p>▸ <strong className="text-white">experience</strong> — Choice India (128K+ records) &amp; One Globe Build Con</p>
            <p>▸ <strong className="text-white">skills</strong> — 7 categorized competencies (Python, SQL, SHAP, Optuna, Power BI)</p>
            <p>▸ <strong className="text-white">resume</strong> — Download verified ATS 1-page resume PDF</p>
            <p>▸ <strong className="text-white">contact</strong> — Direct email, LinkedIn, GitHub &amp; collaboration coordinates</p>
            <p>▸ <strong className="text-white">clear</strong> — Clear terminal screen</p>
          </div>
        );
        break;

      case "financial-ai":
      case "agent":
        output = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-[#3ad7ff] font-bold">AI PORTFOLIO ANALYTICS AGENT [PL CAPITAL ASSESSMENT]:</p>
            <p className="text-white/80">• Purpose: Evidence-grounded natural-language query engine for multi-asset portfolio databases.</p>
            <p className="text-white/80">• Capabilities: NL-to-SQL synthesis, sector exposure calculations, intent tool routing, and AST read-only guards.</p>
            <p className="text-white/80">• Safety: Strict AST parser prohibiting mutation tokens (DROP, UPDATE, DELETE).</p>
            <p className="text-[#ffd23a]">• Status: Prototype / Technical Assessment in progress.</p>
            <p className="text-[#9dfc3f] mt-1">➔ Jump to Section #financial-demo for live interaction preview.</p>
          </div>
        );
        break;

      case "papers":
      case "research":
        output = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-[#ffd23a] font-bold">PEER-REVIEWED RESEARCH PAPERS (UNDER REVIEW):</p>
            <div className="pl-3 border-l-2 border-[#9dfc3f] space-y-0.5">
              <p className="text-[#9dfc3f] font-bold">1. [Journal Paper – Submitted / Under Review]</p>
              <p className="text-white">&ldquo;Explainable Hyperparameter Optimization for Imbalanced Tabular Classification&rdquo;</p>
              <p className="text-white/60">Venue: Peer-Reviewed Scientific Journal · Authors: Harsh Khamkar et al.</p>
              <p className="text-white/80 text-[11px]">Features: Optuna Bayesian Search, SMOTE-NC, TreeSHAP Attribution Stability</p>
            </div>
            <div className="pl-3 border-l-2 border-[#3ad7ff] space-y-0.5">
              <p className="text-[#3ad7ff] font-bold">2. [Conference Paper – Submitted / Under Review]</p>
              <p className="text-white">&ldquo;SHAP-Based Explainable Student Performance Prediction Using Random Forest, SVM, and Logistic Regression&rdquo;</p>
              <p className="text-white/60">Venue: International Academic Conference · Authors: Harsh Khamkar et al.</p>
              <p className="text-white/80 text-[11px]">Features: Zero-leakage behavioral isolation, TreeSHAP &amp; KernelSHAP counseling blueprints</p>
            </div>
          </div>
        );
        break;

      case "experience":
      case "internships":
        output = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-[#3ad7ff] font-bold">PROFESSIONAL INDUSTRY INTERNSHIPS:</p>
            <div className="pl-3 border-l-2 border-[#ff6a1a] space-y-0.5">
              <p className="text-white font-bold">1. Choice India (The Joy of Earning) — Data &amp; Business Analyst Intern</p>
              <p className="text-white/60">18 May 2026 – 18 July 2026 · Mumbai, India</p>
              <p className="text-white/80 text-[11px]">Cleansed ~128K MakeMyTrip records; engineered 11 Power BI dashboards; ~3 reports/week; AiSensy WhatsApp automation.</p>
            </div>
            <div className="pl-3 border-l-2 border-[#9dfc3f] space-y-0.5">
              <p className="text-white font-bold">2. One Globe Build Con LLP — Technology &amp; Innovation Intern</p>
              <p className="text-white/60">April 2025 – July 2025 · Nagpur, India</p>
              <p className="text-white/80 text-[11px]">Python &amp; Scikit-learn ML workflows, data preprocessing, model evaluation, Power BI, React frontend development.</p>
            </div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-[#3ad7ff] font-bold">PRIORITIZED CODE &amp; RESEARCH REPOSITORIES:</p>
            {projects.slice(0, 6).map((p, i) => (
              <div key={p.slug} className="text-[#ece5d5]/90 pl-2 border-l border-white/20">
                <span className="text-[#3ad7ff] font-bold">[0{i + 1}]</span>{" "}
                <span className="text-white font-semibold">{p.title}</span>
                <span className="text-white/40 text-[10px] ml-2">({p.status})</span>
                <p className="text-white/50 text-[11px] truncate">{p.subtitle}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-[#9dfc3f] font-bold">SUBSTANTIATED SKILLS MATRIX:</p>
            <p><strong className="text-white">Programming:</strong> Python, SQL, C++ (Basic)</p>
            <p><strong className="text-white">Data Science:</strong> Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn</p>
            <p><strong className="text-white">Machine Learning:</strong> Classification, Regression, Cross-validation, Feature Engineering, Model Evaluation</p>
            <p><strong className="text-white">Optimisation &amp; XAI:</strong> Optuna, SMOTE-NC, Threshold Optimisation, SHAP</p>
            <p><strong className="text-white">Financial Analytics:</strong> Portfolio Analytics, Financial Data Analysis, Risk Metrics, Quantitative Research Fundamentals</p>
            <p><strong className="text-white">GenAI &amp; Automation:</strong> LLM APIs, Prompt Engineering, Agentic Workflows, AiSensy</p>
            <p><strong className="text-white">BI &amp; Engineering:</strong> Power BI, Zoho Analytics, Excel, Git, GitHub, REST APIs</p>
          </div>
        );
        break;

      case "resume":
        window.open("/resume.pdf", "_blank");
        output = "Downloading verified 1-page ATS Resume PDF...";
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-xs font-mono">
            <p><strong className="text-[#3ad7ff]">Email:</strong> {siteConfig.email}</p>
            <p><strong className="text-[#3ad7ff]">LinkedIn:</strong> {siteConfig.linkedin}</p>
            <p><strong className="text-[#3ad7ff]">GitHub:</strong> {siteConfig.github}</p>
            <p><strong className="text-[#3ad7ff]">Phone:</strong> {siteConfig.phone}</p>
            <p><strong className="text-[#3ad7ff]">Location:</strong> Mumbai, Maharashtra, India</p>
            <p><strong className="text-[#9dfc3f]">Collaboration:</strong> Open for AI/ML engineering internships, quantitative analytics &amp; research.</p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setTerminalInput("");
        return;

      default:
        output = `Command not recognized: '${cmd}'. Type 'help' or click the command chips above.`;
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
            <StationBadge stationNo="08" title="COMMS DISPATCH & DIRECT CONTACT" accentColor="#3ad7ff" />
            <h2
              id="terminal-heading"
              className="mt-2 text-3xl font-black uppercase tracking-tight text-[#ece5d5] sm:text-5xl font-display"
            >
              DIRECT CONTACT &amp; DISPATCH
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs leading-relaxed text-[#ece5d5]/70">
            Direct channels for technical evaluation inquiries, AI/ML engineering internships, research collaborations, and quantitative analytics consultations.
          </p>
        </div>

        {/* 2-Column Layout: Direct Channels & Interactive CLI Terminal */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Channels (5 Cols) */}
          <div className="lg:col-span-5 border border-[#ece5d5]/20 bg-[#16181c] p-6 sm:p-8">
            <div className="flex items-center gap-3.5 border-b border-white/10 pb-4 mb-4">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden border-2 border-[#3ad7ff]">
                <Image
                  src="/images/harsh-khamkar.jpg"
                  alt="Harsh Khamkar"
                  fill
                  sizes="48px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#3ad7ff]">
                  DIRECT VERIFIED DISPATCH
                </span>
                <h3 className="font-display text-lg font-black uppercase text-white">
                  Harsh Khamkar
                </h3>
                <p className="font-mono text-[11px] text-[#9dfc3f]">
                  AI/ML Engineer · Financial Analytics
                </p>
              </div>
            </div>

            <p className="font-mono text-xs text-[#ece5d5]/70 leading-relaxed">
              Based in Mumbai, India. Open for PL Capital technical assessment interviews, AI/ML internships, and quantitative research engagements.
            </p>

            {/* Prominent CTA for PL Capital: Explore My Financial AI Projects */}
            <div className="mt-6">
              <a
                href="#financial-demo"
                onClick={() => sounds.playClick()}
                onMouseEnter={() => sounds.playHover()}
                className="w-full flex items-center justify-between border-2 border-[#3ad7ff] bg-[#3ad7ff]/15 px-4 py-3 font-mono text-xs font-bold uppercase text-[#3ad7ff] hover:bg-[#3ad7ff] hover:text-[#0c1017] transition shadow-[0_0_15px_rgba(58,215,255,0.25)]"
              >
                <span className="flex items-center gap-2">
                  <Sparkles size={14} />
                  <span>EXPLORE MY FINANCIAL AI PROJECTS</span>
                </span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="mt-4 space-y-4">
              {/* Email Address with Copy Button */}
              <div className="border border-white/10 bg-black/30 p-4">
                <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">
                  PRIMARY EMAIL
                </span>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${siteConfig.email}?subject=PL%20Capital%20AI%20Evaluation%20-%20Harsh%20Khamkar`}
                    className="font-mono text-sm sm:text-base font-bold text-white hover:text-[#3ad7ff] truncate"
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

              {/* Social & Code Channels */}
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
                  className="flex items-center justify-between border border-white/10 bg-[#1e2026] p-3 text-xs font-mono text-white hover:border-[#9dfc3f] hover:text-[#9dfc3f]"
                >
                  <span className="flex items-center gap-2">
                    <Github size={15} /> GitHub
                  </span>
                  <ArrowUpRight size={14} />
                </a>
              </div>

              {/* Research Collaboration Channel */}
              <a
                href={`mailto:${siteConfig.email}?subject=Research%20Collaboration%20-%20Harsh%20Khamkar`}
                className="w-full flex items-center justify-between border border-white/10 bg-[#1e2026] p-3 text-xs font-mono text-white hover:border-[#ffd23a] hover:text-[#ffd23a] transition"
              >
                <span className="flex items-center gap-2">
                  <Mail size={14} className="text-[#ffd23a]" /> Research Collaboration
                </span>
                <span className="text-[10px] text-white/40">2 PAPERS UNDER REVIEW</span>
              </a>

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
                  <span>DOWNLOAD VERIFIED ATS RESUME (PDF)</span>
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
                  <TerminalIcon size={12} className="text-[#3ad7ff]" /> hk-terminal · bash · 80x24
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded-xs border border-[#3ad7ff]/40 bg-[#3ad7ff]/10 text-[#3ad7ff]">
                  READY
                </span>
                <span className="hidden sm:inline font-mono text-[9px] text-white/40">
                  SCROLL ENABLED
                </span>
              </div>
            </div>

            {/* Quick Interactive Command Chips Bar */}
            <div data-lenis-prevent
            className="flex items-center gap-1.5 border-b border-white/10 bg-[#121418] px-3 py-1.5 overflow-x-auto custom-scrollbar overscroll-contain">
              <span className="text-[9px] font-mono font-bold uppercase text-[#3ad7ff] shrink-0 tracking-wider">
                COMMANDS:
              </span>
              {QUICK_COMMANDS.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => executeCommand(cmd)}
                  className="px-2 py-0.5 rounded-xs border border-white/15 bg-black/40 font-mono text-[10px] text-[#ece5d5]/80 hover:border-[#3ad7ff] hover:text-[#3ad7ff] hover:bg-[#3ad7ff]/15 transition shrink-0 cursor-pointer"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Terminal Body with Custom High-Visibility Scrollbar */}
            <div
              ref={terminalContainerRef}
              onScroll={handleScroll}
              className="p-5 font-mono text-xs min-h-[380px] max-h-[480px] sm:max-h-[520px] overflow-y-auto custom-scrollbar space-y-4 relative overscroll-contain select-text" data-lenis-prevent
            >
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-white/50">
                    <span className="text-[#3ad7ff] font-bold">visitor@harsh-sys:~$</span>
                    <span className="text-white font-bold">{item.command}</span>
                  </div>
                  <div className="text-[#ece5d5]/85 pl-4 border-l-2 border-white/20 py-0.5">
                    {item.output}
                  </div>
                </div>
              ))}

              {/* Input Line */}
              <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-2">
                <span className="text-[#3ad7ff] font-bold shrink-0">visitor@harsh-sys:~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="type 'financial-ai', 'papers', 'skills'..."
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
                className="absolute bottom-3 right-4 flex items-center gap-1.5 border border-[#3ad7ff] bg-[#16181c]/95 px-2.5 py-1 font-mono text-[10px] text-[#3ad7ff] shadow-xl backdrop-blur-md cursor-pointer hover:bg-[#3ad7ff] hover:text-[#0c1017] transition"
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
