"use client";

import { useEffect, useRef } from "react";
import { subscribeScroll, viewportProgress } from "@/lib/scrollTicker";
import { STATS } from "@/lib/data";

export function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    const apply = () => {
      const rect = section.getBoundingClientRect();
      const p = viewportProgress(rect); // 0→1 across viewport
      // move background between +12% and -12% of the overscan — classic parallax
      const shift = (p - 0.5) * 24;
      bg.style.transform = `translate3d(0, ${shift}%, 0) scale(1.25)`;
    };

    const unsub = subscribeScroll(apply);
    apply();
    return unsub;
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative mt-16 flex min-h-[70vh] w-full items-center overflow-hidden rounded-2xl"
    >
      {/* Parallax background */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <img
          src="/images/parallax.avif"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Stats */}
      <div className="zeit-container relative z-10 w-full">
        <div className="grid gap-12 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center sm:text-left">
              <div className="zeit-display text-[clamp(3.5rem,7vw,7rem)] font-medium tracking-[-0.03em] text-white">
                {stat.value}
              </div>
              <p className="mx-auto mt-4 max-w-[16rem] text-sm leading-relaxed text-white/70 sm:mx-0">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
