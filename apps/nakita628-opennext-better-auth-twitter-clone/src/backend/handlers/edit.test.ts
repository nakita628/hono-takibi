import { faker } from '@faker-js/faker'
import { Effect } from 'effect'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import app from '@/backend'
import { DatabaseError, UnauthorizedError, ValidationError } from '@/backend/domain'
import * as EditTransaction from '@/backend/transactions/edit'

function mockSession() {
  return {
    user: { id: faker.string.uuid(), email: 'test@example.com', name: 'Test User' },
    session: { id: faker.string.uuid() },
  }
}

function mockUserResponse() {
  return {
    id: faker.string.uuid(),
    name: 'Updated User',
    username: 'updated',
    bio: 'Hello',
    email: 'test@example.com',
    emailVerified: null,
    image: null,
    coverImage: null,
    profileImage: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    hasNotification: null,
  }
}

function mockEditUserRequest() {
  return {
    name: faker.helpers.arrayElement([faker.person.fullName(), undefined]),
    username: faker.helpers.arrayElement([faker.internet.username(), undefined]),
    bio: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
    coverImage: faker.helpers.arrayElement([faker.internet.url(), null]),
    profileImage: faker.helpers.arrayElement([faker.internet.url(), null]),
  }
}

describe('PATCH /api/edit', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return 200 on success', async () => {
    mockGetSession.mockResolvedValue(mockSession())
    const mockUser = mockUserResponse()
    vi.mocked(EditTransaction.update).mockReturnValue(Effect.succeed(mockUser))

    const res = await app.request('/api/edit', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Updated User' }),
    })

    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toStrictEqual(mockUser)
  })

  it('should return 401 when not authenticated', async () => {
    mockGetSession.mockResolvedValue(null)

    const res = await app.request('/api/edit', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Updated User' }),
    })

    expect(res.status).toBe(401)
    const json = await res.json()
    expect(json).toStrictEqual({ message: 'Unauthorized' })
  })

  it('should return 401 on UnauthorizedError from transaction', async () => {
    mockGetSession.mockResolvedValue(mockSession())
    vi.mocked(EditTransaction.update).mockReturnValue(
      Effect.fail(new UnauthorizedError({ message: 'Not signed in' })),
    )

    const res = await app.request('/api/edit', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Updated User' }),
    })

    expect(res.status).toBe(401)
    const json = await res.json()
    expect(json).toStrictEqual({ message: 'Not signed in' })
  })

  it('should return 422 on invalid coverImage format', async () => {
    mockGetSession.mockResolvedValue(mockSession())

    const res = await app.request('/api/edit', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ coverImage: 'not-a-url' }),
    })

    expect(res.status).toBe(422)
  })

  it('should return 500 on ValidationError', async () => {
    mockGetSession.mockResolvedValue(mockSession())
    vi.mocked(EditTransaction.update).mockReturnValue(
      Effect.fail(new ValidationError({ message: 'Invalid user data' })),
    )

    const res = await app.request('/api/edit', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Updated User' }),
    })

    expect(res.status).toBe(500)
    const json = await res.json()
    expect(json).toStrictEqual({ message: 'Invalid user data' })
  })

  it('should return 503 on DatabaseError', async () => {
    mockGetSession.mockResolvedValue(mockSession())
    vi.mocked(EditTransaction.update).mockReturnValue(
      Effect.fail(new DatabaseError({ message: 'Database unavailable' })),
    )

    const res = await app.request('/api/edit', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Updated User' }),
    })

    expect(res.status).toBe(503)
    const json = await res.json()
    expect(json).toStrictEqual({ message: 'Database unavailable' })
  })

  it('should pass email and body to transaction', async () => {
    mockGetSession.mockResolvedValue(mockSession())
    const mockUser = mockUserResponse()
    vi.mocked(EditTransaction.update).mockReturnValue(Effect.succeed(mockUser))

    const body = { name: 'New Name', bio: 'New Bio' }
    await app.request('/api/edit', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    expect(EditTransaction.update).toHaveBeenCalledWith('test@example.com', body)
  })
})
