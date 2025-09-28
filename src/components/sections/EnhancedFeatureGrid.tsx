"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import OptimizedImage from "@/components/OptimizedImage";
import { ImageId } from "@/lib/imagery";

type Feature = {
  title: string;
  desc: string;
  iconId?: string;
  enhancedDesc?: string;
  technicalDetails?: string;
};

type Props = {
  intro: string;
  features: Feature[];
  brandStrip?: string[];
  // MDX enrichment
  enhancedFeatures?: Feature[];
  mdxContent?: any;
};

export default function EnhancedFeatureGrid({ 
  intro, 
  features, 
  brandStrip,
  enhancedFeatures,
  mdxContent
}: Props) {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Use enhanced features if available, otherwise fall back to regular features
  const displayFeatures = enhancedFeatures || features;

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Intro */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {intro}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-amber-500/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Icon */}
              {feature.iconId && (
                <div className="mb-4">
                  {feature.iconId.endsWith('.svg') ? (
                    <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                      <img 
                        src={`/imagery/processed/${feature.iconId}`} 
                        alt={feature.title}
                        className="w-8 h-8"
                      />
                    </div>
                  ) : (
                    <OptimizedImage
                      imageId={feature.iconId as ImageId}
                      alt={feature.title}
                      className="w-12 h-12 rounded-lg"
                    />
                  )}
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 mb-4 leading-relaxed">
                {feature.enhancedDesc || feature.desc}
              </p>

              {/* Technical Details */}
              {feature.technicalDetails && (
                <div className="mt-4 p-3 bg-gray-900/50 rounded-lg">
                  <p className="text-sm text-gray-400">
                    {feature.technicalDetails}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Brand Strip */}
        {brandStrip && brandStrip.length > 0 && (
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 opacity-60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {brandStrip.map((logo, index) => (
              <div key={index} className="h-8">
                <OptimizedImage
                  imageId={logo as ImageId}
                  alt={`Brand logo ${index + 1}`}
                  className="h-full w-auto"
                />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
