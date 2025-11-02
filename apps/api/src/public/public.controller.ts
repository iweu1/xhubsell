import { Controller, Get, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Public } from '../auth/decorators/public.decorator';
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
}
