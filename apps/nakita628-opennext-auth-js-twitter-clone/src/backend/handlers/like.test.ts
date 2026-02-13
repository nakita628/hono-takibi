import { faker } from '@faker-js/faker'
import { Effect } from 'effect'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import app from '@/backend'
import { DatabaseError, NotFoundError, UnauthorizedError } from '@/backend/domain'
import * as LikeTransaction from '@/backend/transactions/like'

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

function mockLikePostRequest() {
  return {
    postId: faker.string.uuid(),
  }
}

describe('Like', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('DELETE /like', () => {
    it('should return 200', async () => {
      const body = mockLikePostRequest()
      const res = await app.request('/like', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      expect(res.status).toBe(200)
    })
  })
  describe('POST /like', () => {
    it('should return 200', async () => {
      const body = mockLikePostRequest()
      const res = await app.request('/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      expect(res.status).toBe(200)
    })
  })
})
