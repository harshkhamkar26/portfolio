"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/data/site";
import { sounds } from "@/components/layout/sound-manager";

export function HudDisplay() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? Math.round((window.scrollY / total) * 100) : 0;
      setScrollPercent(progress);
    };

    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " IST"
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggleSound = () => {
    const newState = sounds.toggle();
    setSoundOn(newState);
  };

  return (
    <aside className="hud" aria-label="System Heads Up Display">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-[#9dfc3f]">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#9dfc3f]" />
          SYS: OK
        </span>
        <span className="text-[#ece5d5]/40">|</span>
        <span className="text-[#ece5d5]/80">MUMBAI {siteConfig.coords}</span>
        <span className="text-[#ece5d5]/40">|</span>
        <span className="text-[#ffd23a]">{timeStr}</span>
        <span className="text-[#ece5d5]/40">|</span>
        <span className="text-[#ff6a1a]">SCR: {scrollPercent}%</span>
        <span className="text-[#ece5d5]/40">|</span>
        <button
          onClick={handleToggleSound}
          className="cursor-pointer text-[#3ad7ff] underline decoration-dotted underline-offset-2 transition hover:text-white"
          title="Toggle UI Audio feedback"
        >
          SND: {soundOn ? "ON" : "MUTED"}
        </button>
      </div>
    </aside>
  );
}
