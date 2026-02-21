import type { Mock } from 'vitest'

declare global {
  // eslint-disable-next-line no-var
  var mockGetSession: Mock
}
