"use client";

import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
};

type Props = {
  menu?: {
    footer: FooterLink[];
  };
  socials?: FooterLink[];
  legalLinks?: FooterLink[];
};

export default function GlobalFooter({
  menu = {
    footer: [
      { label: "About", href: "/about" },
      { label: "Agents", href: "/agents" },
      { label: "Sectors", href: "/sectors" },
      { label: "Globe", href: "/globe" },
      { label: "News", href: "/news" },
      { label: "Contact", href: "/contact" }
    ]
  },
  socials = [],
  legalLinks = [
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" }
  ]
}: Props) {
  return (
    <footer className="relative py-12 border-t border-edge bg-panel/20">
      <div className="container-wrap">
        <div className="max-w-6xl mx-auto">
          {/* Top section - Logo + Links */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Logo */}
            <div>
              <Link href="/" className="text-2xl font-spectral font-bold text-brandGold mb-4 block">
                HISL
              </Link>
              <p className="text-sm text-muted">
                Industrial Safety Intelligence
              </p>
            </div>
            
            {/* Navigation links */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-text mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-muted hover:text-aiGreen transition-colors">About</Link></li>
                <li><Link href="/sectors" className="text-muted hover:text-aiGreen transition-colors">Sectors</Link></li>
                <li><Link href="/agents" className="text-muted hover:text-aiGreen transition-colors">Agents</Link></li>
                <li><Link href="/globe" className="text-muted hover:text-aiGreen transition-colors">Globe</Link></li>
                <li><Link href="/contact" className="text-muted hover:text-aiGreen transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-text mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/legal/privacy" className="text-muted hover:text-aiGreen transition-colors">Privacy</Link></li>
                <li><Link href="/legal/terms" className="text-muted hover:text-aiGreen transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom section - Social + Copyright */}
          <div className="pt-8 border-t border-edge/50 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted">Connect:</span>
              
              <a 
                href="https://ie.linkedin.com/in/michaelhowardconstruction"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-edge bg-panel/60 hover:border-[#0077B5] transition-colors"
                aria-label="LinkedIn - Michael Howard MCIOB"
              >
                <svg className="w-5 h-5 fill-current text-muted group-hover:text-[#0077B5] transition-colors" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-sm font-medium text-muted group-hover:text-[#0077B5] transition-colors">
                  LinkedIn
                </span>
              </a>
              
              <a 
                href="https://substack.com/@michaelhowardmciob"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-edge bg-panel/60 hover:border-[#FF6719] transition-colors"
                aria-label="Substack - Michael Howard MCIOB"
              >
                <svg className="w-5 h-5 fill-current text-muted group-hover:text-[#FF6719] transition-colors" viewBox="0 0 24 24">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                </svg>
                <span className="text-sm font-medium text-muted group-hover:text-[#FF6719] transition-colors">
                  Substack
                </span>
              </a>
            </div>
            
            {/* Copyright */}
            <div className="text-sm text-muted">
              © {new Date().getFullYear()} HISL. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
