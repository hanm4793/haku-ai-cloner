"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MENU_LINKS, NAV_LINKS, CONTACT } from "@/lib/data";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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

  // close menu when the route changes
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled && !open ? "bg-black/70 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="aa-container flex items-center justify-between py-4">
          <Link href="/" aria-label="ànART" className="relative z-[60] shrink-0">
            <Image
              src="/images/logo-lockup.png"
              alt="ànART® Creative Hub x Experiences"
              width={195}
              height={56}
              priority
              className="h-9 w-auto md:h-10"
            />
          </Link>

          <div className="flex items-center gap-6 md:gap-10">
            <Link
              href="/lien-he"
              className="text-sm font-medium uppercase text-white/85 transition-colors hover:text-white md:hidden"
            >
              liên hệ
            </Link>
            <nav className="hidden items-center gap-10 md:flex">
              {NAV_LINKS.map((link) => {
                const active =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group relative flex items-start gap-1 text-sm font-medium transition-colors ${
                      active ? "text-white" : "text-white/75 hover:text-white"
                    }`}
                  >
                    <span
                      className={`${
                        active ? "border-b border-white pb-0.5" : ""
                      }`}
                    >
                      {link.label}
                    </span>
                    {link.href === "/" && (
                      <span className="text-[0.5rem] leading-none text-white/60 mt-0.5">
                        /àn Ạt/
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <button
              aria-label={open ? "Đóng menu" : "Mở menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[6px]"
            >
              <span
                className={`block h-[2px] w-6 transition-all duration-300 ${
                  open ? "translate-y-[4px] rotate-45 bg-white" : "bg-white"
                }`}
              />
              <span
                className={`block h-[2px] w-6 transition-all duration-300 ${
                  open ? "-translate-y-[4px] -rotate-45 bg-white" : "bg-white"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen blue menu overlay — design 06 */}
      <div
        className={`fixed inset-0 z-40 bg-aa-blue transition-all duration-500 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="aa-container flex h-full flex-col justify-between overflow-y-auto pb-10 pt-24 lg:pt-36">
          <div className="grid flex-1 content-start gap-12 lg:grid-cols-2 lg:content-stretch">
            {/* Left column — shown below the nav on mobile (design: Mobile p6) */}
            <div className="order-2 flex flex-col justify-start gap-10 lg:order-1 lg:gap-16">
              <div>
                <span className="block h-px w-16 bg-white" />
                <p className="mt-5 text-[1.75rem] font-extrabold uppercase leading-none tracking-tight text-white lg:text-[2.5rem]">
                  Beyond
                  <br />
                  Creativity
                  <br />
                  Into
                  <br />
                  Experiences
                </p>
                <span className="mt-5 block h-px w-16 bg-white" />
              </div>
              <div className="flex flex-col gap-6 text-white">
                <div>
                  <p className="text-lg font-bold">Office</p>
                  <p className="mt-1 text-sm text-white/90">{CONTACT.office}</p>
                </div>
                <div>
                  <p className="text-lg font-bold">Hotline</p>
                  <p className="mt-1 text-sm text-white/90">{CONTACT.hotline}</p>
                </div>
                <div>
                  <p className="text-lg font-bold">Email</p>
                  <p className="mt-1 text-sm text-white/90">{CONTACT.email}</p>
                </div>
              </div>
            </div>

            {/* Right column — big nav (right-aligned on all sizes, per design) */}
            <nav className="order-1 flex flex-col items-end gap-2 text-right lg:order-2">
              {MENU_LINKS.map((link, i) => {
                const active =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group overflow-hidden py-0.5"
                    style={{
                      transform: open ? "translateY(0)" : "translateY(110%)",
                      opacity: open ? 1 : 0,
                      transition: `transform 0.7s cubic-bezier(0.625,0.05,0,1) ${
                        open ? 120 + i * 60 : 0
                      }ms, opacity 0.7s ease ${open ? 120 + i * 60 : 0}ms`,
                    }}
                  >
                    <span
                      className={`block text-[clamp(2.75rem,5.7vw,6.875rem)] font-black leading-[1.05] transition-all duration-300 ${
                        active
                          ? "aa-outline-text"
                          : "text-white group-hover:opacity-75"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom row */}
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex items-center gap-6 text-sm text-white">
              <span className="text-lg font-bold">Follow us</span>
              {CONTACT.socials.map((s, i) => (
                <span key={s.label} className="flex items-center gap-6">
                  {i > 0 && <span className="font-black">|</span>}
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-opacity hover:opacity-70"
                  >
                    {s.label}
                  </a>
                </span>
              ))}
            </div>
            <p className="text-lg text-white">
              — english / <span className="font-bold">vietnamese</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
