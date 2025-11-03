import { Metadata } from 'next';
import { SEOTags } from '@/components/seo/seo';

interface HowToJoinPageProps {
  params: {
    locale: string;
  };
}

export const metadata: Metadata = {
  title: 'Join as Seller - XHubSell',
  description: 'Start selling on XHubSell and reach millions of buyers worldwide.',
};

export default function HowToJoinPage({ params: { locale } }: HowToJoinPageProps) {
  return (
    <div className="container py-8">
      <SEOTags
        title="Join as Seller - XHubSell"
        description="Start selling on XHubSell and reach millions of buyers worldwide."
      />
      <div className="max-w-4xl mx-auto text-center py-16">
        <h1 className="text-3xl font-bold mb-4">Join as Seller</h1>
        <p className="text-muted-foreground mb-8">
          Start selling on XHubSell and reach millions of buyers worldwide.
        </p>
        <div className="bg-muted rounded-lg p-8">
          <p className="text-sm text-muted-foreground">
            Seller onboarding page will be implemented with registration form and seller guidelines.
          </p>
        </div>
      </div>
    </div>
  );
}