import { Metadata } from 'next';
import { SEOTags } from '@/components/seo/seo';

interface CatalogPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    q?: string;
  };
}

export const metadata: Metadata = {
  title: 'Catalog - XHubSell',
  description: 'Browse our extensive catalog of products from trusted sellers worldwide.',
};

export default function CatalogPage({ params: { locale }, searchParams }: CatalogPageProps) {
  const searchQuery = searchParams.q || '';

  return (
    <div className="container py-8">
      <SEOTags
        title="Catalog - XHubSell"
        description="Browse our extensive catalog of products from trusted sellers worldwide."
      />
      <div className="max-w-4xl mx-auto text-center py-16">
        <h1 className="text-3xl font-bold mb-4">Catalog</h1>
        <p className="text-muted-foreground mb-8">
          Browse our extensive catalog of products from trusted sellers worldwide.
        </p>
        {searchQuery && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-800">
              Searching for: <strong>"{searchQuery}"</strong>
            </p>
          </div>
        )}
        <div className="bg-muted rounded-lg p-8">
          <p className="text-sm text-muted-foreground">
            Catalog page will be implemented with product listings, filters, and search functionality.
          </p>
        </div>
      </div>
    </div>
  );
}