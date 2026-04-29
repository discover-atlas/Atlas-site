"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  {
    value: 40,
    prefix: "",
    suffix: "%",
    label: "of leads lost",
    sub: "Due to slow response and broken funnels",
    color: "#f36c21",
  },
  {
    value: 53,
    prefix: "",
    suffix: "%",
    label: "never call back",
    sub: "Prospects who go unanswered choose a competitor",
    color: "#f36c21",
  },
  {
    value: 2,
    prefix: "Page ",
    suffix: " = invisible",
    label: "No clicks, no jobs",
    sub: "91% of searchers never go past page one",
    color: "#f36c21",
  },
];

const particles = Array.from({ length: 24 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: 3 + Math.random() * 4,
  delay: Math.random() * 2,
}));

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#080808] py-32 md:py-40"
    >
      {/* Parallax particles */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#f36c21]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: 0.15,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.05, 0.2, 0.05],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </motion.div>

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(243,108,33,0.04) 0%, transparent 70%)"
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Big outlined headline */}
        <div ref={headingRef} className="mb-20 overflow-hidden">
          <motion.h2
            initial={{ y: "110%", opacity: 0 }}
            animate={isHeadingInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[9vw] md:text-[7vw] lg:text-[5.5vw] leading-tight"
            style={{
              WebkitTextStroke: "1px rgba(245,241,234,0.15)",
              color: "transparent",
            }}
          >
            MOST HOME SERVICES
            <br />
            <span style={{ WebkitTextStroke: "1px rgba(243,108,33,0.5)", color: "transparent" }}>
              SITES ARE LOSING
            </span>
            <br />
            JOBS DAILY.
          </motion.h2>
        </div>

        {/* Stat cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative rounded-2xl border border-white/8 bg-[#0f0f0f] p-8 overflow-hidden"
            >
              {/* Corner glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#f36c21] opacity-[0.04] rounded-full -translate-x-1/4 -translate-y-1/4 blur-2xl" />

              <div className="relative z-10">
                <div className="font-display text-6xl md:text-7xl text-[#f36c21] mb-4 orange-text-glow">
                  <AnimatedCounter
                    to={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#f5f1ea] mb-2">{stat.label}</h3>
                <p className="text-sm text-[#f5f1ea]/40 leading-relaxed">{stat.sub}</p>
              </div>

              {/* Bottom orange line that animates in */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 left-0 right-0 h-px bg-[#f36c21] origin-left opacity-50"
              />
            </motion.div>
          ))}
        </div>

        {/* CTA link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-[#f5f1ea]/50 text-base">
            Your competitors are fixing this right now.{" "}
            <a
              href="https://calendly.com/drikusbisschoff/al-agency-discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f36c21] underline underline-offset-4 decoration-[#f36c21]/30 hover:decoration-[#f36c21] transition-colors"
            >
              Let&apos;s fix yours.
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
