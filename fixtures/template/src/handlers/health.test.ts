import { describe, expect, it } from 'vitest'
import app from '@/routes'
import app from '@/api'
import app from '..'

describe('Health', () => {
  describe('GET /health', () => {
    it('should return 200', async () => {
      const res = await app.request(`/health`, { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
