"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/lib/data";
import { clamp } from "@/lib/scrollTicker";

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const CTA_TEXT = "Chất riêng trải nghiệm";
// Deterministic pseudo-random jitter per letter (no Math.random — must match
// between server render and client hydration).
const LETTER_JITTER = CTA_TEXT.split("").map((_, i) => ({
  x: ((i * 47) % 33) - 16,
  y: ((i * 71) % 43) - 21,
  r: ((i * 29) % 37) - 18,
}));

/** "Let's make ART." + orange 3D A + blue info block with the big wordmark.
 *
 *  Conveyor ending (à la digitalists.at): "not, done, yet ⟶" and the orange A
 *  are a single rigid group — their spacing never changes. That group sits at
 *  its resting spot beside "Let's make ART." by default, with "Chất riêng
 *  trải nghiệm" queued off-screen right behind it in the same row. Once the
 *  page is scrolled all the way down, further downward wheel/touch input
 *  (nothing to natively scroll into) is captured as a one-way conveyor belt:
 *  the whole row slides left, pulling the CTA text into view while the
 *  note+A group slides past the left edge and clips out of view behind
 *  "Let's make ART." (an overflow-hidden viewport, not a z-index stack).
 *  Progress only ever increases — scrolling up never rewinds it, it just lets
 *  the page scroll normally. A short rAF lerp smooths out discrete wheel
 *  ticks into one continuous glide.
 */
