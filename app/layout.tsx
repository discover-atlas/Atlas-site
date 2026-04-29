import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atlas Leads Agency — Web Design, SEO & Lead Generation for Home Services",
  description:
    "We build websites that book jobs. Web design, SEO and automated lead systems for HVAC, plumbing, electrical, roofing, landscaping and more.",
  keywords:
    "home services web design, HVAC leads, plumbing SEO, roofing digital marketing, lead generation home services",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body className="bg-[#0a0a0a] text-[#f5f1ea] overflow-x-hidden antialiased">
        <div className="film-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
