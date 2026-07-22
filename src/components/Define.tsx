import Image from "next/image";

interface DefineProps {
  /** big blue words: [left, right] */
  words?: [string, string];
  /** small captions under each word */
  captions?: [string, string];
}

/** "WE DeFINE / NOT DeCORATE" statement with the black àA sculpture. */
export function Define({
  words = ["WE\nDeFINE", "NOT\nDeCORATE"],
  captions = ["Không trang trí thương hiệu", "chúng tôi định hình bản sắc cho thương hiệu"],
}: DefineProps) {
  return (
    <section className="aa-container relative overflow-hidden py-20 md:py-28">
      {/* Background photo — bottom-aligned, faded into the black section
          background toward the top */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src="/images/home-image/home_page_23.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom"
          style={{ filter: "brightness(3.2)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/30 to-black" />
      </div>

      {/* Sculpture */}
      <div className="pointer-events-none relative z-10 mx-auto w-[78%] max-w-[760px] md:w-[52%]">
        <Image
          src="/images/sculpture-aa.webp"
          alt="Điêu khắc àA — ànART"
          width={1200}
          height={1126}
          className="h-auto w-full"
        />
      </div>

      {/* Left word */}
      <div className="aa-reveal relative z-10 md:absolute md:left-[max(1.25rem,2.4vw)] md:top-[38%]">
        <p className="whitespace-pre-line text-[clamp(3rem,7.88vw,9.56rem)] font-extrabold leading-[0.95] text-aa-blue">
          {words[0]}
        </p>
        <p className="mt-2 text-lg text-white/90">{captions[0]}</p>
      </div>

      {/* Right word */}
      <div
        className="aa-reveal relative z-10 mt-10 text-right md:absolute md:bottom-0 md:right-[max(1.25rem,2.4vw)] md:mt-0"
        style={{ ["--reveal-delay" as string]: "150ms" }}
      >
        <p className="whitespace-pre-line text-[clamp(3rem,7.88vw,9.56rem)] font-extrabold leading-[0.95] text-aa-blue">
          {words[1]}
        </p>
        <p className="mt-2 text-lg text-white/90">{captions[1]}</p>
      </div>
    </section>
  );
}
