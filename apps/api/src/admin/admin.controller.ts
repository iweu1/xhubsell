import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@ApiTags('admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AdminController {
  @Get('dashboard')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get admin dashboard data' })
  @ApiResponse({ status: 200, description: 'Dashboard data retrieved successfully' })
  @ApiResponse({ status: 403, description: 'Admin access required' })
  async getDashboard(@CurrentUser() user: any) {
    return {
      message: 'Admin dashboard data',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      stats: {
        totalUsers: 0,
        totalSellers: 0,
        totalRevenue: 0,
      },
    };
  }

  @Get('users')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  @ApiResponse({ status: 403, description: 'Admin access required' })
  async getUsers() {
    // Placeholder for user management logic
    return {
      message: 'List of all users',
      users: [],
    };
  }

  @Post('users/:id/role')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user role' })
  @ApiResponse({ status: 200, description: 'User role updated successfully' })
  @ApiResponse({ status: 403, description: 'Admin access required' })
  async updateUserRole(
    @Body() body: { userId: string; role: Role },
    @CurrentUser() user: any,
  ) {
    // Placeholder for role update logic
    return {
      message: 'User role updated successfully',
      userId: body.userId,
      newRole: body.role,
      updatedBy: user.id,
    };
  }
}