import { describe, expect, it } from 'vitest'
import app from './index'
import { faker } from '@faker-js/faker'

describe('Minimal API', () => {
  describe('default', () => {
    describe('GET /health', () => {
      it('should return 200', async () => {
        const res = await app.request(`/health`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /health/test', () => {
      it('should return 200', async () => {
        const res = await app.request(`/health/test`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
  })

  describe('POST /health/test2', () => {
    it('should return 200', async () => {
      const body = {
        status: faker.helpers.arrayElement([
          faker.helpers.arrayElement(['active', 'inactive', 'pending']),
          undefined,
        ]),
        required: faker.helpers.arrayElement([undefined, undefined]),
      }
      const res = await app.request(`/health/test2`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      expect(res.status).toBe(200)
    })
  })

  describe('GET /health/{id}', () => {
    it('should return 200', async () => {
      const id = faker.string.alpha({ length: { min: 5, max: 20 } })
      const res = await app.request(`/health/${id}`, { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
