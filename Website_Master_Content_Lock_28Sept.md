# HISL Website — Master Content, Imagery & Motion Lock (v1)
**Status:** Locked • **Contract:** v1 block‑structured pages (`/v1/site/page?slug`) • **Owner:** Website Build (HISL)  
**Purpose:** Single source of truth for **content + imagery + motion** across every page/section. Eliminates drift.  
**Provenance:** Consolidated from IntegAI blueprint, HISL style guide, wireframes, poem lock, and CROx specs.

---

## 0) How to use this file
- Treat this document as **authoritative**. The JSON blocks below are the exact payloads you should serve from `/v1/site/page?slug=<slug>`.
- Components must consume images via **image IDs**, not hardcoded paths. All images are declared in the **Imagery Manifest** with suggested file locations.
- Forms must be idempotent (client sends **`Idempotency-Key`** for every POST). Use the snippets in §7.4.
- Respect `prefers-reduced-motion`. Heavy canvases (R3F) should lazy‑init post‑LCP; starfields/globes fall back to static images when needed.
- Poem text is **locked verbatim**. Keep the poem hash guard from §8 in your build.

---

## 1) Imagery Manifest (source of truth)
Use these **canonical IDs** inside page sections. File locations are recommended under `/public/imagery/{earth,starfields,nebulae,galaxies,processed,logos}`. Adjust folders if your repo differs, but **keep the IDs**.

```ts
// /src/app/lib/imagery.ts (authoritative mapping used by UI components)
export const IMAGES = {
  // Home — Hero
  home_hero_main: "ai_construction_bridge_banner.png",
  home_hero_overlay: "ai_technology.jpeg",

  // Home — Problem
  home_problem_main: "Hard_Hat_digital_paperwork.jpeg",
    home_problem_main: "ai_brain_network.png",

  // Home — Solution
  home_solution_badge: "data_sovereignty_badge.png",
  home_solution_security: "compliance_shield_premium.png",
  home_solution_glyphs: ["globe.svg", "file.svg", "window.svg"],
  home_solution_logos: ["HISL_Logo.jpeg", "integai_logo.png"],
    home_solution_image: "ai_brain_network.png",

  // Home — Fusion (Ethics)
  fusion_michael: "michael_howardbio.jpeg",
  fusion_ai_ethics: "AI_DNA.png",

  // Home — Poem
  poem_backdrop: "reach_for_the_stars.png",

  // Home — About teasers
  about_teaser_michael: "michael_howardbio.jpeg",
  about_teaser_integai: "integai_logo.png",

  // Globe page (modular assembly)
  globe_base: "earth_globe_realistic.png",
  globe_raven_huginn: "raven_huginn.png",
  globe_raven_muninn: "raven_muninn.png",

  // News
  news_motif: "friendship.png",

  // About Michael
  about_michael_portrait: "michael_howardbio.jpeg",
  about_michael_timeline: "ai_technology.jpeg",

  // About IntegAI
  about_integai_main: "integai_logo.png",

  // Footer / Contact
  footer_accent: "inspiring.jpg",
  footer_logo_hisl: "HISL_Logo.jpeg",
  footer_logo_integai: "integai_logo.png",
} as const;
export type ImageId = keyof typeof IMAGES;
```

### 1.1 Suggested image locations (paths)
> You may already have these assets in root. Moving them under `/public/imagery` improves governance. The **IDs stay the same** either way.

| Image ID | File | Suggested location |
|---|---|---|
| home_hero_main | ai_construction_bridge_banner.png | /public/imagery/processed/ai_construction_bridge_banner.png |
| home_hero_overlay | ai_technology.jpeg | /public/imagery/processed/ai_technology.jpeg |
| home_problem_main | Hard_Hat_digital_paperwork.jpeg | /public/imagery/processed/Hard_Hat_digital_paperwork.jpeg |
| home_solution_badge | data_sovereignty_badge.png | /public/imagery/processed/data_sovereignty_badge.png |
| home_solution_security | compliance_shield_premium.png | /public/imagery/processed/compliance_shield_premium.png |
| home_solution_glyphs[0] | globe.svg | /public/imagery/processed/globe.svg |
| home_solution_glyphs[1] | file.svg | /public/imagery/processed/file.svg |
| home_solution_glyphs[2] | window.svg | /public/imagery/processed/window.svg |
| home_solution_logos[0] | HISL_Logo.jpeg | /public/imagery/logos/HISL_Logo.jpeg |
| home_solution_logos[1] | integai_logo.png | /public/imagery/logos/integai_logo.png |
| fusion_michael | michael_howardbio.jpeg | /public/imagery/processed/michael_howardbio.jpeg |
| fusion_ai_ethics | AI_DNA.png | /public/imagery/processed/AI_DNA.png |
| poem_backdrop | reach_for_the_stars.png | /public/imagery/starfields/reach_for_the_stars.png |
| about_teaser_michael | michael_howardbio.jpeg | /public/imagery/processed/michael_howardbio.jpeg |
| about_teaser_integai | integai_logo.png | /public/imagery/logos/integai_logo.png |
| globe_base | earth_globe_realistic.png | /public/imagery/earth/earth_globe_realistic.png |
| globe_raven_huginn | raven_huginn.png | /public/imagery/earth/raven_huginn.png |
| globe_raven_muninn | raven_muninn.png | /public/imagery/earth/raven_muninn.png |
| news_motif | FeatherPNG | /public/imagery/processed/FeatherPNG.png |
| about_michael_portrait | michael_howardbio.jpeg | /public/imagery/processed/michael_howardbio.jpeg |
| about_michael_timeline | friendship.png | /public/imagery/processed/friendship.png |
| about_integai_main | integai_logo.png | /public/imagery/logos/integai_logo.png |
| footer_accent | inspiring.jpg | /public/imagery/galaxies/inspiring.jpg |
| footer_logo_hisl | HISL_Logo.jpeg | /public/imagery/logos/HISL_Logo.jpeg |
| footer_logo_integai | integai_logo.png | /public/imagery/logos/integai_logo.png |

