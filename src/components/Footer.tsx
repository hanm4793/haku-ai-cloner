import Link from "next/link";
import { CONTACT, NAV_LINKS } from "@/lib/data";
import {
  ZeitLogo,
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  BehanceIcon,
} from "@/components/icons";

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  FB: FacebookIcon,
  IG: InstagramIcon,
  TIKTOK: TiktokIcon,
  BEHANCE: BehanceIcon,
};

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black pt-20 pb-10">
      <div className="zeit-container">
        {/* Top: brand statement + nav */}
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <ZeitLogo className="h-8 w-auto text-white" />
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/60">
              Mang đến sự khác biệt cho hành trình thành công của từng thương hiệu với
              ý tưởng đột phá và năng lực sáng tạo vượt trội, giúp thương hiệu vươn đến
              vị thế dẫn đầu.
            </p>
            <Link
              href="/vn/contact"
              className="zeit-pill mt-8 px-7 py-3.5 text-sm"
            >
              Kết nối với Zeit
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm uppercase tracking-wide text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div>
              <p className="zeit-eyebrow">Địa chỉ</p>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-white/60">
                {CONTACT.addresses.map((addr) => (
                  <p key={addr}>{addr}</p>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <p className="zeit-eyebrow">Email</p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="mt-3 block text-sm text-white/60 transition-colors hover:text-white"
                >
                  {CONTACT.email}
                </a>
              </div>
              <div>
                <p className="zeit-eyebrow">Hotline</p>
                <a
                  href="tel:+84848488686"
                  className="mt-3 block text-sm text-white/60 transition-colors hover:text-white"
                >
                  {CONTACT.hotline}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs uppercase tracking-wide text-white/40">
            © 2025 Zeit Media. All rights reserved
          </p>
          <div className="flex items-center gap-3">
            {CONTACT.socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.label];
              return (
                <Link
                  key={social.href}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white hover:text-white"
                >
                  {Icon ? <Icon className="h-4 w-4" /> : social.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
