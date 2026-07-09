import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";

const SIZE_CLASS: Record<Project["size"], string> = {
  wide: "md:col-span-2 md:row-span-2",
  tall: "md:row-span-2",
  small: "",
};

function Tile({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href="/du-an"
      className={`aa-reveal group relative block overflow-hidden bg-white/[0.04] ${SIZE_CLASS[project.size]}`}
      style={{ ["--reveal-delay" as string]: `${(index % 3) * 90}ms` }}
    >
      {/* Titles/tags are baked into the design crops — no text overlay needed */}
      <Image
        src={project.image}
        alt={`${project.title} — ${project.subtitle}`}
        width={1213}
        height={901}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      {/* Arrow bottom-right — slides in on hover (caayco-style) */}
      <span className="absolute bottom-4 right-5 translate-x-2 translate-y-[-8px] text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M7 7l10 10M17 8v9H8" />
        </svg>
      </span>

      {/* Hover darken */}
      <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
    </Link>
  );
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid auto-rows-[300px] grid-cols-1 gap-5 md:auto-rows-[clamp(200px,23vw,440px)] md:grid-cols-3">
      {projects.map((p, i) => (
        <Tile key={p.slug} project={p} index={i} />
      ))}
    </div>
  );
}
