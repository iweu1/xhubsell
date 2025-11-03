import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design System Demo',
  description: 'Explore the XHubSell design system components and patterns',
};

export default function DesignSystemDemo() {
  return (
    <div className="space-y-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">Design System Demo</h1>
        <p className="text-center text-muted-foreground mb-8">
          Explore the complete design system with Tailwind CSS and React components.
        </p>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Color Palette</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <div className="h-20 rounded-lg bg-blue-600" />
                <p className="text-sm font-medium">primary</p>
                <p className="text-xs text-muted-foreground">#2563EB</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-lg bg-orange-500" />
                <p className="text-sm font-medium">secondary</p>
                <p className="text-xs text-muted-foreground">#F97316</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
