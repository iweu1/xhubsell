import { Controller, Get, Post, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('banners')
@Controller('banners')
export class BannersController {
  @Get()
  @ApiOperation({ summary: 'Get banners' })
  @ApiQuery({ name: 'active', required: false, type: Boolean })
  @ApiQuery({ name: 'position', required: false, enum: ['top', 'inline', 'sidebar'] })
  async getBanners(@Query('active') active?: string, @Query('position') position?: string) {
    // Mock data for now - in real implementation this would come from database
    const mockBanners = [
      {
        id: '1',
        title: 'Premium Seller Program',
        description: 'Get verified and increase your visibility by 300%',
        imageUrl: 'https://picsum.photos/seed/banner1/800/200.jpg',
        link: '/premium',
        position: 'top',
        isActive: true,
        isExternal: false,
      },
      {
        id: '2',
        title: 'Mobile App Launch',
        description: 'Manage your business on the go with our new app',
        imageUrl: 'https://picsum.photos/seed/banner2/600/150.jpg',
        link: 'https://apps.apple.com',
        position: 'inline',
        isActive: true,
        isExternal: true,
      },
      {
        id: '3',
        title: 'Holiday Sale',
        description: '20% off all premium features this month',
        imageUrl: 'https://picsum.photos/seed/banner3/400/300.jpg',
        link: '/sale',
        position: 'sidebar',
        isActive: true,
        isExternal: false,
      },
      {
        id: '4',
        title: 'New Categories Added',
        description: 'Explore our expanded service categories',
        imageUrl: 'https://picsum.photos/seed/banner4/600/150.jpg',
        link: '/categories',
        position: 'inline',
        isActive: false,
        isExternal: false,
      },
    ];

    let filteredBanners = mockBanners;

    if (active === 'true') {
      filteredBanners = filteredBanners.filter((banner) => banner.isActive);
    }

    if (position) {
      filteredBanners = filteredBanners.filter((banner) => banner.position === position);
    }

    return filteredBanners;
  }

  @Post(':id/impression')
  @ApiOperation({ summary: 'Track banner impression' })
  @ApiParam({ name: 'id', description: 'Banner ID' })
  async trackImpression(@Param('id') id: string) {
    // Mock implementation - in real implementation this would track in database
    console.log(`Banner impression tracked for banner ID: ${id}`);

    return {
      success: true,
      message: 'Impression tracked successfully',
      bannerId: id,
      timestamp: new Date().toISOString(),
    };
  }
}
