"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import MagneticButton from "./MagneticButton";

const links = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[9990] flex items-center justify-between px-4 sm:px-6 md:px-8 xl:px-12 py-4 md:py-5"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.9 }}
      >
        {/* Backdrop blur */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5"
        />

        {/* Logo */}
        <motion.a
          href="#"
          className="relative z-10 font-display text-xl tracking-widest"
          whileHover={{ color: "#00C9C8" }}
          transition={{ duration: 0.2 }}
        >
          ATLAS{" "}
          <span className="text-[#00C9C8]">LEADS</span>
        </motion.a>

        {/* Desktop nav */}
        <nav className="relative z-10 hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm text-[#f5f1ea]/60 hover:text-[#f5f1ea] transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="relative z-10 hidden md:block">
          <MagneticButton
            href="https://calendly.com/drikusbisschoff/al-agency-discovery-call"
            className="rounded-full"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-[#00C9C8] px-5 py-2.5 text-sm font-semibold text-black tracking-wide transition-all duration-300 hover:bg-[#00b3b2] orange-glow">
              Book a Call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </MagneticButton>
        </div>

        {/* Hamburger */}
        <button
          className="relative z-10 md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block h-px w-6 bg-[#f5f1ea] origin-center"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            className="block h-px w-6 bg-[#f5f1ea]"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block h-px w-6 bg-[#f5f1ea] origin-center"
          />
        </button>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[9980] bg-[#0a0a0a] flex flex-col items-center justify-center gap-8"
          >
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-[#00C9C8]"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            />
            {links.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                onClick={() => scrollTo(link.href)}
                className="font-display text-5xl tracking-wide text-[#f5f1ea] hover:text-[#00C9C8] transition-colors"
              >
                {link.label.toUpperCase()}
              </motion.button>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              href="https://calendly.com/drikusbisschoff/al-agency-discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#00C9C8] px-8 py-4 text-base font-semibold text-black"
            >
              Book a Free Call
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
