import type { EnrichedUser, Post, Todo, User } from '@/lib/types'

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    phone: '1-770-736-0800',
    website: 'hildegard.org',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: { lat: '-37.3159', lng: '81.1496' },
    },
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    phone: '010-692-6593',
    website: 'anastasia.net',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: { lat: '-43.9509', lng: '-34.4618' },
    },
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
    phone: '1-463-123-4447',
    website: 'ramiro.info',
    address: {
      street: 'Douglas Extension',
      suite: 'Suite 847',
      city: 'McKenziehaven',
      zipcode: '59590-4157',
      geo: { lat: '-68.6102', lng: '-47.0653' },
    },
    company: {
      name: 'Romaguera-Jacobson',
      catchPhrase: 'Face to face bifurcated interface',
      bs: 'e-enable strategic applications',
    },
  },
]

const mockPosts: Post[] = [
  { userId: 1, id: 1, title: 'Post one title', body: 'Post one body content here' },
  { userId: 1, id: 2, title: 'Post two title', body: 'Post two body content here' },
  { userId: 1, id: 3, title: 'Post three title', body: 'Post three body content here' },
  { userId: 1, id: 4, title: 'Post four title', body: 'Post four body content here' },
  { userId: 2, id: 5, title: 'Post five title', body: 'Post five body content here' },
  { userId: 2, id: 6, title: 'Post six title', body: 'Post six body content here' },
]

const mockTodos: Todo[] = [
  { userId: 1, id: 1, title: 'Todo one', completed: true },
  { userId: 1, id: 2, title: 'Todo two', completed: true },
  { userId: 1, id: 3, title: 'Todo three', completed: false },
  { userId: 2, id: 4, title: 'Todo four', completed: false },
  { userId: 2, id: 5, title: 'Todo five', completed: false },
  { userId: 3, id: 6, title: 'Todo six', completed: true },
]

export const mockEnrichedUsers: EnrichedUser[] = [
  { ...mockUsers[0], totalPosts: 4, completedTodos: 2, pendingTodos: 1 },
  { ...mockUsers[1], totalPosts: 2, completedTodos: 0, pendingTodos: 2 },
  { ...mockUsers[2], totalPosts: 0, completedTodos: 1, pendingTodos: 0 },
]

export const userOnePosts: Post[] = mockPosts.filter((p) => p.userId === 1)
export const userOneTodos: Todo[] = mockTodos.filter((t) => t.userId === 1)
