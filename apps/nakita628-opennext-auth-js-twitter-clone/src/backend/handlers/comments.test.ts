import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'
import app from '@/backend'

function mockCreateCommentRequest() {
  return {
    body: faker.string.alpha({ length: { min: 5, max: 20 } }),
  }
}

describe('Comments', () => {
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
