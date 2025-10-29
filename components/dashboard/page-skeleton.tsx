import { Skeleton } from "@/components/ui/skeleton"

export function DashboardPageSkeleton() {
  return (
    <div className="p-8 space-y-8">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="w-12 h-12 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-border p-6">
              <Skeleton className="w-12 h-12 rounded-lg mb-4" />
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-10 w-20" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <div className="flex gap-4">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <Skeleton className="h-8 w-32 mb-4" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 bg-secondary rounded-lg">
                <Skeleton className="h-3 w-16 mb-2" />
                <Skeleton className="h-5 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function FeaturePageSkeleton() {
  return (
    <div className="p-8 space-y-8">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Form Skeleton */}
      <div className="bg-white rounded-xl border border-border p-8">
        <div className="flex gap-4">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 w-24" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}

