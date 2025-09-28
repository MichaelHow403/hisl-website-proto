"use client";

import Image from "next/image";
import { useState } from "react";
import { IMAGES } from "@/lib/imagery";

type Props = {
  assetId: string;
  className?: string;
  priority?: boolean;
  sizes?: string; // e.g. "(max-width: 768px) 100vw, 1200px"
  rounded?: boolean;
  width?: number;
  height?: number;
};

export default function Img({ 
  assetId, 
  className = "", 
  priority = false, 
  sizes = "100vw", 
  rounded = true,
  width,
  height
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const meta = IMAGES.find(i => i.id === assetId);
  if (!meta) return null;

  const [fx, fy] = meta.focal ?? [0.5, 0.5];
  const objectPosition = `${Math.round(fx * 100)}% ${Math.round(fy * 100)}%`;
  const radius = rounded ? "rounded-2xl" : "";

  // Generate optimized image paths
  const basePath = '/optimized';
  const src = `${basePath}/${assetId}-1200.webp`;
  const srcSet = `${basePath}/${assetId}-1200.webp 1200w, ${basePath}/${assetId}-2400.webp 2400w`;
  const blurDataURL = `${basePath}/${assetId}-blur.webp`;

  // Use provided dimensions or default to 1200x800
  const imgWidth = width || 1200;
  const imgHeight = height || 800;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={meta.alt}
        {...(width && height ? { width: imgWidth, height: imgHeight } : { fill: true })}
        priority={priority}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={blurDataURL}
        srcSet={srcSet}
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${radius}`}
        style={!width && !height ? { objectPosition } : undefined}
        onLoad={() => {
          setIsLoading(false);
          setHasError(false);
        }}
        onError={() => {
          console.warn(`Failed to load optimized image: ${assetId}`);
          setIsLoading(false);
          setHasError(true);
        }}
      />
      
      {/* Loading placeholder */}
      {isLoading && !hasError && (
        <div 
          className="absolute inset-0 bg-panel animate-pulse flex items-center justify-center"
          style={width && height ? { width: imgWidth, height: imgHeight } : undefined}
        >
          <div className="text-muted text-sm">Loading...</div>
        </div>
      )}
      
      {/* Error placeholder */}
      {hasError && (
        <div 
          className="absolute inset-0 bg-panel border border-edge flex items-center justify-center"
          style={width && height ? { width: imgWidth, height: imgHeight } : undefined}
        >
          <div className="text-center">
            <div className="text-muted text-sm mb-2">Image not found</div>
            <div className="text-xs text-muted">{assetId}</div>
          </div>
        </div>
      )}
    </div>
  );
}
