import { Marquee } from "@/components/Marquee";

const TEXT =
  "zeit-display whitespace-nowrap px-[0.28em] text-[clamp(2.5rem,7vw,7rem)] font-medium leading-none text-white";

/** Rectangular marquee image — 272×136 on the original (2:1, square corners).
 *  Sized against the big-text scale (height ≈ 1.2× the 112px text). */
function MImage({ src }: { src: string }) {
  return (
    <span className="mx-[clamp(0.75rem,2vw,1.75rem)] inline-block aspect-[2/1] h-[clamp(3rem,8.4vw,8.4rem)] shrink-0 self-center overflow-hidden align-middle">
      <img src={src} alt="" className="h-full w-full object-cover" />
    </span>
  );
}

function RowOneUnit() {
  return (
    <span className="flex items-center">
      <span className={TEXT}>Khác Biệt</span>
      <MImage src="/images/diff-rect38.avif" />
      <span className={TEXT}>để Dẫn Đầu</span>
      <MImage src="/images/diff-main.avif" />
    </span>
  );
}

function RowTwoUnit() {
  return (
    <span className="flex items-center">
      <span className={TEXT}>Đó là tinh thần Zeit</span>
      <MImage src="/images/diff-1113.avif" />
      <span className={TEXT}>Kiến tạo chuẩn mực mới</span>
      <MImage src="/images/diff-haniff.avif" />
    </span>
  );
}

export function Differentiator() {
  return (
    <section className="w-full space-y-6 overflow-hidden py-24 md:py-36">
      <Marquee direction="right" speedDivisor={15} scrollVw={10}>
        <RowOneUnit />
        <RowOneUnit />
      </Marquee>
      <Marquee direction="left" speedDivisor={15} scrollVw={10}>
        <RowTwoUnit />
        <RowTwoUnit />
      </Marquee>
    </section>
  );
}
