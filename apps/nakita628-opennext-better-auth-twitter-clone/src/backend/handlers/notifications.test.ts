import { faker } from '@faker-js/faker'
import { Effect } from 'effect'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import app from '@/backend'
import { DatabaseError, ValidationError } from '@/backend/domain'
import * as NotificationsTransaction from '@/backend/transactions/notifications'

function mockSession() {
  return {
    user: { id: faker.string.uuid(), email: 'test@example.com', name: 'Test User' },
    session: { id: faker.string.uuid() },
  }
}

function mockNotificationResponse() {
  return {
    id: faker.string.uuid(),
    body: 'Someone liked your tweet',
    userId: faker.string.uuid(),
    createdAt: new Date().toISOString(),
  }
}

describe('Notifications', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET /api/notifications/{userId}', () => {
    it('should return 200 on success', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      const mockNotifications = [mockNotificationResponse(), mockNotificationResponse()]
      vi.mocked(NotificationsTransaction.getByUserId).mockReturnValue(
        Effect.succeed(mockNotifications),
      )

      const userId = faker.string.uuid()
      const res = await app.request(`/api/notifications/${userId}`, { method: 'GET' })

      expect(res.status).toBe(200)
      const json = await res.json()
      expect(json).toStrictEqual(mockNotifications)
    })

    it('should return 200 with empty array when no notifications', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(NotificationsTransaction.getByUserId).mockReturnValue(Effect.succeed([]))

      const userId = faker.string.uuid()
      const res = await app.request(`/api/notifications/${userId}`, { method: 'GET' })

      expect(res.status).toBe(200)
      const json = await res.json()
      expect(json).toStrictEqual([])
    })

    it('should return 401 when not authenticated', async () => {
      mockGetSession.mockResolvedValue(null)

      const userId = faker.string.uuid()
      const res = await app.request(`/api/notifications/${userId}`, { method: 'GET' })

      expect(res.status).toBe(401)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Unauthorized' })
    })

    it('should return 422 on invalid userId format', async () => {
      mockGetSession.mockResolvedValue(mockSession())

      const res = await app.request('/api/notifications/not-a-uuid', { method: 'GET' })

      expect(res.status).toBe(422)
    })

    it('should return 500 on ValidationError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(NotificationsTransaction.getByUserId).mockReturnValue(
        Effect.fail(new ValidationError({ message: 'Invalid notifications data' })),
      )

      const userId = faker.string.uuid()
      const res = await app.request(`/api/notifications/${userId}`, { method: 'GET' })

      expect(res.status).toBe(500)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Invalid notifications data' })
    })

    it('should return 503 on DatabaseError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(NotificationsTransaction.getByUserId).mockReturnValue(
        Effect.fail(new DatabaseError({ message: 'Database unavailable' })),
      )

      const userId = faker.string.uuid()
      const res = await app.request(`/api/notifications/${userId}`, { method: 'GET' })

      expect(res.status).toBe(503)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Database unavailable' })
    })

    it('should pass userId to transaction', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(NotificationsTransaction.getByUserId).mockReturnValue(Effect.succeed([]))

      const userId = faker.string.uuid()
      await app.request(`/api/notifications/${userId}`, { method: 'GET' })

      expect(NotificationsTransaction.getByUserId).toHaveBeenCalledWith(userId)
    })
  })

  describe('POST /api/notifications', () => {
    it('should return 200 on success', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(NotificationsTransaction.markAsRead).mockReturnValue(
        Effect.succeed({ message: 'Notifications updated' }),
      )

      const userId = faker.string.uuid()
      const res = await app.request('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: userId,
      })

      expect(res.status).toBe(200)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Notifications updated' })
    })

    it('should return 401 when not authenticated', async () => {
      mockGetSession.mockResolvedValue(null)

      const res = await app.request('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: faker.string.uuid(),
      })

      expect(res.status).toBe(401)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Unauthorized' })
    })

    it('should return 500 on ValidationError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(NotificationsTransaction.markAsRead).mockReturnValue(
        Effect.fail(new ValidationError({ message: 'Invalid response data' })),
      )

      const res = await app.request('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: faker.string.uuid(),
      })

      expect(res.status).toBe(500)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Invalid response data' })
    })

    it('should return 503 on DatabaseError', async () => {
      mockGetSession.mockResolvedValue(mockSession())
      vi.mocked(NotificationsTransaction.markAsRead).mockReturnValue(
        Effect.fail(new DatabaseError({ message: 'Database unavailable' })),
      )

      const res = await app.request('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: faker.string.uuid(),
      })

      expect(res.status).toBe(503)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Database unavailable' })
    })
  })
})
