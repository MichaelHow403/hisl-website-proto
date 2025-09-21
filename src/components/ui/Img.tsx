"use client";

import Image from "next/image";
import { IMAGES } from "@/lib/imagery";

type Props = {
  assetId: string;
  className?: string;
  priority?: boolean;
  sizes?: string; // e.g. "(max-width: 768px) 100vw, 1200px"
  rounded?: boolean;
};

export default function Img({ 
  assetId, 
  className = "", 
  priority = false, 
  sizes = "100vw", 
  rounded = true 
}: Props) {
  const meta = IMAGES.find(i => i.id === assetId);
  if (!meta) return null;

  const [fx, fy] = meta.focal ?? [0.5, 0.5];
  const objectPosition = `${Math.round(fx * 100)}% ${Math.round(fy * 100)}%`;
  const radius = rounded ? "rounded-2xl" : "";

  return (
    <Image
      src={meta.src}
      alt={meta.alt}
      fill
      priority={priority}
      sizes={sizes}
      className={`object-cover ${radius} ${className}`}
      style={{ objectPosition }}
    />
  );
}
