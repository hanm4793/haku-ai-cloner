import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";
import { Stats } from "@/components/Stats";

export function About() {
  return (
    <section className="relative w-full py-24 md:py-32">
      <div className="zeit-container">
        <span className="zeit-eyebrow zeit-reveal">Về Zeit</span>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h2 className="zeit-reveal zeit-display text-[clamp(2.5rem,6.5vw,6.25rem)] text-white">
            Creative Agency hàng đầu Việt Nam
          </h2>
          <div className="zeit-reveal" style={{ ["--reveal-delay" as string]: "120ms" }}>
            <p className="max-w-md text-base leading-relaxed text-white/70">
              Zeit là agency hàng đầu trong lĩnh vực tổ chức sự kiện, quảng cáo sáng
              tạo và tư vấn thương hiệu, mang đến những trải nghiệm nghệ thuật khác
              biệt được dẫn dắt bởi một tầm nhìn độc đáo.
            </p>
            <Link
              href="/vn/about"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-white"
            >
              Tìm hiểu thêm
              <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Feature image */}
        <div className="zeit-reveal mt-14 aspect-[16/8] w-full overflow-hidden rounded-2xl">
          <img
            src="/images/hero-orchestra.jpg"
            alt="Zeit sự kiện"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Stats — parallax background block */}
        <Stats />
      </div>
    </section>
  );
}
