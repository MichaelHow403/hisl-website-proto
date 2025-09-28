/**
 * LOCKED_CONTENT - Master Content Lock Implementation
 * Single source of truth for all content extracted from Website_Master_Content_Lock_28Sept.md
 * Section 3: Page Payloads
 */

export const LOCKED_CONTENT = {
  // ========== HOME PAGE ==========
  home: {
    hero: {
      title: "Industrial intelligence that keeps people safe — and operations sustainable.",
      subtitle: "Sovereign AI that runs offline-first. Auditable pipelines. Human-in-the-loop by design.",
      primaryCta: { label: "Start a Demo", to: "/contact" },
      secondaryCta: { label: "Where your prompts go", to: "/globe" },
      imageId: "home_hero_main",
      overlayImageId: "home_hero_overlay",
      backdrop: "parallax",
      respectReducedMotion: true
    },
    perf: {
      ttftTargetMs: 800,
      p50TokPerS: 40,
      mode: "offline-first",
      note: "Fast-path Gemma via llama.cpp; Mistral‑7B Q4_0 fallback"
    },
    problem: {
      title: "Blind spots become risks. Drift costs money. Sustainability stalls.",
      bullets: [
        "Paperwork & siloed tools hide hazards and waste.",
        "Operational drift creeps in when data isn't joined-up.",
        "Sustainability targets need transparent, trusted metrics."
      ],
      imageId: "home_problem_main"
    },
    solution: {
      intro: "One surface for content, search, forms, and publishing — owned by IntegAI.",
      features: [
        { title: "Offline‑first RAG", desc: "Obsidian → E5-small-v2 (GGUF) → Chroma + Neo4j. No external calls by default.", iconId: "globe.svg" },
        { title: "Deterministic Agents", desc: "9‑core graph: Planner, Retriever, Judge, Executor, Memory, Safety, Tools, Observer, Publisher.", iconId: "file.svg" },
        { title: "Immutable Artifacts", desc: "All substantial outputs are packaged as .integpkg to MinIO with checksums.", iconId: "window.svg" },
        { title: "Idempotent Forms", desc: "Every POST uses Idempotency‑Key; no duplicates, ever.", iconId: "home_solution_security" },
        { title: "Data Sovereignty", desc: "NGINX + Keycloak + Vault front‑door; air‑gap by policy.", iconId: "home_solution_badge" }
      ],
      brandStrip: ["HISL_Logo.jpeg", "integai_logo.png"]
    },
    ethics: {
      title: "Sovereign by design.",
      bullets: [
        "Agentic graph with human gates (Judge, Safety).",
        "Strict enterprise policy: no online fetch without explicit allow.",
        "Traceable outputs with provenance and audit trails."
      ],
      leftImageId: "fusion_michael",
      rightImageId: "fusion_ai_ethics"
    },
    poem: {
      title: "",
      author: "The Craftsman's Creed",
      text: "Then prove we now with best endevour, what from our efforts yet may spring; he justly is dispised who never, did thought to aide his labours bring; for this is arts true indication - when skill is minister to thought, when types that are the minds creation - the hand to perfect form has wrought",
      align: "center",
      imageId: "poem_backdrop",
      footnote: "Locked verbatim; guarded by SHA‑256 in build."
    },
    aboutTeasers: {
      cards: [
        { title: "About Michael", body: "From hands‑on build to sovereign AI.", to: "/about/michael", imageId: "about_teaser_michael" },
        { title: "About IntegAI", body: "Offline‑first orchestration for websites & ops.", to: "/about/integai", imageId: "about_teaser_integai" }
      ]
    },
    globeTeaser: { title: "Where your prompts go", caption: "Planner → Retriever → Judge → Executor, visualized.", link: "/globe" },
    newsTeaser: { title: "Live News & Trends", caption: "Signal over noise.", link: "/news" },
    ctaContact: { title: "Build with IntegAI", primary: "Talk to us", to: "/contact" }
  },

  // ========== GLOBE PAGE ==========
  globe: {
    hero: {
      title: "Where your prompts go.",
      subtitle: "See the 9‑core agent pass and energy estimate for each answer.",
      autoplay: true,
      respectReducedMotion: true,
      baseImageId: "globe_base",
      sprites: ["globe_raven_huginn", "globe_raven_muninn"]
    },
    promptConsole: { 
      promptPlaceholder: "Ask anything…", 
      modelOptions: ["Gemma fast‑path", "Mistral‑7B fallback"], 
      showLatency: true, 
      maxTokens: 1024 
    },
    arcsVisual: { 
      mode: "offline-first", 
      dataCenters: ["Lenovo host", "Edge cache"], 
      arcs: "prompt->planner->retriever->judge->executor", 
      toggle: "Agent pass" 
    },
    energyBadge: { 
      baseWh: 0.3, 
      per100TokWh: 0.1, 
      co2FactorKgPerKWh: 0.233, 
      showEstimates: true 
    },
    demoDisclaimer: { text: "Demo runs offline by default; online adapters are policy‑gated." }
  },

  // ========== NEWS PAGE ==========
  news: {
    hero: {
      title: "Live News & Trends",
      subtitle: "Signal over noise.",
      imageId: "news_motif"
    },
    streamFilters: { 
      topics: ["AI", "Construction", "Pharma", "Sustainability"], 
      sources: ["X/Grok", "Docs"], 
      autoRefresh: true 
    },
    liveStream: { 
      provider: "Grok", 
      itemsPerPage: 20, 
      hydrateOnVisible: true, 
      disclaimer: "Live content may be unvetted." 
    },
    annotationBar: { 
      actions: ["Pin", "Save", "Send to /agents", "Open in new tab"] 
    }
  },

  // ========== ABOUT PAGES ==========
  about: {
    index: {
      title: "People, craft, and sovereign AI.",
      cards: [
        { title: "About Michael", to: "/about/michael", imageId: "about_michael_portrait" },
        { title: "About IntegAI", to: "/about/integai", imageId: "about_integai_main" },
        { title: "The Craftsman's Creed", to: "/poem", imageId: "poem_backdrop" }
      ]
    },
    michael: {
      founderStory: {
        portraitId: "about_michael_portrait",
        backdropId: "about_michael_timeline",
        mdx: [
          "Michael founded HISL to join practical construction wisdom with sovereign AI.",
          "His focus: safer sites, clearer decisions, and measurable sustainability.",
          "HISL's work is anchored in hands‑on craft and accountable engineering."
        ]
      }
    },
    integai: {
      intro: {
        title: "Sovereign, offline‑first orchestration.",
        bullets: [
          "9‑core agent graph for deterministic pipelines.",
          "Local indexes first (Chroma + Neo4j); no public web by default.",
          "Artifact everything: .integpkg with checksums and provenance."
        ],
        imageId: "about_integai_main"
      },
      perfTargets: { 
        ttftTargetMs: 800, 
        p50TokPerS: 40, 
        note: "Fast‑path Gemma via llama.cpp" 
      },
      apiContracts: { 
        endpoints: ["/v1/site/page", "/v1/site/menu", "/v1/site/search", "/v1/site/seo", "/v1/site/forms/{id}"], 
        note: "Immutable v1 contracts." 
      }
    }
  },

  // ========== POEM PAGE ==========
  poem: {
    body: {
      text: "Then prove we now with best endevour, what from our efforts yet may spring; he justly is dispised who never, did thought to aide his labours bring; for this is arts true indication - when skill is minister to thought, when types that are the minds creation - the hand to perfect form has wrought",
      imageId: "poem_backdrop",
      align: "center"
    }
  },

  // ========== AGENTS PAGE ==========
  agents: {
    grid: {
      agents: [
        { name: "EHS Agent", sector: "Construction" },
        { name: "Project PM Agent", sector: "Construction" },
        { name: "BIM/Design Agent", sector: "Construction" },
        { name: "ESG Agent", sector: "Environmental" },
        { name: "Sustainability Metrics Agent", sector: "Environmental" },
        { name: "Heritage Preservation Agent", sector: "Conservation" },
        { name: "Planning Approvals Agent", sector: "Conservation" },
        { name: "CROx", sector: "Pharma" },
        { name: "Procurement Agent", sector: "Public Procurement" },
        { name: "Anti-Corruption Oversight Agent", sector: "Public Procurement" },
        { name: "Crop Monitoring Agent", sector: "Agriculture" },
        { name: "Agri-Supply Agent", sector: "Agriculture" },
        { name: "Market Signals Agent", sector: "Trader/Economics" },
        { name: "Risk & Portfolio Agent", sector: "Trader/Economics" },
        { name: "Clinical Workflow Agent", sector: "Healthcare" },
        { name: "Pet Care Agent", sector: "Healthcare" },
        { name: "Ops Agent", sector: "Insurance" },
        { name: "Fraud Detection Agent", sector: "Insurance" },
        { name: "Wizard Agent", sector: "Custom" },
        { name: "Child Agents", sector: "Custom" }
      ]
    }
  },

  // ========== CROx PAGE ==========
  crox: {
    hero: {
      title: "CROx — Clinical R&D Orchestrator",
      subtitle: "Protocol → Patients → KPIs → Audit",
      cta: "Request demo"
    },
    features: {
      items: [
        "Protocol Copilot (drafts & diffs; amendment risk)",
        "Recruitment & Retention Intelligence",
        "Ops Unifier (10–20 vendor systems → one surface)",
        "Regulatory & CSR Drafting (traceable citations)",
        "Patient Monitoring Hub (wearables/ePRO)",
        "KPI Dashboard (amendment cost, velocity, ROI)"
      ]
    },
    kpis: {
      metrics: ["Amendment rate↓", "Recruitment velocity↑", "Dropout rate↓", "CSR drafting cycle↓", "ROI↑"]
    },
    auditability: {
      bullets: ["Traceable citations", ".integpkg artifacts", "HITL gates via Judge"],
      link: "/about/integai"
    }
  },

  // ========== SECTOR PAGES ==========
  sectors: {
    construction: {
      intro: {
        title: "Construction",
        subtitle: "EHS, PMO, and BIM agents working as one."
      },
      features: {
        features: [
          { title: "EHS Agent", desc: "Site safety & compliance checks, risk triage." },
          { title: "Project PM Agent", desc: "Scheduling, resource planning, delivery rhythm." },
          { title: "BIM/Design Agent", desc: "Drawing QA, cost/scope deltas, handover packs." }
        ]
      }
    },
    environmental: {
      features: {
        features: [
          { title: "ESG Agent", desc: "Emissions tracking & ESG reporting." },
          { title: "Sustainability Metrics Agent", desc: "Lifecycle analysis, biodiversity signals." }
        ]
      }
    },
    conservation: {
      features: {
        features: [
          { title: "Heritage Preservation Agent", desc: "Restoration planning, asset scans." },
          { title: "Planning Approvals Agent", desc: "Permits & SPAB guidance workflows." }
        ]
      }
    },
    procurement: {
      features: {
        features: [
          { title: "Procurement Agent", desc: "Tender drafting, evaluation, compliance guardrails." },
          { title: "Anti‑Corruption Oversight Agent", desc: "Anomaly detection, audit reporting." }
        ]
      }
    },
    agriculture: {
      features: {
        features: [
          { title: "Crop Monitoring Agent", desc: "Soil & irrigation, yield optimization." },
          { title: "Agri‑Supply Agent", desc: "Logistics planning & pricing intelligence." }
        ]
      }
    },
    traderEconomics: {
      features: {
        features: [
          { title: "Market Signals Agent", desc: "Equities/FX/commodities signals aggregation." },
          { title: "Risk & Portfolio Agent", desc: "Portfolio modeling & hedging strategies." }
        ]
      }
    },
    healthcare: {
      features: {
        features: [
          { title: "Clinical Workflow Agent", desc: "Notes summarization & triage workflows." },
          { title: "Pet Care Agent", desc: "Diagnostics & treatment planning aids." }
        ]
      }
    },
    insurance: {
      features: {
        features: [
          { title: "Ops Agent", desc: "Claims processing & policy admin." },
          { title: "Fraud Detection Agent", desc: "Anomaly & fraud detection." }
        ]
      }
    },
    custom: {
      features: {
        features: [
          { title: "Wizard Agent", desc: "Bespoke automation with callbacks." },
          { title: "Child Agents", desc: "Sector‑specific specializations that inherit core DNA." }
        ]
      }
    }
  },

  // ========== FORMS & LEGAL ==========
  contact: {
    form: {
      formId: "contact",
      fields: ["name", "email", "company", "message"],
      submitLabel: "Send",
      idempotent: true
    },
    panel: {
      imageId: "footer_accent",
      text: "We respond quickly. Your details stay private."
    }
  },
  rfp: {
    form: {
      formId: "rfp",
      fields: ["name", "email", "org", "scope", "timeline", "budgetBand"],
      submitLabel: "Submit RFP",
      idempotent: true
    }
  },
  newsletter: {
    form: {
      formId: "newsletter",
      fields: ["email"],
      submitLabel: "Subscribe",
      idempotent: true
    }
  },
  careers: {
    intro: {
      title: "Build sovereign AI with us.",
      subtitle: "We hire for craft, care, and clarity."
    }
  },
  legal: {
    privacy: {
      mdx: [
        "We collect only what we need to respond to you.",
        "Forms are idempotent and stored as normalized records or artifacts.",
        "We do not sell your data. You can request deletion via /contact."
      ]
    },
    terms: {
      mdx: [
        "Use of this site implies agreement to fair and lawful use.",
        "Content is provided as-is; availability may change.",
        "All trademarks are property of their respective owners."
      ]
    }
  },

  // ========== NAVIGATION & FOOTER ==========
  navigation: {
    primary: ["/", "/about", "/sectors", "/agents", "/globe", "/news", "/contact"],
    logo: "footer_logo_hisl"
  },
  footer: {
    logos: ["footer_logo_hisl", "footer_logo_integai"],
    links: {
      primary: ["/about", "/sectors", "/agents", "/globe", "/news", "/contact"],
      legal: ["/legal/privacy", "/legal/terms"]
    },
    accentImageId: "footer_accent"
  }
} as const;

export type LockedContent = typeof LOCKED_CONTENT;
