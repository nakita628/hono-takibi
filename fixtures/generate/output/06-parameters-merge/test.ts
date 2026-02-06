import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

function mockItemUpdate() {
  return {
    name: faker.helpers.arrayElement([faker.person.fullName(), undefined]),
  }
}

describe('Parameters Merge API', () => {
  describe('default', () => {
    describe('GET /items/{itemId}', () => {
      it('GET /items/{itemId}', async () => {
        const fields = faker.string.alpha({ length: { min: 5, max: 20 } })
        const res = await app.request(
          `/items/{itemId}?fields=${encodeURIComponent(String(fields))}`,
          { method: 'GET' },
        )
        expect(res.status).toBe(200)
      })
    })
    describe('PUT /items/{itemId}', () => {
      it('PUT /items/{itemId}', async () => {
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
      it('DELETE /items/{itemId}', async () => {
        const res = await app.request(`/items/{itemId}`, { method: 'DELETE' })
        expect(res.status).toBe(204)
      })
    })
    describe('GET /items', () => {
      it('GET /items', async () => {
        const sort = faker.helpers.arrayElement(['name', 'created', 'updated'] as const)
        const res = await app.request(`/items?sort=${encodeURIComponent(String(sort))}`, {
          method: 'GET',
        })
        expect(res.status).toBe(200)
      })
    })
  })
})
