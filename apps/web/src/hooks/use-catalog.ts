"use client"

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface Seller {
  id: string;
  userId: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  title: string;
  description?: string;
  bio?: string;
  rating?: number;
  reviewCount: number;
  totalReviews: number;
  hourlyRate?: number;
  experience?: number;
  location?: string;
  languages: string[];
  skills: string[];
  status: string;
  primaryCategory?: {
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
  isFavorited: boolean;
}

interface Category {
  id: string;
  nameEn: string;
  nameRu: string;
  slug: string;
  sellerCount: number;
}

interface Pagination {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface CatalogResponse {
  sellers: Seller[];
  pagination: Pagination;
}

interface Filters {
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
}

const DEFAULT_FILTERS: Filters = {
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
};

export function useCatalog(userId?: string) {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize filters from URL
  useEffect(() => {
    const urlFilters: Partial<Filters> = {};
    
    const searchQuery = searchParams.get('q');
    if (searchQuery) urlFilters.searchQuery = searchQuery;
    
    const status = searchParams.get('status');
    if (status) urlFilters.status = status;
    
    const categoryIds = searchParams.get('category');
    if (categoryIds) urlFilters.categoryIds = categoryIds.split(',');
    
    const minRating = searchParams.get('minRating');
    if (minRating) urlFilters.minRating = parseFloat(minRating);
    
    const maxRating = searchParams.get('maxRating');
    if (maxRating) urlFilters.maxRating = parseFloat(maxRating);
    
    const minPrice = searchParams.get('minPrice');
    if (minPrice) urlFilters.minPrice = parseFloat(minPrice);
    
    const maxPrice = searchParams.get('maxPrice');
    if (maxPrice) urlFilters.maxPrice = parseFloat(maxPrice);
    
    const languages = searchParams.get('languages');
    if (languages) urlFilters.languages = languages.split(',');
    
    const sort = searchParams.get('sort');
    if (sort) urlFilters.sort = sort;
    
    const favoritesOnly = searchParams.get('favoritesOnly');
    if (favoritesOnly) urlFilters.favoritesOnly = favoritesOnly === 'true';
    
    const page = searchParams.get('page');
    if (page) {
      // Handle page separately as it's not part of filters object
      setCurrentPage(parseInt(page, 10));
    }
    
    setFilters(prev => ({ ...prev, ...urlFilters }));
  }, [searchParams]);

  // Update URL when filters change
  const updateURL = useCallback((newFilters: Filters, page: number = 1) => {
    const params = new URLSearchParams();
    
    if (newFilters.searchQuery) params.set('q', newFilters.searchQuery);
    if (newFilters.status !== 'all') params.set('status', newFilters.status);
    if (newFilters.categoryIds.length > 0) params.set('category', newFilters.categoryIds.join(','));
    if (newFilters.minRating > 0) params.set('minRating', newFilters.minRating.toString());
    if (newFilters.maxRating < 5) params.set('maxRating', newFilters.maxRating.toString());
    if (newFilters.minPrice > 0) params.set('minPrice', newFilters.minPrice.toString());
    if (newFilters.maxPrice < 500) params.set('maxPrice', newFilters.maxPrice.toString());
    if (newFilters.languages.length > 0) params.set('languages', newFilters.languages.join(','));
    if (newFilters.sort !== 'popularity') params.set('sort', newFilters.sort);
    if (newFilters.favoritesOnly) params.set('favoritesOnly', 'true');
    if (page > 1) params.set('page', page.toString());
    
    const queryString = params.toString();
    const newPath = queryString ? `/catalog?${queryString}` : '/catalog';
    router.push(newPath, { scroll: false });
  }, [router]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/public/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  // Fetch sellers
  const fetchSellers = useCallback(async (page: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      
      if (filters.searchQuery) params.set('q', filters.searchQuery);
      if (filters.status !== 'all') params.set('status', filters.status);
      if (filters.categoryIds.length > 0) params.set('category', filters.categoryIds.join(','));
      if (filters.minRating > 0) params.set('minRating', filters.minRating.toString());
      if (filters.maxRating < 5) params.set('maxRating', filters.maxRating.toString());
      if (filters.minPrice > 0) params.set('minPrice', filters.minPrice.toString());
      if (filters.maxPrice < 500) params.set('maxPrice', filters.maxPrice.toString());
      if (filters.languages.length > 0) params.set('languages', filters.languages.join(','));
      if (filters.sort !== 'popularity') params.set('sort', filters.sort);
      if (filters.favoritesOnly && userId) params.set('favoritesOnly', 'true');
      if (userId) params.set('userId', userId);
      
      params.set('page', page.toString());
      params.set('limit', '12');

      const response = await fetch(`/api/public/catalog/search?${params}`);
      if (!response.ok) throw new Error('Failed to fetch sellers');
      
      const data: CatalogResponse = await response.json();
      setSellers(data.sellers);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setSellers([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [filters, userId]);

  // Initial fetch and when filters change
  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    fetchSellers(page);
  }, [fetchSellers, searchParams]);

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
    updateURL(newFilters, 1);
  };

  const setCurrentPage = (page: number) => {
    updateURL(filters, page);
  };

  const handleFavoriteToggle = async (sellerId: string, isFavorited: boolean) => {
    if (!userId) {
      // Handle unauthenticated user - could show login modal
      console.log('User not authenticated');
      return;
    }

    try {
      const method = isFavorited ? 'DELETE' : 'POST';
      const response = await fetch(`/api/public/favorites/${sellerId}`, {
        method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to update favorite');

      // Update local state optimistically
      setSellers(prev => prev.map(seller => 
        seller.id === sellerId 
          ? { ...seller, isFavorited: !isFavorited }
          : seller
      ));
    } catch (err) {
      console.error('Error updating favorite:', err);
      // Could show toast notification here
    }
  };

  const clearFilters = () => {
    const clearedFilters = { ...DEFAULT_FILTERS };
    setFilters(clearedFilters);
    updateURL(clearedFilters, 1);
  };

  const getEmptyStateType = () => {
    if (error) return 'error';
    if (filters.favoritesOnly) return 'favorites';
    if (filters.searchQuery || filters.status !== 'all' || 
        filters.categoryIds.length > 0 || filters.minRating > 0 || 
        filters.maxRating < 5 || filters.minPrice > 0 || 
        filters.maxPrice < 500 || filters.languages.length > 0) {
      return 'filters';
    }
    return 'search';
  };

  return {
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
  };
}