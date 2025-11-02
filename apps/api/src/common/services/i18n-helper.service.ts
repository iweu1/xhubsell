import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class I18nHelperService {
  constructor(private readonly i18n: I18nService) {}

  async translate(
    key: string,
    options?: { lang?: string; args?: Record<string, any> }
  ): Promise<string> {
    const lang = options?.lang || 'en';
    return this.i18n.t(key, { lang, args: options?.args });
  }

  async translateWithFallback(
    key: string,
    fallback: string,
    options?: { lang?: string; args?: Record<string, any> }
  ): Promise<string> {
    try {
      const translation = await this.translate(key, options);
      return translation;
    } catch (error) {
      return fallback;
    }
  }

  async translateValidationMessage(
    validationKey: string,
    field?: string,
    options?: { lang?: string; args?: Record<string, any> }
  ): Promise<string> {
    const key = `validation.${validationKey}`;
    const args = { field, ...options?.args };
    return this.translate(key, { lang: options?.lang, args });
  }

  async translateErrorMessage(
    errorKey: string,
    options?: { lang?: string; args?: Record<string, any> }
  ): Promise<string> {
    const key = `common.${errorKey}`;
    return this.translate(key, options);
  }

  async translateSuccessMessage(
    successKey: string,
    options?: { lang?: string; args?: Record<string, any> }
  ): Promise<string> {
    const key = `success.${successKey}`;
    return this.translate(key, options);
  }

  async translateAuthMessage(
    authKey: string,
    options?: { lang?: string; args?: Record<string, any> }
  ): Promise<string> {
    const key = `auth.${authKey}`;
    return this.translate(key, options);
  }

  getLanguageFromContext(context?: I18nContext): Promise<string> {
    return Promise.resolve(context?.lang || 'en');
  }

  async createLocalizedMessage(
    messageKey: string,
    namespace: string,
    options?: { lang?: string; args?: Record<string, any> }
  ): Promise<string> {
    const key = `${namespace}.${messageKey}`;
    return this.translate(key, options);
  }
}
