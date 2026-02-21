import { faker } from '@faker-js/faker'
import { Effect } from 'effect'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import app from '@/backend'
import { DatabaseError, NotFoundError, ValidationError } from '@/backend/domain'
import * as UsersTransaction from '@/backend/transactions/users'

function mockSession() {
  return {
    user: { id: faker.string.uuid(), email: 'test@example.com', name: 'Test User' },
    session: { id: faker.string.uuid() },
  }
}

function mockUser() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    username: faker.internet.username(),
    bio: null,
    email: faker.internet.email(),
    emailVerified: null,
    image: null,
    coverImage: null,
    profileImage: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    hasNotification: false,
  }
}

function mockPaginatedUsers() {
  return {
    data: [mockUser()],
    meta: { page: 1, limit: 20, total: 1, totalPages: 1 },
  }
}

function mockUserWithFollowCount() {
  return {
    ...mockUser(),
    _count: { followers: 5, following: 3 },
  }
}

describe('Users', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET /api/users', () => {
    it('should return 200 on success', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      const mockUsers = mockPaginatedUsers()
      vi.mocked(UsersTransaction.getAll).mockReturnValue(Effect.succeed(mockUsers))

      const res = await app.request('/api/users', { method: 'GET' })

      expect(res.status).toBe(200)
      const json = await res.json()
      expect(json).toStrictEqual(mockUsers)
    })

    it('should return 401 when not authenticated', async () => {
      mockGetSession.mockResolvedValue(null)

      const res = await app.request('/api/users', { method: 'GET' })

      expect(res.status).toBe(401)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Unauthorized' })
    })

    it('should pass pagination params to transaction', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(UsersTransaction.getAll).mockReturnValue(Effect.succeed(mockPaginatedUsers()))

      await app.request('/api/users?page=3&limit=50', { method: 'GET' })

      expect(UsersTransaction.getAll).toHaveBeenCalledWith({
        page: 3,
        limit: 50,
      })
    })

    it('should use default pagination when no params', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(UsersTransaction.getAll).mockReturnValue(Effect.succeed(mockPaginatedUsers()))

      await app.request('/api/users', { method: 'GET' })

      expect(UsersTransaction.getAll).toHaveBeenCalledWith({
        page: 1,
        limit: 20,
      })
    })

    it('should return 500 on ValidationError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(UsersTransaction.getAll).mockReturnValue(
        Effect.fail(new ValidationError({ message: 'Invalid users data' })),
      )

      const res = await app.request('/api/users', { method: 'GET' })

      expect(res.status).toBe(500)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Invalid users data' })
    })

    it('should return 503 on DatabaseError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(UsersTransaction.getAll).mockReturnValue(
        Effect.fail(new DatabaseError({ message: 'Database unavailable' })),
      )

      const res = await app.request('/api/users', { method: 'GET' })

      expect(res.status).toBe(503)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Database unavailable' })
    })
  })

  describe('GET /api/users/{userId}', () => {
    it('should return 200 on success', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      const mockUserData = mockUserWithFollowCount()
      vi.mocked(UsersTransaction.getById).mockReturnValue(Effect.succeed(mockUserData))

      const userId = faker.string.uuid()
      const res = await app.request(`/api/users/${userId}`, { method: 'GET' })

      expect(res.status).toBe(200)
      const json = await res.json()
      expect(json).toStrictEqual(mockUserData)
    })

    it('should return 401 when not authenticated', async () => {
      mockGetSession.mockResolvedValue(null)

      const userId = faker.string.uuid()
      const res = await app.request(`/api/users/${userId}`, { method: 'GET' })

      expect(res.status).toBe(401)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Unauthorized' })
    })

    it('should return 404 on NotFoundError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(UsersTransaction.getById).mockReturnValue(
        Effect.fail(new NotFoundError({ message: 'User not found' })),
      )

      const userId = faker.string.uuid()
      const res = await app.request(`/api/users/${userId}`, { method: 'GET' })

      expect(res.status).toBe(404)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'User not found' })
    })

    it('should return 422 on invalid userId format', async () => {
      mockGetSession.mockResolvedValue(mockSession())

      const res = await app.request('/api/users/not-a-uuid', { method: 'GET' })

      expect(res.status).toBe(422)
    })

    it('should return 500 on ValidationError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(UsersTransaction.getById).mockReturnValue(
        Effect.fail(new ValidationError({ message: 'Invalid user data' })),
      )

      const userId = faker.string.uuid()
      const res = await app.request(`/api/users/${userId}`, { method: 'GET' })

      expect(res.status).toBe(500)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Invalid user data' })
    })

    it('should return 503 on DatabaseError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(UsersTransaction.getById).mockReturnValue(
        Effect.fail(new DatabaseError({ message: 'Database unavailable' })),
      )

      const userId = faker.string.uuid()
      const res = await app.request(`/api/users/${userId}`, { method: 'GET' })

      expect(res.status).toBe(503)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Database unavailable' })
    })

    it('should pass userId to transaction', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(UsersTransaction.getById).mockReturnValue(Effect.succeed(mockUserWithFollowCount()))

      const userId = faker.string.uuid()
      await app.request(`/api/users/${userId}`, { method: 'GET' })

      expect(UsersTransaction.getById).toHaveBeenCalledWith(userId)
    })
  })
})
