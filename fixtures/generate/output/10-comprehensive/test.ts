import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

function mockAddress() {
  return {
    street: faker.string.alpha({ length: { min: 5, max: 20 } }),
    city: faker.location.city(),
    state: faker.helpers.arrayElement([faker.location.state(), undefined]),
    zip: faker.helpers.arrayElement([faker.location.zipCode(), undefined]),
    country: faker.location.country(),
  }
}

function mockCreateUser() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: faker.helpers.arrayElement([
      faker.helpers.arrayElement(['admin', 'customer'] as const),
      undefined,
    ]),
    address: faker.helpers.arrayElement([mockAddress(), undefined]),
  }
}

function mockUpdateUser() {
  return {
    name: faker.helpers.arrayElement([faker.person.fullName(), undefined]),
    email: faker.helpers.arrayElement([faker.internet.email(), undefined]),
    address: faker.helpers.arrayElement([mockAddress(), undefined]),
  }
}

function mockCreateProduct() {
  return {
    name: faker.person.fullName(),
    description: faker.helpers.arrayElement([faker.lorem.paragraph(), undefined]),
    price: faker.number.float({ min: 1, max: 10000, fractionDigits: 2 }),
    categoryId: faker.number.int({ min: 1, max: 1000 }),
    tags: faker.helpers.arrayElement([
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        faker.string.alpha({ length: { min: 5, max: 20 } }),
      ),
      undefined,
    ]),
  }
}

function mockUpdateProduct() {
  return {
    name: faker.helpers.arrayElement([faker.person.fullName(), undefined]),
    description: faker.helpers.arrayElement([faker.lorem.paragraph(), undefined]),
    price: faker.helpers.arrayElement([
      faker.number.float({ min: 1, max: 10000, fractionDigits: 2 }),
      undefined,
    ]),
    categoryId: faker.helpers.arrayElement([faker.number.int({ min: 1, max: 1000 }), undefined]),
    tags: faker.helpers.arrayElement([
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        faker.string.alpha({ length: { min: 5, max: 20 } }),
      ),
      undefined,
    ]),
  }
}

function mockCreateReview() {
  return {
    rating: faker.number.int({ min: 1, max: 5 }),
    comment: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
  }
}

function mockCreateOrder() {
  return {
    items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
      productId: faker.number.int({ min: 1, max: 1000 }),
      quantity: faker.number.int({ min: 1, max: 100 }),
    })),
    shippingAddress: mockAddress(),
    callbackUrl: faker.helpers.arrayElement([faker.internet.url(), undefined]),
  }
}

