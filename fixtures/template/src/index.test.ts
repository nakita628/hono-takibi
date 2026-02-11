import { describe, it, expect } from 'vitest'
import app from './index'

describe('Minimal API', () => {
  describe('default', () => {
    describe('GET /health', () => {
      it('should return 200', async () => {
        const res = await app.request(`/health`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /health/test', () => {
      it('should return 200', async () => {
        const res = await app.request(`/health/test`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
  })
})
