import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Copy, Check, ExternalLink, QrCode, Download } from 'lucide-react';
import { NeuButton } from './NeuButton';
import { QRCodeCanvas } from 'qrcode.react';

interface ResultCardProps {
  shortUrl: string;
  className?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ shortUrl, className }) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpen = () => {
    window.open(shortUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadQR = () => {
    const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');

    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = 'short-url-qr.png';
    link.click();
  };

  return (
    <div
      className={cn(
        'mt-8 p-5 rounded-2xl bg-background',
        'shadow-neu animate-fade-in',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
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
            title={copied ? 'Copied!' : 'Copy to clipboard'}
            className={cn(copied && 'text-success')}
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
            onClick={() => setShowQR((prev) => !prev)}
            title="Show QR Code"
          >
            <QrCode className="w-5 h-5" />
          </NeuButton>
        </div>
      </div>

      {/* Copy feedback */}
      {copied && (
        <div className="mt-3 text-center">
          <span className="text-xs font-medium text-success animate-fade-in">
            ✓ Copied to clipboard!
          </span>
        </div>
      )}

      {/* QR Section */}
      {showQR && (
        <div className="mt-6 flex flex-col items-center gap-4 animate-fade-in">
          <div className="p-4 rounded-xl bg-background shadow-neu-sm">
            <QRCodeCanvas
  id="qr-canvas"
  value={shortUrl}
  size={160}
  marginSize={4}
/>

          </div>

          <NeuButton
            variant="secondary"
            onClick={handleDownloadQR}
          >
            <Download className="w-4 h-4" />
            Download QR
          </NeuButton>
        </div>
      )}
    </div>
  );
};

export { ResultCard };
