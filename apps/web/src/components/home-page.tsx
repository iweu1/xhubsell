'use client';

import { useTranslation } from 'next-i18next';
import { LanguageSwitcher } from '@/components/language-switcher';

export function HomePage() {
  const { t } = useTranslation(['home', 'common']);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">{t('home:title')}</h1>
          <LanguageSwitcher />
        </div>
        <p className="text-center text-lg mb-8">{t('home:subtitle')}</p>
        <p className="text-center text-gray-600 mb-8">{t('home:description')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-3">{t('home:features.title')}</h2>
            <ul className="space-y-2">
              <li>✓ {t('home:features.modernTech')}</li>
              <li>✓ {t('home:features.scalable')}</li>
              <li>✓ {t('home:features.secure')}</li>
              <li>✓ {t('home:features.fast')}</li>
            </ul>
          </div>

          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Platform Stats</h2>
            <ul className="space-y-2">
              <li>📊 {t('home:stats.sellers')}: 1,234</li>
              <li>🛍️ {t('home:stats.products')}: 45,678</li>
              <li>💰 {t('home:stats.transactions')}: 89,012</li>
              <li>😊 {t('home:stats.customers')}: 234,567</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            {t('home:getStarted')}
          </button>
          <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            {t('home:learnMore')}
          </button>
        </div>
      </div>
    </main>
  );
}
