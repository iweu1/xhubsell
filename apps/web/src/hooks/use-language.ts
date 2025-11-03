'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export function useLanguage() {
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

  // Detect current language from pathname
  const currentLanguage = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];
    return ['en', 'ru'].includes(firstSegment) ? firstSegment : 'en';
  }, [pathname]);

  const isRTL = ['ar', 'he', 'fa'].includes(currentLanguage);

  return {
    currentLanguage,
    changeLanguage,
    isRTL,
    supportedLanguages: ['en', 'ru'],
  };
}
