import GlobalHeader from "@/components/sections/GlobalHeader";
import GlobalFooter from "@/components/sections/GlobalFooter";
import BioLongform from "@/components/sections/BioLongform";
import { promises as fs } from 'fs';
import path from 'path';

export default async function AboutMichael() {
  const mdxPath = path.join(process.cwd(), 'src/content/about/michael.mdx');
  const mdxSource = await fs.readFile(mdxPath, 'utf8');

  return (
    <main className="min-h-screen bg-bg text-text">
      <GlobalHeader />
      <BioLongform 
        portrait="michael_howardbio"
        title="From hard-hat to hard-code"
        subtitle="Michael Howard MCIOB, Founder HISL"
        mdxSource={mdxSource}
      />
      <GlobalFooter />
    </main>
  );
}
