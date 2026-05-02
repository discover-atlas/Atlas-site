"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const links = [
  { label: "Services", href: "#services" },
  { label: "Content", href: "#content" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function NavHeader() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[9990] flex items-center justify-between px-6 md:px-8 xl:px-12 py-5"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.8 }}
      >
        {/* Backdrop */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5"
        />

        {/* Logo */}
        <a href="#" className="relative z-10 flex flex-col leading-none group">
          <span className="font-display text-lg tracking-[0.15em] text-[#f0ede8] group-hover:text-[#f36c21] transition-colors duration-300">
            ATLAS
          </span>
          <span className="text-[9px] tracking-[0.28em] text-[#f0ede8]/30 uppercase mt-0.5">
            Automation Consulting
          </span>
        </a>

        {/* Desktop nav — slide cursor */}
        <nav
          className="relative z-10 hidden md:flex items-center"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {links.map((link) => (
            <div key={link.href} className="relative">
              {hoveredLink === link.href && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/6 rounded-lg"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <button
                onMouseEnter={() => setHoveredLink(link.href)}
                onClick={() => scrollTo(link.href)}
                className="relative z-10 px-4 py-2 text-sm text-[#f0ede8]/50 hover:text-[#f0ede8] transition-colors duration-150 tracking-wide"
              >
                {link.label}
              </button>
            </div>
          ))}
        </nav>

        {/* CTA */}
        <div className="relative z-10 hidden md:block">
          <a
            href="https://calendly.com/drikusbisschoff/al-agency-discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#f36c21] px-5 py-2.5 text-sm font-semibold text-black tracking-wide hover:bg-[#ff7a2f] transition-colors duration-200"
          >
            Book a Call
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M2 6.5h9M7 2l4.5 4.5L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="relative z-10 md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block h-px w-6 bg-[#f0ede8] origin-center"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            className="block h-px w-6 bg-[#f0ede8]"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block h-px w-6 bg-[#f0ede8] origin-center"
          />
        </button>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9980] bg-[#0a0a0a] flex flex-col items-center justify-center gap-8"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-[#f36c21] opacity-30" />
            {links.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ delay: i * 0.07, duration: 0.35 }}
                onClick={() => scrollTo(link.href)}
                className="font-display text-5xl text-[#f0ede8] hover:text-[#f36c21] transition-colors tracking-wide"
              >
                {link.label.toUpperCase()}
              </motion.button>
            ))}
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32 }}
              href="https://calendly.com/drikusbisschoff/al-agency-discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#f36c21] px-8 py-4 text-base font-semibold text-black"
            >
              Book a Call
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
