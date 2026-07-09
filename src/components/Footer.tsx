import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/lib/data";

/** "Let's make ART." + orange 3D A + blue info block with the big wordmark. */
export function Footer() {
  return (
    <footer className="relative mt-10">
      {/* Let's make ART row */}
      <div className="aa-container relative flex items-end justify-between pb-0">
        <p className="aa-reveal pb-8 text-[clamp(2rem,3.4vw,4rem)] font-medium leading-none text-white">
          Let&rsquo;s make ART.
        </p>
        <div className="flex items-center gap-5 pb-10">
          <span className="hidden text-lg text-white/55 sm:block">not, done, yet</span>
          <span className="hidden text-2xl text-aa-yellow sm:block" aria-hidden>
            ⟶
          </span>
        </div>
        {/* Orange 3D A straddling the blue block edge */}
        <Image
          src="/images/letter-a-orange.png"
          alt=""
          width={190}
          height={215}
          className="pointer-events-none absolute bottom-[-60px] right-[16%] z-10 w-[110px] md:w-[150px] lg:w-[180px]"
          aria-hidden
        />
      </div>

      {/* Blue block */}
      <div className="bg-aa-blue">
        <div className="aa-container pt-12">
          <div className="grid gap-8 text-white sm:grid-cols-3">
            <div>
              <p className="text-lg font-bold">Office</p>
              <p className="mt-1 text-sm text-white/90">{CONTACT.office}</p>
            </div>
            <div className="sm:text-center">
              <p className="text-lg font-bold">Hotline</p>
              <p className="mt-1 text-sm text-white/90">{CONTACT.hotline}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-lg font-bold">Email</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-1 inline-block text-sm text-white/90 transition-opacity hover:opacity-70"
              >
                {CONTACT.email}
              </a>
            </div>
          </div>

          {/* Big wordmark row */}
          <div className="mt-14 flex flex-wrap items-end justify-between gap-10 pb-12">
            <Image
              src="/images/wordmark.png"
              alt="ànART®"
              width={1087}
              height={246}
              className="h-auto w-full max-w-[620px] lg:max-w-[56%]"
            />
            <Image
              src="/images/wordmark-anat.png"
              alt="| àn Ạt |"
              width={550}
              height={210}
              className="hidden h-auto w-full max-w-[300px] md:block lg:max-w-[28%]"
            />
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-white/25">
          <div className="aa-container flex flex-wrap items-center justify-between gap-2 py-4 text-xs text-white">
            <p>© 2026 by ànArt. All Rights Reserved.</p>
            <p>
              — eng / <Link href="/" className="font-bold">vie</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
