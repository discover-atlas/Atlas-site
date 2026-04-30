"use client";

import { motion } from "framer-motion";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "Book a Call",
    href: "https://calendly.com/drikusbisschoff/al-agency-discovery-call",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M5 1v3M11 1v3M2 7h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
];

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Footer() {
  return (
    <footer className="relative bg-[#080808] border-t border-white/5 overflow-hidden">
      {/* Top orange line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-[#f36c21] origin-left opacity-40"
      />

      {/* Large background watermark */}
      <div
        className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden pb-4"
        aria-hidden="true"
      >
        <span
          className="font-display select-none leading-none"
          style={{ fontSize: "clamp(4rem, 18vw, 18rem)", color: "rgba(243,108,33,0.02)" }}
        >
          ATLAS LEADS
        </span>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        {/* Top row */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="font-display text-3xl tracking-widest mb-4">
              ATLAS <span className="text-[#f36c21]">LEADS</span>
            </div>
            <p className="text-sm text-[#f5f1ea]/40 leading-relaxed max-w-xs">
              Digital growth partners for home services businesses ready to dominate
              their local market.
            </p>
            {/* Orange divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-16 bg-[#f36c21] origin-left mt-6"
            />
          </motion.div>

          {/* Nav links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-[#f5f1ea]/30 mb-5 font-medium">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-[#f5f1ea]/50 hover:text-[#f36c21] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="h-px w-0 bg-[#f36c21] group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact / CTA block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-[#f5f1ea]/30 mb-5 font-medium">
              Get started
            </h3>
            <motion.a
              href="https://calendly.com/drikusbisschoff/al-agency-discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="inline-flex items-center gap-3 rounded-full border border-[#f36c21]/30 px-5 py-3 text-sm text-[#f36c21] hover:bg-[#f36c21]/10 hover:border-[#f36c21] transition-colors duration-300 mb-6"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.3" />
                <path d="M5 1v3M11 1v3M2 7h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              Book a Free Strategy Call
            </motion.a>

            <div className="space-y-2">
              <p className="text-xs text-[#f5f1ea]/25">15-minute discovery call</p>
              <p className="text-xs text-[#f5f1ea]/25">No obligation · No pressure</p>
              <a
                href="mailto:discover@atlasleadsagency.com"
                className="text-xs text-[#f5f1ea]/40 hover:text-[#f36c21] transition-colors duration-200 block mt-3"
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
          <p className="text-xs text-[#f5f1ea]/25">
            © 2025 Atlas Leads Agency. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-xs text-[#f5f1ea]/20">
              Built for home services.
            </span>
            <span className="h-1 w-1 rounded-full bg-[#f36c21]/40" />
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xs text-[#f5f1ea]/30 hover:text-[#f36c21] transition-colors duration-200 flex items-center gap-1.5"
            >
              Back to top
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 9V3M3 6l3-3 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
