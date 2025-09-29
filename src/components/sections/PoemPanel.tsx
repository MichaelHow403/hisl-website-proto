"use client";

import { motion, useReducedMotion } from "framer-motion";
import React from "react";

export type PoemPanelProps = {
  title?: string;
  author?: string;
  /** Verbatim poem text (exact string). If provided, `stanzas` are ignored. */
  text?: string;
  /** Optional stanza format; ignored when `text` present. */
  stanzas?: string[][];
  footnote?: string;
  align?: "center" | "left";
  imageId?: string;
};

export default function PoemPanel({
  title,
  author,
  text,
  stanzas,
  footnote,
  align = "center",
  imageId,
}: PoemPanelProps) {
  const prefersReduced = useReducedMotion();

  const a = !prefersReduced
    ? { initial: { opacity: 0, y: 8 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.55 } }
    : {};

  return (
    <section className="relative overflow-hidden border-y border-white/5" aria-label="Poem">
      {/* Background image */}
      {imageId && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: imageId === 'poem_backdrop' 
              ? `url(/reach-for-the-stars.png)`
              : `url(/imagery/processed/${imageId}-1200.webp)`,
          }}
          aria-hidden="true"
        />
      )}
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      <div className="container-wrap relative z-10 py-20 md:py-28">
        {(title || author) && (
          <motion.div {...a} className={align === "center" ? "text-center" : "text-left"}>
            {title && <h2 className="text-[clamp(28px,4vw,48px)] font-semibold tracking-tight">{title}</h2>}
            {author && <p className="mt-2 text-muted">{author}</p>}
          </motion.div>
        )}

        {/* VERBATIM mode */}
        {text ? (
          <motion.article
            {...a}
            className={`mt-8 md:mt-10 rounded-2xl border border-[color:var(--edge)] bg-[color:var(--panel)]/60 p-5 md:p-6 ${
              align === "center" ? "mx-auto text-center" : ""
            }`}
          >
            <p className="text-[17px] md:text-[18px] leading-relaxed whitespace-pre-wrap">{text}</p>
          </motion.article>
        ) : (
          // Legacy stanza mode (not used once locked)
          <div className={`mt-8 md:mt-10 prose prose-invert max-w-none ${align === "center" ? "mx-auto text-center" : ""}`}>
            {(stanzas || []).map((lines, i) => (
              <motion.div
                key={i}
                {...a}
                transition={{ duration: 0.5, delay: 0.05 * i }}
                className="not-prose rounded-2xl border border-[color:var(--edge)] bg-[color:var(--panel)]/60 p-5 md:p-6 mb-4"
                role="doc-poem"
                aria-label={`Stanza ${i + 1}`}
              >
                {lines.map((line, j) => (
                  <p key={j} className="leading-relaxed text-[17px] md:text-[18px] text-[color:var(--text)]">
                    {line}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        )}

        {footnote && <motion.p {...a} className="mt-6 text-xs text-muted max-w-prose">{footnote}</motion.p>}
      </div>
    </section>
  );
}
