"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Img from "@/components/ui/Img";

export default function HeroCosmic() {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section className="relative h-[70vh] min-h-[540px] w-full overflow-hidden">
      {/* Background image with gradient for text contrast */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />
        <div className="absolute inset-0">
          <Img 
            assetId="reach_for_the_stars" 
            priority 
            sizes="(max-width: 1024px) 100vw, 1400px" 
            rounded={false}
          />
        </div>
      </div>

      {/* Headline */}
      <div className="relative z-20 container-wrap flex items-center h-full">
        <div className="max-w-4xl">
          <motion.h1 
            className="text-white text-4xl md:text-6xl font-spectral font-semibold leading-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            AI + Human… with soul.
          </motion.h1>
          <motion.p 
            className="mt-6 text-white/90 text-lg md:text-xl max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            This is a demonstration of what one human, augmented by AI, can achieve. 
            Sovereign AI tailored to you.
          </motion.p>
          <motion.div 
            className="mt-8 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="btn btn-gold px-8 py-3 text-lg font-semibold">
              Start a Demo
            </button>
            <button className="btn btn-ghost px-8 py-3 text-lg">
              Learn about AI prompts
            </button>
          </motion.div>
        </div>
      </div>

      {/* Subtle floating particles (perf-safe) */}
      {!prefersReduced && mounted && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div className="absolute left-10 top-16 w-1 h-1 rounded-full bg-white/60 blur-[2px]" />
          <div className="absolute right-24 top-40 w-1 h-1 rounded-full bg-white/50 blur-[2px]" />
          <div className="absolute left-1/3 bottom-32 w-1 h-1 rounded-full bg-brandGold/40 blur-[2px]" />
        </motion.div>
      )}

      {/* Optional raven sprites (very light) */}
      {!prefersReduced && mounted && (
        <div aria-hidden className="absolute inset-0 z-20 pointer-events-none">
          <motion.div
            className="absolute w-24 md:w-32 opacity-80"
            initial={{ x: -80, y: 40, rotate: -8 }}
            animate={{ 
              x: ["-10%", "110%"], 
              y: [30, -10, 50], 
              rotate: [-6, 4, -3] 
            }}
            transition={{ 
              duration: 16, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Img assetId="raven_huginn" rounded={false} />
          </motion.div>
          <motion.div
            className="absolute w-20 md:w-28 opacity-70"
            style={{ right: -80, top: 120 }}
            initial={{ rotate: 6 }}
            animate={{ 
              right: ["-10%", "110%"], 
              top: [120, 80, 160], 
              rotate: [4, -5, 3] 
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "easeInOut", 
              delay: 3 
            }}
          >
            <Img assetId="raven_muninn" rounded={false} />
          </motion.div>
        </div>
      )}
    </section>
  );
}
