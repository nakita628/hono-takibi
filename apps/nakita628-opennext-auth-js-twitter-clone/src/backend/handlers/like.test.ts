import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import app from '@/backend'

function mockLikePostRequest() {
  return {
    postId: faker.string.uuid(),
  }
}

describe('Like', () => {
  describe('DELETE /like', () => {
    it('should return 200', async () => {
      const body = mockLikePostRequest()
      const res = await app.request(`/like`, {
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
      const res = await app.request(`/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      expect(res.status).toBe(200)
    })
  })
})
