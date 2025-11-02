'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, Search, MessageCircle, Trophy } from 'lucide-react';

interface HowItWorksProps {
  className?: string;
}

export function HowItWorks({ className }: HowItWorksProps) {
  const steps = [
    {
      icon: Search,
      title: 'Browse Sellers',
      description:
        'Explore our extensive network of verified sellers and find the perfect match for your needs. Filter by category, rating, and location.',
      link: '/sellers',
      linkText: 'Browse Sellers',
    },
    {
      icon: MessageCircle,
      title: 'Contact and Hire',
      description:
        'Reach out directly to sellers, discuss your requirements, and hire with confidence through our secure platform.',
      link: '/contact',
      linkText: 'Get Started',
    },
    {
      icon: Trophy,
      title: 'Get Results',
      description:
        'Track progress, collaborate effectively, and achieve your goals with the support of our trusted sellers.',
      link: '/success-stories',
      linkText: 'View Success Stories',
    },
  ];

  return (
    <section className={cn('container py-16', className)}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get started with XHubSell in three simple steps. Connect, collaborate, and succeed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <Card
            key={index}
            className="relative card-shadow hover:shadow-medium transition-all duration-300"
          >
            <CardHeader className="text-center pb-4">
              <div className="relative mx-auto mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                {index < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-border -translate-y-1/2"
                    style={{ width: 'calc(100% + 2rem)' }}
                  >
                    <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  </div>
                )}
              </div>
              <CardTitle className="text-xl">{step.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <p className="text-muted-foreground mb-6 leading-relaxed">{step.description}</p>
              <Button variant="outline" className="w-full group" asChild>
                <a href={step.link}>
                  {step.linkText}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