export function Footer() {
  const artRef = useRef<HTMLParagraphElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);
  const noteGroupRef = useRef<HTMLDivElement>(null);
  const ctaGroupRef = useRef<HTMLParagraphElement>(null);
  const starRef = useRef<HTMLImageElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return; // initial layout is already the design state

    // startX rests the note+A group flush against the viewport's right edge;
    // endX lands the CTA text's *right* edge (its end, not its start) flush
    // against that same right edge — the belt stops the instant the tail of
    // the content reaches the margin, so it never overshoots into blank
    // space past it.
    let startX = 0;
    let endX = 0;
    let viewportLeftPage = 0; // viewport's left edge, in page coords
    let artRightNatural = 0; // "Let's make ART."'s unshifted right edge, in page coords
    const measure = () => {
      const viewportRect = viewportRef.current?.getBoundingClientRect();
      const viewportWidth = viewportRef.current?.clientWidth ?? 0;
      const noteWidth = noteGroupRef.current?.offsetWidth ?? 0;
      const ctaOffset = ctaGroupRef.current?.offsetLeft ?? 0;
      // ctaGroupRef.offsetWidth undercounts here: the <p> is a flex item
      // with white-space:nowrap and a trailing inline <img> (the star) —
      // that combination overflows the flex item's own content-box in a way
      // offsetWidth doesn't reflect. Measure the star's true right edge
      // directly instead (the delta from the <p>'s left edge is
      // transform-invariant, so this is safe even mid-glide).
      let ctaWidth = ctaGroupRef.current?.offsetWidth ?? 0;
      if (starRef.current && ctaGroupRef.current) {
        const pLeft = ctaGroupRef.current.getBoundingClientRect().left;
        const starRight = starRef.current.getBoundingClientRect().right;
        ctaWidth = starRight - pLeft;
      }
      startX = viewportWidth - noteWidth;
      endX = viewportWidth - (ctaOffset + ctaWidth);
      viewportLeftPage = (viewportRect?.left ?? 0) + window.scrollX;
      // artRef may already be shifted from a previous frame — undo that
      // before reading its natural right edge so repeated measures stay correct.
      if (artRef.current) {
        const prevTransform = artRef.current.style.transform;
        artRef.current.style.transform = "none";
        artRightNatural = artRef.current.getBoundingClientRect().right + window.scrollX;
        artRef.current.style.transform = prevTransform;
      }
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    document.fonts?.ready?.then(measure).catch(() => {});
    // the trailing star image reserves its box via width/height immediately,
    // but re-measure once it actually decodes just in case — a stale
    // pre-load ctaWidth would leave the settled position short by the
    // star's width, clipping it at the viewport edge.
    const starEl = starRef.current;
    if (starEl) {
      if (starEl.complete) measure();
      else starEl.addEventListener("load", measure);
    }

    let vTarget = 0; // raw progress, monotonically increasing 0..1
    let vShown = 0; // eased/smoothed progress actually rendered

    const render = (v: number) => {
      // Single shared progress drives both the belt's slide and the
      // letters' unscramble in lockstep — matching the reference site,
      // where both are tied to the same scroll-linked value rather than
      // staged as slide-then-settle.
      const e = easeOut(v);
      const beltX = startX + (endX - startX) * e;
      if (trainRef.current) {
        trainRef.current.style.transform = `translateX(${beltX}px)`;
      }
      const ART_GAP = 56; // minimum breathing room to keep between the two groups
      if (artRef.current) {
        const noteLeftPage = viewportLeftPage + beltX;
        const overlap = artRightNatural + ART_GAP - noteLeftPage;
        artRef.current.style.transform = overlap > 0 ? `translateX(${-overlap}px)` : "none";
      }
      // Letters ride in scattered (random rotate/offset) and straighten out
      // in the same rhythm as the belt, each with a small sequential stagger
      // so they settle in a gentle wave rather than snapping in unison.
      letterRefs.current.forEach((el, i) => {
        if (!el) return;
        const t = clamp(v - i * 0.006);
        const k = 1 - easeOut(t);
        const j = LETTER_JITTER[i];
        el.style.transform = `translate(${j.x * k}px, ${j.y * k}px) rotate(${j.r * k}deg)`;
      });
    };

    const atBottom = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return window.scrollY >= max - 2;
    };

    // capture extra downward scroll input while the page is already at its
    // end — upward input is ignored entirely so it never rewinds, the page
    // just scrolls normally.
    const push = (dy: number) => {
      if (dy <= 0 || !atBottom()) return;
      vTarget = clamp(vTarget + dy / 5200);
    };

    const onWheel = (e: WheelEvent) => push(e.deltaY);

    let lastTouchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY;
      push((lastTouchY - y) * 2);
      lastTouchY = y;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    // continuous smoothing loop — lerps the shown progress toward the raw
    // (wheel-driven) target every frame, turning discrete ticks into one
    // buttery glide instead of stepping in jumps.
    let rafId = 0;
    const loop = () => {
      vShown += (vTarget - vShown) * 0.12;
      if (Math.abs(vTarget - vShown) < 0.0004) vShown = vTarget;
      render(vShown);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      starEl?.removeEventListener("load", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <footer className="relative mt-10 mb-[clamp(1.25rem,2.4vw,2.875rem)]">
      {/* pointer-events-none: the negative top margin below makes this box's
          own (visually empty) area overlap whatever sits right above the
          footer in the page — without this it silently eats hover/click on
          that content. Children re-enable pointer-events themselves. */}
      <div
        className="pointer-events-none overflow-hidden"
        style={{ paddingTop: 220, marginTop: -220 }}
      >
        {/* Let's make ART row */}
        <div className="pointer-events-auto aa-container relative flex items-end justify-between gap-6 pb-0">
          <p
            ref={artRef}
            className="shrink-0 pb-8 text-[clamp(2rem,3.83vw,4.5rem)] font-medium leading-none text-white will-change-transform"
          >
            Let&rsquo;s make ART.
          </p>
          {/* Sizing-only box — clientWidth here is the true visible content
              width the belt math is based on. The actual clip (and its
              padding trick) lives one layer deeper so it doesn't distort
              that measurement. */}
          <div ref={viewportRef} className="relative hidden min-w-0 flex-1 pb-8 sm:block">
            {/* "Let's make ART." now physically yields space to note+A (see
                the collision push in the effect above), so note+A never need
                to hide behind it — only the *right* side still clips, to keep
                the not-yet-revealed CTA text hidden until the belt brings it
                in. Generous padding elsewhere (cancelled by matching negative
                margins) keeps the pop-out A image and jittered letters near
                every other edge from ever being clipped mid-shape. */}
            <div
              className="pointer-events-none overflow-hidden"
              style={{
                paddingTop: 220,
                marginTop: -220,
                paddingRight: 80,
                marginRight: -80,
                paddingLeft: 600,
                marginLeft: -600,
                paddingBottom: 40,
                marginBottom: -40,
              }}
            >
              <div ref={trainRef} className="flex items-end will-change-transform">
              {/* Rigid group: "not, done, yet" + arrow + orange A, fixed spacing */}
              <div ref={noteGroupRef} className="relative flex shrink-0 items-center gap-3">
                <span className="text-3xl text-white/70" style={{ fontFamily: "var(--font-caveat)" }}>
                  not done, yet
                </span>
                <Image
                  src="/images/home-image/home-arrow.webp"
                  alt=""
                  width={253}
                  height={157}
                  aria-hidden
                  className="aa-arrow-doodle h-6 w-14 object-contain"
                />
                {/* Exact-width spacer reserving A's footprint in normal flow,
                    so the gap-3 above is the only spacing — no eyeballed
                    padding guess. */}
                <div className="w-[150px] shrink-0 lg:w-[180px]" aria-hidden />
                <div className="pointer-events-none absolute bottom-[-60px] right-0 z-10">
                  <Image
                    src="/images/letter-a-orange.webp"
                    alt=""
                    width={190}
                    height={215}
                    className="w-[150px] lg:w-[180px]"
                    aria-hidden
                  />
                </div>
              </div>
              {/* Queued immediately after the note+A group — off-screen only
                  by this small gap, so it starts sliding into view on the
                  very first scroll tick rather than after a dead run-up.
                  Letters ride in scattered and straighten as it settles.
                  TODO: an image goes here, to be swapped in later. */}
              <p
                ref={ctaGroupRef}
                className="ml-10 whitespace-nowrap text-[clamp(2rem,3.83vw,4.5rem)] font-medium leading-none text-white lg:ml-14"
              >
                {CTA_TEXT.split("").map((ch, i) => (
                  <span
                    key={i}
                    ref={(el) => {
                      letterRefs.current[i] = el;
                    }}
                    className="inline-block will-change-transform"
                    style={{
                      transform: `translate(${LETTER_JITTER[i].x}px, ${LETTER_JITTER[i].y}px) rotate(${LETTER_JITTER[i].r}deg)`,
                    }}
                  >
                    {ch === " " ? " " : ch}
                  </span>
                ))}
                <Image
                  ref={starRef}
                  src="/images/home-image/home-star.webp"
                  alt=""
                  width={231}
                  height={207}
                  aria-hidden
                  priority
                  className="ml-3 inline-block h-[0.85em] w-auto align-middle"
                />
              </p>
            </div>
            </div>
          </div>
        </div>

        {/* Blue block — inset within the grid margins, not full-bleed */}
        <div className="pointer-events-auto aa-container">
          <div className="bg-aa-blue">
            <div className="aa-container pt-12">
              <div className="grid gap-8 text-white sm:grid-cols-3">
                <div>
                  <p className="text-lg font-bold">Office</p>
                  <p className="mt-1 text-sm text-white/90">{CONTACT.office}</p>
                </div>
                <div className="sm:text-center">
                  <p className="text-lg font-bold">Hotline</p>
                  <p className="mt-1 text-sm text-white/90">{CONTACT.hotline}</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-lg font-bold">Email</p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="mt-1 inline-block text-sm text-white/90 transition-opacity hover:opacity-70"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Big wordmark row */}
            <div className="aa-container mt-14 flex flex-wrap items-end justify-between gap-10 pb-12">
              <div className="w-full max-w-[620px] lg:max-w-[56%]">
                <Image
                  src="/images/home-image/home-logo.webp"
                  alt="ànART®"
                  width={1920}
                  height={417}
                  className="h-auto w-full"
                />
              </div>
              <div className="hidden w-full max-w-[340px] md:block lg:max-w-[31%]">
                <Image
                  src="/images/wordmark-anat.webp"
                  alt="| àn Ạt |"
                  width={1728}
                  height={468}
                  className="h-auto w-full"
                />
              </div>
            </div>

            {/* Copyright bar */}
            <div className="border-t border-white/25">
              <div className="aa-container flex flex-wrap items-center justify-between gap-2 py-4 text-xs text-white">
                <p>© 2026 by ànArt. All Rights Reserved.</p>
                <p>
                  — eng / <Link href="/" className="font-bold">vie</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
