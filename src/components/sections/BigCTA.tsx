"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LOCKED_CONTENT } from "@/lib/content-lock";

type Props = {
  title?: string;
  primary?: string;
  to?: string;
  secondary?: string;
  secondaryTo?: string;
};

export default function BigCTA({ 
  title,
  primary,
  to,
  secondary,
  secondaryTo
}: Props) {
  // Use locked content as defaults
  const ctaData = LOCKED_CONTENT.home.cta_contact;
  const finalTitle = title || ctaData.title;
  const finalPrimary = primary || ctaData.primary;
  const finalTo = to || ctaData.to;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container-wrap">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
            <span className="gradient-text">{finalTitle}</span>
          </h2>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link 
              href={finalTo} 
              className="btn btn-gold px-12 py-4 text-xl font-semibold min-w-[240px] transform hover:scale-105 transition-transform"
            >
              {finalPrimary}
            </Link>
            
            {secondary && secondaryTo && (
              <Link 
                href={secondaryTo} 
                className="btn btn-ghost px-12 py-4 text-xl font-semibold min-w-[240px]"
              >
                {secondary}
              </Link>
            )}
          </motion.div>
          
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-muted text-sm">
              Ready to build with sovereign AI? Let's start the conversation.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}