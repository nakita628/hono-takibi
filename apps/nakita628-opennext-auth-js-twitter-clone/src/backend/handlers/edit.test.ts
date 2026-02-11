import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'
import app from '@/backend'

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

describe('Edit', () => {
  describe('PATCH /edit', () => {
    it('should return 200', async () => {
      const body = mockEditUserRequest()
      const res = await app.request('/edit', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      expect(res.status).toBe(200)
    })
  })
})
