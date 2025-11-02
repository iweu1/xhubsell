import { Test, TestingModule } from '@nestjs/testing';
import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Role } from '@prisma/client';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  const mockReflector = {
    getAllAndOverride: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useValue: mockReflector,
        },
      ],
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true if no roles are required', () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({}),
        }),
        getHandler: () => ({}),
        getClass: () => ({}),
      } as ExecutionContext;

      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(null);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should return true if user has required role', () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            user: { role: Role.ADMIN },
          }),
        }),
        getHandler: () => ({}),
        getClass: () => ({}),
      } as ExecutionContext;

      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.ADMIN]);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should return false if user does not have required role', () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            user: { role: Role.CLIENT },
          }),
        }),
        getHandler: () => ({}),
        getClass: () => ({}),
      } as ExecutionContext;

      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.ADMIN]);

      const result = guard.canActivate(context);

      expect(result).toBe(false);
    });

    it('should return true if user has one of multiple required roles', () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            user: { role: Role.SELLER },
          }),
        }),
        getHandler: () => ({}),
        getClass: () => ({}),
      } as ExecutionContext;

      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.ADMIN, Role.SELLER]);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should return false if no user in request', () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({}),
        }),
        getHandler: () => ({}),
        getClass: () => ({}),
      } as ExecutionContext;

      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.ADMIN]);

      const result = guard.canActivate(context);

      expect(result).toBe(false);
    });
  });
});