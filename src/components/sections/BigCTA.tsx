"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  title: string;
  primary: string;
  to: string;
  subtitle?: string;
  secondary?: string;
  secondaryTo?: string;
};

export default function BigCTA({ 
  title, 
  primary, 
  to, 
  subtitle,
  secondary,
  secondaryTo 
}: Props) {
  return (
    <section className="py-20 bg-gradient-to-br from-panel to-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-aiGreen/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-brandGold/20 blur-3xl" />
      </div>
      
      <div className="container-wrap relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-spectral font-semibold mb-6">
            {title}
          </h2>
          
          {subtitle && (
            <p className="text-lg text-muted mb-10 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link href={to} className="btn btn-gold px-10 py-4 text-lg font-semibold">
              {primary}
            </Link>
            
            {secondary && secondaryTo && (
              <Link href={secondaryTo} className="btn btn-ghost px-10 py-4 text-lg">
                {secondary}
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
