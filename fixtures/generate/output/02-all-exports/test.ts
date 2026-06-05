import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

describe('All Exports API', () => {
  describe('default', () => {
    describe('GET /users', () => {
      it('should return 200', async () => {
        const page = faker.number.int({ min: 1, max: 1000 })
        const res = await app.request(`/users?page=${encodeURIComponent(String(page))}`, {
          method: 'GET',
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /users', () => {
      it('should return 201', async () => {
        const res = await app.request(`/users`, { method: 'POST' })
        expect(res.status).toBe(201)
      })
    })
    describe('GET /users/{id}', () => {
      it('should return 200', async () => {
        const id = faker.number.int({ min: 1, max: 99999 })
        const res = await app.request(`/users/${id}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${faker.string.alphanumeric(32)}` },
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const id = faker.number.int({ min: 1, max: 99999 })
        const res = await app.request(`/users/${id}`, { method: 'GET' })
        expect(res.status).toBe(401)
      })
    })
  })
})
