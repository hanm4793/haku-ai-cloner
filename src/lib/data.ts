import type { NavLink, Project, Service, Stat } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { index: "01", label: "Về Zeit", href: "/vn/about" },
  { index: "02", label: "Dự án", href: "/vn/works" },
  { index: "03", label: "Dịch vụ", href: "/vn/services" },
  { index: "04", label: "Blog", href: "/vn/blog" },
];

/** Full menu overlay links (79px big nav on the original). */
export const MENU_LINKS: { label: string; href: string }[] = [
  { label: "Trang chủ", href: "/vn" },
  { label: "Về Zeit", href: "/vn/about" },
  { label: "Dự án", href: "/vn/works" },
  { label: "Dịch vụ", href: "/vn/services" },
  { label: "Blog", href: "/vn/blog" },
  { label: "Liên hệ", href: "/vn/contact" },
];

export const FEATURED_LINKS: { tag: string; title: string; href: string; cta: string }[] = [
  { tag: "New Project", title: "OSUN FEST", href: "/vn/work/osun-fest", cta: "Show reel" },
  {
    tag: "New Project",
    title: "DỰ ÁN TÁI ĐỊNH VỊ THƯƠNG HIỆU PETROLIMEX",
    href: "/vn/work/petrolimex-rebranding",
    cta: "Watch showreel",
  },
];

export const STATS: Stat[] = [
  { value: "200+", label: "Sự kiện cho các doanh nghiệp trong và ngoài nước" },
  { value: "1000+", label: "Ấn phẩm quảng cáo, truyền thông cho các thương hiệu" },
  { value: "200+", label: "Nhân sự trẻ trung, giàu kinh nghiệm" },
];

export const CLIENTS: string[] = [
  "VINGROUP", "BIM GROUP", "PETROLIMEX", "VIETINBANK", "VIETCOMBANK",
  "TECHCOMBANK", "VPBANK", "MB", "TPBANK", "SHB", "HDBANK", "MSB",
  "PJICO", "VIETTEL", "VNG", "VTC", "FPT", "VINAPHONE", "SAMSUNG",
  "LG", "VIETNAM AIRLINES", "BAMBOO AIRWAYS", "SONY", "OPPO",
  "HYUNDAI", "SABECO", "VINACONEX", "AND MORE...",
];

export const GOV_CLIENTS: string[] = [
  "BỘ CÔNG AN",
  "BỘ NGOẠI GIAO",
  "BỘ VĂN HÓA THỂ THAO VÀ DU LỊCH",
];

export const SERVICES: Service[] = [
  {
    index: "01",
    title: "Tổ chức sự kiện",
    items: ["Xây dựng concept sự kiện sáng tạo", "Triển khai tổng thể sự kiện"],
    image: "/images/svc-events.avif",
  },
  {
    index: "02",
    title: "Truyền thông",
    items: [
      "Phát triển và triển khai chiến lược truyền thông marketing tích hợp",
      "Định vị thương hiệu",
    ],
    image: "/images/svc-marcom.avif",
  },
  {
    index: "03",
    title: "Thiết kế sáng tạo",
    items: ["Xây dựng bộ nhận diện thương hiệu", "Phát triển ý tưởng và tư vấn thiết kế"],
    image: "/images/svc-cd.avif",
  },
  {
    index: "04",
    title: "Sản xuất",
    items: ["Sản xuất TVC, Video doanh nghiệp", "Sản xuất chương trình truyền hình thực tế"],
    image: "/images/svc-production.avif",
  },
];

export const PROJECTS: Project[] = [
  {
    year: "2026",
    category: "Branding",
    title: "DỰ ÁN TÁI ĐỊNH VỊ THƯƠNG HIỆU PETROLIMEX",
    client: "PETROLIMEX",
    href: "/vn/work/petrolimex-rebranding",
    image: "/images/proj-petrolimex.webp",
  },
  {
    year: "2026",
    category: "Events",
    title: "DƯỚI LÁ CỜ VẺ VANG CỦA ĐẢNG",
    client: "Ban Chấp hành Trung ương Đảng",
    href: "/vn/work/duoi-la-co-ve-vang-cua-dang",
    image: "/images/proj-dang.jpg",
  },
  {
    year: "2025",
    category: "Events",
    title: "CÔNG ƯỚC HÀ NỘI",
    client: "Bộ Công an",
    href: "/vn/work/hanoi-convention",
    image: "/images/proj-hanoi.avif",
  },
  {
    year: "2025",
    category: "Production",
    title: "CHIẾN SĨ QUẢ CẢM",
    client: "Bộ Công an",
    href: "/vn/work/reality-tv-shows-the-brave-warrior",
    image: "/images/proj-chiensi.avif",
  },
  {
    year: "2025",
    category: "Production",
    title: 'TVC VIETINBANK PREMIUM "SỐNG TRỌN TINH HOA"',
    client: "VietinBank Premium",
    href: "/vn/work/tvc-vietinbank-premiun-song-tron-tinh-hoa",
    image: "/images/proj-vietinbank.webp",
  },
  {
    year: "2025",
    category: "Events",
    title: 'TRIỂN LÃM "95 NĂM CỜ ĐẢNG SOI ĐƯỜNG"',
    client: "Ban Tuyên giáo và Dân vận Trung ương, Báo Nhân Dân",
    href: "/vn/work/exhibition-95-years-beneath-the-partys-flag",
    image: "/images/proj-trienlam.avif",
  },
];

export const CONTACT = {
  addresses: [
    "24 Tuệ Tĩnh, phường Hai Bà Trưng, Hà Nội",
    "9 Đoàn Văn Bơ, phường Xóm Chiếu, TP.Hồ Chí Minh",
  ],
  email: "info@zeitmedia.vn",
  hotline: "(+84) 84 848 8686",
  socials: [
    { label: "FB", href: "https://www.facebook.com/ZeitMediaVN" },
    { label: "IG", href: "https://www.instagram.com/zeitmedia.vn" },
    { label: "TIKTOK", href: "https://www.tiktok.com/@zeitmedia.vn" },
    { label: "BEHANCE", href: "https://www.behance.net/ZeitMediaVN" },
  ],
};
