/**
 * Badge Component
 * Rounded status pills with semantic color variants.
 */
import { type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-pill px-3 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-surface-subtle text-text-secondary',
        success: 'bg-success-light text-success-dark',
        warning: 'bg-warning-light text-warning-dark',
        error: 'bg-error-light text-error-dark',
        info: 'bg-info-light text-info-dark',
        credit: 'bg-gradient-primary text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
