'use client';

import Image from 'next/image';
import { useState } from 'react';
import { IMAGES, ImageId } from '@/lib/imagery';

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
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}: ImgProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const safeAlt = alt?.trim() || name;
  const imageData = IMAGES[name as ImageId];

  if (!imageData) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Img: Image "${name}" not found in manifest. Available images:`, Object.keys(IMAGES));
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

  const finalImageSrc = imageData.src;
  const finalImageSrc2x = imageData.src2x;
  const placeholder = imageData.placeholder;
  const imageWidth = width || imageData.width;
  const imageHeight = height || imageData.height;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={finalImageSrc}
        alt={safeAlt}
        width={imageWidth}
        height={imageHeight}
        quality={quality}
        priority={priority}
        placeholder={placeholder ? "blur" : "empty"}
        blurDataURL={placeholder}
        sizes={sizes}
        srcSet={`${finalImageSrc} 1200w, ${finalImageSrc2x} 2400w`}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => {
          setIsLoading(false);
          setHasError(false);
        }}
        onError={() => {
          console.warn(`Failed to load image: ${name} (${finalImageSrc})`);
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
          <div className="text-muted text-sm">Loading...</div>
        </div>
      )}
    </div>
  );
}
