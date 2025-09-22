import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Img from '@/components/ui/Img';

interface BioLongformProps {
  portrait: string;
  mdxSource: string;
  title: string;
  subtitle: string;
}

export default function BioLongform({ portrait, mdxSource, title, subtitle }: BioLongformProps) {
  return (
    <div className="py-16">
      <div className="container-wrap">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="w-32 h-32 mx-auto mb-8 relative rounded-full overflow-hidden">
              <Img assetId={portrait} sizes="128px" />
            </div>
            <h1 className="text-4xl md:text-5xl font-spectral font-semibold mb-4">
              {title}
            </h1>
            <p className="text-xl text-muted">
              {subtitle}
            </p>
          </div>

          {/* MDX Content */}
          <div className="prose prose-lg max-w-none">
            <MDXRemote source={mdxSource} />
          </div>
        </div>
      </div>
    </div>
  );
}