describe('Comprehensive EC API', () => {
  describe('default', () => {
    describe('GET /users', () => {
      it('should return 200', async () => {
        const page = faker.number.int({ min: 1, max: 1000 })
        const limit = faker.number.int({ min: 1, max: 1000 })
        const res = await app.request(
          `/users?page=${encodeURIComponent(String(page))}&limit=${encodeURIComponent(String(limit))}`,
          { method: 'GET' },
        )
        expect(res.status).toBe(200)
      })
    })
    describe('POST /users', () => {
      it('should return 201', async () => {
        const body = mockCreateUser()
        const res = await app.request(`/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${faker.string.alphanumeric(32)}`,
          },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
      it('should return 401 without auth', async () => {
        const body = mockCreateUser()
        const res = await app.request(`/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /users/{userId}', () => {
      it('should return 200', async () => {
        const res = await app.request(`/users/{userId}`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('PUT /users/{userId}', () => {
      it('should return 200', async () => {
        const body = mockUpdateUser()
        const res = await app.request(`/users/{userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${faker.string.alphanumeric(32)}`,
          },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const body = mockUpdateUser()
        const res = await app.request(`/users/{userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(401)
      })
    })
    describe('DELETE /users/{userId}', () => {
      it('should return 204', async () => {
        const res = await app.request(`/users/{userId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${faker.string.alphanumeric(32)}` },
        })
        expect(res.status).toBe(204)
      })
      it('should return 401 without auth', async () => {
        const res = await app.request(`/users/{userId}`, { method: 'DELETE' })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /products', () => {
      it('should return 200', async () => {
        const page = faker.number.int({ min: 1, max: 1000 })
        const limit = faker.number.int({ min: 1, max: 1000 })
        const category = faker.string.alpha({ length: { min: 5, max: 20 } })
        const minPrice = faker.number.float({ min: 1, max: 1000, fractionDigits: 2 })
        const maxPrice = faker.number.float({ min: 1, max: 1000, fractionDigits: 2 })
        const res = await app.request(
          `/products?page=${encodeURIComponent(String(page))}&limit=${encodeURIComponent(String(limit))}&category=${encodeURIComponent(String(category))}&minPrice=${encodeURIComponent(String(minPrice))}&maxPrice=${encodeURIComponent(String(maxPrice))}`,
          { method: 'GET' },
        )
        expect(res.status).toBe(200)
      })
    })
    describe('POST /products', () => {
      it('should return 201', async () => {
        const body = mockCreateProduct()
        const res = await app.request(`/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${faker.string.alphanumeric(32)}`,
          },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
      it('should return 401 without auth', async () => {
        const body = mockCreateProduct()
        const res = await app.request(`/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /products/{productId}', () => {
      it('should return 200', async () => {
        const res = await app.request(`/products/{productId}`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('PUT /products/{productId}', () => {
      it('should return 200', async () => {
        const body = mockUpdateProduct()
        const res = await app.request(`/products/{productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${faker.string.alphanumeric(32)}`,
          },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const body = mockUpdateProduct()
        const res = await app.request(`/products/{productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /products/{productId}/reviews', () => {
      it('should return 200', async () => {
        const res = await app.request(`/products/{productId}/reviews`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /products/{productId}/reviews', () => {
      it('should return 201', async () => {
        const body = mockCreateReview()
        const res = await app.request(`/products/{productId}/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${faker.string.alphanumeric(32)}`,
          },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
      it('should return 401 without auth', async () => {
        const body = mockCreateReview()
        const res = await app.request(`/products/{productId}/reviews`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /orders', () => {
      it('should return 200', async () => {
        const page = faker.number.int({ min: 1, max: 1000 })
        const limit = faker.number.int({ min: 1, max: 1000 })
        const status = faker.helpers.arrayElement([
          'pending',
          'confirmed',
          'shipped',
          'delivered',
          'cancelled',
        ] as const)
        const res = await app.request(
          `/orders?page=${encodeURIComponent(String(page))}&limit=${encodeURIComponent(String(limit))}&status=${encodeURIComponent(String(status))}`,
          { method: 'GET', headers: { Authorization: `Bearer ${faker.string.alphanumeric(32)}` } },
        )
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const page = faker.number.int({ min: 1, max: 1000 })
        const limit = faker.number.int({ min: 1, max: 1000 })
        const status = faker.helpers.arrayElement([
          'pending',
          'confirmed',
          'shipped',
          'delivered',
          'cancelled',
        ] as const)
        const res = await app.request(
          `/orders?page=${encodeURIComponent(String(page))}&limit=${encodeURIComponent(String(limit))}&status=${encodeURIComponent(String(status))}`,
          { method: 'GET' },
        )
        expect(res.status).toBe(401)
      })
    })
    describe('POST /orders', () => {
      it('should return 201', async () => {
        const body = mockCreateOrder()
        const res = await app.request(`/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${faker.string.alphanumeric(32)}`,
          },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
      it('should return 401 without auth', async () => {
        const body = mockCreateOrder()
        const res = await app.request(`/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /orders/{orderId}', () => {
      it('should return 200', async () => {
        const res = await app.request(`/orders/{orderId}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${faker.string.alphanumeric(32)}` },
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const res = await app.request(`/orders/{orderId}`, { method: 'GET' })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /categories', () => {
      it('should return 200', async () => {
        const res = await app.request(`/categories`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /upload/image', () => {
      it('should return 200', async () => {
        const res = await app.request(`/upload/image`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${faker.string.alphanumeric(32)}` },
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const res = await app.request(`/upload/image`, { method: 'POST' })
        expect(res.status).toBe(401)
      })
    })
  })
})
