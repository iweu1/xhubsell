"use client"

import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { 
  SellerCard, 
  CatalogFilters, 
  CatalogPagination, 
  CatalogSkeleton, 
  EmptyState 
} from './catalog';
import { useCatalog } from '@/hooks/use-catalog';
import { cn } from '@/lib/utils';

interface CatalogPageProps {
  locale?: string;
  userId?: string;
  className?: string;
}

export function CatalogPage({ locale = 'en', userId, className }: CatalogPageProps) {
  const {
    sellers,
    categories,
    loading,
    error,
    filters,
    pagination,
    handleFiltersChange,
    setCurrentPage,
    handleFavoriteToggle,
    clearFilters,
    getEmptyStateType,
  } = useCatalog(userId);

  const t = (key: string, fallback: string) => {
    return locale === 'ru' ? fallback : key;
  };

  const getSellerCountText = () => {
    if (!pagination) return '';
    
    const count = pagination.totalCount;
    const start = (pagination.page - 1) * pagination.limit + 1;
    const end = Math.min(pagination.page * pagination.limit, count);
    
    if (locale === 'ru') {
      if (count % 10 === 1 && count % 100 !== 11) {
        return `${count} продавец`;
      } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
        return `${count} продавца`;
      } else {
        return `${count} продавцов`;
      }
    } else {
      return `${count} seller${count !== 1 ? 's' : ''}`;
    }
  };

  const getResultsText = () => {
    if (!pagination) return '';
    
    const start = (pagination.page - 1) * pagination.limit + 1;
    const end = Math.min(pagination.page * pagination.limit, pagination.totalCount);
    
    if (locale === 'ru') {
      return `Показано ${start}-${end} из ${pagination.totalCount}`;
    } else {
      return `Showing ${start}-${end} of ${pagination.totalCount}`;
    }
  };

  return (
    <div className={cn("container py-8", className)}>
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              {t('Home', 'Главная')}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {t('Catalog', 'Каталог')}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('Browse Sellers', 'Обзор продавцов')}
        </h1>
        <p className="text-gray-600">
          {t(
            'Find and connect with talented sellers from around the world',
            'Найдите и свяжитесь с талантливыми продавцами со всего мира'
          )}
        </p>
        {pagination && (
          <p className="text-sm text-gray-500 mt-2">
            {getSellerCountText()} {t('available', 'доступно')}
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <CatalogFilters
            categories={categories}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            locale={locale}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Results Header */}
          {pagination && (
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                {getResultsText()}
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && <CatalogSkeleton />}

          {/* Error State */}
          {error && !loading && (
            <EmptyState 
              type="error" 
              locale={locale}
            />
          )}

          {/* Empty State */}
          {!loading && !error && sellers.length === 0 && (
            <EmptyState 
              type={getEmptyStateType()}
              onClearFilters={clearFilters}
              locale={locale}
            />
          )}

          {/* Sellers Grid */}
          {!loading && !error && sellers.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {sellers.map((seller) => (
                  <SellerCard
                    key={seller.id}
                    seller={seller}
                    onFavoriteToggle={handleFavoriteToggle}
                    locale={locale}
                    loading={false}
                  />
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <CatalogPagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  hasNextPage={pagination.hasNextPage}
                  hasPreviousPage={pagination.hasPreviousPage}
                  onPageChange={setCurrentPage}
                  locale={locale}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}