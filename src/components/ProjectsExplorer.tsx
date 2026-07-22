"use client";

import { useMemo, useState } from "react";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { RevealTitle } from "@/components/RevealTitle";
import { PROJECTS, PROJECT_FILTERS } from "@/lib/data";

/** Filter bar + mosaic grid + "XEM THÊM" — caayco-style category filtering. */
export function ProjectsExplorer() {
  const [filter, setFilter] = useState<(typeof PROJECT_FILTERS)[number]>("All");
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.categories.includes(filter)),
    [filter],
  );

  // second batch repeats the roster when "XEM THÊM" is pressed (until real
  // case-study data exists)
  const visible = expanded
    ? [...filtered, ...filtered.map((p) => ({ ...p, slug: `${p.slug}-2` }))]
    : filtered;

  return (
    <>
      {/* Hero header — title + category filter (left), statement (right) */}
      <section className="aa-container pt-36 md:pt-44">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-5">
          <div className="lg:col-span-5">
            <RevealTitle
              as="h1"
              lines={["Dự án"]}
              className="text-[clamp(3.5rem,7.88vw,8.72rem)] font-medium uppercase leading-[0.95] tracking-tight text-white"
            />
            {/* Filter bar — sits directly under the DỰ ÁN title */}
            <div
              className="aa-reveal mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/50"
              style={{ ["--reveal-delay" as string]: "80ms" }}
            >
              {PROJECT_FILTERS.map((f, i) => (
                <span key={f} className="flex items-center gap-2">
                  {i > 0 && <span className="text-white/30">/</span>}
                  <button
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`transition-colors ${
                      filter === f
                        ? "font-bold text-white underline underline-offset-4"
                        : "hover:text-white"
                    }`}
                  >
                    {f}
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div
            className="aa-reveal flex flex-col gap-8 lg:col-start-6 lg:col-span-7"
            style={{ ["--reveal-delay" as string]: "120ms" }}
          >
            <p className="text-[clamp(1.1rem,1.74vw,1.69rem)] font-medium uppercase leading-[1.4] text-white">
              Mỗi dự án tại ànART là một hành trình sáng tạo, chuyển hóa từ nghệ
              thuật thành trải nghiệm.
            </p>
            <p className="text-[clamp(1.1rem,1.74vw,1.69rem)] font-medium uppercase leading-[1.4] text-white">
              Chúng tôi luôn theo đuổi những giá trị có khả năng chạm đến cảm xúc
              tạo nên các trải nghiệm độc đáo — nơi hình ảnh, không gian, câu
              chuyện tạo ra giá trị và dấu ấn bền vững cho thương hiệu.
            </p>
            <p className="text-base font-bold text-white">
              — ànART{" "}
              <sup className="text-[0.7em] tracking-normal">&#174;</sup>
            </p>
          </div>
        </div>
      </section>

      <div className="aa-container pt-14" key={filter}>
        <ProjectsGrid projects={visible} />
      </div>

      {!expanded && (
        <div className="aa-container mt-14 flex justify-end">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="group inline-flex items-center gap-4 text-xl font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-75"
          >
            <svg
              viewBox="0 0 48 24"
              className="h-6 w-12 transition-transform duration-300 group-hover:translate-x-1"
              fill="currentColor"
            >
              <path d="M0 10h36V4l12 8-12 8v-6H0v-4z" />
            </svg>
            Xem thêm
          </button>
        </div>
      )}
    </>
  );
}
