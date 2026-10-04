/**
 * Shadcn UI — Button Component
 * Base button primitive with variant support via class-variance-authority.
 */
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-primary text-white shadow-btn-primary hover:-translate-y-0.5 hover:shadow-lg',
        secondary:
          'border-2 border-primary text-primary bg-transparent hover:bg-primary/5',
        ghost: 'text-text-secondary hover:bg-surface-subtle hover:text-text-primary',
        destructive:
          'bg-error text-white shadow-btn-destructive hover:-translate-y-0.5 hover:shadow-lg',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-lg',
        md: 'h-11 px-7 text-[15px] rounded-xl',
        lg: 'h-13 px-8 text-base rounded-xl',
        icon: 'h-10 w-10 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
