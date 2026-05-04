"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ── Types ── */
type CursorPosition = {
  left: number;
  width: number;
  opacity: number;
};

/* ── Nav links ── */
const NAV_LINKS = [
  { label: "What We Build",    href: "#services" },
  { label: "Animated Content", href: "#content"  },
  { label: "How We Work",      href: "#process"  },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

/* ── Active section via IntersectionObserver ── */
function useActiveSection() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}

/* ── Sliding pill nav ── */
function SlidingNav({ active }: { active: string }) {
  const [position, setPosition] = useState<CursorPosition>({ left: 0, width: 0, opacity: 0 });

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ul
      className="relative flex w-fit rounded-full border border-[#f0ede8]/10 bg-[#111]/60 backdrop-blur-sm p-1"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      {NAV_LINKS.map((link) => (
        <Tab
          key={link.href}
          setPosition={setPosition}
          onClick={() => scrollTo(link.href)}
          isActive={active === link.href.slice(1)}
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
  isActive,
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<CursorPosition>>;
  onClick?: () => void;
  isActive: boolean;
}) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
      }}
      onClick={onClick}
      className="relative z-10 block cursor-pointer px-4 py-2 md:px-5 md:py-2.5 select-none"
    >
      <span
        className={`relative text-xs md:text-sm uppercase tracking-wide mix-blend-difference transition-colors duration-200 ${
          isActive ? "text-[#00C9C8]" : "text-[#f0ede8]"
        }`}
      >
        {children}
        {isActive && (
          <span className="absolute left-0 -bottom-0.5 h-px w-full bg-[#00C9C8] rounded-full" />
        )}
      </span>
    </li>
  );
};

const Cursor = ({ position }: { position: CursorPosition }) => (
  <motion.li
    animate={position}
    className="absolute z-0 h-7 rounded-full bg-[#f0ede8] md:h-9 pointer-events-none"
  />
);

/* ── Full nav header ── */
export default function NavHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const active = useActiveSection();

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
        <a href="#" className="relative z-10 flex items-center group" aria-label="Atlas Leads home">
          <Image
            src="/atlas-logo.png"
            alt="Atlas Leads"
            width={160}
            height={40}
            className="h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
            priority
          />
        </a>

        {/* Sliding pill nav — desktop only */}
        <div className="relative z-10 hidden md:block">
          <SlidingNav active={active} />
        </div>

        {/* CTA button — desktop only */}
        <div className="relative z-10 hidden md:block">
          <a
            href="https://calendly.com/drikusbisschoff/al-agency-discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#00C9C8] px-5 py-2.5 text-sm font-semibold text-black tracking-wide hover:bg-[#00b3b2] transition-colors duration-200"
          >
            Book a Strategy Call
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
            <div className="absolute top-0 left-0 right-0 h-px bg-[#00C9C8] opacity-30" />
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ delay: i * 0.07, duration: 0.35 }}
                onClick={() => scrollTo(link.href)}
                className={`font-display text-4xl tracking-wide transition-colors duration-200 ${
                  active === link.href.slice(1)
                    ? "text-[#00C9C8]"
                    : "text-[#f0ede8] hover:text-[#00C9C8]"
                }`}
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
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#00C9C8] px-8 py-4 text-base font-semibold text-black"
            >
              Book a Strategy Call
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
