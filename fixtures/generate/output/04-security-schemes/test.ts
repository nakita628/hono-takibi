import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

describe('Security Schemes API', () => {
  describe('default', () => {
    describe('GET /public', () => {
      it('GET /public', async () => {
        const res = await app.request(`/public`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /bearer-protected', () => {
      it('GET /bearer-protected', async () => {
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
      it('GET /api-key-protected', async () => {
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
      it('GET /basic-protected', async () => {
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
      it('GET /oauth-protected', async () => {
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
      it('GET /multi-auth', async () => {
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
