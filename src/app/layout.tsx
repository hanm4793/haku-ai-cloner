import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const interDisplay = localFont({
  variable: "--font-inter-display",
  display: "swap",
  src: [
    { path: "../../public/fonts/InterDisplay-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/InterDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/InterDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/InterDisplay-SemiBold.woff2", weight: "600", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Zeit Media | Art Comes First",
  description:
    "ZEIT is a creative agency dedicated to crafting artistic experiences through a distinctive and innovative approach, always focusing on the audience and cultural values.",
  icons: {
    icon: "/seo/favicon.jpg",
    apple: "/seo/webclip.jpg",
  },
  openGraph: {
    title: "Zeit Media | Art Comes First",
    description:
      "ZEIT is a creative agency dedicated to crafting artistic experiences through a distinctive and innovative approach.",
    images: ["/seo/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${interDisplay.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}
