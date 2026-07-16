import Image from "next/image";
import { Marquee } from "@/components/Marquee";

/** Gallery tiles cropped from the design strip — natural widths at 201px height. */
const GALLERY_ITEMS: { src: string; w: number }[] = [
  { src: "/images/gal-1.webp", w: 147 },
  { src: "/images/gal-2.webp", w: 301 },
  { src: "/images/gal-3.webp", w: 201 },
  { src: "/images/gal-4.webp", w: 302 },
  { src: "/images/gal-5.webp", w: 422 },
  { src: "/images/gal-6.webp", w: 200 },
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
