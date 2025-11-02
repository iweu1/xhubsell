'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items = [], className }: BreadcrumbsProps) {
  const pathname = usePathname()
  
  // Generate breadcrumbs from pathname if not provided
  const breadcrumbItems = items.length > 0 ? items : generateBreadcrumbs(pathname)

  function generateBreadcrumbs(path: string): BreadcrumbItem[] {
    const segments = path.split('/').filter(Boolean)
    const crumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ]

    segments.forEach((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/')
      const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
      crumbs.push({ label, href })
    })

    return crumbs
  }

  return (
    <nav className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)}>
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1
        
        return (
          <React.Fragment key={index}>
            {index === 0 ? (
              <Link href={item.href || '/'} className="hover:text-foreground transition-colors">
                <Home className="h-4 w-4" />
              </Link>
            ) : (
              <>
                <ChevronRight className="h-4 w-4" />
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className={cn(isLast && "text-foreground font-medium")}>
                    {item.label}
                  </span>
                )}
              </>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}