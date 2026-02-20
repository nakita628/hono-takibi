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

vi.mock('@/backend/transactions/register', () => ({
  create: vi.fn(),
}))

import app from '@/backend'
import { ConflictError, DatabaseError, ValidationError } from '@/backend/domain'
import * as RegisterTransaction from '@/backend/transactions/register'

function mockUserResponse() {
  return {
    id: faker.string.uuid(),
    name: 'Test User',
    username: 'testuser',
    bio: '',
    email: 'test@example.com',
    emailVerified: null,
    image: null,
    coverImage: null,
    profileImage: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    hasNotification: false,
  }
}

function mockRegisterRequest() {
  return {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    username: faker.internet.username(),
    password: faker.internet.password(),
  }
}

describe('POST /api/register', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGetSession.mockResolvedValue(null)
  })

  it('should return 201 on success', async () => {
    const mockUser = mockUserResponse()
    vi.mocked(RegisterTransaction.create).mockReturnValue(Effect.succeed(mockUser))

    const body = mockRegisterRequest()
    const res = await app.request('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    expect(res.status).toBe(201)
    const json = await res.json()
    expect(json).toStrictEqual(mockUser)
  })

  it('should return 409 on ConflictError', async () => {
    vi.mocked(RegisterTransaction.create).mockReturnValue(
      Effect.fail(new ConflictError({ message: 'User already exists' })),
    )

    const body = mockRegisterRequest()
    const res = await app.request('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    expect(res.status).toBe(409)
    const json = await res.json()
    expect(json).toStrictEqual({ message: 'User already exists' })
  })

  it('should return 422 on invalid request body', async () => {
    const res = await app.request('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })

    expect(res.status).toBe(422)
  })

  it('should return 422 on invalid email format', async () => {
    const res = await app.request('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'not-an-email',
        name: 'Test',
        username: 'test',
        password: 'pass123',
      }),
    })

    expect(res.status).toBe(422)
  })

  it('should return 500 on ValidationError', async () => {
    vi.mocked(RegisterTransaction.create).mockReturnValue(
      Effect.fail(new ValidationError({ message: 'Invalid user data' })),
    )

    const body = mockRegisterRequest()
    const res = await app.request('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    expect(res.status).toBe(500)
    const json = await res.json()
    expect(json).toStrictEqual({ message: 'Invalid user data' })
  })

  it('should return 503 on DatabaseError', async () => {
    vi.mocked(RegisterTransaction.create).mockReturnValue(
      Effect.fail(new DatabaseError({ message: 'Database unavailable' })),
    )

    const body = mockRegisterRequest()
    const res = await app.request('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    expect(res.status).toBe(503)
    const json = await res.json()
    expect(json).toStrictEqual({ message: 'Database unavailable' })
  })

  it('should call transaction with correct arguments', async () => {
    const mockUser = mockUserResponse()
    vi.mocked(RegisterTransaction.create).mockReturnValue(Effect.succeed(mockUser))

    const body = {
      email: 'user@example.com',
      name: 'Test User',
      username: 'testuser',
      password: 'securepass123',
    }

    await app.request('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    expect(RegisterTransaction.create).toHaveBeenCalledWith(body)
  })
})
