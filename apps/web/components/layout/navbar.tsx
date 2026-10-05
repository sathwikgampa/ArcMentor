'use client';

import React from 'react';
import Link from 'next/link';
import { CreditBadge } from '@/components/shared/credit-badge';
import { UserAvatar } from '@/components/shared/user-avatar';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel !rounded-none !border-x-0 !border-t-0 border-b border-white/10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Text Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-white hover:text-slate-200 transition-colors flex items-center gap-2"
          >
            <span className="text-[#5856D6] font-extrabold text-2xl">⚡</span>
            <span>ArcMentor</span>
          </Link>
        </div>

        {/* Right: Credit Badge & User Avatar side-by-side */}
        <div className="flex items-center gap-3 sm:gap-4">
          <CreditBadge />
          <UserAvatar fallback="DM" size="sm" />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
