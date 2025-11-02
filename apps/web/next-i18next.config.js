module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
    localePath: './public/locales',
    localeDetection: true,
    reloadOnPrerender: process.env.NODE_ENV === 'development',
  },
};
