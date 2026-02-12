import { describe, expect, it } from 'vitest'
import app from '@/backend'

describe('Current', () => {
  describe('GET /current', () => {
    it('should return 200', async () => {
      const res = await app.request('/current', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
