import Link from "next/link";
import { PROJECTS } from "@/lib/data";
import { ArrowUpRightIcon } from "@/components/icons";

export function Projects() {
  return (
    <section className="w-full py-24 md:py-32">
      <div className="zeit-container">
        {/* Header row */}
        <div className="flex items-end justify-between gap-8">
          <div>
            <span className="zeit-eyebrow zeit-reveal">Dự án</span>
            <h2 className="zeit-reveal zeit-display mt-6 text-[clamp(2rem,5vw,4rem)] font-medium text-white">
              Dự án nổi bật
            </h2>
          </div>
          <Link href="/vn/works" className="zeit-pill zeit-reveal shrink-0">
            [ Xem thêm ]
          </Link>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Link
              key={project.href}
              href={project.href}
              className="zeit-reveal group block"
              style={{ ["--reveal-delay" as string]: `${(i % 2) * 100}ms` }}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#111]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 text-xs uppercase tracking-wide text-white">
                  <span className="rounded-full bg-black/40 px-3 py-1 backdrop-blur-sm">
                    {project.year}
                  </span>
                  <span className="rounded-full bg-black/40 px-3 py-1 backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium uppercase leading-snug text-white">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/50">{project.client}</p>
                </div>
                <span className="mt-1 flex shrink-0 items-center gap-1 text-xs uppercase tracking-wide text-white/60 transition-colors group-hover:text-white">
                  Chi tiết
                  <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
