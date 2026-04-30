"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "DISCOVER",
    headline: "Strategy first,\nbuild second.",
    desc: "A focused 15-minute call to map your business, understand your goals and identify the exact opportunities hiding in your local market.",
    icon: "🎯",
    color: "#f36c21",
    motionVariant: "fadeUp",
  },
  {
    number: "02",
    title: "DESIGN",
    headline: "Built for\nyour brand.",
    desc: "Your custom site is crafted around your identity, your offer and your ideal customer — not a template that could belong to anyone.",
    icon: "✏️",
    color: "#f36c21",
    motionVariant: "slideRight",
  },
  {
    number: "03",
    title: "DEPLOY",
    headline: "Live and\nranking.",
    desc: "SEO-optimised launch with full lead-capture stack, call tracking and automated follow-up — live within weeks, not months.",
    icon: "🚀",
    color: "#f36c21",
    motionVariant: "scaleUp",
  },
  {
    number: "04",
    title: "DOMINATE",
    headline: "Grow every\nsingle month.",
    desc: "Ongoing optimisation, ranking improvements and automation tuning so your pipeline fills up month over month on autopilot.",
    icon: "📈",
    color: "#f36c21",
    motionVariant: "rotateFade",
  },
];

const motionVariants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.75 },
    visible: { opacity: 1, scale: 1 },
  },
  rotateFade: {
    hidden: { opacity: 0, rotate: -8, scale: 0.9 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
  },
};

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });
  const v = motionVariants[step.motionVariant];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={v}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      className="process-card w-[min(80vw,20rem)] md:w-64 rounded-2xl bg-[#0f0f0f] border border-white/8 p-6 flex flex-col gap-5 relative overflow-hidden"
    >
      {/* Number watermark */}
      <div
        className="absolute -top-4 -right-2 font-display text-[7rem] leading-none select-none pointer-events-none"
        style={{ color: "rgba(243,108,33,0.04)" }}
      >
        {step.number}
      </div>

      {/* Step number + icon */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] tracking-[0.2em] uppercase text-[#f36c21] font-medium">
          Step {step.number}
        </span>
        <motion.div
          whileHover={{ scale: 1.2, rotate: 10 }}
          className="text-3xl"
        >
          {step.icon}
        </motion.div>
      </div>

      {/* Title */}
      <div>
        <h3 className="font-display text-2xl text-[#f5f1ea] mb-1">{step.title}</h3>
        <p className="font-display text-lg text-[#f36c21] leading-tight whitespace-pre-line">
          {step.headline}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm text-[#f5f1ea]/50 leading-relaxed flex-1 min-w-0 break-words">{step.desc}</p>

      {/* Bottom indicator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-px bg-[#f36c21] origin-left opacity-40"
      />
    </motion.div>
  );
}

export default function ProcessSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="process" className="relative bg-[#080808] py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 0% 50%, rgba(243,108,33,0.04) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[11px] tracking-[0.25em] uppercase text-[#f36c21] font-medium mb-4 block"
            >
              How it works
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                animate={isHeaderInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="font-display text-[clamp(2.5rem,5.5vw,5rem)] text-[#f5f1ea]"
              >
                FOUR STEPS TO
                <br />
                <span className="text-[#f36c21]">FULL PIPELINE</span>
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[#f5f1ea]/40 text-sm max-w-xs leading-relaxed"
          >
            From first call to ongoing growth — a proven system built for home services.
          </motion.p>
        </div>

        {/* Horizontal scroll */}
        <div className="process-scroll">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-4 flex items-center gap-2 text-[#f5f1ea]/20 text-xs md:hidden"
        >
          <span>Swipe to explore</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
