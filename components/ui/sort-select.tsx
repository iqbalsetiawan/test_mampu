'use client'

import { SORT_OPTIONS, type SortOption } from '@/lib/types'

interface SortSelectProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

const SORT_LABELS: Record<SortOption, string> = {
  [SORT_OPTIONS.NAME]: 'Name A–Z',
  [SORT_OPTIONS.MOST_POSTS]: 'Most posts',
  [SORT_OPTIONS.MOST_PENDING]: 'Most pending todos',
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      aria-label="Sort list"
      className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:w-36 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-indigo-500"
    >
      {Object.values(SORT_OPTIONS).map((opt) => (
        <option key={opt} value={opt}>
          {SORT_LABELS[opt]}
        </option>
      ))}
    </select>
  )
}
