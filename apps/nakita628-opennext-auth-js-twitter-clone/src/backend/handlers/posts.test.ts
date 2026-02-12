import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from '@/backend'

function mockCreatePostRequest() {
  return {
    body: faker.string.alpha({ length: { min: 5, max: 20 } }),
  }
}

describe('Posts', () => {
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
