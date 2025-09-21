"use client";

import { motion } from "framer-motion";

type Props = {
  ttftTargetMs?: number;
  p50TokPerS?: number;
  mode?: string;
};

export default function PerfBadges({ 
  ttftTargetMs = 800, 
  p50TokPerS = 40, 
  mode = "offline-first" 
}: Props) {
  const badges = [
    {
      label: "TTFT Target",
      value: `≤${ttftTargetMs}ms`,
      description: "Time to First Token"
    },
    {
      label: "Throughput",
      value: `${p50TokPerS} tok/s`,
      description: "P50 Token Generation"
    },
    {
      label: "Mode",
      value: mode,
      description: "Operational Mode"
    }
  ];

  return (
    <section className="py-12 bg-panel/50">
      <div className="container-wrap">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              className="bg-panel border border-edge rounded-xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-2xl font-bold text-brandGold mb-2">
                {badge.value}
              </div>
              <div className="text-sm font-semibold text-text mb-1">
                {badge.label}
              </div>
              <div className="text-xs text-muted">
                {badge.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
