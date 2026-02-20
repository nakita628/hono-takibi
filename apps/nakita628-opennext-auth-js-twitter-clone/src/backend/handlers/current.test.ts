import { faker } from '@faker-js/faker'
import { Effect } from 'effect'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockGetSession = vi.hoisted(() => vi.fn())

vi.mock('@/lib/auth', () => ({
  auth: () => ({
    api: { getSession: mockGetSession },
    handler: vi.fn().mockResolvedValue(new Response()),
  }),
}))

vi.mock('@opennextjs/cloudflare', () => ({
  getCloudflareContext: () => ({ env: { DB: {} } }),
}))

vi.mock('@/backend/transactions/current', () => ({
  get: vi.fn(),
}))

import app from '@/backend'
import { DatabaseError, UnauthorizedError, ValidationError } from '@/backend/domain'
import * as CurrentTransaction from '@/backend/transactions/current'

function mockSession() {
  return {
    user: { id: faker.string.uuid(), email: 'test@example.com', name: 'Test User' },
    session: { id: faker.string.uuid() },
  }
}

function mockCurrentUserResponse() {
  return {
    id: faker.string.uuid(),
    name: 'Test User',
    username: 'testuser',
    email: 'test@example.com',
    image: null,
    coverImage: null,
    profileImage: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    followers: [],
    following: [],
    hasNotification: false,
  }
}

describe('GET /api/current', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return 200 on success', async () => {
    const session = mockSession()
    mockGetSession.mockResolvedValue(session)

    const mockUser = mockCurrentUserResponse()
    vi.mocked(CurrentTransaction.get).mockReturnValue(
      Effect.succeed(mockUser),
    )

    const res = await app.request('/api/current', { method: 'GET' })

    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toStrictEqual(mockUser)
  })

  it('should return 401 when not authenticated', async () => {
    mockGetSession.mockResolvedValue(null)

    const res = await app.request('/api/current', { method: 'GET' })

    expect(res.status).toBe(401)
    const json = await res.json()
    expect(json).toStrictEqual({ message: 'Unauthorized' })
  })

  it('should return 401 on UnauthorizedError from transaction', async () => {
    const session = mockSession()
    mockGetSession.mockResolvedValue(session)

    vi.mocked(CurrentTransaction.get).mockReturnValue(
      Effect.fail(new UnauthorizedError({ message: 'Unauthorized' })),
    )

    const res = await app.request('/api/current', { method: 'GET' })

    expect(res.status).toBe(401)
    const json = await res.json()
    expect(json).toStrictEqual({ message: 'Unauthorized' })
  })

  it('should return 500 on ValidationError', async () => {
    const session = mockSession()
    mockGetSession.mockResolvedValue(session)

    vi.mocked(CurrentTransaction.get).mockReturnValue(
      Effect.fail(new ValidationError({ message: 'Invalid current user data' })),
    )

    const res = await app.request('/api/current', { method: 'GET' })

    expect(res.status).toBe(500)
    const json = await res.json()
    expect(json).toStrictEqual({ message: 'Invalid current user data' })
  })

  it('should return 503 on DatabaseError', async () => {
    const session = mockSession()
    mockGetSession.mockResolvedValue(session)

    vi.mocked(CurrentTransaction.get).mockReturnValue(
      Effect.fail(new DatabaseError({ message: 'Database unavailable' })),
    )

    const res = await app.request('/api/current', { method: 'GET' })

    expect(res.status).toBe(503)
    const json = await res.json()
    expect(json).toStrictEqual({ message: 'Database unavailable' })
  })

  it('should pass email from session to transaction', async () => {
    const session = mockSession()
    mockGetSession.mockResolvedValue(session)

    const mockUser = mockCurrentUserResponse()
    vi.mocked(CurrentTransaction.get).mockReturnValue(
      Effect.succeed(mockUser),
    )

    await app.request('/api/current', { method: 'GET' })

    expect(CurrentTransaction.get).toHaveBeenCalledWith('test@example.com')
  })
})
