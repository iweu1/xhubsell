import { I18nOptions } from 'nestjs-i18n';
import { QueryResolver, HeaderResolver, AcceptLanguageResolver } from 'nestjs-i18n';

export const i18nConfig: I18nOptions = {
  fallbackLanguage: 'en',
  loaderOptions: {
    path: 'src/i18n/',
    watch: true,
  },
  resolvers: [
    new QueryResolver(['lang']),
    AcceptLanguageResolver,
    new HeaderResolver(['x-lang']),
  ],
};
