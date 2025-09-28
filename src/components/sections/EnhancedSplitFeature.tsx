"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import OptimizedImage from "@/components/OptimizedImage";
import { ImageId } from "@/lib/imagery";

type Props = {
  title: string;
  bullets: string[];
  imageId?: ImageId;
  leftImageId?: ImageId;
  rightImageId?: ImageId;
  // MDX enrichment
  detailedExplanations?: Record<string, string>;
  mdxContent?: any;
};

export default function EnhancedSplitFeature({ 
  title, 
  bullets, 
  imageId,
  leftImageId,
  rightImageId,
  detailedExplanations,
  mdxContent
}: Props) {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              {title}
            </h2>
            
            {/* Master Content Lock bullets */}
            <div className="space-y-6 mb-8">
              {bullets.map((bullet, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {bullet}
                    </h3>
                    {/* MDX detailed explanation */}
                    {detailedExplanations && detailedExplanations[bullet] && (
                      <p className="text-gray-300 leading-relaxed">
                        {detailedExplanations[bullet]}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {leftImageId && rightImageId ? (
              // Two images side by side
              <div className="grid grid-cols-2 gap-4">
                <OptimizedImage
                  imageId={leftImageId}
                  alt="Left image"
                  className="rounded-lg shadow-lg"
                />
                <OptimizedImage
                  imageId={rightImageId}
                  alt="Right image"
                  className="rounded-lg shadow-lg"
                />
              </div>
            ) : imageId ? (
              // Single image
              <OptimizedImage
                imageId={imageId}
                alt="Feature image"
                className="rounded-lg shadow-lg w-full"
              />
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
