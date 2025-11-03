import { Metadata } from 'next';

interface CatalogPageProps {
  params: {
    locale: string;
  };
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export async function generateMetadata({
  params: { locale },
}: CatalogPageProps): Promise<Metadata> {
  return {
    title: locale === 'ru' ? 'Каталог - XHubSell' : 'Catalog - XHubSell',
    description:
      locale === 'ru'
        ? 'Просмотрите наш обширный каталог продавцов со всего мира.'
        : 'Browse our extensive catalog of sellers from around the world.',
  };
}

export default function CatalogPageClient({ params: { locale } }: CatalogPageProps) {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">
          {locale === 'ru' ? 'Каталог' : 'Catalog'}
        </h1>
        <p className="text-center text-muted-foreground">
          {locale === 'ru' 
            ? 'Просмотрите наш обширный каталог продавцов со всего мира.' 
            : 'Browse our extensive catalog of sellers from around the world.'
          }
        </p>
      </div>
    </div>
  );
}
