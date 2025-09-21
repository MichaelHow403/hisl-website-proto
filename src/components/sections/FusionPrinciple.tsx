"use client";

import { motion } from "framer-motion";
import Img from "@/components/ui/Img";

type Props = {
  sectionTitle: string;
  humanColumn: {
    title: string;
    content: string;
  };
  aiColumn: {
    title: string;
    content: string;
  };
  fusionText: string;
};

export default function FusionPrinciple({ 
  sectionTitle, 
  humanColumn, 
  aiColumn, 
  fusionText 
}: Props) {
  return (
    <section className="py-16 bg-gradient-to-br from-panel/50 to-bg">
      <div className="container-wrap">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-spectral font-semibold text-brandGold">
            {sectionTitle}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Human Column */}
          <motion.div
            className="bg-panel border border-edge rounded-xl p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-start gap-6 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Img assetId="michael_headshot" sizes="64px" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text mb-2">
                  {humanColumn.title}
                </h3>
              </div>
            </div>
            <p className="text-muted leading-relaxed">
              {humanColumn.content}
            </p>
          </motion.div>

          {/* AI Column */}
          <motion.div
            className="bg-panel border border-edge rounded-xl p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-start gap-6 mb-6">
              <div className="w-16 h-16 bg-aiGreen/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text mb-2">
                  {aiColumn.title}
                </h3>
              </div>
            </div>
            <p className="text-muted leading-relaxed">
              {aiColumn.content}
            </p>
          </motion.div>
        </div>

        {/* Fusion Text */}
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-spectral font-semibold mb-6 text-aiGreen">
            Together — Force with a conscience
          </h3>
          <p className="text-lg text-muted leading-relaxed">
            {fusionText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
