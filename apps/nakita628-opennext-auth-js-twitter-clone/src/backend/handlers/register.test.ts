import { faker } from '@faker-js/faker'
import { Effect } from 'effect'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import app from '@/backend'
import { ConflictError, DatabaseError } from '@/backend/domain'
import * as RegisterTransaction from '@/backend/transactions/register'

function mockRegisterRequest() {
  return {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    username: faker.internet.username(),
    password: faker.internet.password(),
  }
}

function mockUserResponse() {
  return {
    id: faker.string.uuid(),
    name: 'Test User',
    username: 'testuser',
    bio: null,
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

describe('POST /api/register', () => {
  it('should return 201', async () => {
    const body = mockRegisterRequest()
    const res = await app.request(`/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    expect(res.status).toBe(201)
  })
})
