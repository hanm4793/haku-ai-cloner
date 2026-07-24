"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { clamp, subscribeScroll } from "@/lib/scrollTicker";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const WORD_CLASS =
  "text-[1.875rem] font-extrabold leading-[0.92] text-aa-blue md:text-[clamp(3rem,7.88vw,9.56rem)]";
const REVEAL_MARGIN = "0px 0px -30% 0px";
const REVEAL_DUR = 850;
const REVEAL_EASE = "cubic-bezier(0.625,0.05,0,1)";

interface RevealLine {
  text: string;
  className: string;
  /** ms after the group triggers */
  delay: number;
}

/** A group of masked lines that all reveal from ONE in-view trigger (each line
 *  slides up from behind its own overflow-hidden mask, menu-style), so a title
 *  and its description always appear together — title first, description a beat
 *  later. */
function RevealGroup({
  lines,
  rootMargin,
  className = "",
}: {
  lines: RevealLine[];
  rootMargin: string;
  className?: string;
}) {
  const [shown, setShown] = useState(false);
  const [settled, setSettled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      setSettled(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          io.disconnect();
          setShown(true);
          const maxDelay = Math.max(...lines.map((l) => l.delay));
          window.setTimeout(() => setSettled(true), maxDelay + REVEAL_DUR + 60);
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [lines, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {lines.map((l, i) => (
        <span
          key={i}
          className={`block ${settled ? "overflow-visible" : "overflow-hidden"} ${l.className}`}
        >
          <span
            className="block will-change-transform"
            style={{
              transform: shown ? "translateY(0)" : "translateY(110%)",
              transition: `transform ${REVEAL_DUR}ms ${REVEAL_EASE} ${l.delay}ms`,
            }}
          >
            {l.text}
          </span>
        </span>
      ))}
    </div>
  );
}

interface DefineProps {
  /** big blue words: [left, right] */
  words?: [string, string];
  /** small captions under each word */
  captions?: [string, string];
}

/** "WE DeFINE / NOT DeCORATE" statement with the black àA sculpture.
 *  Only the sculpture is animated on scroll (3D tilt toward the cursor +
 *  entrance that rises/sharpens as it reaches mid-viewport); the two words +
 *  their descriptions reveal together from a menu-style mask when scrolled to. */
export function Define({
  words = ["WE\nDeFINE", "NOT\nDeCORATE"],
  captions = ["Không trang trí thương hiệu", "chúng tôi định hình bản sắc cho thương hiệu"],
}: DefineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const sculptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    const sculpt = sculptRef.current;
    if (!section || !wrap || !sculpt) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let mtx = 0;
    let mty = 0;
    let mcx = 0;
    let mcy = 0;
    const onMove = (e: PointerEvent) => {
      mtx = (e.clientX / window.innerWidth - 0.5) * 2;
      mty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!prefersReduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    const apply = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const mobile = window.innerWidth < 768;
      if (rect.bottom < -60 || rect.top > vh + 60) return;

      // Entrance keyed to the sculpture's CENTRE rising to mid-viewport, so it
      // only resolves once you've actually scrolled to it (not early).
      const wr = wrap.getBoundingClientRect();
      const cy = wr.top + wr.height / 2;
      const par = (cy - vh / 2) / vh; // -~0.5..0.5, 0 when centred
      const ep = prefersReduced
        ? 1
        : easeOutCubic(clamp((vh - cy) / (vh * 0.55)));
      const ie = 1 - ep;

      const useMouse = !mobile && !prefersReduced;
      mcx += ((useMouse ? mtx : 0) - mcx) * 0.08;
      mcy += ((useMouse ? mty : 0) - mcy) * 0.08;

      const ry = mcx * 15 + ie * -42;
      const rx = -mcy * 12 + ie * 24;
      const tx = mcx * 24;
      const ty = par * -50 + mcy * 16 + ie * 120;
      const scale = 1.04 * (0.7 + 0.3 * ep);
      sculpt.style.opacity = String(clamp(ep * 1.4));
      sculpt.style.filter = `blur(${ie * 18}px)`;
      sculpt.style.transform =
        `translate3d(${tx}px, ${ty}px, 0) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
    };

    const unsub = subscribeScroll(apply, true);
    apply();
    return () => {
      unsub();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const leftTitle = words[0].split("\n");
  const rightTitle = words[1].split("\n");
  const leftLines: RevealLine[] = [
    ...leftTitle.map((t, i) => ({ text: t, className: WORD_CLASS, delay: i * 110 })),
    {
      text: captions[0],
      className:
        "mt-1 max-w-[11rem] text-[0.6875rem] leading-snug text-white/90 md:mt-2 md:max-w-none md:text-lg",
      delay: leftTitle.length * 110 + 120,
    },
  ];
  const rightLines: RevealLine[] = [
    ...rightTitle.map((t, i) => ({ text: t, className: WORD_CLASS, delay: i * 110 })),
    {
      text: captions[1],
      className:
        "mt-1 ml-auto max-w-[12rem] text-[0.6875rem] leading-snug text-white/90 md:mt-2 md:max-w-none md:text-lg",
      delay: rightTitle.length * 110 + 120,
    },
  ];

  return (
    <section ref={sectionRef} className="aa-container relative overflow-hidden pt-1 pb-8 md:py-28">
      {/* Background photo — bottom-aligned, faded into the black toward the top */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src="/images/home-image/home_page_23.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom"
          style={{ filter: "brightness(3.2)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/30 to-black" />
      </div>

      {/* Sculpture — 3D tilt toward cursor + scroll entrance (perspective wrap) */}
      <div
        ref={wrapRef}
        className="pointer-events-none relative z-10 mx-auto aspect-square w-[96%] max-w-[760px] md:aspect-auto md:w-[52%]"
        style={{ perspective: "1100px" }}
      >
        <div
          ref={sculptRef}
          className="h-full w-full will-change-[transform,opacity,filter] [transform-style:preserve-3d]"
          style={{ opacity: 0 }}
        >
          <Image
            src="/images/sculpture-aa.webp"
            alt="Điêu khắc àA — ànART"
            width={1200}
            height={1126}
            className="absolute inset-0 h-full w-full object-contain object-top md:relative md:h-auto md:w-full md:object-center"
          />
        </div>
      </div>

      {/* Left word + description — reveal together from a mask when scrolled to */}
      <div className="absolute left-[max(0.75rem,2vw)] top-auto bottom-[32%] z-10 md:bottom-auto md:left-[max(1.25rem,2.4vw)] md:top-[38%]">
        <RevealGroup lines={leftLines} rootMargin={REVEAL_MARGIN} />
      </div>

      {/* Right word + description — same, bottom-right */}
      <div className="absolute bottom-[2%] right-[max(0.75rem,2vw)] z-10 text-right md:bottom-0 md:right-[max(1.25rem,2.4vw)]">
        <RevealGroup lines={rightLines} rootMargin={REVEAL_MARGIN} />
      </div>
    </section>
  );
}