> **Pipeline:** Use Sharp to generate multi‑width WebP + LQIP placeholders and an auto‑generated typed manifest. Avoid hard‑coding paths in components.

---

## 2) Section Registry (build‑time guardrail)
Enforce that each component receives the required props. Fail fast if a section is malformed.

```json
{
  "GlobalHeader": { "required": [] },
  "HeroBanner":   { "required": ["title", "subtitle", "primaryCta", "imageId"] },
  "HeroGlobe":    { "required": ["title", "baseImageId"] },
  "HeroMinimal":  { "required": ["title"] },
  "PerfBadges":   { "required": ["ttftTargetMs", "p50TokPerS"] },
  "SplitFeature": { "required": ["title"] },
  "FeatureGrid":  { "required": ["features"] },
  "TeaserCards":  { "required": ["cards"] },
  "FeatureTile":  { "required": ["title", "link"] },
  "PoemPanel":    { "required": ["text"] },
  "PromptConsole":{ "required": ["placeholder"] },
  "PromptArcMap": { "required": ["mode"] },
  "EnergyBadge":  { "required": ["baseWh", "per100TokWh", "co2FactorKgPerKWh"] },
  "ResultPanel":  { "required": [] },
  "InlineNote":   { "required": ["text"] },
  "NewsStream":   { "required": ["provider"] },
  "StreamFilters":{ "required": ["topics", "sources"] },
  "AnnotationBar":{ "required": ["actions"] },
  "BioLongform":  { "required": ["portraitId", "mdx"] },
  "CardLinks":    { "required": ["cards"] },
  "ApiContractsStrip": { "required": ["endpoints"] },
  "AgentCards":   { "required": ["agents"] },
  "KPIGrid":      { "required": ["metrics"] },
  "ProofBlocks":  { "required": ["bullets"] },
  "Panel":        { "required": ["text"] },
  "Form":         { "required": ["formId", "fields", "submitLabel"] },
  "GlobalFooter": { "required": [] }
}
```

---

## 3) Page Payloads — `/v1/site/page?slug=<slug>`
> Copy each JSON block into your gateway, or save to `/content/pages/<slug>.json` and serve them. All imagery references are **image IDs** from §1.

