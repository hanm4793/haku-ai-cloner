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
          <h1 className="aa-reveal text-center text-[clamp(4rem,12vw,13rem)] font-medium uppercase leading-[0.95] tracking-tight text-white">
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
          <div className="grid gap-8 lg:grid-cols-[minmax(200px,320px)_1fr]">
            <p className="aa-reveal aa-eyebrow self-start text-base">Dịch vụ của ànART</p>
            <h2 className="aa-reveal text-[clamp(1.35rem,2.05vw,2rem)] font-medium uppercase leading-[1.35] text-white">
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
              <p className="text-[clamp(2.25rem,4.4vw,4.25rem)] font-medium leading-none text-white">
                Dấu ấn khác biệt.
              </p>
              <p className="mt-3 pl-[18%] text-[clamp(1rem,1.8vw,1.75rem)] font-medium uppercase text-aa-blue">
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
              <p className="text-[clamp(2.25rem,4.4vw,4.25rem)] font-medium leading-none text-white">
                Hiệu quả.
              </p>
              <p className="mt-3 text-[clamp(1rem,1.8vw,1.75rem)] font-medium uppercase text-aa-blue">
                It&rsquo;s a mindset.
              </p>
            </div>
          </div>
        </section>

        {/* Service rows */}
        <section className="aa-container">
          {SERVICES.map((s) => (
            <article
              key={s.index}
              className="aa-reveal grid items-center gap-10 border-t border-white/15 py-14 md:grid-cols-[minmax(120px,220px)_1fr_minmax(280px,500px)] md:py-16"
            >
              <p className="select-none text-[clamp(3.5rem,5vw,5rem)] font-light leading-none text-white/35">
                {s.index}
              </p>
              <div className="max-w-md">
                <p className="flex items-baseline gap-4 text-lg font-bold text-white">
                  <span className="text-white/50">—</span>
                  {s.title}{" "}
                  <sup className="text-[0.6em] text-white/50">({s.index})</sup>
                </p>
                <p className="mt-4 pl-8 text-sm leading-relaxed text-white/55">
                  {s.description}
                </p>
              </div>
              <div className="overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.en}
                  width={497}
                  height={336}
                  className="h-auto w-full transition-transform duration-700 ease-out hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>
            </article>
          ))}
          <div className="border-t border-white/15" />
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
