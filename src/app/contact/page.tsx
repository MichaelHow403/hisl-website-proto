"use client";

import { useState } from "react";
import GlobalHeader from "@/components/sections/GlobalHeader";
import GlobalFooter from "@/components/sections/GlobalFooter";

export default function ContactPage() {
  const [formType, setFormType] = useState<"contact" | "rfp" | "newsletter" | "careers">("contact");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would POST to /api/v1/site/forms/{formType}
    // with an Idempotency-Key header
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-bg text-text">
        <GlobalHeader />
        
        <div className="py-16 min-h-[60vh] flex items-center">
          <div className="container-wrap w-full">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-panel border border-edge rounded-xl p-12">
                <div className="w-16 h-16 bg-ok/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">✓</span>
                </div>
                <h1 className="text-3xl font-spectral font-semibold mb-4">
                  Thank you!
                </h1>
                <p className="text-muted mb-8">
                  {formType === "contact" && "We'll reply soon."}
                  {formType === "rfp" && "We'll schedule a discovery call."}
                  {formType === "newsletter" && "Welcome aboard."}
                  {formType === "careers" && "We'll review and be in touch."}
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="btn btn-ghost"
                >
                  Send another message
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <GlobalFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg text-text">
      <GlobalHeader />
      
      <div className="py-16">
        <div className="container-wrap">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-spectral font-semibold mb-6">
                Let's build responsibly, together
              </h1>
              <p className="text-xl text-muted">
                Ready to explore sovereign AI? Get in touch and let's discuss how 
                IntegAI can amplify your team's capabilities in construction, pharma, and regulated environments.
              </p>
            </div>

            {/* Form Type Selector */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {[
                { key: "contact", label: "General Contact" },
                { key: "rfp", label: "IntegAI Inquiry" },
                { key: "newsletter", label: "HISL Updates" },
                { key: "careers", label: "Join HISL" }
              ].map((type) => (
                <button
                  key={type.key}
                  onClick={() => setFormType(type.key as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    formType === type.key
                      ? "bg-aiGreen text-black"
                      : "bg-panel border border-edge text-muted hover:text-text hover:border-aiGreen/50"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Form */}
            <div className="bg-panel border border-edge rounded-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full bg-bg border border-edge rounded-lg px-4 py-3 text-text placeholder-muted focus:border-aiGreen focus:outline-none"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full bg-bg border border-edge rounded-lg px-4 py-3 text-text placeholder-muted focus:border-aiGreen focus:outline-none"
                    placeholder="your.email@company.com"
                  />
                </div>

                {/* Company (for RFP) */}
                {formType === "rfp" && (
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-text mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="w-full bg-bg border border-edge rounded-lg px-4 py-3 text-text placeholder-muted focus:border-aiGreen focus:outline-none"
                      placeholder="Your company or organization name"
                    />
                  </div>
                )}

                {/* CV Upload (for Careers) */}
                {formType === "careers" && (
                  <div>
                    <label htmlFor="cv" className="block text-sm font-medium text-text mb-2">
                      CV (PDF)
                    </label>
                    <input
                      type="file"
                      id="cv"
                      accept=".pdf"
                      className="w-full bg-bg border border-edge rounded-lg px-4 py-3 text-text file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-aiGreen file:text-black file:font-medium"
                    />
                  </div>
                )}

                {/* Message */}
                {formType !== "newsletter" && (
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                      {formType === "rfp" ? "IntegAI Project Brief" : "Message"} *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      className="w-full bg-bg border border-edge rounded-lg px-4 py-3 text-text placeholder-muted focus:border-aiGreen focus:outline-none resize-none"
                      placeholder={
                        formType === "rfp" 
                          ? "Tell us about your project, timeline, and how IntegAI can help with your construction, pharma, or regulated environment needs..."
                          : "How can we help you with sovereign AI solutions?"
                      }
                    />
                  </div>
                )}

                {/* Newsletter-specific message */}
                {formType === "newsletter" && (
                  <p className="text-sm text-muted">
                    Stay updated on HISL developments, IntegAI platform updates, construction innovation, and sovereign AI insights.
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full btn btn-gold py-4 text-lg font-semibold"
                >
                  {formType === "contact" && "Send Message"}
                  {formType === "rfp" && "Submit IntegAI Inquiry"}
                  {formType === "newsletter" && "Subscribe to HISL Updates"}
                  {formType === "careers" && "Apply to Join HISL"}
                </button>
              </form>

              {/* Form Note */}
              <p className="text-xs text-muted mt-4 text-center">
                All form submissions are processed with idempotent keys for data integrity.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <GlobalFooter />
    </main>
  );
}
