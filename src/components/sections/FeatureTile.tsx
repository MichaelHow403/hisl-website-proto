"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Img from "@/components/Img";

type Props = {
  title: string;
  link: string;
  thumb: string;
  caption?: string;
  description?: string;
};

export default function FeatureTile({ 
  title, 
  link, 
  thumb, 
  caption,
  description 
}: Props) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{ y: -4 }}
    >
      <Link href={link} className="block">
        <div className="bg-panel border border-edge rounded-xl overflow-hidden hover:border-aiGreen/50 transition-all duration-300 hover:shadow-glow">
          <div className="relative aspect-video overflow-hidden">
            <Img 
              name={thumb} 
              alt={title}
              sizes="(max-width: 768px) 100vw, 400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-semibold text-text group-hover:text-aiGreen transition-colors mb-2">
              {title}
            </h3>
            
            {description && (
              <p className="text-muted text-sm mb-3">
                {description}
              </p>
            )}
            
            {caption && (
              <div className="text-xs text-brandGold font-medium">
                {caption}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
