import { act, cleanup, screen, waitFor } from '@testing-library/react'
import type { DetailedError } from 'hono/client'
import { afterEach, describe, expect, it } from 'vitest'
import { CreateUser, UserDetail, UsersList } from './components'
import { renderWithClient } from './test-utils'

afterEach(() => {
  cleanup()
})

describe('UsersList — useUsers in a React tree', () => {
  it('renders loading → success and lists users', async () => {
    renderWithClient(<UsersList />)
    expect(screen.getByTestId('users-status').textContent).toBe('loading')
    await waitFor(() => expect(screen.queryByTestId('users-list')).not.toBeNull())
    expect(screen.getByTestId('user-1').textContent).toBe('Alice')
    expect(screen.getByTestId('user-2').textContent).toBe('Bob')
  })
})

describe('UserDetail — useUsersId in a React tree', () => {
  it('renders the user on success', async () => {
    renderWithClient(<UserDetail id="1" />)
    await waitFor(() => expect(screen.queryByTestId('user-1')).not.toBeNull())
    expect(screen.getByTestId('user-1').textContent).toBe('Alice')
  })

  it('flips to error UI on 404 — DetailedError surfaces with statusCode and detail.data', async () => {
    renderWithClient(<UserDetail id="999" />)
    await waitFor(() =>
      expect(screen.queryByTestId('user-error-status')).not.toBeNull(),
    )
    expect(screen.getByTestId('user-error-status').textContent).toBe('404')
    expect(screen.getByTestId('user-error-detail').textContent).toBe(
      JSON.stringify({ error: 'Not Found' }),
    )
  })
})

describe('CreateUser — usePostUsers in a React tree', () => {
  it('mutates and renders the created user', async () => {
    const { getByTestId } = renderWithClient(<CreateUser />)
    const input = getByTestId('new-user-name') as HTMLInputElement
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
      )?.set
      setter?.call(input, 'Charlie')
      input.dispatchEvent(new Event('input', { bubbles: true }))
    })
    await act(async () => {
      getByTestId('submit').click()
    })
    await waitFor(() =>
      expect(screen.getByTestId('mutation-status').textContent).toMatch(/^success/),
    )
    expect(screen.getByTestId('mutation-status').textContent).toBe('success:Charlie')
  })

  it('flips to error UI when mutation fails (400 from empty name)', async () => {
    const { getByTestId } = renderWithClient(<CreateUser />)
    await act(async () => {
      getByTestId('submit').click()
    })
    await waitFor(() =>
      expect(screen.getByTestId('mutation-status').textContent).toMatch(/^error/),
    )
    expect(screen.getByTestId('mutation-status').textContent).toBe('error:400')
  })

  it('error state object: isError=true, error instanceof DetailedError, statusCode=400', async () => {
    const { getByTestId, queryClient } = renderWithClient(<CreateUser />)
    await act(async () => {
      getByTestId('submit').click()
    })
    await waitFor(() =>
      expect(screen.getByTestId('mutation-status').textContent).toMatch(/^error/),
    )
    const recorded = queryClient.getMutationCache().getAll()[0]
    expect(recorded.state.status).toBe('error')
    expect(recorded.state.error).toBeInstanceOf(Error)
    expect((recorded.state.error as DetailedError).name).toBe('DetailedError')
    expect((recorded.state.error as DetailedError).statusCode).toBe(400)
    expect((recorded.state.error as DetailedError).detail).toStrictEqual({
      data: { error: 'name is required' },
      statusText: '',
    })
  })
})
