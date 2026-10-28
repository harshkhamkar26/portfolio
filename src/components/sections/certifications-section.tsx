"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { certifications } from "@/lib/data/site";
import { Reveal } from "@/components/animations/reveal";

export function CertificationsSection() {
  return (
    <section className="relative py-32" aria-labelledby="certs-heading">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-rose-400">
            Credentials
          </p>
          <h2 id="certs-heading" className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Certifications
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <Reveal key={cert.name} delay={i * 0.08}>
              <motion.div
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-6 backdrop-blur-xl"
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 60px rgba(244, 63, 94, 0.15)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-rose-500/10 blur-2xl transition group-hover:bg-rose-500/20" />
                <Award className="h-8 w-8 text-rose-400" />
                <h3 className="mt-4 font-semibold text-white">{cert.name}</h3>
                <p className="mt-1 text-sm text-zinc-400">{cert.issuer}</p>
                <p className="mt-3 font-mono text-xs text-rose-400/80">{cert.year}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
