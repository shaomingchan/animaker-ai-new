import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import HtmlLangSync from "@/components/HtmlLangSync";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Dance Video Generator - Upload Your Own Dance Reference | animaker.dev",
  description:
    "Upload a photo and your own dance video. Our AI transfers the exact movements to create stunning animated videos. No editing skills needed. Try it for $1.99.",
  keywords: [
    "AI video generator",
    "photo to video",
    "AI dance video",
    "motion transfer AI",
    "make photo dance",
    "AI animation",
    "animate photo",
  ],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "AI Dance Video Generator",
    description:
      "Upload a photo and your own dance video. Our AI transfers the exact movements to create stunning animated videos.",
    url: "https://animaker.dev",
    siteName: "animaker.dev",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "animaker.dev - Make Any Photo Dance with AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Dance Video Generator",
    description:
      "Upload a photo and your own dance video. Our AI transfers the exact movements to create stunning animated videos.",
    images: ["/twitter-card.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Language detection is handled client-side by HtmlLangSync.
  // Using async RootLayout + await headers()/cookies() crashes
  // Next.js 16.1.6 + React 19.2.3 on Vercel serverless (Node 24.x).
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <HtmlLangSync />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
