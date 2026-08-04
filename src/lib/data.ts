import type { NavLink } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { index: "01", label: "về ànART", href: "/" },
  { index: "02", label: "dịch vụ", href: "/dich-vu" },
  { index: "03", label: "dự án", href: "/du-an" },
  { index: "04", label: "liên hệ", href: "/lien-he" },
];

/** Fullscreen blue menu overlay links (Neue Kaine Black, right-aligned). */
export const MENU_LINKS: { label: string; href: string }[] = [
  { label: "về ànArt", href: "/" },
  { label: "dịch vụ", href: "/dich-vu" },
  { label: "dự án", href: "/du-an" },
  { label: "liên hệ", href: "/lien-he" },
];
