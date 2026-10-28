"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Filter, Github, Search, Star, GitFork, ExternalLink } from "lucide-react";
import { projects } from "@/lib/data/projects";
import { Reveal } from "@/components/animations/reveal";
import { Badge } from "@/components/ui/badge";

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

const categories = ["All", "Machine Learning", "NLP", "Analytics", "Visualization", "Web", "Research", "Other"];

function classify(repo: GitHubRepo): string[] {
  const text = [repo.name, repo.description, ...repo.topics, repo.language ?? ""].join(" ").toLowerCase();
  const result: string[] = [];
  if (/machine learning|\bml\b|deep learning|xai|shap|classification|prediction|model|deepfake|sentinel/.test(text)) result.push("Machine Learning");
  if (/nlp|language model|llm|text|sentiment|chatbot/.test(text)) result.push("NLP");
  if (/analytics|dashboard|sql|power bi|data analysis|sports analytics|visuali[sz]ation/.test(text)) result.push("Analytics");
  if (/visuali[sz]ation|chart|plot|power bi|dashboard/.test(text)) result.push("Visualization");
  if (/react|next\.js|nextjs|javascript|typescript|website|web app|frontend|portfolio/.test(text)) result.push("Web");
  if (/research|paper|experiment|study|xai|deepfake|sentinel/.test(text)) result.push("Research");
  if (result.length === 0) result.push("Other");
  return result;
}

export function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/github/repos")
      .then((response) => {
        if (!response.ok) throw new Error("GitHub request failed");
        return response.json();
      })
      .then((data: { repositories?: GitHubRepo[] }) => {
        if (active) setRepositories(data.repositories ?? []);
      })
      .catch(() => {
        if (active) setLoadError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const filteredRepositories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return repositories.filter((repo) => {
      const categoryMatch = filter === "All" || classify(repo).includes(filter);
      const queryMatch = !normalizedQuery || [repo.name, repo.description, repo.language ?? "", ...repo.topics]
        .join(" ").toLowerCase().includes(normalizedQuery);
      return categoryMatch && queryMatch;
    });
  }, [repositories, filter, query]);

  const featured = projects.filter((project) => project.featured);

  return (
    <section id="projects" className="relative py-32" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-cyan-400">Case files / selected work</p>
          <h2 id="projects-heading" className="mt-3 text-4xl font-bold text-white sm:text-5xl">Projects built with data.</h2>
          <p className="mt-4 max-w-2xl text-zinc-400">Selected case studies first, followed by a live catalogue of public repositories fetched from GitHub. Research proposals and implemented work are labelled separately.</p>
        </Reveal>

        <Reveal className="mt-8">
          <h3 className="text-xl font-semibold text-white">Featured case files</h3>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            {featured.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.06}>
                <Link href={`/projects/${project.slug}`} className="group block h-full">
                  <motion.article
                    className={`relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${project.gradient} p-[1px] transition-all duration-500 hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.16)]`}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 280 }}
                  >
                    <div className="h-full rounded-2xl bg-zinc-950/95 p-7 backdrop-blur-xl">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => <Badge key={tag}>{tag}</Badge>)}
                        {project.status && <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-zinc-300">{project.status}</span>}
                      </div>
                      <h4 className="mt-5 text-xl font-bold text-white group-hover:text-cyan-100">{project.title}</h4>
                      <p className="mt-2 text-sm text-cyan-200/80">{project.subtitle}</p>
                      <p className="mt-4 text-sm leading-6 text-zinc-400">{project.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => <span key={tech} className="rounded-md bg-white/5 px-2 py-1 text-xs text-zinc-300">{tech}</span>)}
                      </div>
                      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                        <span className="text-sm text-zinc-400">Read case file</span>
                        <ArrowUpRight className="h-5 w-5 text-cyan-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()} className="mt-3 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan-300">
                          <Github className="h-4 w-4" /> Source repository <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </motion.article>
                </Link>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <div className="mt-24 border-t border-white/10 pt-12">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-cyan-400">Live from GitHub</p>
                <h3 className="mt-3 text-3xl font-bold text-white">All public repositories</h3>
                <p className="mt-2 max-w-2xl text-sm text-zinc-400">Automatically refreshed from the public GitHub API. Use filters or search to explore the full collection.</p>
              </div>
              <a href="https://github.com/harshkhamkar26" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-white">
                <Github className="h-4 w-4" /> GitHub profile <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <div className="mt-7 flex flex-col gap-4">
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search repositories, technologies, topics…" aria-label="Search GitHub repositories" className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-cyan-400/50" />
            </div>
            <div className="flex flex-wrap items-center gap-2" aria-label="Repository categories">
              <Filter className="h-4 w-4 text-zinc-500" />
              {categories.map((category) => (
                <button key={category} onClick={() => setFilter(category)} aria-pressed={filter === category} className={`rounded-lg border px-3 py-1.5 text-sm transition ${filter === category ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200" : "border-white/10 text-zinc-400 hover:text-white"}`}>
                  {category}
                </button>
              ))}
            </div>
          </div>

          {loading && <p className="mt-8 text-sm text-zinc-400" role="status">Loading public repositories from GitHub…</p>}
          {loadError && <p className="mt-8 text-sm text-amber-200" role="status">GitHub data is temporarily unavailable. The featured case files above remain available; try again later or open the GitHub profile.</p>}
          {!loading && !loadError && (
            <p className="mt-5 text-xs text-zinc-500">{filteredRepositories.length} repositories · data cached for up to one hour</p>
          )}

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRepositories.map((repo, index) => (
              <Reveal key={repo.id} delay={Math.min(index * 0.025, 0.2)}>
                <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-400/30 hover:bg-white/[0.055]">
                  <div className="flex items-start justify-between gap-3">
                    <Github className="h-5 w-5 shrink-0 text-cyan-300" />
                    <span className="text-right text-xs text-zinc-500">{repo.language ?? "Language not specified"}</span>
                  </div>
                  <h4 className="mt-4 break-words font-semibold text-white">{repo.name}</h4>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-zinc-400">{repo.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {classify(repo).slice(0, 2).map((tag) => <span key={tag} className="rounded-md border border-white/10 px-2 py-1 text-xs text-zinc-400">{tag}</span>)}
                    {repo.topics.slice(0, 3).map((tag) => <span key={tag} className="rounded-md bg-white/5 px-2 py-1 text-xs text-zinc-500">{tag}</span>)}
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5" /> {repo.stars}</span>
                    <span className="flex items-center gap-1"><GitFork className="h-3.5 w-3.5" /> {repo.forks}</span>
                    <a href={repo.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-cyan-300 hover:text-white">View repo <ArrowUpRight className="h-3.5 w-3.5" /></a>
                  </div>
                  {repo.demoUrl && <a href={repo.demoUrl} target="_blank" rel="noreferrer" className="mt-3 text-sm text-zinc-300 hover:text-cyan-300">Live demo <ExternalLink className="inline h-3 w-3" /></a>}
                </article>
              </Reveal>
            ))}
          </div>
          {!loading && !loadError && filteredRepositories.length === 0 && <p className="mt-8 text-sm text-zinc-400">No repositories match this filter. Try another category or search term.</p>}
        </div>
      </div>
    </section>
  );
}
