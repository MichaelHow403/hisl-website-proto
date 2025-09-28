"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LOCKED_CONTENT } from "@/lib/content-lock";
import { IMAGES, ImageId } from "@/lib/imagery";
import OptimizedImage from "@/components/OptimizedImage";

type Feature = {
  title: string;
  description: string;
  iconId?: string;
  badge?: string;
};

type Props = {
  intro?: string;
  features: Feature[];
  brandStrip?: string[];
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
  intro,
  features, 
  brandStrip,
  cta 
}: Props) {
  // Use locked content as defaults
  const solutionData = LOCKED_CONTENT.home.solution_grid;
  const finalIntro = intro || solutionData.intro;
  const finalFeatures = features || solutionData.features;
  const finalBrandStrip = brandStrip || solutionData.brandStrip;
  return (
    <section className="py-16">
      <div className="container-wrap">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xl text-brandGold font-medium mb-4">
            {finalIntro}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {finalFeatures.map((feature, index) => (
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
                  {feature.iconId && IMAGES[feature.iconId as keyof typeof IMAGES] ? 
                    <OptimizedImage 
                      imageId={feature.iconId as ImageId} 
                      alt={feature.title} 
                      width={24} 
                      height={24}
                      className="w-6 h-6" 
                    /> :
                    "⚡"
                  }
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

        {/* Brand Strip */}
        {finalBrandStrip && finalBrandStrip.length > 0 && (
          <motion.div 
            className="flex justify-center items-center gap-8 py-8 border-t border-edge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {finalBrandStrip.map((logoName, index) => (
              <div key={index} className="opacity-60 hover:opacity-100 transition-opacity">
                {logoName.includes('.') ? (
                  <OptimizedImage 
                    imageId={logoName.replace('.jpeg', '').replace('.png', '') as ImageId} 
                    alt={logoName} 
                    width={32}
                    height={32}
                    className="h-8"
                  />
                ) : (
                  <span className="text-muted text-sm font-medium">{logoName}</span>
                )}
              </div>
            ))}
          </motion.div>
        )}

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
