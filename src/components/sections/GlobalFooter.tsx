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
    <footer className="bg-panel border-t border-edge">
      <div className="container-wrap py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-spectral font-bold text-brandGold mb-4 block">
              HISL
            </Link>
            <p className="text-muted text-sm max-w-md">
              Human-first, Sovereign-by-design. AI that amplifies human capability 
              while respecting compliance, sustainability, and transparency.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-4">Navigation</h3>
            <ul className="space-y-2">
              {menu.footer.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-text transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-text transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-edge mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted">
            © HISL 2025 · Human-first, Sovereign-by-design.
          </p>
          
          {socials.length > 0 && (
            <div className="flex space-x-4 mt-4 md:mt-0">
              {socials.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  className="text-sm text-muted hover:text-text transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
