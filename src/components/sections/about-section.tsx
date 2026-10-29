"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journeyTimeline } from "@/lib/data/site";
import { Reveal } from "@/components/animations/reveal";
import { Badge } from "@/components/ui/badge";

const identity = [
  "Data Science",
  "Machine Learning",
  "Artificial Intelligence",
  "Business Analytics",
  "Data Visualization",
  "Leadership",
  "Innovation",
];

export function AboutSection() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const items = timelineRef.current?.querySelectorAll("[data-timeline-item]");
    if (!items?.length) return;

    gsap.fromTo(
      items,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section id="about" className="relative py-32" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-cyan-400">
            About
          </p>
          <h2
            id="about-heading"
            className="mt-3 max-w-3xl text-4xl font-bold text-white sm:text-5xl"
          >
            Building intelligence at the intersection of data, design, and
            decision-making
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 max-w-2xl">
          <p className="text-lg leading-relaxed text-zinc-400">
            I am a{" "}
            <strong className="text-white">Data Scientist</strong> and{" "}
            <strong className="text-white">AI/ML Engineer</strong> based in
            Mumbai, India — passionate about transforming complex datasets into
            actionable intelligence. My work spans predictive modeling,
            explainable AI, business analytics, and product-minded data systems
            that drive measurable impact.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {identity.map((item, i) => (
            <Reveal key={item} delay={0.05 * i}>
              <Badge className="border-cyan-500/20 bg-cyan-500/5 text-cyan-200">
                {item}
              </Badge>
            </Reveal>
          ))}
        </div>

        <div ref={timelineRef} className="relative mt-20">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-cyan-500 via-violet-500 to-transparent md:left-1/2 md:-translate-x-px" />
          {journeyTimeline.map((item, i) => (
            <div
              key={item.year}
              data-timeline-item
              className={`relative mb-12 flex flex-col md:flex-row ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="md:w-1/2" />
              <div className="absolute left-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-cyan-400 bg-zinc-950 md:left-1/2">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
              </div>
              <div
                className={`ml-12 md:ml-0 md:w-1/2 ${
                  i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                }`}
              >
                <span className="text-sm font-mono text-cyan-400">{item.year}</span>
                <h3 className="mt-1 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-zinc-400">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
