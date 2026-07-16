"use client";

import { useState } from "react";
import Link from "next/link";
import { SERVICES } from "@/lib/data";

/** "› Dịch vụ của ànART" statement + LĨNH VỰC TRIỂN KHAI interactive list (home). */
export function ServicesHome() {
  const [active, setActive] = useState(0);

  return (
    <section className="aa-container pb-28">
      {/* Statement */}
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-5">
        <p className="aa-reveal aa-eyebrow self-start text-base lg:col-start-3 lg:col-span-2">Dịch vụ của ànART</p>
        <h2 className="aa-reveal text-[clamp(1.35rem,2.31vw,2.25rem)] font-medium uppercase leading-[1.35] text-white lg:col-start-5 lg:col-span-8">
          Chúng tôi kiến tạo nên những trải nghiệm độc đáo — nơi hình ảnh, không
          gian, câu chuyện tạo ra giá trị và dấu ấn bền vững cho thương hiệu.
        </h2>
      </div>

      {/* Divider between the statement and the fields-of-work block */}
      <div className="mt-14 border-t border-white/15" />

      {/* Fields of work */}
      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-5">
        {/* Big index numeral — desktop only; mobile has no room for it beside the list */}
        <p
          className="aa-reveal hidden select-none text-right text-[clamp(4rem,6.75vw,6.75rem)] font-light leading-none text-aa-blue lg:col-start-3 lg:col-span-1 lg:block"
          aria-hidden
        >
          {SERVICES[active].index}
        </p>

        <div className="aa-reveal pt-8 lg:col-start-5 lg:col-span-3 lg:pt-0">
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
                  {/* Mobile: inline accordion bullet — "−" open / "+" closed, per design. */}
                  <span className="w-4 shrink-0 text-base lg:hidden" aria-hidden>
                    {active === i ? "−" : "+"}
                  </span>
                  {/* Desktop: hanging bullet outside the text column, doesn't shift the
                      title. Uses the minus sign (−) rather than an em dash (—) so it
                      matches the "+" glyph's advance width, per the design's equal-width
                      bullets. Desktop's active state is the opposite of mobile's ("+" open). */}
                  <span className="absolute -left-10 hidden w-5 text-right text-base lg:inline" aria-hidden>
                    {active === i ? "+" : "−"}
                  </span>
                  <span
                    className={`text-base ${active === i ? "font-bold" : "font-medium"}`}
                  >
                    {s.title}{" "}
                    <sup className="text-[0.6em] text-white/50">({s.index})</sup>
                  </span>
                </button>
                {/* Mobile: description opens inline under the active item (accordion) */}
                {active === i && (
                  <p className="mt-3 pl-7 text-sm leading-relaxed text-white lg:hidden">
                    {s.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop: shared description panel to the right of the list */}
        <div className="aa-reveal hidden max-w-md lg:col-start-8 lg:col-span-5 lg:block lg:pt-16">
          <p key={active} className="text-sm leading-relaxed text-white">
            {SERVICES[active].description}
          </p>
        </div>

        {/* Mobile: link lives under the whole list since there's no side panel */}
        <Link
          href="/dich-vu"
          className="aa-reveal inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-white/70 transition-colors hover:text-white lg:hidden"
        >
          Xem tất cả dịch vụ <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
