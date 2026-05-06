import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

describe('Pagination API', () => {
  describe('default', () => {
    describe('GET /users', () => {
      it('should return 200', async () => {
        const cursor = faker.string.alpha({ length: { min: 5, max: 20 } })
        const limit = faker.number.int({ min: 1, max: 1000 })
        const res = await app.request(
          `/users?cursor=${encodeURIComponent(String(cursor))}&limit=${encodeURIComponent(String(limit))}`,
          { method: 'GET' },
        )
        expect(res.status).toBe(200)
      })
    })
    describe('GET /posts', () => {
      it('should return 200', async () => {
        const cursor = faker.string.alpha({ length: { min: 5, max: 20 } })
        const res = await app.request(`/posts?cursor=${encodeURIComponent(String(cursor))}`, {
          method: 'GET',
        })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /health', () => {
      it('should return 200', async () => {
        const res = await app.request(`/health`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
  })
})
