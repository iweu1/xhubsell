import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Put,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@ApiTags('seller')
@Controller('seller')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class SellerController {
  @Get('profile')
  @Roles(Role.SELLER)
  @ApiOperation({ summary: 'Get seller profile' })
  @ApiResponse({ status: 200, description: 'Seller profile retrieved successfully' })
  @ApiResponse({ status: 403, description: 'Seller access required' })
  async getProfile(@CurrentUser() user: any) {
    return {
      message: 'Seller profile',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        sellerProfile: user.sellerProfile,
      },
    };
  }

  @Put('profile')
  @Roles(Role.SELLER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update seller profile' })
  @ApiResponse({ status: 200, description: 'Seller profile updated successfully' })
  @ApiResponse({ status: 403, description: 'Seller access required' })
  async updateProfile(
    @Body() body: any,
    @CurrentUser() user: any,
  ) {
    // Placeholder for profile update logic
    return {
      message: 'Seller profile updated successfully',
      userId: user.id,
      profile: body,
    };
  }

  @Get('services')
  @Roles(Role.SELLER)
  @ApiOperation({ summary: 'Get seller services' })
  @ApiResponse({ status: 200, description: 'Seller services retrieved successfully' })
  @ApiResponse({ status: 403, description: 'Seller access required' })
  async getServices(@CurrentUser() user: any) {
    return {
      message: 'Seller services',
      services: [],
      userId: user.id,
    };
  }

  @Post('services')
  @Roles(Role.SELLER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new service' })
  @ApiResponse({ status: 201, description: 'Service created successfully' })
  @ApiResponse({ status: 403, description: 'Seller access required' })
  async createService(
    @Body() body: any,
    @CurrentUser() user: any,
  ) {
    // Placeholder for service creation logic
    return {
      message: 'Service created successfully',
      service: body,
      sellerId: user.id,
    };
  }

  @Get('analytics')
  @Roles(Role.SELLER)
  @ApiOperation({ summary: 'Get seller analytics' })
  @ApiResponse({ status: 200, description: 'Seller analytics retrieved successfully' })
  @ApiResponse({ status: 403, description: 'Seller access required' })
  async getAnalytics(@CurrentUser() user: any) {
    return {
      message: 'Seller analytics',
      userId: user.id,
      analytics: {
        views: 0,
        inquiries: 0,
        bookings: 0,
        revenue: 0,
      },
    };
  }
}