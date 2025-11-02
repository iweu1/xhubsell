import { I18nOptions } from 'nestjs-i18n';

export const i18nConfig: I18nOptions = {
  fallbackLanguage: 'en',
  loaderOptions: {
    path: 'dist/i18n/',
    watch: true,
  },
  resolvers: [
    {
      use: ['query', 'header'],
      options: ['lang'],
    },
    {
      use: 'header',
      options: ['x-lang'],
    },
  ],
};
