import { notFound } from 'next/navigation'
import type { EnrichedUser, Post, Todo, User } from './types'

const BASE_URL = 'https://jsonplaceholder.typicode.com'
const CACHE_OPTIONS = { next: { revalidate: 60 } } as const

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/users`, CACHE_OPTIONS)
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}

export async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`${BASE_URL}/users/${id}`, CACHE_OPTIONS)
  if (res.status === 404) notFound()
  if (!res.ok) throw new Error(`Failed to fetch user ${id}`)
  return res.json()
}

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts`, CACHE_OPTIONS)
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}/todos`, CACHE_OPTIONS)
  if (!res.ok) throw new Error('Failed to fetch todos')
  return res.json()
}

export async function fetchPostsByUser(userId: string): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts?userId=${userId}`, CACHE_OPTIONS)
  if (!res.ok) throw new Error(`Failed to fetch posts for user ${userId}`)
  return res.json()
}

export async function fetchTodosByUser(userId: string): Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}/todos?userId=${userId}`, CACHE_OPTIONS)
  if (!res.ok) throw new Error(`Failed to fetch todos for user ${userId}`)
  return res.json()
}

export function enrichUsers(users: User[], posts: Post[], todos: Todo[]): EnrichedUser[] {
  return users.map((user) => {
    const userPosts = posts.filter((p) => p.userId === user.id)
    const userTodos = todos.filter((t) => t.userId === user.id)
    const completedTodos = userTodos.filter((t) => t.completed).length
    return {
      ...user,
      totalPosts: userPosts.length,
      completedTodos,
      pendingTodos: userTodos.length - completedTodos,
    }
  })
}
