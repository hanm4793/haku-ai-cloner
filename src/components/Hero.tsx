import Image from "next/image";
import { CONTACT } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden">
      <Image
        src="/images/hero-exhibition.webp"
        alt="ànART — không gian triển lãm Vietcombank"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/25" />

      {/* Centered headline */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 text-center">
        <h1 className="text-[clamp(2.25rem,5.4vw,5.06rem)] font-extrabold uppercase leading-[1.08] tracking-tight text-white">
          <span className="aa-reveal block">Beyond Creativity</span>
          <span className="aa-reveal block" style={{ ["--reveal-delay" as string]: "150ms" }}>
            Into
          </span>
          <span className="aa-reveal block" style={{ ["--reveal-delay" as string]: "300ms" }}>
            Experiences
          </span>
        </h1>
        <svg
          viewBox="0 0 48 20"
          className="aa-reveal mt-8 h-5 w-12 text-white"
          style={{ ["--reveal-delay" as string]: "1300ms" }}
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path d="M2 2l22 14L46 2" />
        </svg>
      </div>

      {/* Bottom bar */}
      <div className="aa-container relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6">
        <div className="flex items-center gap-3 text-sm sm:gap-5">
          <span className="font-medium text-aa-blue">Follow us</span>
          {CONTACT.socials.map((s, i) => (
            <span key={s.label} className="flex items-center gap-5 text-white">
              {i > 0 && <span className="text-white/60">|</span>}
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="transition-opacity hover:opacity-70"
              >
                {s.label}
              </a>
            </span>
          ))}
        </div>
        <p className="hidden text-sm font-medium text-aa-blue sm:block">— ànArt © 2026</p>
      </div>
    </section>
  );
}
