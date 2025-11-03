'use client';

import { useState, useEffect } from 'react';
import { useMockTranslation } from '@/hooks/use-mock-translation';
import Link from 'next/link';
import Image from 'next/image';
import { SectionHeading } from '@/components/layout/section-heading';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, MapPin, Clock, CheckCircle, ArrowRight } from 'lucide-react';

interface Seller {
  id: string;
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  title: string;
  description: string;
  bio: string;
  rating: number | null;
  reviewCount: number;
  totalReviews: number;
  hourlyRate: number | null;
  experience: number | null;
  location: string | null;
  languages: string[];
  skills: string[];
  status: string;
  primaryCategory: {
    id: string;
    nameEn: string;
    nameRu: string;
    slug: string;
  } | null;
  categories: Array<{
    id: string;
    nameEn: string;
    nameRu: string;
    slug: string;
  }>;
  createdAt: string;
}

export function TopSellers() {
  const { t, i18n } = useMockTranslation();
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Skip API calls during build time
    if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
      setLoading(false);
      return;
    }

    const fetchTopSellers = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

        // Skip fetch if API URL is not available (build time)
        if (!apiUrl || (apiUrl === 'http://localhost:3001' && typeof window === 'undefined')) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${apiUrl}/public/sellers/top?limit=8`);
        if (!response.ok) {
          throw new Error('Failed to fetch top sellers');
        }
        const data = await response.json();
        setSellers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellers();
  }, []);

  const renderStars = (rating: number | null) => {
    if (!rating) return null;

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <Star className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
        ))}
        <span className="text-sm font-medium ml-1">
          {rating.toFixed(1)} ({sellers[0]?.totalReviews || 0})
        </span>
      </div>
    );
  };

  const getCategoryName = (category: Seller['primaryCategory']) => {
    if (!category) return null;
    return i18n.language === 'ru' ? category.nameRu : category.nameEn;
  };

  const getFullName = (seller: Seller) => {
    return `${seller.firstName || ''} ${seller.lastName || ''}`.trim() || seller.username;
  };

  if (loading) {
    return (
      <section className="container">
        <SectionHeading
          title={t('home:topSellers.title')}
          description={t('home:topSellers.description')}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="card-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Skeleton className="h-16 w-16 rounded-full mb-4" />
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-9 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container">
        <SectionHeading
          title={t('home:topSellers.title')}
          description={t('home:topSellers.description')}
        />
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('common:error.loadingFailed')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container">
      <SectionHeading
        title={t('home:topSellers.title')}
        description={t('home:topSellers.description')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sellers.map((seller) => (
          <Card
            key={seller.id}
            className="card-shadow hover:shadow-medium transition-all duration-300 group"
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative mb-4">
                  {seller.avatar ? (
                    <Image
                      src={seller.avatar}
                      alt={getFullName(seller)}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xl font-semibold text-primary">
                        {getFullName(seller).charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1">
                    <CheckCircle className="h-5 w-5 text-green-500 fill-white" />
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                  {getFullName(seller)}
                </h3>

                {/* Title */}
                <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{seller.title}</p>

                {/* Rating */}
                {seller.rating && <div className="mb-3">{renderStars(seller.rating)}</div>}

                {/* Category Badge */}
                {seller.primaryCategory && (
                  <Badge variant="secondary" className="mb-3">
                    {getCategoryName(seller.primaryCategory)}
                  </Badge>
                )}

                {/* Location/Experience */}
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mb-4">
                  {seller.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{seller.location}</span>
                    </div>
                  )}
                  {seller.experience && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{seller.experience}y</span>
                    </div>
                  )}
                </div>

                {/* Tagline */}
                {seller.bio && (
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{seller.bio}</p>
                )}

                {/* View Profile Button */}
                <Link href={`/seller/${seller.userId}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    {t('home:topSellers.viewProfile')}
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
