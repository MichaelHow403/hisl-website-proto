import type { NextConfig } from "next";
import withMDX from '@next/mdx';

const withMdx = withMDX({
  extension: /\.mdx?$/,
  options: {
    // Optionally add remark and rehype plugins
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `mdx-bundler`, you can pass your custom options here
    // for example, to use a different version of rehype-prism-plus
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

export default withMdx(nextConfig);
