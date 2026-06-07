import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

describe('Security Schemes API', () => {
  describe('default', () => {
    describe('GET /public', () => {
      it('should return 200', async () => {
        const res = await app.request(`/public`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /bearer-protected', () => {
      it('should return 200', async () => {
        const res = await app.request(`/bearer-protected`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${faker.string.alphanumeric(32)}` },
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const res = await app.request(`/bearer-protected`, { method: 'GET' })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /api-key-protected', () => {
      it('should return 200', async () => {
        const res = await app.request(`/api-key-protected`, {
          method: 'GET',
          headers: { 'X-API-Key': faker.string.alphanumeric(32) },
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const res = await app.request(`/api-key-protected`, { method: 'GET' })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /basic-protected', () => {
      it('should return 200', async () => {
        const res = await app.request(`/basic-protected`, {
          method: 'GET',
          headers: {
            Authorization: `Basic ${btoa(`${faker.internet.username()}:${faker.internet.password()}`)}`,
          },
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const res = await app.request(`/basic-protected`, { method: 'GET' })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /oauth-protected', () => {
      it('should return 200', async () => {
        const res = await app.request(`/oauth-protected`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${faker.string.alphanumeric(32)}` },
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const res = await app.request(`/oauth-protected`, { method: 'GET' })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /multi-auth', () => {
      it('should return 200', async () => {
        const res = await app.request(`/multi-auth`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${faker.string.alphanumeric(32)}`,
            'X-API-Key': faker.string.alphanumeric(32),
          },
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const res = await app.request(`/multi-auth`, { method: 'GET' })
        expect(res.status).toBe(401)
      })
    })
  })
})
