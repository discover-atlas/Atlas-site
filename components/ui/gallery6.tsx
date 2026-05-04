"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

/* ── Types ── */
interface GalleryItem {
  id: number;
  title: string;
  summary: string;
  image: string;
  tag: string;
}

/* ── Data ── */
const items: GalleryItem[] = [
  {
    id: 1,
    title: "3x More Booked Jobs",
    summary:
      "HVAC company in Cape Town went from 8 to 24 booked jobs per month after launching their new website and lead system.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80&fit=crop",
    tag: "Web Design & Lead Generation",
  },
  {
    id: 2,
    title: "Page 1 Google Rankings",
    summary:
      "Plumbing business dominated local search results within 90 days of SEO implementation.",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&q=80&fit=crop",
    tag: "SEO & Local Rankings",
  },
  {
    id: 3,
    title: "Zero Missed Leads",
    summary:
      "Roofing contractor now captures 100% of leads with automated follow-up running 24/7.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop",
    tag: "Lead Generation Engine",
  },
  {
    id: 4,
    title: "47% More Revenue",
    summary:
      "Electrical company increased monthly revenue by 47% with our CRM and booking system.",
    image:
      "https://images.unsplash.com/photo-1509390874189-c5fcb0adbb0f?w=800&q=80&fit=crop",
    tag: "CRM & Booking System",
  },
  {
    id: 5,
    title: "Social Media That Converts",
    summary:
      "Landscaping business gained 2,400 followers and 18 new clients from our animated social content.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80&fit=crop",
    tag: "Animated Social Content",
  },
];

/* ── Gallery6 ── */
export function Gallery6() {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  return (
    <section className="relative bg-[#0a0a0a] py-32 md:py-40 lg:py-48 overflow-hidden">
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(243,108,33,0.15), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(243,108,33,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20"
        >
          <div>
            <span className="block text-[10px] tracking-[0.32em] uppercase text-[#f36c21] font-medium mb-5">
              Client Results
            </span>
            <h2
              className="font-display text-[#f0ede8] leading-[0.88]"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)" }}
            >
              Real Results.
              <br />
              <span className="text-[#f0ede8]/22">Real Businesses.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Nav arrows */}
            <div className="flex gap-3">
              <button
                onClick={() => api?.scrollPrev()}
                aria-label="Previous result"
                disabled={!canScrollPrev}
                className="group w-11 h-11 rounded-full border border-[#f0ede8]/10 flex items-center justify-center hover:border-[#f36c21]/40 hover:bg-[#f36c21]/5 transition-all duration-300 disabled:opacity-30"
              >
                <ArrowLeft className="w-4 h-4 text-[#f0ede8]/50 group-hover:text-[#f0ede8] transition-colors duration-200" />
              </button>
              <button
                onClick={() => api?.scrollNext()}
                aria-label="Next result"
                disabled={!canScrollNext}
                className="group w-11 h-11 rounded-full border border-[#f0ede8]/10 flex items-center justify-center hover:border-[#f36c21]/40 hover:bg-[#f36c21]/5 transition-all duration-300 disabled:opacity-30"
              >
                <ArrowRight className="w-4 h-4 text-[#f0ede8]/50 group-hover:text-[#f0ede8] transition-colors duration-200" />
              </button>
            </div>

            {/* Book a Demo link */}
            <a
              href="https://calendly.com/drikusbisschoff/al-agency-discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 text-[11px] tracking-[0.22em] uppercase text-[#f0ede8]/40 hover:text-[#f36c21] transition-colors duration-300"
            >
              Book a Demo
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path
                  d="M2 6h8M6 2l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Carousel
            setApi={setApi}
            opts={{ loop: true, align: "start", slidesToScroll: 1 }}
            className="w-full"
          >
            <CarouselContent className="-ml-5 md:-ml-6">
              {items.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-5 md:pl-6 basis-[85vw] sm:basis-[60vw] md:basis-[44vw] lg:basis-[36vw] xl:basis-[30vw]"
                >
                  <Card className="group relative rounded-2xl overflow-hidden border border-[#f0ede8]/[0.06] bg-[#111] hover:border-[#f36c21]/20 transition-all duration-500 hover:-translate-y-1 shadow-none">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Image overlay */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.85) 100%)",
                        }}
                        aria-hidden="true"
                      />
                      {/* Tag badge */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0a0a0a]/70 backdrop-blur-sm border border-[#f36c21]/25 px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase text-[#f36c21] font-medium">
                          <span className="h-1 w-1 rounded-full bg-[#f36c21]" aria-hidden="true" />
                          {item.tag}
                        </span>
                      </div>
                    </div>

                    {/* Card content */}
                    <CardContent className="p-6 md:p-7 relative">
                      {/* Result number watermark */}
                      <div
                        className="absolute bottom-4 right-5 font-display text-[4.5rem] leading-none select-none pointer-events-none"
                        style={{ color: "rgba(243,108,33,0.04)" }}
                        aria-hidden="true"
                      >
                        0{item.id}
                      </div>

                      <h3
                        className="font-display text-[#f0ede8] leading-tight mb-3"
                        style={{ fontSize: "clamp(1.3rem, 2vw, 1.6rem)" }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#f0ede8]/40 leading-relaxed">
                        {item.summary}
                      </p>

                      {/* Bottom accent line */}
                      <div className="mt-5 h-px w-0 bg-[#f36c21]/40 group-hover:w-full transition-all duration-500" aria-hidden="true" />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to result ${i + 1}`}
              className="transition-all duration-300"
            >
              <div
                className={`rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? "w-6 h-[3px] bg-[#f36c21]"
                    : "w-[3px] h-[3px] bg-[#f0ede8]/20 hover:bg-[#f0ede8]/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery6;
