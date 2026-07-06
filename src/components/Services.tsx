import Link from "next/link";
import { SERVICES } from "@/lib/data";
import { ArrowUpRightIcon } from "@/components/icons";

export function Services() {
  return (
    <section className="w-full py-24 md:py-32">
      <div className="zeit-container">
        {/* Intro */}
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <span className="zeit-eyebrow zeit-reveal">Dịch vụ</span>
            <h2 className="zeit-reveal zeit-display mt-6 max-w-3xl text-[clamp(1.75rem,4vw,3rem)] font-medium leading-tight text-white">
              Chúng tôi kiến tạo trải nghiệm độc đáo, chạm cảm xúc và nâng tầm thương hiệu.
            </h2>
          </div>
          <Link href="/vn/services" className="zeit-pill zeit-reveal shrink-0">
            [ Tất cả dịch vụ ]
          </Link>
        </div>

        {/* Sticky stacked service panels */}
        <div className="mt-16">
          {SERVICES.map((service) => (
            <div
              key={service.index}
              className="sticky top-24 mb-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]"
            >
              <div className="grid items-stretch gap-0 md:grid-cols-2">
                <div className="flex flex-col justify-between p-8 md:p-12">
                  <span className="text-sm text-white/40">{service.index}</span>
                  <div className="mt-16">
                    <h3 className="zeit-display text-[clamp(1.75rem,4vw,3rem)] font-medium leading-tight text-white">
                      {service.title}
                    </h3>
                    <ul className="mt-6 space-y-3">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-base text-white/60"
                        >
                          <ArrowUpRightIcon className="mt-1 h-4 w-4 shrink-0 text-white/40" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="relative min-h-[240px] overflow-hidden md:min-h-full">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
