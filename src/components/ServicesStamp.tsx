"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { clamp, subscribeScroll } from "@/lib/scrollTicker";

/** "Dấu ấn khác biệt / Hiệu quả" strip — two image+text pairs, same layout at
 *  every breakpoint. The "Hiệu quả" pair sits past a spacer sized (in JS, per
 *  viewport) to clear the screen, so it's fully hidden at rest on every
 *  device — not just narrow ones where the row happens to overflow on its
 *  own. Section height drives a sticky horizontal scrub: scrolling slides
 *  the whole row left, pulling "Hiệu quả" into view while it pushes "Dấu ấn
 *  khác biệt" off to the left — the same belt technique as the footer's
 *  train, just driven by ordinary page scroll instead of captured at the
 *  bottom of the page. The sticky strip is min-h-[70/75vh] (not a full
 *  viewport height) — short enough to read as padded rather than a full
 *  screen, but tall enough that there's no empty gap under it while pinned. */
export function ServicesStamp() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    const spacer = spacerRef.current;
    if (!section || !sticky || !track || !spacer) return;

    const apply = () => {
      const maxScroll = Math.max(0, track.scrollWidth - window.innerWidth);
      if (maxScroll <= 0) {
        track.style.transform = "translate3d(0,0,0)";
        return;
      }
      // Pin distance ≈ horizontal overflow so one screen of vertical scroll
      // maps roughly 1:1 onto the strip travel.
      const rect = section.getBoundingClientRect();
      const pinStart = window.scrollY + rect.top;
      const pinEnd = pinStart + section.offsetHeight - sticky.offsetHeight;
      const range = Math.max(1, pinEnd - pinStart);
      const p = clamp((window.scrollY - pinStart) / range);
      track.style.transform = `translate3d(${-maxScroll * p}px,0,0)`;
    };

    const onResize = () => {
      // Re-measure with the spacer collapsed first, so its offsetLeft is the
      // natural width of everything before it (image + "Dấu ấn khác biệt")
      // — then size it to clear the viewport, so "Hiệu quả" always starts
      // just past the right edge, on any screen width.
      spacer.style.width = "0px";
      const beforeWidth = spacer.offsetLeft;
      spacer.style.width = `${Math.max(0, window.innerWidth - beforeWidth + 48)}px`;

      // Match pin length to current overflow so mobile/desktop both finish
      // the strip before releasing.
      const maxScroll = Math.max(0, track.scrollWidth - window.innerWidth);
      section.style.height = `${sticky.offsetHeight + maxScroll}px`;
      apply();
    };

    onResize();
    const unsub = subscribeScroll(apply, true);
    window.addEventListener("resize", onResize, { passive: true });
    // Images loading can change scrollWidth — remeasure once they settle.
    const imgs = track.querySelectorAll("img");
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", onResize, { once: true });
    });

    return () => {
      unsub();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full">
      <div
        ref={stickyRef}
        className="sticky top-0 flex min-h-[70vh] items-center overflow-hidden py-20 md:min-h-[75vh] md:py-32"
      >
        <div
          ref={trackRef}
          className="flex w-max flex-nowrap items-center gap-10 px-[max(1.25rem,2vw)] will-change-transform md:gap-16"
        >
          {/* Pair 1: image + "Dấu ấn khác biệt." */}
          <Image
            src="/images/service-image/service_02.webp"
            alt=""
            width={1342}
            height={898}
            className="h-auto w-[320px] shrink-0 rounded-md md:w-100"
            aria-hidden
          />
          <div className="shrink-0 whitespace-nowrap">
            <p className="whitespace-nowrap text-[clamp(2.75rem,6.4vw,6.13rem)] font-medium leading-none text-white">
              Dấu ấn khác biệt.
            </p>
            <p className="mt-4 flex items-center gap-3 pl-[18%] text-[clamp(1.25rem,2.6vw,2.53rem)] font-semibold uppercase text-aa-blue">
              <Image
                src="/images/service-image/service_04.webp"
                alt=""
                width={286}
                height={199}
                className="h-[0.6em] w-auto shrink-0"
                aria-hidden
              />
              <span className="whitespace-nowrap">More than a trend.</span>
            </p>
          </div>

          {/* Sized in JS so pair 2 clears the viewport at rest — see onResize */}
          <div ref={spacerRef} className="h-px shrink-0" aria-hidden />

          {/* Pair 2: horse image + "Hiệu quả." */}
          <Image
            src="/images/service-image/service_03.webp"
            alt=""
            width={1868}
            height={1098}
            className="h-auto w-70 shrink-0 md:w-105"
            aria-hidden
          />
          <div className="shrink-0 whitespace-nowrap text-right">
            <p className="whitespace-nowrap text-[clamp(2.75rem,6.4vw,6.13rem)] font-medium leading-none text-white">
              Hiệu quả.
            </p>
            <p className="mt-4 whitespace-nowrap text-[clamp(1.25rem,2.6vw,2.53rem)] font-semibold uppercase text-aa-blue">
              It&rsquo;s a mindset.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
