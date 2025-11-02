import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@ApiTags('client')
@Controller('client')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ClientController {
  @Get('profile')
  @Roles(Role.CLIENT)
  @ApiOperation({ summary: 'Get client profile' })
  @ApiResponse({ status: 200, description: 'Client profile retrieved successfully' })
  @ApiResponse({ status: 403, description: 'Client access required' })
  async getProfile(@CurrentUser() user: any) {
    return {
      message: 'Client profile',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  @Get('favorites')
  @Roles(Role.CLIENT)
  @ApiOperation({ summary: 'Get client favorites' })
  @ApiResponse({ status: 200, description: 'Client favorites retrieved successfully' })
  @ApiResponse({ status: 403, description: 'Client access required' })
  async getFavorites(@CurrentUser() user: any) {
    return {
      message: 'Client favorites',
      favorites: [],
      userId: user.id,
    };
  }

  @Post('favorites/:sellerId')
  @Roles(Role.CLIENT)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add seller to favorites' })
  @ApiResponse({ status: 201, description: 'Seller added to favorites successfully' })
  @ApiResponse({ status: 403, description: 'Client access required' })
  async addToFavorites(
    @Param('sellerId') sellerId: string,
    @CurrentUser() user: any,
  ) {
    // Placeholder for adding to favorites logic
    return {
      message: 'Seller added to favorites successfully',
      sellerId,
      userId: user.id,
    };
  }

  @Get('bookings')
  @Roles(Role.CLIENT)
  @ApiOperation({ summary: 'Get client bookings' })
  @ApiResponse({ status: 200, description: 'Client bookings retrieved successfully' })
  @ApiResponse({ status: 403, description: 'Client access required' })
  async getBookings(@CurrentUser() user: any) {
    return {
      message: 'Client bookings',
      bookings: [],
      userId: user.id,
    };
  }

  @Get('search')
  @Roles(Role.CLIENT)
  @ApiOperation({ summary: 'Search sellers' })
  @ApiResponse({ status: 200, description: 'Sellers retrieved successfully' })
  @ApiResponse({ status: 403, description: 'Client access required' })
  async searchSellers() {
    return {
      message: 'Search results',
      sellers: [],
    };
  }
}