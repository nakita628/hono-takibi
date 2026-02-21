import { faker } from '@faker-js/faker'
import { Effect } from 'effect'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import app from '@/backend'
import { DatabaseError, NotFoundError, ValidationError } from '@/backend/domain'
import * as FollowTransaction from '@/backend/transactions/follow'

function mockSession() {
  return {
    user: { id: faker.string.uuid(), email: 'test@example.com', name: 'Test User' },
    session: { id: faker.string.uuid() },
  }
}

describe('Follow', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('POST /api/follow', () => {
    it('should return 200 on success', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(FollowTransaction.create).mockReturnValue(Effect.succeed({ message: 'Success' }))

      const userId = faker.string.uuid()
      const res = await app.request('/api/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      expect(res.status).toBe(200)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Success' })
    })

    it('should return 401 when not authenticated', async () => {
      mockGetSession.mockResolvedValue(null)

      const res = await app.request('/api/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: faker.string.uuid() }),
      })

      expect(res.status).toBe(401)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Unauthorized' })
    })

    it('should return 404 on NotFoundError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(FollowTransaction.create).mockReturnValue(
        Effect.fail(new NotFoundError({ message: 'User not found' })),
      )

      const res = await app.request('/api/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: faker.string.uuid() }),
      })

      expect(res.status).toBe(404)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'User not found' })
    })

    it('should return 422 on invalid userId format', async () => {
      mockGetSession.mockResolvedValue(mockSession())

      const res = await app.request('/api/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'not-a-uuid' }),
      })

      expect(res.status).toBe(422)
    })

    it('should return 500 on ValidationError (self-follow)', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(FollowTransaction.create).mockReturnValue(
        Effect.fail(new ValidationError({ message: 'Cannot follow yourself' })),
      )

      const res = await app.request('/api/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: faker.string.uuid() }),
      })

      expect(res.status).toBe(500)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Cannot follow yourself' })
    })

    it('should return 503 on DatabaseError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(FollowTransaction.create).mockReturnValue(
        Effect.fail(new DatabaseError({ message: 'Database unavailable' })),
      )

      const res = await app.request('/api/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: faker.string.uuid() }),
      })

      expect(res.status).toBe(503)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Database unavailable' })
    })

    it('should pass correct arguments to transaction', async () => {
      const session = mockSession()
      mockGetSession.mockResolvedValue(session)
      vi.mocked(FollowTransaction.create).mockReturnValue(Effect.succeed({ message: 'Success' }))

      const userId = faker.string.uuid()
      await app.request('/api/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      expect(FollowTransaction.create).toHaveBeenCalledWith(session.user.id, { userId })
    })
  })

  describe('DELETE /api/follow', () => {
    it('should return 200 on success', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(FollowTransaction.remove).mockReturnValue(Effect.succeed({ message: 'Success' }))

      const userId = faker.string.uuid()
      const res = await app.request('/api/follow', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      expect(res.status).toBe(200)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Success' })
    })

    it('should return 401 when not authenticated', async () => {
      mockGetSession.mockResolvedValue(null)

      const res = await app.request('/api/follow', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: faker.string.uuid() }),
      })

      expect(res.status).toBe(401)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Unauthorized' })
    })

    it('should return 422 on invalid userId format', async () => {
      mockGetSession.mockResolvedValue(mockSession())

      const res = await app.request('/api/follow', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'not-a-uuid' }),
      })

      expect(res.status).toBe(422)
    })

    it('should return 500 on ValidationError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(FollowTransaction.remove).mockReturnValue(
        Effect.fail(new ValidationError({ message: 'Invalid response data' })),
      )

      const res = await app.request('/api/follow', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: faker.string.uuid() }),
      })

      expect(res.status).toBe(500)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Invalid response data' })
    })

    it('should return 503 on DatabaseError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(FollowTransaction.remove).mockReturnValue(
        Effect.fail(new DatabaseError({ message: 'Database unavailable' })),
      )

      const res = await app.request('/api/follow', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: faker.string.uuid() }),
      })

      expect(res.status).toBe(503)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Database unavailable' })
    })
  })
})
