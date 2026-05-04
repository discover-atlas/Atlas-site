"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const BEAMS = [
  { angle: -0.48, spread: 0.32, baseOpacity: 0.022, pulseSpeed: 0.7, phase: 0 },
  { angle: -0.2, spread: 0.26, baseOpacity: 0.018, pulseSpeed: 1.05, phase: 1.8 },
  { angle: 0.0, spread: 0.4, baseOpacity: 0.03, pulseSpeed: 0.55, phase: 3.1 },
  { angle: 0.22, spread: 0.24, baseOpacity: 0.016, pulseSpeed: 1.2, phase: 0.9 },
  { angle: 0.5, spread: 0.3, baseOpacity: 0.02, pulseSpeed: 0.85, phase: 2.3 },
  { angle: -0.72, spread: 0.22, baseOpacity: 0.012, pulseSpeed: 0.65, phase: 4.2 },
  { angle: 0.74, spread: 0.2, baseOpacity: 0.01, pulseSpeed: 1.4, phase: 1.1 },
];

function BeamCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    const ro = new ResizeObserver(() => {
      ctx.resetTransform();
      resize();
    });
    ro.observe(canvas);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    const animate = () => {
      t += 0.005;
      ctx.clearRect(0, 0, w(), h());

      const ox = w() / 2;
      const oy = h() * -0.1;
      const len = Math.hypot(w(), h()) * 1.7;

      BEAMS.forEach((beam) => {
        const opacity = beam.baseOpacity + Math.sin(t * beam.pulseSpeed + beam.phase) * 0.007;
        const la = beam.angle - beam.spread / 2;
        const ra = beam.angle + beam.spread / 2;

        const endX = ox + Math.sin(beam.angle) * len;
        const endY = oy + Math.cos(beam.angle) * len;

        const grad = ctx.createLinearGradient(ox, oy, endX, endY);
        grad.addColorStop(0, `rgba(0,201,200,${Math.min(opacity * 3.5, 0.12).toFixed(4)})`);
        grad.addColorStop(0.2, `rgba(0,201,200,${opacity.toFixed(4)})`);
        grad.addColorStop(0.7, `rgba(0,201,200,${(opacity * 0.3).toFixed(4)})`);
        grad.addColorStop(1, "rgba(0,201,200,0)");

        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.lineTo(ox + Math.sin(la) * len, oy + Math.cos(la) * len);
        ctx.lineTo(ox + Math.sin(ra) * len, oy + Math.cos(ra) * len);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

export default function PremiumHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Beam canvas */}
      <BeamCanvas />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(240,237,232,0.05) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
        aria-hidden="true"
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, #0a0a0a 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 select-none"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 2.0 }}
          className="mb-8 flex items-center gap-4"
        >
          <span className="h-px w-10 bg-[#00C9C8]/50" />
          <span className="text-[10px] tracking-[0.35em] text-[#f0ede8]/35 uppercase font-medium">
            Automation Consulting
          </span>
          <span className="h-px w-10 bg-[#00C9C8]/50" />
        </motion.div>

        {/* ATLAS */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 2.1 }}
            className="font-display text-[#f0ede8] leading-[0.85] tracking-[0.04em]"
            style={{ fontSize: "clamp(5.5rem, 18vw, 18rem)" }}
          >
            ATLAS
          </motion.h1>
        </div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 2.7 }}
          className="h-px bg-[#f0ede8]/12 origin-center mb-6"
          style={{ width: "clamp(180px, 32vw, 480px)" }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 2.9 }}
          className="text-[#f0ede8]/40 tracking-[0.22em] uppercase text-sm md:text-base font-light mb-14"
        >
          Automation Consulting
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 3.1 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <a
            href="https://calendly.com/drikusbisschoff/al-agency-discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-[#00C9C8] px-8 py-4 text-sm font-semibold text-black tracking-wide hover:bg-[#00b3b2] transition-colors duration-200 shadow-[0_0_40px_rgba(0,201,200,0.3)]"
          >
            Book a Strategy Call
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <button
            onClick={() => {
              document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 rounded-full border border-[#f0ede8]/12 px-8 py-4 text-sm font-medium text-[#f0ede8]/50 tracking-wide hover:border-[#f0ede8]/25 hover:text-[#f0ede8] transition-all duration-200"
          >
            Explore Services
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
      >
        <span className="text-[9px] text-[#f0ede8]/20 tracking-[0.35em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-9 w-px bg-gradient-to-b from-[#00C9C8]/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
