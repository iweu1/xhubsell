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
}
