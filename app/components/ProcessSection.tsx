"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "DISCOVER",
    headline: "Map your\noperations.",
    desc: "A focused 20-minute call to audit your current workflows, identify time-wasting bottlenecks, and uncover exactly where automation delivers the highest ROI.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.4" />
        <path d="M14 9v5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    motionVariant: "fadeUp",
  },
  {
    number: "02",
    title: "ARCHITECT",
    headline: "Design your\nstack.",
    desc: "We design a bespoke automation architecture — choosing the right tools, connections, and triggers to build a system that fits your business perfectly.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="16" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="4" y="16" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M16 20h4m-2-2v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    motionVariant: "slideRight",
  },
  {
    number: "03",
    title: "BUILD",
    headline: "We build,\nyou watch.",
    desc: "Our team builds, tests, and deploys your automation system. You get regular updates and a live preview — so there are no surprises on launch day.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M8 14l4 4 8-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
    motionVariant: "scaleUp",
  },
  {
    number: "04",
    title: "SCALE",
    headline: "Expand and\noptimise.",
    desc: "After launch, we monitor performance, refine edge cases, and expand your automation infrastructure — compounding the return on every system we build.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 22l5-6 4 4 5-8 6 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    motionVariant: "rotateFade",
  },
];

const motionVariants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  rotateFade: {
    hidden: { opacity: 0, rotate: -6, scale: 0.9 },
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
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      className="process-card w-[min(80vw,20rem)] md:w-64 rounded-2xl bg-[#111] border border-white/5 p-6 flex flex-col gap-5 relative overflow-hidden"
    >
      {/* Number watermark */}
      <div
        className="absolute -top-3 -right-1 font-display text-[6rem] leading-none select-none pointer-events-none"
        style={{ color: "rgba(240,237,232,0.025)" }}
      >
        {step.number}
      </div>

      {/* Step number + icon */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-[0.22em] uppercase text-[#f36c21] font-medium">
          Step {step.number}
        </span>
        <div className="text-[#f0ede8]/30">{step.icon}</div>
      </div>

      {/* Title */}
      <div>
        <h3 className="font-display text-2xl text-[#f0ede8] mb-1">{step.title}</h3>
        <p className="font-display text-lg text-[#f36c21]/70 leading-tight whitespace-pre-line">
          {step.headline}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm text-[#f0ede8]/40 leading-relaxed flex-1 break-words">{step.desc}</p>

      {/* Bottom line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-px bg-[#f36c21] origin-left opacity-20"
      />
    </motion.div>
  );
}

export default function ProcessSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="process" className="relative bg-[#080808] py-20 md:py-32 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 0% 50%, rgba(243,108,33,0.03) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[10px] tracking-[0.28em] uppercase text-[#f36c21] font-medium mb-5 block"
            >
              How we work
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                animate={isHeaderInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="font-display text-[#f0ede8]"
                style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
              >
                FOUR STEPS TO
                <br />
                <span className="text-[#f0ede8]/25">FULL AUTOMATION</span>
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[#f0ede8]/35 text-sm max-w-xs leading-relaxed"
          >
            From discovery to deployment — a clear, collaborative process with no surprises.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="process-scroll">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>

        {/* Mobile scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-4 flex items-center gap-2 text-[#f0ede8]/20 text-xs md:hidden"
        >
          <span>Swipe to explore</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 7h8M7 4l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
