'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  ShoppingCart, 
  Star,
  Heart,
  Share2
} from 'lucide-react'

export function ProductCard() {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <div className="aspect-square bg-muted relative overflow-hidden rounded-t-lg">
        <Skeleton className="w-full h-full" />
        <div className="absolute top-2 right-2 flex gap-2">
          <Button size="icon" variant="secondary" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary" className="text-xs">New</Badge>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-muted-foreground">4.5</span>
          </div>
        </div>
        
        <h3 className="font-semibold mb-1 line-clamp-2">Premium Wireless Headphones</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          High-quality audio experience with noise cancellation and long battery life.
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary">$299</span>
            <span className="text-sm text-muted-foreground line-through ml-2">$399</span>
          </div>
          <Button size="sm">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}