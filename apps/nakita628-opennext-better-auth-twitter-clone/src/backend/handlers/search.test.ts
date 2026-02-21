import { describe, expect, it } from 'vitest'
import app from '@/backend'

describe('Search', () => {
  describe('GET /api/search', () => {
    it('should return 200', async () => {
      const res = await app.request('/api/search', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
