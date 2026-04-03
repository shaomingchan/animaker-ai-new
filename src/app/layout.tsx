import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/react";
import HtmlLangSync from "@/components/HtmlLangSync";
import { getLocaleFromCookie } from "@/i18n/translations";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Dance Video Generator - Upload Your Own Dance Reference | Animaker.AI",
  description: "Upload a photo and your own dance video. Our AI transfers the exact movements to create stunning animated videos. No editing skills needed. Try it for $1.99.",
  keywords: ["AI video generator", "photo to video", "AI dance video", "motion transfer AI", "make photo dance", "AI animation", "animate photo"],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "AI Dance Video Generator - Upload Your Own Dance Reference",
    description: "Upload a photo and your own dance video. Our AI transfers the exact movements to create stunning animated videos.",
    url: "https://animaker.dev",
    siteName: "Animaker.AI",
    type: "website",
    images: [
      {
        url: "https://pub-6870195e15d044f2944fc59f9ee569df.r2.dev/animaker/og-image.png",
        width: 1200,
        height: 630,
        alt: "Animaker.AI - Make Any Photo Dance with AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Dance Video Generator - Upload Your Own Dance Reference",
    description: "Upload a photo and your own dance video. Our AI transfers the exact movements to create stunning animated videos.",
    images: ["https://pub-6870195e15d044f2944fc59f9ee569df.r2.dev/animaker/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let initialLang = "en";
  try {
    const cookieStore = await cookies();
    initialLang = getLocaleFromCookie(cookieStore.toString()) ?? "en";
  } catch {
    // cookies() unavailable in some edge runtimes; fall back to "en"
    initialLang = "en";
  }

  return (
    <html lang={initialLang} suppressHydrationWarning>
      <body className={inter.className}>
        <HtmlLangSync />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
