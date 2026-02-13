import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import app from '@/backend'

function mockRegisterRequest() {
  return {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    username: faker.internet.username(),
    password: faker.internet.password(),
  }
}

describe('POST /register', () => {
  it('should return 201', async () => {
    const body = mockRegisterRequest()
    const res = await app.request(`/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    expect(res.status).toBe(201)
  })
})
