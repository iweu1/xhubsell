import { Metadata } from 'next';

interface HomePageProps {
  params: {
    locale: string;
  };
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export const metadata: Metadata = {
  title: 'Welcome to XHubSell',
  description: 'Connect with sellers and buyers worldwide.',
};

export default function Home({ params: { locale } }: HomePageProps) {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">
          {locale === 'ru' ? 'Добро пожаловать в XHubSell' : 'Welcome to XHubSell'}
        </h1>
        <p className="text-center text-muted-foreground">
          {locale === 'ru' ? 'Связывайтесь с продавцами и покупателями по всему миру.' : 'Connect with sellers and buyers worldwide.'}
        </p>
      </div>
    </div>
  );
}
