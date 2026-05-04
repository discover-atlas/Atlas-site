"use client";

import { motion } from "framer-motion";

function ExplainerPreview() {
  const bars = [0.4, 0.7, 0.55, 0.9, 0.65, 0.8];
  return (
    <div className="flex items-end gap-1.5 h-12">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-sm bg-[#f36c21]/40"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: h }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 + 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ originY: 1 }}
        />
      ))}
    </div>
  );
}

function MotionPreview() {
  return (
    <div className="relative h-12 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute w-10 h-10 rounded-sm border border-[#f36c21]/30"
        style={{ transformOrigin: "center" }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute w-6 h-6 rounded-full border border-[#f0ede8]/15"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-2.5 h-2.5 rounded-full bg-[#f36c21]/60"
      />
    </div>
  );
}

function AdsPreview() {
  return (
    <div className="h-12 flex items-center gap-3">
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="flex-1 h-8 rounded-lg bg-[#f36c21]/20 border border-[#f36c21]/20 flex items-center justify-center"
      >
        <span className="text-[9px] text-[#f36c21]/60 tracking-widest uppercase font-medium">
          Book Now
        </span>
      </motion.div>
      <div className="flex flex-col gap-1">
        {[0.6, 0.4, 0.8].map((w, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            className="h-1.5 bg-[#f0ede8]/15 rounded-full"
            style={{ width: `${w * 32}px` }}
          />
        ))}
      </div>
    </div>
  );
}

function ReelsPreview() {
  return (
    <div className="h-12 flex items-center gap-2">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="flex-1 h-10 rounded-lg bg-[#111] border border-white/8 overflow-hidden relative"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: "easeInOut", repeatType: "reverse" }}
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, rgba(243,108,33,${0.1 + i * 0.05}) 0%, rgba(243,108,33,0.02) 100%)`,
            }}
          />
          <div className="absolute bottom-1 left-1 right-1 flex justify-center">
            <div className="h-px w-3 bg-[#f36c21]/40 rounded-full" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const contentTypes = [
  {
    tag: "01",
    title: "Explainer Videos",
    description:
      "Turn complex ideas into simple, shareable video stories. AI-scripted, animated, and ready for any platform.",
    preview: <ExplainerPreview />,
  },
  {
    tag: "02",
    title: "Motion Graphics",
    description:
      "Brand-consistent animations that stop the scroll. Data visualisations, logo reveals, and abstract loops.",
    preview: <MotionPreview />,
  },
  {
    tag: "03",
    title: "Animated Ads",
    description:
      "Conversion-optimised creative for paid social. Dynamic, eye-catching, and built to outperform static ads.",
    preview: <AdsPreview />,
  },
  {
    tag: "04",
    title: "Social Media Reels",
    description:
      "Platform-native short-form content for Instagram, TikTok, and LinkedIn — created at scale with AI.",
    preview: <ReelsPreview />,
  },
];

export default function AnimatedSocialMediaSection() {
  return (
    <section id="content" className="relative bg-[#0d0d0d] py-32 md:py-40 lg:py-48 overflow-hidden">
      {/* Subtle top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(240,237,232,0.06), transparent)" }}
      />

      {/* Background radial */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(ellipse 50% 40% at 80% 50%, rgba(243,108,33,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#f36c21]/25 px-3.5 py-1.5 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f36c21]" />
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#f36c21] font-medium">
                New Service
              </span>
            </div>
            <h2
              className="font-display text-[#f0ede8] leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
            >
              AI-POWERED
              <br />
              <span className="text-[#f0ede8]/30">VISUAL CONTENT</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[#f0ede8]/35 text-sm leading-relaxed max-w-xs md:text-right"
          >
            Scroll-stopping animated content created with AI and{" "}
            <span className="text-[#f0ede8]/60">Remotion</span> — from concept to final cut.
          </motion.p>
        </div>

        {/* Content type cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contentTypes.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className="group relative rounded-2xl bg-[#111] border border-white/5 p-6 flex flex-col gap-5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Number watermark */}
              <div
                className="absolute -top-2 -right-1 font-display text-[5rem] leading-none select-none pointer-events-none"
                style={{ color: "rgba(243,108,33,0.04)" }}
              >
                {item.tag}
              </div>

              {/* Animated preview */}
              <div className="relative z-10">{item.preview}</div>

              {/* Tag */}
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#f36c21]/60 font-medium">
                {item.tag} — {item.title}
              </span>

              {/* Description */}
              <p className="text-sm text-[#f0ede8]/40 leading-relaxed">{item.description}</p>

              {/* Hover line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#f36c21]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Powered by badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 flex items-center justify-center gap-6"
        >
          <div className="h-px flex-1 bg-white/5" />
          <div className="flex items-center gap-3 text-[#f0ede8]/20 text-xs tracking-widest uppercase">
            <span>Powered by</span>
            <span className="text-[#f0ede8]/40 font-medium">AI</span>
            <span className="h-1 w-1 rounded-full bg-[#f0ede8]/20" />
            <span className="text-[#f0ede8]/40 font-medium">Remotion</span>
          </div>
          <div className="h-px flex-1 bg-white/5" />
        </motion.div>
      </div>
    </section>
  );
}
