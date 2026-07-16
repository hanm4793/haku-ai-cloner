"use client";

import { useEffect, useMemo, useRef } from "react";
import { clamp, subscribeScroll } from "@/lib/scrollTicker";
import { CLIENT_LINES } from "@/lib/data";

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const rand = (min: number, max: number) => min + Math.random() * (max - min);

interface Token {
  text: string;
  /** separator "|" tokens render lighter */
  sep?: boolean;
  /** last line "and MORE..." renders light */
  light?: boolean;
}

/** Centered client roster with the Zeit-style 3D word-scatter scroll effect:
 *  the section pins for ~220vh while each name flies in from a random
 *  translate3d/rotateX offset and settles into the design layout. */
export function Clients() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dashRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Flatten design lines into per-line token arrays (names + "|" separators).
  const lines = useMemo<Token[][]>(() => {
    const ls: Token[][] = CLIENT_LINES.map((line) =>
      line.flatMap((client, j): Token[] =>
        j > 0 ? [{ text: "|", sep: true }, { text: client }] : [{ text: client }],
      ),
    );
    ls.push([{ text: "and MORE...", light: true }]);
    return ls;
  }, []);
  const flat = useMemo(() => lines.flat(), [lines]);

  // Stable random scatter + stagger per token (mirrors the old gsap.fromTo).
  const scatter = useMemo(
    () =>
      flat.map(() => ({
        x: rand(-100, 100), // %
        y: rand(-60, 60), // %
        z: rand(500, 950), // px
        rx: rand(-90, 90), // deg
        // small stagger so the first words appear the moment the pin starts
        delay: Math.random() * 0.35,
      })),
    [flat],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      [...wordRefs.current, ...dashRefs.current].forEach((el) => {
        if (el) {
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      });
      return;
    }

    const REVEAL_WINDOW = 0.55;

    const apply = () => {
      const rect = section.getBoundingClientRect();
      // Progress runs across the pinned scroll distance so the whole effect
      // plays while the section is pinned (like the original Zeit section).
      const scrollable = rect.height - window.innerHeight;
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
      // Dashes draw in with the first words instead of floating alone.
      for (const el of dashRefs.current) {
        if (!el) continue;
        const d = clamp(p * 5);
        el.style.opacity = String(d);
        el.style.transform = `scaleX(${easeOutExpo(d)})`;
      }
    };

    // keepAlive: without this the ticker's rAF loop goes idle between
    // discrete wheel gestures and only "wakes" on the next native scroll
    // event — combined with Lenis's ~1.1s eased scroll, that produced a
    // visible lag (blank pin) until scrolling a couple more times.
    const unsub = subscribeScroll(apply, true);
    apply();
    return unsub;
  }, [scatter]);

  let tokenIndex = -1;

  return (
    <section ref={sectionRef} className="relative h-[180vh] w-full">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <div className="aa-container flex flex-col items-center">
          <span
            ref={(el) => {
              dashRefs.current[0] = el;
            }}
            className="block h-px w-8 bg-white/60"
            style={{ opacity: 0 }}
          />
          <div className="mt-10 space-y-2 text-center" style={{ perspective: "1000px" }}>
            {lines.map((line, li) => (
              <p
                key={li}
                className={
                  line[0]?.light
                    ? "pt-1 text-[clamp(1.2rem,2vw,1.9rem)] font-light leading-snug text-white/90"
                    : "text-[clamp(1.35rem,2.5vw,2.375rem)] font-extrabold leading-snug text-white"
                }
              >
                {line.map((tok) => {
                  tokenIndex++;
                  const i = tokenIndex;
                  return (
                    <span
                      key={i}
                      ref={(el) => {
                        wordRefs.current[i] = el;
                      }}
                      className={`inline-block whitespace-nowrap px-[0.3em] will-change-[transform,opacity] ${
                        tok.sep ? "font-light text-white/70" : ""
                      }`}
                      style={{ opacity: 0 }}
                    >
                      {tok.text}
                    </span>
                  );
                })}
              </p>
            ))}
          </div>
          <span
            ref={(el) => {
              dashRefs.current[1] = el;
            }}
            className="mt-10 block h-px w-8 bg-white/60"
            style={{ opacity: 0 }}
          />
        </div>
      </div>
    </section>
  );
}
