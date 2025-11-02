import React from 'react'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  description?: string
  align?: 'left' | 'center' | 'right'
  className?: string
}

export function SectionHeading({ 
  title, 
  subtitle, 
  description, 
  align = 'left',
  className 
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  return (
    <div className={cn(
      "mb-8",
      alignmentClasses[align],
      className
    )}>
      {subtitle && (
        <p className="text-sm font-medium text-primary mb-2">{subtitle}</p>
      )}
      
      <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight mb-4">
        {title}
      </h2>
      
      {description && (
        <p className="text-muted-foreground max-w-2xl">
          {description}
        </p>
      )}
    </div>
  )
}