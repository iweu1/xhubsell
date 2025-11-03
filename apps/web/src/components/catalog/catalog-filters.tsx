"use client"

import React, { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  nameEn: string;
  nameRu: string;
  slug: string;
  sellerCount: number;
}

interface FiltersProps {
  categories: Category[];
  filters: {
    searchQuery: string;
    status: string;
    categoryIds: string[];
    minRating: number;
    maxRating: number;
    minPrice: number;
    maxPrice: number;
    languages: string[];
    sort: string;
    favoritesOnly: boolean;
  };
  onFiltersChange: (filters: any) => void;
  locale?: string;
  className?: string;
}

const LANGUAGES = [
  { code: 'EN', name: 'English', nameRu: 'Английский' },
  { code: 'RU', name: 'Russian', nameRu: 'Русский' },
  { code: 'ES', name: 'Spanish', nameRu: 'Испанский' },
  { code: 'FR', name: 'French', nameRu: 'Французский' },
  { code: 'DE', name: 'German', nameRu: 'Немецкий' },
  { code: 'IT', name: 'Italian', nameRu: 'Итальянский' },
  { code: 'PT', name: 'Portuguese', nameRu: 'Португальский' },
  { code: 'ZH', name: 'Chinese', nameRu: 'Китайский' },
  { code: 'JA', name: 'Japanese', nameRu: 'Японский' },
  { code: 'KO', name: 'Korean', nameRu: 'Корейский' },
];

const STATUS_OPTIONS = [
  { value: 'all', labelEn: 'All Sellers', labelRu: 'Все продавцы' },
  { value: 'ACTIVE', labelEn: 'Active', labelRu: 'Активные' },
  { value: 'INACTIVE', labelEn: 'Inactive', labelRu: 'Неактивные' },
  { value: 'PENDING_VERIFICATION', labelEn: 'Pending Verification', labelRu: 'Ожидают проверки' },
];

const SORT_OPTIONS = [
  { value: 'popularity', labelEn: 'Popularity', labelRu: 'Популярность' },
  { value: 'rating', labelEn: 'Rating', labelRu: 'Рейтинг' },
  { value: 'newest', labelEn: 'Newest', labelRu: 'Новые' },
  { value: 'price_asc', labelEn: 'Price: Low to High', labelRu: 'Цена: по возрастанию' },
  { value: 'price_desc', labelEn: 'Price: High to Low', labelRu: 'Цена: по убыванию' },
];

