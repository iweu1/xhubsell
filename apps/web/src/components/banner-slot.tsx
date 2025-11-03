'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface Banner {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  link?: string;
  position: 'top' | 'inline' | 'sidebar';
  isActive: boolean;
  isExternal?: boolean;
}

interface BannerSlotProps {
  position: 'top' | 'inline' | 'sidebar';
  className?: string;
}

export function BannerSlot({ position, className }: BannerSlotProps) {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trackedImpressions, setTrackedImpressions] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Skip API calls during build time
    if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
      setIsLoading(false);
      return;
    }

    const fetchBanners = async () => {
      try {
        const response = await fetch(`/api/banners?active=true&position=${position}`);
        if (response.ok) {
          const data = await response.json();
          setBanners(data);
        }
      } catch (error) {
        console.error('Failed to fetch banners:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, [position]);

  const trackImpression = useCallback(
    async (bannerId: string) => {
      // Skip tracking during build time
      if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
        return;
      }

      if (trackedImpressions.has(bannerId)) return;

      try {
        await fetch(`/api/banners/${bannerId}/impression`, {
          method: 'POST',
        });
        setTrackedImpressions((prev) => new Set([...prev, bannerId]));
      } catch (error) {
        console.error('Failed to track impression:', error);
      }
    },
    [trackedImpressions]
  );

  useEffect(() => {
    // Track impressions for visible banners
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bannerId = entry.target.getAttribute('data-banner-id');
            if (bannerId) {
              trackImpression(bannerId);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const bannerElements = document.querySelectorAll('[data-banner-id]');
    bannerElements.forEach((el) => observer.observe(el));

    return () => {
      bannerElements.forEach((el) => observer.unobserve(el));
    };
  }, [banners, trackImpression]);

  if (isLoading) {
    const skeletonClass =
      position === 'sidebar' ? 'h-48 w-full' : position === 'top' ? 'h-24 w-full' : 'h-32 w-full';

    return (
      <div className={cn('w-full', className)}>
        <Skeleton className={skeletonClass} />
      </div>
    );
  }

  if (banners.length === 0) {
    return null;
  }

  const banner = banners[0]; // Show one banner at a time per position

  const handleClick = () => {
    if (banner.link) {
      if (banner.isExternal) {
        window.open(banner.link, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = banner.link;
      }
    }
  };

  const bannerClasses = cn(
    'relative overflow-hidden rounded-lg cursor-pointer group transition-all duration-300 hover:shadow-lg',
    {
      'w-full h-24': position === 'top',
      'w-full h-32': position === 'inline',
      'w-full h-48': position === 'sidebar',
    },
    className
  );

  return (
    <div
      className={bannerClasses}
      onClick={handleClick}
      data-banner-id={banner.id}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={banner.title}
    >
      <div className="relative w-full h-full">
        <Image
          src={banner.imageUrl}
          alt={banner.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h3 className="font-semibold text-lg mb-1">{banner.title}</h3>
            {banner.description && <p className="text-sm opacity-90">{banner.description}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
