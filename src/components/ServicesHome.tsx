"use client";

import { useState } from "react";
import { SERVICES } from "@/lib/data";

/** Plus/minus bullet built from two equal-size bars (à la caay.co's toggle
 *  tabs) instead of the "+"/"−" glyphs — those render at mismatched visual
 *  weights depending on font, which was the "+ too small" bug. The
 *  horizontal bar is always on; the vertical bar cross-fades in/out, so
 *  toggling between plus and minus is a smooth opacity animation rather than
 *  a character swap. */
function PlusMinusIcon({ isPlus, className }: { isPlus: boolean; className?: string }) {
  return (
    <span className={`relative inline-block h-4 w-4 shrink-0 ${className ?? ""}`} aria-hidden>
      <span className="absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
      <span
        className={`absolute left-1/2 top-1/2 h-4 w-[2px] -translate-x-1/2 -translate-y-1/2 bg-current transition-opacity duration-500 ease-in-out ${
          isPlus ? "opacity-100" : "opacity-0"
        }`}
      />
    </span>
  );
}

/** "› Dịch vụ của ànART" statement + LĨNH VỰC TRIỂN KHAI interactive list (home). */
export function ServicesHome() {
  const [active, setActive] = useState(0);

  return (
    <section className="aa-container pb-0 lg:pb-0">
      {/* Statement — 18px + uppercase on mobile; desktop keeps prior scale/case */}
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-5">
        <p className="aa-reveal aa-eyebrow self-start text-[1.125rem] font-medium uppercase leading-[1.35] lg:col-start-3 lg:col-span-2 lg:text-base lg:normal-case">
          Dịch vụ của ànART
        </p>
        <h2 className="aa-reveal text-[1.125rem] font-medium uppercase leading-[1.35] text-white lg:col-start-5 lg:col-span-8 lg:text-[clamp(1.35rem,2.31vw,2.25rem)]">
          Chúng tôi kiến tạo nên những trải nghiệm độc đáo — nơi hình ảnh, không
          gian, câu chuyện tạo ra giá trị và dấu ấn bền vững cho thương hiệu.
        </h2>
      </div>

      {/* Divider — mobile full-bleed; desktop left-aligned with LĨNH VỰC (col 5) */}
      <div className="mt-8 lg:mt-14 lg:grid lg:grid-cols-12 lg:gap-5">
        <div className="border-t border-white/15 pt-8 lg:col-start-5 lg:col-span-8 lg:pt-14" />
      </div>

      {/* Fields of work */}
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-5">
        <div
          className="aa-reveal relative hidden h-[clamp(4rem,6.75vw,6.75rem)] select-none text-right lg:col-start-3 lg:col-span-1 lg:block"
          aria-hidden
        >
          {SERVICES.map((s, i) => (
            <p
              key={s.index}
              className="absolute inset-0 text-[clamp(4rem,6.75vw,6.75rem)] font-light leading-none text-aa-blue transition-all duration-500 ease-[cubic-bezier(0.3,0.86,0.36,0.95)]"
              style={{
                opacity: active === i ? 1 : 0,
                transform: `translateY(${active === i ? 0 : 32}px)`,
              }}
            >
              {s.index}
            </p>
          ))}
        </div>

        <div className="aa-reveal pt-0 lg:col-start-5 lg:col-span-3 lg:pt-0">
          <p className="mb-7 text-lg font-medium uppercase tracking-wide text-white">
            Lĩnh vực triển khai
          </p>
          <ul className="flex flex-col gap-4">
            {SERVICES.map((s, i) => (
              <li key={s.index}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group relative flex items-baseline gap-3 text-left transition-colors lg:gap-0 ${
                    active === i ? "text-white" : "text-white/45 hover:text-white/80"
                  }`}
                >
                  <PlusMinusIcon isPlus={active !== i} className="lg:hidden" />
                  <span className="absolute -left-10 hidden w-5 lg:flex lg:justify-end">
                    <PlusMinusIcon isPlus={active === i} />
                  </span>
                  <span
                    className={`text-base ${active === i ? "font-bold" : "font-medium"}`}
                  >
                    {s.title}{" "}
                    <sup className="text-[0.6em] text-white/50">({s.index})</sup>
                  </span>
                </button>
                {active === i && (
                  <p className="mt-3 pl-7 text-sm leading-relaxed text-white lg:hidden">
                    {s.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="aa-reveal hidden max-w-md lg:col-start-8 lg:col-span-5 lg:block lg:pt-16">
          <p key={active} className="text-sm leading-relaxed text-white">
            {SERVICES[active].description}
          </p>
        </div>
      </div>

      {/* Divider into Projects — desktop: more air below the line before Projects */}
      <div className="mt-8 lg:mt-14 lg:grid lg:grid-cols-12 lg:gap-5">
        <div className="border-t border-white/15 pt-8 lg:col-start-5 lg:col-span-8 lg:pt-20" />
      </div>
    </section>
  );
}
