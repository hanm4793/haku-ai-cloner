# Zeit Media (zeitmedia.vn/vn) — Page Topology

Webflow site. Body `#000` / text `#fff`. Font **InterDisplay** (self-hosted woff2:
Light 300 / Regular 400 / Medium 500 / SemiBold 600). Container max-width **1440px**.
Stack: GSAP + ScrollTrigger, **Lenis** smooth scroll, Splitting.js (per-char text
reveals), Swiper, Barba (page transitions), Lottie, hls.js (video), video backgrounds.

## Type scale (from getComputedStyle)
- About heading "Creative Agency…": 100px / 500
- Stats (200+): 112px / 500 / ls -3.36px
- Differentiator (Khác Biệt): 112px / 500
- Scale (SẴN SÀNG): 115px / 600 / uppercase
- CTA (HIỆN THỰC HÓA): 136px / 600 / uppercase / ls -2.72px
- Service titles: 48px / 500 / ls -1.44px

## Sections (top → bottom)
1. **Hero** — full-screen, background video (`COVER FINAL 2.mp4`). Preloader intro
   ("Art Comes First — Creative Above All"). Latest-project tag (OSUN FEST), social
   links, `[ Tất cả dự án ]` / `[ Show reel ]` pills. → `Hero.tsx`
2. **About** — eyebrow "Về Zeit", 100px heading "Creative Agency hàng đầu Việt Nam",
   intro paragraph + "Tìm hiểu thêm", feature image (orchestra), 3 stats
   (200+ / 1000+ / 200+). → `About.tsx`
3. **Clients** — "Khách hàng của chúng tôi"; 3 flagship gov clients large + two
   horizontal marquee rows (VINGROUP, PETROLIMEX, banks, …, AND MORE…). → `Clients.tsx`
4. **Differentiator** — big centered statement with inline round media chips + the
   `3d-zeit.mp4` inline video: "Khác Biệt … để Dẫn Đầu / Đó là tinh thần Zeit / Kiến
   tạo chuẩn mực mới". → `Differentiator.tsx`
5. **Scale** — giant uppercase "SẴN SÀNG VÀ / NÂNG TẦM BỨT PHÁ THƯƠNG HIỆU?" + CTA
   pill. → `Scale.tsx`
6. **Services** — intro + 4 sticky-stacking panels (Tổ chức sự kiện / Truyền thông /
   Thiết kế sáng tạo / Sản xuất), each with sub-items + image. → `Services.tsx`
7. **Projects** — "Dự án nổi bật", 2-col grid of 6 featured works (year / category /
   title / client, hover image zoom). → `Projects.tsx`
8. **CTA** — giant "HIỆN THỰC HÓA / Ý TƯỞNG / ĐỘT PHÁ" + "Kết nối với Zeit". → `CTA.tsx`
9. **Footer** — brand statement, nav, addresses (HN/HCM), email, hotline, socials
   (FB/IG/TikTok/Behance), © 2025 Zeit Media. → `Footer.tsx`

## Interaction model
- **Global:** Lenis smooth scroll; scroll-reveal fade-up on section content
  (implemented via scroll-position check in `SmoothScroll.tsx` — bulletproof vs fast
  scroll; respects `prefers-reduced-motion`).
- Header: transparent → translucent black + blur after 40px scroll.
- Clients: infinite CSS marquee (two rows, opposite directions).
- Projects/Services: hover image zoom (1.04, 1.2s ease).

## Responsive
- Desktop 1440: multi-column (about 2-col, projects 2-col, service panels 2-col).
- Mobile 390: everything stacks to single column; headings scale via `clamp()`.
