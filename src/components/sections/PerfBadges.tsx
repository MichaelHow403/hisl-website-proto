"use client";

import { motion } from "framer-motion";
import { LOCKED_CONTENT } from "@/lib/content-lock";

type Props = {
  ttftTargetMs?: number;
  p50TokPerS?: number;
  mode?: string;
  note?: string;
};

export default function PerfBadges({ 
  ttftTargetMs, 
  p50TokPerS, 
  mode,
  note
}: Props) {
  // Use locked content as defaults
  const perfData = LOCKED_CONTENT.home.perf;
  const finalTtftTargetMs = ttftTargetMs || perfData.ttftTargetMs;
  const finalP50TokPerS = p50TokPerS || perfData.p50TokPerS;
  const finalMode = mode || perfData.mode;
  const finalNote = note || perfData.note;
  const badges = [
    {
      label: "TTFT Target",
      value: `≤${finalTtftTargetMs}ms`,
      description: "Time to First Token"
    },
    {
      label: "Throughput",
      value: `${finalP50TokPerS} tok/s`,
      description: "P50 Token Generation"
    },
    {
      label: "Mode",
      value: finalMode,
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
        {finalNote && (
          <motion.div 
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-sm text-muted italic">
              {finalNote}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
