import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PostsSection } from '@/components/users/posts-section'
import { TodosSection } from '@/components/users/todos-section'
import { UserDetailCard } from '@/components/users/user-detail-card'
import { SkeletonDetail } from '@/components/users/skeleton-detail'
import UserDetailError from '@/app/users/[id]/error'
import { mockUsers, userOnePosts, userOneTodos } from './fixtures'

const user = mockUsers[0]

describe('UserDetailCard', () => {
  it('renders name and username', () => {
    render(<UserDetailCard user={user} />)
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument()
    expect(screen.getByText('@Bret')).toBeInTheDocument()
  })

  it('renders email as mailto link', () => {
    render(<UserDetailCard user={user} />)
    const emailLink = screen.getByRole('link', { name: /sincere@april.biz/i })
    expect(emailLink).toHaveAttribute('href', 'mailto:Sincere@april.biz')
  })

  it('renders phone number', () => {
    render(<UserDetailCard user={user} />)
    expect(screen.getByText('1-770-736-0800')).toBeInTheDocument()
  })

  it('renders website as external link', () => {
    render(<UserDetailCard user={user} />)
    const websiteLink = screen.getByRole('link', { name: 'hildegard.org' })
    expect(websiteLink).toHaveAttribute('href', 'https://hildegard.org')
    expect(websiteLink).toHaveAttribute('target', '_blank')
  })

  it('renders company name and catchphrase', () => {
    render(<UserDetailCard user={user} />)
    expect(screen.getByText('Romaguera-Crona')).toBeInTheDocument()
    expect(screen.getByText('Multi-layered client-server neural-net')).toBeInTheDocument()
  })

  it('renders address fields', () => {
    render(<UserDetailCard user={user} />)
    expect(screen.getByText('Kulas Light')).toBeInTheDocument()
    expect(screen.getByText('Apt. 556')).toBeInTheDocument()
    expect(screen.getByText('Gwenborough')).toBeInTheDocument()
    expect(screen.getByText('92998-3874')).toBeInTheDocument()
  })
})

describe('PostsSection', () => {
  it('shows first 3 posts by default', () => {
    render(<PostsSection posts={userOnePosts} />)
    expect(screen.getByText(/post one title/i)).toBeInTheDocument()
    expect(screen.getByText(/post two title/i)).toBeInTheDocument()
    expect(screen.getByText(/post three title/i)).toBeInTheDocument()
    expect(screen.queryByText(/post four title/i)).not.toBeInTheDocument()
  })

  it('reveals remaining posts when "Show all" is clicked', async () => {
    render(<PostsSection posts={userOnePosts} />)

    await userEvent.click(screen.getByRole('button', { name: /show all/i }))

    expect(screen.getByText(/post four title/i)).toBeInTheDocument()
  })

  it('shows "Show less" after expanding', async () => {
    render(<PostsSection posts={userOnePosts} />)

    await userEvent.click(screen.getByRole('button', { name: /show all/i }))

    expect(screen.getByRole('button', { name: /show less/i })).toBeInTheDocument()
  })

  it('shows total post count badge', () => {
    render(<PostsSection posts={userOnePosts} />)
    expect(screen.getByText(`${userOnePosts.length}`)).toBeInTheDocument()
  })

  it('renders empty state when no posts', () => {
    render(<PostsSection posts={[]} />)
    expect(screen.getByText('No posts yet.')).toBeInTheDocument()
  })

  it('does not show "show all" button when posts <= 3', () => {
    render(<PostsSection posts={userOnePosts.slice(0, 2)} />)
    expect(screen.queryByRole('button', { name: /show all/i })).not.toBeInTheDocument()
  })
})

describe('TodosSection', () => {
  it('shows pending todo count badge', () => {
    render(<TodosSection todos={userOneTodos} />)
    expect(screen.getByText('1 pending')).toBeInTheDocument()
  })

  it('shows completed todo count badge', () => {
    render(<TodosSection todos={userOneTodos} />)
    expect(screen.getByText('2 done')).toBeInTheDocument()
  })

  it('shows pending todos by default', () => {
    render(<TodosSection todos={userOneTodos} />)
    expect(screen.getByText(/todo three/i)).toBeInTheDocument()
  })

  it('switches to completed tab when clicked', async () => {
    render(<TodosSection todos={userOneTodos} />)

    await userEvent.click(screen.getByRole('button', { name: /completed/i }))

    expect(screen.getByText(/todo one/i)).toBeInTheDocument()
    expect(screen.getByText(/todo two/i)).toBeInTheDocument()
  })

  it('shows empty message when tab has no items', () => {
    const allCompletedTodos = userOneTodos.map((t) => ({ ...t, completed: true }))
    render(<TodosSection todos={allCompletedTodos} />)
    expect(screen.getByText(/no pending todos/i)).toBeInTheDocument()
  })
})

describe('SkeletonDetail', () => {
  it('renders without errors (loading state)', () => {
    render(<SkeletonDetail />)
    const pulseDivs = document.querySelectorAll('.animate-pulse')
    expect(pulseDivs.length).toBeGreaterThan(0)
  })
})

describe('Error states', () => {
  it('error component renders with back link and retry button', () => {
    const mockReset = jest.fn()
    render(<UserDetailError error={new Error('Network error')} reset={mockReset} />)

    expect(screen.getByText('Failed to load user')).toBeInTheDocument()
    expect(screen.getByText('Network error')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to list/i })).toHaveAttribute('href', '/users')
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
  })

  it('reset button calls the reset function', async () => {
    const mockReset = jest.fn()
    render(<UserDetailError error={new Error('fail')} reset={mockReset} />)

    await userEvent.click(screen.getByRole('button', { name: /try again/i }))

    expect(mockReset).toHaveBeenCalledTimes(1)
  })
})
