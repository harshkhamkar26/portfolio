"use client";

import { useEffect, useMemo, useState } from "react";
import { Github, GitCommit, Star, FolderGit2, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { Reveal } from "@/components/animations/reveal";
import { Card } from "@/components/ui/card";

type Repo = {
  id: number; name: string; description: string; url: string;
  language: string | null; stars: number; forks: number; updatedAt: string;
};

export function GithubSection() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/github/repos")
      .then((response) => { if (!response.ok) throw new Error("GitHub unavailable"); return response.json(); })
      .then((data: { repositories?: Repo[] }) => { if (active) setRepos(data.repositories ?? []); })
      .catch(() => { if (active) setUnavailable(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const languages = useMemo(() => {
    const counts = new Map<string, number>();
    repos.forEach((repo) => { if (repo.language) counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1); });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [repos]);

  const totalStars = repos.reduce((sum, repo) => sum + repo.stars, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks, 0);
  const stats = [
    { label: "Public repositories", value: loading ? "…" : String(repos.length), icon: FolderGit2 },
    { label: "Stars on listed repos", value: loading ? "…" : String(totalStars), icon: Star },
    { label: "Forks on listed repos", value: loading ? "…" : String(totalForks), icon: GitCommit },
    { label: "Data source", value: "Live API", icon: Github },
  ];

  return (
    <section id="github" className="relative py-32" aria-labelledby="github-heading">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-400">Open source</p>
          <h2 id="github-heading" className="mt-3 text-4xl font-bold text-white sm:text-5xl">Connected to GitHub</h2>
          <p className="mt-4 max-w-2xl text-zinc-400">Repository counts, stars, forks, and language distribution are fetched from public GitHub data and cached for up to one hour.</p>
        </Reveal>
        {unavailable && <p className="mt-6 text-sm text-amber-200" role="status">GitHub statistics are temporarily unavailable. You can still browse the full profile directly.</p>}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.05}>
              <Card className="flex items-center gap-4">
                <stat.icon className="h-7 w-7 text-cyan-400" />
                <div><p className="text-2xl font-bold text-white">{stat.value}</p><p className="text-sm text-zinc-500">{stat.label}</p></div>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card>
              <h3 className="mb-4 font-semibold text-white">Languages across repositories</h3>
              {loading ? <p className="text-sm text-zinc-400">Loading language metadata…</p> : languages.length ? (
                <div className="space-y-4">
                  {languages.map(([language, count]) => (
                    <div key={language}>
                      <div className="mb-1 flex justify-between text-sm"><span className="text-zinc-300">{language}</span><span className="text-zinc-500">{count} repos</span></div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" style={{ width: Math.max(8, (count / Math.max(1, repos.length)) * 100) + "%" }} /></div>
                    </div>
                  ))}
                </div>
              ) : <p className="text-sm text-zinc-400">No language metadata available yet.</p>}
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card>
              <h3 className="mb-4 font-semibold text-white">Recently updated repositories</h3>
              {loading ? <p className="text-sm text-zinc-400">Loading repositories…</p> : (
                <div className="space-y-4">
                  {[...repos].sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)).slice(0, 5).map((repo) => (
                    <a key={repo.id} href={repo.url} target="_blank" rel="noreferrer" className="flex items-start justify-between gap-3 rounded-xl border border-white/10 p-3 transition hover:border-cyan-400/30">
                      <span><span className="block font-medium text-white">{repo.name}</span><span className="mt-1 block line-clamp-2 text-xs text-zinc-500">{repo.description}</span></span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-cyan-300" />
                    </a>
                  ))}
                </div>
              )}
            </Card>
          </Reveal>
        </div>
        <Reveal className="mt-8 text-center">
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm text-white transition hover:border-cyan-500/30 hover:bg-white/10">
            <Github className="h-5 w-5" /> View GitHub Profile <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
