'use client';

import Image from 'next/image';
import { useState } from 'react';
import { IMAGERY, getImageInfo, hasImage } from '@/lib/imagery';

interface ImgProps {
  name: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
}

export default function Img({
  name,
  alt,
  width = 1200,
  height = 800,
  className = '',
  priority = false,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}: ImgProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate defensive alt text
  const safeAlt = alt?.trim() || name;

  // Get image info from manifest
  const imageInfo = getImageInfo(name);
  
  if (!imageInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Img: Image "${name}" not found in manifest. Available images:`, Object.keys(IMAGERY));
    }
    
    return (
      <div 
        className={`relative overflow-hidden bg-panel border border-edge flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <div className="text-center">
          <div className="text-muted text-sm mb-2">Image not found</div>
          <div className="text-xs text-muted">{name}</div>
        </div>
      </div>
    );
  }

  // Determine which image to use
  const useOptimized = imageInfo.src1200;
  const imageSrc = useOptimized ? imageInfo.src1200! : imageInfo.fallback!;
  const imageSrcSet = useOptimized && imageInfo.src2400 
    ? `${imageInfo.src1200} 1200w, ${imageInfo.src2400} 2400w`
    : undefined;
  const blurDataURL = useOptimized ? imageInfo.blur : undefined;

  // Log fallback in development
  if (!useOptimized && process.env.NODE_ENV === 'development') {
    console.warn(`Img: Using fallback image for "${name}" (optimized not available)`);
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={imageSrc}
        alt={safeAlt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        sizes={sizes}
        srcSet={imageSrcSet}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => {
          setIsLoading(false);
          setHasError(false);
        }}
        onError={() => {
          console.warn(`Failed to load image: ${name} (${imageSrc})`);
          setIsLoading(false);
          setHasError(true);
        }}
      />
      
      {/* Loading placeholder */}
      {isLoading && !hasError && (
        <div 
          className="absolute inset-0 bg-panel animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          <div className="text-muted text-sm">
            {!useOptimized ? 'Loading fallback...' : 'Loading...'}
          </div>
        </div>
      )}
      
      {/* Fallback indicator (only in development) */}
      {!useOptimized && process.env.NODE_ENV === 'development' && !isLoading && (
        <div className="absolute top-1 right-1 bg-yellow-500 text-black text-xs px-1 py-0.5 rounded">
          Fallback
        </div>
      )}
    </div>
  );
}

// Export a helper function to generate image paths for manual use
export function getOptimizedImagePath(name: string, variant: '1200' | '2400' | 'blur' = '1200'): string {
  return `/optimized/${name}-${variant}.webp`;
}

// Export a helper function to get all variants of an image
export function getOptimizedImageVariants(name: string) {
  return {
    src: getOptimizedImagePath(name, '1200'),
    srcSet: `${getOptimizedImagePath(name, '1200')} 1200w, ${getOptimizedImagePath(name, '2400')} 2400w`,
    blur: getOptimizedImagePath(name, 'blur')
  };
}
