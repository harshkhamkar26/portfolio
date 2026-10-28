"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Github, GitCommit, Star, FolderGit2 } from "lucide-react";
import { githubStats } from "@/lib/data/site";
import { Reveal } from "@/components/animations/reveal";
import { AnimatedCounter } from "@/components/animations/animated-counter";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/data/site";

const COLORS = ["#22d3ee", "#8b5cf6", "#10b981", "#f59e0b", "#71717a"];

export function GithubSection() {
  return (
    <section
      id="github"
      className="relative py-32"
      aria-labelledby="github-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-400">
            Open Source
          </p>
          <h2
            id="github-heading"
            className="mt-3 text-4xl font-bold text-white sm:text-5xl"
          >
            GitHub Intelligence Center
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Live development metrics showcasing consistent contribution, diverse
            tech stack, and engineering discipline.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Contributions", value: githubStats.contributions, icon: GitCommit },
            { label: "Repositories", value: githubStats.repositories, icon: FolderGit2 },
            { label: "Stars Earned", value: githubStats.stars, icon: Star },
            { label: "Active", value: "Yes", icon: Github, text: true },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.05}>
              <Card className="flex items-center gap-4">
                <stat.icon className="h-8 w-8 text-cyan-400" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {stat.text ? (
                      stat.value
                    ) : (
                      <AnimatedCounter value={stat.value as number} />
                    )}
                  </p>
                  <p className="text-sm text-zinc-500">{stat.label}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card>
              <h3 className="mb-4 font-semibold text-white">Language Distribution</h3>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={githubStats.languages}
                    dataKey="percent"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                  >
                    {githubStats.languages.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#18181b",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 flex flex-wrap justify-center gap-4">
                {githubStats.languages.map((lang, i) => (
                  <span key={lang.name} className="flex items-center gap-2 text-xs text-zinc-400">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: COLORS[i] }}
                    />
                    {lang.name} {lang.percent}%
                  </span>
                ))}
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card>
              <h3 className="mb-4 font-semibold text-white">Commit Activity</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={githubStats.activity}>
                  <XAxis dataKey="month" stroke="#71717a" fontSize={12} />
                  <YAxis stroke="#71717a" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "#18181b",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                    }}
                  />
                  <Bar dataKey="commits" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Reveal>
        </div>

        <Reveal className="mt-8 text-center">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm text-white transition hover:border-cyan-500/30 hover:bg-white/10"
          >
            <Github className="h-5 w-5" />
            View GitHub Profile
          </a>
        </Reveal>
      </div>
    </section>
  );
}
