"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "@/lib/data/skills";
import { Reveal } from "@/components/animations/reveal";
import { Progress } from "@/components/ui/progress";

const SkillSphereCanvas = dynamic(
  () =>
    import("@/components/three/skill-sphere").then((m) => m.SkillSphereCanvas),
  { ssr: false, loading: () => (
    <div className="flex h-[420px] items-center justify-center rounded-2xl border border-white/10 bg-white/5">
      <span className="text-zinc-500">Loading 3D skills...</span>
    </div>
  )}
);

export function SkillsSection() {
  const [active, setActive] = useState(skillCategories[0]);

  return (
    <section id="skills" className="relative py-32" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
            Expertise
          </p>
          <h2 id="skills-heading" className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Interactive skill spheres
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Hover over the 3D spheres or select a category to explore proficiency
            across Data Science, Machine Learning, Analytics, and more.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SkillSphereCanvas categories={skillCategories} />
          </Reveal>

          <div>
            <div className="flex flex-wrap gap-2">
              {skillCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat)}
                  className={`rounded-xl border px-4 py-2 text-sm transition-all ${
                    active.id === cat.id
                      ? "border-white/20 bg-white/10 text-white shadow-lg"
                      : "border-white/5 text-zinc-500 hover:border-white/15 hover:text-zinc-300"
                  }`}
                  style={
                    active.id === cat.id
                      ? { boxShadow: `0 0 24px ${cat.color}33` }
                      : undefined
                  }
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
            >
              <h3 className="text-lg font-semibold" style={{ color: active.color }}>
                {active.name}
              </h3>
              {active.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-zinc-300">{skill.name}</span>
                    <span className="text-zinc-500">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
