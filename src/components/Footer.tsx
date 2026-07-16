"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/lib/data";
import { clamp, subscribeScroll } from "@/lib/scrollTicker";

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** "Let's make ART." + orange 3D A + blue info block with the big wordmark.
 *
 *  Virtual overscroll ending: the footer sits naturally at the page bottom in
 *  its standard layout — orange A next to "not, done, yet ⟶" (nothing above
 *  ever moves). Once the page is scrolled all the way down, further
 *  wheel/touch input is captured as a virtual progress: the A slides right →
 *  left into its design spot, dragging in a new line ("Contact us for more
 *  information. Let's make art together") while "not, done, yet" fades away.
 *  Scrolling back rewinds it.
 */
export function Footer() {
  const aRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return; // initial layout is already the design state

    let v = 0; // virtual overscroll progress 0..1

    const render = () => {
      const e = easeOut(v);
      // A slides right -> left into the design spot beside "Let's make ART."
      if (aRef.current) {
        aRef.current.style.transform = `translateX(${-e * 24}vw)`;
      }
      // "not, done, yet" fades away as the A departs
      if (noteRef.current) {
        const t = clamp(v / 0.35);
        noteRef.current.style.opacity = String(1 - t);
        noteRef.current.style.transform = `translateX(${-easeOut(t) * 60}px)`;
      }
      // new line dragged in from the right behind the A
      if (ctaRef.current) {
        const t = clamp((v - 0.25) / 0.55);
        ctaRef.current.style.opacity = String(t);
        ctaRef.current.style.transform = `translateX(${(1 - easeOut(t)) * 34}vw)`;
      }
    };

    const atBottom = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return window.scrollY >= max - 2;
    };

    // capture extra scroll input while the page is already at its end
    const push = (dy: number) => {
      if (!atBottom()) return;
      // forward fills slower, rewind empties faster
      v = clamp(v + dy / (dy > 0 ? 1100 : 500));
      render();
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

    // decay the effect back to the start whenever the user scrolls away
    const unsub = subscribeScroll(() => {
      if (!atBottom() && v > 0) {
        v = Math.max(0, v - 0.08);
        render();
      }
    });

    render();
    return () => {
      unsub();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <footer className="relative mt-10">
      <div className="overflow-hidden">
        {/* Let's make ART row */}
        <div className="aa-container relative flex items-end justify-between pb-0">
          <p className="pb-8 text-[clamp(2rem,3.83vw,4.5rem)] font-medium leading-none text-white">
            Let&rsquo;s make ART.
          </p>
          {/* Initial note — fades away once the overscroll begins */}
          <div ref={noteRef} className="flex items-center gap-5 pb-10 will-change-[opacity,transform]">
            <span className="hidden text-lg text-white/55 sm:block">not, done, yet</span>
            <span className="hidden text-2xl text-aa-yellow sm:block" aria-hidden>
              ⟶
            </span>
          </div>
          {/* New line dragged in from the right behind the A */}
          <div
            ref={ctaRef}
            className="pointer-events-none absolute bottom-10 right-[max(1.25rem,2.4vw)] hidden text-right will-change-[opacity,transform] sm:block"
            style={{ opacity: 0, transform: "translateX(34vw)" }}
          >
            <p className="text-lg text-white/85">Contact us for more information.</p>
            <p className="text-lg font-bold text-aa-yellow">Let&rsquo;s make art together</p>
          </div>
          {/* Orange 3D A — starts beside "not, done, yet", overscroll pushes it
              right → left into the design spot beside "Let's make ART." */}
          <div
            ref={aRef}
            className="pointer-events-none absolute bottom-[-60px] right-[16%] z-10 will-change-transform"
          >
            <Image
              src="/images/letter-a-orange.webp"
              alt=""
              width={190}
              height={215}
              className="w-[110px] md:w-[150px] lg:w-[180px]"
              aria-hidden
            />
          </div>
        </div>

        {/* Blue block — inset within the grid margins, not full-bleed */}
        <div className="aa-container">
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
                  src="/images/wordmark.webp"
                  alt="ànART®"
                  width={1087}
                  height={246}
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
