"use client";

import { useState } from 'react';
import GlobalHeader from '@/components/sections/GlobalHeader';
import GlobalFooter from '@/components/sections/GlobalFooter';
import { getImage } from '@/app/lib/imagery';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="min-h-screen bg-bg">
      <GlobalHeader />
      
      {/* Hero Section with Background */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src={getImage('friendship_contact')} 
            alt="Human-AI collaboration" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-bg/80 via-bg/60 to-bg/80"></div>
        
        <div className="container-wrap relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 rounded-full border border-brandGold/30 bg-brandGold/10 backdrop-blur-sm mb-6">
              <span className="text-sm text-brandGold font-medium">Get in Touch</span>
            </div>
            <h1 className="text-[clamp(32px,4.5vw,48px)] font-semibold mb-6">
              Let's Build the Future Together
            </h1>
            <p className="text-[17px] text-muted max-w-2xl mx-auto mb-8">
              Ready to deploy sovereign AI in your operations? Let's discuss how HISL can transform your industry with human-AI collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 md:py-28 relative">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <img 
            src={getImage('ai_brain_contact')} 
            alt="AI Brain Network" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container-wrap relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-text mb-4">Ready to Start?</h2>
                  <p className="text-muted leading-relaxed mb-6">
                    Whether you're in construction, pharma, or any regulated industry, we're here to help you implement sovereign AI solutions that work for your specific needs.
                  </p>
                </div>

                {/* Direct Contact */}
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl border border-edge bg-panel/60">
                    <h3 className="text-lg font-semibold text-brandGold mb-3">Direct Contact</h3>
                    <a 
                      href="mailto:michael.howard@hisl.ie" 
                      className="text-aiGreen hover:text-aiGreen/80 transition-colors text-lg font-medium"
                    >
                      michael.howard@hisl.ie
                    </a>
                    <p className="text-sm text-muted mt-2">
                      Michael Howard MCIOB, Founder & CEO
                    </p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-text">Connect & Follow</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="https://ie.linkedin.com/in/michaelhowardconstruction" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 px-6 py-3 rounded-xl border border-edge bg-panel/60 hover:border-[#0077B5] hover:bg-[#0077B5]/10 transition-all"
                    >
                      <svg className="w-5 h-5 fill-current text-muted group-hover:text-[#0077B5] transition-colors" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                      </svg>
                      <span className="font-medium text-text group-hover:text-[#0077B5] transition-colors">LinkedIn</span>
                    </a>
                    
                    <a 
                      href="https://substack.com/@michaelhowardmciob" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 px-6 py-3 rounded-xl border border-edge bg-panel/60 hover:border-[#FF6719] hover:bg-[#FF6719]/10 transition-all"
                    >
                      <svg className="w-5 h-5 fill-current text-muted group-hover:text-[#FF6719] transition-colors" viewBox="0 0 24 24">
                        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"></path>
                      </svg>
                      <span className="font-medium text-text group-hover:text-[#FF6719] transition-colors">Substack</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-panel/60 rounded-2xl border border-edge p-8">
                <h2 className="text-2xl font-semibold text-text mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-edge bg-panel/40 text-text placeholder-muted focus:border-aiGreen focus:ring-2 focus:ring-aiGreen/20 transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-edge bg-panel/40 text-text placeholder-muted focus:border-aiGreen focus:ring-2 focus:ring-aiGreen/20 transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-text mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-edge bg-panel/40 text-text placeholder-muted focus:border-aiGreen focus:ring-2 focus:ring-aiGreen/20 transition-all"
                      placeholder="Your company"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-edge bg-panel/40 text-text placeholder-muted focus:border-aiGreen focus:ring-2 focus:ring-aiGreen/20 transition-all resize-none"
                      placeholder="Tell us about your project or how we can help..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full btn btn-gold py-3 text-base font-semibold"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Hard Hat Image */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-15">
          <img 
            src={getImage('hard_hat_contact')} 
            alt="Digital construction work" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/60"></div>
        
        <div className="container-wrap relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold mb-6">
              Ready to Transform Your Industry?
            </h2>
            <p className="text-[17px] text-muted mb-8">
              Join the sovereign AI revolution. Let's build solutions that work for your specific needs, 
              with full control and compliance built-in.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:michael.howard@hisl.ie" className="btn btn-gold">
                📧 Email Michael
              </a>
              <a href="/agents" className="btn btn-ghost">
                Explore Agents
              </a>
              <a href="/sectors" className="btn btn-ghost">
                View Sectors
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <GlobalFooter />
    </main>
  );
}
