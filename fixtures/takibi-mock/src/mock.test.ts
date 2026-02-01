import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

function mockCreateUserInput() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }
}

describe('Takibi Mock Test API', () => {
  describe('default', () => {
    describe('GET /users', () => {
      it('Get all users', async () => {
        const res = await app.request(`/users`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${faker.string.alphanumeric(32)}`,
          },
        })

        expect(res.status).toBe(200)
      })

      it('should return 401 without auth', async () => {
        const res = await app.request(`/users`, {
          method: 'GET',
        })

        expect(res.status).toBe(401)
      })
    })

    describe('POST /users', () => {
      it('Create a user', async () => {
        const body = mockCreateUserInput()

        const res = await app.request(`/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${btoa(`${faker.internet.username()}:${faker.internet.password()}`)}`,
          },
          body: JSON.stringify(body),
        })

        expect(res.status).toBe(201)
      })

      it('should return 401 without auth', async () => {
        const body = mockCreateUserInput()

        const res = await app.request(`/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })

        expect(res.status).toBe(401)
      })
    })

    describe('GET /users/{id}', () => {
      it('Get user by ID', async () => {
        const id = faker.number.int({ min: 1, max: 99999 })

        const res = await app.request(`/users/${id}`, {
          method: 'GET',
          headers: {
            'X-API-Key': faker.string.alphanumeric(32),
          },
        })

        expect(res.status).toBe(200)
      })

      it('should return 401 without auth', async () => {
        const id = faker.number.int({ min: 1, max: 99999 })

        const res = await app.request(`/users/${id}`, {
          method: 'GET',
        })

        expect(res.status).toBe(401)
      })
    })

    describe('DELETE /users/{id}', () => {
      it('Delete user', async () => {
        const id = faker.number.int({ min: 1, max: 99999 })

        const res = await app.request(`/users/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${faker.string.alphanumeric(32)}`,
          },
        })

        expect(res.status).toBe(204)
      })

      it('should return 401 without auth', async () => {
        const id = faker.number.int({ min: 1, max: 99999 })

        const res = await app.request(`/users/${id}`, {
          method: 'DELETE',
        })

        expect(res.status).toBe(401)
      })
    })
  })
})
