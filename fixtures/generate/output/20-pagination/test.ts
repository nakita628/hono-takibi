import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

describe('Pagination Test', () => {
  describe('default', () => {
    describe('GET /items', () => {
      it('should return 200 - List items with pagination', async () => {
        const limit = faker.number.int({ min: 1, max: 1000 })
        const cursor = faker.string.alpha({ length: { min: 5, max: 20 } })
        const res = await app.request(
          `/items?limit=${encodeURIComponent(String(limit))}&cursor=${encodeURIComponent(String(cursor))}`,
          { method: 'GET' },
        )
        expect(res.status).toBe(200)
      })
    })
    describe('GET /feeds', () => {
      it('should return 200 - Feed (paginated, no args)', async () => {
        const res = await app.request(`/feeds`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /users/{userId}/posts', () => {
      it("should return 200 - User's posts (paginated, path param)", async () => {
        const userId = faker.string.alpha({ length: { min: 5, max: 20 } })
        const cursor = faker.string.alpha({ length: { min: 5, max: 20 } })
        const res = await app.request(
          `/users/${userId}/posts?cursor=${encodeURIComponent(String(cursor))}`,
          { method: 'GET' },
        )
        expect(res.status).toBe(200)
      })
    })
  })
})
