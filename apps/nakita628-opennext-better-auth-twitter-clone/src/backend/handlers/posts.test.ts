import { faker } from '@faker-js/faker'
import { Effect } from 'effect'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import app from '@/backend'
import { DatabaseError, NotFoundError, ValidationError } from '@/backend/domain'
import * as PostsTransaction from '@/backend/transactions/posts'

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

function mockPaginatedPosts() {
  const user = mockUser()
  return {
    data: [
      {
        id: faker.string.uuid(),
        body: 'Hello world',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user.id,
        user,
        commentCount: 0,
        likeCount: 0,
      },
    ],
    meta: { page: 1, limit: 20, total: 1, totalPages: 1 },
  }
}

function mockPostResponse() {
  return {
    id: faker.string.uuid(),
    body: 'Hello world',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: faker.string.uuid(),
  }
}

function mockPostDetail() {
  const user = mockUser()
  return {
    id: faker.string.uuid(),
    body: 'Hello',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: user.id,
    user,
    comments: [],
    likes: [],
    _count: { likes: 0 },
  }
}

function mockCreatePostRequest() {
  return {
    body: faker.string.alpha({ length: { min: 5, max: 20 } }),
  }
}

describe('Posts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET /api/posts', () => {
    it('should return 200 on success', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      const mockPosts = mockPaginatedPosts()
      vi.mocked(PostsTransaction.getAll).mockReturnValue(Effect.succeed(mockPosts))

      const res = await app.request('/api/posts', { method: 'GET' })

      expect(res.status).toBe(200)
      const json = await res.json()
      expect(json).toStrictEqual(mockPosts)
    })

    it('should return 401 when not authenticated', async () => {
      mockGetSession.mockResolvedValue(null)

      const res = await app.request('/api/posts', { method: 'GET' })

      expect(res.status).toBe(401)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Unauthorized' })
    })

    it('should pass pagination params to transaction', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(PostsTransaction.getAll).mockReturnValue(Effect.succeed(mockPaginatedPosts()))

      await app.request('/api/posts?page=2&limit=10', { method: 'GET' })

      expect(PostsTransaction.getAll).toHaveBeenCalledWith({
        page: 2,
        limit: 10,
      })
    })

    it('should pass userId filter to transaction', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(PostsTransaction.getAll).mockReturnValue(Effect.succeed(mockPaginatedPosts()))

      const userId = faker.string.uuid()
      await app.request(`/api/posts?userId=${userId}`, { method: 'GET' })

      expect(PostsTransaction.getAll).toHaveBeenCalledWith({
        userId,
        page: 1,
        limit: 20,
      })
    })

    it('should return 500 on ValidationError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(PostsTransaction.getAll).mockReturnValue(
        Effect.fail(new ValidationError({ message: 'Invalid posts data' })),
      )

      const res = await app.request('/api/posts', { method: 'GET' })

      expect(res.status).toBe(500)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Invalid posts data' })
    })

    it('should return 503 on DatabaseError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(PostsTransaction.getAll).mockReturnValue(
        Effect.fail(new DatabaseError({ message: 'Database unavailable' })),
      )

      const res = await app.request('/api/posts', { method: 'GET' })

      expect(res.status).toBe(503)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Database unavailable' })
    })
  })

  describe('POST /api/posts', () => {
    it('should return 200 on success', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      const mockPost = mockPostResponse()
      vi.mocked(PostsTransaction.create).mockReturnValue(Effect.succeed(mockPost))

      const res = await app.request('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: 'Hello world' }),
      })

      expect(res.status).toBe(200)
      const json = await res.json()
      expect(json).toStrictEqual(mockPost)
    })

    it('should return 401 when not authenticated', async () => {
      mockGetSession.mockResolvedValue(null)

      const res = await app.request('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: 'Hello world' }),
      })

      expect(res.status).toBe(401)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Unauthorized' })
    })

    it('should return 422 on invalid request body', async () => {
      mockGetSession.mockResolvedValue(mockSession())

      const res = await app.request('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })

      expect(res.status).toBe(422)
    })

    it('should return 500 on ValidationError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(PostsTransaction.create).mockReturnValue(
        Effect.fail(new ValidationError({ message: 'Invalid post data' })),
      )

      const res = await app.request('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: 'Hello' }),
      })

      expect(res.status).toBe(500)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Invalid post data' })
    })

    it('should return 503 on DatabaseError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(PostsTransaction.create).mockReturnValue(
        Effect.fail(new DatabaseError({ message: 'Database unavailable' })),
      )

      const res = await app.request('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: 'Hello' }),
      })

      expect(res.status).toBe(503)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Database unavailable' })
    })

    it('should pass user id and body to transaction', async () => {
      const session = mockSession()
      mockGetSession.mockResolvedValue(session)
      vi.mocked(PostsTransaction.create).mockReturnValue(Effect.succeed(mockPostResponse()))

      await app.request('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: 'Test post' }),
      })

      expect(PostsTransaction.create).toHaveBeenCalledWith(session.user.id, {
        body: 'Test post',
      })
    })
  })

  describe('GET /api/posts/{postId}', () => {
    it('should return 200 on success', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      const mockPost = mockPostDetail()
      vi.mocked(PostsTransaction.getById).mockReturnValue(Effect.succeed(mockPost))

      const postId = faker.string.uuid()
      const res = await app.request(`/api/posts/${postId}`, { method: 'GET' })

      expect(res.status).toBe(200)
      const json = await res.json()
      expect(json).toStrictEqual(mockPost)
    })

    it('should return 401 when not authenticated', async () => {
      mockGetSession.mockResolvedValue(null)

      const postId = faker.string.uuid()
      const res = await app.request(`/api/posts/${postId}`, { method: 'GET' })

      expect(res.status).toBe(401)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Unauthorized' })
    })

    it('should return 404 on NotFoundError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(PostsTransaction.getById).mockReturnValue(
        Effect.fail(new NotFoundError({ message: 'Post not found' })),
      )

      const postId = faker.string.uuid()
      const res = await app.request(`/api/posts/${postId}`, { method: 'GET' })

      expect(res.status).toBe(404)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Post not found' })
    })

    it('should return 422 on invalid postId format', async () => {
      mockGetSession.mockResolvedValue(mockSession())

      const res = await app.request('/api/posts/not-a-uuid', { method: 'GET' })

      expect(res.status).toBe(422)
    })

    it('should return 500 on ValidationError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(PostsTransaction.getById).mockReturnValue(
        Effect.fail(new ValidationError({ message: 'Invalid post data' })),
      )

      const postId = faker.string.uuid()
      const res = await app.request(`/api/posts/${postId}`, { method: 'GET' })

      expect(res.status).toBe(500)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Invalid post data' })
    })

    it('should return 503 on DatabaseError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(PostsTransaction.getById).mockReturnValue(
        Effect.fail(new DatabaseError({ message: 'Database unavailable' })),
      )

      const postId = faker.string.uuid()
      const res = await app.request(`/api/posts/${postId}`, { method: 'GET' })

      expect(res.status).toBe(503)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Database unavailable' })
    })

    it('should pass postId to transaction', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(PostsTransaction.getById).mockReturnValue(Effect.succeed(mockPostDetail()))

      const postId = faker.string.uuid()
      await app.request(`/api/posts/${postId}`, { method: 'GET' })

      expect(PostsTransaction.getById).toHaveBeenCalledWith(postId)
    })
  })
})