### 3.1 Home (`slug: "home"`)
```json
{
  "slug": "home",
  "title": "HISL — Human-first Industrial Intelligence",
  "sections": [
    {
      "sectionId": "nav_primary_v1",
      "component": "GlobalHeader",
      "props": { "logo": "footer_logo_hisl", "menu": { "primary": ["/", "/about", "/sectors", "/agents", "/globe", "/news", "/contact"] } }
    },
    {
      "sectionId": "hero_industrial_v1",
      "component": "HeroBanner",
      "props": {
        "title": "Industrial intelligence that keeps people safe — and operations sustainable.",
        "subtitle": "Sovereign AI that runs offline-first. Auditable pipelines. Human-in-the-loop by design.",
        "primaryCta": { "label": "Start a Demo", "to": "/contact" },
        "secondaryCta": { "label": "Where your prompts go", "to": "/globe" },
        "imageId": "home_hero_main",
        "overlayImageId": "home_hero_overlay",
        "backdrop": "parallax",
        "respectReducedMotion": true
      }
    },
    {
      "sectionId": "perf_badges_v1",
      "component": "PerfBadges",
      "props": {
        "ttftTargetMs": 800,
        "p50TokPerS": 40,
        "mode": "offline-first",
        "note": "Fast-path Gemma via llama.cpp; Mistral‑7B Q4_0 fallback"
      }
    },
    {
      "sectionId": "problem_panel_v1",
      "component": "SplitFeature",
      "props": {
        "title": "Blind spots become risks. Drift costs money. Sustainability stalls.",
        "bullets": [
          "Paperwork & siloed tools hide hazards and waste.",
          "Operational drift creeps in when data isn’t joined-up.",
          "Sustainability targets need transparent, trusted metrics."
        ],
        "imageId": "home_problem_main"
      }
    },
    {
      "sectionId": "solution_grid_v1",
      "component": "FeatureGrid",
      "props": {
        "intro": "One surface for content, search, forms, and publishing — owned by IntegAI.",
        "features": [
          { "title": "Offline‑first RAG", "desc": "Obsidian → E5-small-v2 (GGUF) → Chroma + Neo4j. No external calls by default.", "iconId": "globe.svg" },
          { "title": "Deterministic Agents", "desc": "9‑core graph: Planner, Retriever, Judge, Executor, Memory, Safety, Tools, Observer, Publisher.", "iconId": "file.svg" },
          { "title": "Immutable Artifacts", "desc": "All substantial outputs are packaged as .integpkg to MinIO with checksums.", "iconId": "window.svg" },
          { "title": "Idempotent Forms", "desc": "Every POST uses Idempotency‑Key; no duplicates, ever.", "iconId": "home_solution_security" },
          { "title": "Data Sovereignty", "desc": "NGINX + Keycloak + Vault front‑door; air‑gap by policy.", "iconId": "home_solution_badge" }
        ],
        "brandStrip": ["HISL_Logo.jpeg", "integai_logo.png"]
      }
    },
    {
      "sectionId": "ethics_sovereignty_v1",
      "component": "SplitFeature",
      "props": {
        "title": "Sovereign by design.",
        "bullets": [
          "Agentic graph with human gates (Judge, Safety).",
          "Strict enterprise policy: no online fetch without explicit allow.",
          "Traceable outputs with provenance and audit trails."
        ],
        "leftImageId": "fusion_michael",
        "rightImageId": "fusion_ai_ethics"
      }
    },
    {
      "sectionId": "poem_panel_v1",
      "component": "PoemPanel",
      "props": {
        "title": "",
        "author": "The Craftsman’s Creed",
        "text": "Then prove we now with best endevour, what from our efforts yet may spring; he justly is dispised who never, did thought to aide his labours bring; for this is arts true indication - when skill is minister to thought, when types that are the minds creation - the hand to perfect form has wrought",
        "align": "center",
        "imageId": "poem_backdrop",
        "footnote": "Locked verbatim; guarded by SHA‑256 in build."
      }
    },
    {
      "sectionId": "about_teasers_v1",
      "component": "TeaserCards",
      "props": {
        "cards": [
          { "title": "About Michael", "body": "From hands‑on build to sovereign AI.", "to": "/about/michael", "imageId": "about_teaser_michael" },
          { "title": "About IntegAI", "body": "Offline‑first orchestration for websites & ops.", "to": "/about/integai", "imageId": "about_teaser_integai" }
        ]
      }
    },
    { "sectionId": "globe_teaser_v1", "component": "FeatureTile", "props": { "title": "Where your prompts go", "caption": "Planner → Retriever → Judge → Executor, visualized.", "link": "/globe" } },
    { "sectionId": "news_teaser_v1", "component": "FeatureTile", "props": { "title": "Live News & Trends", "caption": "Signal over noise.", "link": "/news" } },
    { "sectionId": "cta_contact_v1", "component": "BigCTA", "props": { "title": "Build with IntegAI", "primary": "Talk to us", "to": "/contact" } },
    {
      "sectionId": "footer_v1",
      "component": "GlobalFooter",
      "props": {
        "logos": ["footer_logo_hisl", "footer_logo_integai"],
        "links": { "primary": ["/about", "/sectors", "/agents", "/globe", "/news", "/contact"], "legal": ["/legal/privacy", "/legal/terms"] },
        "accentImageId": "footer_accent"
      }
    }
  ]
}
```

### 3.2 Globe (`slug: "globe"`)
```json
{
  "slug": "globe",
  "title": "Where your prompts go — Sovereign AI",
  "sections": [
    { "sectionId": "nav_primary_v1", "component": "GlobalHeader", "props": {} },
    {
      "sectionId": "hero_globe_v1",
      "component": "HeroGlobe",
      "props": {
        "title": "Where your prompts go.",
        "subtitle": "See the 9‑core agent pass and energy estimate for each answer.",
        "autoplay": true,
        "respectReducedMotion": true,
        "baseImageId": "globe_base",
        "sprites": ["globe_raven_huginn", "globe_raven_muninn"]
      }
    },
    {
      "sectionId": "prompt_console_v1",
      "component": "PromptConsole",
      "props": { "placeholder": "Ask anything…", "modelOptions": ["Gemma fast‑path", "Mistral‑7B fallback"], "showLatency": true, "maxTokens": 1024 }
    },
    { "sectionId": "arcs_visual_v1", "component": "PromptArcMap", "props": { "mode": "offline-first", "dataCenters": ["Lenovo host", "Edge cache"], "arcs": "prompt->planner->retriever->judge->executor", "toggle": "Agent pass" } },
    { "sectionId": "energy_badge_v1", "component": "EnergyBadge", "props": { "baseWh": 0.3, "per100TokWh": 0.1, "co2FactorKgPerKWh": 0.233, "showEstimates": true } },
    { "sectionId": "result_panel_v1", "component": "ResultPanel", "props": { "diffView": true, "provenance": true } },
    { "sectionId": "demo_disclaimer_v1", "component": "InlineNote", "props": { "text": "Demo runs offline by default; online adapters are policy‑gated." } },
    { "sectionId": "footer_v1", "component": "GlobalFooter", "props": {} }
  ]
}
```

