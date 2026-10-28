"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase } from "lucide-react";
import { experiences } from "@/lib/data/site";
import { Reveal } from "@/components/animations/reveal";
import { Card } from "@/components/ui/card";

export function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cards = ref.current?.querySelectorAll("[data-exp-card]");
    if (!cards?.length) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.25,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      }
    );
  }, []);

  return (
    <section
      id="experience"
      className="relative py-32"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-amber-400">
            Career
          </p>
          <h2
            id="experience-heading"
            className="mt-3 text-4xl font-bold text-white sm:text-5xl"
          >
            Professional experience
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-16">
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-amber-500/50 to-transparent md:block" />
          <div className="space-y-12">
            {experiences.map((exp) => (
              <div key={exp.company} data-exp-card className="relative md:pl-20">
                <div className="absolute left-6 hidden h-4 w-4 rounded-full border-2 border-amber-400 bg-zinc-950 md:block" />
                <Card className="transition hover:border-amber-500/30">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                        <Briefcase className="h-6 w-6 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                        <p className="text-cyan-400">{exp.role}</p>
                      </div>
                    </div>
                    <div className="text-right text-sm text-zinc-500">
                      <p>{exp.period}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-2">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-zinc-400">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
