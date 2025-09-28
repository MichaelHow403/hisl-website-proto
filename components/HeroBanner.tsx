"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { IMAGES } from "@/src/app/lib/imagery";
import HeroParallax from "./HeroParallax";

type Props = {
  title: string;
  subtitle: string;
  primaryCta?: {
    label: string;
    to: string;
  };
  secondaryCta?: {
    label: string;
    to: string;
  };
  imageId?: string;
  overlayImageId?: string;
  backdrop?: "parallax" | "static";
  respectReducedMotion?: boolean;
  // Legacy props for backward compatibility
  src?: string;
  overlaySrc?: string;
};

export default function HeroBanner({ 
  title, 
  subtitle, 
  primaryCta, 
  secondaryCta,
  imageId,
  overlayImageId,
  backdrop = "static",
  respectReducedMotion = true,
  // Legacy props
  src,
  overlaySrc
}: Props) {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => setMounted(true), []);

  // Resolve image sources from imageId or fall back to legacy src
  const getImageSrc = (id?: string, fallbackSrc?: string) => {
    if (id && IMAGES[id as keyof typeof IMAGES]) {
      const imageFile = IMAGES[id as keyof typeof IMAGES];
      return `/imagery/${imageFile}`;
    }
    return fallbackSrc || '';
  };

  const mainImageSrc = getImageSrc(imageId, src);
  const overlayImageSrc = getImageSrc(overlayImageId, overlaySrc);
  
  // Determine if we should use parallax
  const useParallax = backdrop === "parallax" && !prefersReducedMotion && respectReducedMotion;

  if (!mounted) {
    return (
      <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="container-wrap flex items-center min-h-screen">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-8">
              <span className="gradient-text">{title}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
              {subtitle}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        {useParallax && overlayImageSrc ? (
          <HeroParallax 
            baseId={imageId || ''} 
            overlayId={overlayImageId || ''} 
          />
        ) : (
          <>
            {mainImageSrc && (
              <img 
                src={mainImageSrc}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
            {overlayImageSrc && !prefersReducedMotion && (
              <img 
                src={overlayImageSrc}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-35"
              />
            )}
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-black/80 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 container-wrap flex items-center min-h-screen">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-amber-900/50 to-yellow-900/50 border border-amber-600/30 text-sm font-medium text-amber-300 mb-6">
              <span className="w-2 h-2 bg-amber-400 rounded-full mr-3 animate-pulse"></span>
              Industrial Safety Intelligence
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="gradient-text">{title}</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {subtitle}
          </motion.p>
          
          {(primaryCta || secondaryCta) && (
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {primaryCta && (
                <Link href={primaryCta.to} className="btn btn-gold px-8 py-4 text-lg font-semibold min-w-[200px]">
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.to} className="btn btn-ghost px-8 py-4 text-lg font-semibold min-w-[200px]">
                  {secondaryCta.label}
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
