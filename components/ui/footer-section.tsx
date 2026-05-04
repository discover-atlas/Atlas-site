"use client";

import { motion } from "motion/react";

const NAV_LINKS = [
  { name: "Services", href: "#services" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#contact" },
];

/* ── Hexagon Logo ── */
function HexLogo() {
  return (
    <a href="#" aria-label="Atlas Leads home" className="group inline-flex items-center gap-3">
      <svg
        width="34"
        height="22"
        viewBox="0 0 38 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0 transition-opacity duration-300 group-hover:opacity-80"
      >
        <polygon points="22,12 17,3 7,3 2,12 7,21 17,21" fill="white" fillOpacity="0.85" />
        <polygon
          points="36,12 31,3 21,3 16,12 21,21 31,21"
          fill="white"
          fillOpacity="0.25"
          stroke="#0a0a0a"
          strokeWidth="0.75"
        />
      </svg>
      <div className="flex flex-col leading-none select-none">
        <span className="font-display text-[14px] tracking-[0.14em] text-white font-bold">
          ATLAS
        </span>
        <span className="text-[8px] tracking-[0.24em] text-white/35 uppercase font-medium mt-0.5">
          LEADS
        </span>
      </div>
    </a>
  );
}

/* ── Footer ── */
export function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a]">
      {/* Animated top border line */}
      <div className="relative h-px overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.1) 70%, transparent 100%)",
          }}
          initial={{ scaleX: 0, transformOrigin: "center" }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <HexLogo />
          </motion.div>

          {/* Nav links */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-8"
            aria-label="Footer navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-[10px] tracking-[0.22em] uppercase text-white/28 hover:text-white font-medium transition-colors duration-200 group"
              >
                {link.name}
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white/40 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </motion.nav>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-[9px] tracking-[0.18em] text-white/15 shrink-0"
          >
            © Atlas Leads 2025. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
