import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { SideTab } from "@/components/SideTab";
import { RevealTitle } from "@/components/RevealTitle";
import { ProjectNav } from "@/components/ProjectNav";
import { PreFooter } from "@/components/PreFooter";
import { Footer } from "@/components/Footer";
import { PROJECTS, PROJECT_DETAILS } from "@/lib/data";
import type { DetailBlock, ProjectDetail } from "@/types";

export function generateStaticParams() {
  return Object.keys(PROJECT_DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = PROJECT_DETAILS[slug];
  if (!detail) return { title: "Dự án | ànART®" };
  const title = detail.titleLines.join(" ");
  return {
    title: `${title} | ànART®`,
    description: detail.intro,
  };
}

/** Adjacent project slug (with wraparound). Links to the detail route when a
 *  case study exists, otherwise back to the list. */
function adjacentHref(currentSlug: string, dir: 1 | -1): string {
  const i = PROJECTS.findIndex((p) => p.slug === currentSlug);
  if (i === -1) return "/du-an";
  const next = PROJECTS[(i + dir + PROJECTS.length) % PROJECTS.length];
  return PROJECT_DETAILS[next.slug] ? `/du-an/${next.slug}` : "/du-an";
}

const GRID_COLS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

function ImagesBlock({ images }: { images: string[] }) {
  const cols = GRID_COLS[images.length] ?? "md:grid-cols-3";
  const sizes =
    images.length === 1
      ? "100vw"
      : images.length === 2
        ? "(max-width: 768px) 100vw, 50vw"
        : "(max-width: 768px) 100vw, 33vw";
  return (
    <section className="aa-container pt-5 md:pt-6">
      <div className={`grid grid-cols-1 gap-5 ${cols}`}>
        {images.map((src, i) => (
          <div
            key={src}
            className="aa-reveal overflow-hidden bg-white/[0.04]"
            style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
          >
            <Image
              src={src}
              alt=""
              width={1920}
              height={1208}
              className="aspect-[3/2] w-full object-cover"
              sizes={sizes}
              aria-hidden
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function TextBlock({
  heading,
  paragraphs,
  align = "split",
}: {
  heading?: string;
  paragraphs: string[];
  align?: "split" | "right";
}) {
  return (
    <section className="aa-container py-12 md:py-20">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-5">
        {align === "split" && heading && (
          <h2 className="aa-reveal text-[clamp(1.25rem,2.03vw,1.97rem)] font-medium uppercase leading-[1.3] text-white lg:col-span-5">
            {heading}
          </h2>
        )}
        <div
          className="aa-reveal flex flex-col gap-6 lg:col-span-6 lg:col-start-7"
          style={{ ["--reveal-delay" as string]: "100ms" }}
        >
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-[clamp(0.95rem,1.14vw,1.13rem)] leading-relaxed text-white/60"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function FullImage({
  src,
  captionLines,
  year,
}: {
  src: string;
  captionLines: string[];
  year: string;
}) {
  return (
    <section className="aa-container pt-5 md:pt-6">
      <div className="aa-reveal relative overflow-hidden">
        <Image
          src={src}
          alt={captionLines.join(" ")}
          width={1920}
          height={1208}
          className="h-auto w-full"
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-7">
          <span className="text-[0.7rem] uppercase leading-[1.35] tracking-wide text-white/85 md:text-xs">
            {captionLines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </span>
          <span className="text-[0.7rem] uppercase tracking-wide text-white/85 md:text-xs">
            {year}
          </span>
        </div>
      </div>
    </section>
  );
}

function Block({ block, detail }: { block: DetailBlock; detail: ProjectDetail }) {
  switch (block.type) {
    case "images":
      return <ImagesBlock images={block.images} />;
    case "text":
      return (
        <TextBlock
          heading={block.heading}
          paragraphs={block.paragraphs}
          align={block.align}
        />
      );
    case "full":
      return (
        <FullImage
          src={block.image}
          captionLines={detail.captionLines}
          year={detail.year}
        />
      );
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = PROJECT_DETAILS[slug];
  if (!detail) notFound();

  return (
    <div className="flex min-h-screen w-full flex-col bg-black text-white">
      <SmoothScroll />
      <Header />
      <SideTab />
      <main className="flex-1">
        {/* Hero — title + scope (left), intro + overview (right) */}
        <section className="aa-container pt-32 md:pt-40">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-5">
            <div className="lg:col-span-5">
              <RevealTitle
                as="h1"
                lines={detail.titleLines}
                className="text-[clamp(2.25rem,4.5vw,4.5rem)] font-extrabold uppercase leading-[0.98] tracking-tight text-aa-blue"
              />
              <div
                className="aa-reveal mt-10"
                style={{ ["--reveal-delay" as string]: "200ms" }}
              >
                <p className="text-sm font-medium uppercase tracking-wide text-white/70">
                  S.O.W
                </p>
                <ul className="mt-3 space-y-1 text-xs text-white/45">
                  {detail.scope.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="aa-reveal flex flex-col lg:col-span-7 lg:col-start-6"
              style={{ ["--reveal-delay" as string]: "150ms" }}
            >
              <p className="text-[clamp(1.05rem,1.56vw,1.5rem)] font-medium uppercase leading-[1.4] text-white">
                {detail.intro}
              </p>
              <div className="mt-10">
                <h2 className="text-[clamp(1.25rem,1.98vw,1.88rem)] font-medium uppercase text-aa-blue">
                  Tổng quan
                </h2>
                <div className="mt-5 flex flex-col gap-5">
                  {detail.overview.map((p, i) => (
                    <p
                      key={i}
                      className="text-[clamp(0.95rem,1.14vw,1.13rem)] leading-relaxed text-white/60"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content blocks */}
        <div className="pt-14 md:pt-20">
          {detail.blocks.map((block, i) => (
            <Block key={i} block={block} detail={detail} />
          ))}
        </div>

        {/* Prev / Next */}
        <ProjectNav
          backHref={adjacentHref(detail.slug, -1)}
          nextHref={adjacentHref(detail.slug, 1)}
        />
      </main>
      <PreFooter />
      <Footer />
    </div>
  );
}
