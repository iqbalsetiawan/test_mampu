import { Suspense } from 'react'
import { UsersClient } from '@/components/users/users-client'
import { SkeletonTable } from '@/components/users/skeleton-table'
import { enrichUsers, fetchPosts, fetchTodos, fetchUsers } from '@/lib/api'

export const metadata = {
  title: 'Users',
  description: 'Search, sort, and filter records with related activity.',
}

export default async function UsersPage() {
  const [users, posts, todos] = await Promise.all([fetchUsers(), fetchPosts(), fetchTodos()])
  const enrichedUsers = enrichUsers(users, posts, todos)

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Users
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {users.length} users · post and todo counts per row
          </p>
        </div>
      </div>

      <Suspense fallback={<SkeletonTable />}>
        <UsersClient users={enrichedUsers} />
      </Suspense>
    </main>
  )
}
