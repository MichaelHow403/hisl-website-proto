"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type MenuItem = {
  label: string;
  href: string;
  children?: MenuItem[];
};

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

  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-edge">
      <div className="container-wrap">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-spectral font-bold text-brandGold">
            {logo}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menu.primary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted hover:text-text transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            {ctas.map((cta) => (
              <Link
                key={cta.href}
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
            {menu.primary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm font-medium text-muted hover:text-text transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              {ctas.map((cta) => (
                <Link
                  key={cta.href}
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
