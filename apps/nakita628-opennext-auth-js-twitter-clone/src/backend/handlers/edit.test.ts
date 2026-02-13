import { beforeEach, describe, expect, it, vi } from 'vitest'
import { faker } from '@faker-js/faker'
import { Effect } from 'effect'
import { DatabaseError, UnauthorizedError } from '@/backend/domain'
import app from '@/backend'
import * as EditTransaction from '@/backend/transactions/edit'

function mockEditUserRequest() {
  return {
    name: faker.helpers.arrayElement([faker.person.fullName(), undefined]),
    username: faker.helpers.arrayElement([faker.internet.username(), undefined]),
    bio: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
    coverImage: faker.helpers.arrayElement([faker.internet.url(), null]),
    profileImage: faker.helpers.arrayElement([faker.internet.url(), null]),
  }
}

function mockUserResponse() {
  return {
    id: faker.string.uuid(),
    name: 'Updated User',
    username: 'updated',
    bio: 'Hello',
    email: 'test@example.com',
    emailVerified: null,
    image: null,
    coverImage: null,
    profileImage: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    hasNotification: null,
  }
}

describe('PATCH /edit', () => {
  it('should return 200', async () => {
    const body = mockEditUserRequest()
    const res = await app.request(`/edit`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    expect(res.status).toBe(200)
  })
})
