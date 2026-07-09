"use client";

import { useMemo, useState } from "react";
import { ProjectsGrid } from "@/components/ProjectsGrid";
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
      {/* Filter bar */}
      <div className="aa-reveal flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/50">
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

      <div className="mt-10" key={filter}>
        <ProjectsGrid projects={visible} />
      </div>

      {!expanded && (
        <div className="mt-14 flex justify-end">
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
