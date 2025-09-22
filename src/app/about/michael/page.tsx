import GlobalHeader from "@/components/sections/GlobalHeader";
import GlobalFooter from "@/components/sections/GlobalFooter";
import BioLongform from "@/components/sections/BioLongform";
import { promises as fs } from 'fs';
import path from 'path';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Michael Howard MCIOB — Founder of HISL",
  description:
    "From carpenter to J&J project leader, Michael Howard builds sovereign AI with practical, ethical foundations.",
};

export default async function AboutMichael() {
  const mdxPath = path.join(process.cwd(), 'src/content/about/michael.mdx');
  const mdxSource = await fs.readFile(mdxPath, 'utf8');

  return (
    <main className="min-h-screen bg-bg text-text">
      <GlobalHeader />
      <BioLongform 
        portrait="michael_headshot"
        title="From hard-hat to hard-code"
        subtitle="Michael Howard MCIOB, Founder HISL"
        mdxSource={mdxSource}
      />
      <GlobalFooter />
    </main>
  );
}
