export function SkeletonDetail() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />

      <div className="mb-8 flex items-start gap-4">
        <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="flex-1 space-y-2 pt-0.5">
          <div className="h-6 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-1/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <DetailInfoSection rows={5} />
        <DetailInfoSection rows={3} />
        <div className="md:col-span-2">
          <AddressSection />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <PostsSectionSkeleton />
        <TodosSectionSkeleton />
      </div>
    </div>
  )
}

function DetailInfoSection({ rows }: { rows: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="border-b border-zinc-200 px-5 py-3.5 dark:border-zinc-700">
        <div className="h-3 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
      <div className="divide-y divide-zinc-100 px-5 py-1 dark:divide-zinc-800/60">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-2.5">
            <div className="h-3 w-16 shrink-0 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-4 flex-1 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
          </div>
        ))}
      </div>
    </div>
  )
}

function AddressSection() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="border-b border-zinc-200 px-5 py-3.5 dark:border-zinc-700">
        <div className="h-3 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
      <div className="grid grid-cols-1 gap-x-8 divide-y divide-zinc-100 px-5 py-1 sm:grid-cols-2 sm:divide-y-0 dark:divide-zinc-800/60">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-2.5">
            <div className="h-3 w-16 shrink-0 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-4 flex-1 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
          </div>
        ))}
      </div>
    </div>
  )
}

function PostsSectionSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-3.5 dark:border-zinc-700">
        <div className="h-3 w-14 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-5 w-7 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700" />
      </div>
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="px-5 py-3.5">
            <div className="mb-1 h-4 w-5/6 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
            <div className="h-3 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
          </div>
        ))}
      </div>
      <div className="border-t border-zinc-100 px-5 py-3 dark:border-zinc-800">
        <div className="h-4 w-24 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
      </div>
    </div>
  )
}

function TodosSectionSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-3.5 dark:border-zinc-700">
        <div className="h-3 w-14 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="flex gap-1.5">
          <div className="h-5 w-16 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-5 w-14 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </div>
      <div className="border-b border-zinc-100 px-5 py-2.5 dark:border-zinc-800">
        <div className="flex gap-0.5 rounded-lg bg-zinc-100 p-0.5 dark:bg-zinc-800">
          <div className="h-7 flex-1 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-7 flex-1 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </div>
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-3">
            <div className="h-4 w-4 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-4 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
          </div>
        ))}
      </div>
    </div>
  )
}
