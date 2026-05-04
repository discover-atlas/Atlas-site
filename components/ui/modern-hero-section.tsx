"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Zap, ArrowRight, PhoneCall } from "lucide-react";

/* ─────────────────────────────────────────────────
   Floating geometric pill shape
───────────────────────────────────────────────── */
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.12]",
            "shadow-[0_8px_32px_0_rgba(243,108,33,0.08)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(243,108,33,0.12),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────── */
export default function HeroGeometric({
  badge = "Automation Agency",
  title1 = "Automate",
  title2 = "Everything.",
  subtitle = "We build systems that replace repetitive work, capture every lead, and scale your business — without scaling headcount.",
  ctaText = "Book a Strategy Call",
  ctaHref = "https://calendly.com/drikusbisschoff/al-agency-discovery-call",
  secondaryText = "See Our Work",
  secondaryHref = "#services",
}: {
  badge?: string;
  title1?: string;
  title2?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
}) {
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">

      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f36c21]/[0.04] via-transparent to-orange-400/[0.04] blur-3xl" />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-[#f36c21]/[0.12]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-orange-400/[0.10]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-amber-500/[0.10]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-[#f36c21]/[0.08]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />
        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-yellow-500/[0.08]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
          >
            <Zap className="w-3.5 h-3.5 text-[#f36c21]" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-white/50 font-medium">
              {badge}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1
              className="font-display mb-6 md:mb-8 leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)" }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#f0ede8] to-[#f0ede8]/75">
                {title1}
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f36c21] via-[#f0ede8]/90 to-orange-300">
                {title2}
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-base sm:text-lg text-[#f0ede8]/35 mb-10 leading-relaxed font-light tracking-wide max-w-[42ch] mx-auto px-4">
              {subtitle}
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-[#f36c21] px-8 py-3.5 text-[13px] font-medium text-white tracking-wide hover:bg-[#ff7a2f] transition-all duration-300 hover:shadow-[0_0_40px_rgba(243,108,33,0.35)] hover:-translate-y-0.5"
            >
              <PhoneCall className="w-4 h-4 shrink-0" />
              {ctaText}
              <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href={secondaryHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-8 py-3.5 text-[13px] font-medium text-white/40 tracking-wide hover:text-white hover:border-white/25 transition-all duration-300"
            >
              {secondaryText}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Top + bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/80 pointer-events-none" />
    </div>
  );
}
