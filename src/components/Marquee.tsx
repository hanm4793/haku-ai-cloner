"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { clamp, subscribeScroll, viewportProgress } from "@/lib/scrollTicker";

interface MarqueeProps {
  children: ReactNode;
  /** base drift direction */
  direction?: "left" | "right";
  /** larger = slower auto drift. Matches the site's data-marquee-speed (15). */
  speedDivisor?: number;
  /** extra horizontal shift (in vw) applied across the section's scroll transit.
   *  Matches data-marquee-scroll-speed (10). */
  scrollVw?: number;
  className?: string;
}

/**
 * Port of the site's `data-marquee-scroll` behaviour:
 *  - continuous auto drift at viewport/speedDivisor px per second, and
 *  - a scroll-scrubbed offset of ±scrollVw as the row transits the viewport
 *    (reverses when you scroll back up).
 * Content group is rendered twice and the offset wraps seamlessly.
 */
export function Marquee({
  children,
  direction = "left",
  speedDivisor = 15,
  scrollVw = 10,
  className = "",
}: MarqueeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dir = direction === "right" ? 1 : -1;
    let autoX = 0;
    let unit = track.scrollWidth / 2 || 1;

    const measure = () => {
      unit = track.scrollWidth / 2 || 1;
    };
    measure();
    window.addEventListener("resize", measure);

    const step = ({ dt }: { dt: number }) => {
      if (prefersReduced) return;
      const vw = window.innerWidth;
      // continuous auto drift (px/s = vw / divisor)
      autoX += dir * (vw / speedDivisor) * dt;
      // scroll-scrubbed offset: right rows -scrollVw→+scrollVw, left rows reversed
      const p = viewportProgress(wrap.getBoundingClientRect());
      const scrubPx = (vw * scrollVw) / 100;
      const scrubX = dir * (p - 0.5) * 2 * scrubPx;
      // combine + seamless wrap into (-unit, 0]
      let x = autoX + scrubX;
      x = ((x % unit) - unit) % unit;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    };

    const unsub = subscribeScroll(step, /* keepAlive */ true);
    return () => {
      unsub();
      window.removeEventListener("resize", measure);
    };
  }, [direction, speedDivisor, scrollVw]);

  return (
    <div ref={wrapRef} className="zeit-noscroll w-full overflow-hidden">
      <div ref={trackRef} className={`flex w-max flex-nowrap ${className}`}>
        <div className="flex flex-nowrap items-center">{children}</div>
        <div className="flex flex-nowrap items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
