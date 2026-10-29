import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/data/site";

export const viewport: Viewport = {
  themeColor: "#16181c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://harshkhamkar.vercel.app"),
  title: {
    default: `${siteConfig.name} · Data Science Engineer`,
    template: `%s · ${siteConfig.name}`,
  },
  description: `${siteConfig.name} — B.Tech in Data Science & Artificial Intelligence at Universal AI University, Mumbai. Data Analyst Intern at Choice India. Enterprise analytics, 128k+ record pipelines, explainable AI, and sports platform architecture.`,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.github }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: `${siteConfig.name} · Data Science Engineer`,
    description: siteConfig.tagline,
    siteName: `${siteConfig.name} Portfolio`,
    images: [
      {
        url: "/images/harsh-khamkar.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Data Science Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · Data Science Engineer`,
    description: siteConfig.tagline,
    images: ["/images/harsh-khamkar.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=JetBrains+Mono:ital,wght@0,300..800;1,300..800&family=Permanent+Marker&display=swap"
        />
      </head>
      <body className="min-h-screen bg-[#16181c] text-[#ece5d5] antialiased selection:bg-[#ff6a1a] selection:text-[#16181c]">
        {children}
      </body>
    </html>
  );
}
