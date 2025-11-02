import React from 'react'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  title: string
  subtitle?: string
  description?: string
  className?: string
  children?: React.ReactNode
}

export function PageHero({ 
  title, 
  subtitle, 
  description, 
  className, 
  children 
}: PageHeroProps) {
  return (
    <div className={cn(
      "bg-gradient-to-b from-primary/5 to-background py-12 md:py-16",
      className
    )}>
      <div className="container">
        <div className="max-w-4xl">
          {subtitle && (
            <p className="text-sm font-medium text-primary mb-2">{subtitle}</p>
          )}
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display tracking-tight mb-4">
            {title}
          </h1>
          
          {description && (
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              {description}
            </p>
          )}
          
          {children && (
            <div className="flex flex-wrap gap-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}