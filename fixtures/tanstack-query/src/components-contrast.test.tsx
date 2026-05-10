import { cleanup, screen, waitFor, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { UserDetailContrast } from './components'
import { renderWithClient } from './test-utils'

afterEach(() => {
  cleanup()
})

/**
 * UI-level proof of the parseResponse contract.
 *
 * Two components render against the same id at the same time:
 *   - Wrapped (UserDetail):        uses generated `useUsersId` (with parseResponse)
 *   - Raw    (UserDetailRaw):      uses `client.users[':id'].$get(...).then(r => r.json())`
 *
 * The 200 case is indistinguishable from the user's perspective.
 * The 404 case is where they diverge: the wrapped component flips to an
 * error UI; the raw component renders "success" while showing the error
 * payload as if it were data.
 */
describe('UI contrast — parseResponse vs raw .json() on the same id', () => {
  it('200: both components render the same user', async () => {
    renderWithClient(<UserDetailContrast id="1" />)

    const wrapped = screen.getByTestId('contrast-wrapped')
    const raw = screen.getByTestId('contrast-raw')

    await waitFor(() => {
      expect(within(wrapped).queryByTestId('user-1')).not.toBeNull()
      expect(within(raw).queryByTestId('raw-status')?.textContent).toBe('success')
    })

    expect(within(wrapped).getByTestId('user-1').textContent).toBe('Alice')
    expect(within(raw).getByTestId('raw-data').textContent).toBe(
      JSON.stringify({ id: '1', name: 'Alice' }),
    )
  })

  it('404: wrapped flips to error UI; raw renders "success" with the error payload', async () => {
    renderWithClient(<UserDetailContrast id="999" />)

    const wrapped = screen.getByTestId('contrast-wrapped')
    const raw = screen.getByTestId('contrast-raw')

    await waitFor(() => {
      expect(within(wrapped).queryByTestId('user-error-status')).not.toBeNull()
      expect(within(raw).queryByTestId('raw-status')?.textContent).toBe('success')
    })

    // Wrapped: error UI with the right status + payload
    expect(within(wrapped).getByTestId('user-error-status').textContent).toBe('404')
    expect(within(wrapped).getByTestId('user-error-detail').textContent).toBe(
      JSON.stringify({ error: 'Not Found' }),
    )

    // Raw: claims success even though the server returned 404
    expect(within(raw).getByTestId('raw-status').textContent).toBe('success')
    expect(within(raw).getByTestId('raw-error-null').textContent).toBe('error-is-null')
    expect(within(raw).getByTestId('raw-data').textContent).toBe(
      JSON.stringify({ error: 'Not Found' }),
    )
  })

  it('contract summary — same input id, opposite isError on 404', async () => {
    renderWithClient(<UserDetailContrast id="999" />)
    await waitFor(() => {
      expect(screen.queryByTestId('user-error-status')).not.toBeNull()
      expect(screen.queryByTestId('raw-status')?.textContent).toBe('success')
    })

    const wrappedIsError = screen.queryByTestId('user-error-status') !== null
    const rawIsError =
      screen.getByTestId('raw-status').textContent === 'error'

    expect({ wrappedIsError, rawIsError }).toStrictEqual({
      wrappedIsError: true,
      rawIsError: false,
    })
  })
})
