'use client';

import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function I18nProvider({ children }: ProvidersProps) {
  return <>{children}</>;
}
