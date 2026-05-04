"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  {
    value: 3,
    prefix: "",
    suffix: "x",
    label: "more booked jobs",
    sub: "Average client outcome within 90 days",
  },
  {
    value: 24,
    prefix: "",
    suffix: "/7",
    label: "automated lead capture",
    sub: "No lead left behind, day or night",
  },
  {
    value: 1,
    prefix: "#",
    suffix: "",
    label: "Google rankings",
    sub: "For local high-intent search terms",
  },
  {
    value: 100,
    prefix: "",
    suffix: "%",
    label: "done-for-you",
    sub: "We handle everything — you focus on jobs",
  },
];

export default function ResultsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      id="results"
      className="relative bg-[#0a0a0a] py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Full-bleed dark bg with orange gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, rgba(0,201,200,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Large background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display text-[#00C9C8] select-none"
          style={{ fontSize: "clamp(4rem, 20vw, 22rem)", opacity: 0.02 }}
        >
          RESULTS
        </span>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16 lg:mb-20 text-center"
        >
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#00C9C8] font-medium mb-4 block">
            By the numbers
          </span>
          <h2 className="font-display text-[clamp(2rem,6vw,6rem)] text-[#f5f1ea] leading-tight">
            THE PROOF IS IN THE
            <br />
            <span className="text-[#00C9C8]">PIPELINE</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-[#0a0a0a] p-6 md:p-8 lg:p-10 flex flex-col gap-4 group hover:bg-[#0f0f0f] transition-colors duration-300"
            >
              {/* Hover orange glow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(circle at 50% 100%, rgba(0,201,200,0.08) 0%, transparent 70%)" }}
              />

              <div className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-[#00C9C8] leading-none orange-text-glow">
                {isInView && (
                  <AnimatedCounter
                    to={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                )}
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#f5f1ea] mb-1">{stat.label}</h3>
                <p className="text-sm text-[#f5f1ea]/35 leading-relaxed">{stat.sub}</p>
              </div>

              {/* Bottom accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 left-0 right-0 h-px bg-[#00C9C8] origin-left opacity-30"
              />
            </motion.div>
          ))}
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center text-[#f5f1ea]/30 text-sm mt-10"
        >
          Results vary by market and starting position. We&apos;ll give you realistic projections on your free strategy call.
        </motion.p>
      </div>
    </section>
  );
}
