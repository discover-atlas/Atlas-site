"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const wordVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: EASE,
      delay: 2.0 + i * 0.12,
    },
  }),
};

const notifications = [
  { icon: "🔥", title: "New lead booked", detail: "HVAC — AC Repair", time: "Just now" },
  { icon: "⚡", title: "Missed call recovered", detail: "Auto follow-up sent", time: "2 min ago" },
  { icon: "📈", title: "+247% organic traffic", detail: "Month over month", time: "1 hr ago" },
];

const blobs = [
  { size: 600, x: [-40, 30, -60], y: [-30, 40, -20], duration: 9, opacity: 0.22, color: "#f36c21" },
  { size: 420, x: [60, -40, 90], y: [40, -60, 30], duration: 13, opacity: 0.12, color: "#f36c21" },
  { size: 340, x: [-30, 80, -50], y: [70, -30, 100], duration: 11, opacity: 0.08, color: "#ff8c42" },
];

const headlineLines = [
  { words: ["We", "Build", "Websites"], orange: false },
  { words: ["That", "Book", "Jobs."], orange: true },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Animated gradient blobs */}
      <motion.div style={{ y: parallaxY }} className="absolute inset-0 pointer-events-none">
        {blobs.map((blob, i) => (
          <motion.div
            key={i}
            animate={{ x: blob.x, y: blob.y }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="absolute rounded-full"
            style={{
              width: blob.size,
              height: blob.size,
              background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
              filter: "blur(80px)",
              opacity: blob.opacity,
              left: i === 0 ? "10%" : i === 1 ? "60%" : "30%",
              top: i === 0 ? "20%" : i === 1 ? "40%" : "60%",
            }}
          />
        ))}
      </motion.div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,241,234,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,241,234,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-[1200px] mx-auto pt-24 pb-24 md:pt-28 md:pb-28 w-full"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 1.9 }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-[#f36c21]" />
          <span className="text-xs tracking-[0.25em] text-[#f5f1ea]/50 uppercase">
            Digital Growth Partner
          </span>
          <span className="h-px w-8 bg-[#f36c21]" />
        </motion.div>

        {/* Headline — word by word */}
        <h1 className="font-display leading-[0.9] mb-8" style={{ fontSize: "clamp(2.75rem, 7.5vw, 7rem)" }}>
          {headlineLines.map((line, li) => (
            <div key={li} className="flex flex-wrap justify-center gap-x-[0.2em]">
              {line.words.map((word, wi) => {
                const index = li * 3 + wi;
                return (
                  <div key={wi} className="overflow-hidden pb-2">
                    <motion.span
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={wordVariants}
                      className={`inline-block ${line.orange ? "text-[#f36c21]" : "text-[#f5f1ea]"}`}
                    >
                      {word}
                    </motion.span>
                  </div>
                );
              })}
            </div>
          ))}
        </h1>

        {/* Animated underline under "Book Jobs" */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-1 bg-[#f36c21] rounded-full origin-left mb-10"
          style={{ width: "clamp(140px, 20vw, 300px)" }}
        />

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-base md:text-xl text-[#f5f1ea]/60 leading-relaxed mb-12"
        >
          Web design, SEO and lead systems for ambitious home services businesses
          ready to dominate their local market.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <MagneticButton
            href="https://calendly.com/drikusbisschoff/al-agency-discovery-call"
            className="rounded-full"
          >
            <span className="group inline-flex items-center gap-3 rounded-full bg-[#f36c21] px-8 py-4 text-base font-semibold text-black tracking-wide orange-glow transition-all duration-300 hover:bg-[#ff7a2f] hover:shadow-[0_0_50px_rgba(243,108,33,0.6)]">
              Book a Free Strategy Call
              <motion.svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <path
                  d="M3 9h12M10 4l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </span>
          </MagneticButton>

          <MagneticButton
            onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-full"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#f5f1ea]/20 px-8 py-4 text-base font-semibold text-[#f5f1ea]/70 tracking-wide transition-all duration-300 hover:border-[#f36c21]/50 hover:text-[#f5f1ea] hover:bg-white/5">
              See Our Work
            </span>
          </MagneticButton>
        </motion.div>

        {/* Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1 }}
          className="mt-16 flex items-center gap-3 text-xs text-[#f5f1ea]/30 tracking-widest uppercase"
        >
          <span className="h-px w-6 bg-[#f5f1ea]/20" />
          Trusted by HVAC · Plumbing · Roofing · Electrical · Landscaping
          <span className="h-px w-6 bg-[#f5f1ea]/20" />
        </motion.div>
      </motion.div>

      {/* Floating notification cards */}
      <div className="absolute right-4 xl:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10 hidden lg:flex max-w-[220px] xl:max-w-[240px]">
        {notifications.map((notif, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              delay: 3.0 + i * 0.25,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ scale: 1.03, x: -4 }}
            className="rounded-xl bg-[#111]/90 backdrop-blur-md border border-white/10 px-4 py-3 min-w-[210px] gradient-border"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">{notif.icon}</span>
              <div>
                <p className="text-sm font-semibold text-[#f5f1ea]">{notif.title}</p>
                <p className="text-xs text-[#f5f1ea]/40 mt-0.5">{notif.detail}</p>
                <p className="text-[10px] text-[#f36c21] mt-1">{notif.time}</p>
              </div>
            </div>
            {/* Pulse dot */}
            <span className="absolute top-3 right-3 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f36c21] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f36c21]" />
            </span>
          </motion.div>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[#f5f1ea]/30 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-[#f36c21] to-transparent"
        />
      </motion.div>
    </section>
  );
}
