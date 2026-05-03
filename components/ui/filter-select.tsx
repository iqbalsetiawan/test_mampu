'use client'

import { FILTER_OPTIONS, type FilterOption } from '@/lib/types'

interface FilterSelectProps {
  value: FilterOption
  onChange: (value: FilterOption) => void
}

const FILTER_LABELS: Record<FilterOption, string> = {
  [FILTER_OPTIONS.ALL]: 'Everyone',
  [FILTER_OPTIONS.HAS_PENDING]: 'Has open todos',
  [FILTER_OPTIONS.NO_COMPLETED]: 'Nothing completed',
}

export function FilterSelect({ value, onChange }: FilterSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as FilterOption)}
      aria-label="Filter list"
      className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:w-44 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-indigo-500"
    >
      {Object.values(FILTER_OPTIONS).map((opt) => (
        <option key={opt} value={opt}>
          {FILTER_LABELS[opt]}
        </option>
      ))}
    </select>
  )
}
