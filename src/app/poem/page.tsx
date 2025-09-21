"use client";

import { motion } from "framer-motion";
import GlobalHeader from "@/components/sections/GlobalHeader";
import GlobalFooter from "@/components/sections/GlobalFooter";
import Img from "@/components/ui/Img";
import { getLockedPoemText, getLockedPoemTitle } from "@/lib/poem-lock";

export default function Poem() {
  const poemText = getLockedPoemText();
  const poemTitle = getLockedPoemTitle();

  return (
    <main className="min-h-screen bg-bg text-text">
      <GlobalHeader />
      
      {/* Cosmic Background Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden" aria-label="Poem">
        {/* Background with cosmic starfield */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0">
            <Img 
              assetId="starfield_cosmic" 
              priority 
              sizes="100vw" 
              rounded={false}
            />
          </div>
          {/* Vignette overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
        </div>

        <div className="container-wrap w-full relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Poem Panel */}
            <motion.article
              className="relative bg-panel/80 backdrop-blur-sm border border-edge rounded-2xl p-8 md:p-12 lg:p-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Title */}
              <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-spectral font-semibold mb-8 text-brandGold">
                  {poemTitle}
                </h1>
              </motion.header>
              
              {/* Poem Text - Verbatim with proper typography */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <blockquote className="text-lg md:text-xl lg:text-2xl font-spectral leading-relaxed text-text italic whitespace-pre-wrap">
                  {poemText}
                </blockquote>
              </motion.div>
              
              {/* Attribution */}
              <motion.footer
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <cite className="text-muted not-italic">
                  — Michael Howard MCIOB, Founder HISL
                </cite>
              </motion.footer>
            </motion.article>
            
            {/* Context and Navigation */}
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
                A timeless principle that guides our work: when skill serves thought, 
                the hand brings perfect form. This is the foundation of everything we build at HISL.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/about/michael" className="btn btn-gold px-8 py-3">
                  About the founder
                </a>
                <a href="/about/integai" className="btn btn-ghost px-8 py-3">
                  About IntegAI
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Subtle floating particles for cosmic effect */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div className="absolute left-10 top-16 w-1 h-1 rounded-full bg-white/60 blur-[2px]" />
          <div className="absolute right-24 top-40 w-1 h-1 rounded-full bg-white/50 blur-[2px]" />
          <div className="absolute left-1/3 bottom-32 w-1 h-1 rounded-full bg-brandGold/40 blur-[2px]" />
          <div className="absolute right-1/3 top-1/4 w-1 h-1 rounded-full bg-aiGreen/30 blur-[2px]" />
        </motion.div>
      </section>
      
      <GlobalFooter />
    </main>
  );
}
