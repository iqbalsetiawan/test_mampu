import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { UsersClient } from '@/components/users/users-client'
import { SkeletonTable } from '@/components/users/skeleton-table'
import { FILTER_OPTIONS, SORT_OPTIONS } from '@/lib/types'
import { mockEnrichedUsers } from './fixtures'

jest.mock('nuqs', () => {
  function makeParser(defaultVal: string) {
    return {
      withDefault: (val: string) => ({
        ...makeParser(val),
        withOptions: () => makeParser(val),
      }),
      withOptions: () => makeParser(defaultVal),
      defaultValue: defaultVal,
    }
  }

  const parseAsString = makeParser('')
  const parseAsStringLiteral = (_values: string[]) => makeParser(_values[0] ?? '')

  return {
    parseAsString,
    parseAsStringLiteral,
    useQueryState: (_key: string, parser: { defaultValue: string }) => {
      const defaultValue = parser?.defaultValue ?? ''
      return useState(defaultValue)
    },
  }
})

function renderUsersClient() {
  return render(<UsersClient users={mockEnrichedUsers} />)
}

describe('UsersClient', () => {
  describe('Activity signals', () => {
    it('renders a row for each user', () => {
      renderUsersClient()
      expect(screen.getAllByRole('row')).toHaveLength(mockEnrichedUsers.length + 1)
    })

    it('shows activity signal badges for each user', () => {
      renderUsersClient()
      const rows = screen.getAllByRole('row').slice(1)
      expect(within(rows[0]).getAllByText('0').length).toBeGreaterThan(0)
      expect(within(rows[2]).getByText('4')).toBeInTheDocument()
    })

    it('shows all three activity signal columns in header', () => {
      renderUsersClient()
      expect(screen.getByRole('columnheader', { name: /posts/i })).toBeInTheDocument()
      expect(screen.getByRole('columnheader', { name: /done/i })).toBeInTheDocument()
      expect(screen.getByRole('columnheader', { name: /pending/i })).toBeInTheDocument()
    })

    it('renders user names as links to detail pages', () => {
      renderUsersClient()
      const leanneLinks = screen.getAllByRole('link', { name: 'Leanne Graham' })
      expect(leanneLinks[0]).toHaveAttribute('href', '/users/1')
      const ervinLinks = screen.getAllByRole('link', { name: 'Ervin Howell' })
      expect(ervinLinks[0]).toHaveAttribute('href', '/users/2')
    })
  })

  describe('Search filter', () => {
    it('filters users by name (case insensitive)', async () => {
      renderUsersClient()
      const searchInput = screen.getByRole('searchbox')

      await userEvent.type(searchInput, 'ervin')

      expect(screen.queryAllByRole('link', { name: 'Leanne Graham' })).toHaveLength(0)
      expect(screen.getAllByRole('link', { name: 'Ervin Howell' }).length).toBeGreaterThan(0)
    })

    it('filters users by email', async () => {
      renderUsersClient()
      const searchInput = screen.getByRole('searchbox')

      await userEvent.type(searchInput, 'nathan@yesenia')

      expect(screen.queryAllByRole('link', { name: 'Leanne Graham' })).toHaveLength(0)
      expect(screen.getAllByRole('link', { name: 'Clementine Bauch' }).length).toBeGreaterThan(0)
    })

    it('shows empty state when search has no matches', async () => {
      renderUsersClient()
      const searchInput = screen.getByRole('searchbox')

      await userEvent.type(searchInput, 'zzznomatch')

      expect(screen.getByText('No matching users')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Reset filters' })).toBeInTheDocument()
    })

    it('clears filters when reset is clicked', async () => {
      renderUsersClient()
      const searchInput = screen.getByRole('searchbox')

      await userEvent.type(searchInput, 'zzznomatch')
      await userEvent.click(screen.getByRole('button', { name: 'Reset filters' }))

      expect(screen.getAllByRole('link', { name: 'Leanne Graham' }).length).toBeGreaterThan(0)
    })
  })

  describe('Sort', () => {
    it('sorts by name A→Z by default', () => {
      renderUsersClient()
      const links = screen.getAllByRole('link', {
        name: /Leanne Graham|Ervin Howell|Clementine Bauch/,
      })
      const names = links.map((l) => l.textContent)
      expect(names[0]).toBe('Clementine Bauch')
      expect(names[1]).toBe('Ervin Howell')
      expect(names[2]).toBe('Leanne Graham')
    })

    it('sorts by most pending todos when selected', async () => {
      renderUsersClient()
      const sortSelect = screen.getByRole('combobox', { name: /sort list/i })

      await userEvent.selectOptions(sortSelect, SORT_OPTIONS.MOST_PENDING)

      const rows = screen.getAllByRole('row').slice(1)
      expect(within(rows[0]).getAllByRole('link')[0].textContent).toBe('Ervin Howell')
      expect(within(rows[1]).getAllByRole('link')[0].textContent).toBe('Leanne Graham')
      expect(within(rows[2]).getAllByRole('link')[0].textContent).toBe('Clementine Bauch')
    })

    it('sorts by most posts when selected', async () => {
      renderUsersClient()
      const sortSelect = screen.getByRole('combobox', { name: /sort list/i })

      await userEvent.selectOptions(sortSelect, SORT_OPTIONS.MOST_POSTS)

      const rows = screen.getAllByRole('row').slice(1)
      expect(within(rows[0]).getAllByRole('link')[0].textContent).toBe('Leanne Graham')
    })
  })

  describe('Filter preset', () => {
    it('shows only users with pending todos when filter is active', async () => {
      renderUsersClient()
      const filterSelect = screen.getByRole('combobox', { name: /filter list/i })

      await userEvent.selectOptions(filterSelect, FILTER_OPTIONS.HAS_PENDING)

      expect(screen.getAllByRole('link', { name: 'Leanne Graham' }).length).toBeGreaterThan(0)
      expect(screen.getAllByRole('link', { name: 'Ervin Howell' }).length).toBeGreaterThan(0)
      expect(screen.queryAllByRole('link', { name: 'Clementine Bauch' })).toHaveLength(0)
    })

    it('shows only users with no completed todos when filter is "no-completed"', async () => {
      renderUsersClient()
      const filterSelect = screen.getByRole('combobox', { name: /filter list/i })

      await userEvent.selectOptions(filterSelect, FILTER_OPTIONS.NO_COMPLETED)

      expect(screen.queryAllByRole('link', { name: 'Leanne Graham' })).toHaveLength(0)
      expect(screen.getAllByRole('link', { name: 'Ervin Howell' }).length).toBeGreaterThan(0)
      expect(screen.queryAllByRole('link', { name: 'Clementine Bauch' })).toHaveLength(0)
    })

    it('shows empty state when filter removes all users', async () => {
      render(<UsersClient users={[{ ...mockEnrichedUsers[2] }]} />)
      const filterSelect = screen.getByRole('combobox', { name: /filter list/i })

      await userEvent.selectOptions(filterSelect, FILTER_OPTIONS.HAS_PENDING)

      expect(screen.getByText('No matching users')).toBeInTheDocument()
    })
  })

  describe('User count', () => {
    it('shows total user count', () => {
      renderUsersClient()
      expect(screen.getByText('3 users')).toBeInTheDocument()
    })
  })
})

describe('SkeletonTable', () => {
  it('renders without errors (loading state)', () => {
    render(<SkeletonTable />)
    const pulseDivs = document.querySelectorAll('.animate-pulse')
    expect(pulseDivs.length).toBeGreaterThan(0)
  })
})
