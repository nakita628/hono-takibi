import { Context, Layer } from 'effect'
import { vi } from 'vitest'

const mockGetSession = vi.fn()
;(globalThis as Record<string, unknown>).mockGetSession = mockGetSession

vi.mock('@/lib/auth', () => ({
  auth: () => ({
    api: {
      getSession: mockGetSession,
    },
    handler: () => new Response('OK'),
  }),
}))

const DB = Context.GenericTag('DB')

vi.mock('@/infra', () => ({
  DB,
  DBLive: Layer.succeed(DB, {}),
  getDb: vi.fn(),
}))

vi.mock('@/backend/middleware/rateLimit', () => ({
  rateLimit: () => async (_c: unknown, next: () => Promise<void>) => next(),
}))

vi.mock('@/backend/transactions/comments')
vi.mock('@/backend/transactions/current')
vi.mock('@/backend/transactions/edit')
vi.mock('@/backend/transactions/follow')
vi.mock('@/backend/transactions/like')
vi.mock('@/backend/transactions/notifications')
vi.mock('@/backend/transactions/posts')
vi.mock('@/backend/transactions/register')
vi.mock('@/backend/transactions/search')
vi.mock('@/backend/transactions/users')
