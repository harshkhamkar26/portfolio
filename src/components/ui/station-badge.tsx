"use client";

interface StationBadgeProps {
  stationNo: string;
  title: string;
  nextStationId?: string;
  nextStationName?: string;
  accentColor?: string;
  className?: string;
}

/**
 * Standard Sleek Station Waypoint Badge
 * Maintains normal compact dimensions and elegant neon-noir styling.
 */
export function StationBadge({
  stationNo,
  title,
  accentColor = "#9dfc3f",
  className = "",
}: StationBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 border px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.2em] select-none ${className}`}
      style={{
        borderColor: `${accentColor}50`,
        backgroundColor: `${accentColor}12`,
        color: accentColor,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: accentColor }}
      />
      <span>STATION {stationNo} // {title}</span>
    </div>
  );
}
