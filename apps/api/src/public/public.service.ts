import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PublicService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategoriesWithSellerCounts() {
    const categories = await this.prisma.category.findMany({
      include: {
        _count: {
          select: {
            sellers: true,
          },
        },
      },
      orderBy: {
        nameEn: 'asc',
      },
    });

    return categories.map((category) => ({
      id: category.id,
      nameEn: category.nameEn,
      nameRu: category.nameRu,
      slug: category.slug,
      description: category.description,
      icon: category.icon,
      sellerCount: category._count.sellers,
    }));
  }

  async getTopSellers(limit: number = 8, offset: number = 0) {
    const sellers = await this.prisma.sellerProfile.findMany({
      where: {
        status: 'ACTIVE',
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true,
            email: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      orderBy: [{ rating: 'desc' }, { reviewCount: 'desc' }],
      take: limit,
      skip: offset,
    });

    return sellers.map((seller) => ({
      id: seller.id,
      userId: seller.user.id,
      username: seller.user.username,
      firstName: seller.user.firstName,
      lastName: seller.user.lastName,
      avatar: seller.user.avatar,
      title: seller.title,
      description: seller.description,
      bio: seller.bio,
      rating: seller.rating,
      reviewCount: seller.reviewCount,
      totalReviews: seller._count.reviews,
      hourlyRate: seller.hourlyRate,
      experience: seller.experience,
      location: seller.location,
      languages: seller.languages,
      skills: seller.skills,
      status: seller.status,
      primaryCategory: seller.categories[0]?.category || null,
      categories: seller.categories.map((sc) => sc.category),
      createdAt: seller.createdAt,
    }));
  }

  async searchSellers(filters: {
    searchQuery?: string;
    status?: string;
    categoryIds: string[];
    minRating?: number;
    maxRating?: number;
    minPrice?: number;
    maxPrice?: number;
    languages: string[];
    sort: string;
    page: number;
    limit: number;
    favoritesOnly?: boolean;
    userId?: string;
  }) {
    const {
      searchQuery,
      status,
      categoryIds,
      minRating,
      maxRating,
      minPrice,
      maxPrice,
      languages,
      sort,
      page,
      limit,
      favoritesOnly,
      userId,
    } = filters;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    // Status filter
    if (status && status !== 'all') {
      where.status = status;
    } else {
      where.status = 'ACTIVE'; // Default to active sellers
    }

    // Search query (search in title, description, bio, and user info)
    if (searchQuery) {
      where.OR = [
        { title: { contains: searchQuery, mode: 'insensitive' } },
        { description: { contains: searchQuery, mode: 'insensitive' } },
        { bio: { contains: searchQuery, mode: 'insensitive' } },
        { user: { 
          OR: [
            { username: { contains: searchQuery, mode: 'insensitive' } },
            { firstName: { contains: searchQuery, mode: 'insensitive' } },
            { lastName: { contains: searchQuery, mode: 'insensitive' } },
          ]
        }},
      ];
    }

    // Category filter
    if (categoryIds.length > 0) {
      where.categories = {
        some: {
          categoryId: {
            in: categoryIds,
          },
        },
      };
    }

    // Rating filter
    if (minRating !== undefined || maxRating !== undefined) {
      where.rating = {};
      if (minRating !== undefined) where.rating.gte = minRating;
      if (maxRating !== undefined) where.rating.lte = maxRating;
    }

    // Price filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.hourlyRate = {};
      if (minPrice !== undefined) where.hourlyRate.gte = minPrice;
      if (maxPrice !== undefined) where.hourlyRate.lte = maxPrice;
    }

    // Languages filter
    if (languages.length > 0) {
      where.languages = {
        hasSome: languages,
      };
    }

    // Favorites filter
    if (favoritesOnly && userId) {
      where.favorites = {
        some: {
          userId,
        },
      };
    }

    // Build order by clause
    let orderBy: any = {};
    switch (sort) {
      case 'rating':
        orderBy = [{ rating: 'desc' }, { reviewCount: 'desc' }];
        break;
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
      case 'price_asc':
        orderBy = { hourlyRate: 'asc' };
        break;
      case 'price_desc':
        orderBy = { hourlyRate: 'desc' };
        break;
      case 'popularity':
      default:
        orderBy = [{ reviewCount: 'desc' }, { rating: 'desc' }];
        break;
    }

    // Execute queries
    const [sellers, totalCount] = await Promise.all([
      this.prisma.sellerProfile.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
              avatar: true,
              email: true,
            },
          },
          categories: {
            include: {
              category: true,
            },
          },
          _count: {
            select: {
              reviews: true,
              favorites: userId ? {
                where: {
                  userId,
                },
              } : false,
            },
          },
        },
        orderBy,
        take: limit,
        skip,
      }),
      this.prisma.sellerProfile.count({ where }),
    ]);

    const formattedSellers = sellers.map((seller) => ({
      id: seller.id,
      userId: seller.user.id,
      username: seller.user.username,
      firstName: seller.user.firstName,
      lastName: seller.user.lastName,
      avatar: seller.user.avatar,
      title: seller.title,
      description: seller.description,
      bio: seller.bio,
      rating: seller.rating,
      reviewCount: seller.reviewCount,
      totalReviews: seller._count.reviews,
      hourlyRate: seller.hourlyRate,
      experience: seller.experience,
      location: seller.location,
      languages: seller.languages,
      skills: seller.skills,
      status: seller.status,
      primaryCategory: seller.categories[0]?.category || null,
      categories: seller.categories.map((sc) => sc.category),
      createdAt: seller.createdAt,
      isFavorited: userId ? seller._count.favorites > 0 : false,
    }));

    return {
      sellers: formattedSellers,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNextPage: page * limit < totalCount,
        hasPreviousPage: page > 1,
      },
    };
  }

  async addFavorite(userId: string, sellerId: string) {
    // Check if seller exists
    const seller = await this.prisma.sellerProfile.findUnique({
      where: { id: sellerId },
    });

    if (!seller) {
      throw new Error('Seller not found');
    }

    // Check if already favorited
    const existingFavorite = await this.prisma.favorite.findUnique({
      where: {
        userId_sellerId: {
          userId,
          sellerId,
        },
      },
    });

    if (existingFavorite) {
      return { message: 'Seller already in favorites', isFavorited: true };
    }

    // Add to favorites
    await this.prisma.favorite.create({
      data: {
        userId,
        sellerId,
      },
    });

    return { message: 'Seller added to favorites', isFavorited: true };
  }

  async removeFavorite(userId: string, sellerId: string) {
    // Check if favorite exists
    const favorite = await this.prisma.favorite.findUnique({
      where: {
        userId_sellerId: {
          userId,
          sellerId,
        },
      },
    });

    if (!favorite) {
      return { message: 'Seller not in favorites', isFavorited: false };
    }

    // Remove from favorites
    await this.prisma.favorite.delete({
      where: {
        id: favorite.id,
      },
    });

    return { message: 'Seller removed from favorites', isFavorited: false };
  }
}
