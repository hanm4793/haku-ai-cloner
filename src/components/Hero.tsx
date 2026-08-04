import { getSiteSettings, getHomePage } from "@/lib/cms";
import { RevealTitle } from "@/components/RevealTitle";
import { HeroBackground } from "@/components/HeroBackground";

export async function Hero() {
  const [CONTACT, homePage] = await Promise.all([getSiteSettings(), getHomePage()]);
  const heroLines = homePage.heroHeading.length
    ? homePage.heroHeading
    : ["Beyond Creativity", "Into", "Experiences"];

  return (
    /* h-dvh tracks browser chrome show/hide; min-h-svh keeps a full first
       screen even when the dynamic viewport temporarily shrinks. */
    <section className="relative flex h-dvh min-h-svh w-full flex-col overflow-hidden">
      <HeroBackground />
      <div className="absolute inset-0 bg-black/25" />

      {/* Centered headline */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 text-center">
        <RevealTitle
          as="h1"
          lines={heroLines}
          stagger={130}
          className="text-[clamp(2.25rem,5.4vw,5.06rem)] font-extrabold uppercase leading-[1.08] tracking-tight text-white"
        />
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

      {/* Bottom bar — always pinned to the first-screen foot */}
      <div className="aa-container relative z-10 flex items-center justify-between gap-2 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-[0.65rem] leading-none sm:gap-4 sm:pb-6 sm:text-sm">
        <div className="flex min-w-0 flex-nowrap items-center gap-x-1.5 overflow-hidden sm:gap-x-5">
          <span className="shrink-0 font-medium text-aa-blue">Follow us</span>
          {CONTACT.socials.map((s, i) => (
            <span key={s.label} className="flex shrink-0 items-center gap-x-1.5 text-white sm:gap-x-5">
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
        <p className="shrink-0 font-medium text-aa-blue">— ànArt © 2026</p>
      </div>
    </section>
  );
}
