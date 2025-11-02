import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class HealthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async checkHealth() {
    const startTime = Date.now();
    
    const [databaseStatus, redisStatus] = await Promise.allSettled([
      this.prismaService.healthCheck(),
      this.redisService.isHealthy(),
    ]);

    const responseTime = Date.now() - startTime;

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database: databaseStatus.status === 'fulfilled' ? databaseStatus.value : false,
      redis: redisStatus.status === 'fulfilled' ? redisStatus.value : false,
      responseTime: `${responseTime}ms`,
    };
  }

  async checkReady() {
    const health = await this.checkHealth();
    return {
      ...health,
      ready: health.database && health.redis,
    };
  }
}