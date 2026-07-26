import Image from "next/image";
import { Marquee } from "@/components/Marquee";

/** Gallery tiles from the home-page project stills — natural widths at 201px height.
 *  Only home_page_01..13 (home_page_08 doesn't exist); 14+ are used elsewhere. */
const GALLERY_ITEMS: { src: string; w: number }[] = [
  { src: "/images/home-image/home_page_01.webp", w: 201 },
  { src: "/images/home-image/home_page_02.webp", w: 302 },
  { src: "/images/home-image/home_page_03.webp", w: 201 },
  { src: "/images/home-image/home_page_04.webp", w: 302 },
  { src: "/images/home-image/home_page_05.webp", w: 423 },
  { src: "/images/home-image/home_page_06.webp", w: 201 },
  { src: "/images/home-image/home_page_07.webp", w: 302 },
  { src: "/images/home-image/home_page_09.webp", w: 201 },
  { src: "/images/home-image/home_page_10.webp", w: 201 },
  { src: "/images/home-image/home_page_11.webp", w: 460 },
  { src: "/images/home-image/home_page_12.webp", w: 431 },
  { src: "/images/home-image/home_page_13.webp", w: 283 },
];

/** Big "ànART àn Ạt ( Creative HUB x Experiences )" text marquee (left) +
 *  gallery image marquee (right) — two rows drifting in opposite directions. */
export function GalleryMarquee() {
  return (
    <section className="overflow-hidden pt-12 md:pt-56">
      {/* Background band around the two marquee rows + image strip. Generous
          fade-in at the top (into this section's own black padding above).
          The bottom has no padding/fade of its own — it stays flush at the
          same black/20 tint so it merges directly into Differentiator's
          band right below (that section's own pt-10/12 is the only gap,
          matching this component's own mt-10/14 rhythm between its two
          rows, instead of stacking two gaps on top of each other). */}
      <div className="relative pt-24 md:pt-36">
        <div className="absolute inset-0">
          <Image
            src="/images/home-image/home_page_14.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black via-black/20 to-black/20" />
        </div>

        <div className="relative">
        <Marquee direction="left" speedDivisor={18} scrollVw={8} className="items-baseline">
          <div className="flex flex-nowrap items-start gap-8 whitespace-nowrap px-4 leading-[1.1]">
            <span className="text-[clamp(3rem,6.19vw,5.91rem)] font-extrabold text-white">
              ànART
            </span>
            <span className="text-[clamp(1.25rem,2.4vw,2.3rem)] font-light leading-[1.45] text-white/70">
              àn Ạt
            </span>
            <span className="text-[clamp(3rem,6.19vw,5.91rem)] font-medium text-aa-blue">
              (Creative HUB x Experiences)
            </span>
          </div>
        </Marquee>

        <div className="mt-10 md:mt-14">
        <Marquee direction="right" speedDivisor={22} scrollVw={6}>
          <div className="flex flex-nowrap gap-5 pr-5">
            {GALLERY_ITEMS.map((item) => (
              <Image
                key={item.src}
                src={item.src}
                alt=""
                width={item.w}
                height={201}
                className="h-[140px] w-auto max-w-none shrink-0 md:h-[180px] lg:h-[201px]"
              />
            ))}
          </div>
        </Marquee>
        </div>
        </div>
      </div>
    </section>
  );
}
