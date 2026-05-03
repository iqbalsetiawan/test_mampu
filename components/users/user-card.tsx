import Link from 'next/link'
import type { EnrichedUser } from '@/lib/types'

interface UserCardProps {
  user: EnrichedUser
}

export function UserCard({ user }: UserCardProps) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <Link
          href={`/users/${user.id}`}
          className="truncate font-semibold text-indigo-600 transition-colors hover:text-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          {user.name}
        </Link>
        <span className="shrink-0 rounded-md bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          @{user.username}
        </span>
      </div>

      <div className="mb-3.5 space-y-1.5 text-sm">
        <p className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
          <svg
            className="h-3.5 w-3.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <a
            href={`mailto:${user.email}`}
            className="truncate transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:text-zinc-100"
          >
            {user.email.toLowerCase()}
          </a>
        </p>
        <p className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500">
          <svg
            className="h-3.5 w-3.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          <a
            href={`https://${user.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate transition-colors hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:text-indigo-400"
          >
            {user.website}
          </a>
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200/50 dark:bg-indigo-950/50 dark:text-indigo-300 dark:ring-indigo-800/50">
          {user.totalPosts} posts
        </span>
        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200/50 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-800/50">
          {user.completedTodos} done
        </span>
        <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-amber-200/50 dark:bg-amber-950/50 dark:text-amber-300 dark:ring-amber-800/50">
          {user.pendingTodos} pending
        </span>
      </div>
    </article>
  )
}
