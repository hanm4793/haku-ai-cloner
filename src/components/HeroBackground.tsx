"use client";

import { useEffect, useRef } from "react";

/** Parallax hero background. The video layer is 130% of the section height and
 *  anchored to the bottom, so at scroll 0 its top sits 30vh above the section
 *  (hidden by overflow-hidden). As the page scrolls down it is translated DOWN
 *  at 0.3× the scroll rate — moving slower than the page content for a depth
 *  effect — capped at the 30vh buffer so the top edge never reveals a gap. */
export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const FACTOR = 0.3;
    const update = () => {
      const h = window.innerHeight;
      const y = Math.min(Math.max(window.scrollY, 0), h);
      el.style.transform = `translate3d(0, ${y * FACTOR}px, 0)`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[130%] will-change-transform"
    >
      <video
        src="/videos/hero_banner_video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
      />
    </div>
  );
}
