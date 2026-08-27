import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://zhangtiansu-portfolio.blond-shell-5896.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "张天粟｜个人作品集",
  description: "张天粟的 UX/UI 个人作品集，涵盖 B 端、C 端、移动端与车载 HMI 体验设计。",
  keywords: ["张天粟", "UX", "UI", "作品集", "B端设计", "移动端设计", "车载HMI"],
  authors: [{ name: "张天粟" }],
  creator: "张天粟",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "张天粟｜个人作品集",
    description: "UX / UI · B端 · C端 · 车载 HMI",
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "张天粟｜个人作品集",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "张天粟｜个人作品集",
    description: "UX / UI · B端 · C端 · 车载 HMI",
    images: [`${siteUrl}/og.png`],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
