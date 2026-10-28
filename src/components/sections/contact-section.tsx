"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ContactSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative py-32"
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute bottom-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-cyan-400">
            Connect
          </p>
          <h2
            id="contact-heading"
            className="mt-3 text-4xl font-bold text-white sm:text-5xl"
          >
            Let&apos;s build something intelligent
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", href: `mailto:${siteConfig.email}`, text: siteConfig.email },
                { icon: Linkedin, label: "LinkedIn", href: siteConfig.linkedin, text: "Connect on LinkedIn" },
                { icon: Github, label: "GitHub", href: siteConfig.github, text: "View repositories" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-500/30 hover:bg-white/[0.08]"
                >
                  <link.icon className="h-6 w-6 text-cyan-400" />
                  <div>
                    <p className="text-sm text-zinc-500">{link.label}</p>
                    <p className="font-medium text-white">{link.text}</p>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Card>
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <p className="text-xl font-semibold text-cyan-400">Message sent!</p>
                  <p className="mt-2 text-zinc-400">I&apos;ll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm text-zinc-400">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm text-zinc-400">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500/50"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm text-zinc-400">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500/50"
                      placeholder="Tell me about the opportunity..."
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              )}
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
