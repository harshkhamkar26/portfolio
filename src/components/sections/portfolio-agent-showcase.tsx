"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Cpu,
  Database,
  ArrowRight,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertTriangle,
  Code2,
  PieChart,
  Table as TableIcon,
  Layers,
  Sparkles,
  Terminal,
} from "lucide-react";
import { sounds } from "@/components/layout/sound-manager";

type DemonstrationScenario = {
  id: string;
  question: string;
  intent: "Sector Exposure Calculation" | "Read-Only SQL Query" | "Concentration Risk Audit" | "Unrealized P&L Calculation";
  tool: "calculate_sector_exposure" | "execute_readonly_sql";
  sql: string;
  safetyCheck: {
    passed: boolean;
    rule: string;
    forbiddenTokensChecked: string[];
  };
  sampleResults: {
    columns: string[];
    rows: (string | number)[][];
  };
  sectorBreakdown?: { sector: string; weight: number; color: string }[];
  synthesis: string;
  evaluation: {
    semanticMatch: string;
    sqlValidity: string;
    latencyMs: number;
    benchmarkRef: string;
  };
};

const DEMO_SCENARIOS: DemonstrationScenario[] = [
  {
    id: "tech-exposure",
    question: "What is our current portfolio exposure to the Information Technology sector?",
    intent: "Sector Exposure Calculation",
    tool: "calculate_sector_exposure",
    sql: `SELECT 
  sector,
  ROUND(SUM(shares * current_price), 2) AS sector_market_value,
  ROUND((SUM(shares * current_price) / (SELECT SUM(shares * current_price) FROM portfolio_holdings)) * 100, 2) AS exposure_percentage
FROM portfolio_holdings
WHERE sector = 'Information Technology'
GROUP BY sector;`,
    safetyCheck: {
      passed: true,
      rule: "AST Token Whitelist: Enforced Read-Only SELECT",
      forbiddenTokensChecked: ["DROP", "DELETE", "UPDATE", "INSERT", "ALTER", "TRUNCATE"],
    },
    sampleResults: {
      columns: ["Sector", "Market Value ($)", "Portfolio Exposure (%)"],
      rows: [
        ["Information Technology", "$1,482,950.00", "28.45%"],
      ],
    },
    sectorBreakdown: [
      { sector: "Information Technology", weight: 28.45, color: "#3ad7ff" },
      { sector: "Financial Services", weight: 22.10, color: "#9dfc3f" },
      { sector: "Healthcare", weight: 16.30, color: "#ffd23a" },
      { sector: "Consumer Discretionary", weight: 14.75, color: "#ff6a1a" },
      { sector: "Energy & Industrials", weight: 11.20, color: "#ff2e97" },
      { sector: "Cash Equivalents", weight: 7.20, color: "#ece5d5" },
    ],
    synthesis: "The portfolio currently holds $1,482,950.00 in the Information Technology sector, representing 28.45% of total asset value across 4 distinct holdings (TCS, INFY, MSFT, NVDA). IT represents the primary sector overweight against the standard market benchmark (22.00%).",
    evaluation: {
      semanticMatch: "100% Intent Alignment",
      sqlValidity: "Deterministic SELECT Validated",
      latencyMs: 385,
      benchmarkRef: "GT-EVAL-SEC-01",
    },
  },
  {
    id: "top-holdings",
    question: "List the top 5 equity holdings by current market value and their percentage allocation.",
    intent: "Read-Only SQL Query",
    tool: "execute_readonly_sql",
    sql: `SELECT 
  ticker,
  company_name,
  sector,
  shares,
  ROUND(shares * current_price, 2) AS market_value,
  ROUND(((shares * current_price) / (SELECT SUM(shares * current_price) FROM portfolio_holdings)) * 100, 2) AS weight_pct
FROM portfolio_holdings
ORDER BY market_value DESC
LIMIT 5;`,
    safetyCheck: {
      passed: true,
      rule: "AST Token Whitelist: Enforced Read-Only SELECT",
      forbiddenTokensChecked: ["DROP", "DELETE", "UPDATE", "INSERT", "ALTER", "TRUNCATE"],
    },
    sampleResults: {
      columns: ["Ticker", "Company", "Sector", "Shares", "Market Value ($)", "Weight (%)"],
      rows: [
        ["NVDA", "Nvidia Corp", "Information Technology", "920", "$524,400.00", "10.06%"],
        ["MSFT", "Microsoft Corp", "Information Technology", "1,150", "$483,000.00", "9.27%"],
        ["HDFCBANK", "HDFC Bank Ltd", "Financial Services", "2,400", "$456,000.00", "8.75%"],
        ["RELIANCE", "Reliance Industries", "Energy & Conglomerate", "1,200", "$432,000.00", "8.29%"],
        ["ICICIBANK", "ICICI Bank Ltd", "Financial Services", "3,100", "$418,500.00", "8.03%"],
      ],
    },
    synthesis: "The top 5 portfolio positions total $2,313,900.00, constituting 44.40% of total portfolio value. NVDA is the single largest individual asset at 10.06%, marginally crossing the standard single-stock risk alert boundary.",
    evaluation: {
      semanticMatch: "100% Intent Alignment",
      sqlValidity: "Deterministic SELECT Validated",
      latencyMs: 412,
      benchmarkRef: "GT-EVAL-TOP-02",
    },
  },
  {
    id: "risk-concentration",
    question: "Identify any single stock position exceeding a 10% portfolio concentration risk threshold.",
    intent: "Concentration Risk Audit",
    tool: "calculate_sector_exposure",
    sql: `SELECT 
  ticker,
  company_name,
  sector,
  ROUND(shares * current_price, 2) AS market_value,
  ROUND(((shares * current_price) / (SELECT SUM(shares * current_price) FROM portfolio_holdings)) * 100, 2) AS weight_pct
FROM portfolio_holdings
WHERE ((shares * current_price) / (SELECT SUM(shares * current_price) FROM portfolio_holdings)) > 0.10
ORDER BY weight_pct DESC;`,
    safetyCheck: {
      passed: true,
      rule: "AST Token Whitelist: Enforced Read-Only SELECT",
      forbiddenTokensChecked: ["DROP", "DELETE", "UPDATE", "INSERT", "ALTER", "TRUNCATE"],
    },
    sampleResults: {
      columns: ["Ticker", "Company Name", "Sector", "Market Value ($)", "Allocation (%)", "Risk Status"],
      rows: [
        ["NVDA", "Nvidia Corp", "Information Technology", "$524,400.00", "10.06%", "THRESHOLD BREACH (>10.00%)"],
      ],
    },
    synthesis: "RISK NOTIFICATION: 1 position exceeds the 10.00% single-holding risk parameter: NVDA ($524,400.00, 10.06%). The second largest holding is MSFT at 9.27% ($483,000.00), remaining within acceptable concentration tolerance limits.",
    evaluation: {
      semanticMatch: "100% Intent Alignment",
      sqlValidity: "Deterministic SELECT Validated",
      latencyMs: 340,
      benchmarkRef: "GT-EVAL-RSK-03",
    },
  },
  {
    id: "unrealized-pnl",
    question: "Calculate total unrealized profit/loss across all equity holdings.",
    intent: "Unrealized P&L Calculation",
    tool: "execute_readonly_sql",
    sql: `SELECT 
  ROUND(SUM(shares * current_price), 2) AS total_market_value,
  ROUND(SUM(shares * avg_cost), 2) AS total_cost_basis,
  ROUND(SUM(shares * current_price) - SUM(shares * avg_cost), 2) AS total_unrealized_pnl,
  ROUND(((SUM(shares * current_price) - SUM(shares * avg_cost)) / SUM(shares * avg_cost)) * 100, 2) AS return_percentage
FROM portfolio_holdings;`,
    safetyCheck: {
      passed: true,
      rule: "AST Token Whitelist: Enforced Read-Only SELECT",
      forbiddenTokensChecked: ["DROP", "DELETE", "UPDATE", "INSERT", "ALTER", "TRUNCATE"],
    },
    sampleResults: {
      columns: ["Total Market Value", "Total Cost Basis", "Unrealized Gain ($)", "Portfolio Gain (%)"],
      rows: [
        ["$5,212,850.00", "$4,180,200.00", "+$1,032,650.00", "+24.70%"],
      ],
    },
    synthesis: "The portfolio displays an aggregate unrealized gain of +$1,032,650.00 (+24.70% on invested capital). Total market valuation stands at $5,212,850.00 against an overall acquisition cost basis of $4,180,200.00.",
    evaluation: {
      semanticMatch: "100% Intent Alignment",
      sqlValidity: "Deterministic SELECT Validated",
      latencyMs: 360,
      benchmarkRef: "GT-EVAL-PNL-04",
    },
  },
];

