import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";

const SIZE_CLASS: Record<Project["size"], string> = {
  wide: "md:col-span-2 md:row-span-2",
  tall: "md:row-span-2",
  small: "",
};

// "wide" tiles span 2 of the 3 grid columns (~66vw); tall/small span 1 (~33vw).
// A flat 33vw for every tile under-fetched the wide ones (blurry upscale).
const IMAGE_SIZES: Record<Project["size"], string> = {
  wide: "(max-width: 768px) 100vw, 66vw",
  tall: "(max-width: 768px) 100vw, 33vw",
  small: "(max-width: 768px) 100vw, 33vw",
};

function Tile({ project, index }: { project: Project; index: number }) {
  const href = project.hasCaseStudy ? `/du-an/${project.slug}` : "/du-an";
  return (
    <Link
      href={href}
      className={`aa-reveal group relative block overflow-hidden bg-white/[0.04] ${SIZE_CLASS[project.size]}`}
      style={{ ["--reveal-delay" as string]: `${(index % 3) * 90}ms` }}
    >
      {/* Blue ground revealed on hover — the image screens over it (design mock) */}
      <span className="pointer-events-none absolute inset-0 bg-aa-blue opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Clean artwork — on hover it turns into a grayscale screen over the
          blue ground = bright blue duotone (no scale) */}
      <Image
        src={project.image}
        alt={`${project.title} — ${project.subtitle}`}
        width={1213}
        height={901}
        className="relative h-full w-full object-cover transition-[filter] duration-700 ease-out group-hover:grayscale group-hover:mix-blend-screen"
        sizes={IMAGE_SIZES[project.size]}
      />

      {/* Blue wash on top of the screened image — tames bright artwork (white
          posters etc.) so the hover text stays readable */}
      <span className="pointer-events-none absolute inset-0 bg-aa-blue opacity-0 transition-opacity duration-500 group-hover:opacity-55" />

      {/* Hover content layer — does NOT scale with the image */}
      <span className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span>
          <span className="block text-lg font-extrabold uppercase tracking-wide text-white">
            {project.title}
          </span>
          <span className="mt-1 block text-sm text-white/90">{project.subtitle}</span>
        </span>
        <span className="flex items-end justify-between">
          <span className="text-xs text-white/80">{project.tags}</span>
          {/* Design-style ↘ arrow */}
          <svg
            viewBox="0 0 48 48"
            className="h-12 w-12 -translate-x-2 -translate-y-2 text-white transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0 md:h-16 md:w-16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path d="M10 10l26 26M36 14v22H14" />
          </svg>
        </span>
      </span>
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
