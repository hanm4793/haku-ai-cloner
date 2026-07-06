"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { clamp, subscribeScroll } from "@/lib/scrollTicker";

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const HEAD = "block whitespace-nowrap";

export function Scale() {
  const sectionRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const box = boxRef.current;
    if (!section || !box) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const secTop = rect.top + window.scrollY;
      // Start growing as the section enters (0.55vh before it pins) and finish
      // within ~1 viewport of scroll — snappy, appears immediately.
      const start = secTop - vh * 0.55;
      const range = vh * 1.0;
      const p = prefersReduced ? 1 : clamp((window.scrollY - start) / range);
      const e = easeOut(p);
      // video grows from a top-anchored card to full-bleed (top → bottom)
      const w = lerp(58, 100, e);
      const h = lerp(60, 100, e);
      const radius = lerp(16, 0, e);
      box.style.width = `${w}vw`;
      box.style.height = `${h}vh`;
      box.style.borderRadius = `${radius}px`;
    };

    // text slide-up reveal, once, when the pinned view centers
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setEntered(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (box.parentElement) io.observe(box.parentElement);

    const unsub = subscribeScroll(apply);
    apply();
    return () => {
      unsub();
      io.disconnect();
    };
  }, []);

  const lineStyle = (i: number): React.CSSProperties => ({
    transform: entered ? "translateY(0)" : "translateY(110%)",
    transition: `transform 0.6s cubic-bezier(0.5,0,0,1) ${i * 60}ms`,
  });

  return (
    <section ref={sectionRef} className="relative h-[180vh] w-full">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Scaling video — background layer, top-anchored growth */}
        <div
          ref={boxRef}
          className="absolute left-1/2 top-0 -translate-x-1/2 overflow-hidden"
          style={{ width: "58vw", height: "60vh", borderRadius: 16 }}
        >
          <video
            className="h-full w-full object-cover"
            src="/videos/hero-cover.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/images/hero-orchestra.jpg"
          />
        </div>

        {/* Heading — mix-blend-difference so the video reads through the letters */}
        <div
          className="zeit-container pointer-events-none relative z-10 w-full"
          style={{ mixBlendMode: "difference" }}
        >
          <div className="zeit-display text-[clamp(2.25rem,8.5vw,7.2rem)] font-semibold uppercase leading-[1.06] tracking-[-0.02em] text-white">
            <div className="flex justify-between overflow-hidden">
              <span className={HEAD} style={lineStyle(0)}>Sẵn sàng</span>
              <span className={HEAD} style={lineStyle(1)}>Nâng tầm</span>
            </div>
            <div className="flex justify-between overflow-hidden">
              <span className={HEAD} style={lineStyle(2)}>Và</span>
              <span className={HEAD} style={lineStyle(3)}>Bứt phá</span>
            </div>
            <div className="flex justify-end overflow-hidden">
              <span className={HEAD} style={lineStyle(4)}>Thương hiệu?</span>
            </div>
          </div>
        </div>

        {/* CTA — normal layer (not blended) */}
        <div className="absolute bottom-[14vh] left-1/2 z-20 -translate-x-1/2">
          <Link href="/vn/contact" className="zeit-pill px-8 py-4 text-base">
            [ Liên hệ với chúng tôi ]
          </Link>
        </div>
      </div>
    </section>
  );
}
