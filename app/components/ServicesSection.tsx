"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

/* ─── Service demos ─────────────────────────────────────── */

function WebDesignDemo() {
  const contentRows = [85, 95, 70, 88, 60];
  return (
    <motion.div
      className="rounded-xl overflow-hidden bg-[#0d0d0d] border border-white/8 shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {/* Browser chrome */}
      <div className="bg-[#161616] px-4 py-3 flex items-center gap-3 border-b border-white/5">
        <div className="flex gap-1.5">
          {["bg-[#ff5f57]", "bg-[#febc2e]", "bg-[#28c840]"].map((c, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${c} opacity-80`} />
          ))}
        </div>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "60%" }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-5 bg-[#222] rounded-full flex items-center overflow-hidden px-2"
        >
          <span className="text-[10px] text-white/25 whitespace-nowrap">
            yourbusiness.com
          </span>
        </motion.div>
      </div>

      {/* Fake website content */}
      <div className="p-5 space-y-3 bg-[#0d0d0d]">
        {/* Nav */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-between items-center mb-4"
        >
          <div className="h-4 w-14 rounded-md bg-[#f36c21] opacity-80" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-2.5 w-8 rounded-full bg-white/15" />
            ))}
          </div>
          <div className="h-6 w-16 rounded-full bg-[#f36c21] opacity-70" />
        </motion.div>

        {/* Hero block */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-20 rounded-lg origin-left"
          style={{ background: "linear-gradient(135deg, rgba(243,108,33,0.3) 0%, rgba(17,17,17,1) 100%)" }}
        >
          <div className="p-4">
            <div className="h-3 w-3/4 rounded-full bg-white/30 mb-2" />
            <div className="h-2 w-1/2 rounded-full bg-white/15" />
          </div>
        </motion.div>

        {/* Content lines */}
        {contentRows.map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
            style={{ width: `${w}%` }}
            className="h-2.5 rounded-full bg-white/10"
          />
        ))}
      </div>
    </motion.div>
  );
}

function SeoDemo() {
  const results = [
    { rank: 1, name: "Your Business", url: "yourbusiness.com", highlight: true },
    { rank: 2, name: "Competitor A", url: "competitora.com", highlight: false },
    { rank: 3, name: "Competitor B", url: "competitorb.com", highlight: false },
  ];
  const barData = [30, 45, 60, 80, 95, 100];

  return (
    <div className="space-y-4">
      {/* Animated chart */}
      <div className="flex items-end gap-2 h-24 mb-4">
        {barData.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 rounded-t-md"
            style={{
              background: i === barData.length - 1 ? "#f36c21" : "rgba(243,108,33,0.3)",
            }}
          />
        ))}
      </div>

      {/* Search results */}
      <div className="rounded-xl bg-[#0d0d0d] border border-white/8 overflow-hidden">
        <div className="px-4 py-2.5 border-b border-white/5 flex items-center gap-2">
          <div className="h-4 w-4 rounded-sm bg-[#4285F4]" />
          <div className="h-2.5 flex-1 bg-white/10 rounded-full" />
          <div className="h-2.5 w-12 bg-[#f36c21]/30 rounded-full" />
        </div>
        {results.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
            className={`px-4 py-3 border-b border-white/5 last:border-0 ${
              r.highlight ? "bg-[#f36c21]/8" : ""
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              {r.highlight && (
                <span className="text-[10px] rounded bg-[#f36c21] text-black px-1.5 py-0.5 font-bold">
                  #1
                </span>
              )}
              <span
                className={`text-sm font-medium ${r.highlight ? "text-[#f5f1ea]" : "text-[#f5f1ea]/50"}`}
              >
                {r.name}
              </span>
            </div>
            <div className="text-[11px] text-[#f36c21]/60">{r.url}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LeadEngineDemo() {
  const sources = [
    { icon: "📱", label: "Phone", angle: -60 },
    { icon: "📋", label: "Form", angle: 0 },
    { icon: "🔍", label: "Google", angle: 60 },
  ];
  return (
    <div className="relative h-56 flex items-center justify-center">
      {/* CRM hub */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 0px rgba(243,108,33,0)", "0 0 30px rgba(243,108,33,0.4)", "0 0 0px rgba(243,108,33,0)"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 rounded-2xl bg-[#f36c21] text-black px-5 py-4 text-center font-bold text-sm shadow-xl"
      >
        <div className="text-xl mb-1">⚙️</div>
        CRM
        <div className="text-[10px] font-normal opacity-70">Live Dashboard</div>
      </motion.div>

      {/* Source nodes */}
      {sources.map((src, i) => {
        const rad = (src.angle - 90) * (Math.PI / 180);
        const r = 100;
        const cx = Math.cos(rad) * r;
        const cy = Math.sin(rad) * r;
        return (
          <div
            key={i}
            className="absolute"
            style={{ transform: `translate(calc(-50% + ${cx}px), calc(-50% + ${cy}px))` }}
          >
            {/* Animated connector */}
            <svg
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: r * 2 + 60,
                height: r * 2 + 60,
                overflow: "visible",
              }}
            >
              <motion.line
                x1={cx + r + 30}
                y1={cy + r + 30}
                x2={r + 30}
                y2={r + 30}
                stroke="#f36c21"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeOpacity="0.4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.3, duration: 0.8 }}
              />
              {/* Moving dot */}
              <motion.circle
                r={3}
                fill="#f36c21"
                animate={{
                  offsetDistance: ["0%", "100%"],
                }}
                style={{
                  offsetPath: `path("M ${cx + r + 30} ${cy + r + 30} L ${r + 30} ${r + 30}")`,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.5,
                }}
              />
            </svg>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15, type: "spring", stiffness: 300 }}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-xl">
                {src.icon}
              </div>
              <span className="text-[10px] text-[#f5f1ea]/40">{src.label}</span>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

function CrmDemo() {
  const messages = [
    { side: "right", text: "Hi! Is your AC service available today?", delay: 0 },
    { side: "left", text: "Yes! We can be there by 2pm. Shall I book you in?", delay: 0.4 },
    { side: "right", text: "Perfect, yes please!", delay: 0.8 },
    { side: "left", text: "✅ Booked! See you at 2pm.", delay: 1.2 },
  ];

  return (
    <div className="space-y-3">
      {/* Chat UI */}
      <div className="rounded-xl bg-[#0d0d0d] border border-white/8 p-4 space-y-2.5">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: msg.delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`flex ${msg.side === "right" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-2xl px-4 py-2 text-xs max-w-[75%] ${
                msg.side === "right"
                  ? "bg-[#f36c21] text-black font-medium"
                  : "bg-[#1a1a1a] text-[#f5f1ea]/70"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Calendar slots filling */}
      <div className="grid grid-cols-5 gap-1.5">
        {Array.from({ length: 10 }, (_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 400 }}
            className={`h-7 rounded-md text-[10px] flex items-center justify-center font-medium ${
              i < 7
                ? "bg-[#f36c21] text-black"
                : "bg-[#1a1a1a] border border-white/10 text-white/30"
            }`}
          >
            {i < 7 ? "✓" : "—"}
          </motion.div>
        ))}
      </div>
      <p className="text-[11px] text-[#f5f1ea]/30 text-center">7/10 slots booked this week</p>
    </div>
  );
}

/* ─── Service card with 3D tilt ─────────────────────────── */

interface ServiceBlock {
  id: string;
  tag: string;
  title: string;
  desc: string;
  bullets: string[];
  reverse: boolean;
  demo: React.ReactNode;
}

function ServiceCard({ service }: { service: ServiceBlock }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springX = useSpring(rotX, { stiffness: 300, damping: 30 });
  const springY = useSpring(rotY, { stiffness: 300, damping: 30 });
  const transform = useMotionTemplate`perspective(1200px) rotateX(${springX}deg) rotateY(${springY}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotX.set(-dy * 6);
    rotY.set(dx * 6);
  };

  const handleMouseLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center ${
        service.reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Text */}
      <div>
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-block text-[11px] tracking-[0.25em] uppercase text-[#f36c21] mb-4 font-medium"
        >
          {service.tag}
        </motion.span>
        <h3 className="font-display text-[clamp(2rem,3.5vw,3.75rem)] text-[#f5f1ea] leading-tight mb-6">
          {service.title}
        </h3>
        <p className="text-[#f5f1ea]/50 text-base leading-relaxed mb-8">{service.desc}</p>
        <ul className="space-y-3">
          {service.bullets.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
              className="flex items-center gap-3 text-sm text-[#f5f1ea]/70"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#f36c21] shrink-0" />
              {b}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Demo card with 3D tilt */}
      <motion.div
        ref={cardRef}
        style={{ transform }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="rounded-2xl bg-[#0f0f0f] border border-white/8 p-4 md:p-6 shadow-2xl overflow-hidden"
      >
        {service.demo}
      </motion.div>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────── */

export default function ServicesSection() {
  const services: ServiceBlock[] = [
    {
      id: "web-design",
      tag: "01 — Web Design",
      title: "SITES THAT\nCONVERT",
      desc: "We build high-performance websites laser-focused on one goal: turning visitors into booked jobs. Custom design, built around your brand, your offer and your local market.",
      bullets: [
        "Mobile-first, lightning-fast load times",
        "Conversion-optimised layout and copy",
        "Click-to-call, forms and booking integrations",
        "Handcrafted — never a template",
      ],
      reverse: false,
      demo: <WebDesignDemo />,
    },
    {
      id: "seo",
      tag: "02 — SEO",
      title: "RANK #1\nLOCALLY",
      desc: "Dominate Google for the searches that matter most. We optimise every page for local intent so that when someone in your city needs your service, your name is the first they see.",
      bullets: [
        "Google Business Profile optimisation",
        "Local keyword targeting and on-page SEO",
        "Citation building and link acquisition",
        "Monthly ranking reports with real data",
      ],
      reverse: true,
      demo: <SeoDemo />,
    },
    {
      id: "leads",
      tag: "03 — Lead Generation",
      title: "LEADS ON\nAUTOPILOT",
      desc: "Multiple inbound channels all feeding into one centralised system. Phone, form, and Google — every inquiry captured, tracked and responded to, even at 2am.",
      bullets: [
        "Multi-channel lead capture (phone, form, chat)",
        "Real-time lead notifications",
        "Automated missed call text-back",
        "Lead source tracking and attribution",
      ],
      reverse: false,
      demo: <LeadEngineDemo />,
    },
    {
      id: "crm",
      tag: "04 — CRM & Automation",
      title: "FOLLOW-UP\nTHAT CLOSES",
      desc: "53% of businesses never follow up with a lead. Our automated CRM ensures every prospect gets the right message at the right time — until they book.",
      bullets: [
        "Automated SMS and email sequences",
        "Calendar booking and reminders",
        "Pipeline management dashboard",
        "Review request automation",
      ],
      reverse: true,
      demo: <CrmDemo />,
    },
  ];

  return (
    <section id="services" className="relative bg-[#0a0a0a] py-16 sm:py-20 md:py-28 lg:py-32">
      {/* Subtle background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(243,108,33,0.05) 0%, transparent 100%)" }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20 max-w-2xl"
        >
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#f36c21] font-medium mb-4 block">
            What we build for you
          </span>
          <h2 className="font-display text-[clamp(2.5rem,5.5vw,5rem)] text-[#f5f1ea] leading-tight">
            THE FULL
            <br />
            <span className="text-[#f36c21]">GROWTH STACK</span>
          </h2>
        </motion.div>

        {/* Service blocks */}
        <div className="space-y-16 md:space-y-24 lg:space-y-28">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
