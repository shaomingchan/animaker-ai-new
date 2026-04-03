// Binary search: only Inter font + Analytics + HtmlLangSync (no headers() at all)
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import HtmlLangSync from "@/components/HtmlLangSync";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Animaker.AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HtmlLangSync />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
