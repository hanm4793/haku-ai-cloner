import Link from "next/link";

interface ProjectNavProps {
  backHref: string;
  nextHref: string;
}

const WORD =
  "text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-[1.05] tracking-tight";

/** Big BACK | NEXT switcher — the word slides up and a colored duplicate rises
 *  in from below on hover (caay.co-style). */
function NavWord({
  href,
  label,
  align,
}: {
  href: string;
  label: string;
  align: "left" | "right";
}) {
  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {/* default: outlined (stroke) */}
      <span
        className={`aa-outline-text block transition-transform duration-500 ease-out group-hover:-translate-y-[125%] ${WORD}`}
      >
        {label}
      </span>
      {/* hover: solid blue rises in from below */}
      <span
        aria-hidden
        className={`absolute left-0 top-0 block w-full translate-y-[115%] text-aa-blue transition-transform duration-500 ease-out group-hover:translate-y-0 ${WORD} ${
          align === "right" ? "text-right" : "text-left"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}

export function ProjectNav({ backHref, nextHref }: ProjectNavProps) {
  return (
    <section id="project-nav" className="aa-container pt-12 md:pt-16">
      <div className="flex flex-wrap items-center justify-between gap-8">
        {/* Share cluster */}
        <div className="flex items-center gap-4 text-xs text-white/60">
          <span className="text-white/40">[share]</span>
          <span className="flex items-center gap-3">
            {["facebook", "Instagram", "pinterest"].map((s, i) => (
              <span key={s} className="flex items-center gap-3">
                {i > 0 && <span className="text-white/25">|</span>}
                <a
                  href="#"
                  className="transition-colors hover:text-white"
                >
                  {s}
                </a>
              </span>
            ))}
          </span>
        </div>

        {/* BACK | NEXT */}
        <div className="flex items-center gap-6">
          <NavWord href={backHref} label="Back" align="left" />
          <span className="h-[clamp(2.5rem,6vw,4.5rem)] w-px bg-white/25" aria-hidden />
          <NavWord href={nextHref} label="Next" align="right" />
        </div>
      </div>
    </section>
  );
}
