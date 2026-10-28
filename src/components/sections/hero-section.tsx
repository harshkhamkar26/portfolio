"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { siteConfig, metrics } from "@/lib/data/site";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { ParticleField } from "@/components/effects/particle-field";
import { GridGlow } from "@/components/effects/grid-glow";

const NeuralNetworkScene = dynamic(
  () =>
    import("@/components/three/neural-network-scene").then(
      (m) => m.NeuralNetworkScene
    ),
  { ssr: false, loading: () => null }
);

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
      aria-label="Hero"
    >
      <GridGlow />
      <ParticleField />
      <NeuralNetworkScene />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-300 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                {siteConfig.location} · Open to Opportunities
              </span>
            </motion.div>

            <motion.h1
              className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
            </motion.h1>

            <motion.p
              className="mt-4 text-xl font-medium text-cyan-400 sm:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Data Scientist · AI Engineer · Analytics Specialist
            </motion.p>

            <motion.p
              className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              {siteConfig.tagline}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <MagneticButton>
                <Button size="lg" asChild>
                  <a href="#projects">Explore Projects</a>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button variant="outline" size="lg" asChild>
                  <Link href={siteConfig.resumeUrl}><Download className="h-4 w-4" />View Resume &amp; ATS</Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button variant="glass" size="lg" asChild>
                  <a href="#contact">
                    <Mail className="h-4 w-4" />
                    Contact Me
                  </a>
                </Button>
              </MagneticButton>
            </motion.div>
          </div>

          <div className="hidden lg:block" aria-hidden />
        </div>

        <motion.div
          className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <p className="text-2xl font-bold text-white sm:text-3xl">
                {m.value}
                <span className="text-cyan-400">{m.suffix}</span>
              </p>
              <p className="mt-1 text-sm text-zinc-500">{m.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.a
          href="#about"
          className="mt-16 flex flex-col items-center gap-2 text-zinc-500 transition-colors hover:text-cyan-400"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          aria-label="Scroll to about"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="h-5 w-5" />
        </motion.a>
      </div>
    </section>
  );
}
