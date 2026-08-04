import Link from "next/link";
import { MENU_LINKS } from "@/lib/data";
import { getSiteSettings } from "@/lib/cms";
import { ArrowUpRightIcon } from "@/components/icons";

interface PreFooterProps {
  /** heading suffix: "Bạn" on most pages, "U" on the contact page */
  partner?: string;
}

/** "— ànART® x Bạn" block + stacked nav rows + "Kết nối với ànART" bar.
 *  Mobile order matches the design: connect bar → brand line → 2×2 nav → follow. */
export async function PreFooter({ partner = "Bạn" }: PreFooterProps) {
  const CONTACT = await getSiteSettings();
  return (
    <section className="aa-container pb-6 pt-16 md:pt-24">
      {/* Mobile: Kết nối first (full-bleed bar). Desktop: sits with Follow us below. */}
      <Link
        href="/lien-he"
        className="aa-reveal group mb-10 flex items-center justify-between bg-white/[0.08] px-5 py-5 md:hidden"
      >
        <span className="text-base text-white transition-transform duration-300 group-hover:translate-x-1">
          Kết nối với ànART
        </span>
        <ArrowUpRightIcon className="h-7 w-7 shrink-0 text-white/70 transition-transform duration-300 group-hover:-translate-x-1 group-hover:translate-y-1" />
      </Link>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-x-0">
        <div className="aa-reveal">
          <p className="text-xl text-white">
            — ànART <sup className="text-[0.6em]">®</sup>{" "}
            <span className="font-bold">x {partner}</span>
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/55">
            Chúng ta hãy cùng hiện thực hoá những ý tưởng
            <br />
            và tạo ra những điểm chạm giá trị cho thương hiệu.
          </p>
        </div>

        <nav className="aa-reveal grid grid-flow-col grid-cols-2 grid-rows-2 gap-3 lg:flex lg:flex-col lg:gap-0">
          {MENU_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between border border-white/15 px-4 py-4 lg:border-x-0 lg:border-b-0 lg:border-t lg:px-8 lg:py-5"
            >
              <span className="flex items-start gap-1 text-sm text-white/60 transition-colors group-hover:text-white lg:text-base">
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
              <ArrowUpRightIcon className="h-5 w-5 shrink-0 text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white lg:h-6 lg:w-6" />
            </Link>
          ))}
        </nav>
      </div>

      {/* Follow us — mobile standalone row under the nav (design). Desktop keeps
          the paired Kết nối + Follow us strip. */}
      <div className="aa-reveal mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 md:hidden">
        <span className="text-sm text-white/45">Follow us</span>
        <div className="flex items-center gap-3 text-sm text-white/80">
          {CONTACT.socials.map((s, i) => (
            <span key={s.label} className="flex items-center gap-3">
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

      <div className="aa-reveal hidden gap-px sm:grid-cols-2 md:grid">
        <Link
          href="/lien-he"
          className="group flex items-center justify-between bg-white px-8 py-7"
        >
          <span className="text-base text-black transition-transform duration-300 group-hover:translate-x-1">
            Kết nối với ànART
          </span>
          <ArrowUpRightIcon className="h-9 w-9 shrink-0 text-black/70 transition-transform duration-300 group-hover:-translate-x-1 group-hover:translate-y-1" />
        </Link>
        <div className="flex flex-wrap items-center justify-center gap-8 bg-white/6 px-8 py-6">
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
