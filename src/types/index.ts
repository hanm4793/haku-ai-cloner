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
  /** English watermark label, e.g. "Exhibition Design" */
  en: string;
  description: string;
  image: string;
}

export interface NavLink {
  index: string;
  label: string;
  href: string;
}
