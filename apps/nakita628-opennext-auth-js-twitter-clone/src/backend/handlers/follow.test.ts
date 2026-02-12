import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'
import app from '@/backend'

function mockFollowUserRequest() {
  return {
    userId: faker.string.uuid(),
  }
}

describe('Follow', () => {
  describe('DELETE /follow', () => {
    it('should return 200', async () => {
      const body = mockFollowUserRequest()
      const res = await app.request('/follow', {
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
      const res = await app.request('/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      expect(res.status).toBe(200)
    })
  })
})
