export default function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800 ${className}`} />
  )
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-9" />
      </div>
      <Skeleton className="h-8 w-16 mb-1" />
      <Skeleton className="h-4 w-20" />
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
      <Skeleton className="h-4 w-32 mb-6" />
      <Skeleton className="h-[300px] w-full" />
    </div>
  )
}
