import Link from 'next/link'
import type { Metadata } from 'next'
import { PostsSection } from '@/components/users/posts-section'
import { TodosSection } from '@/components/users/todos-section'
import { UserDetailCard } from '@/components/users/user-detail-card'
import { fetchPostsByUser, fetchTodosByUser, fetchUser } from '@/lib/api'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const user = await fetchUser(id)
  return {
    title: user.name,
    description: `${user.name} at ${user.company.name}. ${user.email}`,
  }
}

export default async function UserDetailPage({ params }: PageProps) {
  const { id } = await params
  const [user, posts, todos] = await Promise.all([
    fetchUser(id),
    fetchPostsByUser(id),
    fetchTodosByUser(id),
  ])

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/users"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to list
      </Link>

      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          {user.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {user.name}
          </h1>
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
            @{user.username} · {user.company.name}
          </p>
        </div>
      </div>

      <UserDetailCard user={user} />

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <PostsSection posts={posts} />
        <TodosSection todos={todos} />
      </div>
    </main>
  )
}
