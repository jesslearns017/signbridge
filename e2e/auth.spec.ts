import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/login')

    // Check for login form elements
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/password/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()
  })

  test('should navigate to registration page', async ({ page }) => {
    await page.goto('/login')

    // Click on "Create Account" link
    await page.getByText(/create account/i).click()

    // Should navigate to registration page
    await expect(page).toHaveURL(/\/register/)
    await expect(page.getByRole('heading', { name: /create account/i })).toBeVisible()
  })

  test('should show validation errors for empty login form', async ({ page }) => {
    await page.goto('/login')

    // Click sign in without filling form
    await page.getByRole('button', { name: /sign in/i }).click()

    // Should show validation errors
    await expect(page.getByText(/email is required/i)).toBeVisible()
  })

  test('should display forgot password page', async ({ page }) => {
    await page.goto('/login')

    // Click on "Forgot Password" link
    await page.getByText(/forgot password/i).click()

    // Should navigate to forgot password page
    await expect(page).toHaveURL(/\/forgot-password/)
    await expect(page.getByRole('heading', { name: /reset password/i })).toBeVisible()
  })
})

test.describe('Registration Flow', () => {
  test('should display role selection on registration page', async ({ page }) => {
    await page.goto('/register')

    // Check for role cards
    await expect(page.getByText(/patient/i)).toBeVisible()
    await expect(page.getByText(/healthcare provider/i)).toBeVisible()
    await expect(page.getByText(/sign language interpreter/i)).toBeVisible()
  })

  test('should show patient features when selecting patient role', async ({ page }) => {
    await page.goto('/register')

    // Click on patient card
    await page.getByText(/patient/i).first().click()

    // Should show patient-specific features
    await expect(page.getByText(/book video appointments/i)).toBeVisible()
    await expect(page.getByText(/request.*interpreters/i)).toBeVisible()
  })
})

test.describe('Accessibility', () => {
  test('login page should be accessible', async ({ page }) => {
    await page.goto('/login')

    // Check for proper heading hierarchy
    const headings = await page.locator('h1, h2, h3').all()
    expect(headings.length).toBeGreaterThan(0)

    // Check for proper form labels
    const emailInput = page.getByLabel(/email/i)
    await expect(emailInput).toHaveAttribute('type', 'email')

    const passwordInput = page.getByLabel(/password/i)
    await expect(passwordInput).toHaveAttribute('type', 'password')
  })

  test('registration page should be keyboard navigable', async ({ page }) => {
    await page.goto('/register')

    // Tab through role cards
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Should be able to select role with Enter key
    await page.keyboard.press('Enter')

    // Should move to next step
    await expect(page.getByRole('button', { name: /next/i })).toBeVisible()
  })
})
