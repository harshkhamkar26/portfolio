"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, Github } from "lucide-react";
import { projects } from "@/lib/data/projects";
import { sounds } from "@/components/layout/sound-manager";

export function CircularCarousel() {
  const featured = projects.filter((p) => p.featured).slice(0, 5);
  const total = featured.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentDragDelta = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Degrees per item in the ring: 360 / 5 = 72 deg
  const stepAngle = 360 / total;

  const rotateTo = useCallback((newIndex: number) => {
    sounds.playSwitch();
    // Normalize index within 0..total-1
    const normalized = ((newIndex % total) + total) % total;
    setActiveIndex(normalized);
  }, [total]);

  const handlePrev = useCallback(() => {
    rotateTo(activeIndex - 1);
  }, [activeIndex, rotateTo]);

  const handleNext = useCallback(() => {
    rotateTo(activeIndex + 1);
  }, [activeIndex, rotateTo]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleNext, handlePrev]);

  // Pointer & Touch drag handling
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    currentDragDelta.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    currentDragDelta.current = e.clientX - startXRef.current;
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (currentDragDelta.current < -35) {
      handleNext();
    } else if (currentDragDelta.current > 35) {
      handlePrev();
    }
  };

  const activeProject = featured[activeIndex];

  return (
    <section
      id="showcase"
      className="relative py-20 sm:py-32 overflow-hidden bg-[#131418] border-b border-[#ece5d5]/10"
      aria-labelledby="showcase-heading"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-[#ece5d5]/15">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#ff6a1a]">
              <span>STATION 03 // 3D CYLINDER SHOWCASE</span>
            </div>
            <h2
              id="showcase-heading"
              className="mt-2 text-2xl sm:text-5xl font-black uppercase tracking-tight text-[#ece5d5] font-display"
            >
              FLAGSHIP WORK IN ORBIT
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block font-mono text-xs tracking-widest text-[#ece5d5]/60">
              SWIPE / DRAG · KEYBOARD [← / →]
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                onMouseEnter={() => sounds.playHover()}
                className="flex h-10 w-10 items-center justify-center border border-[#ece5d5]/25 bg-[#16181c] text-[#ece5d5] transition hover:border-[#ff6a1a] hover:text-[#ff6a1a]"
                aria-label="Previous Project"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                onMouseEnter={() => sounds.playHover()}
                className="flex h-10 w-10 items-center justify-center border border-[#ece5d5]/25 bg-[#16181c] text-[#ece5d5] transition hover:border-[#ff6a1a] hover:text-[#ff6a1a]"
                aria-label="Next Project"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 3D Cylindrical Carousel Viewport */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onTouchStart={(e) => {
            setIsDragging(true);
            startXRef.current = e.touches[0].clientX;
            currentDragDelta.current = 0;
          }}
          onTouchMove={(e) => {
            if (!isDragging) return;
            currentDragDelta.current = e.touches[0].clientX - startXRef.current;
          }}
          onTouchEnd={handlePointerUp}
          className="circular-carousel mt-10 cursor-grab active:cursor-grabbing"
          data-shape="wheel"
        >
          <div className="circular-carousel__stage">
            <div className="circular-carousel__camera">
              {/* Rotating Ring */}
              <div
                className="circular-carousel__ring"
                style={{
                  transform: `rotateY(${-activeIndex * stepAngle}deg)`,
                }}
              >
                {featured.map((proj, idx) => {
                  const cardAngle = idx * stepAngle;
                  const isCurrent = idx === activeIndex;
                  return (
                    <div
                      key={proj.slug}
                      onClick={() => rotateTo(idx)}
                      className="circular-carousel__card group border border-[#ece5d5]/20 bg-[#191b21] p-5 sm:p-6 shadow-2xl transition-all"
                      style={{
                        transform: `rotateY(${cardAngle}deg) translateZ(var(--cc-radius))`,
                        borderColor: isCurrent ? proj.accent : "rgba(236,229,213,0.14)",
                        boxShadow: isCurrent
                          ? `0 0 35px rgba(${proj.accentRgb}, 0.28), inset 0 0 15px rgba(${proj.accentRgb}, 0.08)`
                          : "none",
                        opacity: isCurrent ? 1 : 0.45,
                        filter: isCurrent ? "none" : "grayscale(0.4) brightness(0.7)",
                      }}
                    >
                      {/* Top Header of Card */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <span
                          className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border truncate max-w-[170px]"
                          style={{
                            borderColor: `${proj.accent}55`,
                            color: proj.accent,
                            backgroundColor: `${proj.accent}15`,
                          }}
                        >
                          {`0${idx + 1} // ${proj.domain}`}
                        </span>
                        <span className="font-mono text-[10px] text-white/50 shrink-0">
                          {proj.status.includes("Under Review") ? "Under Review" : proj.status}
                        </span>
                      </div>

                      {/* Main Card Content */}
                      <div className="mt-3 sm:mt-4 flex flex-col justify-between h-[270px] sm:h-[280px]">
                        <div>
                          <h3 className="font-display text-base sm:text-xl font-black uppercase leading-tight text-white group-hover:text-[#ece5d5] line-clamp-2">
                            {proj.title}
                          </h3>
                          <p
                            className="mt-1 font-mono text-[10px] sm:text-xs truncate"
                            style={{ color: proj.accent }}
                          >
                            {proj.subtitle}
                          </p>
                          <p className="mt-2.5 sm:mt-3 line-clamp-2 sm:line-clamp-3 text-xs leading-relaxed text-[#ece5d5]/75">
                            {proj.description}
                          </p>
                        </div>

                        {/* Tech pills */}
                        <div>
                          <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-4">
                            {proj.technologies.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="border border-white/10 bg-black/40 px-2 py-0.5 font-mono text-[10px] text-white/70"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-white/10">
                            <span className="font-mono text-[11px] text-white/60">
                              Harsh Khamkar
                            </span>
                            <a
                              href={proj.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-white transition hover:underline"
                              style={{ color: proj.accent }}
                            >
                              <Github size={13} />
                              <span>VIEW REPO</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 5 Orbit Station Indicators */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {featured.map((proj, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={proj.slug}
                onClick={() => rotateTo(idx)}
                className={`h-1.5 transition-all rounded-full ${
                  isCurrent ? "w-8 bg-[#ff6a1a]" : "w-2.5 bg-white/20 hover:bg-white/50"
                }`}
                aria-label={`Go to orbit station ${idx + 1}`}
              />
            );
          })}
        </div>

        {/* Selected Project Full Specification Telemetry */}
        {activeProject && (
          <div className="mt-8 border border-[#ece5d5]/20 bg-[#16181c] p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ece5d5]/15 pb-4">
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: activeProject.accent }}
                />
                <h4 className="font-display text-lg sm:text-2xl font-black uppercase text-white">
                  {activeProject.title}
                </h4>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick()}
                  className="flex items-center gap-2 border border-[#ece5d5]/30 bg-black/40 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white transition hover:border-[#ff6a1a] hover:text-[#ff6a1a]"
                >
                  <Github size={15} />
                  <span>INSPECT SOURCE CODE</span>
                </a>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:gap-6 md:grid-cols-3">
              <div className="border border-white/10 bg-black/20 p-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#ff6a1a]">
                  [KEY CHALLENGE]
                </span>
                <p className="mt-2 text-xs leading-relaxed text-[#ece5d5]/80">
                  {activeProject.challenges[0] || "Balancing model performance with transparent interpretability."}
                </p>
              </div>

              <div className="border border-white/10 bg-black/20 p-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#9dfc3f]">
                  [ENGINEERED SOLUTION]
                </span>
                <p className="mt-2 text-xs leading-relaxed text-[#ece5d5]/80">
                  {activeProject.solutions[0] || "Implemented rigorous data-pipeline validations and feature attribution."}
                </p>
              </div>

              <div className="border border-white/10 bg-black/20 p-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#3ad7ff]">
                  [METRICS &amp; IMPACT]
                </span>
                <div className="mt-2 space-y-1">
                  {activeProject.metrics.map((m, i) => (
                    <div key={i} className="flex justify-between font-mono text-xs">
                      <span className="text-white/60">{m.label}:</span>
                      <span className="text-white font-bold">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
