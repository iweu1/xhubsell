import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Welcome to XHubSell',
  description: 'Connect with sellers and buyers worldwide.',
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to XHubSell</h1>
        <p className="text-center text-gray-600">
          Connect with sellers and buyers worldwide.
        </p>
      </div>
    </div>
  );
}
