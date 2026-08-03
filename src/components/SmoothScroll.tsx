"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scroll — mirrors the target site's @studio-freight/lenis setup.
 * Also drives scroll-reveal: any `.aa-reveal` element whose top crosses the
 * reveal line gets `.is-in` (fade + slide up). Uses a scroll-position check
 * rather than IntersectionObserver edge-detection so fast scrolls never skip
 * an element.
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".aa-reveal"));

    if (prefersReduced) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    let lenis: Lenis | undefined;
    let rafId = 0;
    let ticking = false;

    const reveal = () => {
      ticking = false;
      const line = window.innerHeight * 0.88;
      for (let i = els.length - 1; i >= 0; i--) {
        const el = els[i];
        if (el.getBoundingClientRect().top < line) {
          el.classList.add("is-in");
          els.splice(i, 1);
        }
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(reveal);
      }
    };

    try {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenis.on("scroll", onScroll);
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    } catch {
      // Lenis failed — fall back to native scroll only.
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Above-the-fold elements (Hero) would otherwise reveal instantly on
    // mount, hidden behind PageLoader — hold the initial pass until it's
    // done so the entrance actually plays once the loader is gone. Fall
    // back to a timer in case the loader never fires (e.g. it errored).
    // PageLoader's own cascade (letters → tagline → badge, then a hold +
    // fade) runs ~4.4-4.9s end to end — this fallback must stay comfortably
    // longer than that, or it fires first every time and "pageloader:done"
    // never actually gets to do its job.
    let initialRevealTimer = 0;
    const runInitialReveal = () => {
      window.clearTimeout(initialRevealTimer);
      window.removeEventListener("pageloader:done", runInitialReveal);
      reveal();
    };
    window.addEventListener("pageloader:done", runInitialReveal);
    initialRevealTimer = window.setTimeout(runInitialReveal, 6500);

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pageloader:done", runInitialReveal);
      window.clearTimeout(initialRevealTimer);
    };
  }, []);

  return null;
}
