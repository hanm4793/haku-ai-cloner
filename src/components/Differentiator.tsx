import { Marquee } from "@/components/Marquee";

const BIG = "whitespace-nowrap leading-none text-[clamp(2.5rem,5.85vw,5.63rem)]";

/** "Bứt phá SáNG TẠO ( Beyond Creativity ) Kiến tạo TRảI NGHIỆM ( Into Experiences )" */
function Unit() {
  return (
    <span className="flex items-baseline gap-[0.45em] px-[0.3em]">
      <span className={`${BIG} font-light text-white/80`}>Bứt phá</span>
      <span className={`${BIG} font-extrabold text-white`}>SáNG TẠO</span>
      <span className={`${BIG} font-medium text-aa-blue`}>( Beyond Creativity )</span>
      <span className={`${BIG} font-light text-white/80`}>Kiến tạo</span>
      <span className={`${BIG} font-extrabold text-white`}>TRảI NGHIỆM</span>
      <span className={`${BIG} font-medium text-aa-blue`}>( Into Experiences )</span>
    </span>
  );
}

export function Differentiator() {
  return (
    // spacing per design: strip → marquee ≈ 46px, marquee → services ≈ 306px
    <section className="w-full overflow-hidden pt-10 pb-40 md:pt-12 md:pb-72">
      <Marquee direction="left" speedDivisor={15} scrollVw={10}>
        <Unit />
        <Unit />
      </Marquee>
    </section>
  );
}
