import { Controller, Get, Post, Delete, Query, Param, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Public } from '../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PublicService } from './public.service';

@ApiTags('public')
@Controller('public')
export class PublicController {
  constructor(
    private readonly publicService: PublicService,
    @I18n() private readonly i18n: I18nContext
  ) {}

  @Get('categories')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all categories with seller counts' })
  @ApiResponse({ status: 200, description: 'Categories retrieved successfully' })
  async getCategories(@I18n() i18n: I18nContext) {
    return this.publicService.getCategoriesWithSellerCounts();
  }

  @Get('sellers/top')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get top sellers by rating' })
  @ApiResponse({ status: 200, description: 'Top sellers retrieved successfully' })
  async getTopSellers(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 8;
    const offsetNum = offset ? parseInt(offset, 10) : 0;

    return this.publicService.getTopSellers(limitNum, offsetNum);
  }

  @Get('catalog/search')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Search sellers with filters and sorting' })
  @ApiResponse({ status: 200, description: 'Sellers retrieved successfully' })
  async searchSellers(
    @Query('q') searchQuery?: string,
    @Query('status') status?: string,
    @Query('category') categoryIds?: string,
    @Query('minRating') minRating?: string,
    @Query('maxRating') maxRating?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('languages') languages?: string,
    @Query('sort') sort?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('favoritesOnly') favoritesOnly?: string,
    @Query('userId') userId?: string,
  ) {
    const filters = {
      searchQuery,
      status,
      categoryIds: categoryIds ? categoryIds.split(',') : [],
      minRating: minRating ? parseFloat(minRating) : undefined,
      maxRating: maxRating ? parseFloat(maxRating) : undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      languages: languages ? languages.split(',') : [],
      sort: sort || 'popularity',
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 12,
      favoritesOnly: favoritesOnly === 'true',
      userId,
    };

    return this.publicService.searchSellers(filters);
  }

  @Post('favorites/:sellerId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Add seller to favorites' })
  @ApiResponse({ status: 200, description: 'Seller added to favorites successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async addFavorite(
    @Param('sellerId') sellerId: string,
    @CurrentUser() user: any,
  ) {
    return this.publicService.addFavorite(user.id, sellerId);
  }

  @Delete('favorites/:sellerId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove seller from favorites' })
  @ApiResponse({ status: 200, description: 'Seller removed from favorites successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async removeFavorite(
    @Param('sellerId') sellerId: string,
    @CurrentUser() user: any,
  ) {
    return this.publicService.removeFavorite(user.id, sellerId);
  }
}
