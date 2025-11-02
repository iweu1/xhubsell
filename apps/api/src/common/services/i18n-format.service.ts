import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class I18nFormatService {
  constructor(private readonly i18n: I18nService) {}

  async formatDate(
    date: Date,
    language: string = 'en',
    options?: Intl.DateTimeFormatOptions
  ): Promise<string> {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options,
    };

    return new Intl.DateTimeFormat(language, defaultOptions).format(date);
  }

  async formatTime(
    date: Date,
    language: string = 'en',
    options?: Intl.DateTimeFormatOptions
  ): Promise<string> {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      ...options,
    };

    return new Intl.DateTimeFormat(language, defaultOptions).format(date);
  }

  async formatDateTime(
    date: Date,
    language: string = 'en',
    options?: Intl.DateTimeFormatOptions
  ): Promise<string> {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      ...options,
    };

    return new Intl.DateTimeFormat(language, defaultOptions).format(date);
  }

  async formatCurrency(
    amount: number,
    currency: string = 'USD',
    language: string = 'en'
  ): Promise<string> {
    return new Intl.NumberFormat(language, {
      style: 'currency',
      currency,
    }).format(amount);
  }

  async formatNumber(
    number: number,
    language: string = 'en',
    options?: Intl.NumberFormatOptions
  ): Promise<string> {
    return new Intl.NumberFormat(language, options).format(number);
  }

  async formatRelativeTime(
    value: number,
    unit: Intl.RelativeTimeFormatUnit,
    language: string = 'en'
  ): Promise<string> {
    const rtf = new Intl.RelativeTimeFormat(language, { numeric: 'auto' });
    return rtf.format(value, unit);
  }

  async formatFileSize(bytes: number, language: string = 'en'): Promise<string> {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    const formattedNumber = await this.formatNumber(size, language, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    });

    return `${formattedNumber} ${units[unitIndex]}`;
  }

  async getUserLanguageFromRequest(request: any): Promise<string> {
    // Try to get language from user preference (if authenticated)
    if (request.user && request.user.language) {
      return request.user.language;
    }

    // Try to get language from Accept-Language header
    const acceptLanguage = request.headers['accept-language'];
    if (acceptLanguage) {
      const preferredLang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();

      if (['en', 'ru'].includes(preferredLang)) {
        return preferredLang;
      }
    }

    // Try to get language from query parameter
    const queryLang = request.query?.lang;
    if (queryLang && ['en', 'ru'].includes(queryLang)) {
      return queryLang;
    }

    // Try to get language from custom header
    const headerLang = request.headers['x-lang'];
    if (headerLang && ['en', 'ru'].includes(headerLang)) {
      return headerLang;
    }

    return 'en'; // fallback to English
  }
}
