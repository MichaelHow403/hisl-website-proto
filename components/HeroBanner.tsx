"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { LOCKED_CONTENT } from "@/lib/content-lock";
import { IMAGES, ImageId } from "@/lib/imagery";
import HeroParallax from "./HeroParallax";
import OptimizedImage from "@/components/OptimizedImage";

type Props = {
  // Optional override props - if not provided, uses locked content
  title?: string;
  subtitle?: string;
  primaryCta?: {
    label: string;
    to: string;
  };
  secondaryCta?: {
    label: string;
    to: string;
  };
  imageId?: ImageId;
  overlayImageId?: ImageId;
  backdrop?: "parallax" | "static";
  respectReducedMotion?: boolean;
};

export default function HeroBanner({ 
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  imageId,
  overlayImageId,
  backdrop,
  respectReducedMotion
}: Props) {
  // Use locked content as defaults, allow props to override
  const hero = LOCKED_CONTENT.home.hero;
  const finalTitle = title || hero.title;
  const finalSubtitle = subtitle || hero.subtitle;
  const finalPrimaryCta = primaryCta || hero.primaryCta;
  const finalSecondaryCta = secondaryCta || hero.secondaryCta;
  const finalImageId = imageId || hero.imageId;
  const finalOverlayImageId = overlayImageId || hero.overlayImageId;
  const finalBackdrop = backdrop || hero.backdrop;
  const finalRespectReducedMotion = respectReducedMotion !== undefined ? respectReducedMotion : hero.respectReducedMotion;
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => setMounted(true), []);

  // Resolve image data from imageId using IMAGES manifest
  const getImageData = (id?: ImageId) => {
    if (id && IMAGES[id]) {
      return IMAGES[id];
    }
    return null;
  };

  const mainImageData = getImageData(finalImageId as ImageId);
  const overlayImageData = getImageData(finalOverlayImageId as ImageId);
  
  // Determine if we should use parallax
  const useParallax = finalBackdrop === "parallax" && !prefersReducedMotion && finalRespectReducedMotion;

  if (!mounted) {
    return (
      <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="container-wrap flex items-center min-h-screen">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-8">
              <span className="gradient-text">{finalTitle}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
              {finalSubtitle}
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
        {useParallax && overlayImageData ? (
          <HeroParallax 
            baseId={imageId || ''} 
            overlayId={overlayImageId || ''} 
          />
        ) : (
          <>
            {mainImageData && (
              <OptimizedImage 
                imageId={finalImageId as ImageId}
                alt="Hero background"
                className="w-full h-full"
                priority
              />
            )}
            {overlayImageData && !prefersReducedMotion && (
              <OptimizedImage 
                imageId={finalOverlayImageId as ImageId}
                alt="Hero overlay"
                className="absolute inset-0 w-full h-full opacity-35"
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
            <span className="gradient-text">{finalTitle}</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {finalSubtitle}
          </motion.p>
          
          {(finalPrimaryCta || finalSecondaryCta) && (
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {finalPrimaryCta && (
                <Link href={finalPrimaryCta.to} className="btn btn-gold px-8 py-4 text-lg font-semibold min-w-[200px]">
                  {finalPrimaryCta.label}
                </Link>
              )}
              {finalSecondaryCta && (
                <Link href={finalSecondaryCta.to} className="btn btn-ghost px-8 py-4 text-lg font-semibold min-w-[200px]">
                  {finalSecondaryCta.label}
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