### 3.3 News (`slug: "news"`)
```json
{
  "slug": "news",
  "title": "Live News & Trends",
  "sections": [
    { "sectionId": "nav_primary_v1", "component": "GlobalHeader", "props": {} },
    { "sectionId": "hero_news_v1", "component": "HeroMinimal", "props": { "title": "Live News & Trends", "subtitle": "Signal over noise.", "imageId": "news_motif" } },
    { "sectionId": "stream_filters_v1", "component": "StreamFilters", "props": { "topics": ["AI", "Construction", "Pharma", "Sustainability"], "sources": ["X/Grok", "Docs"], "autoRefresh": true } },
    { "sectionId": "live_stream_v1", "component": "NewsStream", "props": { "provider": "Grok", "itemsPerPage": 20, "hydrateOnVisible": true, "disclaimer": "Live content may be unvetted." } },
    { "sectionId": "annotation_bar_v1", "component": "AnnotationBar", "props": { "actions": ["Pin", "Save", "Send to /agents", "Open in new tab"] } },
    { "sectionId": "footer_v1", "component": "GlobalFooter", "props": {} }
  ]
}
```

### 3.4 About (`slug: "about"`)
```json
{
  "slug": "about",
  "title": "About HISL",
  "sections": [
    { "sectionId": "nav_primary_v1", "component": "GlobalHeader", "props": {} },
    {
      "sectionId": "about_index_v1",
      "component": "CardLinks",
      "props": {
        "title": "People, craft, and sovereign AI.",
        "cards": [
          { "title": "About Michael", "to": "/about/michael", "imageId": "about_michael_portrait" },
          { "title": "About IntegAI", "to": "/about/integai", "imageId": "about_integai_main" },
          { "title": "The Craftsman’s Creed", "to": "/poem", "imageId": "poem_backdrop" }
        ]
      }
    },
    { "sectionId": "footer_v1", "component": "GlobalFooter", "props": {} }
  ]
}
```

### 3.5 About Michael (`slug: "about/michael"`)
```json
{
  "slug": "about/michael",
  "title": "About Michael Howard",
  "sections": [
    { "sectionId": "nav_primary_v1", "component": "GlobalHeader", "props": {} },
    {
      "sectionId": "founder_story_v1",
      "component": "BioLongform",
      "props": {
        "portraitId": "about_michael_portrait",
        "backdropId": "about_michael_timeline",
        "mdx": [
          "Michael founded HISL to join practical construction wisdom with sovereign AI.",
          "His focus: safer sites, clearer decisions, and measurable sustainability.",
          "HISL’s work is anchored in hands‑on craft and accountable engineering."
        ]
      }
    },
    { "sectionId": "footer_v1", "component": "GlobalFooter", "props": {} }
  ]
}
```

### 3.6 About IntegAI (`slug: "about/integai"`)
```json
{
  "slug": "about/integai",
  "title": "About IntegAI",
  "sections": [
    { "sectionId": "nav_primary_v1", "component": "GlobalHeader", "props": {} },
    {
      "sectionId": "intro_platform_v1",
      "component": "SplitFeature",
      "props": {
        "title": "Sovereign, offline‑first orchestration.",
        "bullets": [
          "9‑core agent graph for deterministic pipelines.",
          "Local indexes first (Chroma + Neo4j); no public web by default.",
          "Artifact everything: .integpkg with checksums and provenance."
        ],
        "imageId": "about_integai_main"
      }
    },
    { "sectionId": "perf_targets_v1", "component": "PerfBadges", "props": { "ttftTargetMs": 800, "p50TokPerS": 40, "note": "Fast‑path Gemma via llama.cpp" } },
    { "sectionId": "api_contracts_v1", "component": "ApiContractsStrip", "props": { "endpoints": ["/v1/site/page", "/v1/site/menu", "/v1/site/search", "/v1/site/seo", "/v1/site/forms/{id}"], "note": "Immutable v1 contracts." } },
    { "sectionId": "footer_v1", "component": "GlobalFooter", "props": {} }
  ]
}
```

### 3.7 Poem (`slug: "poem"`)
```json
{
  "slug": "poem",
  "title": "The Craftsman’s Creed",
  "sections": [
    { "sectionId": "nav_primary_v1", "component": "GlobalHeader", "props": {} },
    {
      "sectionId": "poem_body_v1",
      "component": "PoemPanel",
      "props": {
        "text": "Then prove we now with best endevour, what from our efforts yet may spring; he justly is dispised who never, did thought to aide his labours bring; for this is arts true indication - when skill is minister to thought, when types that are the minds creation - the hand to perfect form has wrought",
        "imageId": "poem_backdrop",
        "align": "center"
      }
    },
    { "sectionId": "footer_v1", "component": "GlobalFooter", "props": {} }
  ]
}
```

