"use client";

import GlobalHeader from "@/components/sections/GlobalHeader";
import GlobalFooter from "@/components/sections/GlobalFooter";
import PoemPanel from "@/components/sections/PoemPanel";
import { getLockedPoemText, POEM_LOCK } from "@/lib/poem-lock";

export default function Poem() {
  const poemText = getLockedPoemText();

  return (
    <main className="min-h-screen bg-bg text-text">
      <GlobalHeader />
      
      <PoemPanel 
        title={POEM_LOCK.title}
        author="— Michael Howard MCIOB, Founder HISL"
        text={poemText}
      />
      
      <GlobalFooter />
    </main>
  );
}
