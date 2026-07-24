"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { clamp, subscribeScroll } from "@/lib/scrollTicker";

/** "Dấu ấn khác biệt / Hiệu quả" strip — same single-row layout at every
 *  breakpoint. Section height drives a sticky horizontal scrub so the user
 *  must scroll through the full strip before the page continues. */
export function ServicesStamp() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

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
      const pinEnd = pinStart + section.offsetHeight - window.innerHeight;
      const range = Math.max(1, pinEnd - pinStart);
      const p = clamp((window.scrollY - pinStart) / range);
      track.style.transform = `translate3d(${-maxScroll * p}px,0,0)`;
    };

    const onResize = () => {
      // Match pin length to current overflow so mobile/desktop both finish
      // the strip before releasing.
      const maxScroll = Math.max(0, track.scrollWidth - window.innerWidth);
      section.style.height = `${window.innerHeight + maxScroll}px`;
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
      <div className="sticky top-0 flex h-dvh items-center overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max flex-nowrap items-center gap-10 px-[max(1.25rem,2vw)] will-change-transform md:gap-14"
        >
          <Image
            src="/images/service-image/service_02.webp"
            alt=""
            width={1342}
            height={898}
            className="h-auto w-[250px] shrink-0 rounded-md"
            aria-hidden
          />
          <div className="shrink-0 whitespace-nowrap">
            <p className="whitespace-nowrap text-[clamp(2.25rem,4.95vw,4.78rem)] font-medium leading-none text-white">
              Dấu ấn khác biệt.
            </p>
            <p className="mt-3 flex items-center gap-3 pl-[18%] text-[clamp(1rem,2.03vw,1.97rem)] font-semibold uppercase text-aa-blue">
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
          <Image
            src="/images/service-image/service_03.webp"
            alt=""
            width={1868}
            height={1098}
            className="h-auto w-[220px] shrink-0 md:w-[320px]"
            aria-hidden
          />
          <div className="shrink-0 whitespace-nowrap text-right">
            <p className="whitespace-nowrap text-[clamp(2.25rem,4.95vw,4.78rem)] font-medium leading-none text-white">
              Hiệu quả.
            </p>
            <p className="mt-3 whitespace-nowrap text-[clamp(1rem,2.03vw,1.97rem)] font-semibold uppercase text-aa-blue">
              It&rsquo;s a mindset.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
