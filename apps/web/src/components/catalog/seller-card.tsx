"use client"

import React from 'react';
import { Star, Heart, MessageCircle, ExternalLink, MapPin, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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

interface SellerCardProps {
  seller: Seller;
  onFavoriteToggle?: (sellerId: string, isFavorited: boolean) => void;
  locale?: string;
  loading?: boolean;
}

export function SellerCard({ 
  seller, 
  onFavoriteToggle, 
  locale = 'en',
  loading = false 
}: SellerCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onFavoriteToggle) {
      onFavoriteToggle(seller.id, seller.isFavorited);
    }
  };

  const formatName = () => {
    if (seller.firstName && seller.lastName) {
      return `${seller.firstName} ${seller.lastName}`;
    }
    return seller.firstName || seller.lastName || seller.username;
  };

  const formatPrice = (price?: number) => {
    if (!price) return null;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryName = (category: any) => {
    return locale === 'ru' ? category.nameRu : category.nameEn;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'SUSPENDED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'PENDING_VERIFICATION':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    const statusTexts: Record<string, { en: string; ru: string }> = {
      ACTIVE: { en: 'Active', ru: 'Активен' },
      INACTIVE: { en: 'Inactive', ru: 'Неактивен' },
      SUSPENDED: { en: 'Suspended', ru: 'Приостановлен' },
      PENDING_VERIFICATION: { en: 'Pending Verification', ru: 'Ожидает проверки' },
    };
    return statusTexts[status]?.[locale] || status;
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200 relative">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                {seller.avatar ? (
                  <img
                    src={seller.avatar}
                    alt={formatName()}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm font-medium">
                    {formatName().charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1">
                <div className={cn(
                  "w-3 h-3 rounded-full border-2 border-white",
                  seller.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-400'
                )} />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                {formatName()}
              </h3>
              <p className="text-sm font-medium text-gray-600 truncate">
                {seller.title}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className={cn("text-xs", getStatusColor(seller.status))}>
                  {getStatusText(seller.status)}
                </Badge>
                {seller.primaryCategory && (
                  <Badge variant="secondary" className="text-xs">
                    {getCategoryName(seller.primaryCategory)}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteClick}
            disabled={loading}
            className="flex-shrink-0 hover:bg-red-50 hover:text-red-600 p-2"
            aria-label={seller.isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={cn(
                "w-4 h-4",
                seller.isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'
              )}
            />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        {seller.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {seller.description}
          </p>
        )}

        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          {seller.rating && (
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-gray-900">{seller.rating.toFixed(1)}</span>
              <span className="text-xs">({seller.totalReviews})</span>
            </div>
          )}
          
          {seller.hourlyRate && (
            <div className="font-medium text-gray-900">
              {formatPrice(seller.hourlyRate)}/hr
            </div>
          )}
        </div>

        {seller.location && (
          <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
            <MapPin className="w-4 h-4" />
            <span>{seller.location}</span>
          </div>
        )}

        {seller.languages.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {seller.languages.slice(0, 3).map((language) => (
              <Badge key={language} variant="outline" className="text-xs">
                {language}
              </Badge>
            ))}
            {seller.languages.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{seller.languages.length - 3}
              </Badge>
            )}
          </div>
        )}

        {seller.skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {seller.skills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {seller.skills.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{seller.skills.length - 4}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3 border-t">
        <div className="flex space-x-2 w-full">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => window.open(`/sellers/${seller.username}`, '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            {locale === 'ru' ? 'Профиль' : 'Profile'}
          </Button>
          
          <Button
            size="sm"
            className="flex-1"
            onClick={() => window.open(`/messages/new?seller=${seller.userId}`, '_blank')}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {locale === 'ru' ? 'Сообщение' : 'Message'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}