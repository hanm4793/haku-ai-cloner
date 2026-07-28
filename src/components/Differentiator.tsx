import Image from "next/image";
import { Marquee } from "@/components/Marquee";

const BIG = "whitespace-nowrap leading-[1.22] text-[clamp(2.5rem,5.85vw,5.63rem)]";

/** "Bứt phá SáNG TẠO ( Beyond Creativity ) Kiến tạo TRảI NGHIỆM ( Into Experiences )" */
function Unit() {
  return (
    <span className="flex items-baseline gap-[0.45em] px-[0.3em]">
      <span className={`${BIG} font-light text-white/80`}>Bứt phá</span>
      <span className={`${BIG} ml-[0.3em] font-extrabold text-white`}>SáNG TẠO</span>
      <span className={`${BIG} mx-[0.28em] font-medium text-aa-blue`}>(Beyond Creativity)</span>
      <span className={`${BIG} font-light text-white/80`}>Kiến tạo</span>
      <span className={`${BIG} ml-[0.3em] font-extrabold text-white`}>TRảI NGHIỆM</span>
      <span className={`${BIG} mx-[0.28em] font-medium text-aa-blue`}>(Into Experiences)</span>
    </span>
  );
}

export function Differentiator() {
  return (
    // spacing per design: strip → marquee ≈ 46px, marquee → services ≈ 306px
    <section className="relative w-full overflow-hidden pt-10 pb-24 md:pt-12 md:pb-72">
      {/* Background photo (native 1920×725, content centred with black bars
          baked into the file). object-contain so the WHOLE photo — including
          its own top/bottom black — always shows intact at every section
          height/viewport, flush with GalleryMarquee's photo right above it. */}
      <div className="absolute inset-0">
        <Image
          src="/images/home-image/home_page_14.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-contain"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className="relative">
        <Marquee direction="left" speedDivisor={15} scrollVw={10}>
          <Unit />
          <Unit />
        </Marquee>
      </div>
    </section>
  );
}
