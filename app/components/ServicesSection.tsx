"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Zap, Cpu, Target, Users, BarChart2, Sparkles } from "lucide-react";
import { FeatureCard, type FeatureType } from "@/components/ui/grid-feature-cards";

/* ── Service definitions ── */
const services: FeatureType[] = [
  {
    title: "Workflow Automation",
    icon: Zap,
    description:
      "Eliminate repetitive manual tasks. We map your processes and build automations that execute flawlessly, 24 hours a day.",
  },
  {
    title: "AI Integration",
    icon: Cpu,
    description:
      "Connect your tools to GPT-powered systems that classify, respond, and decide — without a human in the loop.",
  },
  {
    title: "Lead Generation Systems",
    icon: Target,
    description:
      "Multi-channel lead capture, automated qualification, and instant routing — every prospect handled from first touch to booked call.",
  },
  {
    title: "CRM & Sales Automation",
    icon: Users,
    description:
      "Automated follow-up sequences, pipeline management, and appointment booking — so no deal falls through the cracks.",
  },
  {
    title: "Analytics & Reporting",
    icon: BarChart2,
    description:
      "Real-time dashboards that surface the metrics that matter. Know what's working before the end-of-month review.",
  },
  {
    title: "Custom AI Tools",
    icon: Sparkles,
    description:
      "Purpose-built AI applications for your exact use case — from internal knowledge assistants to customer-facing chat.",
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
    <section id="services" className="relative bg-[#0a0a0a] py-20 md:py-28 lg:py-36">
      {/* Subtle top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(243,108,33,0.15), transparent)",
        }}
      />

      <div className="mx-auto w-full max-w-5xl space-y-12 px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedContainer className="max-w-xl">
          <span className="text-[10px] tracking-[0.28em] uppercase text-[#f36c21] font-medium mb-5 block">
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
