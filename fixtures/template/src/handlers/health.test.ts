import { describe, expect, it } from 'vitest'
import app from '..'

describe('Health', () => {
  describe('GET /health', () => {
    it('GET /health', async () => {
      const res = await app.request(`/health`, { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
