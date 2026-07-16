import Image from "next/image";

/** Intro line + spinning badge + Tôn chỉ / Tầm nhìn / Sứ mệnh block (home). */
export function Manifesto() {
  return (
    <section className="aa-container pb-28 pt-24">
      {/* Intro sentence */}
      <p className="aa-reveal mx-auto max-w-3xl text-center text-lg leading-relaxed text-white/85 md:text-xl">
        Vượt khỏi điểm nhìn của thị giác — mở rộng điểm chạm vào không gian,
        chuyển động, hình khối, âm thanh và hơn thế nữa.
      </p>

      {/* Spinning badge stamp */}
      <div className="aa-reveal mt-16 flex justify-center">
        <Image
          src="/images/badge-stamp.webp"
          alt="ànArt Creative Agency"
          width={148}
          height={155}
          className="aa-spin-slow h-auto w-[120px] md:w-[140px]"
        />
      </div>

      {/* Tôn chỉ + Chúng tôi là — 12-col grid: text(2-5) / einstein(6-7) / text(8-11).
          Per design, the einstein image's bottom lines up with the right
          column's bottom, while the left heading's bottom only reaches about
          ear-height on the image — so "Chúng tôi là" and the image are pushed
          down from the row top with calculated offsets, not simple stretch. */}
      <div className="mt-24 grid gap-16 lg:grid-cols-12 lg:items-start lg:gap-5">
        {/* Left: big statement, right-aligned like the design (centered on mobile) */}
        <div className="aa-reveal text-center lg:col-start-2 lg:col-span-4 lg:-mt-16 lg:text-right">
          <p className="text-base text-white/85">— Tôn chỉ (01)</p>
          <h2 className="mt-5 text-[clamp(1.9rem,3vw,2.875rem)] font-normal leading-[1.22] text-white">
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
          <p className="text-[0.7rem] uppercase leading-relaxed tracking-wide text-white/45">
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
