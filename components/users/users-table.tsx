import Link from 'next/link'
import type { EnrichedUser, SortOption } from '@/lib/types'
import { SORT_OPTIONS } from '@/lib/types'

interface UsersTableProps {
  users: EnrichedUser[]
  sort: SortOption
  onSort: (sort: SortOption) => void
}

function SortIcon({ active, asc }: { active: boolean; asc: boolean }) {
  return (
    <svg
      className={`ml-1 inline h-3 w-3 transition-colors ${active ? 'text-indigo-500' : 'text-zinc-300 dark:text-zinc-600'}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      {active && !asc ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      )}
    </svg>
  )
}

export function UsersTable({ users, sort, onSort }: UsersTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <table className="w-full text-sm" role="table">
        <thead>
          <tr className="border-b border-zinc-100 bg-zinc-50/80 text-left dark:border-zinc-800 dark:bg-zinc-800/50">
            <th
              scope="col"
              className="px-5 py-3"
              aria-sort={sort === SORT_OPTIONS.NAME ? 'ascending' : 'none'}
            >
              <button
                onClick={() => onSort(SORT_OPTIONS.NAME)}
                className="inline-flex items-center text-xs font-semibold uppercase tracking-wide text-zinc-400 transition-colors hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-zinc-500 dark:hover:text-zinc-200"
              >
                Name
                <SortIcon active={sort === SORT_OPTIONS.NAME} asc={true} />
              </button>
            </th>
            <th
              scope="col"
              className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500"
            >
              Email
            </th>
            <th
              scope="col"
              className="hidden px-5 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-400 lg:table-cell dark:text-zinc-500"
            >
              Website
            </th>
            <th
              scope="col"
              className="px-5 py-3"
              aria-sort={sort === SORT_OPTIONS.MOST_POSTS ? 'descending' : 'none'}
            >
              <button
                onClick={() => onSort(SORT_OPTIONS.MOST_POSTS)}
                className="inline-flex items-center text-xs font-semibold uppercase tracking-wide text-zinc-400 transition-colors hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-zinc-500 dark:hover:text-zinc-200"
              >
                Posts
                <SortIcon active={sort === SORT_OPTIONS.MOST_POSTS} asc={false} />
              </button>
            </th>
            <th
              scope="col"
              className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500"
            >
              Done
            </th>
            <th
              scope="col"
              className="px-5 py-3"
              aria-sort={sort === SORT_OPTIONS.MOST_PENDING ? 'descending' : 'none'}
            >
              <button
                onClick={() => onSort(SORT_OPTIONS.MOST_PENDING)}
                className="inline-flex items-center text-xs font-semibold uppercase tracking-wide text-zinc-400 transition-colors hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-zinc-500 dark:hover:text-zinc-200"
              >
                Pending
                <SortIcon active={sort === SORT_OPTIONS.MOST_PENDING} asc={false} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {users.map((user) => (
            <tr
              key={user.id}
              className="group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
            >
              <td className="px-5 py-3.5">
                <Link
                  href={`/users/${user.id}`}
                  className="font-medium text-indigo-600 transition-colors hover:text-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  {user.name}
                </Link>
              </td>
              <td className="px-5 py-3.5 text-zinc-500 dark:text-zinc-400">
                <a
                  href={`mailto:${user.email}`}
                  className="truncate transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:text-zinc-100"
                >
                  {user.email.toLowerCase()}
                </a>
              </td>
              <td className="hidden px-5 py-3.5 text-zinc-400 lg:table-cell dark:text-zinc-500">
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:text-indigo-400"
                >
                  {user.website}
                </a>
              </td>
              <td className="px-5 py-3.5">
                <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200/50 dark:bg-indigo-950/50 dark:text-indigo-300 dark:ring-indigo-800/50">
                  {user.totalPosts}
                </span>
              </td>
              <td className="px-5 py-3.5">
                <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200/50 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-800/50">
                  {user.completedTodos}
                </span>
              </td>
              <td className="px-5 py-3.5">
                <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-amber-200/50 dark:bg-amber-950/50 dark:text-amber-300 dark:ring-amber-800/50">
                  {user.pendingTodos}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
