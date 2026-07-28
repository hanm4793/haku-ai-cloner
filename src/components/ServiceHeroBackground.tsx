"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/** Parallax hero photo for /dich-vu — same technique as the homepage's
 *  HeroBackground, scaled to this hero's own (much shorter, non-fullscreen)
 *  box instead of the viewport. The layer is 125% of the box height and
 *  anchored to the bottom, so at scroll 0 its top sits hidden above the
 *  frame; scrolling translates it DOWN at 0.25× the rate — slower than the
 *  page, for depth — capped once the frame has scrolled a full box-height so
 *  the top edge never reveals a gap. The overlay text (Concept / Design /
 *  Production, the "Dịch vụ" title) lives outside this component entirely,
 *  so it never moves. */
export function ServiceHeroBackground({ src, alt }: { src: string; alt: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const layer = layerRef.current;
    if (!wrap || !layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const FACTOR = 0.25;
    const update = () => {
      const h = wrap.offsetHeight;
      const y = Math.min(Math.max(window.scrollY, 0), h);
      layer.style.transform = `translate3d(0, ${y * FACTOR}px, 0)`;
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
    <div ref={wrapRef} className="relative aspect-[1920/1089] w-full overflow-hidden">
      <div
        ref={layerRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[125%] will-change-transform"
      >
        <Image src={src} alt={alt} fill priority className="object-cover" sizes="100vw" />
      </div>
    </div>
  );
}
