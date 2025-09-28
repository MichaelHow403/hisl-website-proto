'use client';

import Image from 'next/image';
import { IMAGES, ImageId } from '@/lib/imagery';

interface OptimizedImageProps {
  imageId: ImageId;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  sizes?: string;
}

/**
 * OptimizedImage Component
 * 
 * MANDATORY: Per Master Content Lock Section 9
 * - ALL images MUST use this component
 * - NO direct <img> tags allowed
 * - NO hardcoded image paths allowed
 * - ONLY Sharp-processed images from IMAGES manifest
 */
// OK: Legacy component - Utility component for Sharp pipeline
export default function OptimizedImage({ 
  imageId, 
  alt, 
  className = '',
  width,
  height,
  priority = false,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}: OptimizedImageProps) {
  
  const image = IMAGES[imageId];
  
  if (!image) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`OptimizedImage: Image "${imageId}" not found in Sharp manifest`);
      console.log('Available images:', Object.keys(IMAGES));
    }
    
    return (
      <div 
        className={`relative overflow-hidden bg-red-100 border-2 border-red-300 flex items-center justify-center ${className}`}
        style={{ width: width || 400, height: height || 300 }}
      >
        <div className="text-center text-red-600">
          <div className="text-sm font-semibold mb-1">Missing Image</div>
          <div className="text-xs">{imageId}</div>
        </div>
      </div>
    );
  }

  const finalWidth = width || image.width;
  const finalHeight = height || image.height;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={image.src}
        alt={alt}
        width={finalWidth}
        height={finalHeight}
        quality={quality}
        priority={priority}
        placeholder="blur"
        blurDataURL={image.placeholder}
        sizes={sizes}
        srcSet={`${image.src} 1200w, ${image.src2x} 2400w`}
        className="transition-opacity duration-300"
        style={{
          objectFit: 'cover'
        }}
      />
    </div>
  );
}

/**
 * Helper function to get image metadata
 */
export function getImageMetadata(imageId: ImageId) {
  return IMAGES[imageId];
}

/**
 * Helper function to check if image exists
 */
export function hasOptimizedImage(imageId: string): imageId is ImageId {
  return imageId in IMAGES;
}
