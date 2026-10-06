'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface CreditBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  credits?: number | string;
}

export function CreditBadge({ className, ...props }: CreditBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#5856D6] shadow-[0_0_12px_rgba(88,86,214,0.45)] border border-[#5856D6]/40 select-none transition-all duration-200 hover:shadow-[0_0_18px_rgba(88,86,214,0.65)] hover:scale-105',
        className
      )}
      {...props}
    >
      <span aria-hidden="true" className="text-amber-300 text-xs">⚡</span>
      <span className="tracking-wide">5</span>
    </div>
  );
}

export default CreditBadge;
