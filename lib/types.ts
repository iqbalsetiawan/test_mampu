export interface Geo {
  lat: string
  lng: string
}

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface EnrichedUser extends User {
  totalPosts: number
  completedTodos: number
  pendingTodos: number
}

export const SORT_OPTIONS = {
  NAME: 'name',
  MOST_POSTS: 'posts',
  MOST_PENDING: 'pending',
} as const

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS]

export const FILTER_OPTIONS = {
  ALL: 'all',
  HAS_PENDING: 'pending',
  NO_COMPLETED: 'no-completed',
} as const

export type FilterOption = (typeof FILTER_OPTIONS)[keyof typeof FILTER_OPTIONS]
