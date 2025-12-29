import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface NeuInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const NeuInput = forwardRef<HTMLInputElement, NeuInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full h-14 px-5 rounded-2xl bg-background",
          "shadow-neu-inset border-none outline-none",
          "text-foreground placeholder:text-muted-foreground",
          "transition-all duration-200",
          "focus:shadow-glow-primary focus:ring-2 focus:ring-primary/20",
          error && "shadow-glow-error ring-2 ring-destructive/30",
          className
        )}
        {...props}
      />
    );
  }
);

NeuInput.displayName = 'NeuInput';

export { NeuInput };
