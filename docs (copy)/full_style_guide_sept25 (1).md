\> Scope: Brand voice & messaging, visual identity, motion,
accessibility, design tokens, component standards, imagery pipeline,
SEO/content model, performance budgets, QA, governance, and
implementation quick‑start (including Tailwind/CSS + Hero & MiniGlobe
components refined).
Core alignment sources: HISL/IntegAI cinematic style and globe/galaxy
patterns; website API owner & cutover plan; offline‑first
orchestrator and 9‑node agent graph; workflow/dev environment; Manus
component/tokens kit.
\-\--
1\) Brand Platform & Narrative (for copy + art direction)
Brand essence: Sovereign AI that stands up in court.
Promise: On‑prem, auditable agents that turn compliance from overhead
into advantage.
Atmosphere: AI observatory --- cinematic cosmos, real‑time globe, subtle
motion that feels alive but respectful of performance.
Why it matters in the UI
Every major page reveals sovereignty and auditability through traceable
interactions and deterministic visuals (e.g., globe flows, energy
badge).
The website is not just a brochure: IntegAI owns every API call (pages,
search, SEO, forms, publishing) so content is consistent, fast, and
provable.
\-\--
2\) Voice & Editorial Standards
Tone: Clear, confident, technical without jargon. Cinematic but grounded
("observatory" mood, not sci‑fi). No hype; let the proof (artifacts,
demos, case work) speak.
Rule‑of‑three framing (examples):
Sovereign. Auditable. On‑prem.
Deterministic. Explainable. Reproducible (.integpkg).
Copy patterns
Headlines: 3--7 words, verb‑led or benefit‑led.
Subheads: One sentence that names the risk or cost, then the promise.
Body: Short paragraphs, 1 idea each; bullets for features/outcomes.
Evidence: artifacts, metrics, and the offline graph when relevant
(don't overshare internals).
Accessibility in copy: 6th--8th grade reading level for CTAs. Always
include plain‑language explanation of technical terms on first mention.
\-\--
3\) Visual Identity System
Color language (refined from Manus kit to align with HISL brand)
Backgrounds: Deep navy/cosmic black.
Core accent: HISL Gold \#d4af37 (rename token brandGold).
AI Green: \#39d7c9 for emphasis and status.
Text: \#e8f0ff; Muted: \#a8b8d6; Panels/Edges tuned for dark UI.
Typography
Display/Headings: a high‑legibility serif (e.g., Spectral) with
cinematic sizes (H1 clamps from 40--80px).
Body: Inter (14--16px), generous line‑height, light tracking.
Imagery & 3D
Galaxy/starfield canvas + realistic Earth (day/night, clouds, faint
atmosphere rim), with Huginn & Muninn gold ravens on distinct orbits;
graceful degradations to static images.
Sharp pipeline generates WebP + LQIP; no hardcoded paths --- use an
imagery manifest.
Motion
Micro‑UX via Framer Motion; 3D via React Three Fiber; respect
prefers-reduced-motion; lazy‑init heavy canvases post‑LCP.
\-\--
4\) Design Tokens (Tailwind‑first)
Renamed & extended Manus tokens so brand aligns across apps. (Drop‑in
Tailwind config; keeps your Manus structure but sets HISL gold + a11y
focus.)
// tailwind.config.js (replace)
// Based on Manus, refined for HISL brand + a11y focus
/\*\* \@type {import(\'tailwindcss\').Config} \*/
export default {
content: \[\"./app/\*\*/\*.{ts,tsx}\",
\"./components/\*\*/\*.{ts,tsx}\", \"./content/\*\*/\*.{md,mdx}\"\],
theme: {
extend: {
fontFamily: {
inter: \[\'Inter\',\'ui-sans-serif\',\'system-ui\',\'sans-serif\'\],
spectral: \[\'Spectral\',\'serif\'\],
},
colors: {
bg: \'\#0b1220\',
panel: \'\#0f1828\',
edge: \'\#1e2a42\',
text: \'\#e8f0ff\',
muted: \'\#a8b8d6\',
brandGold: \'\#d4af37\', // replaces \'gold\'
aiGreen: \'\#39d7c9\', // replaces \'teal\'
focus: \'\#9ec5ff\',
danger: \'\#ff6b6b\',
ok: \'\#34d399\'
},
boxShadow: {
glow: \'0 0 40px rgba(57,215,201,.25)\',
focus: \'0 0 0 3px rgba(158,197,255,.45)\',
},
borderRadius: { xl: \'0.9rem\' },
maxWidth: { wrap: \'1200px\' },
spacing: { \'18\': \'4.5rem\' }
},
},
plugins: \[\],
}
Rationale: uses Manus structure; swaps gold → brandGold and teal →
aiGreen, introduces consistent focus rings.
Global CSS (base + components)
/\* globals.css (replace) --- Manus-based with a11y & motion refinements
\*/
\@tailwind base; \@tailwind components; \@tailwind utilities;
/\* Fonts \*/
\@import
url(\'https://fonts.googleapis.com/css2?family=Inter:wght\@400;600;700&family=Spectral:wght\@400;500;700&display=swap\');
:root{
\--bg:\#0b1220; \--panel:\#0f1828; \--edge:\#1e2a42;
\--text:\#e8f0ff; \--muted:\#a8b8d6; \--brandGold:\#d4af37;
\--aiGreen:\#39d7c9;
}
/\* Base \*/
html,body{height:100%; background:var(\--bg); color:var(\--text);}
body{font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe
UI,Roboto,Helvetica,Arial;}
a:focus-visible, button:focus-visible{ outline: none; box-shadow:
var(\--ring, 0 0 0 3px rgba(158,197,255,.45)); border-radius:.6rem;}
/\* Helpers \*/
.container-wrap{max-width:1200px;margin:0 auto;padding:0 1.25rem;}
.vignette{background: radial-gradient(60% 60% at 50% 40%, transparent
0%, rgba(0,0,0,.55) 60%, rgba(0,0,0,.75) 100%);}
/\* Buttons \*/
\@layer components{
.btn{ \@apply inline-flex items-center justify-center rounded-xl px-4
py-2 text-\[15px\] border transition;
border-color: var(\--edge);
background: color-mix(in srgb, var(\--panel) 90%, transparent); }
.btn:hover{ box-shadow: inset 0 0 0 2px rgba(255,255,255,.06); }
.btn-gold{ \@apply text-black border-0; background:
linear-gradient(\#f6d36a,var(\--brandGold));
box-shadow: 0 6px 24px rgba(212,175,55,.25); }
.btn-ghost{ color:\#bed3ff; background: transparent; border-color:
var(\--edge); }
}
\@media (prefers-reduced-motion: reduce){
\*{animation-duration:0.001ms !important; animation-iteration-count:1
!important; transition-duration:0.001ms !important}
}
Base is your Manus CSS with focus states + reduced motion baked in.
\-\--
5\) Layout & Grid
Containers: max-w-wrap with 20px gutter.
Sections: vertical rhythm 64--96px (use py-24 / py-18 tokens).
Hero: split grid (≈1.1fr/0.9fr) with vignette overlay; always provide
static fallback hero image.
\-\--
6\) Component Standards (examples are canonical)
Hero (refined) --- same pattern you ped, now branded (brandGold) and
a11y‑correct focus. Keep CTA pair: primary "Start a Demo" + secondary
"Explore the Globe."
MiniGlobe (refined) --- realistic day/night, faint atmosphere, clouds,
two gold ravens on distinct orbits. Use sprites to keep crisp edges; no
heavy rings. Respect reduced motion; degrade to static Earth image.
Forms --- idempotent POST (Idempotency‑Key header); show success only
(no verbose telemetry). Schema locked per form.
Feature Tiles --- frosted panels on panel background, rounded-xl, 1px
edge border. Icons in AI Green; highlight badges in brandGold.
Poem/Creed panel --- soft vignette + "poem-backdrop"; increase leading
to 1.8 for legibility. (Matches your Manus backdrop pattern.)
\-\--
7\) Imagery Pipeline & Asset Governance
Store assets under
/public/imagery/{earth,starfields,nebulae,galaxies,processed}; generate
multi‑width WebP + blur placeholders via Sharp; expose via imagery
manifest (typed imports). Never hardcode paths in components.
Maintain a canonical assetId per image/video (MinIO/CDN); the API
/v1/site/assets/{id} returns signed URL/302.
MiniGlobe asset checklist (keep from Manus): Earth day/night/clouds +
raven sprites.
\-\--
8\) Motion, Performance & A11y
Budgets: static/cached reads TTFB ≤ 200ms; RAG reads ≤ 2.0s p95;
generation endpoints ≤ 10s p95 (pre‑GPU); after GPU, ≥15 RPS sustained
on gen endpoints.
Respect prefers-reduced-motion globally (already wired).
Throttle canvases when tab hidden; lazy‑init heavy 3D after LCP.
Lighthouse: aim ≥90; verify no regressions on mobile post‑merge.
\-\--
9\) Accessibility (WCAG 2.2 AA)
Contrast: text vs bg ≥ 4.5:1 (brandGold only for accents, not long
text).
Keyboard: visible focus ring; no on‑hover‑only reveal; trap focus inside
dialogs.
ARIA & semantics: landmark regions on every page; aria-hidden on
decorative canvases; alt text for imagery via manifest metadata.
Animations: all motion cancellable via reduced‑motion.
\-\--
10\) Content Model, SEO & API Contracts (front‑end agnostic)
Everything via IntegAI (single surface). Stable v1 endpoints the UI must
target:
GET /v1/site/page?slug → block‑structured page (component + props per
section)
GET /v1/site/menu, GET /v1/site/search, GET /v1/site/seo?slug, GET
/v1/site/assets/{id}
POST /v1/site/forms/{formId}, POST /v1/site/generate/copy, POST
/v1/site/publish (Publisher emits .integpkg, invalidates caches).
Cutover plan (so style never fights infra): Mirror → Proxy+Cache (GET) →
Mutations (POST) → Decommission legacy. Gate each phase on p95 latency,
error rate \<0.5%, parity ≥99%, zero dup POSTs.
\-\--
11\) Performance/QA
Cache warmers crawl canonical slugs nightly; prebuild /v1/site/page
cache.
Parity tests: diff legacy vs IntegAI JSON for each slug (fail if \>1%
delta). Form idempotency: 100 concurrent POSTs w/ same key → exactly 1
stored.
Observer traces (dev only) through Langfuse/Phoenix; minimal redacted
telemetry.
\-\--
12\) Governance, Safety, and Provenance
IntegAI orchestrator (offline‑first) with a 9‑node agent graph;
deterministic pipelines; .integpkg artifacts for substantial outputs;
strict enterprise safety by default. (These principles influence what
the website can safely render/generate.)
/ / tags in weekly status to prevent scope creep
across design/content/dev.
\-\--
13\) Implementation Quick‑Start (drop‑in)
Install (once) --- as in Manus guide
npm i framer-motion three
\# Tailwind (if not set)
npm i -D tailwindcss postcss autoprefixer && npx tailwindcss init -p
Based on your Manus kit; we keep the same packages.
Hero component (branded + accessible)
Use your Manus Hero with minor brand tweaks (we only changed color
tokens and ensured focus states).
MiniGlobe component (refined)
Your Manus MiniGlobe is already correct: realistic day/night blend,
clouds, rim light, sprite ravens, distinct orbits, resize observer,
reduced motion. Keep as is; just point to imagery manifest and ensure
static fallback.
Asset checklist (must exist) --- unchanged from Manus
/images/dna\_bg.png, /images/reach\_stars.png, raven\_huginn.png,
raven\_muninn.png, Earth day/night/clouds.
\-\--
14\) Do / Don't (fast guardrails)
Do
Use brandGold only for accents and highlights; reserve aiGreen for
interactive affordances/status.
Gate all generation via /v1/site/generate/copy; publish via
/v1/site/publish to produce .integpkg.
Keep animations subtle, interruptible, and performant.
Don't
Don't call third‑party services directly from the front‑end; IntegAI is
the only surface.
Don't hardcode image paths; always use the asset manifest/IDs.
Don't introduce new section props without updating the component
registry (prevents drift).
\-\--
15\) Engineering Environment & Workflow (brief)
Next.js 15.5 + Turbopack, R3F/Drei, Framer Motion, Sharp, MDX, Vercel;
monitoring via Sentry/PostHog. Use Cursor with Composer for repo hygiene
and Lighthouse success (\>90).
Status: Gateway, offline RAG, artifacting, NGINX front door are locked;
GPU arrival is a nice‑to‑have, not gating.
\-\--
16\) Page Types & IA (starter map)
Home (Hero + MiniGlobe teaser + proof panels)
About / IntegAI (platform DNA & safety)
Sectors (Construction, Pharma/CROx, Procurement, ESG, etc.) with
outcomes & artifact excerpts
Globe (interactive demo with energy badge and privacy explainer)
News/Trends (real‑time pane; performance‑gated)
Poem/Creed (philosophical anchor)
All content delivered as block‑structured sections via
/v1/site/page?slug.
\-\--
17\) Gate Checklist (per release)
s locked (IDs + props enumerated) → pass.
Menu/Routes canonical; redirects set.
Forms schemas frozen; idempotency validated under load.
GET parity ≥ 99%; errors \< 0.5% during 24h soak; cache hit ≥ 70% top
slugs.
\-\--
Appendix A --- Why these standards are durable
They align to the offline‑first, deterministic IntegAI model (no
background tasks; artifacted outputs).
They match the phased API takeover so the site remains stable while we
modernize.
They reflect the cinematic, sovereign visual language you already
defined.
\-\--
Appendix B --- Drop‑in Manus assets (kept & refined)
The Manus Hero, MiniGlobe, Tailwind, and CSS patterns are
retained---with tokens renamed and a11y/perf guardrails added---so you
can integrate immediately without rework.