import { Metadata } from 'next';
import { SEOTags } from '@/components/seo/seo';
import { CatalogPage } from '@/components/catalog/catalog-page';

interface CatalogPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export async function generateMetadata({ params: { locale } }: CatalogPageProps): Promise<Metadata> {
  return {
    title: locale === 'ru' ? 'Каталог - XHubSell' : 'Catalog - XHubSell',
    description: locale === 'ru'
      ? 'Просмотрите наш обширный каталог продавцов со всего мира.'
      : 'Browse our extensive catalog of sellers from around the world.',
  };
}

export default function CatalogPageClient({ params: { locale }, searchParams }: CatalogPageProps) {
  const searchQuery = searchParams.q as string;

  return (
    <>
      <SEOTags
        title={locale === 'ru' ? 'Каталог - XHubSell' : 'Catalog - XHubSell'}
        description={locale === 'ru'
          ? 'Просмотрите наш обширный каталог продавцов со всего мира.'
          : 'Browse our extensive catalog of sellers from around the world.'
        }
      />
      <CatalogPage locale={locale} />
    </>
  );
}
