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
        <div className="aa-container flex items-center justify-between py-4 lg:grid lg:grid-cols-12 lg:gap-5">
          <Link href="/" aria-label="ànART" className="relative z-[60] shrink-0 lg:col-span-3">
            <Image
              src="/images/logo-lockup.webp"
              alt="ànART® Creative Hub x Experiences"
              width={195}
              height={56}
              priority
              className="h-9 w-auto md:h-10"
            />
          </Link>

          <div className="flex items-center gap-6 md:gap-10 lg:col-span-5 lg:col-start-8 lg:justify-between">
            <Link
              href="/lien-he"
              className="text-sm font-medium uppercase text-white/85 transition-colors hover:text-white md:hidden"
            >
              liên hệ
            </Link>
            <nav
              className={`hidden items-center md:flex lg:w-full lg:justify-between ${
                open ? "md:invisible" : ""
              }`}
            >
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
                      <span className="text-[0.5rem] leading-none text-white/60 mt-0.5 lg:text-[0.5625rem]">
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
              className="relative z-[60] flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[6px]"
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
            {/* Left column — shown below the nav on mobile (design: Mobile p6).
                Each block slides up from behind its own overflow-hidden mask,
                staggered like the nav links, instead of appearing instantly. */}
            <div className="order-2 flex flex-col justify-start gap-10 lg:order-1 lg:gap-16">
              <div className="overflow-hidden">
                <div
                  style={{
                    transform: open ? "translateY(0)" : "translateY(110%)",
                    opacity: open ? 1 : 0,
                    transition: `transform 0.7s cubic-bezier(0.625,0.05,0,1) ${
                      open ? 80 : 0
                    }ms, opacity 0.7s ease ${open ? 80 : 0}ms`,
                  }}
                >
                  <span className="block h-px w-16 bg-white" />
                  <p className="mt-5 text-[1.75rem] font-extrabold uppercase leading-none tracking-tight text-white lg:text-[2.81rem]">
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
              </div>
              <div className="flex flex-col gap-6 text-white">
                {[
                  { label: "Office", value: CONTACT.office },
                  { label: "Hotline", value: CONTACT.hotline },
                  { label: "Email", value: CONTACT.email },
                ].map((item, i) => (
                  <div key={item.label} className="overflow-hidden">
                    <div
                      style={{
                        transform: open ? "translateY(0)" : "translateY(110%)",
                        opacity: open ? 1 : 0,
                        transition: `transform 0.7s cubic-bezier(0.625,0.05,0,1) ${
                          open ? 160 + i * 80 : 0
                        }ms, opacity 0.7s ease ${open ? 160 + i * 80 : 0}ms`,
                      }}
                    >
                      <p className="text-lg font-bold">{item.label}</p>
                      <p className="mt-1 text-sm text-white/90">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column — big nav (right-aligned on all sizes, per design) */}
            <nav className="order-1 flex flex-col items-end gap-2 text-right lg:order-2">
              {MENU_LINKS.map((link, i) => (
                <div key={link.href} className="overflow-hidden py-0.5">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group relative block overflow-hidden"
                    style={{
                      transform: open ? "translateY(0)" : "translateY(110%)",
                      opacity: open ? 1 : 0,
                      transition: `transform 0.7s cubic-bezier(0.625,0.05,0,1) ${
                        open ? 120 + i * 60 : 0
                      }ms, opacity 0.7s ease ${open ? 120 + i * 60 : 0}ms`,
                    }}
                  >
                    {/* Solid label — default state, slides up and out on hover */}
                    <span className="block text-[clamp(2.75rem,6.41vw,7.73rem)] font-black leading-[1.05] text-white transition-transform duration-500 ease-out group-hover:-translate-y-[125%]">
                      {link.label}
                    </span>
                    {/* Hollow outline duplicate — hidden below, slides up into view on hover */}
                    <span
                      aria-hidden
                      className="aa-outline-text absolute left-0 top-0 block translate-y-[110%] text-[clamp(2.75rem,6.41vw,7.73rem)] font-black leading-[1.05] transition-transform duration-500 ease-out group-hover:translate-y-0"
                    >
                      {link.label}
                    </span>
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom row */}
          <div className="overflow-hidden">
            <div
              className="flex flex-wrap items-end justify-between gap-6"
              style={{
                transform: open ? "translateY(0)" : "translateY(110%)",
                opacity: open ? 1 : 0,
                transition: `transform 0.7s cubic-bezier(0.625,0.05,0,1) ${
                  open ? 480 : 0
                }ms, opacity 0.7s ease ${open ? 480 : 0}ms`,
              }}
            >
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
      </div>
    </>
  );
}
