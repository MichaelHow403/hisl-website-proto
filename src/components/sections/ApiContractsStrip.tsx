"use client";

import { motion } from "framer-motion";

type Props = {
  endpoints?: string[];
  note?: string;
};

export default function ApiContractsStrip({ 
  endpoints = ["/v1/site/page", "/v1/site/seo", "/v1/site/forms/{id}"],
  note = "immutable contracts"
}: Props) {
  return (
    <section className="py-8 bg-edge/30">
      <div className="container-wrap">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="text-sm font-semibold text-aiGreen uppercase tracking-wide">
              API Surface
            </span>
            <div className="flex flex-wrap gap-2">
              {endpoints.map((endpoint, index) => (
                <motion.code
                  key={endpoint}
                  className="bg-panel px-3 py-1 rounded-lg text-sm font-mono text-text border border-edge"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {endpoint}
                </motion.code>
              ))}
            </div>
          </div>
          <div className="text-sm text-muted italic">
            {note}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
