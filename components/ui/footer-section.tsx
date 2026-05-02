"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ExternalLink } from "lucide-react";

/* ── Link definitions ── */
const footerLinks = [
  {
    title: "Services",
    links: [
      { name: "Workflow Automation", href: "#services" },
      { name: "AI Integration", href: "#services" },
      { name: "Lead Generation", href: "#services" },
      { name: "CRM & Sales Automation", href: "#services" },
      { name: "Analytics & Reporting", href: "#services" },
      { name: "Custom AI Tools", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Process", href: "#process" },
      { name: "Case Studies", href: "#" },
      { name: "Blog", href: "#" },
    ],
  },
  {
    title: "Get Started",
    links: [
      { name: "Book a Strategy Call", href: "https://calendly.com/drikusbisschoff/al-agency-discovery-call" },
      { name: "Free ROI Mapping", href: "https://calendly.com/drikusbisschoff/al-agency-discovery-call" },
      { name: "Contact Us", href: "#contact" },
    ],
  },
  {
    title: "Follow",
    links: [
      { name: "LinkedIn", href: "#" },
      { name: "Instagram", href: "#" },
      { name: "YouTube", href: "#" },
      { name: "Facebook", href: "#" },
    ],
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

/* ── Footer ── */
export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-[rgba(240,237,232,0.08)] bg-[#0a0a0a]">
      {/* Orange radial glow at top */}
      <div
        className="absolute inset-x-0 top-0 h-48 pointer-events-none"
        style={{
          background:
            "radial-gradient(35% 128px at 50% 0%, rgba(243,108,33,0.06), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        {/* Top row: logo + links */}
        <AnimatedContainer className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-5 mb-14">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 md:col-span-1 flex flex-col gap-4">
            <span
              className="font-display text-[#f0ede8] leading-none"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
            >
              ATLAS
            </span>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#f36c21] font-medium">
              Automation Consulting
            </p>
            <p className="text-xs text-[#f0ede8]/30 leading-relaxed max-w-[18ch]">
              We build systems that scale your business — without scaling headcount.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#f0ede8]/40 font-medium">
                {section.title}
              </span>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="group flex items-center gap-2 text-xs text-[#f0ede8]/40 hover:text-[#f0ede8] transition-colors duration-200"
                      >
                        {isExternal && (
                          <ExternalLink className="w-3 h-3 text-[#f0ede8]/20 group-hover:text-[#f36c21] transition-colors duration-200 shrink-0" />
                        )}
                        <span className="relative">
                          {link.name}
                          <span className="absolute left-0 -bottom-px h-px w-0 bg-[#f36c21]/60 group-hover:w-full transition-all duration-300" />
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </AnimatedContainer>

        {/* Divider */}
        <div
          className="h-px w-full mb-8"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(240,237,232,0.08), transparent)",
          }}
        />

        {/* Bottom row: copyright + tagline */}
        <AnimatedContainer delay={0.3} className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-[#f0ede8]/20 tracking-[0.15em]">
            © {new Date().getFullYear()} Atlas Automation Consulting. All rights reserved.
          </p>
          <p className="text-[10px] text-[#f0ede8]/10 tracking-[0.2em] uppercase font-mono">
            Automate Everything
          </p>
        </AnimatedContainer>
      </div>
    </footer>
  );
}

export default Footer;