### 3.8 Agents (`slug: "agents"`)
```json
{
  "slug": "agents",
  "title": "Agents Directory",
  "sections": [
    { "sectionId": "nav_primary_v1", "component": "GlobalHeader", "props": {} },
    {
      "sectionId": "agents_grid_v1",
      "component": "AgentCards",
      "props": {
        "agents": [
          { "name": "EHS Agent", "sector": "Construction" },
          { "name": "Project PM Agent", "sector": "Construction" },
          { "name": "BIM/Design Agent", "sector": "Construction" },
          { "name": "ESG Agent", "sector": "Environmental" },
          { "name": "Sustainability Metrics Agent", "sector": "Environmental" },
          { "name": "Heritage Preservation Agent", "sector": "Conservation" },
          { "name": "Planning Approvals Agent", "sector": "Conservation" },
          { "name": "CROx", "sector": "Pharma" },
          { "name": "Procurement Agent", "sector": "Public Procurement" },
          { "name": "Anti-Corruption Oversight Agent", "sector": "Public Procurement" },
          { "name": "Crop Monitoring Agent", "sector": "Agriculture" },
          { "name": "Agri-Supply Agent", "sector": "Agriculture" },
          { "name": "Market Signals Agent", "sector": "Trader/Economics" },
          { "name": "Risk & Portfolio Agent", "sector": "Trader/Economics" },
          { "name": "Clinical Workflow Agent", "sector": "Healthcare" },
          { "name": "Pet Care Agent", "sector": "Healthcare" },
          { "name": "Ops Agent", "sector": "Insurance" },
          { "name": "Fraud Detection Agent", "sector": "Insurance" },
          { "name": "Wizard Agent", "sector": "Custom" },
          { "name": "Child Agents", "sector": "Custom" }
        ]
      }
    },
    { "sectionId": "footer_v1", "component": "GlobalFooter", "props": {} }
  ]
}
```

### 3.9 CROx (`slug: "sectors/pharma-crox"`)
```json
{
  "slug": "sectors/pharma-crox",
  "title": "CROx — Clinical R&D Orchestrator",
  "sections": [
    { "sectionId": "nav_primary_v1", "component": "GlobalHeader", "props": {} },
    { "sectionId": "crox_hero_v1", "component": "HeroSplit", "props": { "title": "CROx — Clinical R&D Orchestrator", "subtitle": "Protocol → Patients → KPIs → Audit", "cta": "Request demo" } },
    { "sectionId": "crox_features_v1", "component": "FeatureColumns", "props": { "items": ["Protocol Copilot (drafts & diffs; amendment risk)", "Recruitment & Retention Intelligence", "Ops Unifier (10–20 vendor systems → one surface)", "Regulatory & CSR Drafting (traceable citations)", "Patient Monitoring Hub (wearables/ePRO)", "KPI Dashboard (amendment cost, velocity, ROI)"] } },
    { "sectionId": "crox_kpis_v1", "component": "KPIGrid", "props": { "metrics": ["Amendment rate↓", "Recruitment velocity↑", "Dropout rate↓", "CSR drafting cycle↓", "ROI↑"] } },
    { "sectionId": "crox_auditability_v1", "component": "ProofBlocks", "props": { "bullets": ["Traceable citations", ".integpkg artifacts", "HITL gates via Judge"], "link": "/about/integai" } },
    { "sectionId": "footer_v1", "component": "GlobalFooter", "props": {} }
  ]
}
```

### 3.10 Sector pages (Construction, Environmental, Conservation, Procurement, Agriculture, Trader/Economics, Healthcare, Insurance, Custom)
> Same component pattern: minimal hero + feature grid + footer. Replicate as needed.

```json
{
  "slug": "sectors/construction",
  "title": "Construction — Safer sites, smarter ops",
  "sections": [
    { "sectionId": "nav_primary_v1", "component": "GlobalHeader", "props": {} },
    { "sectionId": "sector_intro_v1", "component": "HeroMinimal", "props": { "title": "Construction", "subtitle": "EHS, PMO, and BIM agents working as one." } },
    { "sectionId": "sector_features_v1", "component": "FeatureGrid", "props": { "features": [ { "title": "EHS Agent", "desc": "Site safety & compliance checks, risk triage." }, { "title": "Project PM Agent", "desc": "Scheduling, resource planning, delivery rhythm." }, { "title": "BIM/Design Agent", "desc": "Drawing QA, cost/scope deltas, handover packs." } ] } },
    { "sectionId": "footer_v1", "component": "GlobalFooter", "props": {} }
  ]
}
```

```json
{
  "slug": "sectors/environmental",
  "title": "Environmental — Metrics that matter",
  "sections": [
    { "sectionId": "nav_primary_v1", "component": "GlobalHeader", "props": {} },
    { "sectionId": "sector_features_v1", "component": "FeatureGrid", "props": { "features": [ { "title": "ESG Agent", "desc": "Emissions tracking & ESG reporting." }, { "title": "Sustainability Metrics Agent", "desc": "Lifecycle analysis, biodiversity signals." } ] } },
    { "sectionId": "footer_v1", "component": "GlobalFooter", "props": {} }
  ]
}
```

