import type { Metadata } from "next";
import Image from "next/image";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { SideTab } from "@/components/SideTab";
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
        {/* Hero */}
        <section className="aa-container pt-32 md:pt-40">
          <h1 className="aa-reveal text-center text-[clamp(4rem,13.5vw,14.63rem)] font-medium uppercase leading-[0.95] tracking-tight text-white">
            Dịch vụ
          </h1>
          <div className="aa-reveal mt-4">
            <Image
              src="/images/services-hero.webp"
              alt="ànART — không gian pixel art với chữ à và A"
              width={1480}
              height={615}
              priority
              className="h-auto w-full"
              sizes="100vw"
            />
          </div>
        </section>

        {/* Statement */}
        <section className="aa-container pt-24">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-5">
            <p className="aa-reveal aa-eyebrow self-start text-base lg:col-start-3 lg:col-span-2">Dịch vụ của ànART</p>
            <h2 className="aa-reveal text-[clamp(1.35rem,2.31vw,2.25rem)] font-medium uppercase leading-[1.35] text-white lg:col-start-5 lg:col-span-8">
              Chúng tôi kiến tạo nên những trải nghiệm độc đáo — nơi hình ảnh,
              không gian, câu chuyện tạo ra giá trị và dấu ấn bền vững cho
              thương hiệu.
            </h2>
          </div>
        </section>

        {/* Dấu ấn khác biệt / Hiệu quả + pixel horse */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="flex flex-wrap items-center justify-between gap-10 px-[max(1.25rem,2vw)]">
            <div className="aa-reveal">
              <p className="text-[clamp(2.25rem,4.95vw,4.78rem)] font-medium leading-none text-white">
                Dấu ấn khác biệt.
              </p>
              <p className="mt-3 pl-[18%] text-[clamp(1rem,2.03vw,1.97rem)] font-medium uppercase text-aa-blue">
                → More than a trend.
              </p>
            </div>
            <div className="aa-reveal" style={{ ["--reveal-delay" as string]: "120ms" }}>
              <Image
                src="/images/pixel-horse.webp"
                alt=""
                width={395}
                height={265}
                className="h-auto w-[220px] md:w-[320px]"
                aria-hidden
              />
            </div>
            <div className="aa-reveal text-right" style={{ ["--reveal-delay" as string]: "200ms" }}>
              <p className="text-[clamp(2.25rem,4.95vw,4.78rem)] font-medium leading-none text-white">
                Hiệu quả.
              </p>
              <p className="mt-3 text-[clamp(1rem,2.03vw,1.97rem)] font-medium uppercase text-aa-blue">
                It&rsquo;s a mindset.
              </p>
            </div>
          </div>
        </section>

        {/* Service rows — sticky stacked panels (zeit-style card deck on scroll) */}
        <section className="aa-container">
          {SERVICES.map((s) => (
            <article
              key={s.index}
              className="sticky top-20 grid items-center gap-10 border-t border-white/15 bg-black py-14 md:grid-cols-12 md:gap-5 md:py-16"
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
                <p className="mt-4 pl-8 text-sm leading-relaxed text-white/55">
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
