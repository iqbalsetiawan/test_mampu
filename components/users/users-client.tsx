'use client'

import { parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs'
import { useMemo, useState } from 'react'
import { FilterSelect } from '@/components/ui/filter-select'
import { SearchInput } from '@/components/ui/search-input'
import { SortSelect } from '@/components/ui/sort-select'
import {
  FILTER_OPTIONS,
  SORT_OPTIONS,
  type EnrichedUser,
  type FilterOption,
  type SortOption,
} from '@/lib/types'
import { EmptyState } from './empty-state'
import { UserCard } from './user-card'
import { UsersTable } from './users-table'

const PAGE_SIZE_OPTIONS = [5, 10] as const
type PageSizeOption = (typeof PAGE_SIZE_OPTIONS)[number]

const SORT_VALUES = Object.values(SORT_OPTIONS)
const FILTER_VALUES = Object.values(FILTER_OPTIONS)

interface UsersClientProps {
  users: EnrichedUser[]
}

export function UsersClient({ users }: UsersClientProps) {
  const [q, setQ] = useQueryState(
    'q',
    parseAsString.withDefault('').withOptions({ shallow: false }),
  )
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsStringLiteral(SORT_VALUES)
      .withDefault(SORT_OPTIONS.NAME)
      .withOptions({ shallow: false }),
  )
  const [filter, setFilter] = useQueryState(
    'filter',
    parseAsStringLiteral(FILTER_VALUES)
      .withDefault(FILTER_OPTIONS.ALL)
      .withOptions({ shallow: false }),
  )
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<PageSizeOption>(5)

  const filtered = useMemo(() => {
    let result = users

    if (q.trim()) {
      const query = q.trim().toLowerCase()
      result = result.filter(
        (u) => u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query),
      )
    }

    if (filter === FILTER_OPTIONS.HAS_PENDING) {
      result = result.filter((u) => u.pendingTodos > 0)
    } else if (filter === FILTER_OPTIONS.NO_COMPLETED) {
      result = result.filter((u) => u.completedTodos === 0)
    }

    return [...result].sort((a, b) => {
      if (sort === SORT_OPTIONS.MOST_POSTS) return b.totalPosts - a.totalPosts
      if (sort === SORT_OPTIONS.MOST_PENDING) return b.pendingTodos - a.pendingTodos
      return a.name.localeCompare(b.name)
    })
  }, [users, q, sort, filter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  function handleClear() {
    setQ('')
    setSort(SORT_OPTIONS.NAME)
    setFilter(FILTER_OPTIONS.ALL)
    setPage(1)
  }

  function handleSearch(value: string) {
    setQ(value)
    setPage(1)
  }

  function handleSort(value: SortOption) {
    setSort(value)
    setPage(1)
  }

  function handleFilter(value: FilterOption) {
    setFilter(value)
    setPage(1)
  }

  function handlePageSize(value: PageSizeOption) {
    setPageSize(value)
    setPage(1)
  }

  return (
    <div>
      <div className="mb-5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <SearchInput value={q} onChange={handleSearch} />
        <SortSelect value={sort as SortOption} onChange={handleSort} />
        <FilterSelect value={filter as FilterOption} onChange={handleFilter} />
        <p className="text-sm text-zinc-400 sm:ml-auto dark:text-zinc-500">
          {filtered.length} user{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {filtered.length === 0 && <EmptyState onClear={handleClear} />}

      {filtered.length > 0 && (
        <>
          <div className="hidden md:block">
            <UsersTable users={paginated} sort={sort} onSort={handleSort} />
          </div>

          <div className="space-y-3 md:hidden">
            {paginated.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Go to previous page"
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              ←
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm tabular-nums text-zinc-500 dark:text-zinc-400">
                Page {currentPage} / {totalPages}
              </span>
              <select
                value={pageSize}
                onChange={(e) => handlePageSize(Number(e.target.value) as PageSizeOption)}
                aria-label="Items per page"
                className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {PAGE_SIZE_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n} per page
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Go to next page"
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              →
            </button>
          </div>
        </>
      )}
    </div>
  )
}
