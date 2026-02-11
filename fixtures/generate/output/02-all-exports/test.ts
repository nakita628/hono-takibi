import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

describe('All Exports API', () => {
  describe('default', () => {
    describe('GET /users', () => {
      it('GET /users', async () => {
        const res = await app.request(`/users`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /users', () => {
      it('POST /users', async () => {
        const res = await app.request(`/users`, { method: 'POST' })
        expect(res.status).toBe(201)
      })
    })
    describe('GET /users/{id}', () => {
      it('GET /users/{id}', async () => {
        const res = await app.request(`/users/{id}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${faker.string.alphanumeric(32)}` },
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const res = await app.request(`/users/{id}`, { method: 'GET' })
        expect(res.status).toBe(401)
      })
    })
  })
})
