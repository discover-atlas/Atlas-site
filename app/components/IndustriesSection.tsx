"use client";

import { motion } from "framer-motion";

const industries = [
  { icon: "❄️", name: "HVAC", desc: "Heating & Cooling" },
  { icon: "🔧", name: "Plumbing", desc: "Pipes & Drains" },
  { icon: "⚡", name: "Electrical", desc: "Wiring & Panels" },
  { icon: "🏠", name: "Roofing", desc: "Repair & Replace" },
  { icon: "🌿", name: "Landscaping", desc: "Design & Maintain" },
  { icon: "🐛", name: "Pest Control", desc: "Inspect & Treat" },
  { icon: "🚪", name: "Garage Doors", desc: "Install & Repair" },
  { icon: "🧹", name: "Cleaning", desc: "Residential & Commercial" },
  { icon: "🎨", name: "Painting", desc: "Interior & Exterior" },
  { icon: "🏗️", name: "Contractors", desc: "General & Specialty" },
];

export default function IndustriesSection() {
  return (
    <section className="relative bg-[#080808] py-32 md:py-40 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 100% 50%, rgba(243,108,33,0.04) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#f36c21] font-medium mb-4 block">
            Industries we serve
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-[#f5f1ea] leading-tight">
            YOUR TRADE,
            <br />
            <span className="text-[#f36c21]">OUR EXPERTISE</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {industries.map((industry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                delay: i * 0.06,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -8,
                scale: 1.04,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
              className="group relative rounded-2xl bg-[#0f0f0f] border border-white/6 p-5 flex flex-col items-center text-center gap-3 cursor-none overflow-hidden"
            >
              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 60%, rgba(243,108,33,0.12) 0%, transparent 70%)",
                }}
              />

              {/* Border glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1px rgba(243,108,33,0.4)" }}
              />

              {/* Icon */}
              <motion.span
                className="text-4xl leading-none"
                whileHover={{ scale: 1.2, rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.4 }}
              >
                {industry.icon}
              </motion.span>

              {/* Text */}
              <div>
                <p className="font-display text-sm text-[#f5f1ea] group-hover:text-[#f36c21] transition-colors duration-300">
                  {industry.name.toUpperCase()}
                </p>
                <p className="text-[11px] text-[#f5f1ea]/35 mt-0.5">{industry.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-[#f5f1ea]/30 text-sm mt-12"
        >
          Don&apos;t see your trade?{" "}
          <a
            href="https://calendly.com/drikusbisschoff/al-agency-discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f36c21] hover:underline underline-offset-4"
          >
            Book a call anyway →
          </a>
        </motion.p>
      </div>
    </section>
  );
}
