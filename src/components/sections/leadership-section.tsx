"use client";

import { Trophy, Users, Calendar, Medal } from "lucide-react";
import { leadership } from "@/lib/data/site";
import { Reveal } from "@/components/animations/reveal";

const icons = [Trophy, Users, Calendar, Medal];

export function LeadershipSection() {
  return (
    <section className="relative py-32" aria-labelledby="leadership-heading">
      <div className="absolute inset-0 bg-gradient-to-t from-violet-950/30 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
            Leadership
          </p>
          <h2
            id="leadership-heading"
            className="mt-3 text-4xl font-bold text-white sm:text-5xl"
          >
            Achievement wall
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Beyond data — leading teams, events, and competitive athletics with
            discipline and strategic thinking.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {leadership.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.title} delay={i * 0.1}>
                <article className="group relative overflow-hidden rounded-2xl border border-violet-500/20 bg-violet-500/5 p-8 transition-all hover:border-violet-400/40 hover:bg-violet-500/10">
                  <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-violet-500/10 blur-3xl" />
                  <Icon className="h-10 w-10 text-violet-400" />
                  <h3 className="mt-4 text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm font-medium text-violet-300">{item.org}</p>
                  <p className="mt-3 text-zinc-400">{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
