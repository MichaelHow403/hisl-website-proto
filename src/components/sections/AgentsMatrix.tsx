"use client";

import { motion } from "framer-motion";

type Props = {
  sectors?: string[];
  cta?: string;
};

export default function AgentsMatrix({ 
  sectors = [
    "Construction",
    "Environmental", 
    "Conservation",
    "Pharma (CROx)",
    "Procurement",
    "Agriculture",
    "Trader/Economics",
    "Healthcare/Pet",
    "Insurance",
    "Custom"
  ],
  cta = "Explore agents"
}: Props) {
  return (
    <section className="py-16">
      <div className="container-wrap">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-spectral font-semibold mb-4">
            Sovereign agents tailored to your needs
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            No theatre. Purpose-built AI agents for every sector, 
            designed to amplify human expertise while maintaining full transparency.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector}
              className="bg-panel border border-edge rounded-xl p-4 text-center hover:border-aiGreen/50 transition-colors cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ y: -2 }}
            >
              <div className="text-sm font-semibold text-text group-hover:text-aiGreen transition-colors">
                {sector}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button className="btn btn-gold px-8 py-3 text-lg font-semibold">
            {cta}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
