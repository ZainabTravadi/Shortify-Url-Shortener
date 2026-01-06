import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface NeuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  isLoading?: boolean;
  children: React.ReactNode;
}

const NeuButton = forwardRef<HTMLButtonElement, NeuButtonProps>(
  (
    {
      className,
      variant = 'primary',
      isLoading = false,
      disabled,
      type = 'button', // 🔥 DEFAULT TYPE (VERY IMPORTANT)
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: cn(
        'w-full h-[52px] rounded-[26px]',
        'bg-primary text-primary-foreground',
        'font-semibold text-base tracking-wide',
        'shadow-neu',
        'hover:-translate-y-0.5 hover:shadow-lg',
        'active:translate-y-0 active:shadow-neu-pressed',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0'
      ),
      secondary: cn(
        'px-6 h-11 rounded-xl',
        'bg-background text-foreground',
        'font-medium text-sm',
        'shadow-neu-sm',
        'hover:-translate-y-0.5',
        'active:shadow-neu-pressed'
      ),
      icon: cn(
        'w-11 h-11 rounded-full',
        'bg-background text-muted-foreground',
        'shadow-neu-sm',
        'hover:text-primary hover:-translate-y-0.5',
        'active:shadow-neu-pressed'
      ),
    };

    return (
      <button
        ref={ref}
        type={type} // 🔥 NOW FORM-SAFE
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'transition-all duration-200 ease-out',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
          variants[variant],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Shortening...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

NeuButton.displayName = 'NeuButton';

export { NeuButton };
