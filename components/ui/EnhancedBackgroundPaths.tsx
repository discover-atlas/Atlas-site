"use client";

import { motion } from "framer-motion";
import { useId } from "react";

const PATHS = [
  "M -100 400 C 50 200, 200 600, 400 300 S 600 100, 800 250",
  "M 0 600 C 100 400, 300 700, 500 450 S 700 200, 900 350",
  "M 200 100 C 350 300, 500 50, 650 280 S 850 450, 1000 300",
  "M -50 750 C 100 550, 300 800, 550 600 S 750 350, 950 500",
  "M 100 200 C 200 400, 450 150, 600 350 S 800 500, 1050 400",
  "M 300 50 C 400 250, 600 0, 750 200 S 950 380, 1100 250",
];

interface EnhancedBackgroundPathsProps {
  className?: string;
  opacity?: number;
  color?: string;
}

export default function EnhancedBackgroundPaths({
  className = "",
  opacity = 0.4,
  color = "rgba(240,237,232,0.06)",
}: EnhancedBackgroundPathsProps) {
  const id = useId();

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1100 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={`${id}-blur`}>
            <feGaussianBlur stdDeviation="1" />
          </filter>
        </defs>

        {PATHS.map((d, i) => {
          const duration = 6 + i * 1.4;
          const delay = i * 0.9;

          return (
            <g key={i} filter={`url(#${id}-blur)`}>
              {/* Static path */}
              <path
                d={d}
                stroke={color}
                strokeWidth={i % 2 === 0 ? 1.5 : 1}
                strokeDasharray="4 8"
                opacity={opacity * (0.5 + (i % 3) * 0.2)}
              />

              {/* Animated traveling dot */}
              <motion.circle
                r={i % 2 === 0 ? 2.5 : 1.8}
                fill="#f36c21"
                fillOpacity={0.4}
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{
                  duration,
                  delay,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
                style={{
                  offsetPath: `path("${d}")`,
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
