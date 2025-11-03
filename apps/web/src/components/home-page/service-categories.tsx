'use client';

import { useState, useEffect } from 'react';
import { useMockTranslation } from '@/hooks/use-mock-translation';
import Link from 'next/link';
import { SectionHeading } from '@/components/layout/section-heading';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Palette, Code, TrendingUp, Search, PenTool, Headphones, ArrowRight } from 'lucide-react';

interface Category {
  id: string;
  nameEn: string;
  nameRu: string;
  slug: string;
  description: string;
  icon: string;
  sellerCount: number;
}

const categoryIcons = {
  design: Palette,
  programming: Code,
  marketing: TrendingUp,
  seo: Search,
  copywriting: PenTool,
  support: Headphones,
  'web-development': Code,
  'mobile-development': Code,
  writing: PenTool,
};

export function ServiceCategories() {
  const { t, i18n } = useMockTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Skip API calls during build time
    if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
      setLoading(false);
      return;
    }

    const fetchCategories = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

        // Skip fetch if API URL is not available (build time)
        if (!apiUrl || (apiUrl === 'http://localhost:3001' && typeof window === 'undefined')) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${apiUrl}/public/categories`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();

        // Filter to only show the 6 main categories mentioned in requirements
        const mainCategories = [
          'design',
          'programming',
          'marketing',
          'seo',
          'copywriting',
          'support',
        ];
        const filteredCategories = data
          .filter(
            (cat: Category) =>
              mainCategories.includes(cat.slug) ||
              mainCategories.some((main) => cat.slug.includes(main))
          )
          .slice(0, 6);

        setCategories(filteredCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryName = (category: Category) => {
    return i18n.language === 'ru' ? category.nameRu : category.nameEn;
  };

  const getSellerCountText = (count: number) => {
    if (i18n.language === 'ru') {
      if (count === 1) return `${count} продавец`;
      if (count >= 2 && count <= 4) return `${count} продавца`;
      return `${count} продавцов`;
    }
    return count === 1 ? `${count} seller` : `${count} sellers`;
  };

  if (loading) {
    return (
      <section className="container">
        <SectionHeading
          title={t('home:categories.title')}
          description={t('home:categories.description')}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card
              key={index}
              className="card-shadow hover:shadow-medium transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-1/2" />
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
          title={t('home:categories.title')}
          description={t('home:categories.description')}
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
        title={t('home:categories.title')}
        description={t('home:categories.description')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const IconComponent = categoryIcons[category.slug as keyof typeof categoryIcons] || Code;

          return (
            <Link key={category.id} href={`/catalog?category=${category.slug}`} className="group">
              <Card className="card-shadow hover:shadow-medium transition-all duration-300 h-full cursor-pointer border-0 bg-gradient-to-br from-card to-card/80">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {getSellerCountText(category.sellerCount)}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {getCategoryName(category)}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {i18n.language === 'ru' ? category.description : category.description}
                  </p>

                  <div className="flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                    {t('home:categories.browseCategory')}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
