"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Github, ExternalLink, X } from "lucide-react";
import { projects, Project } from "@/lib/data/projects";
import { siteConfig } from "@/lib/data/site";
import { sounds } from "@/components/layout/sound-manager";

type GitHubRepo = {
  id: number;
  name: string;
  fullName: string;
  description: string;
  url: string;
  demoUrl: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  updatedAt: string;
};

const domains = ["All", "Machine Learning & XAI", "Data Analytics & BI", "Full-Stack Systems", "Cybersecurity & Deepfake"];

export function DepotSection() {
  const [activeDomain, setActiveDomain] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    fetch("/api/github/repos")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { repositories?: GitHubRepo[] }) => {
        setRepos(data.repositories || []);
      })
      .catch(() => {});
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesDomain =
        activeDomain === "All" ||
        (activeDomain === "Machine Learning & XAI" && (p.domain.includes("Machine Learning") || p.domain.includes("XAI"))) ||
        (activeDomain === "Data Analytics & BI" && (p.domain.includes("Analytics") || p.domain.includes("BI"))) ||
        (activeDomain === "Full-Stack Systems" && (p.domain.includes("Full-Stack") || p.domain.includes("Software"))) ||
        (activeDomain === "Cybersecurity & Deepfake" && (p.domain.includes("Cyber") || p.domain.includes("Vision") || p.domain.includes("Deep Learning")));

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));

      return matchesDomain && matchesSearch;
    });
  }, [activeDomain, searchQuery]);

  return (
    <section
      id="depot"
      className="relative py-24 sm:py-32 bg-[#16181c] border-b border-[#ece5d5]/10"
      aria-labelledby="depot-heading"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-[#ece5d5]/15">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#ff6a1a]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff6a1a]" />
              STATION 04 // PROJECT DEPOT &amp; FLEET
            </div>
            <h2
              id="depot-heading"
              className="mt-2 text-3xl font-black uppercase tracking-tight text-[#ece5d5] sm:text-5xl font-display"
            >
              COMPLETE CODE FLEET &amp; RESEARCH
            </h2>
          </div>

          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            onMouseEnter={() => sounds.playHover()}
            className="flex items-center gap-2 border border-[#ece5d5]/25 bg-[#1e2026] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#ece5d5] transition hover:border-[#ff6a1a] hover:text-[#ff6a1a]"
          >
            <Github size={15} />
            <span>OPEN GITHUB PROFILE [harshkhamkar26]</span>
          </a>
        </div>

        {/* Filter Controls & Search */}
        <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {domains.map((dom) => {
              const active = activeDomain === dom;
              return (
                <button
                  key={dom}
                  onClick={() => {
                    sounds.playClick();
                    setActiveDomain(dom);
                  }}
                  onMouseEnter={() => sounds.playHover()}
                  className={`border px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                    active
                      ? "border-[#ff6a1a] bg-[#ff6a1a] text-[#16181c]"
                      : "border-white/10 bg-[#1e2026]/70 text-white/70 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {dom}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={15} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword or stack..."
              className="w-full border border-white/15 bg-[#191b21] py-2 pl-9 pr-3 font-mono text-xs text-[#ece5d5] placeholder-white/40 focus:border-[#ff6a1a] focus:outline-none"
            />
          </div>
        </div>

        {/* Project Fleet Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj, idx) => (
            <motion.article
              key={proj.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onMouseEnter={() => sounds.playHover()}
              className="group flex flex-col justify-between border border-[#ece5d5]/15 bg-[#1a1c22] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/40"
              style={{
                borderTopColor: proj.accent,
                borderTopWidth: "3px",
              }}
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span
                    className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border"
                    style={{
                      borderColor: `${proj.accent}40`,
                      color: proj.accent,
                      backgroundColor: `${proj.accent}10`,
                    }}
                  >
                    {proj.domain}
                  </span>
                  <span className="font-mono text-[10px] text-white/45">
                    {proj.status}
                  </span>
                </div>

                {/* Title & subtitle */}
                <h3 className="mt-4 font-display text-xl font-black uppercase text-white group-hover:text-[#ece5d5] leading-snug">
                  {proj.title}
                </h3>
                <p
                  className="mt-1 font-mono text-xs"
                  style={{ color: proj.accent }}
                >
                  {proj.subtitle}
                </p>

                {/* Description */}
                <p className="mt-3 text-xs leading-relaxed text-[#ece5d5]/75 line-clamp-3">
                  {proj.description}
                </p>

                {/* Tech Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {proj.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="border border-white/10 bg-black/40 px-2 py-0.5 font-mono text-[10px] text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => {
                    sounds.playClick();
                    setSelectedProject(proj);
                  }}
                  className="font-mono text-xs font-bold text-white/80 hover:text-white underline decoration-dotted underline-offset-4"
                >
                  [VIEW BLUEPRINT]
                </button>

                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick()}
                  className="flex items-center gap-1.5 font-mono text-xs font-bold transition hover:underline"
                  style={{ color: proj.accent }}
                >
                  <Github size={13} />
                  <span>GITHUB ↗</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Live Public GitHub Repositories Banner */}
        <div className="mt-16 border border-[#ece5d5]/15 bg-[#121316] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#9dfc3f]">
                LIVE REPO FEED
              </span>
              <h4 className="font-display text-xl sm:text-2xl font-black uppercase text-white mt-1">
                Synced Repositories from GitHub API
              </h4>
            </div>
            <a
              href="https://github.com/harshkhamkar26?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[#ece5d5]/70 hover:text-[#9dfc3f] flex items-center gap-1.5"
            >
              <span>View all on GitHub</span>
              <ExternalLink size={13} />
            </a>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.slice(0, 6).map((repo) => (
              <a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sounds.playHover()}
                className="group border border-white/10 bg-[#16181c] p-4 transition hover:border-[#9dfc3f]/50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-white group-hover:text-[#9dfc3f]">
                    {repo.name}
                  </span>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-white/50">
                    {repo.language && <span>{repo.language}</span>}
                  </div>
                </div>
                <p className="mt-2 text-xs text-white/60 line-clamp-2">
                  {repo.description || "Project source code and documentation."}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Blueprint Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl border border-[#ece5d5]/25 bg-[#16181c] p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2">
                <span
                  className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 border"
                  style={{
                    borderColor: `${selectedProject.accent}50`,
                    color: selectedProject.accent,
                    backgroundColor: `${selectedProject.accent}10`,
                  }}
                >
                  {selectedProject.domain}
                </span>
                <span className="font-mono text-xs text-white/50">
                  {selectedProject.status}
                </span>
              </div>

              <h3 className="mt-3 font-display text-2xl sm:text-3xl font-black uppercase text-white">
                {selectedProject.title}
              </h3>
              <p className="font-mono text-xs mt-1" style={{ color: selectedProject.accent }}>
                {selectedProject.subtitle}
              </p>

              <p className="mt-4 text-xs sm:text-sm text-[#ece5d5]/80 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="mt-6 space-y-4">
                <div className="border border-white/10 bg-black/30 p-4">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[#ff6a1a]">
                    Engineered Challenges
                  </h4>
                  <ul className="mt-2 space-y-1.5 text-xs text-white/70">
                    {selectedProject.challenges.map((c, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[#ff6a1a]">▸</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-white/10 bg-black/30 p-4">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[#9dfc3f]">
                    Implemented Solutions
                  </h4>
                  <ul className="mt-2 space-y-1.5 text-xs text-white/70">
                    {selectedProject.solutions.map((s, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[#9dfc3f]">▸</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-white/10 bg-black/30 p-4">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[#3ad7ff]">
                    Technologies &amp; Tools
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selectedProject.technologies.map((t) => (
                      <span key={t} className="border border-white/15 bg-black/50 px-2 py-0.5 font-mono text-xs text-white">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 border border-white/20 font-mono text-xs text-white/70 hover:text-white"
                >
                  CLOSE
                </button>
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border-2 border-[#ff6a1a] bg-[#ff6a1a] px-4 py-2 font-mono text-xs font-bold uppercase text-[#16181c]"
                >
                  <Github size={14} />
                  <span>VIEW REPO ON GITHUB</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
