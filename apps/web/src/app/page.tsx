import { Metadata } from 'next';
import { HomePage } from '@/components/home-page';
import { generateMetadata } from '@/components/seo/seo';
import { AppShell } from '@/components/layout/app-shell';

export const metadata: Metadata = generateMetadata({
  title: 'Welcome to XHubSell',
  description: 'Connect with sellers and buyers worldwide. Experience seamless commerce with innovative solutions designed for modern marketplaces.',
  keywords: 'marketplace, e-commerce, sellers, buyers, online shopping, trusted sellers',
});

export default function Home() {
  return (
    <AppShell showSidebar={true}>
      <HomePage />
    </AppShell>
  );
}
