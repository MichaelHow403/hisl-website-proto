"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Img from "@/components/ui/Img";

type Props = {
  michaelTeaser: string;
  integaiTeaser: string;
};

export default function AboutTeasers({ michaelTeaser, integaiTeaser }: Props) {
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
            About HISL
          </h2>
          <p className="text-lg text-muted">
            Meet the founder and the platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* About Michael */}
          <motion.div
            className="bg-panel border border-edge rounded-xl p-8 hover:border-aiGreen/50 transition-colors group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-start gap-6 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Img assetId="michael_headshot" sizes="64px" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text group-hover:text-aiGreen transition-colors mb-2">
                  About Michael
                </h3>
                <p className="text-sm text-brandGold font-medium">
                  From hard-hat to hard-code
                </p>
              </div>
            </div>
            <p className="text-muted leading-relaxed mb-6">
              {michaelTeaser}
            </p>
            <Link 
              href="/about/michael" 
              className="text-aiGreen hover:text-brandGold transition-colors font-medium"
            >
              Read more →
            </Link>
          </motion.div>

          {/* About IntegAI */}
          <motion.div
            className="bg-panel border border-edge rounded-xl p-8 hover:border-aiGreen/50 transition-colors group"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-start gap-6 mb-6">
              <div className="w-16 h-16 bg-aiGreen/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text group-hover:text-aiGreen transition-colors mb-2">
                  About IntegAI
                </h3>
                <p className="text-sm text-brandGold font-medium">
                  Sovereign, offline-first orchestration
                </p>
              </div>
            </div>
            <p className="text-muted leading-relaxed mb-6">
              {integaiTeaser}
            </p>
            <Link 
              href="/about/integai" 
              className="text-aiGreen hover:text-brandGold transition-colors font-medium"
            >
              Read more →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
