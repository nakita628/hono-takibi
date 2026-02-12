import { describe, expect, it } from 'vitest'
import app from '@/backend'

describe('Users', () => {
  describe('GET /users/{userId}', () => {
    it('should return 200', async () => {
      const res = await app.request(`/users/{userId}`, { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })

  describe('GET /users', () => {
    it('should return 200', async () => {
      const res = await app.request(`/users`, { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
