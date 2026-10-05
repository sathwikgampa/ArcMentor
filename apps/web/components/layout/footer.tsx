import React from 'react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-slate-950/80 py-6 px-4 sm:px-6 lg:px-8 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright Year */}
        <p className="text-xs text-slate-500">
          © {currentYear} ArcMentor. All rights reserved.
        </p>

        {/* Grayed-out links */}
        <div className="flex items-center gap-6 text-xs text-slate-400">
          <Link
            href="/terms"
            className="hover:text-slate-200 transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="hover:text-slate-200 transition-colors"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
