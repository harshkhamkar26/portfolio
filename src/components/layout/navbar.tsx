"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Terminal, Volume2, VolumeX } from "lucide-react";
import { stationStops } from "@/lib/data/site";
import { sounds } from "@/components/layout/sound-manager";

export function Navbar({ onCommandOpen }: { onCommandOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeStation, setActiveStation] = useState("hero");

  // Highly accurate viewport detection using getBoundingClientRect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const probeY = window.innerHeight * 0.35;
      let currentId = "hero";

      for (let i = stationStops.length - 1; i >= 0; i--) {
        const st = stationStops[i];
        const el = document.getElementById(st.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= probeY) {
            currentId = st.id;
            break;
          }
        }
      }

      // If at bottom of page, force last station (08 COMMS)
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        currentId = stationStops[stationStops.length - 1].id;
      }

      setActiveStation(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMobileOpen(false);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    sounds.playClick();
    setActiveStation(id); // Immediate visual feedback on tab click

    const target = document.getElementById(id);
    if (target) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: { offset?: number }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(target, { offset: -60 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
    closeMenu();
  };

  const toggleSound = () => {
    const newState = sounds.toggle();
    setSoundEnabled(newState);
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#12141a]/95 py-2.5 backdrop-blur-xl shadow-2xl"
          : "bg-transparent py-3 sm:py-4"
      }`}
    >
      <nav
        className="mx-auto flex max-w-[1680px] items-center justify-between px-3 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Brand / Locomotive Operator Identity */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 sm:gap-3 shrink-0"
          onClick={() => {
            sounds.playClick();
            closeMenu();
          }}
          onMouseEnter={() => sounds.playHover()}
        >
          <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 overflow-hidden border-2 border-[#ff6a1a] bg-[#16181c] shadow-[0_0_12px_rgba(255,106,26,0.3)] transition-all group-hover:border-[#9dfc3f] group-hover:shadow-[0_0_16px_rgba(157,252,63,0.4)]">
            <Image
              src="/images/harsh-khamkar.jpg"
              alt="Harsh Khamkar"
              fill
              sizes="36px"
              className="object-cover object-top"
              priority
            />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#9dfc3f] animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#9dfc3f]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xs sm:text-sm font-black uppercase tracking-tight text-[#ece5d5] group-hover:text-white transition-colors">
              HARSH KHAMKAR
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-[#ff6a1a]">
              DATA SCIENCE ENG
            </span>
          </div>
        </Link>

        {/* ─────────────────────────────────────────────────────────────
            INTERACTIVE CYBER-RAILWAY WAYPOINT NAVIGATOR (All 8 Stations)
            Features live sliding active capsule, glowing track line & audio
            ───────────────────────────────────────────────────────────── */}
        <div className="hidden lg:flex items-center">
          <div className="relative flex items-center rounded-full border border-white/15 bg-[#161820]/90 p-1 shadow-[0_4px_24px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            {/* Background Micro-Track Rail Line */}
            <div className="pointer-events-none absolute inset-x-4 top-1/2 -translate-y-1/2 h-[1px] bg-white/10 -z-10" />

            {stationStops.map((st) => {
              const isCurrent = activeStation === st.id;

              return (
                <a
                  key={st.id}
                  href={`#${st.id}`}
                  onClick={(e) => handleAnchor(e, st.id)}
                  onMouseEnter={() => sounds.playHover()}
                  className={`relative flex items-center gap-1.5 rounded-full px-2 xl:px-3 py-1 font-mono text-[10px] xl:text-[11px] uppercase tracking-wider transition-colors duration-200 select-none whitespace-nowrap shrink-0 ${
                    isCurrent
                      ? "text-white font-bold"
                      : "text-[#ece5d5]/65 hover:text-white"
                  }`}
                  title={`Station ${st.no}: ${st.name} (${st.label})`}
                >
                  {/* Sliding Active Waypoint Capsule */}
                  {isCurrent && (
                    <motion.div
                      layoutId="activeStationNavPill"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-full border border-[#ff6a1a] bg-gradient-to-r from-[#ff6a1a]/25 via-[#ffd23a]/20 to-[#ff6a1a]/25 shadow-[0_0_18px_rgba(255,106,26,0.35)] -z-10"
                    />
                  )}

                  {/* Pulsing Beacon Dot on Active Station */}
                  {isCurrent && (
                    <span className="relative flex h-1.5 w-1.5 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ffd23a] opacity-80" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ffd23a]" />
                    </span>
                  )}

                  {/* Station Number Badge */}
                  <span
                    className={`transition-colors ${
                      isCurrent
                        ? "text-[#ffd23a] font-black"
                        : "text-[#ff6a1a]/70 group-hover:text-[#ff6a1a]"
                    }`}
                  >
                    {st.no}
                  </span>

                  {/* Station Name */}
                  <span>{st.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Action Controls */}
        <div className="hidden items-center gap-2.5 sm:flex shrink-0">
          {/* Audio toggle button */}
          <button
            onClick={toggleSound}
            className="flex h-8 w-8 items-center justify-center border border-[#ece5d5]/20 bg-[#1e2026]/80 text-[#ece5d5]/70 transition hover:border-[#ff6a1a] hover:text-[#ff6a1a] cursor-pointer"
            aria-label="Toggle UI Audio"
            title="Audio feedback"
          >
            {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} className="opacity-50" />}
          </button>

          {/* Terminal / Search Command Palette */}
          <button
            onClick={() => {
              sounds.playClick();
              onCommandOpen();
            }}
            onMouseEnter={() => sounds.playHover()}
            className="flex items-center gap-1.5 border border-[#ece5d5]/20 bg-[#1e2026]/80 px-2.5 py-1.5 font-mono text-[11px] text-[#ece5d5]/80 transition hover:border-[#9dfc3f] hover:text-[#9dfc3f] cursor-pointer"
            aria-label="Open CLI Command Palette"
          >
            <Terminal size={12} className="text-[#9dfc3f]" />
            <span>CMD</span>
            <kbd className="rounded border border-white/10 bg-black/40 px-1 py-0.5 text-[9px] text-[#ece5d5]/60">⌘K</kbd>
          </button>

          {/* Download Resume Button */}
          <a
            href="/resume.pdf"
            download="Harsh_Khamkar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            onMouseEnter={() => sounds.playHover()}
            className="flex items-center gap-1.5 border-2 border-[#ff6a1a] bg-[#ff6a1a] px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#16181c] transition-all hover:bg-transparent hover:text-[#ff6a1a] cursor-pointer shadow-[0_0_12px_rgba(255,106,26,0.25)]"
          >
            <Download size={13} />
            <span>RESUME</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          className="flex h-8 w-8 items-center justify-center border border-[#ece5d5]/25 p-1.5 text-[#ece5d5] lg:hidden cursor-pointer"
          onClick={() => {
            sounds.playClick();
            setMobileOpen(!mobileOpen);
          }}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-[#ece5d5]/15 bg-[#12141a]/98 px-6 py-4 lg:hidden shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex flex-col divide-y divide-white/5">
              {stationStops.map((st) => {
                const isCurrent = activeStation === st.id;

                return (
                  <a
                    key={st.id}
                    href={`#${st.id}`}
                    onClick={(e) => handleAnchor(e, st.id)}
                    className={`flex items-center justify-between py-2.5 font-mono text-xs tracking-wider transition-colors ${
                      isCurrent
                        ? "text-[#ff6a1a] font-bold"
                        : "text-[#ece5d5]/80 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={isCurrent ? "text-[#ffd23a] font-bold" : "text-white/40"}>
                        {st.no}
                      </span>
                      <span>{st.name}</span>
                    </span>
                    <span className="text-[10px] text-[#ece5d5]/40">{st.label}</span>
                  </a>
                );
              })}
            </div>

            <div className="mt-4 flex gap-3 pt-3 border-t border-white/10">
              <a
                href="/resume.pdf"
                download="Harsh_Khamkar_Resume.pdf"
                className="flex-1 flex items-center justify-center gap-2 border border-[#ff6a1a] bg-[#ff6a1a] py-2 text-center font-mono text-xs font-bold uppercase text-[#16181c]"
              >
                <Download size={13} /> Download Resume
              </a>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onCommandOpen();
                }}
                className="flex items-center justify-center gap-1.5 border border-[#ece5d5]/20 bg-[#1e2026] px-3 py-2 font-mono text-xs text-[#ece5d5]"
              >
                <Terminal size={13} className="text-[#9dfc3f]" />
                <span>CMD</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
