import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppShell } from '@/components/layout/app-shell';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'XHubSell',
  description: 'XHubSell - Your Trusted Marketplace Platform',
  icons: {
    icon: [
      { url: '/brand/favicons/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/brand/favicons/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/favicons/favicon.ico', sizes: 'any' }
    ],
    apple: '/brand/favicons/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
