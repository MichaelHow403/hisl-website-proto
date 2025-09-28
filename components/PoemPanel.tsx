// /components/PoemPanel.tsx (verbatim mode)
"use client";
import { motion, useReducedMotion } from "framer-motion";
export default function PoemPanel({ text, align="center", title, author, footnote }: any){
  const prefersReduced = useReducedMotion();
  const a = !prefersReduced ? { initial:{opacity:0,y:8}, whileInView:{opacity:1,y:0}, viewport:{once:true}, transition:{duration:.55} } : {};
  return (
    <section className="relative overflow-hidden border-y border-white/5" aria-label="Poem">
      <div className="container-wrap relative z-10 py-20 md:py-28">
        {(title||author) && <motion.div {...a} className={align==="center"?"text-center":"text-left"}>
          {title && <h2 className="text-[clamp(28px,4vw,48px)] font-semibold tracking-tight">{title}</h2>}
          {author && <p className="mt-2 text-muted">{author}</p>}
        </motion.div>}
        <motion.article {...a} className={`mt-8 md:mt-10 rounded-2xl border border-[color:var(--edge)] bg-[color:var(--panel)]/60 p-5 md:p-6 ${align==="center"?"mx-auto text-center":""}`}>
          <p className="text-[17px] md:text-[18px] leading-relaxed whitespace-pre-wrap">{text}</p>
        </motion.article>
        {footnote && <motion.p {...a} className="mt-6 text-xs text-muted max-w-prose">{footnote}</motion.p>}
      </div>
    </section>
  );
}
