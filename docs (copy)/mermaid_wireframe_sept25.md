1.Sitemap / Information Architecture (IA)
\`\`\`mermaid\
flowchart TD\
%% HISL Sitemap / IA\
%% Rule: All pages fetched via GET /api/v1/site/page?slug
(block-structured)\
%% Contracts: /v1/site/page, /v1/site/menu, /v1/site/search,
/v1/site/seo, /v1/site/forms/\*\
A\[HISL Root \"/\"\] \--\> H\[Home \"/\"\]\
A \--\> AB\[About \"/about\"\]\
AB \--\> ABM\[Founder \"/about/michael\"\]\
AB \--\> ABI\[Platform \"/about/integai\"\]\
AB \--\> ABP\[Poem \"/poem\"\]\
\
A \--\> GL\[Globe Demo \"/globe\"\]\
A \--\> NW\[News & Trends \"/news\"\]\
\
A \--\> AG\[Agents \"/agents\"\]\
AG \--\> AGDIR\[Agents Directory \"/agents\"\]\
A \--\> SE\[Sector Hubs \"/sectors\"\]\
SE \--\> S1\[Construction \"/sectors/construction\"\]\
SE \--\> S2\[Environmental \"/sectors/environmental\"\]\
SE \--\> S3\[Conservation / SPAB \"/sectors/conservation\"\]\
SE \--\> S4\[Pharma --- CROx \"/sectors/pharma-crox\"\]\
SE \--\> S5\[Public Procurement \"/sectors/procurement\"\]\
SE \--\> S6\[Agriculture \"/sectors/agriculture\"\]\
SE \--\> S7\[Trader/Economics \"/sectors/trader-economics\"\]\
SE \--\> S8\[Healthcare / Pet Care \"/sectors/healthcare\"\]\
SE \--\> S9\[Insurance \"/sectors/insurance\"\]\
SE \--\> S10\[Custom Builds \"/sectors/custom\"\]\
\
A \--\> CT\[Contact \"/contact\"\]\
A \--\> RF\[RFP \"/rfp\"\]\
A \--\> NL\[Newsletter \"/newsletter\"\]\
A \--\> CR\[Careers \"/careers\"\]\
\
A \--\> LG\[Legal \"/legal\"\]\
LG \--\> L1\[Privacy \"/legal/privacy\"\]\
LG \--\> L2\[Terms \"/legal/terms\"\]\
\
%% Search entry points\
A \--\> SRCH\[Site Search \"?q=\"\]\
\
%% Global nav/menu payloads\
M\[(GET /v1/site/menu)\] \--\>\|primary\[\], footer\[\]\| H\
M \--\> AB\
M \--\> SE\
M \--\> AG\
M \--\> CT\
\`\`\`
2) Home page (sections with IDs, components, props)
=============================================================
\`\`\`mermaid\
flowchart TB\
subgraph HOME\[Page: \"/\" --- Home\]\
direction TB\
HD\[sectionId: nav\_primary\_v1\
component: GlobalHeader\
props: {logo, menu.primary\[\], ctas\[\]}\]\
\
HR\[sectionId: hero\_cosmic\_v1\
component: HeroCosmic\
props: {title, subtitle, primaryCta, secondaryCta,
backdrop:\"starfield\|webgl\", lqip:true}\]\
\
PB\[sectionId: perf\_badges\_v1\
component: PerfBadges\
props: {ttftTargetMs:800, p50TokPerS:40, mode:\"offline-first\"}\]\
\
APIS\[sectionId: api\_contracts\_v1\
component: ApiContractsStrip\
props:
{endpoints:\[\"/v1/site/page\",\"/v1/site/seo\",\"/v1/site/forms/{id}\"\],
note:\"immutable contracts\"}\]\
\
AMX\[sectionId: agents\_matrix\_v1\
component: AgentsMatrix\
props:
{sectors:\[\"Construction\",\"Environmental\",\"Conservation\",\"Pharma
(CROx)\",\"Procurement\",\"Agriculture\",\"Trader/Economics\",\"Healthcare/Pet\",\"Insurance\",\"Custom\"\],
cta:\"Explore agents\"}\]\
\
GT\[sectionId: globe\_teaser\_v1\
component: FeatureTile\
props: {title:\"Where your prompts go\", link:\"/globe\",
thumb:\"globe.webp\", caption:\"R3F globe + energy badge\"}\]\
\
NT\[sectionId: news\_teaser\_v1\
component: FeatureTile\
props: {title:\"Live News & Trends\", link:\"/news\",
thumb:\"trends.webp\", caption:\"Realtime stream\"}\]\
\
ETH\[sectionId: ethics\_sovereignty\_v1\
component: SplitFeature\
props: {title:\"Sovereign by design\",
bullets:\[\"Offline-first\",\"Agentic graph (9-core)\",\"Immutable
artifacts\"\], link:\"/about/integai\"}\]\
\
CTA\[sectionId: cta\_contact\_v1\
component: BigCTA\
props: {title:\"Build with IntegAI\", primary:\"Talk to us\",
to:\"/contact\"}\]\
\
FT\[sectionId: footer\_v1\
component: GlobalFooter\
props: {menu.footer\[\], socials\[\], legalLinks\[\]}\]\
end\
\
HD \--\> HR \--\> PB \--\> APIS \--\> AMX \--\> GT \--\> NT \--\> ETH
\--\> CTA \--\> FT\
\`\`\`
3) Globe demo page (prompt arcs + energy badge)
===============================================
\`\`\`mermaid\
flowchart TB\
subgraph GLOBE\[Page: \"/globe\" --- Sovereign AI Demo\]\
direction TB\
GHD\[sectionId: nav\_primary\_v1 \| GlobalHeader\]\
GHR\[sectionId: hero\_globe\_v1\
component: HeroGlobe\
props: {title, subtitle, autoplay:true, respectReducedMotion:true}\]\
\
GP\[sectionId: prompt\_console\_v1\
component: PromptConsole\
props: {placeholder:\"Ask anything...\", modelOptions:\[\"Gemma
fast-path\",\"Mistral-7B fallback\"\], maxTokens:1024,
showLatency:true}\]\
\
GA\[sectionId: arcs\_visual\_v1\
component: PromptArcMap\
props: {mode:\"offline-first\", dataCenters:\[\"Lenovo-host\",\"Edge
cache\"\], arcs:\"prompt-\>planner-\>retriever-\>judge-\>executor\",
toggle:\"Where your prompts go\"}\]\
\
GE\[sectionId: energy\_badge\_v1\
component: EnergyBadge\
props: {baseWh:0.3, per100TokWh:0.1, co2FactorKgPerKWh:0.233,
showEstimates:true}\]\
\
GR\[sectionId: result\_panel\_v1\
component: ResultPanel\
props: {diffView:true, provenance:true}\]\
\
GFAQ\[sectionId: demo\_disclaimer\_v1\
component: InlineNote\
props: {text:\"Demo runs locally/offline by default; online adapters
gated by policy.\"}\]\
\
GFT\[sectionId: footer\_v1 \| GlobalFooter\]\
end\
\
GHD \--\> GHR \--\> GP \--\> GA \--\> GE \--\> GR \--\> GFAQ \--\> GFT\
\`\`\`
4) News & Trends page (live feed)
=================================
\`\`\`mermaid\
flowchart TB\
subgraph NEWS\[Page: \"/news\" --- Live Trends Window\]\
direction TB\
NHD\[sectionId: nav\_primary\_v1 \| GlobalHeader\]\
\
NHR\[sectionId: hero\_news\_v1\
component: HeroMinimal\
props: {title:\"Live News & Trends\", subtitle:\"Signal over noise\",
searchbar:true}\]\
\
NSF\[sectionId: stream\_filters\_v1\
component: StreamFilters\
props:
{topics:\[\"AI\",\"Construction\",\"Pharma\",\"Sustainability\"\],
sources:\[\"X/Grok\",\"Docs\"\], autoRefresh:true}\]\
\
NLV\[sectionId: live\_stream\_v1\
component: NewsStream\
props: {provider:\"Grok\", itemsPerPage:20, hydrateOnVisible:true,
disclaimer:\"Live content may be unvetted\"}\]\
\
NANA\[sectionId: annotation\_bar\_v1\
component: AnnotationBar\
props: {actions:\[\"Pin\",\"Save\",\"Send to /agents\",\"Open in new
tab\"\]}\]\
\
NFT\[sectionId: footer\_v1 \| GlobalFooter\]\
end\
\
NHD \--\> NHR \--\> NSF \--\> NLV \--\> NANA \--\> NFT\
\`\`\`
5) About pages & Poem
=====================
\`\`\`mermaid\
flowchart TB\
subgraph ABOUTI\[Page: \"/about/integai\" --- Platform Bio\]\
direction TB\
AIH\[GlobalHeader\]\
AI1\[sectionId: intro\_platform\_v1 \| component: SplitFeature\
props:{title:\"Sovereign, offline-first orchestration\",
bullets:\[\"9-core agent graph\",\"Chroma+Neo4j RAG\",\"Immutable
.integpkg\"\], cta:\"See API contracts\"}\]\
AI2\[sectionId: perf\_targets\_v1 \| component: PerfBadges\
props:{ttftTargetMs:800, p50TokPerS:40}\]\
AI3\[sectionId: api\_contracts\_v1 \| ApiContractsStrip\]\
AIF\[GlobalFooter\]\
end\
\
subgraph ABOUTM\[Page: \"/about/michael\" --- Founder\]\
direction TB\
MH\[GlobalHeader\]\
M1\[sectionId: founder\_story\_v1 \| component: BioLongform\
props:{portrait, mdx:\"/content/about/michael.mdx\"}\]\
MF\[GlobalFooter\]\
end\
\
subgraph POEM\[Page: \"/poem\" --- The Craftsman\'s Creed\]\
direction TB\
PH\[GlobalHeader\]\
P1\[sectionId: poem\_body\_v1 \| component: PoemBlock\
props:{mdx:\"/content/poem.mdx\", typography:\"display\"}\]\
PF\[GlobalFooter\]\
end\
\`\`\`
6) Agents directory + Sector hubs (incl. CROx deep‑dive)
========================================================
\`\`\`mermaid\
flowchart TB\
subgraph AGENTS\[Page: \"/agents\" --- Directory\]\
direction TB\
AH\[GlobalHeader\]\
AX\[sectionId: agents\_grid\_v1\
component: AgentCards\
props:{agents:\[\
{name:\"EHS Agent\", sector:\"Construction\"},\
{name:\"Project PM Agent\", sector:\"Construction\"},\
{name:\"BIM/Design Agent\", sector:\"Construction\"},\
{name:\"ESG Agent\", sector:\"Environmental\"},\
{name:\"Sustainability Metrics Agent\", sector:\"Environmental\"},\
{name:\"Heritage Preservation Agent\", sector:\"Conservation\"},\
{name:\"Planning Approvals Agent\", sector:\"Conservation\"},\
{name:\"CROx\", sector:\"Pharma\"},\
{name:\"Procurement Agent\", sector:\"Public Procurement\"},\
{name:\"Anti-Corruption Oversight Agent\", sector:\"Public
Procurement\"},\
{name:\"Crop Monitoring Agent\", sector:\"Agriculture\"},\
{name:\"Agri-Supply Agent\", sector:\"Agriculture\"},\
{name:\"Market Signals Agent\", sector:\"Trader/Economics\"},\
{name:\"Risk & Portfolio Agent\", sector:\"Trader/Economics\"},\
{name:\"Clinical Workflow Agent\", sector:\"Healthcare\"},\
{name:\"Pet Care Agent\", sector:\"Healthcare\"},\
{name:\"Ops Agent\", sector:\"Insurance\"},\
{name:\"Fraud Detection Agent\", sector:\"Insurance\"},\
{name:\"Wizard Agent\", sector:\"Custom\"},\
{name:\"Child Agents\", sector:\"Custom\"}\]}}\
AF\[GlobalFooter\]\
end\
\
subgraph CROX\[Page: \"/sectors/pharma-crox\" --- CROx Landing\]\
direction TB\
CH\[GlobalHeader\]\
C1\[sectionId: crox\_hero\_v1 \| component: HeroSplit\
props:{title:\"CROx --- Clinical R&D Orchestrator\", subtitle:\"Protocol
→ Patients → KPIs → Audit\", cta:\"Request demo\"}\]\
C2\[sectionId: crox\_features\_v1 \| component: FeatureColumns\
props:{items:\[\"Protocol Copilot\",\"Recruitment & Retention
Intelligence\",\"Ops Unifier\",\"Regulatory & CSR Drafting\",\"Patient
Monitoring Hub\",\"KPI Dashboard\"\]}\]\
C3\[sectionId: crox\_kpis\_v1 \| component: KPIGrid\
props:{metrics:\[\"Amendment rate↓\",\"Recruitment velocity↑\",\"Dropout
rate↓\",\"CSR drafting cycle↓\",\"ROI↑\"\]}\]\
C4\[sectionId: crox\_auditability\_v1 \| component: ProofBlocks\
props:{bullets:\[\"Traceable citations\",\".integpkg artifacts\",\"HITL
gates via Judge\"\], link:\"/about/integai\"}\]\
CF\[GlobalFooter\]\
end\
\`\`\`
7) Forms & outcomes (Contact, RFP, Newsletter, Careers)
=======================================================
\`\`\`mermaid\
flowchart TB\
subgraph FORMS\[Forms & Confirmation Pages\]\
direction TB\
FC\[Page: \"/contact\"\]\
FR\[Page: \"/rfp\"\]\
FN\[Page: \"/newsletter\"\]\
FY\[Page: \"/careers\"\]\
\
FC \--\>\|POST /v1/site/forms/contact\| COK\[Contact → ok screen
\"/contact/sent\"\]\
FR \--\>\|POST /v1/site/forms/rfp\| ROK\[RFP → ok screen
\"/rfp/sent\"\]\
FN \--\>\|POST /v1/site/forms/newsletter\| NOK\[Newsletter → ok
\"/newsletter/sent\"\]\
FY \--\>\|POST /v1/site/forms/careers\| YOK\[Careers → ok
\"/careers/sent\"\]\
\
note1{{All POSTs require Idempotency-Key; return
{ok,idempotencyKey,triage,route}}}\
end\
\`\`\`
8) Data & API contracts (ER diagram for /v1 payloads)
=====================================================
\`\`\`mermaid\
erDiagram\
PAGE \|\|\--o{ SECTION : \"sections\[\]\"\
PAGE {\
string slug PK\
string title\
json hero\
json metadata\
string lastUpdated\
}\
SECTION {\
string id PK \"sectionId (e.g., hero\_cosmic\_v1)\"\
string component \"rendering component\"\
json props \"typed by component\"\
int order\
}\
\
MENU {\
string id PK\
json primary\[\]\
json footer\[\]\
}\
\
SEO {\
string slug PK\
string title\
string description\
json keywords\[\]\
json og\
json schemaOrg\
json redirects\[\] \"canonical + 301 map\"\
}\
\
SEARCH\_RESULT {\
string type \"page\|doc\|asset\"\
string title\
string url\
string excerpt\
float score\
}\
\
FORM\_SUBMISSION {\
string id PK\
string formId \"contact\|rfp\|newsletter\|careers\"\
json payload\
string idempotencyKey\
json triage \"{tag,severity}\"\
json route \"{owner,channel}\"\
datetime createdAt\
}\
\
PAGE \|\|\--\|\| SEO : \"seo for slug\"\
MENU \|\|\--o{ PAGE : \"drives primary/footer nav\"\
\`\`\`
9) End‑to‑end request flow (sequence)
=====================================
\`\`\`mermaid\
sequenceDiagram\
participant U as Browser (HISL)\
participant W as Website /app (Next.js 15.5)\
participant N as NGINX /api proxy\
participant G as IntegAI Gateway\
participant C as Cache (L1/L2)\
participant R as RAG (Chroma+Neo4j)\
participant L as LLM (Gemma→Mistral)\
participant P as Publisher (.integpkg/MinIO)\
\
U-\>\>W: GET / (navigate)\
W-\>\>N: GET /api/v1/site/page?slug=home\
N-\>\>G: proxy\
G-\>\>C: check L1/L2 cache\
alt cache hit\
C\--\>\>G: page JSON\
else miss\
G-\>\>R: assemble sections via local RAG\
G-\>\>L: generate blocks (if needed, fast-path Gemma)\
L\--\>\>G: draft blocks\
G\--\>\>C: write cache\
end\
G\--\>\>W: {title, sections\[\], metadata, lastUpdated}\
\
Note over W: Render by component mapping; hydrate only necessary
islands.\
\
U-\>\>W: POST /contact (Idempotency-Key)\
W-\>\>N: POST /api/v1/site/forms/contact\
N-\>\>G: proxy\
G-\>\>P: persist normalized JSON (.integpkg or DB)\
G\--\>\>W: {ok, idempotencyKey, triage, route}\
\`\`\`
10) Implementation tips (quick wins)
====================================
- Section registry: enforce component + required props at build time;
reject unknown fields to prevent drift after lock.
- Cache warmer: nightly prebuild top slugs; hydrate hero pages' RAG
contexts to avoid first‑hit slowness.
- Motion perf: lazy‑init WebGL after LCP; respect
prefers-reduced-motion; throttle when tab hidden.
- CROx content: keep KPI blocks data‑bound so real trial metrics can
drop in later with traceable citations/artifacts.