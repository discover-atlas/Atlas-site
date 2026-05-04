"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ── Types ── */
type CursorPosition = {
  left: number;
  width: number;
  opacity: number;
};

/* ── Sliding pill nav ── */
function SlidingNav() {
  const [position, setPosition] = useState<CursorPosition>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Content", href: "#content" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ul
      className="relative flex w-fit rounded-full border border-[#f0ede8]/10 bg-[#111]/60 backdrop-blur-sm p-1"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      {navLinks.map((link) => (
        <Tab
          key={link.href}
          setPosition={setPosition}
          onClick={() => scrollTo(link.href)}
        >
          {link.label}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  setPosition,
  onClick,
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<CursorPosition>>;
  onClick?: () => void;
}) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      onClick={onClick}
      className="relative z-10 block cursor-pointer px-4 py-2 text-xs uppercase text-[#f0ede8] mix-blend-difference md:px-5 md:py-2.5 md:text-sm tracking-wide select-none"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }: { position: CursorPosition }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-7 rounded-full bg-[#f0ede8] md:h-9 pointer-events-none"
    />
  );
};

/* ── Full nav header ── */
export default function NavHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  const mobileLinks = [
    { label: "Services", href: "#services" },
    { label: "Content", href: "#content" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[9990] flex items-center justify-between px-6 md:px-8 xl:px-12 py-4 md:py-5"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.8 }}
      >
        {/* Backdrop blur (appears on scroll) */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5"
        />

        {/* Logo */}
        <a href="#" className="relative z-10 flex items-center gap-3 group" aria-label="Atlas Leads home">
          {/* Two overlapping hexagons */}
          <svg width="38" height="24" viewBox="0 0 38 24" fill="none" aria-hidden="true" className="shrink-0">
            <polygon points="22,12 17,3 7,3 2,12 7,21 17,21" fill="#f36c21" />
            <polygon points="36,12 31,3 21,3 16,12 21,21 31,21" fill="#f36c21" fillOpacity="0.72" stroke="#0a0a0a" strokeWidth="0.75" />
          </svg>
          <div className="flex flex-col leading-none select-none">
            <span className="font-display text-[15px] tracking-[0.14em] text-white font-bold">ATLAS</span>
            <span className="text-[9px] tracking-[0.22em] text-[#f36c21] uppercase font-medium mt-0.5">LEADS</span>
          </div>
        </a>

        {/* Sliding pill nav — desktop only */}
        <div className="relative z-10 hidden md:block">
          <SlidingNav />
        </div>

        {/* CTA button — desktop only */}
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

        {/* Hamburger — mobile only */}
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

      {/* Mobile full-screen overlay */}
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
            {mobileLinks.map((link, i) => (
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
