import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="space-y-16">
      {/* Hero Section Skeleton */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="container py-16 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Skeleton className="h-6 w-32 mx-auto" />
            <Skeleton className="h-12 md:h-16 lg:h-20 w-3/4 mx-auto" />
            <Skeleton className="h-6 md:h-7 w-2/3 mx-auto" />
            
            {/* Search Skeleton */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Skeleton className="h-14 w-full rounded-lg" />
              </div>
            </div>
            
            {/* Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section Skeleton */}
      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <Skeleton className="h-8 w-8 mx-auto mb-3" />
              <Skeleton className="h-8 w-16 mx-auto mb-1" />
              <Skeleton className="h-4 w-20 mx-auto" />
            </div>
          ))}
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="container">
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-10 w-48 mx-auto" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}