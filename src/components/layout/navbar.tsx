"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X, Download, Terminal, Volume2, VolumeX } from "lucide-react";
import { stationStops } from "@/lib/data/site";
import { sounds } from "@/components/layout/sound-manager";

export function Navbar({ onCommandOpen }: { onCommandOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMobileOpen(false);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    sounds.playClick();
    const target = document.querySelector(href) as HTMLElement | null;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: { offset?: number }) => void } }).__lenis;
    if (lenis && target) {
      lenis.scrollTo(target, { offset: -60 });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
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
          ? "border-b border-[#ece5d5]/15 bg-[#16181c]/90 py-2.5 backdrop-blur-xl shadow-2xl"
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
          className="group flex items-center gap-3"
          onClick={() => {
            sounds.playClick();
            closeMenu();
          }}
          onMouseEnter={() => sounds.playHover()}
        >
          <div className="relative flex h-9 w-9 shrink-0 overflow-hidden border-2 border-[#ff6a1a] bg-[#16181c] shadow-[0_0_12px_rgba(255,106,26,0.25)] transition-all group-hover:border-[#9dfc3f]">
            <Image
              src="/images/harsh-khamkar.jpg"
              alt="Harsh Khamkar"
              fill
              sizes="36px"
              className="object-cover object-top"
              priority
            />
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#9dfc3f] animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#9dfc3f]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm font-black uppercase tracking-tight text-[#ece5d5]">
              HARSH KHAMKAR
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#ff6a1a]">
              DATA SCIENCE ENG
            </span>
          </div>
        </Link>

        {/* Desktop Stations Navigation */}
        <div className="hidden items-center gap-1 xl:gap-2 md:flex">
          {stationStops.slice(0, 6).map((st) => (
            <a
              key={st.id}
              href={`#${st.id}`}
              onClick={(e) => handleAnchor(e, `#${st.id}`)}
              onMouseEnter={() => sounds.playHover()}
              className="group flex items-center gap-1.5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#ece5d5]/65 transition-colors hover:text-[#ece5d5]"
            >
              <span className="text-[#ff6a1a]/80 transition group-hover:text-[#ff6a1a]">
                {st.no}
              </span>
              <span className="group-hover:text-[#ece5d5]">{st.name}</span>
            </a>
          ))}
          <a
            href="#terminal"
            onClick={(e) => handleAnchor(e, "#terminal")}
            onMouseEnter={() => sounds.playHover()}
            className="px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#ece5d5]/65 transition hover:text-[#9dfc3f]"
          >
            08 · COMMS
          </a>
        </div>

        {/* Action Controls */}
        <div className="hidden items-center gap-2.5 sm:flex">
          {/* Audio toggle button */}
          <button
            onClick={toggleSound}
            className="flex h-8 w-8 items-center justify-center border border-[#ece5d5]/20 bg-[#1e2026]/80 text-[#ece5d5]/70 transition hover:border-[#ff6a1a] hover:text-[#ff6a1a]"
            aria-label="Toggle UI Audio"
            title="Audio feedback"
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} className="opacity-50" />}
          </button>

          {/* Terminal / Search Command Palette */}
          <button
            onClick={() => {
              sounds.playClick();
              onCommandOpen();
            }}
            onMouseEnter={() => sounds.playHover()}
            className="flex items-center gap-1.5 border border-[#ece5d5]/20 bg-[#1e2026]/80 px-2.5 py-1.5 font-mono text-[11px] text-[#ece5d5]/80 transition hover:border-[#9dfc3f] hover:text-[#9dfc3f]"
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
            className="flex items-center gap-2 border-2 border-[#ff6a1a] bg-[#ff6a1a] px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#16181c] transition-all hover:bg-transparent hover:text-[#ff6a1a]"
          >
            <Download size={13} />
            <span>RESUME</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          className="flex h-9 w-9 items-center justify-center border border-[#ece5d5]/25 p-2 text-[#ece5d5] md:hidden"
          onClick={() => {
            sounds.playClick();
            setMobileOpen(!mobileOpen);
          }}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-[#ece5d5]/15 bg-[#16181c] px-6 py-5 md:hidden"
        >
          <div className="flex flex-col divide-y divide-white/5">
            {stationStops.map((st) => (
              <a
                key={st.id}
                href={`#${st.id}`}
                onClick={(e) => handleAnchor(e, `#${st.id}`)}
                className="flex items-center justify-between py-2.5 font-mono text-xs tracking-wider text-[#ece5d5]/80 hover:text-[#ff6a1a]"
              >
                <span>{st.no} · {st.name}</span>
                <span className="text-[10px] text-[#ece5d5]/40">{st.label}</span>
              </a>
            ))}
          </div>

          <div className="mt-4 flex gap-3 pt-3 border-t border-white/10">
            <a
              href="/resume.pdf"
              download="Harsh_Khamkar_Resume.pdf"
              className="flex-1 flex items-center justify-center gap-2 border border-[#ff6a1a] bg-[#ff6a1a] py-2 text-center font-mono text-xs font-bold uppercase text-[#16181c]"
            >
              <Download size={14} /> Download Resume
            </a>
            <button
              onClick={() => {
                setMobileOpen(false);
                onCommandOpen();
              }}
              className="flex items-center justify-center gap-1.5 border border-[#ece5d5]/20 bg-[#1e2026] px-3 py-2 font-mono text-xs text-[#ece5d5]"
            >
              <Terminal size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