export function CatalogFilters({
  categories,
  filters,
  onFiltersChange,
  locale = 'en',
  className
}: FiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState([filters.minPrice || 0, filters.maxPrice || 500]);
  const [ratingRange, setRatingRange] = useState([filters.minRating || 0, filters.maxRating || 5]);

  const t = (key: string, fallback: string) => {
    // Simple translation function - in real app would use i18n
    return locale === 'ru' ? fallback : key;
  };

  const getCategoryName = (category: Category) => {
    return locale === 'ru' ? category.nameRu : category.nameEn;
  };

  const getOptionLabel = (option: any) => {
    return locale === 'ru' ? option.labelRu : option.labelEn;
  };

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, searchQuery: value });
  };

  const handleStatusChange = (status: string) => {
    onFiltersChange({ ...filters, status });
  };

  const handleSortChange = (sort: string) => {
    onFiltersChange({ ...filters, sort });
  };

  const handleCategoryToggle = (categoryId: string, checked: boolean) => {
    const newCategoryIds = checked
      ? [...filters.categoryIds, categoryId]
      : filters.categoryIds.filter(id => id !== categoryId);
    onFiltersChange({ ...filters, categoryIds: newCategoryIds });
  };

  const handleLanguageToggle = (language: string, checked: boolean) => {
    const newLanguages = checked
      ? [...filters.languages, language]
      : filters.languages.filter(lang => lang !== language);
    onFiltersChange({ ...filters, languages: newLanguages });
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
    onFiltersChange({ 
      ...filters, 
      minPrice: value[0] === 0 ? undefined : value[0], 
      maxPrice: value[1] === 500 ? undefined : value[1] 
    });
  };

  const handleRatingRangeChange = (value: number[]) => {
    setRatingRange(value);
    onFiltersChange({ 
      ...filters, 
      minRating: value[0] === 0 ? undefined : value[0], 
      maxRating: value[1] === 5 ? undefined : value[1] 
    });
  };

  const handleFavoritesToggle = (checked: boolean) => {
    onFiltersChange({ ...filters, favoritesOnly: checked });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      searchQuery: '',
      status: 'all',
      categoryIds: [],
      minRating: 0,
      maxRating: 5,
      minPrice: 0,
      maxPrice: 500,
      languages: [],
      sort: 'popularity',
      favoritesOnly: false,
    });
    setPriceRange([0, 500]);
    setRatingRange([0, 5]);
  };

  const hasActiveFilters = 
    filters.searchQuery ||
    filters.status !== 'all' ||
    filters.categoryIds.length > 0 ||
    filters.minRating > 0 ||
    filters.maxRating < 5 ||
    filters.minPrice > 0 ||
    filters.maxPrice < 500 ||
    filters.languages.length > 0 ||
    filters.favoritesOnly;

  const activeFilterCount = [
    filters.searchQuery,
    filters.status !== 'all',
    filters.categoryIds.length,
    filters.minRating > 0 || filters.maxRating < 5,
    filters.minPrice > 0 || filters.maxPrice < 500,
    filters.languages.length,
    filters.favoritesOnly,
  ].filter(Boolean).length;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={t('Search sellers...', 'Поиск продавцов...')}
              value={filters.searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </CardContent>
      </Card>

      {/* Filter Controls */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              {t('Filters', 'Фильтры')}
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFilterCount}
                </Badge>
              )}
            </CardTitle>
            <div className="flex items-center space-x-2">
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4 mr-1" />
                  {t('Clear', 'Очистить')}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="lg:hidden"
              >
                {isExpanded ? t('Hide', 'Скрыть') : t('Show', 'Показать')}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className={cn("space-y-6", !isExpanded && "hidden lg:block")}>
          {/* Status Filter */}
          <div>
            <h4 className="font-medium mb-3">{t('Status', 'Статус')}</h4>
            <Select value={filters.status} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {getOptionLabel(option)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div>
            <h4 className="font-medium mb-3">{t('Sort by', 'Сортировка')}</h4>
            <Select value={filters.sort} onValueChange={handleSortChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {getOptionLabel(option)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Categories */}
          {categories.length > 0 && (
            <div>
              <h4 className="font-medium mb-3">{t('Categories', 'Категории')}</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={filters.categoryIds.includes(category.id)}
                      onCheckedChange={(checked) => 
                        handleCategoryToggle(category.id, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="text-sm flex-1 cursor-pointer"
                    >
                      {getCategoryName(category)}
                      <span className="text-gray-400 ml-1">({category.sellerCount})</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rating Range */}
          <div>
            <h4 className="font-medium mb-3">{t('Rating Range', 'Диапазон рейтинга')}</h4>
            <div className="space-y-2">
              <Slider
                value={ratingRange}
                onValueChange={handleRatingRangeChange}
                max={5}
                min={0}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{ratingRange[0]}</span>
                <span>{ratingRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-medium mb-3">{t('Price Range ($/hour)', 'Цена ($/час)')}</h4>
            <div className="space-y-2">
              <Slider
                value={priceRange}
                onValueChange={handlePriceRangeChange}
                max={500}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div>
            <h4 className="font-medium mb-3">{t('Languages', 'Языки')}</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {LANGUAGES.map((language) => (
                <div key={language.code} className="flex items-center space-x-2">
                  <Checkbox
                    id={`lang-${language.code}`}
                    checked={filters.languages.includes(language.code)}
                    onCheckedChange={(checked) => 
                      handleLanguageToggle(language.code, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`lang-${language.code}`}
                    className="text-sm cursor-pointer"
                  >
                    {locale === 'ru' ? language.nameRu : language.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Favorites Only */}
          <div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="favorites-only"
                checked={filters.favoritesOnly}
                onCheckedChange={handleFavoritesToggle}
              />
              <label htmlFor="favorites-only" className="text-sm cursor-pointer">
                {t('Show favorites only', 'Только избранные')}
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}