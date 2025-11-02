import { Test, TestingModule } from '@nestjs/testing';
import { I18nService } from 'nestjs-i18n';
import { I18nHelperService } from '../common/services/i18n-helper.service';

describe('I18nHelperService', () => {
  let service: I18nHelperService;
  let i18nService: I18nService;

  beforeEach(async () => {
    const mockI18nService = {
      t: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        I18nHelperService,
        {
          provide: I18nService,
          useValue: mockI18nService,
        },
      ],
    }).compile();

    service = module.get<I18nHelperService>(I18nHelperService);
    i18nService = module.get<I18nService>(I18nService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should translate validation messages', async () => {
    const mockTranslation = 'This field is required';
    i18nService.t = jest.fn().mockResolvedValue(mockTranslation);

    const result = await service.translateValidationMessage('required', 'email', { lang: 'en' });

    expect(i18nService.t).toHaveBeenCalledWith('validation.required', {
      lang: 'en',
      args: { field: 'email' },
    });
    expect(result).toBe(mockTranslation);
  });

  it('should translate error messages', async () => {
    const mockTranslation = 'Internal server error occurred';
    i18nService.t = jest.fn().mockResolvedValue(mockTranslation);

    const result = await service.translateErrorMessage('serverError', { lang: 'en' });

    expect(i18nService.t).toHaveBeenCalledWith('common.serverError', { lang: 'en' });
    expect(result).toBe(mockTranslation);
  });

  it('should translate auth messages', async () => {
    const mockTranslation = 'Invalid email or password';
    i18nService.t = jest.fn().mockResolvedValue(mockTranslation);

    const result = await service.translateAuthMessage('invalidCredentials', { lang: 'en' });

    expect(i18nService.t).toHaveBeenCalledWith('auth.invalidCredentials', { lang: 'en' });
    expect(result).toBe(mockTranslation);
  });

  it('should handle translation with arguments', async () => {
    const mockTranslation = 'Field must be at least 8 characters long';
    i18nService.t = jest.fn().mockResolvedValue(mockTranslation);

    const result = await service.translate('validation.minLength', {
      lang: 'en',
      args: { min: 8 },
    });

    expect(i18nService.t).toHaveBeenCalledWith('validation.minLength', {
      lang: 'en',
      args: { min: 8 },
    });
    expect(result).toBe(mockTranslation);
  });
});
