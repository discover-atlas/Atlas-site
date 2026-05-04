"use client";

import { motion } from "framer-motion";

const items = [
  "100+ jobs booked monthly",
  "#1 Google rankings",
  "24/7 lead capture",
  "5★ rated agency",
  "Fully automated CRM",
  "Zero missed leads",
  "Done-for-you build",
  "Local SEO specialists",
];

export default function TrustStrip() {
  const doubled = [...items, ...items];

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-[#0d0d0d] py-5">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#0d0d0d] to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#0d0d0d] to-transparent" />

      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-6 px-6 shrink-0">
            <span className="text-sm font-medium tracking-wide text-[#f5f1ea]/50 whitespace-nowrap">
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-[#00C9C8] shrink-0" />
          </div>
        ))}
      </div>
    </section>
  );
}
