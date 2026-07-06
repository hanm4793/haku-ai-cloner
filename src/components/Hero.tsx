import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero-cover.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero-orchestra.jpg"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />

      {/* Content */}
      <div className="zeit-container relative z-10 flex flex-1 flex-col justify-between pb-10 pt-28">
        {/* Top row: latest project + socials */}
        <div className="flex flex-wrap items-start justify-between gap-6">
          <Link href="/vn/work/osun-fest" className="group max-w-xs">
            <span className="zeit-eyebrow block">Dự án mới nhất</span>
            <span className="mt-1 flex items-center gap-2 text-base font-medium text-white transition-opacity group-hover:opacity-70">
              OSUN FEST
            </span>
          </Link>
          <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-white/60">
            <Link href="https://www.instagram.com/zeitmedia.vn" className="transition-colors hover:text-white">IG</Link>
            <span className="text-white/30">/</span>
            <Link href="https://www.facebook.com/ZeitMediaVN" className="transition-colors hover:text-white">FB</Link>
            <span className="text-white/30">/</span>
            <Link href="https://www.behance.net/ZeitMediaVN" className="transition-colors hover:text-white">Behance</Link>
          </div>
        </div>

        {/* Bottom block: title + CTAs */}
        <div>
          <h1 className="zeit-display max-w-[16ch] text-[clamp(2.75rem,7vw,5rem)] text-white">
            Art Comes First — Creative Above All
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/vn/works" className="zeit-pill">[ Tất cả dự án ]</Link>
            <Link href="/vn" className="zeit-pill">[ Show reel ]</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
