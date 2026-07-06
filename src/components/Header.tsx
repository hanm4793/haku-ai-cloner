"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FEATURED_LINKS, MENU_LINKS, NAV_LINKS } from "@/lib/data";
import { ArrowUpRightIcon, ZeitLogo } from "@/components/icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled && !open ? "bg-black/70 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="zeit-container flex items-center justify-between py-5">
          <Link href="/vn" aria-label="Zeit Media" className="relative z-[60] shrink-0">
            <ZeitLogo className="h-6 w-auto text-white" />
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-baseline gap-1.5 text-sm text-white/80 transition-colors hover:text-white"
              >
                <span className="text-[0.625rem] text-white/40">{link.index}</span>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 text-xs text-white/50 sm:flex">
              <Link href="/?r=0" className="transition-colors hover:text-white">EN</Link>
              <span className="text-white/25">/</span>
              <Link href="/vn" className="text-white">VI</Link>
            </div>
            <Link
              href="/vn/contact"
              className="hidden rounded-full border border-white/25 px-5 py-2 text-xs font-medium uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-black sm:inline-flex"
            >
              Liên hệ
            </Link>
            <button
              aria-label={open ? "Đóng menu" : "Mở menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative z-[60] flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-white/20 transition-colors hover:bg-white/10"
            >
              <span
                className={`block h-px w-4 bg-white transition-transform duration-300 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-4 bg-white transition-transform duration-300 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/85 backdrop-blur-xl transition-all duration-500 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="zeit-container flex h-full flex-col justify-center pt-24 pb-12">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            {/* Big nav links */}
            <nav className="flex flex-col">
              {MENU_LINKS.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center overflow-hidden py-1"
                  style={{
                    transform: open ? "translateY(0)" : "translateY(110%)",
                    opacity: open ? 1 : 0,
                    transition: `transform 0.7s cubic-bezier(0.625,0.05,0,1) ${
                      open ? 120 + i * 45 : 0
                    }ms, opacity 0.7s ease ${open ? 120 + i * 45 : 0}ms`,
                  }}
                >
                  <ArrowUpRightIcon className="mr-0 w-0 -translate-x-4 scale-0 text-white opacity-0 transition-all duration-500 group-hover:mr-4 group-hover:w-[0.5em] group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100" />
                  <span className="zeit-display text-[clamp(2.5rem,7vw,5rem)] font-medium leading-[1.1] text-white/70 transition-colors duration-300 group-hover:text-white">
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Featured projects */}
            <div className="flex flex-col gap-6">
              <span className="zeit-eyebrow">Dự án nổi bật</span>
              {FEATURED_LINKS.map((f) => (
                <Link
                  key={f.href}
                  href={f.href}
                  onClick={() => setOpen(false)}
                  className="group border-t border-white/10 pt-4"
                >
                  <span className="text-xs uppercase tracking-wide text-white/40">{f.tag}</span>
                  <p className="mt-1 text-lg font-medium uppercase leading-snug text-white/80 transition-colors group-hover:text-white">
                    {f.title}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs uppercase tracking-wide text-white/50 transition-colors group-hover:text-white">
                    {f.cta}
                    <ArrowUpRightIcon className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
              <div className="mt-2 flex items-center gap-3 text-sm text-white/50">
                <Link href="/?r=0" className="transition-colors hover:text-white">EN</Link>
                <span className="text-white/25">/</span>
                <Link href="/vn" className="text-white">VI</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
