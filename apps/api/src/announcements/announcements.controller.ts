import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('announcements')
@Controller('announcements')
export class AnnouncementsController {
  @Get()
  @ApiOperation({ summary: 'Get announcements' })
  @ApiQuery({ name: 'active', required: false, type: Boolean })
  async getAnnouncements(@Query('active') active?: string) {
    // Mock data for now - in real implementation this would come from database
    const mockAnnouncements = [
      {
        id: '1',
        text: '🎉 New feature launched: Advanced seller analytics dashboard is now available!',
        link: '/analytics',
        priority: 'high',
        isActive: true,
      },
      {
        id: '2',
        text: '📢 Join our webinar: "Growing your business on XHubSell" - Register now!',
        link: 'https://webinar.xhubsell.com',
        priority: 'medium',
        isActive: true,
      },
      {
        id: '3',
        text: '🛡️ Enhanced security features added to protect your transactions',
        priority: 'high',
        isActive: true,
      },
      {
        id: '4',
        text: '🌟 Seller of the month: TechPro Solutions - Check out their amazing services!',
        link: '/sellers/techpro-solutions',
        priority: 'low',
        isActive: false,
      },
    ];

    let filteredAnnouncements = mockAnnouncements;

    if (active === 'true') {
      filteredAnnouncements = mockAnnouncements.filter((announcement) => announcement.isActive);
    }

    return filteredAnnouncements.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }
}
