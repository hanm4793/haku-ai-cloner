"use client";

import { useEffect, useMemo, useRef } from "react";
import { clamp, subscribeScroll } from "@/lib/scrollTicker";
import { CLIENT_LINES } from "@/lib/data";

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
// slight overshoot so words settle with a subtle spring
const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const rand = (min: number, max: number) => min + Math.random() * (max - min);

interface Token {
  text: string;
  /** separator "|" tokens render lighter */
  sep?: boolean;
  /** last line "and MORE..." renders light */
  light?: boolean;
}

/** Centered client roster with a layered, scroll-scrubbed 3D reveal:
 *  each word flies in from deep Z with blur + multi-axis rotation + scale,
 *  brightening and sharpening as it settles. Reveal order is a spatial
 *  diagonal sweep (top-left → bottom-right) with a touch of per-word jitter,
 *  so it reads as a choreographed cascade rather than random noise. */
export function Clients() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dashRefs = useRef<(HTMLSpanElement | null)[]>([]);

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

  const scatter = useMemo(
    () =>
      flat.map(() => ({
        x: rand(-130, 130),
        y: rand(-80, 80),
        z: rand(650, 1300),
        rx: rand(-75, 75),
        ry: rand(-75, 75),
        rz: rand(-22, 22),
        scale0: rand(0.45, 0.72),
        blur0: rand(7, 16),
        jitter: Math.random(),
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
          el.style.filter = "none";
        }
      });
      return;
    }

    // Spatial reveal order: measure each word's natural center once, then
    // order by the diagonal (cx + cy) so the cascade flows top-left → bottom-
    // right. Blend mostly-ordered with a little jitter for an organic feel.
    let order = scatter.map((s) => s.jitter);
    const measure = () => {
      const secRect = section.getBoundingClientRect();
      const diag: number[] = [];
      for (const el of wordRefs.current) {
        if (!el) {
          diag.push(0);
          continue;
        }
        const prevT = el.style.transform;
        const prevF = el.style.filter;
        el.style.transform = "none";
        el.style.filter = "none";
        const r = el.getBoundingClientRect();
        el.style.transform = prevT;
        el.style.filter = prevF;
        diag.push(r.left + r.width / 2 - secRect.left + (r.top + r.height / 2 - secRect.top));
      }
      const min = Math.min(...diag);
      const max = Math.max(...diag);
      const range = max - min || 1;
      order = diag.map((d, i) => ((d - min) / range) * 0.72 + scatter[i].jitter * 0.28);
    };
    measure();
    window.addEventListener("resize", measure);

    const apply = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const mobile = window.innerWidth < 768;
      const START_MAX = mobile ? 0.4 : 0.72;
      const WORD_WINDOW = mobile ? 0.26 : 0.34;
      const startTop = mobile ? vh * 0.75 : vh * 0.5;
      const endTop = mobile
        ? -(rect.height - vh) * 0.55
        : -(rect.height - vh) * 0.85;
      const span = Math.max(startTop - endTop, 1);
      const p = clamp((startTop - rect.top) / span);

      for (let i = 0; i < wordRefs.current.length; i++) {
        const el = wordRefs.current[i];
        if (!el) continue;
        const s = scatter[i];
        const local = clamp((p - order[i] * START_MAX) / WORD_WINDOW);
        const eo = easeOutExpo(local); // opacity / blur (no overshoot)
        const eb = easeOutBack(local); // transform (spring)
        const inv = 1 - eb;
        const scale = s.scale0 + (1 - s.scale0) * eb;
        el.style.opacity = String(eo);
        el.style.transform =
          `translate3d(${inv * s.x}%, ${inv * s.y}%, ${inv * s.z}px)` +
          ` rotateX(${inv * s.rx}deg) rotateY(${inv * s.ry}deg) rotateZ(${inv * s.rz}deg)` +
          ` scale(${scale})`;
        // Blur + brightness sharpen/brighten in. Skip blur on mobile (costly).
        el.style.filter = mobile
          ? `brightness(${0.45 + 0.55 * eo})`
          : `blur(${(1 - eo) * s.blur0}px) brightness(${0.4 + 0.6 * eo})`;
      }
      for (const el of dashRefs.current) {
        if (!el) continue;
        const d = clamp(p * (mobile ? 8 : 5));
        el.style.opacity = String(d);
        el.style.transform = `scaleX(${easeOutExpo(d)})`;
      }
    };

    const unsub = subscribeScroll(apply, true);
    apply();
    return () => {
      unsub();
      window.removeEventListener("resize", measure);
    };
  }, [scatter]);

  let tokenIndex = -1;

  return (
    <section ref={sectionRef} className="relative h-[55vh] w-full md:h-[190vh]">
      <div className="sticky top-0 flex h-[55vh] flex-col items-center justify-center overflow-hidden md:h-screen">
        <div className="flex w-full max-w-[1920px] flex-col items-center px-3 md:px-[clamp(1.25rem,2.4vw,2.875rem)]">
          <span
            ref={(el) => {
              dashRefs.current[0] = el;
            }}
            className="block h-px w-8 bg-white/60"
            style={{ opacity: 0 }}
          />
          <div
            className="mt-2 w-full space-y-0.5 text-center md:mt-10 md:space-y-2"
            style={{ perspective: "1200px" }}
          >
            {lines.map((line, li) => (
              <p
                key={li}
                className={
                  line[0]?.light
                    ? "pt-0.5 text-[clamp(0.95rem,3.6vw,2.5rem)] font-light leading-snug text-white/90 md:pt-2"
                    : "text-[clamp(1rem,4.2vw,3.75rem)] font-extrabold leading-[1.15] text-white"
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
                      className={`inline-block whitespace-nowrap px-[0.12em] will-change-[transform,opacity] md:px-[0.3em] ${
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
            className="mt-2 block h-px w-8 bg-white/60 md:mt-10"
            style={{ opacity: 0 }}
          />
        </div>
      </div>
    </section>
  );
}
