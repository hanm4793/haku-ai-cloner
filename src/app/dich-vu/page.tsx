import type { Metadata } from "next";
import Image from "next/image";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { SideTab } from "@/components/SideTab";
import { RevealTitle } from "@/components/RevealTitle";
import { ServicesStamp } from "@/components/ServicesStamp";
import { Define } from "@/components/Define";
import { PreFooter } from "@/components/PreFooter";
import { Footer } from "@/components/Footer";
import { SERVICES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Dịch vụ | ànART®",
  description:
    "Thiết kế không gian triển lãm, sự kiện / lễ hội, cảnh quan, mô hình nghệ thuật, thương hiệu và tổ chức sản xuất decor.",
};

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-black text-white">
      <SmoothScroll />
      <Header />
      <SideTab />
      <main className="flex-1">
        {/* Hero — ~1 viewport, cover banner; title + description overlay top */}
        <section className="relative h-dvh min-h-svh w-full overflow-hidden">
          <Image
            src="/images/service-image/service_01.webp"
            alt="ànART — không gian triển lãm"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Concept / Design / Production — desktop only */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-[1] hidden -translate-y-1/2 items-center justify-between px-[max(1.25rem,3vw)] text-sm uppercase tracking-wide text-white sm:text-base md:flex">
            <span>Concept.</span>
            <span>Design.</span>
            <span>Production.</span>
          </div>

          <div className="aa-container relative z-10 flex h-full flex-col items-center px-5 pt-[max(5.5rem,12vh)] text-center">
            <RevealTitle
              as="h1"
              lines={["Dịch vụ"]}
              className="text-[clamp(3rem,14vw,14.63rem)] font-medium uppercase leading-[0.95] tracking-tight text-white"
            />
            <p className="aa-reveal mt-5 max-w-[34rem] text-[0.8125rem] font-medium uppercase leading-[1.45] text-white md:mt-8 md:max-w-[42rem] md:text-base lg:text-lg">
              Chúng tôi kiến tạo nên những trải nghiệm độc đáo — nơi hình ảnh,
              không gian, câu chuyện tạo ra giá trị và dấu ấn bền vững cho
              thương hiệu.
            </p>
          </div>
        </section>

        {/* Dấu ấn khác biệt / Hiệu quả — single-row, scroll-pin horizontal */}
        <ServicesStamp />

        {/* Service rows — sticky stacked panels (zeit-style card deck on scroll) */}
        <section className="aa-container">
          {SERVICES.map((s) => (
            <article
              key={s.index}
              className="sticky top-20 grid items-start gap-10 border-t border-white/15 bg-black py-14 md:grid-cols-12 md:gap-5 md:py-16"
            >
              <p className="select-none text-[clamp(3.5rem,5.63vw,5.63rem)] font-light leading-none text-white/35 md:col-start-3 md:col-span-2">
                {s.index}
              </p>
              <div className="max-w-md md:col-start-5 md:col-span-4">
                <p className="relative text-lg font-bold text-white">
                  <span className="absolute -left-10 w-5 text-right text-white/50" aria-hidden>—</span>
                  {s.title}{" "}
                  <sup className="text-[0.6em] text-white/50">({s.index})</sup>
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/55">
                  {s.description}
                </p>
              </div>

              {/* Image + category watermark (real text, not baked into the image) */}
              <div className="relative pr-14 md:col-start-9 md:col-span-4 md:pr-[88px]">
                <div className="overflow-hidden">
                  <Image
                    src={s.image}
                    alt={`${s.cat[0]} ${s.cat[1]}`}
                    width={497}
                    height={336}
                    className="h-auto w-full transition-transform duration-700 ease-out hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
                <span className="pointer-events-none absolute right-0 top-0 select-none text-right leading-none text-white/25">
                  <span className="block text-[clamp(1.5rem,2.81vw,3.38rem)] font-light">
                    {s.cat[0]}
                  </span>
                  <span
                    className="mt-2 inline-block text-[clamp(1.5rem,2.81vw,3.38rem)] font-light"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    {s.cat[1]}
                  </span>
                </span>
                <span className="pointer-events-none absolute bottom-1 right-0 select-none text-[clamp(1rem,1.69vw,1.97rem)] font-light text-white/30">
                  –(<span className="font-bold">C</span>
                  <span className="text-[0.75em]">×</span>
                  <span className="font-bold">E</span>)
                </span>
              </div>
            </article>
          ))}
          <div className="relative z-10 border-t border-white/15 bg-black" />
        </section>

        {/* not speCiAL but DiFferent */}
        <Define
          words={["not\nspeCiAL", "but\nDiFferent"]}
          captions={["không đặc biệt", "chúng tôi tạo nên khác biệt"]}
        />
      </main>
      <PreFooter />
      <Footer />
    </div>
  );
}
