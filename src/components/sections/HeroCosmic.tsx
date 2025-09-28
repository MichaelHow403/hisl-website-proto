"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Img from "@/components/Img";

type Props = {
  headline: string;
  subheadline: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
};

export default function HeroCosmic({ 
  headline, 
  subheadline, 
  primaryCTA, 
  secondaryCTA 
}: Props) {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100">
      {/* Professional background with subtle patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/80 to-gray-50/90 z-10" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #D9A441 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #D9A441 1px, transparent 1px)`,
            backgroundSize: '60px 60px, 40px 40px',
            backgroundPosition: '0 0, 30px 30px'
          }} />
        </div>
      </div>

      {/* Headline */}
      <div className="relative z-20 container-wrap flex items-center min-h-screen">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 text-sm font-medium text-amber-800 mb-6">
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
              Enterprise AI Platform
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="gradient-text">{headline}</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {subheadline}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href={primaryCTA.href} className="btn btn-gold px-8 py-4 text-lg font-semibold min-w-[200px]">
              {primaryCTA.text}
            </Link>
            <Link href={secondaryCTA.href} className="btn btn-outline px-8 py-4 text-lg min-w-[200px]">
              {secondaryCTA.text}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Professional geometric elements */}
      {!prefersReduced && mounted && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {/* Subtle geometric shapes */}
          <div className="absolute top-20 right-20 w-32 h-32 border border-amber-200/30 rounded-full" />
          <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg rotate-12 opacity-60" />
          <div className="absolute top-1/2 right-1/4 w-16 h-16 border-2 border-amber-300/40 rounded-full" />
        </motion.div>
      )}

      {/* Professional floating elements */}
      {!prefersReduced && mounted && (
        <div aria-hidden className="absolute inset-0 z-20 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400 rounded-full opacity-60"
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.6, 0.3, 0.6]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/3 w-1 h-1 bg-amber-500 rounded-full opacity-80"
            animate={{ 
              y: [0, -15, 0],
              opacity: [0.8, 0.4, 0.8]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
      )}
    </section>
  );
}
