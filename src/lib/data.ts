import type { NavLink, Project, ProjectDetail, Service } from "@/types";

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

/** Full case-study content, keyed by project slug. Only projects with an entry
 *  here get a /du-an/[slug] detail page; the rest link back to the list. */
export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  vietcombank: {
    slug: "vietcombank",
    titleLines: ["Vietcombank", "Instalation Art", "& Exhibition"],
    scope: ["Exhibition", "Visual Art", "Branding Design", "Production"],
    intro:
      "Mỗi không gian là một chương truyện, mỗi tác phẩm là một mảnh ghép của bản sắc Việt. Trong cuộc gặp gỡ giữa dân gian và đương đại, quá khứ không đứng sau chúng ta mà đang đồng hành cùng chúng ta trên hành trình đi tới tương lai.",
    overview: [
      "Triển lãm giới thiệu 31 tác phẩm hội họa về chủ đề Ngựa, nơi mỗi bức tranh là một câu chuyện riêng, tái hiện những ký ức, niềm tin và khát vọng đã đồng hành cùng dân tộc Việt qua nhiều giai đoạn lịch sử.",
      "Hành trình trưng bày được dẫn dắt qua ba mạch nội dung: Lịch sử & Truyền thuyết, Văn hóa & Tín ngưỡng, và Giao thương & Phát triển. Từ những huyền tích xa xưa, đời sống tâm linh đến tinh thần khai mở và vươn mình của dân tộc, hình tượng ngựa hiện lên như một biểu tượng của sức sống, ý chí và khát vọng tiến bước.",
      "Các tác phẩm mang tinh thần dân gian dân tộc được đặt trong một ngôn ngữ trưng bày đương đại, tạo nên sự đối thoại giữa truyền thống và hiện tại, giữa những giá trị đã được gìn giữ qua thời gian và cách cảm nhận của con người hôm nay.",
      "Bằng sự giao thoa giữa Dân gian dân tộc × Contemporary Art, triển lãm mong muốn tôn vinh những giá trị bền vững của văn hóa Việt, kết nối con người với cội nguồn và lan tỏa tinh thần gìn giữ, tiếp nối di sản như một nguồn năng lượng để kiến tạo bản sắc và phát triển trong thời đại mới.",
    ],
    captionLines: ["Vietcombank", "Instalation Art", "& Exhibition"],
    year: "#2026",
    blocks: [
      { type: "full", image: "/images/service-vcb/Vietcombank-01.webp" },
      { type: "full", image: "/images/service-vcb/Vietcombank-02.webp" },
      {
        type: "text",
        align: "split",
        heading:
          "Từ huyền tích đến đời thường, vó ngựa khắc sâu trong lịch sử dân tộc.",
        paragraphs: [
          "Lấy cảm hứng từ hình tượng con ngựa – linh vật đã xuất hiện từ thuở truyền thuyết, đồng hành xuyên suốt chiều dài lịch sử và tiếp tục hiện diện mạnh mẽ trong đời sống hiện đại, triển lãm giới thiệu 31 tác phẩm hội họa tái hiện 31 cảnh tượng về những Quý Mã của người Việt. Mỗi bức tranh là một câu chuyện, một sự tích, một lát cắt văn hóa, gửi gắm niềm tin vào Quý Mã – biểu tượng của bình an, phước lành và sự song hành tương trợ trên hành trình cùng người Việt rẽ gió tiến xa.",
          "Bước sang năm Bính Ngọ 2026, đất nước bước vào kỷ nguyên vươn mình, hướng tới mục tiêu phát triển giàu mạnh, thịnh vượng. Song để đi xa với những bước tiến vững vàng, hành trình ấy luôn cần điểm tựa từ cội nguồn – những giá trị truyền thống, những tinh hoa văn hóa làm nên bản sắc Việt Nam.",
        ],
      },
      { type: "full", image: "/images/service-vcb/Vietcombank-03.webp" },
      { type: "full", image: "/images/service-vcb/Vietcombank-04.webp" },
      { type: "full", image: "/images/service-vcb/Vietcombank-05.webp" },
      {
        type: "text",
        align: "right",
        paragraphs: [
          "Thấu hiểu ý nghĩa đó, Vietcombank luôn tận tâm gìn giữ, lan tỏa và phát huy các giá trị văn hóa dân tộc. Đó không chỉ là trách nhiệm, mà còn là tâm niệm và niềm tin. Cũng như những “Quý Mã” trong lịch sử, Vietcombank không ngừng mạnh mẽ tiến lên, đồng hành cùng sự phát triển của đất nước và mỗi khách hàng.",
          "Nhân dịp năm mới, Vietcombank hân hạnh được đồng hành và giới thiệu triển lãm MÃ ĐÀO. Qua đây, xin kính chúc Quý vị một năm mới có MÃ ĐÀO ắt sẽ THÀNH CÔNG!",
        ],
      },
      { type: "full", image: "/images/service-vcb/Vietcombank-06.webp" },
      { type: "full", image: "/images/service-vcb/Vietcombank-07.webp" },
      { type: "full", image: "/images/service-vcb/Vietcombank-09.webp" },
    ],
  },
};

/** Client roster block on the home page (rendered line by line). */
export const CLIENT_LINES: string[][] = [
  ["Vietnam Airlines", "VietcomBank", "Vinhomes"],
  ["Masteris Homes", "VietTheatre"],
  ["SONHA", "NewX", "KizCITI", "The Q", "Ben Xuan"],
  ["FENDI", "Mobiado", "MayHomes", "DojiLand"],
];
