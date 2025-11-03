import { Metadata } from 'next';

interface HowToJoinPageProps {
  params: {
    locale: string;
  };
}

export const metadata: Metadata = {
  title: 'Join as Seller - XHubSell',
  description: 'Start selling on XHubSell and reach millions of buyers worldwide.',
};

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ru' },
  ];
}

export default function HowToJoinPage({ params: { locale } }: HowToJoinPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto text-center py-16">
        <h1 className="text-3xl font-bold mb-4">
          {locale === 'ru' ? 'Присоединяйтесь как продавец' : 'Join as Seller'}
        </h1>
        <p className="text-muted-foreground mb-8">
          {locale === 'ru' 
            ? 'Начните продавать на XHubSell и охватите миллионы покупателей по всему миру.' 
            : 'Start selling on XHubSell and reach millions of buyers worldwide.'
          }
        </p>
        <div className="bg-muted rounded-lg p-8">
          <p className="text-sm text-muted-foreground">
            {locale === 'ru' 
              ? 'Страница регистрации продавцов будет реализована с формой регистрации и рекомендациями для продавцов.' 
              : 'Seller onboarding page will be implemented with registration form and seller guidelines.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}