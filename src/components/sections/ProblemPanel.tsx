"use client";

import { motion } from "framer-motion";

type Props = {
  sectionTitle: string;
  heading: string;
  body: string;
  quote: string;
};

export default function ProblemPanel({ 
  sectionTitle, 
  heading, 
  body, 
  quote 
}: Props) {
  return (
    <section className="py-16 bg-panel/30">
      <div className="container-wrap">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm font-semibold text-aiGreen uppercase tracking-wide mb-6">
            {sectionTitle}
          </h2>
          <h3 className="text-3xl md:text-4xl font-spectral font-semibold mb-8 text-text">
            {heading}
          </h3>
          <p className="text-lg text-muted leading-relaxed mb-8">
            {body}
          </p>
        </motion.div>

        {/* Quote Card */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="bg-panel border border-edge rounded-xl p-8 text-center">
            <blockquote className="text-xl font-spectral italic text-text">
              "{quote}"
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
