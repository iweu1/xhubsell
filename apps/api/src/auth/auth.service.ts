import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users/users.service';
import { User, Role, Language } from '@prisma/client';
import { MailService } from './mail/mail.service';

export interface RegisterDto {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
  language?: Language;
  sellerProfile?: {
    title: string;
    description?: string;
    bio?: string;
    hourlyRate?: number;
    experience?: number;
    location?: string;
    languages?: string[];
    skills?: string[];
  };
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && await this.usersService.validatePassword(password, user.password)) {
      return user;
    }
    return null;
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    // Validate password strength
    this.validatePassword(registerDto.password);

    const user = await this.usersService.create({
      email: registerDto.email,
      username: registerDto.username,
      password: registerDto.password,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      role: registerDto.role,
      language: registerDto.language,
    });

    // Seller profile is automatically created in UsersService.create for SELLER role

    // Send welcome email
    await this.mailService.sendWelcomeEmail(user.email, user.firstName);

    const tokens = await this.generateTokens(user);
    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      ...tokens,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user);
    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      ...tokens,
    };
  }

  async refreshTokens(refreshToken: string): Promise<AuthResponse> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.usersService.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const tokens = await this.generateTokens(user);
      const { password, ...userWithoutPassword } = user;

      return {
        user: userWithoutPassword,
        ...tokens,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string): Promise<void> {
    // In a real implementation, you might want to invalidate the token
    // by storing it in a blacklist in Redis
    // For now, we'll just return success
    // await this.redisService.del(`refresh_token:${userId}`);
  }

  private async generateTokens(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d') as any,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private validatePassword(password: string): void {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      throw new ConflictException('Password must be at least 8 characters long');
    }

    if (!hasUpperCase) {
      throw new ConflictException('Password must contain at least one uppercase letter');
    }

    if (!hasLowerCase) {
      throw new ConflictException('Password must contain at least one lowercase letter');
    }

    if (!hasNumbers) {
      throw new ConflictException('Password must contain at least one number');
    }

    if (!hasSpecialChar) {
      throw new ConflictException('Password must contain at least one special character');
    }
  }
}