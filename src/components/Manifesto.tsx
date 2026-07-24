import Image from "next/image";

/** Intro line + spinning badge + Tôn chỉ / Tầm nhìn / Sứ mệnh block (home). */
export function Manifesto() {
  return (
    <section className="aa-container pb-8 pt-20 md:pb-28 md:pt-24">
      {/* Intro sentence — explicit breaks on <=480px match the design's line
          rhythm (leading "—" and "và" start their own lines). Slightly smaller
          type keeps each design-line from wrapping mid-phrase. */}
      <p className="aa-reveal mx-auto max-w-3xl text-center text-[1.125rem] leading-relaxed text-white/85 max-[480px]:text-[0.9375rem] md:text-[1.40625rem]">
        <span className="block min-[481px]:inline">Vượt khỏi điểm nhìn của thị giác </span>
        <span className="block whitespace-nowrap min-[481px]:inline min-[481px]:whitespace-normal">
          — mở rộng điểm chạm vào không gian,{" "}
        </span>
        <span className="block min-[481px]:inline">chuyển động, hình khối, âm thanh </span>
        <span className="block min-[481px]:inline">và hơn thế nữa.</span>
      </p>

      {/* Spinning badge stamp — only the outer ring (with the "ànArt Creative
          Agency" text) spins; the "aA." mark in the center is a separate,
          static layer stacked on top. */}
      <div className="aa-reveal mt-14 flex justify-center lg:mt-8">
        <div className="relative h-[180px] w-[180px] md:h-[210px] md:w-[210px]">
          <Image
            src="/images/badge-stamp.webp"
            alt="ànArt Creative Agency"
            width={520}
            height={520}
            className="aa-spin-slow absolute inset-0 h-full w-full"
          />
          <Image
            src="/images/badge-stamp-logo.webp"
            alt=""
            width={200}
            height={200}
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[38.5%] w-[38.5%] -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>

      {/* Mobile "Chúng tôi là" — centered single column per Mobile design p1:
          eyebrow → Tôn chỉ / Tầm nhìn / Sứ mệnh (equal weight) → tagline → àA
          badge line → Einstein. Desktop keeps the offset 12-col grid below. */}
      <div className="mt-14 flex flex-col items-center gap-10 text-center lg:hidden">
        <p className="aa-reveal aa-eyebrow justify-center text-[1.35rem] uppercase">Chúng tôi là</p>

        <div className="aa-reveal max-w-md">
          <p className="text-base text-white/85">— Tôn chỉ (01)</p>
          <p className="mt-3 text-sm leading-relaxed text-white/75">
            Nghệ thuật là điểm khởi đầu — ở đó mọi ý tưởng đều phải có giá trị
            thẩm mỹ và chiều sâu cảm nhận.
          </p>
        </div>

        <div className="aa-reveal max-w-md">
          <p className="text-base text-white/85">— Tầm nhìn (02)</p>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Trở thành đối tác thiết kế sáng tạo nơi nghệ thuật không chỉ được
            tạo ra, mà trở thành một hệ ngôn ngữ định hình cách thương hiệu tồn
            tại và được cảm nhận.
          </p>
        </div>

        <div className="aa-reveal max-w-md">
          <p className="text-base text-white/85">— Sứ mệnh (03)</p>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Chuyển hoá ý tưởng thành những trải nghiệm nghệ thuật có giá trị
            thực — nơi mỗi thiết kế, mỗi định hướng sáng tạo không chỉ đẹp, mà
            còn tạo ra khác biệt, cảm xúc và hiệu quả cho thương hiệu.
          </p>
        </div>

        <span className="aa-reveal block h-px w-10 bg-white/40" />

        <div className="aa-reveal flex flex-col items-center gap-5">
          <p className="text-base uppercase leading-relaxed tracking-wide text-white/60">
            Lấy nghệ thuật làm gốc.
            <br />
            Sáng tạo có mục đích.
            <br />
            Trải nghiệm là trung tâm.
            <br />
            Hiệu quả là đích đến.
          </p>
          <p className="text-sm text-white/70">
            — ànART <sup className="text-[0.6em]">®</sup>
          </p>

          <Image
            src="/images/einstein.webp"
            alt="Einstein đeo kính àA"
            width={428}
            height={428}
            className="h-auto w-[300px]"
          />
        </div>
      </div>

      {/* Tôn chỉ + Chúng tôi là — 12-col grid: text(2-5) / einstein(6-7) / text(8-11).
          Per design, the einstein image's bottom lines up with the right
          column's bottom, while the left heading's bottom only reaches about
          ear-height on the image — so "Chúng tôi là" and the image are pushed
          down from the row top with calculated offsets, not simple stretch. */}
      <div className="mt-24 hidden gap-16 lg:grid lg:grid-cols-12 lg:items-start lg:gap-5">
        {/* Left: big statement, right-aligned like the design (centered on mobile) */}
        <div className="aa-reveal text-center lg:col-start-2 lg:col-span-4 lg:-mt-16 lg:text-right">
          <p className="text-base text-white/85">— Tôn chỉ (01)</p>
          <h2 className="mt-5 text-[clamp(1.9rem,3.38vw,3.23rem)] font-normal leading-[1.22] text-white">
            Nghệ thuật
            <br className="hidden lg:block" /> là điểm khởi đầu
            <br className="hidden lg:block" /> — ở đó
            <br className="hidden lg:block" /> mọi ý tưởng
            <br className="hidden lg:block" /> đều phải có
            <br className="hidden lg:block" /> giá trị thẩm mỹ
            <br className="hidden lg:block" /> và chiều sâu
            <br className="hidden lg:block" /> cảm nhận.
          </h2>
        </div>

        {/* Einstein column — hidden on mobile (per Mobile design).
            lg:mt pushes the image down so its bottom lands on the right
            column's bottom, per design (not top-aligned with the others). */}
        <div
          className="aa-reveal col-span-2 mx-auto hidden w-full max-w-[240px] flex-col gap-5 sm:flex lg:col-start-6 lg:mt-[17rem]"
          style={{ ["--reveal-delay" as string]: "120ms" }}
        >
          <Image
            src="/images/einstein.webp"
            alt="Einstein đeo kính àA"
            width={428}
            height={428}
            className="h-auto w-full"
          />
          <p className="text-[0.7rem] uppercase leading-relaxed tracking-wide text-white/45 lg:text-[0.79rem]">
            Lấy nghệ thuật làm gốc.
            <br />
            Sáng tạo có mục đích.
            <br />
            Trải nghiệm là trung tâm.
            <br />
            Hiệu quả là đích đến.
          </p>
          <p className="text-xs text-white/60">
            — ànART <sup className="text-[0.6em]">®</sup>
          </p>
        </div>

        <div
          className="aa-reveal flex flex-col gap-8 text-center sm:text-left lg:col-start-8 lg:col-span-4 lg:mt-[14.6rem]"
          style={{ ["--reveal-delay" as string]: "200ms" }}
        >
          <p className="aa-eyebrow justify-center text-xl sm:justify-start">Chúng tôi là</p>
          <div>
            <p className="text-base text-white/85">— Tầm nhìn (02)</p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Trở thành đối tác thiết kế sáng tạo nơi nghệ thuật không chỉ được
              tạo ra, mà trở thành một hệ ngôn ngữ định hình cách thương hiệu
              tồn tại và được cảm nhận.
            </p>
          </div>
          <div>
            <p className="text-base text-white/85">— Sứ mệnh (03)</p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Chuyển hoá ý tưởng thành những trải nghiệm nghệ thuật có giá trị
              thực — nơi mỗi thiết kế, mỗi định hướng sáng tạo không chỉ đẹp,
              mà còn tạo ra khác biệt, cảm xúc và hiệu quả cho thương hiệu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
