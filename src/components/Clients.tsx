"use client";

import { useEffect, useMemo, useRef } from "react";
import { clamp, subscribeScroll } from "@/lib/scrollTicker";
import { CLIENT_LINES } from "@/lib/data";

const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const rand = (min: number, max: number) => min + Math.random() * (max - min);

const REPEL_R = 250; // cursor influence radius (px)
const REPEL_MAX = 64; // max push distance (px)

interface Token {
  text: string;
  sep?: boolean;
  light?: boolean;
}

/** Client roster — a living, painterly field. Names drift up out of a dreamy
 *  blur (revealed centre-outward on scroll), then never sit still: each one
 *  bobs on its own slow current, and the whole field reacts to the cursor —
 *  words gently swim away from it while brightening and swelling as it passes,
 *  like disturbing water. Artful and interactive, not technical. */
export function Clients() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
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

  const drift = useMemo(
    () =>
      flat.map(() => ({
        dx: rand(-40, 40),
        dy: rand(44, 104), // rises from below
        rot: rand(-6, 6),
        scale0: rand(0.84, 0.95),
        blur0: rand(12, 24),
        ampX: rand(4, 11), // ambient bob amplitude
        ampY: rand(5, 13),
        freqX: rand(0.0007, 0.0015),
        freqY: rand(0.0006, 0.0013),
        phase: rand(0, Math.PI * 2),
        jitter: Math.random(),
      })),
    [flat],
  );

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    const isSep = flat.map((t) => !!t.sep);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      [...wordRefs.current, ...dashRefs.current].forEach((el) => {
        if (el) {
          el.style.opacity = "1";
          el.style.transform = "none";
          el.style.filter = "none";
          el.style.textShadow = "none";
        }
      });
      return;
    }

    // Resting offsets (relative to the sticky frame) + centre-out reveal order.
    const offs: ({ ox: number; oy: number } | null)[] = [];
    let order = drift.map((d) => d.jitter);
    const measure = () => {
      const sRect = sticky.getBoundingClientRect();
      wordRefs.current.forEach((el, i) => {
        if (!el) {
          offs[i] = null;
          return;
        }
        const prevT = el.style.transform;
        const prevF = el.style.filter;
        el.style.transform = "none";
        el.style.filter = "none";
        const r = el.getBoundingClientRect();
        el.style.transform = prevT;
        el.style.filter = prevF;
        offs[i] = { ox: r.left + r.width / 2 - sRect.left, oy: r.top + r.height / 2 - sRect.top };
      });
      const pts = offs.filter(Boolean) as { ox: number; oy: number }[];
      const ccx = pts.reduce((a, b) => a + b.ox, 0) / (pts.length || 1);
      const ccy = pts.reduce((a, b) => a + b.oy, 0) / (pts.length || 1);
      const dist = offs.map((c) => (c ? Math.hypot(c.ox - ccx, c.oy - ccy) : 0));
      const max = Math.max(...dist) || 1;
      order = dist.map((d, i) => (d / max) * 0.72 + drift[i].jitter * 0.28);
    };
    measure();
    window.addEventListener("resize", measure);

    // Smoothed (lerped) cursor displacement + proximity per word, so the field
    // glides toward its target rather than snapping to the raw cursor position.
    const curPX = drift.map(() => 0);
    const curPY = drift.map(() => 0);
    const curNear = drift.map(() => 0);

    // Cursor tracking (viewport coords; off-screen = no influence).
    let mx = -99999;
    let my = -99999;
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onLeave = () => {
      mx = -99999;
      my = -99999;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    const apply = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const mobile = window.innerWidth < 768;
      const t = performance.now();

      const START_MAX = mobile ? 0.42 : 0.64;
      const WORD_WINDOW = mobile ? 0.3 : 0.42;
      const startTop = mobile ? vh * 0.78 : vh * 0.55;
      const endTop = mobile
        ? -(rect.height - vh) * 0.55
        : -(rect.height - vh) * 0.85;
      const spanR = Math.max(startTop - endTop, 1);
      const p = clamp((startTop - rect.top) / spanR);

      // Off-screen: skip the heavy per-word work.
      if (rect.bottom < -80 || rect.top > vh + 80) return;

      const sRect = sticky.getBoundingClientRect();
      const cursorOn = !mobile && mx > -9999;

      for (let i = 0; i < wordRefs.current.length; i++) {
        const el = wordRefs.current[i];
        const off = offs[i];
        if (!el || !off) continue;
        const d = drift[i];
        const local = clamp((p - order[i] * START_MAX) / WORD_WINDOW);
        const e = easeOutQuint(local);
        const eo = easeOutExpo(local);
        const inv = 1 - e;
        const invO = 1 - eo;

        // Separators ("|") only do the entrance — they stay put during ambient
        // drift and cursor interaction so the roster's columns don't wobble.
        if (isSep[i]) {
          const scaleE = d.scale0 + (1 - d.scale0) * e;
          el.style.opacity = String(eo);
          el.style.transform = `translate(${inv * d.dx}px, ${inv * d.dy}px) rotate(${inv * d.rot}deg) scale(${scaleE})`;
          el.style.filter = mobile ? `blur(${invO * d.blur0 * 0.5}px)` : `blur(${invO * d.blur0}px)`;
          el.style.textShadow = invO > 0.02 ? `0 0 ${invO * 10}px rgba(150,180,255,${invO * 0.4})` : "none";
          curPX[i] = 0;
          curPY[i] = 0;
          curNear[i] = 0;
          continue;
        }

        // ambient bob (only once the word has formed)
        const ambX = Math.sin(t * d.freqX + d.phase) * d.ampX * eo;
        const ambY = Math.cos(t * d.freqY + d.phase * 1.3) * d.ampY * eo;

        // cursor repulsion + proximity glow/swell — compute the TARGET, then
        // ease the actual displacement toward it for a smooth, watery glide.
        let tpx = 0;
        let tpy = 0;
        let tnear = 0;
        if (cursorOn && eo > 0.05) {
          const wvx = sRect.left + off.ox;
          const wvy = sRect.top + off.oy;
          const vx = wvx - mx;
          const vy = wvy - my;
          const dist = Math.hypot(vx, vy);
          if (dist < REPEL_R) {
            tnear = 1 - dist / REPEL_R;
            // smootherstep falloff so the edge of the radius eases in, not a hard ramp
            const s = tnear * tnear * (3 - 2 * tnear);
            const push = s * REPEL_MAX;
            const dn = dist || 1;
            tpx = (vx / dn) * push;
            tpy = (vy / dn) * push;
          }
        }
        const SM = 0.14;
        curPX[i] += (tpx - curPX[i]) * SM;
        curPY[i] += (tpy - curPY[i]) * SM;
        curNear[i] += (tnear - curNear[i]) * SM;
        const pushX = curPX[i];
        const pushY = curPY[i];
        const near = curNear[i];

        const scale = d.scale0 + (1 - d.scale0) * e + near * 0.16;
        el.style.opacity = String(eo);
        el.style.transform =
          `translate(${inv * d.dx + ambX + pushX}px, ${inv * d.dy + ambY + pushY}px)` +
          ` rotate(${inv * d.rot}deg) scale(${scale})`;
        el.style.filter = mobile
          ? `blur(${invO * d.blur0 * 0.5}px)`
          : `blur(${invO * d.blur0}px)`;
        const glow = Math.max(invO * 0.5, near * 0.95);
        el.style.textShadow =
          glow > 0.02 ? `0 0 ${glow * 20}px rgba(150,180,255,${glow * 0.75})` : "none";
      }

      for (const el of dashRefs.current) {
        if (!el) continue;
        const dd = clamp(p * (mobile ? 8 : 5));
        el.style.opacity = String(dd);
        el.style.transform = `scaleX(${easeOutExpo(dd)})`;
      }
    };

    const unsub = subscribeScroll(apply, true);
    apply();
    return () => {
      unsub();
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [drift]);

  let tokenIndex = -1;

  return (
    <section ref={sectionRef} className="relative h-[55vh] w-full md:h-[185vh]">
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-[55vh] flex-col items-center justify-center overflow-hidden md:h-screen"
      >
        <div className="flex w-full max-w-[1920px] flex-col items-center px-3 md:px-[clamp(1.25rem,2.4vw,2.875rem)]">
          <span
            ref={(el) => {
              dashRefs.current[0] = el;
            }}
            className="block h-px w-8 bg-white/60"
            style={{ opacity: 0 }}
          />
          <div className="mt-2 w-full space-y-0.5 text-center md:mt-10 md:space-y-2">
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
                      className={`inline-block whitespace-nowrap px-[0.12em] will-change-[transform,opacity,filter] md:px-[0.3em] ${
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
