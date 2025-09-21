"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getLockedPoemText, getLockedPoemTitle } from "@/lib/poem-lock";
import Img from "@/components/ui/Img";

export default function PoemPanel() {
  const poemText = getLockedPoemText();
  const poemTitle = getLockedPoemTitle();

  return (
    <section className="relative py-16 overflow-hidden" aria-label="Poem">
      {/* Background with cosmic starfield */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0">
          <Img 
            assetId="starfield_cosmic" 
            sizes="100vw" 
            rounded={false}
          />
        </div>
        {/* Vignette overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
      </div>

      <div className="container-wrap relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.article
            className="bg-panel/80 backdrop-blur-sm border border-edge rounded-xl p-8 md:p-12"
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
              <h2 className="text-2xl md:text-3xl font-spectral font-semibold mb-8 text-brandGold">
                {poemTitle}
              </h2>
            </motion.header>
            
            {/* Poem Text - Verbatim with proper typography */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <blockquote className="text-lg md:text-xl font-spectral leading-relaxed text-text italic whitespace-pre-wrap mb-6">
                {poemText}
              </blockquote>
            </motion.div>
            
            {/* Attribution */}
            <motion.footer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <cite className="text-muted not-italic">
                — Michael Howard MCIOB, Founder HISL
              </cite>
            </motion.footer>

            {/* Link to full poem page */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link href="/poem" className="text-sm text-aiGreen hover:text-brandGold transition-colors">
                Read the full poem →
              </Link>
            </motion.div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
