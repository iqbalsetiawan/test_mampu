export function SkeletonTable() {
  return (
    <div className="w-full">
      <div className="mb-5 flex flex-col gap-2.5 sm:flex-row">
        <div className="h-9 w-full animate-pulse rounded-lg bg-zinc-200 sm:max-w-xs dark:bg-zinc-800" />
        <div className="h-9 w-full animate-pulse rounded-lg bg-zinc-200 sm:w-36 dark:bg-zinc-800" />
        <div className="h-9 w-full animate-pulse rounded-lg bg-zinc-200 sm:w-44 dark:bg-zinc-800" />
      </div>

      <div className="hidden overflow-hidden rounded-xl border border-zinc-200 md:block dark:border-zinc-800">
        <table className="w-full text-sm" role="table" aria-hidden="true">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-800/50">
              <th className="px-5 py-3">
                <div className="h-3 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
              </th>
              <th className="px-5 py-3">
                <div className="h-3 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
              </th>
              <th className="hidden px-5 py-3 lg:table-cell">
                <div className="h-3 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
              </th>
              <th className="px-5 py-3">
                <div className="h-3 w-14 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
              </th>
              <th className="px-5 py-3">
                <div className="h-3 w-14 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
              </th>
              <th className="px-5 py-3">
                <div className="h-3 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                <td className="px-5 py-3.5">
                  <div className="h-4 w-32 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
                </td>
                <td className="px-5 py-3.5">
                  <div className="h-4 w-44 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
                </td>
                <td className="hidden px-5 py-3.5 lg:table-cell">
                  <div className="h-4 w-24 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
                </td>
                <td className="px-5 py-3.5">
                  <div className="h-5 w-8 animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800" />
                </td>
                <td className="px-5 py-3.5">
                  <div className="h-5 w-8 animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800" />
                </td>
                <td className="px-5 py-3.5">
                  <div className="h-5 w-8 animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="mb-2.5 flex items-center justify-between gap-2">
              <div className="h-5 w-2/3 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-5 w-16 animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800" />
            </div>
            <div className="mb-3.5 space-y-1.5">
              <div className="h-4 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
            </div>
            <div className="flex gap-2">
              <div className="h-5 w-16 animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-5 w-14 animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-5 w-18 animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
