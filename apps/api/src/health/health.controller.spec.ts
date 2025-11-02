import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let controller: HealthController;
  let healthService: HealthService;

  beforeEach(async () => {
    const mockHealthService = {
      checkHealth: jest.fn().mockResolvedValue({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: 123,
        version: '1.0.0',
        environment: 'test',
        database: true,
        redis: true,
        responseTime: '5ms',
      }),
      checkReady: jest.fn().mockResolvedValue({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: 123,
        version: '1.0.0',
        environment: 'test',
        database: true,
        redis: true,
        responseTime: '5ms',
        ready: true,
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: mockHealthService,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    healthService = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return health status', async () => {
    const result = await controller.health();
    expect(result).toHaveProperty('status', 'ok');
    expect(result).toHaveProperty('database');
    expect(result).toHaveProperty('redis');
    expect(healthService.checkHealth).toHaveBeenCalled();
  });

  it('should return ready status', async () => {
    const result = await controller.ready();
    expect(result).toHaveProperty('status', 'ok');
    expect(result).toHaveProperty('ready', true);
    expect(healthService.checkReady).toHaveBeenCalled();
  });
});