import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'
import app from '@/backend'

function mockRegisterRequest() {
  return {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    username: faker.internet.username(),
    password: faker.internet.password(),
  }
}

describe('Register', () => {
  describe('POST /register', () => {
    it('should return 200', async () => {
      const body = mockRegisterRequest()
      const res = await app.request('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      expect(res.status).toBe(201)
    })
  })
})
