"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const dotX = useSpring(mouseX, { stiffness: 800, damping: 35 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 35 });

  const ringX = useSpring(mouseX, { stiffness: 200, damping: 22 });
  const ringY = useSpring(mouseY, { stiffness: 200, damping: 22 });

  useEffect(() => {
    setMounted(true);
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const hoverable = el?.closest(
        'a, button, [data-hover], input, textarea, select, label'
      );
      setIsPointer(!!hoverable);
      setIsHovering(!!hoverable);
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  if (!mounted || isTouchDevice) return null;

  return (
    <>
      {/* 6px white dot */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        animate={{ scale: isHovering ? 0 : 1, opacity: 1 }}
        transition={{ scale: { type: "spring", stiffness: 600, damping: 30 } }}
        className="pointer-events-none fixed left-0 top-0 z-[99999] h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
      />

      {/* 24px transparent ring — springs behind cursor */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: isHovering ? 2.2 : 1,
          borderColor: isHovering
            ? "rgba(255,255,255,0.5)"
            : "rgba(255,255,255,0.3)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="pointer-events-none fixed left-0 top-0 z-[99998] h-[24px] w-[24px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30"
      />
    </>
  );
}
