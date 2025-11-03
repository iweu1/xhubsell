'use client';

import { useState, useEffect, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface Announcement {
  id: string;
  text: string;
  link?: string;
  priority: 'low' | 'medium' | 'high';
  isActive: boolean;
}

interface TickerProps {
  className?: string;
}

export function Ticker({ className }: TickerProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip API calls during build time
    if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
      setIsLoading(false);
      return;
    }

    const fetchAnnouncements = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

        // Skip fetch if API URL is not available (build time)
        if (!apiUrl || (apiUrl === 'http://localhost:3001' && typeof window === 'undefined')) {
          setIsLoading(false);
          return;
        }

        const response = await fetch(`${apiUrl}/announcements?active=true`);
        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data);
        }
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setIsPaused((prev) => !prev);
    }
  };

  if (isLoading) {
    return (
      <div className={cn('w-full bg-accent py-2', className)}>
        <div className="container">
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
      </div>
    );
  }

  if (announcements.length === 0) {
    return null;
  }

  return (
    <div
      className={cn('w-full bg-accent py-2 overflow-hidden', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        <div
          ref={tickerRef}
          className="relative"
          tabIndex={0}
          role="marquee"
          aria-label="Latest announcements ticker"
          onKeyDown={handleKeyDown}
        >
          <div
            className={cn(
              'flex space-x-8 whitespace-nowrap',
              isPaused ? 'animate-ticker-paused' : 'animate-ticker'
            )}
          >
            {/* Duplicate the announcements for seamless looping */}
            {[...announcements, ...announcements].map((announcement, index) => (
              <span
                key={`${announcement.id}-${index}`}
                className="inline-flex items-center text-sm text-accent-foreground"
              >
                {announcement.link ? (
                  <a
                    href={announcement.link}
                    className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {announcement.text}
                  </a>
                ) : (
                  announcement.text
                )}
                {index < announcements.length - 1 && (
                  <span className="mx-4 text-accent-foreground/50">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .animate-ticker {
            animation-duration: 20s;
          }
        }
      `}</style>
    </div>
  );
}
