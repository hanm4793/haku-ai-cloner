import Link from "next/link";

export function CTA() {
  return (
    <section className="flex min-h-screen w-full items-center py-24">
      <div className="zeit-container w-full">
        <div className="zeit-reveal zeit-display text-[clamp(3rem,12vw,9.5rem)] font-semibold uppercase leading-[1.05] tracking-[-0.02em] text-white">
          <div>Hiện thực hóa</div>
          <div className="pl-[0.5em]">Ý tưởng</div>
          <div className="text-right">Đột phá</div>
        </div>

        <div className="mt-14 flex justify-center">
          <Link href="/vn/contact" className="zeit-pill px-8 py-4 text-base">
            [ Kết nối với Zeit ]
          </Link>
        </div>
      </div>
    </section>
  );
}
