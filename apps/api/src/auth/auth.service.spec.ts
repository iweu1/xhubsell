import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail/mail.service';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { User, Role, Language } from '@prisma/client';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let configService: ConfigService;
  let mailService: MailService;

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

  const mockConfigService = {
    get: jest.fn((key: string) => {
      const config = {
        'JWT_SECRET': 'test-secret',
        'JWT_REFRESH_SECRET': 'test-refresh-secret',
        'JWT_EXPIRES_IN': '15m',
        'JWT_REFRESH_EXPIRES_IN': '7d',
      };
      return config[key];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findByEmail: jest.fn(),
            validatePassword: jest.fn(),
            findById: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: MailService,
          useValue: {
            sendWelcomeEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
    mailService = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user if credentials are valid', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser);
      jest.spyOn(usersService, 'validatePassword').mockResolvedValue(true);

      const result = await service.validateUser('test@example.com', 'password');

      expect(result).toEqual(mockUser);
      expect(usersService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(usersService.validatePassword).toHaveBeenCalledWith('password', 'hashedpassword');
    });

    it('should return null if user is not found', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

      const result = await service.validateUser('test@example.com', 'password');

      expect(result).toBeNull();
    });

    it('should return null if password is invalid', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser);
      jest.spyOn(usersService, 'validatePassword').mockResolvedValue(false);

      const result = await service.validateUser('test@example.com', 'wrongpassword');

      expect(result).toBeNull();
    });
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const registerDto = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'Password123!',
        firstName: 'Test',
        lastName: 'User',
        role: Role.CLIENT,
        language: Language.EN,
      };

      jest.spyOn(usersService, 'create').mockResolvedValue(mockUser);
      jest.spyOn(mailService, 'sendWelcomeEmail').mockResolvedValue();
      jest.spyOn(jwtService, 'sign').mockReturnValue('access-token');

      const result = await service.register(registerDto);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(usersService.create).toHaveBeenCalledWith(registerDto);
      expect(mailService.sendWelcomeEmail).toHaveBeenCalled();
    });

    it('should throw ConflictException for weak password', async () => {
      const registerDto = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'weak',
        role: Role.CLIENT,
      };

      await expect(service.register(registerDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'password',
      };

      jest.spyOn(service, 'validateUser' as any).mockResolvedValue(mockUser);
      jest.spyOn(jwtService, 'sign').mockReturnValue('access-token');

      const result = await service.login(loginDto);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      jest.spyOn(service, 'validateUser' as any).mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('refreshTokens', () => {
    it('should refresh tokens successfully', async () => {
      const refreshToken = 'valid-refresh-token';
      const payload = { sub: '1', email: 'test@example.com', role: Role.CLIENT };

      jest.spyOn(jwtService, 'verify').mockReturnValue(payload);
      jest.spyOn(usersService, 'findById').mockResolvedValue(mockUser);
      jest.spyOn(jwtService, 'sign').mockReturnValue('new-access-token');

      const result = await service.refreshTokens(refreshToken);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });

    it('should throw UnauthorizedException for invalid refresh token', async () => {
      const refreshToken = 'invalid-refresh-token';

      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(service.refreshTokens(refreshToken)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('validatePassword', () => {
    it('should validate strong password', () => {
      expect(() => {
        (service as any).validatePassword('Password123!');
      }).not.toThrow();
    });

    it('should throw ConflictException for short password', () => {
      expect(() => {
        (service as any).validatePassword('Short1!');
      }).toThrow(ConflictException);
    });

    it('should throw ConflictException for password without uppercase', () => {
      expect(() => {
        (service as any).validatePassword('password123!');
      }).toThrow(ConflictException);
    });

    it('should throw ConflictException for password without lowercase', () => {
      expect(() => {
        (service as any).validatePassword('PASSWORD123!');
      }).toThrow(ConflictException);
    });

    it('should throw ConflictException for password without numbers', () => {
      expect(() => {
        (service as any).validatePassword('Password!');
      }).toThrow(ConflictException);
    });

    it('should throw ConflictException for password without special characters', () => {
      expect(() => {
        (service as any).validatePassword('Password123');
      }).toThrow(ConflictException);
    });
  });
});