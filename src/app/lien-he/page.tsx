import type { Metadata } from "next";
import Image from "next/image";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { SideTab } from "@/components/SideTab";
import { PreFooter } from "@/components/PreFooter";
import { Footer } from "@/components/Footer";
import { CONTACT } from "@/lib/data";

export const metadata: Metadata = {
  title: "Liên hệ | ànART®",
  description:
    "Câu chuyện của bạn sẽ truyền cảm hứng cho chúng tôi. Gửi email đến hello@anart.vn.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-black text-white">
      <SmoothScroll />
      <Header />
      <SideTab />
      <main className="flex-1">
        {/* Hero */}
        <section className="aa-container pt-36 md:pt-44">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <h1 className="aa-reveal text-[clamp(3.5rem,7vw,7.75rem)] font-medium uppercase leading-[0.95] tracking-tight text-white">
              Liên hệ
            </h1>
            <div className="aa-reveal flex flex-col" style={{ ["--reveal-delay" as string]: "120ms" }}>
              <p className="text-[clamp(1.3rem,1.9vw,1.875rem)] font-medium uppercase leading-[1.35] text-white">
                Câu chuyện của bạn sẽ truyền cảm hứng cho chúng tôi.
              </p>

              <div className="mt-16">
                <span className="block h-px w-24 bg-white/60" />
                <p className="mt-6 text-lg text-white">gửi email đến</p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group mt-3 flex items-center justify-between gap-6 border-b border-white/40 pb-5"
                >
                  <span className="text-[clamp(1.9rem,3.4vw,3.25rem)] font-medium leading-none text-aa-yellow transition-opacity group-hover:opacity-80">
                    {CONTACT.email}
                  </span>
                  <svg
                    viewBox="0 0 48 24"
                    className="h-6 w-12 shrink-0 text-aa-yellow transition-transform duration-300 group-hover:translate-x-2"
                    fill="currentColor"
                  >
                    <path d="M0 10h36V4l12 8-12 8v-6H0v-4z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Pixel map banner */}
        <section className="aa-container pt-20">
          <div className="aa-reveal">
            <Image
              src="/images/contact-banner.webp"
              alt="Xin chào Bạn — hãy cùng nhau xây dựng những điều tuyệt vời đó ngay từ ngày hôm nay nhé."
              width={1836}
              height={466}
              className="h-auto w-full"
              sizes="100vw"
            />
          </div>
        </section>
      </main>
      <PreFooter partner="U" />
      <Footer />
    </div>
  );
}
