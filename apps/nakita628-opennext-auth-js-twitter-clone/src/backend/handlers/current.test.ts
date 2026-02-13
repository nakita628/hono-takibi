import { beforeEach, describe, expect, it, vi } from 'vitest'
import { faker } from '@faker-js/faker'
import { Effect } from 'effect'
import { DatabaseError, UnauthorizedError } from '@/backend/domain'
import app from '@/backend'
import * as CurrentTransaction from '@/backend/transactions/current'

function mockCurrentUserResponse() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    username: faker.internet.username(),
    email: 'test@example.com',
    image: null,
    coverImage: null,
    profileImage: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    followers: [],
    following: [],
    hasNotification: false,
  }
}

describe('GET /current', () => {
  it('should return 200', async () => {
    const res = await app.request(`/current`, { method: 'GET' })
    expect(res.status).toBe(200)
  })
})
