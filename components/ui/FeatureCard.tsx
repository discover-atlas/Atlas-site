"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  tag?: string;
  index?: number;
}

export function FeatureCard({ icon, title, description, tag, index = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className="group relative rounded-2xl bg-[#111] border border-white/5 p-6 flex flex-col gap-4 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#f0ede8]/60 group-hover:bg-[#f36c21]/10 group-hover:text-[#f36c21] transition-all duration-300 shrink-0">
        {icon}
      </div>

      {/* Tag */}
      {tag && (
        <span className="text-[10px] tracking-[0.22em] uppercase text-[#f36c21]/70 font-medium -mb-1">
          {tag}
        </span>
      )}

      {/* Title */}
      <h3 className="font-display text-xl text-[#f0ede8] leading-tight">{title}</h3>

      {/* Description */}
      <p className="text-sm text-[#f0ede8]/40 leading-relaxed flex-1">{description}</p>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#f36c21]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="absolute top-0 right-0 w-full h-full"
          style={{
            background: "radial-gradient(circle at top right, rgba(243,108,33,0.06) 0%, transparent 70%)",
          }}
        />
      </div>
    </motion.div>
  );
}

interface FeatureCardGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}

export function FeatureCardGrid({ children, columns = 3 }: FeatureCardGridProps) {
  const colClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={`grid grid-cols-1 ${colClass} gap-4`}>
      {children}
    </div>
  );
}
