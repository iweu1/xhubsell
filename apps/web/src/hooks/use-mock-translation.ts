'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

// Simple mock translations
const translations: Record<string, Record<string, string>> = {
  en: {
    'hero:tagline': 'Your Trusted Marketplace',
    'hero:title': 'Connect with Sellers Worldwide',
    'hero:description': 'Discover and hire top-rated sellers for all your business needs',
    'hero:searchPlaceholder': 'Search for services...',
    'hero:searchButton': 'Search',
    'hero:browseCatalog': 'Browse Catalog',
    'hero:joinAsSeller': 'Join as Seller',
    'home:categories.title': 'Service Categories',
    'home:categories.description': 'Explore our wide range of professional services',
    'home:categories.browseCategory': 'Browse Category',
    'home:topSellers.title': 'Top Sellers',
    'home:topSellers.description': 'Meet our most trusted and highly-rated sellers',
    'home:topSellers.viewProfile': 'View Profile',
    'home:topSellers.avgRating': 'Avg Rating',
    'home:topSellers.completedOrders': 'Completed Orders',
    'home:stats.sellers': 'Active Sellers',
    'home:stats.products': 'Products',
    'home:stats.transactions': 'Transactions',
    'home:stats.customers': 'Customers',
    'home:features.modernTech': 'Modern Technology',
    'home:features.scalable': 'Scalable Platform',
    'home:features.secure': 'Secure & Reliable',
    'common:error.loadingFailed': 'Failed to load data',
  },
  ru: {
    'hero:tagline': 'Ваша надежная торговая площадка',
    'hero:title': 'Связывайтесь с продавцами по всему миру',
    'hero:description': 'Найдите и наймите лучших продавцов для всех ваших бизнес-нужд',
    'hero:searchPlaceholder': 'Поиск услуг...',
    'hero:searchButton': 'Поиск',
    'hero:browseCatalog': 'Просмотреть каталог',
    'hero:joinAsSeller': 'Стать продавцом',
    'home:categories.title': 'Категории услуг',
    'home:categories.description': 'Изучите наш широкий спектр профессиональных услуг',
    'home:categories.browseCategory': 'Просмотреть категорию',
    'home:topSellers.title': 'Топ продавцов',
    'home:topSellers.description': 'Познакомьтесь с нашими самыми надежными продавцами',
    'home:topSellers.viewProfile': 'Просмотреть профиль',
    'home:topSellers.avgRating': 'Средний рейтинг',
    'home:topSellers.completedOrders': 'Выполненные заказы',
    'home:stats.sellers': 'Активные продавцы',
    'home:stats.products': 'Товары',
    'home:stats.transactions': 'Транзакции',
    'home:stats.customers': 'Клиенты',
    'home:features.modernTech': 'Современные технологии',
    'home:features.scalable': 'Масштабируемая платформа',
    'home:features.secure': 'Безопасно и надежно',
    'common:error.loadingFailed': 'Не удалось загрузить данные',
  },
};

export function useMockTranslation() {
  const pathname = usePathname();

  const language = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];
    return ['en', 'ru'].includes(firstSegment) ? firstSegment : 'en';
  }, [pathname]);

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return {
    t,
    i18n: {
      language,
    },
  };
}
