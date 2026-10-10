"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-11-08T10:00:00-03:00").getTime();

function pad(value: number) {
  return value < 10 ? `0${value}` : String(value);
}

export function EventCountdown() {
  const [parts, setParts] = useState({ days: "--", hours: "--", mins: "--", secs: "--" });

  useEffect(() => {
    function tick() {
      const diff = TARGET - Date.now();
      if (diff <= 0) {
        setParts({ days: "00", hours: "00", mins: "00", secs: "00" });
        return;
      }
      setParts({
        days: pad(Math.floor(diff / 86400000)),
        hours: pad(Math.floor((diff % 86400000) / 3600000)),
        mins: pad(Math.floor((diff % 3600000) / 60000)),
        secs: pad(Math.floor((diff % 60000) / 1000)),
      });
    }
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const units = [
    [parts.days, "días"],
    [parts.hours, "hs"],
    [parts.mins, "min"],
    [parts.secs, "seg"],
  ] as const;

  return (
    <div className="flex shrink-0 items-center gap-0.5 min-[921px]:gap-1.5" aria-label="Cuenta regresiva hasta Ogham Playa Grande">
      {units.map(([value, label], index) => (
        <div key={label} className="flex items-center gap-0.5 min-[921px]:gap-1.5">
          {index > 0 ? <span className="mb-2 text-[10px] text-white/40 min-[921px]:text-[16px]">:</span> : null}
          <span className="flex flex-col items-center leading-none">
            <span className="min-w-4 text-center text-[10px] font-bold tracking-[0.02em] text-white min-[921px]:min-w-8 min-[921px]:text-[22px] min-[921px]:tracking-[0.04em]">
              {value}
            </span>
            <span className="mt-0.5 text-[7px] font-semibold tracking-[0.08em] text-white/60 uppercase min-[921px]:text-[9px] min-[921px]:tracking-[0.16em]">
              {label}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
