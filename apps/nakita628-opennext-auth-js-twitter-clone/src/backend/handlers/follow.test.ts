import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Effect } from 'effect'
import { DatabaseError, NotFoundError, UnauthorizedError } from '@/backend/domain'
import app from '@/backend'
import * as FollowTransaction from '@/backend/transactions/follow'

function mockFollowUserRequest() {
  return {
    userId: faker.string.uuid(),
  }
}

describe('Follow', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('DELETE /follow', () => {
    it('should return 200', async () => {
      const body = mockFollowUserRequest()
      const res = await app.request(`/follow`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      expect(res.status).toBe(200)
    })
  })
  describe('POST /follow', () => {
    it('should return 200', async () => {
      const body = mockFollowUserRequest()
      const res = await app.request(`/follow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      expect(res.status).toBe(200)
    })
  })
})
