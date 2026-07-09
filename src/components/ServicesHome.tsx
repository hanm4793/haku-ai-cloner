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
      <div className="grid gap-8 lg:grid-cols-[minmax(200px,320px)_1fr]">
        <p className="aa-reveal aa-eyebrow self-start text-base">Dịch vụ của ànART</p>
        <h2 className="aa-reveal text-[clamp(1.35rem,2.05vw,2rem)] font-medium uppercase leading-[1.35] text-white">
          Chúng tôi kiến tạo nên những trải nghiệm độc đáo — nơi hình ảnh, không
          gian, câu chuyện tạo ra giá trị và dấu ấn bền vững cho thương hiệu.
        </h2>
      </div>

      {/* Fields of work */}
      <div className="mt-20 grid gap-10 lg:grid-cols-[minmax(180px,300px)_minmax(0,420px)_1fr]">
        <p
          className="aa-reveal select-none text-right text-[clamp(4rem,6vw,6rem)] font-light leading-none text-aa-blue"
          aria-hidden
        >
          {SERVICES[active].index}
        </p>

        <div className="aa-reveal border-t border-white/20 pt-8 lg:border-none lg:pt-0">
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
                  className={`group flex items-baseline gap-4 text-left transition-colors ${
                    active === i ? "text-white" : "text-white/45 hover:text-white/80"
                  }`}
                >
                  <span className="w-5 shrink-0 text-base">
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

        <div className="aa-reveal max-w-md lg:pt-16">
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
