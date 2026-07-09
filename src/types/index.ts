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
}

export interface Service {
  index: string;
  title: string;
  /** English category watermark: [horizontal word, vertical word] e.g. ["Exhibition", "Design"] */
  cat: [string, string];
  description: string;
  image: string;
}

export interface NavLink {
  index: string;
  label: string;
  href: string;
}
