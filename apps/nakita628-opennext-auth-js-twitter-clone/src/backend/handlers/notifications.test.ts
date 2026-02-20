import { faker } from '@faker-js/faker'
import { Effect } from 'effect'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import app from '@/backend'
import { DatabaseError } from '@/backend/domain'
import * as NotificationsTransaction from '@/backend/transactions/notifications'

describe('Notifications', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET /api/notifications/{userId}', () => {
    it('should return 200', async () => {
      const res = await app.request(`/api/notifications/{userId}`, { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
  describe('POST /api/notifications', () => {
    it('should return 200', async () => {
      const res = await app.request(`/api/notifications`, { method: 'POST' })
      expect(res.status).toBe(200)
    })
  })
})
