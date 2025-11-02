import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  @Get('stats')
  @ApiOperation({ summary: 'Get platform statistics' })
  async getPlatformStats() {
    // Mock data for now - in real implementation this would come from database
    // Calculate platform years since 2020
    const currentYear = new Date().getFullYear();
    const platformYears = currentYear - 2020;

    return {
      totalSellers: 1234,
      totalOrders: 89012,
      activeClients: 234567,
      platformYears: platformYears,
    };
  }
}