```json
{
  "slug": "sectors/conservation",
  "title": "Conservation / SPAB — Respecting heritage",
  "sections": [
    { "sectionId": "nav_primary_v1", "component": "GlobalHeader", "props": {} },
    { "sectionId": "sector_features_v1", "component": "FeatureGrid", "props": { "features": [ { "title": "Heritage Preservation Agent", "desc": "Restoration planning, asset scans." }, { "title": "Planning Approvals Agent", "desc": "Permits & SPAB guidance workflows." } ] } },
    { "sectionId": "footer_v1", "component": "GlobalFooter", "props": {} }
  ]
}
```

```json
{
  "slug": "sectors/procurement",
  "title": "Public Procurement — Transparent by default",
  "sections": [
    { "sectionId": "nav_primary_v1", "component": "GlobalHeader", "props": {} },
    { "sectionId": "sector_features_v1", "component": "FeatureGrid", "props": { "features": [ { "title": "Procurement Agent", "desc": "Tender drafting, evaluation, compliance guardrails." }, { "title": "Anti‑Corruption Oversight Agent", "desc": "Anomaly detection, audit reporting." } ] } },
    { "sectionId": "footer_v1", "component": "GlobalFooter", "props": {} }
  ]
}
```

```json
{
  "slug": "sectors/agriculture",
  "title": "Agriculture — From soil to supply",
  "sections": [
    { "sectionId": "nav_primary_v1", "component": "GlobalHeader", "props": {} },
    { "sectionId": "sector_features_v1", "component": "FeatureGrid", "props": { "features": [ { "title": "Crop Monitoring Agent", "desc": "Soil & irrigation, yield optimization." }, { "title": "Agri‑Supply Agent", "desc": "Logistics planning & pricing intelligence." } ] } },
    { "sectionId": "footer_v1", "component": "GlobalFooter", "props": {} }
  ]
}
```

```json
{
  "slug": "sectors/trader-economics",
  "title": "Trader / Economics — Signals to strategy",
  "sections": [
    { "sectionId": "nav_primary_v1", "component": "GlobalHeader", "props": {} },
    { "sectionId": "sector_features_v1", "component": "FeatureGrid", "props": { "features": [ { "title": "Market Signals Agent", "desc": "Equities/FX/commodities signals aggregation." }, { "title": "Risk & Portfolio Agent", "desc": "Portfolio modeling & hedging strategies." } ] } },
    { "sectionId": "footer_v1", "component": "GlobalFooter", "props": {} }
  ]
}
```

```json
{
  "slug": "sectors/healthcare",
  "title": "Healthcare / Pet Care — Better notes, better care",
  "sections": [
    { "sectionId": "nav_primary_v1", "component": "GlobalHeader", "props": {} },
    { "sectionId": "sector_features_v1", "component": "FeatureGrid", "props": { "features": [ { "title": "Clinical Workflow Agent", "desc": "Notes summarization & triage workflows." }, { "title": "Pet Care Agent", "desc": "Diagnostics & treatment planning aids." } ] } },
    { "sectionId": "footer_v1", "component": "GlobalFooter", "props": {} }
  ]
}
```

```json
{
  "slug": "sectors/insurance",
  "title": "Insurance — Faster ops, lower fraud",
  "sections": [
    { "sectionId": "nav_primary_v1", "component": "GlobalHeader", "props": {} },
    { "sectionId": "sector_features_v1", "component": "FeatureGrid", "props": { "features": [ { "title": "Ops Agent", "desc": "Claims processing & policy admin." }, { "title": "Fraud Detection Agent", "desc": "Anomaly & fraud detection." } ] } },
    { "sectionId": "footer_v1", "component": "GlobalFooter", "props": {} }
  ]
}
```

```json
{
  "slug": "sectors/custom",
  "title": "Custom Builds — Bespoke orchestration",
  "sections": [
    { "sectionId": "nav_primary_v1", "component": "GlobalHeader", "props": {} },
    { "sectionId": "sector_features_v1", "component": "FeatureGrid", "props": { "features": [ { "title": "Wizard Agent", "desc": "Bespoke automation with callbacks." }, { "title": "Child Agents", "desc": "Sector‑specific specializations that inherit core DNA." } ] } },
    { "sectionId": "footer_v1", "component": "GlobalFooter", "props": {} }
  ]
}
```

### 3.11 Contact / RFP / Newsletter / Careers
```json
{
  "slug": "contact",
  "title": "Talk to us",
  "sections": [
    { "sectionId": "nav_primary_v1", "component": "GlobalHeader", "props": {} },
    { "sectionId": "contact_form_v1", "component": "Form", "props": { "formId": "contact", "fields": ["name", "email", "company", "message"], "submitLabel": "Send", "idempotent": true } },
    { "sectionId": "contact_panel_v1", "component": "Panel", "props": { "imageId": "footer_accent", "text": "We respond quickly. Your details stay private." } },
    { "sectionId": "footer_v1", "component": "GlobalFooter", "props": {} }
  ]
}
```

