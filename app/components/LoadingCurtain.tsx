"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingCurtain() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[99990] flex items-center justify-center"
          style={{ background: "#0a0a0a" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        >
          {/* Top orange accent strip */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1 bg-[#00C9C8]"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Logo reveal */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="font-display text-4xl md:text-6xl tracking-[0.1em] text-[#f0ede8] mb-1">
                ATLAS
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="h-px bg-[#00C9C8] mt-3 origin-left opacity-50"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-[#f0ede8]/30 text-[9px] tracking-[0.35em] mt-2.5 uppercase"
              >
                Automation Consulting
              </motion.p>
            </motion.div>
          </div>

          {/* Bottom orange accent */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-[#00C9C8]/30"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
