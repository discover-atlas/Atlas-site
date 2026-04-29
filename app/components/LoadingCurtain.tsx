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
            className="absolute top-0 left-0 right-0 h-1 bg-[#f36c21]"
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
              <div className="font-display text-4xl md:text-5xl tracking-widest text-white mb-1">
                ATLAS
              </div>
              <div className="font-display text-4xl md:text-5xl tracking-widest text-[#f36c21]">
                LEADS
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="h-px bg-[#f36c21] mt-3 origin-left"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-[#f5f1ea]/40 text-xs tracking-[0.3em] mt-2 uppercase"
              >
                Loading
              </motion.p>
            </motion.div>
          </div>

          {/* Bottom orange accent */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-[#f36c21]/30"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
