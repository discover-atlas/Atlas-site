"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ArrowRight, PhoneCall } from "lucide-react";

/* ── Pattern type ── */
type PatternName = "neural" | "flow" | "geometric" | "spiral";

/* ────────────────────────────────────────────────
   PATTERN 1 — Geometric Grid
   Randomly filled squares that draw in and fade
──────────────────────────────────────────────── */
function GeometricPaths() {
  const gridSize = 40;
  type GridPath = { id: string; d: string; delay: number };
  const paths: GridPath[] = [];

  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 12; y++) {
      if (Math.random() > 0.7) {
        paths.push({
          id: `grid-${x}-${y}`,
          d: `M${x * gridSize},${y * gridSize} L${(x + 1) * gridSize},${y * gridSize} L${(x + 1) * gridSize},${(y + 1) * gridSize} L${x * gridSize},${(y + 1) * gridSize} Z`,
          delay: Math.random() * 5,
        });
      }
    }
  }

  return (
    <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 480">
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.7, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            delay: path.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

/* ────────────────────────────────────────────────
   PATTERN 2 — Organic Flow
   Horizontal wave paths that draw across the canvas
──────────────────────────────────────────────── */
function FlowPaths() {
  const flowPaths = Array.from({ length: 12 }, (_, i) => {
    const amplitude = 50 + i * 10;
    const offset = i * 60;
    return {
      id: `flow-${i}`,
      d: `M-100,${200 + offset} Q200,${200 + offset - amplitude} 500,${200 + offset} T900,${200 + offset}`,
      strokeWidth: 1 + i * 0.3,
      opacity: 0.1 + i * 0.05,
      delay: i * 0.8,
    };
  });

  return (
    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 800 800">
      {flowPaths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          fill="none"
          stroke="currentColor"
          strokeWidth={path.strokeWidth}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: [0, 1, 0.8, 0],
            opacity: [0, path.opacity, path.opacity * 0.7, 0],
          }}
          transition={{
            duration: 15,
            delay: path.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

/* ────────────────────────────────────────────────
   PATTERN 3 — Neural Network
   Nodes + connections that pulse in and out
──────────────────────────────────────────────── */
function NeuralPaths() {
  const nodes = Array.from({ length: 50 }, (_, i) => ({
    x: Math.random() * 800,
    y: Math.random() * 600,
    id: `node-${i}`,
  }));

  type Connection = { id: string; d: string; delay: number };
  const connections: Connection[] = [];

  nodes.forEach((node, i) => {
    const nearbyNodes = nodes.filter((other, j) => {
      if (i === j) return false;
      const dist = Math.sqrt(
        Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2)
      );
      return dist < 120 && Math.random() > 0.6;
    });

    nearbyNodes.forEach((target) => {
      connections.push({
        id: `conn-${i}-${target.id}`,
        d: `M${node.x},${node.y} L${target.x},${target.y}`,
        delay: Math.random() * 10,
      });
    });
  });

  return (
    <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 600">
      {connections.map((conn) => (
        <motion.path
          key={conn.id}
          d={conn.d}
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 0.8, 0] }}
          transition={{
            duration: 6,
            delay: conn.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {nodes.map((node) => (
        <motion.circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r="2"
          fill="currentColor"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 1.2, 1], opacity: [0, 0.6, 0.9, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

/* ────────────────────────────────────────────────
   PATTERN 4 — Spirals
   Converging spirals that rotate and pulse
──────────────────────────────────────────────── */
function SpiralPaths() {
  const spirals = Array.from({ length: 8 }, (_, i) => {
    const centerX = 400 + ((i % 4) - 1.5) * 200;
    const centerY = 300 + (Math.floor(i / 4) - 0.5) * 200;
    const radius = 80 + i * 15;
    const turns = 3 + i * 0.5;

    let path = `M${centerX + radius},${centerY}`;
    for (let angle = 0; angle <= turns * 360; angle += 5) {
      const radian = (angle * Math.PI) / 180;
      const currentRadius = radius * (1 - angle / (turns * 360));
      path += ` L${centerX + currentRadius * Math.cos(radian)},${
        centerY + currentRadius * Math.sin(radian)
      }`;
    }

    return { id: `spiral-${i}`, d: path, delay: i * 1.2 };
  });

  return (
    <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 800 600">
      {spirals.map((spiral) => (
        <motion.path
          key={spiral.id}
          d={spiral.d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0], rotate: [0, 360] }}
          transition={{
            pathLength: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            delay: spiral.delay,
          }}
        />
      ))}
    </svg>
  );
}

/* ────────────────────────────────────────────────
   MAIN COMPONENT
──────────────────────────────────────────────── */
export default function EnhancedBackgroundPaths({
  title = "Automate Everything",
}: {
  title?: string;
}) {
  const [currentPattern, setCurrentPattern] = useState(0);
  const patterns: PatternName[] = ["neural", "flow", "geometric", "spiral"];
  const words = title.split(" ");

  /* Cycle patterns every 12 s */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPattern((prev) => (prev + 1) % patterns.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const renderPattern = () => {
    switch (currentPattern) {
      case 0: return <NeuralPaths />;
      case 1: return <FlowPaths />;
      case 2: return <GeometricPaths />;
      case 3: return <SpiralPaths />;
      default: return <NeuralPaths />;
    }
  };

  return (
    <div
      id="contact"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* ── Cycling background patterns ── */}
      <div className="absolute inset-0 text-[#f36c21]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPattern}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            {renderPattern()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Vignette overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/75 via-transparent to-[#0a0a0a]/75 pointer-events-none" />

      {/* ── Pattern indicator dots (top-right) ── */}
      <div className="absolute top-8 right-8 flex gap-2 z-20">
        {patterns.map((name, i) => (
          <motion.button
            key={name}
            aria-label={`Switch to ${name} pattern`}
            onClick={() => setCurrentPattern(i)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i === currentPattern
                ? "bg-[#f36c21]"
                : "bg-[#f0ede8]/20 hover:bg-[#f0ede8]/40"
            }`}
            animate={{
              scale: i === currentPattern ? 1.3 : 1,
              opacity: i === currentPattern ? 1 : 0.45,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="max-w-5xl mx-auto flex flex-col items-center gap-10"
        >
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-[10px] tracking-[0.3em] uppercase text-[#f36c21] font-medium"
          >
            Free Strategy Session
          </motion.span>

          {/* Letter-by-letter animated title */}
          <h2
            className="font-display leading-[0.85] tracking-tight"
            style={{ fontSize: "clamp(3.5rem, 12vw, 11rem)" }}
          >
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-[0.2em] last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 80, opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{
                      delay: wordIndex * 0.12 + letterIndex * 0.04,
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                    }}
                    className="inline-block text-transparent bg-clip-text
                               bg-gradient-to-br from-[#f0ede8] via-[#f0ede8]/90 to-[#f36c21]
                               hover:from-[#f36c21] hover:to-[#ff8c42]
                               transition-all duration-500 cursor-default"
                    whileHover={{ scale: 1.06, y: -3 }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="text-lg md:text-xl text-[#f0ede8]/40 font-light tracking-wide max-w-xl"
          >
            In 20 minutes we'll map the exact automations that will save your
            team the most time — and show you the ROI before we build a single workflow.
          </motion.p>

          {/* CTA button with orange gradient border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.8, type: "spring", stiffness: 100 }}
            className="inline-block group"
          >
            <div className="relative p-[1.5px] bg-gradient-to-r from-[#f36c21] via-[#ff8c42] to-[#f36c21] rounded-2xl group-hover:from-[#ff7a2f] group-hover:to-[#ff7a2f] transition-all duration-300">
              <Button
                variant="ghost"
                size="lg"
                className="relative rounded-[14px] px-10 py-6 text-base font-semibold
                           bg-[#0a0a0a] hover:bg-[#111]
                           text-[#f0ede8] transition-all duration-300
                           group-hover:-translate-y-0.5 group-hover:shadow-[0_8px_40px_rgba(243,108,33,0.3)]
                           border-0"
                asChild
              >
                <a
                  href="https://calendly.com/drikusbisschoff/al-agency-discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.span
                    className="flex items-center gap-3"
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <PhoneCall className="w-4 h-4 text-[#f36c21]" />
                    Book a Free Strategy Session
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </motion.span>
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Trust micro-copy */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="flex flex-wrap items-center justify-center gap-5 text-xs text-[#f0ede8]/20"
          >
            {["20-min call", "100% free", "No obligation", "ROI mapping included"].map(
              (badge, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#f36c21]/50" />
                  {badge}
                </div>
              )
            )}
          </motion.div>

          {/* Active pattern label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 1 }}
            className="text-[10px] text-[#f0ede8]/15 font-mono tracking-[0.2em] uppercase"
          >
            Pattern:{" "}
            <span className="text-[#f0ede8]/30">{patterns[currentPattern]}</span>
          </motion.p>
        </motion.div>
      </div>

      {/* ── Floating accent blobs ── */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-5 h-5 bg-[#f36c21]/10 rounded-full blur-md pointer-events-none"
        animate={{ y: [0, -20, 0], x: [0, 10, 0], scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-3/4 right-1/3 w-7 h-7 bg-[#f36c21]/8 rounded-full blur-md pointer-events-none"
        animate={{ y: [0, 15, 0], x: [0, -15, 0], scale: [1, 0.8, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
}
