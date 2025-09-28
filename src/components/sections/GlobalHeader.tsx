"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type MenuItem = {
  label: string;
  href: string;
  children?: MenuItem[];
};

// Curated top-level routes that should NOT appear in docs dropdown
const curatedRoutes = new Set([
  '/',
  '/about',
  '/agents', 
  '/sectors',
  '/docs',
  '/globe',
  '/news',
  '/contact',
  '/demo'
]);

// Docs markdown files with clean names for display
// Exclude any files that conflict with curated routes
const docsFiles = [
  { label: "Master Text", href: "/master_text" },
  { label: "Full Style Guide", href: "/full_style_guide_sept25_1" },
  { label: "HISL Poem Lock Docs", href: "/HISL_Poem_Lock_docs_sept25" },
  { label: "IntegAI Update", href: "/IntegAI_sept_update" },
  { label: "Imagery Spec & Gallery", href: "/IntegAI-HISL_Website-Imagery-Spec_and_Gallery_v1_0_2025-09-20" },
  { label: "Build Specs & Templates", href: "/IntegAI_HISL_Website-Build_Specs-_-Templates_v1_0_2025-09-20_1" },
  { label: "Mermaid Style Guide", href: "/mermaid_style_guide_sept25" },
  { label: "Mermaid Wireframe", href: "/mermaid_wireframe_sept25" },
  { label: "Mermaid Wireframe (Alt)", href: "/mermaid_wireframe" },
  { label: "Publishing Guide", href: "/publishing_sept25" },
  { label: "Publishing (Alt)", href: "/publishing" },
  { label: "README", href: "/README_sept25" },
  { label: "Storage Solutions", href: "/Storage_solutions_sept25" },
  { label: "Website Guide", href: "/website_sept25" },
  { label: "Workflow Guide", href: "/workflow_sept25" }
].filter(item => !curatedRoutes.has(item.href));

// Helper function to create stable, unique keys
function createStableKey(href: string, index: number): string {
  return `${href}-${index}`;
}

type Props = {
  logo?: string;
  menu?: {
    primary: MenuItem[];
  };
  ctas?: {
    label: string;
    href: string;
    variant: "primary" | "secondary";
  }[];
};

export default function GlobalHeader({ 
  logo = "HISL",
  menu = {
    primary: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Agents", href: "/agents" },
      { label: "Sectors", href: "/sectors" },
      { 
        label: "Docs", 
        href: "/docs",
        children: docsFiles
      },
      { label: "Globe", href: "/globe" },
      { label: "News", href: "/news" },
      { label: "Contact", href: "/contact" }
    ]
  },
  ctas = [
    { label: "Start Demo", href: "/demo", variant: "primary" as const }
  ]
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50">
      <div className="container-wrap">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold gradient-text">
            {logo}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menu.primary.map((item, index) => (
              <div
                key={createStableKey(item.href, index)}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.href)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center py-2 px-3 rounded-lg hover:bg-gray-800"
                >
                  {item.label}
                  {item.children && (
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                
                {/* Dropdown Menu */}
                {item.children && activeDropdown === item.href && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-50"
                  >
                    <div className="py-2 max-h-96 overflow-y-auto">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={createStableKey(child.href, childIndex)}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-amber-900/20 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            {ctas.map((cta, index) => (
              <Link
                key={createStableKey(cta.href, index)}
                href={cta.href}
                className={`btn ${cta.variant === "primary" ? "btn-gold" : "btn-ghost"} px-6 py-2`}
              >
                {cta.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <motion.div
                className="w-full h-0.5 bg-text"
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
              />
              <motion.div
                className="w-full h-0.5 bg-text"
                animate={{ opacity: isOpen ? 0 : 1 }}
              />
              <motion.div
                className="w-full h-0.5 bg-text"
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="lg:hidden overflow-hidden"
          initial={false}
          animate={{ height: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="py-4 space-y-4">
            {menu.primary.map((item, index) => (
              <div key={createStableKey(item.href, index)}>
                <Link
                  href={item.href}
                  className="block text-sm font-medium text-muted hover:text-text transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
                
                {/* Mobile Dropdown */}
                {item.children && (
                  <div className="ml-4 mt-2 space-y-2">
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={createStableKey(child.href, childIndex)}
                        href={child.href}
                        className="block text-xs text-muted/80 hover:text-text transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 space-y-2">
              {ctas.map((cta, index) => (
                <Link
                  key={createStableKey(cta.href, index)}
                  href={cta.href}
                  className={`btn ${cta.variant === "primary" ? "btn-gold" : "btn-ghost"} w-full justify-center`}
                  onClick={() => setIsOpen(false)}
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          </nav>
        </motion.div>
      </div>
    </header>
  );
}
