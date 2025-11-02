'use client';

import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight } from 'lucide-react';

interface HeroSearchProps {
  className?: string;
}

export function HeroSearch({ className }: HeroSearchProps) {
  const { t } = useTranslation('home');
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Get current locale from pathname
  const locale = pathname.split('/')[1] || 'en';

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    // Redirect to catalog with search query
    router.push(`/${locale}/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleBrowseCatalog = () => {
    router.push(`/${locale}/catalog`);
  };

  const handleJoinAsSeller = () => {
    router.push(`/${locale}/how-to-join`);
  };

  return (
    <div className={className}>
      {/* Hero background gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-orange-600/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/20 rounded-full filter blur-3xl" />
        
        <div className="relative container py-16 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Tagline */}
            <p className="text-sm font-medium text-primary mb-4 animate-fade-in">
              {t('hero:tagline')}
            </p>
            
            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight mb-6 animate-fade-in">
              {t('hero:title')}
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in">
              {t('hero:description')}
            </p>
            
            {/* Search Section */}
            <div className="max-w-2xl mx-auto mb-12 animate-fade-in">
              <form onSubmit={handleSearch} className="relative" role="search">
                <div className="relative group">
                  <span id="search-description" className="sr-only">
                    {t('hero:searchPlaceholder')}
                  </span>
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    type="text"
                    placeholder={t('hero:searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-32 h-14 text-base shadow-soft hover:shadow-medium transition-shadow duration-300 focus:shadow-medium"
                    aria-label={t('hero:searchPlaceholder')}
                    aria-describedby="search-description"
                    autoComplete="off"
                    spellCheck="false"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isLoading || !searchQuery.trim()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 h-10 gradient-primary"
                  >
                    {isLoading ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <>
                        {t('hero:searchButton')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
              <Button
                size="lg"
                variant="outline"
                onClick={handleBrowseCatalog}
                className="w-full sm:w-auto px-8 py-3 border-2 hover:bg-gray-50 transition-colors"
                aria-label={t('hero:browseCatalog')}
              >
                {t('hero:browseCatalog')}
              </Button>
              <Button
                size="lg"
                onClick={handleJoinAsSeller}
                className="w-full sm:w-auto px-8 py-3 gradient-primary text-white hover:shadow-medium transition-all duration-300"
                aria-label={t('hero:joinAsSeller')}
              >
                {t('hero:joinAsSeller')}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}