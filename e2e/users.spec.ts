import { expect, test } from '@playwright/test'

test.describe('Users happy path', () => {
  test('list loads, navigate to detail, back preserves state', async ({ page }) => {
    await page.goto('/users')
    await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible()

    await expect(page.getByRole('columnheader', { name: /posts/i })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: /pending/i })).toBeVisible()

    const searchInput = page.getByRole('searchbox')
    await searchInput.fill('Ervin')
    await expect(page.getByRole('link', { name: 'Ervin Howell' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Leanne Graham' })).not.toBeVisible()

    await page.getByRole('link', { name: 'Ervin Howell' }).click()
    await expect(page).toHaveURL(/\/users\/2/)
    await expect(page.getByRole('heading', { name: 'Ervin Howell' })).toBeVisible()

    await expect(page.getByText('Deckow-Crist')).toBeVisible()
    await expect(page.getByText(/Shanna@melissa\.tv/i)).toBeVisible()

    await expect(page.getByRole('heading', { name: /posts/i, level: 2 }).first()).toBeVisible()

    await page.getByRole('link', { name: /back to list/i }).click()
    await expect(page).toHaveURL(/\/users\?q=Ervin/)
    await expect(page.getByRole('link', { name: 'Ervin Howell' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Leanne Graham' })).not.toBeVisible()
  })

  test('not-found page shown for invalid user id', async ({ page }) => {
    await page.goto('/users/99999')
    await expect(page.getByText('User not found')).toBeVisible()
    await expect(page.getByRole('link', { name: /view all users/i })).toBeVisible()
  })
})
