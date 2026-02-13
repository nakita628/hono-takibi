import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Effect } from 'effect'
import { DatabaseError, NotFoundError, UnauthorizedError } from '@/backend/domain'
import app from '@/backend'
import * as PostsTransaction from '@/backend/transactions/posts'

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

function mockPostResponse() {
  return {
    id: faker.string.uuid(),
    body: 'Hello world',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: faker.string.uuid(),
  }
}

function mockPostWithDetails() {
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

  describe('GET /posts', () => {
    it('should return 200', async () => {
      const res = await app.request(`/posts`, { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
  describe('POST /posts', () => {
    it('should return 200', async () => {
      const body = mockCreatePostRequest()
      const res = await app.request(`/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      expect(res.status).toBe(200)
    })
  })
  describe('GET /posts/{postId}', () => {
    it('should return 200', async () => {
      const res = await app.request(`/posts/{postId}`, { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
