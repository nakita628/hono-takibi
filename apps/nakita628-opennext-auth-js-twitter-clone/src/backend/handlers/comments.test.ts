import { faker } from '@faker-js/faker'
import { Effect } from 'effect'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import app from '@/backend'
import { DatabaseError, UnauthorizedError } from '@/backend/domain'
import * as CommentsTransaction from '@/backend/transactions/comments'

function mockCommentResponse() {
  return {
    id: faker.string.uuid(),
    body: 'Nice post!',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: faker.string.uuid(),
    postId: faker.string.uuid(),
  }
}

function mockCreateCommentRequest() {
  return {
    body: faker.string.alpha({ length: { min: 5, max: 20 } }),
  }
}

describe('Comments', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('POST /comments', () => {
    it('should return 200', async () => {
      const body = mockCreateCommentRequest()
      const res = await app.request('/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      expect(res.status).toBe(200)
    })
  })
})
