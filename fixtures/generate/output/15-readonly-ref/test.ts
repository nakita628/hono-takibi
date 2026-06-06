import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

describe('Readonly Ref API', () => {
  describe('default', () => {
    describe('GET /users', () => {
      it('should return 200 - List users', async () => {
        const res = await app.request(`/users`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /users', () => {
      it('should return 201 - Create user', async () => {
        const res = await app.request(`/users`, { method: 'POST' })
        expect(res.status).toBe(201)
      })
    })
    describe('GET /users/{id}', () => {
      it('should return 200 - Get user by ID', async () => {
        const id = faker.string.alpha({ length: { min: 5, max: 20 } })
        const res = await app.request(`/users/${id}`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
      it('should return 404 for non-existent resource', async () => {
        const res = await app.request(`/users/__non_existent__`, { method: 'GET' })
        expect(res.status).toBe(404)
      })
    })
    describe('PUT /users/{id}', () => {
      it('should return 200 - Update user', async () => {
        const id = faker.string.alpha({ length: { min: 5, max: 20 } })
        const res = await app.request(`/users/${id}`, { method: 'PUT' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /items', () => {
      it('should return 200 - List items (uses $ref response alias)', async () => {
        const res = await app.request(`/items`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
  })
})
