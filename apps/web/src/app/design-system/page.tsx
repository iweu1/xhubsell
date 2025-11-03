import { generateMetadata } from '@/components/seo/seo';
import { PageHero } from '@/components/layout/page-hero';
import { SectionHeading } from '@/components/layout/section-heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ProductCard } from '@/components/examples/product-card';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = generateMetadata({
  title: 'Design System Demo',
  description: 'Explore the XHubSell design system components and patterns',
});

export default function DesignSystemDemo() {
  return (
    <div className="space-y-16">
      <PageHero
        title="Design System Demo"
        subtitle="Component Library"
        description="Explore the complete design system with Tailwind CSS and React components."
      />

      {/* Color Palette */}
      <section className="container">
        <SectionHeading
          title="Color Palette"
          description="Primary and secondary colors with status indicators."
        />

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Primary Colors</h3>
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

          <div>
            <h3 className="text-lg font-semibold mb-4">Status Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-20 rounded-lg bg-green-500" />
                <p className="text-sm font-medium">success</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-lg bg-yellow-500" />
                <p className="text-sm font-medium">warning</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-lg bg-red-500" />
                <p className="text-sm font-medium">error</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-lg bg-blue-500" />
                <p className="text-sm font-medium">info</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="container">
        <SectionHeading
          title="Typography"
          description="Font scales and hierarchy using Inter and Montserrat."
        />

        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">Heading 1 - Display</h1>
            <h2 className="text-3xl md:text-4xl font-display font-bold">Heading 2 - Display</h2>
            <h3 className="text-2xl md:text-3xl font-display font-bold">Heading 3 - Display</h3>
            <h4 className="text-xl md:text-2xl font-display font-bold">Heading 4 - Display</h4>
            <p className="text-lg font-sans">Body text large - Inter font family for readability</p>
            <p className="text-base font-sans">
              Body text regular - Inter font family for readability
            </p>
            <p className="text-sm font-sans">Body text small - Inter font family for readability</p>
          </div>
        </div>
      </section>

      {/* Components */}
      <section className="container">
        <SectionHeading
          title="UI Components"
          description="Reusable components with variants and states."
        />

        <Tabs defaultValue="buttons" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          <TabsContent value="buttons" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>Different button styles and sizes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button size="sm">Small</Button>
                  <Button>Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">👍</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cards" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProductCard />
              <Card>
                <CardHeader>
                  <CardTitle>Simple Card</CardTitle>
                  <CardDescription>A basic card component</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is a simple card with header and content.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="forms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Form Elements</CardTitle>
                <CardDescription>Input fields and form controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Text Input</label>
                  <Input placeholder="Enter text here..." />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Input</label>
                  <Input type="email" placeholder="email@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Password Input</label>
                  <Input type="password" placeholder="Enter password" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Badge Variants</CardTitle>
                <CardDescription>Status and indicator badges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Layout Examples */}
      <section className="container">
        <SectionHeading
          title="Layout Components"
          description="Page structure and navigation components."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Dialog Modal</CardTitle>
              <CardDescription>Modal dialogs for user interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dialog Title</DialogTitle>
                    <DialogDescription>
                      This is a dialog content area where you can place forms, information, or any
                      other content.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p>Dialog content goes here.</p>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tabs</CardTitle>
              <CardDescription>Tabbed content organization</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="tab1">
                <TabsList>
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="mt-4">
                  <p>Content for Tab 1</p>
                </TabsContent>
                <TabsContent value="tab2" className="mt-4">
                  <p>Content for Tab 2</p>
                </TabsContent>
                <TabsContent value="tab3" className="mt-4">
                  <p>Content for Tab 3</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skeleton Loading States */}
      <section className="container">
        <SectionHeading
          title="Loading States"
          description="Skeleton components for better perceived performance."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
