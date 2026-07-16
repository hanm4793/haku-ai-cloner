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
        // wide random stagger so words keep flying in across the whole pinned
        // scroll — a few per wheel, not all at once
        delay: Math.random(),
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

    const START_MAX = 0.7; // latest a word may begin (as a fraction of progress)
    const WORD_WINDOW = 0.3; // each word flies in over this much progress

    const apply = () => {
      const rect = section.getBoundingClientRect();
      // Progress begins as the block enters the lower half of the viewport
      // (so there's no long blank before it) and finishes near the end of the
      // pin — letting the scatter play out gradually across the whole scroll,
      // a few words per wheel, instead of all at once.
      const vh = window.innerHeight;
      const startTop = vh * 0.5;
      const endTop = -(rect.height - vh) * 0.85;
      const span = Math.max(startTop - endTop, 1);
      const p = clamp((startTop - rect.top) / span);
      for (let i = 0; i < wordRefs.current.length; i++) {
        const el = wordRefs.current[i];
        if (!el) continue;
        const s = scatter[i];
        const local = clamp((p - s.delay * START_MAX) / WORD_WINDOW);
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
    <section ref={sectionRef} className="relative h-[170vh] w-full">
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
                    ? "pt-2 text-[clamp(1.5rem,2.8vw,2.5rem)] font-light leading-snug text-white/90"
                    : "text-[clamp(1.75rem,4vw,3.75rem)] font-extrabold leading-[1.15] text-white"
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
