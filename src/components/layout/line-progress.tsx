"use client";

import { useEffect, useState } from "react";
import { stationStops } from "@/lib/data/site";
import { sounds } from "@/components/layout/sound-manager";

export function LineProgress() {
  const [activeStation, setActiveStation] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      
      for (let i = stationStops.length - 1; i >= 0; i--) {
        const station = stationStops[i];
        const el = document.getElementById(station.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveStation(station.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    sounds.playClick();
    const el = document.getElementById(id);
    if (el) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement, opts?: { offset?: number }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -60 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="lineprog" aria-label="Railway station progress">
      <div className="lineprog__track" />
      {stationStops.map((st) => {
        const isCurrent = activeStation === st.id;
        return (
          <a
            key={st.id}
            href={`#${st.id}`}
            aria-current={isCurrent ? "true" : "false"}
            onClick={(e) => handleClick(e, st.id)}
            onMouseEnter={() => sounds.playHover()}
            title={st.label}
          >
            <span className="hidden opacity-0 transition-opacity duration-200 group-hover:opacity-100 lg:inline-block">
              {st.no} · {st.name}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
