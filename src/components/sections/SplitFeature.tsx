"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Img from "@/components/ui/Img";

type Props = {
  title: string;
  bullets: string[];
  link?: string;
  imageId?: string;
  reverse?: boolean;
};

export default function SplitFeature({ 
  title, 
  bullets, 
  link,
  imageId,
  reverse = false 
}: Props) {
  const content = (
    <div className="space-y-6">
      <motion.h2
        className="text-3xl md:text-4xl font-spectral font-semibold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {title}
      </motion.h2>
      
      <motion.ul
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {bullets.map((bullet, index) => (
          <motion.li
            key={index}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
          >
            <div className="w-2 h-2 rounded-full bg-aiGreen mt-2 flex-shrink-0" />
            <span className="text-muted">{bullet}</span>
          </motion.li>
        ))}
      </motion.ul>
      
      {link && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href={link} className="btn btn-ghost">
            Learn more
          </Link>
        </motion.div>
      )}
    </div>
  );

  const image = imageId && (
    <motion.div
      className="relative aspect-video rounded-xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <Img assetId={imageId} sizes="(max-width: 768px) 100vw, 600px" />
    </motion.div>
  );

  return (
    <section className="py-16">
      <div className="container-wrap">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:grid-flow-col-dense' : ''}`}>
          <div className={reverse ? 'lg:col-start-2' : ''}>
            {content}
          </div>
          {image && (
            <div className={reverse ? 'lg:col-start-1' : ''}>
              {image}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
