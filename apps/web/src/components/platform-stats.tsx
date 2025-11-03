'use client';

import { useState, useEffect, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PlatformStats {
  totalSellers: number;
  totalOrders: number;
  activeClients: number;
  platformYears: number;
}

interface StatsProps {
  className?: string;
}

export function PlatformStats({ className }: StatsProps) {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip API calls during build time
    if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
      setIsLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

        // Skip fetch if API URL is not available (build time)
        if (!apiUrl || (apiUrl === 'http://localhost:3001' && typeof window === 'undefined')) {
          setIsLoading(false);
          return;
        }

        const response = await fetch(`${apiUrl}/analytics/stats`);
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch platform stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const AnimatedNumber = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const startTime = useRef<number | null>(null);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
      if (!isInView) return;

      const animate = (currentTime: number) => {
        if (!startTime.current) {
          startTime.current = currentTime;
        }

        const elapsed = currentTime - startTime.current;
        const progress = Math.min(elapsed / duration, 1);

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(value * easeOutQuart);

        setDisplayValue(currentValue);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [value, duration]);

    return <>{displayValue.toLocaleString()}</>;
  };

  const statsData = stats || {
    totalSellers: 1234,
    totalOrders: 89012,
    activeClients: 234567,
    platformYears: new Date().getFullYear() - 2020, // Assuming platform started in 2020
  };

  const statItems = [
    {
      key: 'sellers',
      value: statsData.totalSellers,
      label: 'Active Sellers',
      color: 'text-primary',
      icon: '👥',
    },
    {
      key: 'orders',
      value: statsData.totalOrders,
      label: 'Completed Orders',
      color: 'text-status-success',
      icon: '📦',
    },
    {
      key: 'clients',
      value: statsData.activeClients,
      label: 'Active Clients',
      color: 'text-status-warning',
      icon: '🌟',
    },
    {
      key: 'years',
      value: statsData.platformYears,
      label: 'Years in Business',
      color: 'text-secondary',
      icon: '🎯',
    },
  ];

  if (isLoading) {
    return (
      <div className={cn('container', className)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="text-center card-shadow">
              <CardContent className="p-6">
                <Skeleton className="h-8 w-8 mx-auto mb-3 rounded-full" />
                <Skeleton className="h-8 w-20 mx-auto mb-2" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn('container', className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((stat) => (
          <Card
            key={stat.key}
            className="text-center card-shadow hover:shadow-medium transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className={`text-3xl mb-3 ${stat.color}`}>{stat.icon}</div>
              <div className="text-2xl font-bold mb-1">
                <AnimatedNumber value={stat.value} />
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
