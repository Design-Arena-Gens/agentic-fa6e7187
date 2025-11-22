import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Naskh_Arabic,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const arabicSerif = Noto_Naskh_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "مولّد الإجابات المطوّلة",
  description:
    "أنشئ إجابة عربية طويلة ومنسّقة مع فقرات متتابعة ونبرة قابلة للاختيار.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${arabicSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
