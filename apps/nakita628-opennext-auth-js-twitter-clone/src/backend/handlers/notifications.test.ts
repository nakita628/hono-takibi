import { describe, it, expect } from 'vitest'
import app from '@/backend'

describe('Notifications', () => {
  describe('GET /notifications/{userId}', () => {
    it('should return 200', async () => {
      const res = await app.request(`/notifications/{userId}`, { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
  describe('POST /notifications', () => {
    it('should return 200', async () => {
      const res = await app.request(`/notifications`, { method: 'POST' })
      expect(res.status).toBe(200)
    })
  })
})
