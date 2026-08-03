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

const BIG = "whitespace-nowrap leading-[1.22] text-[clamp(2.5rem,5.85vw,5.63rem)]";

/** "Bứt phá SáNG TẠO ( Beyond Creativity ) Kiến tạo TRảI NGHIỆM ( Into Experiences )" */
function DifferentiatorUnit() {
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

/** Big "ànART àn Ạt ( Creative HUB x Experiences )" text marquee + gallery
 *  image marquee, immediately followed by the "Bứt phá SáNG TẠO..."
 *  marquee — three rows sharing ONE background photo (native 1920×725,
 *  content centred with black bars baked into the file). Previously each
 *  half rendered its own independent copy of that photo, object-contain'd
 *  into its own differently-sized box, which visibly duplicated/seamed at
 *  the boundary between the two; now there's a single image, sized to its
 *  native ratio and vertically centred across the whole content block (the
 *  tall black gap before ServicesHome sits outside that block, untouched). */
export function GalleryMarquee() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 aspect-1920/725 w-full -translate-y-1/2">
          <Image
            src="/images/home-image/home_page_14.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative pt-12 md:pt-56">
          <div className="relative pt-24 md:pt-36">
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

        <div className="relative pt-10 md:pt-12">
          <Marquee direction="left" speedDivisor={15} scrollVw={10}>
            <DifferentiatorUnit />
            <DifferentiatorUnit />
          </Marquee>
        </div>
      </div>

      {/* spacing per design: marquee → services ≈ 306px — plain black, no photo */}
      <div className="pb-24 md:pb-72" />
    </section>
  );
}
