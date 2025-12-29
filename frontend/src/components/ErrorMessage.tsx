import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => {
  return (
    <div
      className={cn(
        "mt-4 p-3 rounded-xl",
        "bg-destructive/10 shadow-glow-error",
        "flex items-center gap-2",
        "animate-fade-in",
        className
      )}
    >
      <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
      <p className="text-sm text-destructive font-medium">
        {message}
      </p>
    </div>
  );
};

export { ErrorMessage };
