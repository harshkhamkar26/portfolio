"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/data/site";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#lab", label: "Lab" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Navbar({ onCommandOpen }: { onCommandOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMobileOpen(false);

  return (
    <header className={cn("fixed top-0 z-50 w-full transition-all duration-500", scrolled ? "border-b border-white/10 bg-[#09090d]/85 py-3 backdrop-blur-2xl" : "bg-transparent py-5")}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6" aria-label="Main navigation">
        <Link href="/" className="group flex items-center gap-2" onClick={closeMenu}>
          <span className="flex h-9 w-9 items-center justify-center border border-[#c7ff3d]/50 bg-[#c7ff3d] text-sm font-black text-[#101015] shadow-[0_0_24px_rgba(199,255,61,.16)]">HK</span>
          <span className="hidden font-semibold tracking-wide text-white sm:block">{siteConfig.name.split(" ")[0]}<span className="text-[#c7ff3d]">.</span></span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => <a key={link.href} href={link.href} className="text-xs uppercase tracking-[.13em] text-white/55 transition-colors hover:text-[#c7ff3d]">{link.label}</a>)}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button onClick={onCommandOpen} className="border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/55 transition hover:border-[#c7ff3d]/50 hover:text-[#c7ff3d]" aria-label="Open command palette"><kbd className="font-mono">⌘K</kbd></button>
          <Button variant="glass" size="sm" asChild><Link href="/resume">Resume &amp; ATS <span aria-hidden="true">↗</span></Link></Button>
        </div>

        <button className="border border-white/15 p-2 text-white md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileOpen}>
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {mobileOpen && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="border-b border-white/10 bg-[#09090d]/98 px-6 py-4 backdrop-blur-2xl md:hidden">
        {navLinks.map((link) => <a key={link.href} href={link.href} className="block border-b border-white/5 py-3 text-sm text-white/75 hover:text-[#c7ff3d]" onClick={closeMenu}>{link.label}</a>)}
        <Link href="/resume" className="mt-3 inline-block py-3 text-sm font-semibold text-[#c7ff3d]" onClick={closeMenu}>Resume &amp; ATS ↗</Link>
      </motion.div>}
    </header>
  );
}
