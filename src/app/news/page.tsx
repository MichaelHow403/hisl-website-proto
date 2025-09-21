import GlobalHeader from "@/components/sections/GlobalHeader";
import GlobalFooter from "@/components/sections/GlobalFooter";

const mockNews = [
  {
    id: 1,
    title: "AI Construction Safety Standards Updated",
    excerpt: "New guidelines for AI-assisted construction monitoring released by industry consortium.",
    source: "Construction Tech Weekly",
    timestamp: "2 hours ago",
    tags: ["AI", "Construction", "Safety"]
  },
  {
    id: 2,
    title: "Pharma AI Compliance Framework Released",
    excerpt: "Regulatory body publishes comprehensive framework for AI use in pharmaceutical development.",
    source: "Pharma Regulatory News",
    timestamp: "4 hours ago",
    tags: ["Pharma", "Compliance", "AI"]
  },
  {
    id: 3,
    title: "Sustainable AI: Energy Efficiency Breakthrough",
    excerpt: "New research shows 40% reduction in AI model energy consumption through novel architecture.",
    source: "Green Tech Journal",
    timestamp: "6 hours ago",
    tags: ["Sustainability", "AI", "Energy"]
  },
  {
    id: 4,
    title: "Data Sovereignty Legislation Advances",
    excerpt: "European Parliament moves forward with enhanced data sovereignty requirements for AI systems.",
    source: "Tech Policy Today",
    timestamp: "8 hours ago",
    tags: ["Policy", "Data Sovereignty", "EU"]
  }
];

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <GlobalHeader />
      
      <div className="py-16">
        <div className="container-wrap">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-spectral font-semibold mb-6">
                Live News & Trends
              </h1>
              <p className="text-xl text-muted mb-8">
                Signals, not noise. A curated window onto trends that matter to builders, clients, and teams.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto">
                <input 
                  type="search"
                  placeholder="Search news and trends..."
                  className="w-full bg-panel border border-edge rounded-xl px-4 py-3 text-text placeholder-muted"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                {["All", "AI", "Construction", "Pharma", "Sustainability", "Policy"].map((filter) => (
                  <button
                    key={filter}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === "All" 
                        ? "bg-aiGreen text-black" 
                        : "bg-panel border border-edge text-muted hover:text-text hover:border-aiGreen/50"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* News Stream */}
            <div className="space-y-6">
              {mockNews.map((article) => (
                <article 
                  key={article.id}
                  className="bg-panel border border-edge rounded-xl p-6 hover:border-aiGreen/50 transition-colors cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-text group-hover:text-aiGreen transition-colors mb-2">
                        {article.title}
                      </h2>
                      <p className="text-muted leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                    <div className="flex items-center gap-4 text-sm text-muted">
                      <span>{article.source}</span>
                      <span>•</span>
                      <span>{article.timestamp}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-edge rounded-md text-xs text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Bar */}
                  <div className="flex gap-2 mt-4 pt-4 border-t border-edge">
                    <button className="text-xs text-muted hover:text-aiGreen transition-colors">
                      Pin
                    </button>
                    <button className="text-xs text-muted hover:text-aiGreen transition-colors">
                      Save
                    </button>
                    <button className="text-xs text-muted hover:text-aiGreen transition-colors">
                      Send to Agents
                    </button>
                    <button className="text-xs text-muted hover:text-aiGreen transition-colors">
                      Open in new tab
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="btn btn-ghost px-8 py-3">
                Load more articles
              </button>
            </div>

            {/* Disclaimer */}
            <div className="mt-12 p-4 bg-edge/30 border border-edge rounded-xl">
              <p className="text-sm text-muted text-center">
                <strong>Note:</strong> Live content is curated but may be unvetted. 
                This feed is powered by your Grok/X pipeline when enabled.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <GlobalFooter />
    </main>
  );
}
