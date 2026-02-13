import { beforeEach, describe, expect, it, vi } from 'vitest'
import { faker } from '@faker-js/faker'
import { Effect } from 'effect'
import { DatabaseError } from '@/backend/domain'
import app from '@/backend'
import * as NotificationsTransaction from '@/backend/transactions/notifications'

describe('Notifications', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

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
