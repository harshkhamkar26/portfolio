"use client";

import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { Reveal } from "@/components/animations/reveal";
import { Card } from "@/components/ui/card";

export function ContactSection() {
  return (
    <section id="contact" className="relative py-24 sm:py-32" aria-labelledby="contact-heading">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 h-[420px] w-[700px] max-w-full -translate-x-1/2 rounded-full bg-[#c7ff3d]/5 blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[.24em] text-[#c7ff3d]">Open channel / 06</p>
          <h2 id="contact-heading" className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl">Have a problem worth solving?</h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">For internships, data and AI projects, research collaboration, or a thoughtful conversation — reach out directly.</p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <Card className="h-full border-white/10 bg-white/[0.03]">
              <p className="font-mono text-xs uppercase tracking-[.2em] text-white/40">Direct contact</p>
              <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Opportunity via portfolio")}`} className="mt-5 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 text-xl font-semibold text-white transition hover:text-[#c7ff3d] sm:text-2xl">
                <span className="break-all">{siteConfig.email}</span><ArrowUpRight />
              </a>
              <p className="mt-5 text-sm leading-6 text-white/45">The email link opens your email application. This portfolio does not pretend to send messages through a backend service.</p>
            </Card>
          </Reveal>

          <Reveal delay={.08}>
            <div className="grid gap-3">
              {[
                { icon: Linkedin, label: "LinkedIn", detail: "Professional profile", href: siteConfig.linkedin },
                { icon: Github, label: "GitHub", detail: "Projects and source code", href: siteConfig.github },
                { icon: Mail, label: "Email", detail: "Internships and collaboration", href: `mailto:${siteConfig.email}` },
              ].map((item) => (
                <a key={item.label} href={item.href} target={item.label === "Email" ? undefined : "_blank"} rel={item.label === "Email" ? undefined : "noopener noreferrer"} className="group flex min-h-[88px] items-center gap-4 border border-white/10 bg-[#111116] p-5 transition hover:border-[#c7ff3d]/40 hover:bg-[#c7ff3d]/[.04]">
                  <span className="flex h-11 w-11 items-center justify-center border border-white/10 text-[#c7ff3d]"><item.icon size={20} /></span>
                  <span className="flex-1"><span className="block font-semibold text-white">{item.label}</span><span className="mt-1 block text-sm text-white/45">{item.detail}</span></span>
                  <ArrowUpRight size={18} className="text-white/30 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#c7ff3d]" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
