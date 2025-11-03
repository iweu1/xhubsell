"use client"

import React from 'react';
import { Search, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyStateProps {
  type: 'search' | 'filters' | 'favorites' | 'error';
  onClearFilters?: () => void;
  locale?: string;
}

export function EmptyState({ type, onClearFilters, locale = 'en' }: EmptyStateProps) {
  const t = (key: string, fallback: string) => {
    return locale === 'ru' ? fallback : key;
  };

  const getEmptyStateContent = () => {
    switch (type) {
      case 'search':
        return {
          icon: Search,
          title: t('No sellers found', 'Продавцы не найдены'),
          description: t(
            'Try adjusting your search terms or browse all sellers',
            'Попробуйте изменить условия поиска или просмотреть всех продавцов'
          ),
          action: onClearFilters ? {
            label: t('Clear search', 'Очистить поиск'),
            onClick: onClearFilters
          } : null
        };

      case 'filters':
        return {
          icon: Users,
          title: t('No sellers match your filters', 'Нет продавцов, соответствующих фильтрам'),
          description: t(
            'Try adjusting your filter criteria or browse all sellers',
            'Попробуйте изменить критерии фильтров или просмотреть всех продавцов'
          ),
          action: onClearFilters ? {
            label: t('Clear filters', 'Очистить фильтры'),
            onClick: onClearFilters
          } : null
        };

      case 'favorites':
        return {
          icon: Heart,
          title: t('No favorites yet', 'Нет избранных'),
          description: t(
            'Start adding sellers to your favorites to see them here',
            'Начните добавлять продавцов в избранное, чтобы увидеть их здесь'
          ),
          action: null
        };

      case 'error':
        return {
          icon: Users,
          title: t('Error loading sellers', 'Ошибка загрузки продавцов'),
          description: t(
            'Something went wrong while fetching sellers. Please try again.',
            'Что-то пошло не так при загрузке продавцов. Попробуйте еще раз.'
          ),
          action: {
            label: t('Try again', 'Попробовать снова'),
            onClick: () => window.location.reload()
          }
        };

      default:
        return {
          icon: Users,
          title: t('No sellers found', 'Продавцы не найдены'),
          description: t('Check back later for new sellers', 'Загляните позже для новых продавцов'),
          action: null
        };
    }
  };

  const content = getEmptyStateContent();
  const Icon = content.icon;

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="max-w-md w-full text-center">
        <CardContent className="p-8">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Icon className="w-8 h-8 text-gray-400" />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {content.title}
          </h3>
          
          <p className="text-gray-600 mb-6">
            {content.description}
          </p>
          
          {content.action && (
            <Button onClick={content.action.onClick} variant="outline">
              {content.action.label}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}