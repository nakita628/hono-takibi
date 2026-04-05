import app from '..'
import { describe, expect, it } from 'vite-plus/test'

describe('Health', () => {
  describe('GET /api/health', () => {
    it('should return 200', async () => {
      const res = await app.request(`/api/health`, { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
  describe('GET /api/health/test', () => {
    it('should return 200', async () => {
      const res = await app.request(`/api/health/test`, { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
