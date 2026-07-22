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
    <section className="overflow-hidden pt-32 md:pt-56">
      <Marquee direction="left" speedDivisor={18} scrollVw={8} className="items-baseline">
        <div className="flex flex-nowrap items-baseline gap-8 whitespace-nowrap px-4 leading-none">
          <span className="text-[clamp(3rem,6.19vw,5.91rem)] font-extrabold text-white">
            ànART
          </span>
          <span className="text-[clamp(2rem,4.05vw,3.94rem)] font-light text-white/70">
            àn Ạt
          </span>
          <span className="text-[clamp(3rem,6.19vw,5.91rem)] font-medium text-aa-blue">
            ( Creative HUB x Experiences )
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
    </section>
  );
}
