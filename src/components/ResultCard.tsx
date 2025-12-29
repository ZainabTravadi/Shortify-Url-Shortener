import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Copy, Check, ExternalLink, QrCode } from 'lucide-react';
import { NeuButton } from './NeuButton';

interface ResultCardProps {
  shortUrl: string;
  className?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ shortUrl, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpen = () => {
    window.open(shortUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={cn(
        "mt-8 p-5 rounded-2xl bg-background",
        "shadow-neu animate-fade-in",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wider">
            Your shortened URL
          </p>
          <p className="font-mono text-base text-foreground truncate select-all">
            {shortUrl}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <NeuButton
            variant="icon"
            onClick={handleCopy}
            title={copied ? "Copied!" : "Copy to clipboard"}
            className={cn(
              "transition-colors",
              copied && "text-success"
            )}
          >
            {copied ? (
              <Check className="w-5 h-5" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </NeuButton>
          
          <NeuButton
            variant="icon"
            onClick={handleOpen}
            title="Open in new tab"
          >
            <ExternalLink className="w-5 h-5" />
          </NeuButton>
          
          <NeuButton
            variant="icon"
            title="Generate QR Code"
          >
            <QrCode className="w-5 h-5" />
          </NeuButton>
        </div>
      </div>

      {copied && (
        <div className="mt-3 text-center">
          <span className="text-xs font-medium text-success animate-fade-in">
            ✓ Copied to clipboard!
          </span>
        </div>
      )}
    </div>
  );
};

export { ResultCard };
