'use client';

import { useTranslation } from 'next-i18next';
import { useCallback } from 'react';

export function useLocalizedFormat() {
  const { i18n } = useTranslation();

  const formatDate = useCallback(
    (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return new Intl.DateTimeFormat(i18n.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options,
      }).format(dateObj);
    },
    [i18n.language]
  );

  const formatTime = useCallback(
    (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return new Intl.DateTimeFormat(i18n.language, {
        hour: '2-digit',
        minute: '2-digit',
        ...options,
      }).format(dateObj);
    },
    [i18n.language]
  );

  const formatDateTime = useCallback(
    (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return new Intl.DateTimeFormat(i18n.language, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        ...options,
      }).format(dateObj);
    },
    [i18n.language]
  );

  const formatCurrency = useCallback(
    (amount: number, currency: string = 'USD') => {
      return new Intl.NumberFormat(i18n.language, {
        style: 'currency',
        currency,
      }).format(amount);
    },
    [i18n.language]
  );

  const formatNumber = useCallback(
    (number: number, options?: Intl.NumberFormatOptions) => {
      return new Intl.NumberFormat(i18n.language, options).format(number);
    },
    [i18n.language]
  );

  const formatRelativeTime = useCallback(
    (value: number, unit: Intl.RelativeTimeFormatUnit) => {
      const rtf = new Intl.RelativeTimeFormat(i18n.language, { numeric: 'auto' });
      return rtf.format(value, unit);
    },
    [i18n.language]
  );

  return {
    formatDate,
    formatTime,
    formatDateTime,
    formatCurrency,
    formatNumber,
    formatRelativeTime,
  };
}
