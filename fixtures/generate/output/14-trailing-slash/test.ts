import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

describe('Trailing Slash API', () => {
  describe('default', () => {
    describe('GET /api/reverseChiban/', () => {
      it('should return 200 - Reverse Chiban (trailing slash)', async () => {
        const res = await app.request(`/api/reverseChiban/`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /api/reverseChiban', () => {
      it('should return 200 - Reverse Chiban (no trailing slash)', async () => {
        const res = await app.request(`/api/reverseChiban`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /posts/', () => {
      it('should return 200 - List posts (trailing slash only)', async () => {
        const limit = faker.number.int({ min: 1, max: 1000 })
        const res = await app.request(`/posts/?limit=${encodeURIComponent(String(limit))}`, {
          method: 'GET',
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /posts/', () => {
      it('should return 201 - Create post (trailing slash only)', async () => {
        const body = {
          title: faker.lorem.sentence(),
        }
        const res = await app.request(`/posts/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('GET /users/{id}/', () => {
      it('should return 200 - Get user (trailing slash with path param)', async () => {
        const id = faker.string.alpha({ length: { min: 5, max: 20 } })
        const res = await app.request(`/users/${id}/`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /items/', () => {
      it('should return 200 - List items (trailing slash only)', async () => {
        const res = await app.request(`/items/`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
  })
})
