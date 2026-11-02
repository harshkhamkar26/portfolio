"use client";

import { StationData } from "./useTrainScroll";

interface StationToastProps {
  currentStation: StationData;
}

/**
 * StationToast is disabled to maintain clean, unobstructed viewport aesthetics
 * and prevent oversized notification overlays from competing with the navigation bar.
 */
export function StationToast({ currentStation }: StationToastProps) {
  return null;
}
