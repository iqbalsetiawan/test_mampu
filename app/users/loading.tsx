import { SkeletonTable } from '@/components/users/skeleton-table'

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="h-8 w-24 animate-pulse rounded bg-zinc-100" />
        <div className="mt-1 h-4 w-64 animate-pulse rounded bg-zinc-100" />
      </div>
      <SkeletonTable />
    </main>
  )
}
