"use client";

import { useEffect, useState } from "react";
import { useScroll, useSpring, useVelocity, useTransform, MotionValue } from "framer-motion";
import { stationStops } from "@/lib/data/site";

export interface StationData {
  id: string;
  no: string;
  name: string;
  label: string;
  index: number;
}

export interface TrainScrollState {
  scrollYProgress: MotionValue<number>;
  smoothProgress: MotionValue<number>;
  velocity: MotionValue<number>;
  speedFactor: MotionValue<number>;
  scrollPercent: number;
  currentStation: StationData;
  activeStationIndex: number;
  isDeparting: boolean;
  isCruising: boolean;
  isBraking: boolean;
  isTerminus: boolean;
}

/**
 * Custom scroll hook powering "The Portfolio Express"
 * Maps scroll throttle, smoothed physics, scroll velocity, and station tracking.
 */
export function useTrainScroll(): TrainScrollState {
  const { scrollYProgress } = useScroll();

  // Low-latency smoothed spring for high-refresh 60-120fps train motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.25,
    restDelta: 0.0001,
  });

  // Velocity tracker for speed streaks and steam particle tilt
  const rawVelocity = useVelocity(scrollYProgress);
  const velocity = useSpring(rawVelocity, {
    stiffness: 120,
    damping: 18,
  });

  // Normalized speed factor from 0 (stationary) to 1 (full throttle)
  const speedFactor = useTransform(velocity, [-0.004, 0, 0.004], [1, 0, 1]);

  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [activeStationIndex, setActiveStationIndex] = useState<number>(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleScrollUpdate = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(Math.max(scrollY / totalHeight, 0), 1) : 0;
      setScrollPercent(Math.round(progress * 100));

      // Check section element positions for pinpoint accuracy
      const probeY = scrollY + window.innerHeight * 0.38;
      let matchedIndex = 0;

      for (let i = stationStops.length - 1; i >= 0; i--) {
        const el = document.getElementById(stationStops[i].id);
        if (el && probeY >= el.offsetTop) {
          matchedIndex = i;
          break;
        }
      }

      // Edge case: if reached the bottom of page, force Station 08 (Terminus)
      if (progress >= 0.96) {
        matchedIndex = stationStops.length - 1;
      }

      setActiveStationIndex(matchedIndex);
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScrollUpdate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScrollUpdate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const currentStation: StationData = {
    ...stationStops[activeStationIndex],
    index: activeStationIndex,
  };

  // State phases based on scroll percentage
  const isDeparting = scrollPercent <= 10;
  const isCruising = scrollPercent > 10 && scrollPercent < 90;
  const isBraking = scrollPercent >= 90 && scrollPercent < 98;
  const isTerminus = scrollPercent >= 98;

  return {
    scrollYProgress,
    smoothProgress,
    velocity,
    speedFactor,
    scrollPercent,
    currentStation,
    activeStationIndex,
    isDeparting,
    isCruising,
    isBraking,
    isTerminus,
  };
}
