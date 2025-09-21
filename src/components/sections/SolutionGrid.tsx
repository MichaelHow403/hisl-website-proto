"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type Feature = {
  title: string;
  description: string;
  icon: string;
  badge?: string;
};

type Props = {
  sectionTitle: string;
  subheading: string;
  features: Feature[];
  cta?: {
    text: string;
    href: string;
  };
};

const iconMap: Record<string, string> = {
  network: "🔗",
  shield: "🛡️",
  lock: "🔒",
  hammer: "🔨",
  leaf: "🍃"
};

export default function SolutionGrid({ 
  sectionTitle, 
  subheading, 
  features, 
  cta 
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
            {sectionTitle}
          </h2>
          <p className="text-xl text-brandGold font-medium">
            {subheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-panel border border-edge rounded-xl p-6 hover:border-aiGreen/50 transition-colors group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-2xl">
                  {iconMap[feature.icon] || "⚡"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-text group-hover:text-aiGreen transition-colors">
                      {feature.title}
                    </h3>
                    {feature.badge && (
                      <span className="px-2 py-1 bg-brandGold/20 text-brandGold text-xs font-medium rounded-md">
                        {feature.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {cta && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href={cta.href} className="btn btn-gold px-8 py-3 text-lg font-semibold">
              {cta.text}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
