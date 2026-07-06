"use client";

/**
 * A single shared scroll ticker. Components subscribe and receive the current
 * scrollY plus an instantaneous velocity (px/frame) on every animation frame
 * while scrolling. One rAF loop for the whole page — cheaper than each effect
 * running its own. Velocity powers the marquee's scroll-reactive speed; scrollY
 * powers parallax / pin-progress effects.
 */

export interface ScrollState {
  scrollY: number;
  velocity: number; // px since last frame (signed: + = scrolling down)
  dt: number; // seconds since last frame (clamped)
}

type Sub = (s: ScrollState) => void;

const subs = new Set<Sub>();
let lastY = 0;
let velocity = 0;
let lastTime = 0;
let rafId = 0;
let running = false;
let idleFrames = 0;

function frame() {
  const y = window.scrollY;
  velocity = y - lastY;
  lastY = y;
  const now = performance.now();
  const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 1 / 60;
  lastTime = now;
  const state: ScrollState = { scrollY: y, velocity, dt };
  subs.forEach((fn) => fn(state));

  // Keep ticking a bit after motion stops so easing settles, then sleep.
  if (Math.abs(velocity) < 0.05) idleFrames++;
  else idleFrames = 0;

  if (subs.size > 0 && (idleFrames < 90 || anyForceRun)) {
    rafId = requestAnimationFrame(frame);
  } else {
    running = false;
  }
}

let anyForceRun = false;

function wake() {
  idleFrames = 0;
  if (!running && subs.size > 0) {
    running = true;
    lastY = window.scrollY;
    lastTime = performance.now();
    rafId = requestAnimationFrame(frame);
  }
}

/** Marquees animate continuously, so they keep the ticker awake. */
export function subscribeScroll(fn: Sub, keepAlive = false): () => void {
  subs.add(fn);
  if (keepAlive) anyForceRun = true;
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake, { passive: true });
    wake();
  }
  return () => {
    subs.delete(fn);
    if (keepAlive) anyForceRun = subs.size > 0 && anyForceRun;
    if (subs.size === 0) {
      cancelAnimationFrame(rafId);
      running = false;
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
    }
  };
}

/** clamp helper */
export const clamp = (v: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, v));

/**
 * Progress (0→1) of an element scrolling through the viewport.
 * 0 when the element's top hits the bottom of the viewport,
 * 1 when the element's bottom passes the top — configurable via margins.
 */
export function viewportProgress(rect: DOMRect, startAt = 0, endAt = 1): number {
  const vh = window.innerHeight;
  // distance travelled from entering (top at vh) to leaving (bottom at 0)
  const total = vh + rect.height;
  const travelled = vh - rect.top;
  const raw = travelled / total;
  return clamp((raw - startAt) / (endAt - startAt));
}
