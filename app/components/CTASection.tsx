"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

function RippleButton({ href }: { href: string }) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 350, damping: 25 });
  const sy = useSpring(my, { stiffness: 350, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 900);
  };

  return (
    <motion.a
      ref={btnRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileTap={{ scale: 0.97 }}
      className="relative inline-flex items-center gap-4 rounded-full bg-[#00C9C8] px-10 py-5 text-base font-semibold text-black tracking-wide overflow-hidden hover:bg-[#00b3b2] transition-colors duration-300 shadow-[0_0_50px_rgba(0,201,200,0.3)]"
    >
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="absolute rounded-full bg-white/25 pointer-events-none"
          style={{ left: r.x, top: r.y, width: 10, height: 10, x: "-50%", y: "-50%" }}
          animate={{ scale: 28, opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      ))}
      <span className="relative z-10">Book a Free Strategy Session</span>
      <motion.svg
        className="relative z-10"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </motion.a>
  );
}

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative bg-[#0a0a0a] py-20 sm:py-28 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* Background glow */}
      <motion.div
        animate={{ x: [-30, 30, -30], y: [-20, 20, -20] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(700px,70vw)] h-[min(700px,70vw)] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,201,200,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Watermark text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <motion.span
          initial={{ opacity: 0, scale: 1.15 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display select-none"
          style={{
            fontSize: "clamp(5rem, 17vw, 16rem)",
            WebkitTextStroke: "1px rgba(240,237,232,0.04)",
            color: "transparent",
            lineHeight: 1,
          }}
        >
          AUTOMATE
        </motion.span>
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[10px] tracking-[0.28em] uppercase text-[#00C9C8] font-medium mb-6 block"
        >
          Free strategy session
        </motion.span>

        <div className="overflow-hidden mb-6">
          <motion.h2
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-display text-[#f0ede8] leading-tight"
            style={{ fontSize: "clamp(2.75rem, 6.5vw, 6.5rem)" }}
          >
            Ready to Automate
            <br />
            <span className="text-[#f0ede8]/25">Your Growth?</span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-[#f0ede8]/40 text-base md:text-lg leading-relaxed max-w-lg mx-auto mb-12"
        >
          In 20 minutes, we&apos;ll map the exact automations that will save your team the most time — and show you the ROI before we build a single workflow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <RippleButton href="https://calendly.com/drikusbisschoff/al-agency-discovery-call" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-[#f0ede8]/20 text-sm tracking-wide"
        >
          No commitment. No sales pressure. Just clarity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-5 text-xs text-[#f0ede8]/20"
        >
          {["20-min call", "100% free", "No obligation", "ROI mapping included"].map(
            (badge, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#00C9C8]/50" />
                {badge}
              </div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
