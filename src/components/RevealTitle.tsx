"use client";

import { useEffect, useRef, useState, type ElementType } from "react";

interface RevealTitleProps {
  /** one entry per rendered line */
  lines: string[];
  as?: ElementType;
  /** classes for the wrapping heading (font size / weight / color live here) */
  className?: string;
  /** ms between each line's start */
  stagger?: number;
  /** ms before the first line starts */
  delay?: number;
  /** "load" plays after the intro loader (default); "inview" plays when the
   *  element is scrolled into view. */
  trigger?: "load" | "inview";
  /** IntersectionObserver rootMargin for trigger="inview" — a negative bottom
   *  margin delays the play until the element is well into the viewport. */
  rootMargin?: string;
}

const DURATION_MS = 850;

/**
 * caay.co-style title entrance: each line sits inside an overflow-hidden mask
 * and slides up into view (translateY 110% → 0), staggered line by line. Once
 * settled the mask switches to visible so Vietnamese diacritics aren't clipped
 * at rest. Trigger on hard load (waits for the intro loader) or when scrolled
 * into view.
 */
export function RevealTitle({
  lines,
  as: Tag = "h1",
  className = "",
  stagger = 90,
  delay = 0,
  trigger = "load",
  rootMargin = "0px 0px -32% 0px",
}: RevealTitleProps) {
  const [shown, setShown] = useState(false);
  const [settled, setSettled] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      setSettled(true);
      return;
    }

    let settleTimer = 0;
    const play = () => {
      setShown(true);
      const total = delay + lines.length * stagger + DURATION_MS + 60;
      settleTimer = window.setTimeout(() => setSettled(true), total);
    };

    // Scroll-triggered: play once the element crosses into view.
    if (trigger === "inview") {
      const el = ref.current;
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            io.disconnect();
            play();
          }
        },
        { rootMargin, threshold: 0.01 },
      );
      io.observe(el);
      return () => {
        io.disconnect();
        window.clearTimeout(settleTimer);
      };
    }

    // Load-triggered: while the intro loader covers the screen it locks body
    // scroll; wait for it so the reveal isn't wasted behind the overlay.
    const loaderActive = document.body.style.overflow === "hidden";
    if (loaderActive) {
      let fallback = 0;
      const onDone = () => {
        window.removeEventListener("pageloader:done", onDone);
        window.clearTimeout(fallback);
        play();
      };
      window.addEventListener("pageloader:done", onDone);
      fallback = window.setTimeout(onDone, 6000);
      return () => {
        window.removeEventListener("pageloader:done", onDone);
        window.clearTimeout(fallback);
        window.clearTimeout(settleTimer);
      };
    }

    const t = window.setTimeout(play, 60);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(settleTimer);
    };
  }, [lines.length, stagger, delay, trigger, rootMargin]);

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className={`block ${settled ? "overflow-visible" : "overflow-hidden"}`}
        >
          <span
            className="block will-change-transform"
            style={{
              transform: shown ? "translateY(0)" : "translateY(110%)",
              transition: `transform ${DURATION_MS}ms cubic-bezier(0.625,0.05,0,1) ${
                delay + i * stagger
              }ms`,
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
