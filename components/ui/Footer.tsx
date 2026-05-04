"use client";

import { motion } from "framer-motion";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Content", href: "#content" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

function AnimatedLink({
  href,
  children,
  onClick,
  external,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  external?: boolean;
}) {
  const shared =
    "relative inline-flex items-center text-sm text-[#f0ede8]/45 hover:text-[#f0ede8] transition-colors duration-200 group";

  const content = (
    <>
      <span className="absolute -left-4 h-px w-0 bg-[#00C9C8] group-hover:w-3 transition-all duration-300 top-1/2 -translate-y-1/2" />
      {children}
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={shared}>
        {content}
      </button>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={shared}
    >
      {content}
    </a>
  );
}

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#080808] border-t border-white/5 overflow-hidden">
      {/* Animated top line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-[#00C9C8] origin-left opacity-30"
      />

      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden pb-2"
        aria-hidden="true"
      >
        <span
          className="font-display select-none leading-none"
          style={{ fontSize: "clamp(4rem, 16vw, 15rem)", color: "rgba(240,237,232,0.018)" }}
        >
          ATLAS
        </span>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-display text-2xl tracking-[0.12em] mb-1 text-[#f0ede8]">
              ATLAS
            </div>
            <p className="text-[10px] tracking-[0.25em] text-[#f0ede8]/25 uppercase mb-5">
              Automation Consulting
            </p>
            <p className="text-sm text-[#f0ede8]/35 leading-relaxed max-w-xs">
              We build automation systems that eliminate repetitive work, capture every lead, and scale your business without scaling headcount.
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="h-px w-12 bg-[#00C9C8] origin-left mt-6 opacity-60"
            />
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h3 className="text-[10px] tracking-[0.22em] uppercase text-[#f0ede8]/25 mb-6 font-medium">
              Navigation
            </h3>
            <ul className="space-y-3.5 pl-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <AnimatedLink href={link.href} onClick={() => scrollTo(link.href)}>
                    {link.label}
                  </AnimatedLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-[10px] tracking-[0.22em] uppercase text-[#f0ede8]/25 mb-6 font-medium">
              Get Started
            </h3>
            <a
              href="https://calendly.com/drikusbisschoff/al-agency-discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-[#00C9C8]/25 px-5 py-3 text-sm text-[#00C9C8] hover:bg-[#00C9C8]/8 hover:border-[#00C9C8]/50 transition-all duration-300 mb-6"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M4 1v2.5M10 1v2.5M1.5 6h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Book a Free Strategy Call
            </a>
            <div className="space-y-2">
              <p className="text-xs text-[#f0ede8]/20">15-minute discovery call</p>
              <p className="text-xs text-[#f0ede8]/20">No commitment · No pressure</p>
              <a
                href="mailto:discover@atlasleadsagency.com"
                className="text-xs text-[#f0ede8]/35 hover:text-[#00C9C8] transition-colors duration-200 block mt-3"
              >
                discover@atlasleadsagency.com
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5"
        >
          <p className="text-xs text-[#f0ede8]/20">
            © 2026 Atlas Automation Consulting. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1.5 text-xs text-[#f0ede8]/25 hover:text-[#00C9C8] transition-colors duration-200"
          >
            Back to top
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path d="M5.5 8V3M3 5.5l2.5-2.5 2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
