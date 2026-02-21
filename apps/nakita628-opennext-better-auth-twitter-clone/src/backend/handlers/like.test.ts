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

vi.mock('@/backend/transactions/like', () => ({
  create: vi.fn(),
  remove: vi.fn(),
}))

import app from '@/backend'
import { DatabaseError, NotFoundError, UnauthorizedError, ValidationError } from '@/backend/domain'
import * as LikeTransaction from '@/backend/transactions/like'

function mockSession() {
  return {
    user: { id: faker.string.uuid(), email: 'test@example.com', name: 'Test User' },
    session: { id: faker.string.uuid() },
  }
}

function mockPostWithLikes() {
  return {
    id: faker.string.uuid(),
    body: 'Hello',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: faker.string.uuid(),
    likes: [
      {
        userId: faker.string.uuid(),
        postId: faker.string.uuid(),
        createdAt: new Date().toISOString(),
      },
    ],
  }
}

describe('Like', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('POST /api/like', () => {
    it('should return 200 on success', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      const mockPost = mockPostWithLikes()
      vi.mocked(LikeTransaction.create).mockReturnValue(Effect.succeed(mockPost))

      const res = await app.request('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: faker.string.uuid() }),
      })

      expect(res.status).toBe(200)
      const json = await res.json()
      expect(json).toStrictEqual(mockPost)
    })

    it('should return 401 when not authenticated', async () => {
      mockGetSession.mockResolvedValue(null)

      const res = await app.request('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: faker.string.uuid() }),
      })

      expect(res.status).toBe(401)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Unauthorized' })
    })

    it('should return 401 on UnauthorizedError from transaction', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(LikeTransaction.create).mockReturnValue(
        Effect.fail(new UnauthorizedError({ message: 'Not signed in' })),
      )

      const res = await app.request('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: faker.string.uuid() }),
      })

      expect(res.status).toBe(401)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Not signed in' })
    })

    it('should return 404 on NotFoundError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(LikeTransaction.create).mockReturnValue(
        Effect.fail(new NotFoundError({ message: 'Post not found' })),
      )

      const res = await app.request('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: faker.string.uuid() }),
      })

      expect(res.status).toBe(404)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Post not found' })
    })

    it('should return 422 on invalid postId format', async () => {
      mockGetSession.mockResolvedValue(mockSession())

      const res = await app.request('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: 'not-a-uuid' }),
      })

      expect(res.status).toBe(422)
    })

    it('should return 500 on ValidationError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(LikeTransaction.create).mockReturnValue(
        Effect.fail(new ValidationError({ message: 'Already liked' })),
      )

      const res = await app.request('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: faker.string.uuid() }),
      })

      expect(res.status).toBe(500)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Already liked' })
    })

    it('should return 503 on DatabaseError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(LikeTransaction.create).mockReturnValue(
        Effect.fail(new DatabaseError({ message: 'Database unavailable' })),
      )

      const res = await app.request('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: faker.string.uuid() }),
      })

      expect(res.status).toBe(503)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Database unavailable' })
    })
  })

  describe('DELETE /api/like', () => {
    it('should return 200 on success', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      const mockPost = mockPostWithLikes()
      vi.mocked(LikeTransaction.remove).mockReturnValue(Effect.succeed(mockPost))

      const res = await app.request('/api/like', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: faker.string.uuid() }),
      })

      expect(res.status).toBe(200)
      const json = await res.json()
      expect(json).toStrictEqual(mockPost)
    })

    it('should return 401 when not authenticated', async () => {
      mockGetSession.mockResolvedValue(null)

      const res = await app.request('/api/like', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: faker.string.uuid() }),
      })

      expect(res.status).toBe(401)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Unauthorized' })
    })

    it('should return 404 on NotFoundError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(LikeTransaction.remove).mockReturnValue(
        Effect.fail(new NotFoundError({ message: 'Post not found' })),
      )

      const res = await app.request('/api/like', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: faker.string.uuid() }),
      })

      expect(res.status).toBe(404)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Post not found' })
    })

    it('should return 422 on invalid postId format', async () => {
      mockGetSession.mockResolvedValue(mockSession())

      const res = await app.request('/api/like', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: 'not-a-uuid' }),
      })

      expect(res.status).toBe(422)
    })

    it('should return 500 on ValidationError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(LikeTransaction.remove).mockReturnValue(
        Effect.fail(new ValidationError({ message: 'Invalid post data' })),
      )

      const res = await app.request('/api/like', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: faker.string.uuid() }),
      })

      expect(res.status).toBe(500)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Invalid post data' })
    })

    it('should return 503 on DatabaseError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(LikeTransaction.remove).mockReturnValue(
        Effect.fail(new DatabaseError({ message: 'Database unavailable' })),
      )

      const res = await app.request('/api/like', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: faker.string.uuid() }),
      })

      expect(res.status).toBe(503)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Database unavailable' })
    })
  })
})
