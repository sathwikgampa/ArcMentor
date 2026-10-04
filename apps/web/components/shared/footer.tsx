/**
 * Footer Component
 * Site footer with navigation columns, social links, and copyright.
 */
import Link from 'next/link';

const footerLinks = {
  Product: [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Documentation', href: '/docs' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
  ],
  Legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-surface-dark text-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <span className="text-xl font-bold text-gradient">ArcMentor</span>
          <p className="mt-3 text-sm text-white/50 leading-relaxed">
            Peer-to-peer mock interview platform for technical candidates.
          </p>
        </div>
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <h4 className="text-sm font-semibold text-white/80 mb-4">{category}</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10 text-center">
        <p className="text-sm text-white/40">
          © {new Date().getFullYear()} ArcMentor. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
