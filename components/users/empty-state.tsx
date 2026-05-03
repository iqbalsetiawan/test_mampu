'use client'

import { AppBrandMark } from '@/components/layout/app-brand-mark'

interface EmptyStateProps {
  onClear: () => void
}

export function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4">
        <AppBrandMark size={48} className="rounded-xl" />
      </div>
      <p className="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        No matching users
      </p>
      <p className="mb-5 text-sm text-zinc-500 dark:text-zinc-400">
        Change your search or filters, or reset them to see everyone again.
      </p>
      <button
        onClick={onClear}
        className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        Reset filters
      </button>
    </div>
  )
}
