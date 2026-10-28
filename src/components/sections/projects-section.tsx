"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Filter } from "lucide-react";
import { projects } from "@/lib/data/projects";
import { Reveal } from "@/components/animations/reveal";
import { Badge } from "@/components/ui/badge";

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

export function ProjectsSection() {
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = filter
    ? projects.filter((p) => p.tags.includes(filter))
    : projects;

  return (
    <section
      id="projects"
      className="relative py-32"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-cyan-400">
            Portfolio
          </p>
          <h2
            id="projects-heading"
            className="mt-3 text-4xl font-bold text-white sm:text-5xl"
          >
            Project showcase
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400">
            End-to-end Data Science and AI case studies with metrics,
            architecture, and measurable business outcomes.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-zinc-500" />
          <button
            onClick={() => setFilter(null)}
            className={`rounded-lg px-3 py-1.5 text-sm transition ${
              !filter ? "bg-white/10 text-white" : "text-zinc-500 hover:text-white"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`rounded-lg px-3 py-1.5 text-sm transition ${
                filter === tag
                  ? "bg-cyan-500/20 text-cyan-300"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {filtered.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08}>
              <Link href={`/projects/${project.slug}`} className="group block">
                <motion.article
                  className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${project.gradient} p-[1px] transition-all duration-500 hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]`}
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative rounded-2xl bg-zinc-950/90 p-8 backdrop-blur-xl">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cyan-400" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-white group-hover:text-cyan-50">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-400">{project.subtitle}</p>
                    <p className="mt-4 line-clamp-2 text-sm text-zinc-500">
                      {project.description}
                    </p>
                    <div className="mt-6 flex gap-6 border-t border-white/10 pt-6">
                      {project.metrics.map((m) => (
                        <div key={m.label}>
                          <p className="text-lg font-bold text-cyan-400">{m.value}</p>
                          <p className="text-xs text-zinc-500">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.article>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
