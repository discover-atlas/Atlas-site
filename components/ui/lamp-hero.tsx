"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/* ─────────────────────────────────────────────────
   Types — missing from original, added here
───────────────────────────────────────────────── */
interface HeroAction {
  label: string;
  href: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

interface HeroProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  gradient?: boolean;
  blur?: boolean;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: HeroAction[];
  titleClassName?: string;
  subtitleClassName?: string;
  actionsClassName?: string;
}

/* ─────────────────────────────────────────────────
   Lamp / conic-glow effect
   Note: conic gradients are fully inline-styled to
   avoid Tailwind v4 bg-gradient-conic incompatibility.
   Primary colour: #00C9C8 (Atlas Leads brand orange).
───────────────────────────────────────────────── */
const ORANGE = "rgba(0,201,200,";

const Hero = React.forwardRef<HTMLElement, HeroProps>(
  (
    {
      className,
      gradient = true,
      blur = true,
      title,
      subtitle,
      actions,
      titleClassName,
      subtitleClassName,
      actionsClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative z-0 flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]",
          className,
        )}
        {...props}
      >
        {gradient && (
          <div className="absolute top-0 isolate z-0 flex w-screen flex-1 items-start justify-center">

            {/* Backdrop blur strip */}
            {blur && (
              <div className="absolute top-0 z-50 h-48 w-screen bg-transparent opacity-10 backdrop-blur-md" />
            )}

            {/* Central glow blob */}
            <div
              className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-[-30%] rounded-full blur-3xl"
              style={{ background: `${ORANGE}0.55)`, opacity: 0.75 }}
            />

            {/* Lamp glow (animates wider) */}
            <motion.div
              initial={{ width: "8rem" }}
              viewport={{ once: true }}
              transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
              whileInView={{ width: "16rem" }}
              className="absolute top-0 z-30 h-36 -translate-y-[20%] rounded-full blur-2xl"
              style={{ background: `${ORANGE}0.55)` }}
            />

            {/* Top horizontal light line */}
            <motion.div
              initial={{ width: "15rem" }}
              viewport={{ once: true }}
              transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
              whileInView={{ width: "30rem" }}
              className="absolute inset-auto z-50 h-0.5 -translate-y-[-10%]"
              style={{ background: `${ORANGE}0.55)` }}
            />

            {/* Left conic cone */}
            <motion.div
              initial={{ opacity: 0.5, width: "15rem" }}
              whileInView={{ opacity: 1, width: "30rem" }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-auto right-1/2 h-56 overflow-visible"
              style={{
                backgroundImage: `conic-gradient(from 70deg at center top, ${ORANGE}0.55) 0%, transparent 60%)`,
              }}
            >
              {/* Fade bottom edge */}
              <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-[#0a0a0a] [mask-image:linear-gradient(to_top,white,transparent)]" />
              {/* Fade left edge */}
              <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-[#0a0a0a] [mask-image:linear-gradient(to_right,white,transparent)]" />
            </motion.div>

            {/* Right conic cone */}
            <motion.div
              initial={{ opacity: 0.5, width: "15rem" }}
              whileInView={{ opacity: 1, width: "30rem" }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-auto left-1/2 h-56 overflow-visible"
              style={{
                backgroundImage: `conic-gradient(from 290deg at center top, transparent 40%, ${ORANGE}0.55) 100%)`,
              }}
            >
              {/* Fade right edge */}
              <div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-[#0a0a0a] [mask-image:linear-gradient(to_left,white,transparent)]" />
              {/* Fade bottom edge */}
              <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-[#0a0a0a] [mask-image:linear-gradient(to_top,white,transparent)]" />
            </motion.div>
          </div>
        )}

        {/* Content */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="relative z-50 container flex flex-1 flex-col items-center justify-center px-5 md:px-10 gap-4 -translate-y-16"
        >
          <div className="flex flex-col items-center text-center space-y-6">

            <h1
              className={cn(
                "font-display text-[#f0ede8] leading-[0.9] tracking-tight",
                titleClassName,
              )}
              style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
            >
              {title}
            </h1>

            {subtitle && (
              <p
                className={cn(
                  "text-base md:text-lg text-[#f0ede8]/35 font-light leading-relaxed max-w-[42ch]",
                  subtitleClassName,
                )}
              >
                {subtitle}
              </p>
            )}

            {actions && actions.length > 0 && (
              <div className={cn("flex flex-wrap gap-4 justify-center mt-2", actionsClassName)}>
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant ?? "default"}
                    size="lg"
                    className={
                      action.variant === "outline"
                        ? "rounded-full border-[#f0ede8]/20 bg-transparent text-[#f0ede8]/60 hover:bg-white/5 hover:text-[#f0ede8] hover:border-[#f0ede8]/40 tracking-wide"
                        : "rounded-full bg-[#00C9C8] text-white hover:bg-[#00b3b2] tracking-wide shadow-[0_0_32px_rgba(0,201,200,0.25)] hover:shadow-[0_0_48px_rgba(0,201,200,0.4)]"
                    }
                    asChild
                  >
                    <Link href={action.href}>{action.label}</Link>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 opacity-25 pointer-events-none">
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#f0ede8] font-medium">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-[#f0ede8]/60 to-transparent" />
        </div>
      </section>
    );
  },
);
Hero.displayName = "Hero";

export { Hero };
export type { HeroProps };
