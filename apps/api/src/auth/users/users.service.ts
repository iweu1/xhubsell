import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User, Role, Language, SellerStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userData: {
    email: string;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role?: Role;
    language?: Language;
  }): Promise<User> {
    const existingUser = await this.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const existingUsername = await this.findByUsername(userData.username);
    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        role: userData.role || Role.CLIENT,
        language: userData.language || Language.EN,
      },
    });

    // If user is a seller, create seller profile
    if (userData.role === Role.SELLER) {
      await this.prisma.sellerProfile.create({
        data: {
          userId: user.id,
          title: `${user.firstName} ${user.lastName}`.trim() || user.username,
          status: SellerStatus.PENDING_VERIFICATION,
        },
      });
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        sellerProfile: true,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        sellerProfile: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        sellerProfile: true,
      },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
      include: {
        sellerProfile: true,
      },
    });
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: userData,
      include: {
        sellerProfile: true,
      },
    });
  }

  async remove(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async updateRole(id: string, role: Role): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // If changing to seller role and no seller profile exists, create one
    if (role === Role.SELLER && !user.sellerProfile) {
      await this.prisma.sellerProfile.create({
        data: {
          userId: id,
          title: `${user.firstName} ${user.lastName}`.trim() || user.username,
          status: SellerStatus.PENDING_VERIFICATION,
        },
      });
    }

    return this.update(id, { role });
  }

  async updateLanguage(id: string, language: Language): Promise<User> {
    return this.update(id, { language });
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}