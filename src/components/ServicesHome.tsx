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
        <h2 className="aa-reveal text-[clamp(1.35rem,2.05vw,2rem)] font-medium uppercase leading-[1.35] text-white lg:col-start-5 lg:col-span-8">
          Chúng tôi kiến tạo nên những trải nghiệm độc đáo — nơi hình ảnh, không
          gian, câu chuyện tạo ra giá trị và dấu ấn bền vững cho thương hiệu.
        </h2>
      </div>

      {/* Divider between the statement and the fields-of-work block */}
      <div className="mt-14 border-t border-white/15" />

      {/* Fields of work */}
      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-5">
        <p
          className="aa-reveal select-none text-right text-[clamp(4rem,6vw,6rem)] font-light leading-none text-aa-blue lg:col-start-3 lg:col-span-1"
          aria-hidden
        >
          {SERVICES[active].index}
        </p>

        <div className="aa-reveal border-t border-white/20 pt-8 lg:col-start-5 lg:col-span-3 lg:border-none lg:pt-0">
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
                  className={`group relative flex items-baseline text-left transition-colors ${
                    active === i ? "text-white" : "text-white/45 hover:text-white/80"
                  }`}
                >
                  {/* Hanging bullet — sits outside the text column, doesn't shift the title */}
                  <span className="absolute -left-10 w-5 text-right text-base" aria-hidden>
                    {active === i ? "+" : "—"}
                  </span>
                  <span
                    className={`text-base ${active === i ? "font-bold" : "font-medium"}`}
                  >
                    {s.title}{" "}
                    <sup className="text-[0.6em] text-white/50">({s.index})</sup>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="aa-reveal max-w-md lg:col-start-8 lg:col-span-5 lg:pt-16">
          <p key={active} className="text-sm leading-relaxed text-white/60">
            {SERVICES[active].description}
          </p>
          <Link
            href="/dich-vu"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-white/70 transition-colors hover:text-white"
          >
            Xem tất cả dịch vụ <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
