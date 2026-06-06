import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

function mockItem() {
  return { id: faker.string.alpha({ length: { min: 5, max: 20 } }), name: faker.person.fullName() }
}

describe('Default Response API', () => {
  describe('default', () => {
    describe('POST /items', () => {
      it('should return 200', async () => {
        const body = mockItem()
        const res = await app.request(`/items`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /ping', () => {
      it('should return 2', async () => {
        const res = await app.request(`/ping`, { method: 'GET' })
        expect(res.status).toBe(2)
      })
    })
  })
})
