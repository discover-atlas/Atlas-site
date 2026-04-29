"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";

interface AnimatedCounterProps {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  to,
  prefix = "",
  suffix = "",
  duration = 2.5,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [isInView, count, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
