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

      // If at bottom of page, force last station
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
    setActiveStation(id); // Immediate visual response on tab click

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
          ? "border-b border-white/10 bg-[#16181c]/95 py-2.5 backdrop-blur-xl shadow-2xl"
          : "bg-transparent py-4"
      }`}
    >
      <nav
        className="mx-auto flex max-w-[1600px] items-center justify-between px-4 sm:px-8"
        aria-label="Main navigation"
      >
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 shrink-0"
          onClick={() => {
            sounds.playClick();
            closeMenu();
          }}
          onMouseEnter={() => sounds.playHover()}
        >
          <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 overflow-hidden border-2 border-[#ff6a1a] bg-[#16181c] shadow-[0_0_12px_rgba(255,106,26,0.25)] transition-all group-hover:border-[#9dfc3f]">
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
            <span className="font-display text-xs sm:text-sm font-black uppercase tracking-tight text-[#ece5d5]">
              HARSH KHAMKAR
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-[#ff6a1a]">
              DATA SCIENCE ENG
            </span>
          </div>
        </Link>

        {/* ─────────────────────────────────────────────────────────────
            SLEEK DESKTOP STATION TABS (All 8 Stations · Back to Normal Sizing)
            Live active tab updates with clean accent underline & audio
            ───────────────────────────────────────────────────────────── */}
        <div className="hidden items-center gap-1 xl:gap-2 lg:flex">
          {stationStops.map((st) => {
            const isCurrent = activeStation === st.id;

            return (
              <a
                key={st.id}
                href={`#${st.id}`}
                onClick={(e) => handleAnchor(e, st.id)}
                onMouseEnter={() => sounds.playHover()}
                className={`group relative flex items-center gap-1.5 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors duration-150 ${
                  isCurrent
                    ? "text-white font-bold"
                    : "text-[#ece5d5]/60 hover:text-white"
                }`}
              >
                <span
                  className={`transition-colors ${
                    isCurrent
                      ? "text-[#ff6a1a] font-bold"
                      : "text-[#ff6a1a]/70 group-hover:text-[#ff6a1a]"
                  }`}
                >
                  {st.no}
                </span>

                <span className="relative pb-0.5">
                  {st.name}
                  {/* Clean, subtle active tab underline */}
                  {isCurrent && (
                    <motion.span
                      layoutId="activeStationTabUnderline"
                      className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#ff6a1a]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </span>
              </a>
            );
          })}
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
            className="flex items-center gap-1.5 border-2 border-[#ff6a1a] bg-[#ff6a1a] px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#16181c] transition-all hover:bg-transparent hover:text-[#ff6a1a] cursor-pointer"
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
            className="overflow-hidden border-b border-[#ece5d5]/15 bg-[#16181c] px-6 py-4 lg:hidden shadow-2xl"
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
                      <span className={isCurrent ? "text-[#ff6a1a]" : "text-white/40"}>
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
