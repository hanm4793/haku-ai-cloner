import type { Metadata } from "next";
import localFont from "next/font/local";
import { PageLoader } from "@/components/PageLoader";
import { SiteSettingsProvider } from "@/lib/site-settings-context";
import { getSiteSettings } from "@/lib/cms";
import "./globals.css";

const neueKaine = localFont({
  variable: "--font-neue-kaine",
  display: "swap",
  src: [
    { path: "../../public/fonts/DFVN-NeueKaine-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/DFVN-NeueKaine-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/DFVN-NeueKaine-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/DFVN-NeueKaine-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/DFVN-NeueKaine-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/DFVN-NeueKaine-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "../../public/fonts/DFVN-NeueKaine-Black.woff2", weight: "900", style: "normal" },
  ],
});

const manrope = localFont({
  variable: "--font-manrope",
  display: "swap",
  src: [{ path: "../../public/fonts/Manrope-ExtraBold.woff2", weight: "800", style: "normal" }],
});

const caveat = localFont({
  variable: "--font-caveat",
  display: "swap",
  src: [{ path: "../../public/fonts/Caveat-Bold.ttf", weight: "700", style: "normal" }],
});

export const metadata: Metadata = {
  title: "ànART® | Creative Hub x Experiences",
  description:
    "ànART là creative hub kiến tạo trải nghiệm — Beyond Creativity Into Experiences. Vượt khỏi điểm nhìn của thị giác, mở rộng điểm chạm vào không gian, chuyển động, hình khối, âm thanh và hơn thế nữa.",
  openGraph: {
    title: "ànART® | Creative Hub x Experiences",
    description:
      "Beyond Creativity Into Experiences — chúng tôi định hình bản sắc cho thương hiệu.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html
      lang="vi"
      className={`${neueKaine.variable} ${manrope.variable} ${caveat.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <PageLoader />
        <SiteSettingsProvider value={siteSettings}>{children}</SiteSettingsProvider>
      </body>
    </html>
  );
}
