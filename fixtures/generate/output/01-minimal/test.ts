import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

describe('Minimal API', () => {
  describe('default', () => {
    describe('GET /health', () => {
      it('GET /health', async () => {
        const res = await app.request(`/health`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
  })
})
