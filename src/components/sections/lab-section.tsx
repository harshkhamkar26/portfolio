"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Brain, Database, FlaskConical, BookOpen, LineChart } from "lucide-react";
import { labItems } from "@/lib/data/site";
import { Reveal } from "@/components/animations/reveal";
import { AnimatedCounter } from "@/components/animations/animated-counter";
import { Card } from "@/components/ui/card";

const iconMap = {
  brain: Brain,
  database: Database,
  chart: LineChart,
  flask: FlaskConical,
  book: BookOpen,
};

const experimentData = [
  { name: "Regression", score: 88 },
  { name: "Classification", score: 92 },
  { name: "Clustering", score: 85 },
  { name: "NLP", score: 79 },
  { name: "Forecasting", score: 91 },
];

const trendData = [
  { week: "W1", experiments: 2 },
  { week: "W2", experiments: 4 },
  { week: "W3", experiments: 3 },
  { week: "W4", experiments: 6 },
  { week: "W5", experiments: 5 },
  { week: "W6", experiments: 8 },
];

export function LabSection() {
  return (
    <section id="lab" className="relative py-32" aria-labelledby="lab-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-emerald-400">
            Research
          </p>
          <h2 id="lab-heading" className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            AI & Analytics Lab
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400">
            A living dashboard of models built, datasets analyzed, and experiments
            run — showcasing continuous learning and R&D mindset.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {labItems.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Brain;
            return (
              <Reveal key={item.label} delay={i * 0.05}>
                <Card className="text-center transition hover:border-emerald-500/30 hover:shadow-[0_0_24px_rgba(16,185,129,0.15)]">
                  <Icon className="mx-auto h-6 w-6 text-emerald-400" />
                  <p className="mt-4 text-3xl font-bold text-white">
                    <AnimatedCounter value={item.value} suffix="+" />
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">{item.label}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card>
              <h3 className="mb-4 font-semibold text-white">Model Performance</h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={experimentData}>
                  <XAxis dataKey="name" stroke="#71717a" fontSize={12} />
                  <YAxis stroke="#71717a" fontSize={12} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      background: "#18181b",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                    }}
                  />
                  <Bar dataKey="score" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card>
              <h3 className="mb-4 font-semibold text-white">Experiment Velocity</h3>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={trendData}>
                  <XAxis dataKey="week" stroke="#71717a" fontSize={12} />
                  <YAxis stroke="#71717a" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "#18181b",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="experiments"
                    stroke="#10b981"
                    fill="url(#areaGradient)"
                  />
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
