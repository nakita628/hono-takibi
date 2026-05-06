import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

function mockEmail() {
  return faker.internet.email()
}

function mockUsername() {
  return faker.string.alpha({ length: { min: 3, max: 20 } })
}

function mockPrice() {
  return faker.number.float({ min: 0, max: 1000, fractionDigits: 2 })
}

function mockTags() {
  return Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
    faker.string.alpha({ length: { min: 5, max: 20 } }),
  )
}

function mockCreateUser() {
  return {
    email: mockEmail(),
    username: mockUsername(),
    price: mockPrice(),
    tags: faker.helpers.arrayElement([mockTags(), undefined]),
  }
}

function mockUserId() {
  return faker.string.uuid()
}

function mockQuantity() {
  return faker.number.int({ min: 0, max: 1000 })
}

function mockCreatePost() {
  return { authorId: mockUserId(), title: faker.lorem.sentence(), quantity: mockQuantity() }
}

describe('Brand Test API', () => {
  describe('default', () => {
    describe('POST /users', () => {
      it('should return 201', async () => {
        const body = mockCreateUser()
        const res = await app.request(`/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('GET /users/{userId}', () => {
      it('should return 200', async () => {
        const userId = mockUserId()
        const res = await app.request(`/users/${userId}`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /posts', () => {
      it('should return 201', async () => {
        const body = mockCreatePost()
        const res = await app.request(`/posts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
  })
})
