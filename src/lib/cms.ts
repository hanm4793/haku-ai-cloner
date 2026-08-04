import qs from "qs";
import type { Project, ProjectDetail, DetailBlock, Service } from "@/types";

/** Strapi base URL — server-only env var (all fetches happen in Server
 *  Components / route handlers). Public read permissions are enabled on
 *  every content type used here, so no API token is needed. */
const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";

/** Revalidate CMS-backed pages every 60s (ISR) instead of on every request —
 *  content here doesn't need to be instantaneous, and this keeps build/dev
 *  fast. */
const REVALIDATE_SECONDS = 60;

async function strapiFetch<T>(path: string, query?: Record<string, unknown>): Promise<T> {
  const qsStr = query ? `?${qs.stringify(query, { encodeValuesOnly: true })}` : "";
  const res = await fetch(`${STRAPI_URL}/api${path}${qsStr}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) {
    throw new Error(`Strapi fetch failed (${res.status}): ${path}`);
  }
  return res.json() as Promise<T>;
}

function mediaUrl(media: { url: string } | null | undefined): string {
  if (!media?.url) return "";
  return media.url.startsWith("http") ? media.url : `${STRAPI_URL}${media.url}`;
}

function linesFrom(text: string | null | undefined): string[] {
  return (text ?? "").split("\n").map((l) => l.trim()).filter(Boolean);
}

// ---- Raw Strapi v5 response shapes (flat — no `.attributes` wrapper) ----

interface StrapiMedia {
  url: string;
}

interface StrapiCategory {
  id: number;
  name: string;
}

interface StrapiStringItem {
  id: number;
  value: string;
}

type StrapiBlock =
  | { __component: "block.full-image"; image: StrapiMedia | null }
  | {
      __component: "block.text";
      heading: string | null;
      align: "split" | "right" | null;
      paragraphs: StrapiStringItem[];
    }
  | { __component: "block.images-grid"; images: StrapiMedia[] };

interface StrapiProject {
  slug: string;
  title: string;
  subtitle: string | null;
  tags: string | null;
  categories: StrapiCategory[];
  image: StrapiMedia | null;
  size: "wide" | "small" | "tall";
  featured: boolean;
  titleLines: string | null;
  scope: StrapiStringItem[];
  intro: string | null;
  overview: StrapiStringItem[];
  captionLines: string | null;
  blocks: StrapiBlock[];
}

interface StrapiService {
  index: string;
  title: string;
  catHorizontal: string;
  catVertical: string;
  description: string;
  image: StrapiMedia | null;
}

interface StrapiSocialLink {
  label: string;
  href: string;
}

interface StrapiSiteSettings {
  office: string;
  hotline: string;
  email: string;
  socials: StrapiSocialLink[];
}

interface StrapiClientLine {
  clients: StrapiStringItem[];
}

interface StrapiHomePage {
  heroHeading: StrapiStringItem[];
  manifestoIntro: string | null;
  tonChiBody: string | null;
  tamNhinBody: string | null;
  suMenhBody: string | null;
  clientLines: StrapiClientLine[];
}

// ---- Mappers: Strapi shape -> existing frontend types (src/types) ----

function mapProject(p: StrapiProject): Project {
  return {
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle ?? "",
    tags: p.tags ?? "",
    categories: (p.categories ?? []).map((c) => c.name),
    image: mediaUrl(p.image),
    size: p.size,
    hasCaseStudy: (p.blocks ?? []).length > 0,
  };
}

function mapBlock(b: StrapiBlock): DetailBlock {
  switch (b.__component) {
    case "block.full-image":
      return { type: "full", image: mediaUrl(b.image) };
    case "block.text":
      return {
        type: "text",
        heading: b.heading ?? undefined,
        align: b.align ?? undefined,
        paragraphs: (b.paragraphs ?? []).map((i) => i.value),
      };
    case "block.images-grid":
      return { type: "images", images: (b.images ?? []).map(mediaUrl) };
  }
}

function mapProjectDetail(p: StrapiProject): ProjectDetail {
  return {
    slug: p.slug,
    titleLines: linesFrom(p.titleLines),
    scope: (p.scope ?? []).map((i) => i.value),
    intro: p.intro ?? "",
    overview: (p.overview ?? []).map((i) => i.value),
    captionLines: linesFrom(p.captionLines),
    blocks: (p.blocks ?? []).map(mapBlock),
  };
}

function mapService(s: StrapiService): Service {
  return {
    index: s.index,
    title: s.title,
    cat: [s.catHorizontal, s.catVertical],
    description: s.description,
    image: mediaUrl(s.image),
  };
}

export interface ContactInfo {
  office: string;
  hotline: string;
  email: string;
  socials: { label: string; href: string }[];
}

export interface HomePageContent {
  heroHeading: string[];
  manifestoIntro: string;
  tonChiBody: string;
  tamNhinBody: string;
  suMenhBody: string;
  /** Client roster, grouped into rows exactly as rendered (Clients.tsx). */
  clientLines: string[][];
}

// ---- Public API ----

/** Project cards for the homepage grid + /du-an listing — no case-study
 *  fields (those are fetched separately, only for the detail page). */
export async function getProjects(): Promise<Project[]> {
  const json = await strapiFetch<{ data: StrapiProject[] }>("/projects", {
    populate: ["image", "categories", "blocks"],
    sort: ["id:asc"],
    pagination: { pageSize: 100 },
  });
  return json.data.map(mapProject);
}

/** Homepage "Dự án nổi bật" subset. */
export async function getFeaturedProjects(): Promise<Project[]> {
  const json = await strapiFetch<{ data: StrapiProject[] }>("/projects", {
    populate: ["image", "categories", "blocks"],
    filters: { featured: { $eq: true } },
    sort: ["id:asc"],
    pagination: { pageSize: 100 },
  });
  return json.data.map(mapProject);
}

/** Category names — drives /du-an's filter pills (replaces the old
 *  hardcoded PROJECT_FILTERS tuple, so the taxonomy can't drift out of
 *  sync with what projects actually use). */
export async function getCategoryNames(): Promise<string[]> {
  const json = await strapiFetch<{ data: StrapiCategory[] }>("/categories", {
    sort: ["name:asc"],
    pagination: { pageSize: 100 },
  });
  return json.data.map((c) => c.name);
}

/** Project card + optional case-study, by slug. `detail` is null when the
 *  project has no case-study blocks (same "list-only" fallback the old
 *  PROJECT_DETAILS lookup provided). */
export async function getProjectBySlug(
  slug: string,
): Promise<{ project: Project; detail: ProjectDetail | null } | null> {
  const json = await strapiFetch<{ data: StrapiProject[] }>("/projects", {
    filters: { slug: { $eq: slug } },
    populate: {
      image: true,
      categories: true,
      scope: true,
      overview: true,
      blocks: {
        on: {
          "block.full-image": { populate: { image: true } },
          "block.images-grid": { populate: { images: true } },
          "block.text": { populate: { paragraphs: true } },
        },
      },
    },
  });
  const p = json.data[0];
  if (!p) return null;
  return {
    project: mapProject(p),
    detail: p.blocks?.length ? mapProjectDetail(p) : null,
  };
}

export async function getServices(): Promise<Service[]> {
  const json = await strapiFetch<{ data: StrapiService[] }>("/services", {
    populate: ["image"],
    sort: ["index:asc"],
    pagination: { pageSize: 100 },
  });
  return json.data.map(mapService);
}

export async function getSiteSettings(): Promise<ContactInfo> {
  const json = await strapiFetch<{ data: StrapiSiteSettings | null }>("/site-setting", {
    populate: ["socials"],
  });
  const d = json.data;
  return {
    office: d?.office ?? "",
    hotline: d?.hotline ?? "",
    email: d?.email ?? "",
    socials: (d?.socials ?? []).map((s) => ({ label: s.label, href: s.href })),
  };
}

export async function getHomePage(): Promise<HomePageContent> {
  const json = await strapiFetch<{ data: StrapiHomePage | null }>("/home-page", {
    populate: {
      heroHeading: true,
      clientLines: { populate: { clients: true } },
    },
  });
  const d = json.data;
  return {
    heroHeading: (d?.heroHeading ?? []).map((i) => i.value),
    manifestoIntro: d?.manifestoIntro ?? "",
    tonChiBody: d?.tonChiBody ?? "",
    tamNhinBody: d?.tamNhinBody ?? "",
    suMenhBody: d?.suMenhBody ?? "",
    clientLines: (d?.clientLines ?? []).map((line) => line.clients.map((c) => c.value)),
  };
}