```json
{
  "slug": "rfp",
  "title": "Request for Proposal",
  "sections": [
    { "sectionId": "nav_primary_v1", "component": "GlobalHeader", "props": {} },
    { "sectionId": "rfp_form_v1", "component": "Form", "props": { "formId": "rfp", "fields": ["name", "email", "org", "scope", "timeline", "budgetBand"], "submitLabel": "Submit RFP", "idempotent": true } },
    { "sectionId": "footer_v1", "component": "GlobalFooter", "props": {} }
  ]
}
```

```json
{
  "slug": "newsletter",
  "title": "Newsletter",
  "sections": [
    { "sectionId": "nav_primary_v1", "component": "GlobalHeader", "props": {} },
    { "sectionId": "newsletter_form_v1", "component": "Form", "props": { "formId": "newsletter", "fields": ["email"], "submitLabel": "Subscribe", "idempotent": true } },
    { "sectionId": "footer_v1", "component": "GlobalFooter", "props": {} }
  ]
}
```

```json
{
  "slug": "careers",
  "title": "Careers",
  "sections": [
    { "sectionId": "nav_primary_v1", "component": "GlobalHeader", "props": {} },
    { "sectionId": "careers_intro_v1", "component": "HeroMinimal", "props": { "title": "Build sovereign AI with us.", "subtitle": "We hire for craft, care, and clarity." } },
    { "sectionId": "footer_v1", "component": "GlobalFooter", "props": {} }
  ]
}
```

### 3.12 Legal (Privacy & Terms)
```json
{
  "slug": "legal/privacy",
  "title": "Privacy Policy",
  "sections": [
    { "sectionId": "nav_primary_v1", "component": "GlobalHeader", "props": {} },
    { "sectionId": "privacy_body_v1", "component": "LegalDoc", "props": { "mdx": ["We collect only what we need to respond to you.", "Forms are idempotent and stored as normalized records or artifacts.", "We do not sell your data. You can request deletion via /contact."] } },
    { "sectionId": "footer_v1", "component": "GlobalFooter", "props": {} }
  ]
}
```

```json
{
  "slug": "legal/terms",
  "title": "Terms of Use",
  "sections": [
    { "sectionId": "nav_primary_v1", "component": "GlobalHeader", "props": {} },
    { "sectionId": "terms_body_v1", "component": "LegalDoc", "props": { "mdx": ["Use of this site implies agreement to fair and lawful use.", "Content is provided as-is; availability may change.", "All trademarks are property of their respective owners."] } },
    { "sectionId": "footer_v1", "component": "GlobalFooter", "props": {} }
  ]
}
```

---

## 4) Optional SEO payloads — `/v1/site/seo?slug=<slug>`
> Keep titles concise; add OG images via `imageId`.

```json
[
  { "slug": "home", "title": "HISL — Human-first Industrial Intelligence", "description": "Sovereign, offline-first AI that keeps people safe and operations sustainable.", "og": { "imageId": "home_hero_main" } },
  { "slug": "globe", "title": "Where your prompts go — Sovereign AI", "description": "Watch the agent pass and energy estimate per answer.", "og": { "imageId": "globe_base" } },
  { "slug": "about/integai", "title": "IntegAI — Offline-first Orchestrator", "description": "Deterministic pipelines, artifacted outputs, and v1 contracts.", "og": { "imageId": "about_integai_main" } },
  { "slug": "poem", "title": "The Craftsman’s Creed", "description": "Our philosophical anchor, rendered verbatim.", "og": { "imageId": "poem_backdrop" } }
]
```

---

## 5) Motion & Hover Enhancements (drop‑in)

### 5.1 CSS tokens (Tailwind‑style classes)
```css
/* globals.css additions (a11y‑focused) */
.btn{ display:inline-flex; align-items:center; justify-content:center; padding:.5rem 1rem; border:1px solid var(--edge); border-radius:.9rem; background: color-mix(in srgb, var(--panel) 90%, transparent); transition: transform .18s ease, box-shadow .18s ease; }
.btn:hover{ transform: translateY(-1px); box-shadow: 0 6px 24px rgba(0,0,0,.25); }
.btn:focus-visible{ outline: none; box-shadow: var(--ring, 0 0 0 3px rgba(158,197,255,.45)); }
.btn-gold{ color:#0b1220; background: linear-gradient(#f6d36a,#d4af37); border:0; box-shadow: 0 8px 26px rgba(212,175,55,.3); }
.btn-ghost{ color:#bed3ff; background: transparent; }
/* subtle card hover */
.card{ transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease; }
.card:hover{ transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,0,0,.25), 0 0 0 1px rgba(255,255,255,.06) inset; }
```

