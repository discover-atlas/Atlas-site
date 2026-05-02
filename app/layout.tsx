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
  title: "Atlas — Automation Consulting",
  description:
    "We build automation systems that eliminate repetitive work, capture every lead, and scale your business without scaling headcount.",
  keywords:
    "automation consulting, workflow automation, AI integration, business automation, CRM automation, lead generation systems",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body className="bg-[#0a0a0a] text-[#f0ede8] overflow-x-hidden antialiased">
        <div className="film-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
