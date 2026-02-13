import { beforeEach, describe, expect, it, vi } from 'vitest'
import { faker } from '@faker-js/faker'
import { Effect } from 'effect'
import { DatabaseError, NotFoundError } from '@/backend/domain'
import app from '@/backend'
import * as UsersTransaction from '@/backend/transactions/users'

function mockUser() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    username: faker.internet.username(),
    bio: null,
    email: faker.internet.email(),
    emailVerified: null,
    image: null,
    coverImage: null,
    profileImage: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    hasNotification: false,
  }
}

function mockUserWithFollowCount() {
  return {
    ...mockUser(),
    _count: { followers: 5, following: 3 },
  }
}

describe('Users', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET /users/{userId}', () => {
    it('should return 200', async () => {
      const res = await app.request(`/users/{userId}`, { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
  describe('GET /users', () => {
    it('should return 200', async () => {
      const res = await app.request(`/users`, { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
