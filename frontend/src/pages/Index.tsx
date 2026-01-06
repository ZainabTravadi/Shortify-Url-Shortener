import React, { useState } from 'react';
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
      const parsed = new URL(urlString);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleShorten = async () => {
    console.log('API BASE:', import.meta.env.VITE_API_BASE_URL);

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

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/shorten`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ longUrl: url })
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Failed to shorten URL');
      }

      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (err: any) {
      console.error('SHORTEN ERROR:', err);
      setError(err.message || 'Failed to shorten URL. Please try again.');
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

          {/* Input */}
          <div className="space-y-5">
            <NeuInput
              type="text"
              placeholder="Paste your long URL here…"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError('');
              }}
              error={!!error}
            />

            <NeuButton
              variant="primary"
              isLoading={isLoading}
              onClick={handleShorten}
            >
              Shorten URL
            </NeuButton>
          </div>

          {/* Error */}
          {error && <ErrorMessage message={error} />}

          {/* Result */}
          {shortUrl && !error && <ResultCard shortUrl={shortUrl} />}
        </NeuCard>

        {/* Footer */}
        <footer className="mt-10 text-center">
          <p className="text-xs text-muted-foreground/60 mb-4">
            Built with Node.js, Express & MongoDB
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
