import { expect, test } from '@playwright/test'

test.describe('Home page', () => {
  test('should load and show Home header', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible()
  })

  test('should show Welcome message when not authenticated', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Welcome to Twitter')).toBeVisible()
  })

  test('should show Login and Register buttons when not authenticated', async ({ page }) => {
    await page.goto('/')
    const form = page.locator('div', { hasText: 'Welcome to Twitter' })
    await expect(form.getByRole('button', { name: 'Login' })).toBeVisible()
    await expect(form.getByRole('button', { name: 'Register' })).toBeVisible()
  })
})

test.describe('Register modal', () => {
  test('should be open by default on first visit', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible()
  })

  test('should have all required input fields', async ({ page }) => {
    await page.goto('/')
    const modal = page.locator('.fixed').filter({ has: page.getByRole('heading', { name: 'Create an account' }) })
    await expect(modal.getByPlaceholder('Email')).toBeVisible()
    await expect(modal.getByPlaceholder('Name', { exact: true })).toBeVisible()
    await expect(modal.getByPlaceholder('Username')).toBeVisible()
    await expect(modal.getByPlaceholder('Password')).toBeVisible()
  })

  test('should have Register action button', async ({ page }) => {
    await page.goto('/')
    const modal = page.locator('.fixed').filter({ has: page.getByRole('heading', { name: 'Create an account' }) })
    await expect(modal.getByRole('button', { name: 'Register' })).toBeVisible()
  })

  test('should close when X button is clicked', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible()

    // Click the close button (AiOutlineClose icon button)
    await page.locator('button:has(svg)').filter({ has: page.locator('svg') }).first().click()

    await expect(page.getByRole('heading', { name: 'Create an account' })).not.toBeVisible()
  })

  test('should toggle to Login modal when "Sign in" is clicked', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible()

    await page.getByText('Sign in').click()

    await expect(page.getByRole('heading', { name: 'Create an account' })).not.toBeVisible()
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
  })
})

test.describe('Login modal', () => {
  test('should open when Login button in form is clicked', async ({ page }) => {
    await page.goto('/')

    // Close the register modal first
    await page.locator('button:has(svg)').filter({ has: page.locator('svg') }).first().click()
    await expect(page.getByRole('heading', { name: 'Create an account' })).not.toBeVisible()

    // Click Login button in the Welcome section
    const welcomeSection = page.locator('div', { hasText: 'Welcome to Twitter' })
    await welcomeSection.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
  })

  test('should have email and password fields', async ({ page }) => {
    await page.goto('/')

    // Toggle to login modal
    await page.getByText('Sign in').click()

    const modal = page.locator('.fixed').filter({ has: page.getByRole('heading', { name: 'Login' }) })
    await expect(modal.getByPlaceholder('Email')).toBeVisible()
    await expect(modal.getByPlaceholder('Password')).toBeVisible()
  })

  test('should have Sign in action button', async ({ page }) => {
    await page.goto('/')
    await page.getByText('Sign in').click()

    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible()
  })

  test('should toggle to Register modal when "Create an account" is clicked', async ({ page }) => {
    await page.goto('/')
    await page.getByText('Sign in').click()

    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()

    await page.getByText('Create an account').click()

    await expect(page.getByRole('heading', { name: 'Login' })).not.toBeVisible()
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible()
  })
})

test.describe('Sidebar navigation', () => {
  test('should show Home navigation item', async ({ page }) => {
    await page.goto('/')
    // SidebarItem uses div with onClick, not anchor tags
    await expect(page.locator('p', { hasText: 'Home' })).toBeVisible()
  })

  test('should show Notifications navigation item', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('p', { hasText: 'Notifications' })).toBeVisible()
  })

  test('should show Profile navigation item', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('p', { hasText: 'Profile' })).toBeVisible()
  })

  test('should navigate to home when Home is clicked', async ({ page }) => {
    await page.goto('/')

    // Close register modal first
    await page.locator('button:has(svg)').filter({ has: page.locator('svg') }).first().click()

    await page.locator('p', { hasText: 'Home' }).click()
    await expect(page).toHaveURL('/')
  })
})