const ARCHITECTURE_TABS = [
  { id: "problem", label: "Problem Statement" },
  { id: "architecture", label: "System Architecture" },
  { id: "schema", label: "Database Schema" },
  { id: "workflow", label: "Tool Routing & Workflow" },
  { id: "safeguards", label: "Read-Only SQL Safety" },
  { id: "evaluation", label: "Ground-Truth Evaluation" },
  { id: "decisions", label: "Decisions & Limitations" },
];

export function PortfolioAgentShowcase() {
  const [activeTab, setActiveTab] = useState("problem");
  const [selectedScenario, setSelectedScenario] = useState<DemonstrationScenario>(DEMO_SCENARIOS[0]);

  return (
    <section
      id="financial-demo"
      className="relative py-24 sm:py-32 bg-[#0c1017] border-b border-[#ece5d5]/15"
      aria-labelledby="portfolio-agent-heading"
    >
      {/* Background Micro Grid */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#3ad7ff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-10 lg:px-14">
        {/* Flagship Header Badge & Sub-label */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 border border-[#3ad7ff]/50 bg-[#3ad7ff]/10 text-[#3ad7ff] flex items-center gap-1.5">
                <Sparkles size={11} /> PL CAPITAL AI ASSESSMENT
              </span>
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 border border-[#ffd23a]/50 bg-[#ffd23a]/10 text-[#ffd23a]">
                STATUS: PROTOTYPE / TECHNICAL ASSESSMENT
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                FINANCIAL AI &amp; AGENTIC SYSTEMS
              </span>
            </div>

            <h2
              id="portfolio-agent-heading"
              className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-display"
            >
              AI PORTFOLIO ANALYTICS AGENT
            </h2>
            <p className="mt-2 max-w-2xl font-mono text-xs sm:text-sm text-[#ece5d5]/80 leading-relaxed">
              Evidence-grounded natural-language portfolio analysis engine. Bridges multi-asset SQLite databases with LLM reasoning, deterministic sector exposure calculators, and strict AST read-only safeguards.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/harshkhamkar26/AI-Portfolio-Analytics-Agent"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              onMouseEnter={() => sounds.playHover()}
              className="flex items-center gap-2 border border-white/20 bg-[#161822] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:border-[#3ad7ff] hover:text-[#3ad7ff] transition"
            >
              <Github size={14} />
              <span>INSPECT GITHUB REPO</span>
            </a>
            <a
              href="#demo-preview"
              onClick={() => sounds.playClick()}
              onMouseEnter={() => sounds.playHover()}
              className="flex items-center gap-2 border-2 border-[#3ad7ff] bg-[#3ad7ff] px-5 py-2.5 font-mono text-xs font-black uppercase tracking-wider text-[#0c1017] hover:bg-transparent hover:text-[#3ad7ff] transition shadow-[0_0_16px_rgba(58,215,255,0.3)]"
            >
              <Terminal size={14} />
              <span>LIVE INTERACTION PREVIEW</span>
            </a>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            INTERACTIVE SYSTEM ARCHITECTURE DIAGRAM
            User Question → Portfolio Agent → Intent Router → Tools → DB → Answer → Evaluation
            ───────────────────────────────────────────────────────────── */}
        <div className="mt-10 border border-white/10 bg-[#11141c] p-5 sm:p-7">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#3ad7ff] flex items-center gap-2">
              <Layers size={14} /> END-TO-END PIPELINE ARCHITECTURE FLOW
            </span>
            <span className="font-mono text-[10px] text-white/50">
              DETERMINISTIC GUARDRAILED EXECUTION
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-center font-mono">
            {[
              { step: "01", name: "User Question", sub: "Natural Language", color: "#ece5d5" },
              { step: "02", name: "Portfolio Agent", sub: "Context Ingestion", color: "#3ad7ff" },
              { step: "03", name: "Intent Router", sub: "Tool Selection", color: "#ffd23a" },
              { step: "04", name: "SQL & Exposure Tool", sub: "AST Token Guard", color: "#9dfc3f" },
              { step: "05", name: "SQLite DB", sub: "Read-Only Sandbox", color: "#3ad7ff" },
              { step: "06", name: "Grounded Answer", sub: "Structured Synthesis", color: "#ff6a1a" },
              { step: "07", name: "Eval Framework", sub: "Ground-Truth Score", color: "#9dfc3f" },
            ].map((node, i) => (
              <div
                key={node.step}
                className="relative flex flex-col justify-between border border-white/10 bg-[#161a24] p-3 text-left transition hover:border-white/30"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] text-white/40 mb-1">
                    <span>STEP {node.step}</span>
                    {i < 6 && <span className="hidden lg:inline text-white/30">➔</span>}
                  </div>
                  <p className="font-bold text-xs text-white uppercase">{node.name}</p>
                </div>
                <p className="mt-2 text-[10px]" style={{ color: node.color }}>
                  {node.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            TABBED ARCHITECTURAL SPECIFICATION DEEP-DIVE
            Problem, Architecture, Schema, Workflow, Safeguards, Evaluation, Tradeoffs
            ───────────────────────────────────────────────────────────── */}
        <div className="mt-8 border border-white/10 bg-[#11141c]">
          {/* Tabs Navigation */}
          <div className="flex flex-wrap items-center border-b border-white/10 bg-[#161822] overflow-x-auto">
            {ARCHITECTURE_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveTab(tab.id);
                }}
                className={`px-4 py-3 font-mono text-xs uppercase tracking-wider transition shrink-0 cursor-pointer border-r border-white/10 ${
                  activeTab === tab.id
                    ? "bg-[#0c1017] text-[#3ad7ff] font-bold border-b-2 border-b-[#3ad7ff]"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Panels */}
          <div className="p-6 sm:p-8 font-mono text-xs leading-relaxed text-[#ece5d5]/85">
            {activeTab === "problem" && (
              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold uppercase text-white">
                  The Enterprise Financial Analytics Problem
                </h3>
                <p>
                  Institutional wealth managers, research analysts, and portfolio operators manage multi-asset equity holdings distributed across normalized relational databases. However, accessing quantitative exposure insights requires either manual SQL script formulation by data engineers or reliance on static, inflexible dashboard views.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="border border-red-500/30 bg-red-950/10 p-4">
                    <p className="font-bold text-red-400 mb-1">Vulnerabilities of Naive LLM Querying:</p>
                    <ul className="space-y-1.5 text-white/75 text-[11px]">
                      <li>• Hallucinated column names and unconstrained JOIN operations.</li>
                      <li>• Unsafe database mutation statements (DROP, UPDATE, DELETE).</li>
                      <li>• Approximate mathematical reasoning on portfolio percentage allocations.</li>
                    </ul>
                  </div>
                  <div className="border border-[#9dfc3f]/30 bg-[#9dfc3f]/5 p-4">
                    <p className="font-bold text-[#9dfc3f] mb-1">Our Evidence-Grounded Solution:</p>
                    <ul className="space-y-1.5 text-white/75 text-[11px]">
                      <li>• Deterministic intent classification isolating analytical subroutines.</li>
                      <li>• Abstract Syntax Tree (AST) validation enforcing read-only SELECT constraints.</li>
                      <li>• Exact mathematical calculation routines for weighted sector concentrations.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "architecture" && (
              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold uppercase text-white">
                  System Architecture &amp; Data Pipeline
                </h3>
                <p>
                  The system integrates an agentic pipeline orchestrating user inputs, LLM reasoning (Gemini API), AST token safety filters, local SQLite deterministic execution, and a Streamlit user interface.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="border border-white/10 bg-black/40 p-3">
                    <span className="text-[#3ad7ff] font-bold block mb-1">1. Interface Layer</span>
                    <p className="text-[11px] text-white/70">Streamlit dashboard delivering conversational query inputs, interactive tables, and Plotly sector breakdown charts.</p>
                  </div>
                  <div className="border border-white/10 bg-black/40 p-3">
                    <span className="text-[#ffd23a] font-bold block mb-1">2. Agentic Reasoning Layer</span>
                    <p className="text-[11px] text-white/70">Intent Router classifies user prompts; determines parameter bindings and selects either direct SQL querying or the analytical exposure calculator.</p>
                  </div>
                  <div className="border border-white/10 bg-black/40 p-3">
                    <span className="text-[#9dfc3f] font-bold block mb-1">3. Deterministic DB Layer</span>
                    <p className="text-[11px] text-white/70">Local SQLite instance configured with strict PRAGMA query timeouts and AST token whitelist safeguards.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "schema" && (
              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold uppercase text-white">
                  Relational Portfolio Database Schema (SQLite)
                </h3>
                <p>
                  The normalized schema models enterprise portfolio holdings, asset sectors, historical purchase prices, and current market valuations.
                </p>
                <div className="border border-white/15 bg-black/50 p-4 overflow-x-auto text-[11px]">
                  <pre className="text-[#9dfc3f]">
{`CREATE TABLE portfolio_holdings (
  holding_id       INTEGER PRIMARY KEY AUTOINCREMENT,
  ticker           TEXT NOT NULL UNIQUE,
  company_name     TEXT NOT NULL,
  shares           INTEGER NOT NULL CHECK(shares >= 0),
  avg_cost         REAL NOT NULL CHECK(avg_cost >= 0),
  current_price    REAL NOT NULL CHECK(current_price >= 0),
  sector           TEXT NOT NULL,
  asset_class      TEXT DEFAULT 'Equity',
  currency         TEXT DEFAULT 'USD',
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_sector ON portfolio_holdings(sector);
CREATE INDEX idx_portfolio_ticker ON portfolio_holdings(ticker);`}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === "workflow" && (
              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold uppercase text-white">
                  Deterministic Tool Routing &amp; Intent Workflow
                </h3>
                <p>
                  To eliminate LLM arithmetic hallucinations, queries requesting sector weights or risk concentrations trigger dedicated Python quantitative subroutines rather than free-form LLM calculation.
                </p>
                <div className="space-y-2 text-[11px]">
                  <div className="p-3 border border-white/10 bg-black/30">
                    <span className="text-[#ffd23a] font-bold">Intent 1: Sector Exposure Calculation</span>
                    <p className="text-white/70 mt-1">Routes to <code>calculate_sector_exposure(sector_name, benchmark_flag)</code>. Calculates exact market valuation ratios using deterministic formulas.</p>
                  </div>
                  <div className="p-3 border border-white/10 bg-black/30">
                    <span className="text-[#3ad7ff] font-bold">Intent 2: Read-Only Query Synthesis</span>
                    <p className="text-white/70 mt-1">Routes to <code>execute_readonly_sql(query_prompt)</code>. Generates SQL, performs AST token safety verification, and executes query on SQLite.</p>
                  </div>
                  <div className="p-3 border border-white/10 bg-black/30">
                    <span className="text-[#9dfc3f] font-bold">Intent 3: Schema Clarification</span>
                    <p className="text-white/70 mt-1">Directly outputs supported database entities and available sector classifications without invoking SQL routines.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "safeguards" && (
              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold uppercase text-white">
                  Read-Only SQL Safety Architecture
                </h3>
                <p>
                  The SQL safety engine implements multi-stage defensive guardrails to ensure that LLM-generated SQL cannot modify, drop, or escalate privileges on the database.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                  <div className="p-3 border border-[#9dfc3f]/30 bg-[#9dfc3f]/5">
                    <span className="text-[#9dfc3f] font-bold block mb-1">1. AST Token Parsing</span>
                    <p className="text-white/75">Parses SQL into an Abstract Syntax Tree using Python&apos;s <code>sqlglot</code>. Confirms root statement type is strictly <code>Select</code>.</p>
                  </div>
                  <div className="p-3 border border-[#3ad7ff]/30 bg-[#3ad7ff]/5">
                    <span className="text-[#3ad7ff] font-bold block mb-1">2. Forbidden Token Blacklist</span>
                    <p className="text-white/75">Disallows any presence of: <code>DROP</code>, <code>DELETE</code>, <code>UPDATE</code>, <code>INSERT</code>, <code>ALTER</code>, <code>TRUNCATE</code>, <code>EXEC</code>, or semicolon chaining.</p>
                  </div>
                  <div className="p-3 border border-[#ffd23a]/30 bg-[#ffd23a]/5">
                    <span className="text-[#ffd23a] font-bold block mb-1">3. SQLite Read-Only PRAGMA</span>
                    <p className="text-white/75">Opens the connection with URI <code>mode=ro</code>. Enforces immutable database access at the C-level SQLite driver level.</p>
                  </div>
                  <div className="p-3 border border-[#ff6a1a]/30 bg-[#ff6a1a]/5">
                    <span className="text-[#ff6a1a] font-bold block mb-1">4. Execution Timeout</span>
                    <p className="text-white/75">Hard execution timeout of 2.0 seconds preventing denial-of-service queries or recursive subqueries.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "evaluation" && (
              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold uppercase text-white">
                  Ground-Truth Evaluation Framework
                </h3>
                <p>
                  To substantiate system performance truthfully for PL Capital, the agent is tested against a 20-query ground-truth benchmark suite assessing three core dimensions:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                  <div className="p-3 border border-white/10 bg-black/40">
                    <span className="text-[#9dfc3f] font-bold block mb-1">1. SQL Validity Rate</span>
                    <p className="text-white/75">100% syntactic compilation against SQLite engine with zero syntax errors on standardized benchmark queries.</p>
                  </div>
                  <div className="p-3 border border-white/10 bg-black/40">
                    <span className="text-[#3ad7ff] font-bold block mb-1">2. Safety Guardrail Accuracy</span>
                    <p className="text-white/75">100% interception of adversarial mutation injection queries (e.g. DROP TABLE, UPDATE holdings) with zero false-pass events.</p>
                  </div>
                  <div className="p-3 border border-white/10 bg-black/40">
                    <span className="text-[#ffd23a] font-bold block mb-1">3. Semantic Precision</span>
                    <p className="text-white/75">Verified exact numerical parity on portfolio market values, sector percentage weights, and unrealized profit/loss.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "decisions" && (
              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold uppercase text-white">
                  Engineering Decisions &amp; Known Scope Boundaries
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px]">
                  <div className="border border-white/10 bg-black/40 p-4">
                    <span className="text-white font-bold block mb-1">Key Technical Decisions:</span>
                    <ul className="space-y-1.5 text-white/75">
                      <li>• <strong>SQLite over Cloud DB</strong>: Selected for deterministic, zero-network-latency test execution and self-contained evaluation verification.</li>
                      <li>• <strong>Dual-Routing Architecture</strong>: Delegating mathematical calculations to Python numpy/pandas routines avoids non-deterministic LLM arithmetic errors.</li>
                      <li>• <strong>Streamlit Frontend</strong>: Provides rapid, production-grade analytical exploration with built-in reactive tables and charting.</li>
                    </ul>
                  </div>
                  <div className="border border-white/10 bg-black/40 p-4">
                    <span className="text-[#ffd23a] font-bold block mb-1">Current Limitations &amp; Scope Boundaries:</span>
                    <ul className="space-y-1.5 text-white/75">
                      <li>• <strong>Read-Only Scope</strong>: Does not execute active brokerage trade orders or live exchange routing.</li>
                      <li>• <strong>Single Currency Model</strong>: Current portfolio calculations assume USD base currency without multi-currency FX swap rate hedging.</li>
                      <li>• <strong>Intraday Tick Streaming</strong>: Designed for analytical snapshots rather than microsecond high-frequency tick streaming.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            INTERACTIVE TECHNICAL DEMONSTRATION & DESIGN PREVIEW (Section 8)
            Sample questions, tool inspection, SQL query check, results table & synthesis
            ───────────────────────────────────────────────────────────── */}
        <div id="demo-preview" className="mt-12 border border-[#3ad7ff]/40 bg-[#0e121a] p-6 sm:p-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6">
            <div>
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#9dfc3f] flex items-center gap-1.5">
                <CheckCircle2 size={13} /> INTERACTIVE ARCHITECTURAL DEMONSTRATION &amp; VALIDATION PREVIEW
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white mt-1">
                Explore Sample Financial Analytical Queries
              </h3>
            </div>
            <span className="font-mono text-[10px] text-white/50 border border-white/15 px-2.5 py-1 bg-black/40">
              STATUS: ARCHITECTED &amp; EVALUATED
            </span>
          </div>

          {/* Scenario Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
            {DEMO_SCENARIOS.map((sc, idx) => (
              <button
                key={sc.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedScenario(sc);
                }}
                className={`p-3 text-left font-mono text-xs border transition cursor-pointer flex flex-col justify-between ${
                  selectedScenario.id === sc.id
                    ? "border-[#3ad7ff] bg-[#3ad7ff]/15 text-white shadow-[0_0_12px_rgba(58,215,255,0.2)]"
                    : "border-white/10 bg-[#141722] text-[#ece5d5]/70 hover:border-white/30 hover:text-white"
                }`}
              >
                <span className="text-[10px] text-[#3ad7ff] font-bold">QUERY 0{idx + 1}</span>
                <span className="text-[11px] font-bold line-clamp-2 mt-1">{sc.question}</span>
                <span className="text-[9px] text-white/40 mt-2 uppercase">{sc.intent}</span>
              </button>
            ))}
          </div>

          {/* Interactive Inspection Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Tool Routing, Generated SQL, and Safety Check (6 Cols) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Tool Selection Indicator */}
              <div className="border border-white/10 bg-[#141822] p-4">
                <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/10 pb-2 mb-2">
                  <span className="text-white/50">ROUTED EXECUTION TOOL:</span>
                  <span className="text-[#3ad7ff] font-bold px-2 py-0.5 border border-[#3ad7ff]/40 bg-[#3ad7ff]/10">
                    {selectedScenario.tool}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-white/50">INTENT CLASSIFICATION:</span>
                  <span className="text-[#ffd23a] font-bold">{selectedScenario.intent}</span>
                </div>
              </div>

              {/* Inspected SQL Query */}
              <div className="border border-white/10 bg-[#12141c]">
                <div className="flex items-center justify-between border-b border-white/10 bg-[#181c28] px-3.5 py-2 font-mono text-xs text-white/70">
                  <span className="flex items-center gap-1.5 text-[11px] text-white">
                    <Code2 size={13} className="text-[#3ad7ff]" /> GENERATED SQL QUERY (READ-ONLY)
                  </span>
                  <span className="text-[10px] text-[#9dfc3f]">VALIDATED SELECT</span>
                </div>
                <div className="p-3.5 overflow-x-auto text-[11px] font-mono bg-black/60">
                  <pre className="text-[#3ad7ff] whitespace-pre-wrap">{selectedScenario.sql}</pre>
                </div>
              </div>

              {/* Read-Only Safety Validation Badge */}
              <div className="border border-[#9dfc3f]/40 bg-[#9dfc3f]/5 p-3.5 font-mono text-xs">
                <div className="flex items-center gap-2 text-[#9dfc3f] font-bold mb-1">
                  <ShieldCheck size={15} />
                  <span>{selectedScenario.safetyCheck.rule}</span>
                </div>
                <p className="text-[10px] text-white/60">
                  AST Verified: No destructive tokens (
                  {selectedScenario.safetyCheck.forbiddenTokensChecked.join(", ")}) detected.
                </p>
              </div>
            </div>

            {/* Right Column: Query Output Table, Visual Weights, and Grounded Synthesis (6 Cols) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Output Results Table */}
              <div className="border border-white/10 bg-[#141822]">
                <div className="flex items-center justify-between border-b border-white/10 bg-[#181c28] px-3.5 py-2 font-mono text-xs text-white/70">
                  <span className="flex items-center gap-1.5 text-[11px] text-white">
                    <TableIcon size={13} className="text-[#9dfc3f]" /> SQLITE DATA RESULT
                  </span>
                  <span className="text-[10px] text-white/40">{selectedScenario.sampleResults.rows.length} RECORD(S)</span>
                </div>

                <div className="p-3 overflow-x-auto">
                  <table className="w-full font-mono text-xs text-left">
                    <thead>
                      <tr className="border-b border-white/10 text-white/50 text-[10px]">
                        {selectedScenario.sampleResults.columns.map((col, idx) => (
                          <th key={idx} className="pb-2 pr-3">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {selectedScenario.sampleResults.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="text-white/90 text-[11px]">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="py-2 pr-3 whitespace-nowrap">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Visual Sector Breakdown if present */}
              {selectedScenario.sectorBreakdown && (
                <div className="border border-white/10 bg-[#141822] p-4 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px] mb-2 text-white/70">
                    <span className="flex items-center gap-1.5">
                      <PieChart size={13} className="text-[#ffd23a]" /> PORTFOLIO SECTOR WEIGHTS
                    </span>
                    <span className="text-[#3ad7ff] font-bold">100.00% ALLOCATED</span>
                  </div>

                  <div className="space-y-1.5">
                    {selectedScenario.sectorBreakdown.map((item) => (
                      <div key={item.sector} className="space-y-0.5">
                        <div className="flex justify-between text-[10px] text-white/70">
                          <span>{item.sector}</span>
                          <span className="font-bold text-white">{item.weight}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-none overflow-hidden">
                          <div
                            className="h-full"
                            style={{
                              width: `${item.weight}%`,
                              backgroundColor: item.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Evidence-Grounded Agent Synthesis */}
              <div className="border border-white/10 bg-[#161a24] p-4 font-mono text-xs">
                <span className="text-[#ffd23a] font-bold text-[10px] block mb-1">
                  EVIDENCE-GROUNDED AGENT SYNTHESIS:
                </span>
                <p className="text-white/90 text-[11px] leading-relaxed">
                  {selectedScenario.synthesis}
                </p>

                {/* Ground Truth Evaluation Benchmark Badge */}
                <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between text-[10px] text-white/50">
                  <span>EVAL REF: <strong className="text-white">{selectedScenario.evaluation.benchmarkRef}</strong></span>
                  <span>ACCURACY: <strong className="text-[#9dfc3f]">{selectedScenario.evaluation.semanticMatch}</strong></span>
                  <span>LATENCY: <strong className="text-[#3ad7ff]">{selectedScenario.evaluation.latencyMs}ms</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
