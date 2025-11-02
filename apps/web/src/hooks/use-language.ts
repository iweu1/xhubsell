'use client';

import { useTranslation } from 'next-i18next';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export function useLanguage() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = useCallback(
    (locale: string) => {
      if (typeof window !== 'undefined') {
        document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
      }

      // Get the current path without the locale
      const segments = pathname.split('/').filter(Boolean);
      const currentLocale = segments[0];

      let newPath;
      if (['en', 'ru'].includes(currentLocale)) {
        // Replace current locale with new one
        segments[0] = locale;
        newPath = '/' + segments.join('/');
      } else {
        // Add locale to beginning
        newPath = `/${locale}${pathname}`;
      }

      router.push(newPath);
    },
    [router, pathname]
  );

  const currentLanguage = i18n.language;
  const isRTL = ['ar', 'he', 'fa'].includes(currentLanguage);

  return {
    currentLanguage,
    changeLanguage,
    isRTL,
    supportedLanguages: ['en', 'ru'],
  };
}
