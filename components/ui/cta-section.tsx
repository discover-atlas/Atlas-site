"use client";

import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";

const CALENDLY = "https://calendly.com/drikusbisschoff/al-agency-discovery-call";

const BADGES = ["20-min call", "100% free", "No obligation", "ROI mapping included"];

export default function CTASection() {
  return (
    <section
      id="contact"
      className="relative bg-[#0a0a0a] py-40 md:py-52 lg:py-64 overflow-hidden"
    >
      {/* Subtle centered radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(255,255,255,0.022) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Animated top rule */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 sm:px-8 text-center">

        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-[10px] tracking-[0.38em] uppercase text-white/25 font-medium mb-8"
        >
          Get Started
        </motion.span>

        {/* Heading */}
        <div className="overflow-hidden mb-10">
          <motion.h2
            initial={{ y: "105%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-white leading-[0.88] tracking-tight"
            style={{ fontSize: "clamp(3rem, 7.5vw, 7.5rem)" }}
          >
            Ready to Grow
            <br />
            <span className="text-white/18">Your Business?</span>
          </motion.h2>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="text-base md:text-lg text-white/28 font-light leading-relaxed max-w-[38ch] mx-auto mb-14"
        >
          In 20 minutes we&apos;ll map the exact automations that will save your
          team the most time — and show you the ROI before we build a single workflow.
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.42, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-14"
        >
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-transparent px-9 py-4 text-[13px] font-medium text-white tracking-[0.06em] hover:bg-white hover:text-[#0a0a0a] hover:border-white transition-all duration-300 hover:shadow-[0_0_48px_rgba(255,255,255,0.1)]"
          >
            <PhoneCall className="w-[15px] h-[15px] shrink-0 transition-transform duration-300 group-hover:scale-110" />
            Book a Strategy Call
            <ArrowRight className="w-[15px] h-[15px] shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="flex flex-wrap justify-center gap-x-7 gap-y-2"
        >
          {BADGES.map((badge, i) => (
            <span
              key={badge}
              className="flex items-center gap-2 text-[9px] tracking-[0.24em] uppercase text-white/15"
            >
              {i > 0 && (
                <span className="hidden sm:block h-px w-3 bg-white/10" aria-hidden="true" />
              )}
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
