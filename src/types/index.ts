export type ProjectSize = "wide" | "small" | "tall";

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  /** caption shown bottom-left of the tile, e.g. "Visual Art / Exhibition / Production" */
  tags: string;
  categories: string[];
  image: string;
  size: ProjectSize;
  /** Whether a /du-an/[slug] case-study page exists for this project. */
  hasCaseStudy: boolean;
}

export interface Service {
  index: string;
  title: string;
  /** English category watermark: [horizontal word, vertical word] e.g. ["Exhibition", "Design"] */
  cat: [string, string];
  description: string;
  image: string;
}

/** A content block inside a project case-study page. */
export type DetailBlock =
  /** grid of images — column count = images.length (max 3) */
  | { type: "images"; images: string[] }
  /** paragraph block — "split" = heading left + copy right, "right" = copy in right column only */
  | { type: "text"; heading?: string; paragraphs: string[]; align?: "split" | "right" }
  /** full-bleed image (caay-style figure) */
  | { type: "full"; image: string };

/** Full case-study content for /du-an/[slug]. */
export interface ProjectDetail {
  slug: string;
  /** big title, one entry per rendered line */
  titleLines: string[];
  /** S.O.W (scope of work) list */
  scope: string[];
  /** intro statement (white, uppercase) shown top-right */
  intro: string;
  /** "TỔNG QUAN" paragraphs */
  overview: string[];
  /** caption overlaid on full-bleed images, one entry per line */
  captionLines: string[];
  blocks: DetailBlock[];
}

export interface NavLink {
  index: string;
  label: string;
  href: string;
}
