"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scroll — mirrors the target site's @studio-freight/lenis setup.
 * Also drives scroll-reveal: any `.zeit-reveal` element whose top crosses the
 * reveal line gets `.is-in` (fade + slide up). Uses a scroll-position check
 * rather than IntersectionObserver edge-detection so fast scrolls never skip
 * an element.
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".zeit-reveal"));

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
    reveal(); // initial pass for above-the-fold elements

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
