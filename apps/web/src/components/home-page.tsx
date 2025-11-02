'use client';

import { useTranslation } from 'next-i18next';
import { PageHero } from '@/components/layout/page-hero';
import { SectionHeading } from '@/components/layout/section-heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/examples/product-card';
import { DataTable } from '@/components/examples/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Users, 
  Package, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Globe,
  Shield,
  Zap
} from 'lucide-react';

export function HomePage() {
  const { t } = useTranslation(['home', 'common']);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <PageHero
        title={t('home:title')}
        subtitle="Welcome to XHubSell"
        description="Connect with sellers and buyers worldwide. Experience seamless commerce with innovative solutions designed for modern marketplaces."
      >
        <Button size="lg" className="gradient-primary">
          {t('home:getStarted')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button size="lg" variant="outline">
          {t('home:learnMore')}
        </Button>
      </PageHero>

      {/* Stats Section */}
      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Users, label: t('home:stats.sellers'), value: '1,234', color: 'text-primary' },
            { icon: Package, label: t('home:stats.products'), value: '45,678', color: 'text-secondary' },
            { icon: ShoppingCart, label: t('home:stats.transactions'), value: '89,012', color: 'text-status-success' },
            { icon: TrendingUp, label: t('home:stats.customers'), value: '234,567', color: 'text-status-warning' },
          ].map((stat, index) => (
            <Card key={index} className="text-center card-shadow">
              <CardContent className="p-6">
                <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container">
        <SectionHeading 
          title="Why Choose XHubSell"
          description="Discover the features that make our platform the preferred choice for millions of users worldwide."
          align="center"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Globe,
              title: 'Global Reach',
              description: 'Connect with buyers and sellers from around the world in one unified marketplace.',
              badge: 'Popular'
            },
            {
              icon: Shield,
              title: 'Secure Transactions',
              description: 'Advanced security measures ensure your transactions are always protected and verified.',
              badge: 'Trusted'
            },
            {
              icon: Zap,
              title: 'Lightning Fast',
              description: 'Optimized performance ensures quick loading times and smooth user experience.',
              badge: 'Fast'
            },
            {
              icon: Package,
              title: t('home:features.modernTech'),
              description: 'Built with cutting-edge technology to provide the best marketplace experience.',
            },
            {
              icon: TrendingUp,
              title: t('home:features.scalable'),
              description: 'Our platform grows with your business, from startup to enterprise level.',
            },
            {
              icon: CheckCircle,
              title: t('home:features.secure'),
              description: 'Enterprise-grade security with regular audits and compliance checks.',
            },
          ].map((feature, index) => (
            <Card key={index} className="card-shadow hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <feature.icon className="h-8 w-8 text-primary" />
                  {feature.badge && <Badge variant="secondary">{feature.badge}</Badge>}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Products Showcase */}
      <section className="container">
        <SectionHeading 
          title="Featured Products"
          description="Discover our most popular products from trusted sellers."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCard key={index} />
          ))}
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="container">
        <SectionHeading 
          title="Platform Features"
          description="Explore the powerful tools and features available on our platform."
          align="center"
        />
        
        <Tabs defaultValue="products" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="mt-6">
            <DataTable />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Track your business performance with detailed insights.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Analytics charts and graphs would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="customers" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>Manage your customer relationships and support tickets.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Customer management interface would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* CTA Section */}
      <section className="container">
        <Card className="gradient-primary text-primary-foreground">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of sellers and buyers who trust XHubSell for their marketplace needs.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="secondary">
                Start Selling
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Start Buying
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
