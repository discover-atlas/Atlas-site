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

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 1000);
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
      className="relative inline-flex items-center gap-4 rounded-full bg-[#f36c21] px-10 py-5 text-lg font-semibold text-black tracking-wide overflow-hidden orange-glow hover:bg-[#ff7a2f] transition-colors duration-300 group"
    >
      {/* Ripples */}
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{ left: r.x, top: r.y, width: 10, height: 10, x: "-50%", y: "-50%" }}
          animate={{ scale: 30, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}

      <span className="relative z-10">Book Your Free Strategy Call</span>
      <motion.svg
        className="relative z-10"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M4 11h14M11 4l7 7-7 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
      className="relative bg-[#0a0a0a] py-20 sm:py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background blobs */}
      <motion.div
        animate={{ x: [-40, 40, -40], y: [-30, 30, -30] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(800px,80vw)] h-[min(800px,80vw)] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(243,108,33,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Outlined large text background */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <motion.span
          initial={{ opacity: 0, scale: 1.2 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display select-none"
          style={{
            fontSize: "clamp(6rem, 18vw, 18rem)",
            WebkitTextStroke: "1px rgba(243,108,33,0.06)",
            color: "transparent",
            lineHeight: 1,
          }}
        >
          BOOK NOW
        </motion.span>
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[11px] tracking-[0.25em] uppercase text-[#f36c21] font-medium mb-6 block"
        >
          Free strategy call
        </motion.span>

        {/* Headline */}
        <div className="overflow-hidden mb-6">
          <motion.h2
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-display leading-tight"
            style={{ fontSize: "clamp(2.75rem, 7vw, 7rem)" }}
          >
            Ready to Book
            <br />
            <span className="text-[#f36c21]">More Jobs?</span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-[#f5f1ea]/50 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-12"
        >
          In 15 minutes, we&apos;ll map out exactly what&apos;s costing you jobs — and show you how to fix it.
          No fluff, no pitch, just a clear growth plan for your business.
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <RippleButton href="https://calendly.com/drikusbisschoff/al-agency-discovery-call" />
        </motion.div>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-[#f5f1ea]/25 text-sm tracking-wide"
        >
          No commitment. No sales pressure. Just clarity.
        </motion.p>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-[#f5f1ea]/25"
        >
          {["15-min call", "100% free", "No obligation", "Same-week results"].map((badge, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#f36c21]" />
              {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
