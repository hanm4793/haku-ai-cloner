import Image from "next/image";

interface DefineProps {
  /** big blue words: [left, right] */
  words?: [string, string];
  /** small captions under each word */
  captions?: [string, string];
}

/** "WE DeFINE / NOT DeCORATE" statement with the black àA sculpture.
 *  Mobile: tight top (less gap after Partners), type sits low on the
 *  sculpture — left mid-low, right near the bottom edge (design). */
export function Define({
  words = ["WE\nDeFINE", "NOT\nDeCORATE"],
  captions = ["Không trang trí thương hiệu", "chúng tôi định hình bản sắc cho thương hiệu"],
}: DefineProps) {
  return (
    <section className="aa-container relative overflow-hidden pt-1 pb-8 md:py-28">
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

      {/* Sculpture — relative anchor; mobile pulls it up (less empty top) */}
      <div className="pointer-events-none relative z-10 mx-auto aspect-square w-[96%] max-w-[760px] md:aspect-auto md:w-[52%]">
        <Image
          src="/images/sculpture-aa.webp"
          alt="Điêu khắc àA — ànART"
          width={1200}
          height={1126}
          className="absolute inset-0 h-full w-full object-contain object-top md:relative md:h-auto md:w-full md:object-center"
        />
      </div>

      {/* Left word — mid-low on the sculpture (design); was too high at 18% */}
      <div className="aa-reveal absolute left-[max(0.75rem,2vw)] top-auto bottom-[32%] z-10 md:bottom-auto md:left-[max(1.25rem,2.4vw)] md:top-[38%]">
        <p className="whitespace-pre-line text-[1.875rem] font-extrabold leading-[0.92] text-aa-blue md:text-[clamp(3rem,7.88vw,9.56rem)]">
          {words[0]}
        </p>
        <p className="mt-1 max-w-[11rem] text-[0.6875rem] leading-snug text-white/90 md:mt-2 md:max-w-none md:text-lg">
          {captions[0]}
        </p>
      </div>

      {/* Right word — bottom-right, flush low on mobile */}
      <div
        className="aa-reveal absolute bottom-[2%] right-[max(0.75rem,2vw)] z-10 text-right md:bottom-0 md:right-[max(1.25rem,2.4vw)]"
        style={{ ["--reveal-delay" as string]: "150ms" }}
      >
        <p className="whitespace-pre-line text-[1.875rem] font-extrabold leading-[0.92] text-aa-blue md:text-[clamp(3rem,7.88vw,9.56rem)]">
          {words[1]}
        </p>
        <p className="mt-1 ml-auto max-w-[12rem] text-[0.6875rem] leading-snug text-white/90 md:mt-2 md:max-w-none md:text-lg">
          {captions[1]}
        </p>
      </div>
    </section>
  );
}
