import React from 'react';
import { cn } from '@/lib/utils';

interface NeuCardProps {
  children: React.ReactNode;
  className?: string;
}

const NeuCard: React.FC<NeuCardProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "bg-card rounded-3xl p-8",
        "shadow-neu",
        className
      )}
    >
      {children}
    </div>
  );
};

export { NeuCard };
