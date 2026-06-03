import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

function mockItemUpdate() {
  return { name: faker.helpers.arrayElement([faker.person.fullName(), undefined]) }
}

describe('Parameters Merge API', () => {
  describe('default', () => {
    describe('GET /items/{itemId}', () => {
      it('should return 200', async () => {
        const fields = faker.string.alpha({ length: { min: 5, max: 20 } })
        const res = await app.request(
          `/items/{itemId}?fields=${encodeURIComponent(String(fields))}`,
          { method: 'GET' },
        )
        expect(res.status).toBe(200)
      })
    })
    describe('PUT /items/{itemId}', () => {
      it('should return 200', async () => {
        const version = faker.string.alpha({ length: { min: 5, max: 20 } })
        const body = mockItemUpdate()
        const res = await app.request(`/items/{itemId}`, {
          method: 'PUT',
          headers: { version: String(version), 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('DELETE /items/{itemId}', () => {
      it('should return 204', async () => {
        const res = await app.request(`/items/{itemId}`, { method: 'DELETE' })
        expect(res.status).toBe(204)
      })
    })
    describe('GET /items', () => {
      it('should return 200', async () => {
        const limit = faker.number.int({ min: 1, max: 100 })
        const offset = faker.number.int({ min: 0, max: 1000 })
        const sort = faker.helpers.arrayElement(['name', 'created', 'updated'] as const)
        const res = await app.request(
          `/items?limit=${encodeURIComponent(String(limit))}&offset=${encodeURIComponent(String(offset))}&sort=${encodeURIComponent(String(sort))}`,
          { method: 'GET' },
        )
        expect(res.status).toBe(200)
      })
    })
  })
})
