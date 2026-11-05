"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Github, ExternalLink, BookOpen, Sparkles, CheckCircle2, AlertTriangle, Layers, Terminal, ArrowUpRight } from "lucide-react";
import { projects, Project } from "@/lib/data/projects";
import { siteConfig, publications, Publication } from "@/lib/data/site";
import { sounds } from "@/components/layout/sound-manager";
import { StationBadge } from "@/components/ui/station-badge";

const REPO_FILTER_CATEGORIES = [
  "All",
  "Financial AI",
  "Machine Learning",
  "Explainable AI",
  "Agentic AI",
  "Data Analytics",
  "Full-Stack Engineering",
  "Research",
];

export function DepotSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPaper, setSelectedPaper] = useState<Publication | null>(null);

  const filteredRepositories = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        activeCategory === "All" ||
        p.category === activeCategory ||
        (activeCategory === "Financial AI" && (p.isFinancialAI || p.domain.includes("Financial"))) ||
        (activeCategory === "Explainable AI" && (p.domain.includes("Explainable") || p.tags.includes("Explainable AI"))) ||
        (activeCategory === "Machine Learning" && (p.domain.includes("Machine Learning") || p.category === "Machine Learning")) ||
        (activeCategory === "Agentic AI" && (p.domain.includes("Agentic") || p.category === "Agentic AI")) ||
        (activeCategory === "Data Analytics" && (p.domain.includes("Analytics") || p.category === "Data Analytics")) ||
        (activeCategory === "Full-Stack Engineering" && (p.category === "Full-Stack Engineering")) ||
        (activeCategory === "Research" && (p.status.includes("Under Review") || p.category === "Research"));

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section
      id="depot"
      className="relative py-20 sm:py-32 bg-[#16181c] border-b border-[#ece5d5]/10"
      aria-labelledby="depot-heading"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-[#ece5d5]/15">
          <div>
            <StationBadge stationNo="04" title="DEPOT · RESEARCH & CODE FLEET" nextStationId="about" nextStationName="PROFILE" accentColor="#3ad7ff" />
            <h2
              id="depot-heading"
              className="mt-2 text-2xl sm:text-5xl font-black uppercase tracking-tight text-[#ece5d5] font-display"
            >
              RESEARCH PAPERS &amp; CODE FLEET
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs leading-relaxed text-[#ece5d5]/70">
            Differentiated into formal academic research under peer review and verified open-source engineering implementations.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            AREA A: ACADEMIC RESEARCH PAPERS (Under Peer Review)
            Truthful, verifiable claims, complete methodologies and results
            ───────────────────────────────────────────────────────────── */}
        <div className="mt-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-8">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-xs border border-[#ffd23a]/50 bg-[#ffd23a]/15 text-[#ffd23a]">
                <BookOpen size={16} />
              </span>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white">
                  AREA A — ACADEMIC RESEARCH PAPERS
                </h3>
                <span className="font-mono text-[10px] text-[#ffd23a] uppercase font-bold tracking-widest">
                  STATUS: SUBMITTED / CURRENTLY UNDER PEER REVIEW (NOT YET ACCEPTED/PUBLISHED)
                </span>
              </div>
            </div>
            <span className="font-mono text-xs text-white/50 border border-white/10 px-3 py-1 bg-black/30">
              2 FORMAL MANUSCRIPTS
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {publications.map((paper) => (
              <motion.article
                key={paper.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="border border-[#ece5d5]/20 bg-[#191b22] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative"
                style={{ borderTop: `4px solid ${paper.accent}` }}
              >
                <div>
                  {/* Status Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 mb-4">
                    <span
                      className="font-mono text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 border"
                      style={{
                        borderColor: `${paper.accent}50`,
                        color: paper.accent,
                        backgroundColor: `${paper.accent}15`,
                      }}
                    >
                      {paper.badge}
                    </span>
                    <span className="font-mono text-[11px] text-white/60">
                      {paper.venue}
                    </span>
                  </div>

                  {/* Title & Domain */}
                  <h4 className="font-display text-lg sm:text-xl font-black uppercase text-white leading-snug">
                    &ldquo;{paper.title}&rdquo;
                  </h4>
                  <p className="font-mono text-xs mt-1 text-white/50">
                    Authors: <strong className="text-white">{paper.authors}</strong> · Domain: <span style={{ color: paper.accent }}>{paper.domain}</span>
                  </p>

                  {/* Abstract Summary */}
                  <div className="mt-4 pt-3 border-t border-white/10 font-mono text-xs leading-relaxed text-[#ece5d5]/85">
                    <span className="font-bold text-white text-[10px] uppercase tracking-wider block mb-1">
                      ABSTRACT SUMMARY:
                    </span>
                    <p>{paper.abstractSummary}</p>
                  </div>

                  {/* Problem Statement & Dataset */}
                  <div className="mt-4 space-y-2 font-mono text-xs">
                    <div className="p-3 border border-white/10 bg-black/40">
                      <span className="text-[#ffd23a] font-bold text-[10px] uppercase tracking-wider block mb-0.5">
                        PROBLEM STATEMENT:
                      </span>
                      <p className="text-white/75 text-[11px]">{paper.problemStatement}</p>
                    </div>

                    <div className="p-3 border border-white/10 bg-black/40">
                      <span className="text-[#3ad7ff] font-bold text-[10px] uppercase tracking-wider block mb-0.5">
                        DATASET &amp; EXPERIMENTAL COHORTS:
                      </span>
                      <p className="text-white/75 text-[11px]">{paper.dataset}</p>
                    </div>
                  </div>

                  {/* Methodology & Algorithms */}
                  <div className="mt-4 pt-3 border-t border-white/10 font-mono text-xs">
                    <span className="font-bold text-white text-[10px] uppercase tracking-wider block mb-1.5">
                      METHODOLOGY &amp; ALGORITHMS:
                    </span>
                    <ul className="space-y-1 text-white/75 text-[11px]">
                      {paper.methodology.map((m, mIdx) => (
                        <li key={mIdx} className="flex gap-2">
                          <span style={{ color: paper.accent }}>▸</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Experimental Results & Contribution */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    <div className="p-3 border border-[#9dfc3f]/30 bg-[#9dfc3f]/5">
                      <span className="text-[#9dfc3f] font-bold text-[10px] uppercase tracking-wider block mb-1">
                        VERIFIED RESULTS:
                      </span>
                      <p className="text-white/80 text-[11px]">{paper.results}</p>
                    </div>
                    <div className="p-3 border border-white/10 bg-black/40">
                      <span className="text-white font-bold text-[10px] uppercase tracking-wider block mb-1">
                        RESEARCH CONTRIBUTION:
                      </span>
                      <p className="text-white/80 text-[11px]">{paper.contribution}</p>
                    </div>
                  </div>

                  {/* Limitations */}
                  <div className="mt-3 p-3 border border-white/10 bg-black/30 font-mono text-[11px] text-white/60">
                    <span className="text-white/40 font-bold uppercase tracking-wider block mb-0.5">
                      LIMITATIONS &amp; SCOPE:
                    </span>
                    {paper.limitations}
                  </div>
                </div>

                {/* Footer Link & Verification */}
                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                  <span className="text-[10px] text-white/40">
                    Status: <strong className="text-[#ffd23a]">Submitted / Under Review</strong>
                  </span>
                  <a
                    href={paper.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.playClick()}
                    className="flex items-center gap-2 border border-white/20 bg-black/40 px-3.5 py-1.5 font-bold uppercase text-white hover:border-[#3ad7ff] hover:text-[#3ad7ff] transition"
                  >
                    <Github size={13} />
                    <span>INSPECT REPO &amp; ABSTRACT</span>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            AREA B: ENGINEERING REPOSITORIES
            Categorized filters, improved search, zero duplicates
            ───────────────────────────────────────────────────────────── */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-xs border border-[#3ad7ff]/50 bg-[#3ad7ff]/15 text-[#3ad7ff]">
                <Layers size={16} />
              </span>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white">
                  AREA B — ENGINEERING REPOSITORIES
                </h3>
                <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">
                  PRODUCTION SYSTEMS, ARCHITECTURES &amp; DATA PIPELINES
                </span>
              </div>
            </div>

            {/* Search Input Bar */}
            <div className="relative w-full md:w-80">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search repo, tech stack, keyword..."
                className="w-full border border-white/15 bg-[#12141a] pl-9 pr-4 py-2 font-mono text-xs text-white placeholder-white/40 focus:border-[#3ad7ff] focus:outline-none"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 pb-6 border-b border-white/10 overflow-x-auto">
            {REPO_FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sounds.playClick();
                  setActiveCategory(cat);
                }}
                className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider border transition cursor-pointer shrink-0 ${
                  activeCategory === cat
                    ? "border-[#3ad7ff] bg-[#3ad7ff] text-[#0c1017] font-black"
                    : "border-white/15 bg-[#161820] text-white/70 hover:border-white/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Repositories Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepositories.map((repo) => (
              <div
                key={repo.slug}
                className="border border-[#ece5d5]/15 bg-[#181a22] p-6 flex flex-col justify-between transition-all hover:border-white/30 hover:-translate-y-1 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                    <span
                      className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border"
                      style={{
                        borderColor: `${repo.accent}50`,
                        color: repo.accent,
                        backgroundColor: `${repo.accent}15`,
                      }}
                    >
                      {repo.category}
                    </span>
                    <span className="font-mono text-[9px] text-white/50 uppercase border border-white/10 px-1.5 py-0.2">
                      {repo.status.includes("Under Review") ? "Under Review" : repo.status}
                    </span>
                  </div>

                  <h4 className="font-display text-lg font-black uppercase text-white leading-tight">
                    {repo.title}
                  </h4>
                  <p className="font-mono text-[11px] mt-1 font-bold" style={{ color: repo.accent }}>
                    {repo.subtitle}
                  </p>
                  <p className="mt-3 font-mono text-xs text-[#ece5d5]/75 leading-relaxed line-clamp-3">
                    {repo.description}
                  </p>

                  {/* Tech stack tags */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                    {repo.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="border border-white/10 bg-black/40 px-2 py-0.5 font-mono text-[10px] text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                  {repo.isFinancialAI ? (
                    <a
                      href="#financial-demo"
                      onClick={() => sounds.playClick()}
                      className="inline-flex items-center gap-1 font-bold text-[#3ad7ff] hover:underline"
                    >
                      <Terminal size={12} />
                      <span>LIVE DEMO</span>
                    </a>
                  ) : repo.demoUrl ? (
                    <a
                      href={repo.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-[#9dfc3f] hover:underline"
                    >
                      <ExternalLink size={12} />
                      <span>DEMO</span>
                    </a>
                  ) : (
                    <span className="text-white/40 text-[10px] uppercase">SOURCE VERIFIED</span>
                  )}

                  <a
                    href={repo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.playClick()}
                    className="inline-flex items-center gap-1.5 font-bold text-white hover:text-[#3ad7ff] transition"
                  >
                    <Github size={13} />
                    <span>CODE REPO</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredRepositories.length === 0 && (
            <div className="p-12 text-center font-mono text-xs text-white/50 border border-white/10 bg-black/20 mt-6">
              No repositories found matching your category filter or search query.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
