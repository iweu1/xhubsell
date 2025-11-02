'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Package,
  Users,
  ShoppingCart,
  Settings,
  BarChart3,
  Store,
  Tag,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BannerSlot } from '@/components/banner-slot';

interface SidebarProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Sellers', href: '/sellers', icon: Store },
  { name: 'Categories', href: '/categories', icon: Tag },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

export function Sidebar({ className, isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed md:sticky top-0 left-0 z-50 h-screen w-64 -translate-x-full transition-transform duration-300 ease-in-out md:translate-x-0',
          isOpen && 'translate-x-0',
          className
        )}
      >
        <div className="flex h-full flex-col bg-card border-r">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <Image
              src="/brand/icons/icon-primary.svg"
              alt="XHubSell"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="font-display text-xl font-bold">XHubSell</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                  onClick={onClose}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Banner */}
          <div className="px-4 pb-4">
            <BannerSlot position="sidebar" />
          </div>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="text-xs text-muted-foreground">© 2024 XHubSell</div>
          </div>
        </div>
      </div>
    </>
  );
}
