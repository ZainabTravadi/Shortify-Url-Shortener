import React, { useState, FormEvent } from 'react';
import { NeuCard } from '@/components/NeuCard';
import { NeuInput } from '@/components/NeuInput';
import { NeuButton } from '@/components/NeuButton';
import { ResultCard } from '@/components/ResultCard';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Link2, Github, Briefcase } from 'lucide-react';

const Index = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isValidUrl = (urlString: string): boolean => {
    try {
      const url = new URL(urlString);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    setIsLoading(true);

    // Simulate API call - replace with actual FastAPI backend call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock shortened URL for demo
      const mockShortCode = Math.random().toString(36).substring(2, 8);
      setShortUrl(`https://short.ly/${mockShortCode}`);
    } catch {
      setError('Failed to shorten URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <main className="w-full max-w-[480px]">
        <NeuCard>
          {/* Header */}
          <header className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-neu mb-4">
              <Link2 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-[28px] font-bold text-foreground tracking-tight">
              Shortify
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Fast, reliable URL shortener
            </p>
          </header>

          {/* URL Input Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <NeuInput
                type="text"
                placeholder="Paste your long URL here…"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (error) setError('');
                }}
                error={!!error}
                aria-label="URL input"
                aria-describedby={error ? "url-error" : undefined}
              />
            </div>

            <NeuButton
              type="submit"
              variant="primary"
              isLoading={isLoading}
            >
              Shorten URL
            </NeuButton>
          </form>

          {/* Error State */}
          {error && (
            <ErrorMessage message={error} />
          )}

          {/* Result Section */}
          {shortUrl && !error && (
            <ResultCard shortUrl={shortUrl} />
          )}
        </NeuCard>

        {/* Footer */}
        <footer className="mt-10 text-center">
          <p className="text-xs text-muted-foreground/60 mb-4">
            Built with FastAPI, PostgreSQL & Redis
          </p>
          
          <div className="flex items-center justify-center gap-3">
            <NeuButton
              variant="icon"
              onClick={() => window.open('https://github.com', '_blank')}
              title="GitHub"
              className="w-10 h-10"
            >
              <Github className="w-4 h-4" />
            </NeuButton>
            
            <NeuButton
              variant="icon"
              onClick={() => window.open('#', '_blank')}
              title="Portfolio"
              className="w-10 h-10"
            >
              <Briefcase className="w-4 h-4" />
            </NeuButton>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
