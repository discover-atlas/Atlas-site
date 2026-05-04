"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Globe, Search, Target, CalendarCheck, Zap, Video } from "lucide-react";
import { FeatureCard, type FeatureType } from "@/components/ui/grid-feature-cards";

/* ── Service definitions ── */
const services: FeatureType[] = [
  {
    title: "Web Design and Development",
    icon: Globe,
    description:
      "High performance websites built to convert visitors into booked jobs. Every page engineered for speed, trust, and action.",
  },
  {
    title: "SEO and Local Rankings",
    icon: Search,
    description:
      "Dominate Google searches in your area. We handle on-page optimisation, local citations, and Google Business Profile so you rank when it matters.",
  },
  {
    title: "Lead Generation Engine",
    icon: Target,
    description:
      "Capture every lead from calls, forms, and Google automatically. Real-time qualification and routing so no prospect slips through.",
  },
  {
    title: "CRM and Booking System",
    icon: CalendarCheck,
    description:
      "Track leads, schedule jobs, and never miss a follow-up. Your pipeline stays visible, your calendar stays full.",
  },
  {
    title: "System Automations",
    icon: Zap,
    description:
      "Automated SMS, email sequences, and workflow automations running 24/7 — from lead nurture to post-job review requests.",
  },
  {
    title: "Animated Social Media Content",
    icon: Video,
    description:
      "Professional motion graphics and explainer videos for social media. Scroll-stopping content that builds trust and drives engagement.",
  },
];

/* ── Animated entrance wrapper ── */
type AnimatedContainerProps = {
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Section ── */
export default function ServicesSection() {
  return (
    <section id="services" className="relative bg-[#0a0a0a] py-20 md:py-32">
      {/* Subtle top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,201,200,0.15), transparent)",
        }}
      />

      <div className="mx-auto w-full max-w-6xl space-y-16 px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedContainer className="max-w-xl">
          <span className="text-[10px] tracking-[0.28em] uppercase text-[#00C9C8] font-medium mb-5 block">
            What we build
          </span>
          <h2
            className="font-display text-[#f0ede8] leading-[0.9]"
            style={{ fontSize: "clamp(2.75rem, 5.5vw, 5.5rem)" }}
          >
            THE AUTOMATION
            <br />
            <span className="text-[#f0ede8]/25">STACK</span>
          </h2>
          <p className="mt-5 text-[#f0ede8]/40 text-sm leading-relaxed max-w-md">
            End-to-end systems that replace repetitive work, eliminate human
            error, and compound in value over time.
          </p>
        </AnimatedContainer>

        {/* Feature card grid */}
        <AnimatedContainer
          delay={0.3}
          className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed border-[rgba(240,237,232,0.08)] divide-[rgba(240,237,232,0.08)] sm:grid-cols-2 md:grid-cols-3"
        >
          {services.map((service, i) => (
            <FeatureCard key={i} feature={service} className="bg-[#0a0a0a]" />
          ))}
        </AnimatedContainer>
      </div>
    </section>
  );
}