### 5.2 Reusable Hover Button (Framer Motion)
```tsx
// components/HoverButton.tsx
"use client";
import { motion } from "framer-motion";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "gold"|"ghost" };
export default function HoverButton({ variant="gold", children, ...rest }: Props){
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      className={`btn ${variant==="gold" ? "btn-gold" : "btn-ghost"}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
```

### 5.3 Hero Parallax Overlay (lightweight)
```tsx
// components/HeroParallax.tsx
"use client";
import { useEffect, useRef } from "react";
type Props={ baseId:string; overlayId?:string };
export default function HeroParallax({ baseId, overlayId }:Props){
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    const onMove=(e:PointerEvent)=>{
      const r = el.getBoundingClientRect();
      const cx = (e.clientX - r.left)/r.width - .5;
      const cy = (e.clientY - r.top)/r.height - .5;
      el.style.setProperty("--dx", `${cx*6}px`);
      el.style.setProperty("--dy", `${cy*6}px`);
    };
    el.addEventListener("pointermove", onMove);
    return ()=> el.removeEventListener("pointermove", onMove);
  },[]);
  return (
    <div ref={ref} className="relative overflow-hidden" style={{"--dx":"0px","--dy":"0px"} as any}>
      <img src={`/imagery/${baseId}`} alt="" className="w-full h-auto block" />
      {overlayId && (
        <img src={`/imagery/${overlayId}`} alt="" className="pointer-events-none absolute inset-0 w-full h-full object-cover" style={{ transform: "translate(var(--dx), var(--dy))", opacity:.35 }} />
      )}
    </div>
  );
}
```

> Use in `HeroBanner`: `<HeroParallax baseId={IMAGES.home_hero_main} overlayId={IMAGES.home_hero_overlay} />`

---

## 6) Footer & Routing (fix 404s)
Ensure these slugs exist to avoid 404:
- `/contact`, `/legal/privacy`, `/legal/terms`  
Footer payload in Home already points to these. Confirm router maps accordingly.

---

## 7) Forms & Idempotency

### 7.1 Front‑end POST helper
```ts
// lib/postIdempotent.ts
export async function postIdempotent(url: string, body: any){
  const key = crypto.randomUUID();
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Idempotency-Key": key },
    body: JSON.stringify(body)
  });
  if(!res.ok) throw new Error(`POST failed ${res.status}`);
  return res.json();
}
```

### 7.2 Example usage
```ts
await postIdempotent("/api/v1/site/forms/contact", {
  name, email, company, message
});
```

### 7.3 Server response (expected)
```json
{ "ok": true, "idempotencyKey": "<uuid>", "triage": { "tag": "sales", "severity": "info" }, "route": { "owner": "HISL", "channel": "email" } }
```

### 7.4 Confirmation pages (slugs)
- `/contact/sent`, `/rfp/sent`, `/newsletter/sent`, `/careers/sent`

---

## 8) Poem Lock — Verbatim guard (keep in repo)

### 8.1 Canonical text + hash
```ts
// /content/canon/poem.lock.ts
export const POEM_LOCK = {
  id: "craftsman-poem-v1",
  title: "",
  text:
    "Then prove we now with best endevour, what from our efforts yet may spring; he justly is dispised who never, did thought to aide his labours bring; for this is arts true indication - when skill is minister to thought, when types that are the minds creation - the hand to perfect form has wrought",
  sha256_hex: "e06c6a8b4483c12a16da1fe0630551e186859373ba95d5b62194e16898a0a6ea",
  sha256_b64: "4Gxqi0SDwSoW2h/gYwVR4YaFk3O6ldW2IZThaJigpuo="
} as const;
```

### 8.2 Component & renderer override
```tsx
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
```

```tsx
// /components/SectionRenderer.tsx (override poem from API with lock)
import PoemPanel from "@/components/PoemPanel";
import { getLockedPoemText } from "@/lib/poem-lock";
export function SectionRenderer({ sections }: { sections: {sectionId:string; component:string; props:any}[] }){
  return (<>
    {sections.map((s,i)=>{
      if (s.sectionId === "poem") return <PoemPanel key={i} {...s.props} text={getLockedPoemText()} />;
      // ...map other components
      return null;
    })}
  </>);
}
```

### 8.3 CI Test
```ts
// /tests/poem-lock.test.ts
import { describe, it, expect } from "vitest";
import { POEM_LOCK } from "@/content/canon/poem.lock";
import { createHash } from "crypto";
describe("POEM_LOCK", () => {
  it("has exact sha256", () => {
    const hex = createHash("sha256").update(POEM_LOCK.text, "utf8").digest("hex");
    expect(hex).toBe(POEM_LOCK.sha256_hex);
  });
});
```

---

## 9) Imagery pipeline (Sharp) — optional script
```bash
# scripts/generate-imagery-manifest.mjs (outline)
# 1) scan /public/imagery/**  2) emit widths (1200, 2400) WebP + blur placeholders
# 3) write typed manifest /src/app/lib/imagery.ts
```

---

## 10) Acceptance checklist
- [ ] Footer routes exist (`/contact`, `/legal/privacy`, `/legal/terms`) — no 404s.
- [ ] Section Registry enforced at build; rejects unknown/missing props.
- [ ] Components consume only `imageId` → path via `IMAGES` manifest.
- [ ] Poem lock CI test passes; no fallback copies exist in repo.
- [ ] `prefers-reduced-motion` respected; R3F lazy‑init after LCP.
- [ ] Forms send **Idempotency‑Key** and display only success page.
- [ ] Lighthouse ≥ 90 on mobile; TTFB ≤ 200ms cached; RAG reads ≤ 2.0s p95.

---

**End of file — Save as:** `docs/HISL_Master_Content_Lock.md`
