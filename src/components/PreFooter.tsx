import Link from "next/link";
import { MENU_LINKS, CONTACT } from "@/lib/data";
import { ArrowUpRightIcon } from "@/components/icons";

interface PreFooterProps {
  /** heading suffix: "Bạn" on most pages, "U" on the contact page */
  partner?: string;
}

/** "— ànART® x Bạn" block + stacked nav rows + "Kết nối với ànART" bar. */
export function PreFooter({ partner = "Bạn" }: PreFooterProps) {
  return (
    <section className="aa-container pb-6 pt-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="aa-reveal">
          <p className="text-xl text-white">
            — ànART <sup className="text-[0.6em]">®</sup>{" "}
            <span className="font-bold">x {partner}</span>
          </p>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-white/55">
            Chúng ta hãy cùng hiện thực hoá những ý tưởng và tạo ra những điểm chạm giá
            trị cho thương hiệu.
          </p>
        </div>

        <nav className="aa-reveal flex flex-col">
          {MENU_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between border-t border-white/15 py-5 last:border-b"
            >
              <span className="flex items-start gap-1 text-base text-white/60 transition-colors group-hover:text-white">
                {link.label === "về ànArt" ? (
                  <>
                    về ànART
                    <span className="mt-0.5 text-[0.55rem] leading-none text-white/40">
                      /àn Ạt/
                    </span>
                  </>
                ) : (
                  link.label
                )}
              </span>
              <ArrowUpRightIcon className="h-4 w-4 text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
            </Link>
          ))}
        </nav>
      </div>

      {/* Kết nối bar + follow us */}
      <div className="aa-reveal mt-12 grid gap-px sm:grid-cols-2">
        <Link
          href="/lien-he"
          className="group flex items-center justify-between bg-white/[0.06] px-8 py-6 transition-colors hover:bg-aa-blue"
        >
          <span className="text-base text-white">Kết nối với ànART</span>
          <ArrowUpRightIcon className="h-5 w-5 text-white/60 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white/[0.06] px-8 py-6">
          <span className="text-base text-white/45">Follow us</span>
          <div className="flex items-center gap-4 text-xs text-white/80">
            {CONTACT.socials.map((s, i) => (
              <span key={s.label} className="flex items-center gap-4">
                {i > 0 && <span className="text-white/30">|</span>}
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {s.label}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
