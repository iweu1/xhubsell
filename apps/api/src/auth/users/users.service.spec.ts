import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { User, Role, Language, SellerStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    username: 'testuser',
    password: 'hashedpassword',
    firstName: 'Test',
    lastName: 'User',
    avatar: null,
    role: Role.CLIENT,
    language: Language.EN,
    createdAt: new Date(),
    updatedAt: new Date(),
    sellerProfile: null,
  };

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    sellerProfile: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password',
        firstName: 'Test',
        lastName: 'User',
        role: Role.CLIENT,
        language: Language.EN,
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
      jest.spyOn(bcrypt, 'hash' as any).mockResolvedValue('hashedpassword');
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(mockUser);

      const result = await service.create(userData);

      expect(result).toEqual(mockUser);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          ...userData,
          password: 'hashedpassword',
          role: Role.CLIENT,
          language: Language.EN,
        },
      });
    });

    it('should create a seller with profile', async () => {
      const userData = {
        email: 'seller@example.com',
        username: 'seller',
        password: 'password',
        role: Role.SELLER,
      };

      const sellerUser = { ...mockUser, id: '2', role: Role.SELLER };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
      jest.spyOn(bcrypt, 'hash' as any).mockResolvedValue('hashedpassword');
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(sellerUser);
      jest.spyOn(prismaService.sellerProfile, 'create').mockResolvedValue({} as any);

      const result = await service.create(userData);

      expect(prismaService.sellerProfile.create).toHaveBeenCalledWith({
        data: {
          userId: '2',
          title: 'seller',
          status: SellerStatus.PENDING_VERIFICATION,
        },
      });
    });

    it('should throw ConflictException if email already exists', async () => {
      const userData = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password',
      };

      jest.spyOn(prismaService.user, 'findUnique')
        .mockResolvedValueOnce(mockUser)
        .mockResolvedValueOnce(null);

      await expect(service.create(userData)).rejects.toThrow(ConflictException);
    });

    it('should throw ConflictException if username already exists', async () => {
      const userData = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password',
      };

      jest.spyOn(prismaService.user, 'findUnique')
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(mockUser);

      await expect(service.create(userData)).rejects.toThrow(ConflictException);
    });
  });

  describe('findById', () => {
    it('should return user by id', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      const result = await service.findById('1');

      expect(result).toEqual(mockUser);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { sellerProfile: true },
      });
    });

    it('should return null if user not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      const result = await service.findById('999');

      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should return user by email', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      const result = await service.findByEmail('test@example.com');

      expect(result).toEqual(mockUser);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        include: { sellerProfile: true },
      });
    });
  });

  describe('findByUsername', () => {
    it('should return user by username', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      const result = await service.findByUsername('testuser');

      expect(result).toEqual(mockUser);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { username: 'testuser' },
        include: { sellerProfile: true },
      });
    });
  });

  describe('update', () => {
    it('should update user successfully', async () => {
      const updateData = { firstName: 'Updated' };
      const updatedUser = { ...mockUser, firstName: 'Updated' };

      jest.spyOn(prismaService.user, 'update').mockResolvedValue(updatedUser);

      const result = await service.update('1', updateData);

      expect(result).toEqual(updatedUser);
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateData,
        include: { sellerProfile: true },
      });
    });

    it('should hash password if provided', async () => {
      const updateData = { password: 'newpassword' };

      jest.spyOn(bcrypt, 'hash' as any).mockResolvedValue('newhashedpassword');
      jest.spyOn(prismaService.user, 'update').mockResolvedValue(mockUser);

      await service.update('1', updateData);

      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword', 10);
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { password: 'newhashedpassword' },
        include: { sellerProfile: true },
      });
    });
  });

  describe('updateRole', () => {
    it('should update user role successfully', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(mockUser);
      jest.spyOn(service, 'update').mockResolvedValue(mockUser);

      const result = await service.updateRole('1', Role.ADMIN);

      expect(result).toEqual(mockUser);
      expect(service.update).toHaveBeenCalledWith('1', { role: Role.ADMIN });
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(null);

      await expect(service.updateRole('999', Role.ADMIN)).rejects.toThrow(NotFoundException);
    });

    it('should create seller profile when role changed to SELLER', async () => {
      const userWithoutProfile = { ...mockUser, sellerProfile: null };
      const userWithProfile = { ...userWithoutProfile, sellerProfile: { id: 'profile1' } };

      jest.spyOn(service, 'findById').mockResolvedValue(userWithoutProfile);
      jest.spyOn(service, 'update').mockResolvedValue(userWithProfile);
      jest.spyOn(prismaService.sellerProfile, 'create').mockResolvedValue({} as any);

      await service.updateRole('1', Role.SELLER);

      expect(prismaService.sellerProfile.create).toHaveBeenCalledWith({
        data: {
          userId: '1',
          title: 'Test User',
          status: SellerStatus.PENDING_VERIFICATION,
        },
      });
    });
  });

  describe('validatePassword', () => {
    it('should return true for valid password', async () => {
      jest.spyOn(bcrypt, 'compare' as any).mockResolvedValue(true);

      const result = await service.validatePassword('password', 'hashedpassword');

      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedpassword');
    });

    it('should return false for invalid password', async () => {
      jest.spyOn(bcrypt, 'compare' as any).mockResolvedValue(false);

      const result = await service.validatePassword('wrongpassword', 'hashedpassword');

      expect(result).toBe(false);
    });
  });
});