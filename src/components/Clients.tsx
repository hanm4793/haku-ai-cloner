"use client";

import { useEffect, useMemo, useRef } from "react";
import { clamp, subscribeScroll } from "@/lib/scrollTicker";
import { CLIENTS, GOV_CLIENTS } from "@/lib/data";

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const rand = (min: number, max: number) => min + Math.random() * (max - min);

export function Clients() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Full client title = flagship gov clients + the rest, one flowing block.
  const words = useMemo(
    () => [...GOV_CLIENTS.join(" ").split(" "), ...CLIENTS],
    [],
  );

  // Stable random scatter + stagger per word (mirrors the site's gsap.fromTo).
  const scatter = useMemo(
    () =>
      words.map(() => ({
        x: rand(-100, 100), // %
        y: rand(-10, 10), // %
        z: rand(500, 950), // px
        rx: rand(-90, 90), // deg
        delay: Math.random() * 0.5, // random stagger
      })),
    [words],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      wordRefs.current.forEach((el) => {
        if (el) {
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      });
      return;
    }

    const REVEAL_WINDOW = 0.4;

    const apply = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      // progress 0→1 across the pinned scroll distance
      const p = clamp(-rect.top / Math.max(scrollable, 1));
      for (let i = 0; i < wordRefs.current.length; i++) {
        const el = wordRefs.current[i];
        if (!el) continue;
        const s = scatter[i];
        const local = clamp((p - s.delay * (1 - REVEAL_WINDOW)) / REVEAL_WINDOW);
        const e = easeOutExpo(local);
        const inv = 1 - e;
        el.style.opacity = String(local);
        el.style.transform = `translate3d(${inv * s.x}%, ${inv * s.y}%, ${inv * s.z}px) rotateX(${inv * s.rx}deg)`;
      }
    };

    const unsub = subscribeScroll(apply);
    apply();
    return unsub;
  }, [scatter]);

  return (
    <section ref={sectionRef} className="relative h-[220vh] w-full">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <div className="zeit-container flex flex-col items-center">
          <span className="zeit-eyebrow mb-10">Khách hàng của chúng tôi</span>
          <p
            className="zeit-display max-w-5xl text-center text-[clamp(1.5rem,3.4vw,3rem)] font-medium uppercase leading-[1.2]"
            style={{ perspective: "1000px" }}
          >
            {words.map((word, i) => (
              <span
                key={`${word}-${i}`}
                ref={(el) => {
                  wordRefs.current[i] = el;
                }}
                className="inline-block whitespace-nowrap px-[0.18em] will-change-[transform,opacity]"
                style={{ opacity: 0 }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
