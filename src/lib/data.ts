import type { NavLink, Project, Service } from "@/types";

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

export const CONTACT = {
  office: "10 Pho Duc Chinh St, Ba Dinh, Hanoi, Vietnam",
  hotline: "[+849] 02 007 113",
  email: "hello@anart.vn",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com" },
    { label: "Facebook", href: "https://www.facebook.com" },
    { label: "Behance", href: "https://www.behance.net" },
  ],
};

export const SERVICES: Service[] = [
  {
    index: "01",
    title: "thiết kế không gian triển lãm",
    cat: ["Exhibition", "Design"],
    description:
      "Chúng tôi tạo nên hệ ngôn ngữ thị giác độc bản — nơi màu sắc, hình khối và chất liệu... không chỉ để nhìn, mà đó là hệ thống cảm xúc cho cả một hành trình trải nghiệm.",
    image: "/images/svc-exhibition.webp",
  },
  {
    index: "02",
    title: "thiết kế không gian sự kiện / lễ hội",
    cat: ["Event", "Design"],
    description:
      "Không chỉ tạo nên một sự kiện / lễ hội, chúng tôi kiến tạo những không gian truyền cảm hứng, kết nối con người với thương hiệu qua từng trải nghiệm.",
    image: "/images/svc-event.webp",
  },
  {
    index: "03",
    title: "thiết kế trang trí cảnh quan",
    cat: ["Lanscape", "Design"],
    description:
      "Mỗi thiết kế là sự kết hợp giữa tư duy nghệ thuật, bản sắc không gian và trải nghiệm con người, tạo nên những điểm đến mang giá trị bền vững theo thời gian.",
    image: "/images/svc-landscape.webp",
  },
  {
    index: "04",
    title: "mô hình nghệ thuật",
    cat: ["Sculpture", "Art Model"],
    description:
      "Mỗi mô hình nghệ thuật là sự kết hợp giữa tư duy sáng tạo, kỹ thuật chế tác và ngôn ngữ thị giác để tạo nên những điểm nhấn giàu giá trị.",
    image: "/images/svc-artmodel.webp",
  },
  {
    index: "05",
    title: "thiết kế thương hiệu",
    cat: ["Branding", "Design"],
    description:
      "Chúng tôi kết nối chiến lược, sáng tạo và thiết kế để xây dựng nên thương hiệu có bản sắc rõ ràng, giàu cảm xúc. Và mỗi điểm chạm đều truyền tải đúng giá trị của thương hiệu.",
    image: "/images/svc-branding.webp",
  },
  {
    index: "06",
    title: "tổ chức sản xuất decor",
    cat: ["Production", "Design"],
    description:
      "Từ ý tưởng đến hiện thực, chúng tôi quản lý và tổ chức sản xuất đồng bộ để đảm bảo chất lượng, tiến độ và giá trị của từng dự án.",
    image: "/images/svc-production.webp",
  },
];

export const PROJECT_FILTERS = [
  "All",
  "Exhibition",
  "Event",
  "Lanscape",
  "Branding",
  "Productions",
  "Photography",
] as const;

export const PROJECTS: Project[] = [
  {
    slug: "vietcombank",
    title: "VIETCOMBANK",
    subtitle: "Vietcombank Instalation Art & Exhibition",
    tags: "Visual Art / Exhibition / Production",
    categories: ["Exhibition", "Event", "Productions"],
    image: "/images/home-image/home_page_15.webp",
    size: "wide",
  },
  {
    slug: "ben-xuan",
    title: "BẾN XUÂN",
    subtitle: "Branding",
    tags: "Branding",
    categories: ["Branding"],
    image: "/images/home-image/home_page_16.webp",
    size: "small",
  },
  {
    slug: "emerald-symphony",
    title: "EMERALD SYMPHONY",
    subtitle: "Sắc xanh lục bảo",
    tags: "Branding | Keyvissual",
    categories: ["Branding"],
    image: "/images/home-image/home_page_17.webp",
    size: "small",
  },
  {
    slug: "fendi",
    title: "FENDI",
    subtitle: "Event",
    tags: "Event",
    categories: ["Event", "Photography"],
    image: "/images/home-image/home_page_18.webp",
    size: "small",
  },
  {
    slug: "kizciti",
    title: "KIZCITI",
    subtitle: "Học viện Môi trường",
    tags: "Event | Branding",
    categories: ["Event", "Branding"],
    image: "/images/home-image/home_page_19.webp",
    size: "small",
  },
  {
    slug: "viettheatre",
    title: "NHÀ HÁT VIỆT | VIETTHEATRE",
    subtitle: "Culture Space",
    tags: "Branding",
    categories: ["Branding", "Exhibition"],
    image: "/images/home-image/home_page_22.webp",
    size: "tall",
  },
  {
    slug: "sonha",
    title: "SONHA",
    subtitle: "20 năm thành lập công ty",
    tags: "Branding | Keyvissual",
    categories: ["Branding", "Event"],
    image: "/images/home-image/home_page_20.webp",
    size: "small",
  },
  {
    slug: "vietnam-airlines",
    title: "VIETNAM AIRLINES",
    subtitle: "The Swan Lake — Vietnam Airlines Classic",
    tags: "Branding",
    categories: ["Branding", "Photography"],
    image: "/images/home-image/home_page_21.webp",
    size: "small",
  },
];

/** Client roster block on the home page (rendered line by line). */
export const CLIENT_LINES: string[][] = [
  ["Vietnam Airlines", "VietcomBank", "Vinhomes"],
  ["Masteris Homes", "VietTheatre"],
  ["SONHA", "NewX", "KizCITI", "The Q", "Ben Xuan"],
  ["FENDI", "Mobiado", "MayHomes", "DojiLand"],
];
