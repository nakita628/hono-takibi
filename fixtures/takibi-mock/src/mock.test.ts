import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

function mockRegisterInput() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.person.fullName(),
  }
}

function mockLoginInput() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}

function mockUpdateUserInput() {
  return {
    name: faker.helpers.arrayElement([faker.person.fullName(), undefined]),
    avatarUrl: faker.helpers.arrayElement([faker.internet.url(), undefined]),
  }
}

function mockCreateProductInput() {
  return {
    name: faker.person.fullName(),
    description: faker.helpers.arrayElement([faker.lorem.paragraph(), undefined]),
    price: faker.number.float({ min: 1, max: 10000, fractionDigits: 2 }),
    category: faker.string.alpha({ length: { min: 5, max: 20 } }),
    stock: faker.number.int({ min: 0, max: 1000 }),
    imageUrl: faker.helpers.arrayElement([faker.internet.url(), undefined]),
  }
}

function mockUpdateProductInput() {
  return {
    name: faker.helpers.arrayElement([faker.person.fullName(), undefined]),
    description: faker.helpers.arrayElement([faker.lorem.paragraph(), undefined]),
    price: faker.helpers.arrayElement([
      faker.number.float({ min: 1, max: 10000, fractionDigits: 2 }),
      undefined,
    ]),
    category: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
    stock: faker.helpers.arrayElement([faker.number.int({ min: 0, max: 1000 }), undefined]),
    imageUrl: faker.helpers.arrayElement([faker.internet.url(), undefined]),
  }
}

function mockAddress() {
  return {
    street: faker.string.alpha({ length: { min: 5, max: 20 } }),
    city: faker.location.city(),
    state: faker.helpers.arrayElement([faker.location.state(), undefined]),
    postalCode: faker.string.alpha({ length: { min: 5, max: 20 } }),
    country: faker.location.country(),
  }
}

function mockCreateOrderInput() {
  return {
    items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
      productId: faker.string.uuid(),
      quantity: faker.number.int({ min: 1, max: 100 }),
    })),
    shippingAddress: mockAddress(),
  }
}

function mockUpdateOrderStatusInput() {
  return {
    status: faker.helpers.arrayElement([
      'pending',
      'confirmed',
      'shipped',
      'delivered',
      'cancelled',
    ] as const),
  }
}

describe('E-Commerce API', () => {
  describe('Health check endpoints', () => {
    describe('GET /health', () => {
      it('Check API health status', async () => {
        const res = await app.request(`/health`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
  })
  describe('Authentication endpoints', () => {
    describe('POST /auth/register', () => {
      it('Register a new user', async () => {
        const body = mockRegisterInput()
        const res = await app.request(`/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('POST /auth/login', () => {
      it('User login', async () => {
        const body = mockLoginInput()
        const res = await app.request(`/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /auth/refresh', () => {
      it('Refresh access token', async () => {
        const res = await app.request(`/auth/refresh`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${faker.string.alphanumeric(32)}` },
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const res = await app.request(`/auth/refresh`, { method: 'POST' })
        expect(res.status).toBe(401)
      })
    })
  })
  describe('User management', () => {
    describe('GET /users/me', () => {
      it('Get current user profile', async () => {
        const res = await app.request(`/users/me`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${faker.string.alphanumeric(32)}` },
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const res = await app.request(`/users/me`, { method: 'GET' })
        expect(res.status).toBe(401)
      })
    })
    describe('PATCH /users/me', () => {
      it('Update current user profile', async () => {
        const body = mockUpdateUserInput()
        const res = await app.request(`/users/me`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${faker.string.alphanumeric(32)}`,
          },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const body = mockUpdateUserInput()
        const res = await app.request(`/users/me`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /users', () => {
      it('List all users (admin only)', async () => {
        const res = await app.request(`/users`, {
          method: 'GET',
          headers: { 'X-API-Key': faker.string.alphanumeric(32) },
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const res = await app.request(`/users`, { method: 'GET' })
        expect(res.status).toBe(401)
      })
    })
  })
  describe('Product catalog', () => {
    describe('GET /products', () => {
      it('List products', async () => {
        const res = await app.request(`/products`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /products', () => {
      it('Create a product (admin only)', async () => {
        const body = mockCreateProductInput()
        const res = await app.request(`/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': faker.string.alphanumeric(32),
          },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
      it('should return 401 without auth', async () => {
        const body = mockCreateProductInput()
        const res = await app.request(`/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /products/{productId}', () => {
      it('Get product by ID', async () => {
        const productId = faker.string.uuid()
        const res = await app.request(`/products/${productId}`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('PUT /products/{productId}', () => {
      it('Update product (admin only)', async () => {
        const productId = faker.string.uuid()
        const body = mockUpdateProductInput()
        const res = await app.request(`/products/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': faker.string.alphanumeric(32),
          },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const productId = faker.string.uuid()
        const body = mockUpdateProductInput()
        const res = await app.request(`/products/${productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(401)
      })
    })
    describe('DELETE /products/{productId}', () => {
      it('Delete product (admin only)', async () => {
        const productId = faker.string.uuid()
        const res = await app.request(`/products/${productId}`, {
          method: 'DELETE',
          headers: { 'X-API-Key': faker.string.alphanumeric(32) },
        })
        expect(res.status).toBe(204)
      })
      it('should return 401 without auth', async () => {
        const productId = faker.string.uuid()
        const res = await app.request(`/products/${productId}`, { method: 'DELETE' })
        expect(res.status).toBe(401)
      })
    })
  })
  describe('Order management', () => {
    describe('GET /orders', () => {
      it('List user orders', async () => {
        const res = await app.request(`/orders`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${faker.string.alphanumeric(32)}` },
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const res = await app.request(`/orders`, { method: 'GET' })
        expect(res.status).toBe(401)
      })
    })
    describe('POST /orders', () => {
      it('Create a new order', async () => {
        const body = mockCreateOrderInput()
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
        const body = mockCreateOrderInput()
        const res = await app.request(`/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /orders/{orderId}', () => {
      it('Get order by ID', async () => {
        const orderId = faker.string.uuid()
        const res = await app.request(`/orders/${orderId}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${faker.string.alphanumeric(32)}` },
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const orderId = faker.string.uuid()
        const res = await app.request(`/orders/${orderId}`, { method: 'GET' })
        expect(res.status).toBe(401)
      })
    })
    describe('PATCH /orders/{orderId}', () => {
      it('Update order status (admin only)', async () => {
        const orderId = faker.string.uuid()
        const body = mockUpdateOrderStatusInput()
        const res = await app.request(`/orders/${orderId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': faker.string.alphanumeric(32),
          },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const orderId = faker.string.uuid()
        const body = mockUpdateOrderStatusInput()
        const res = await app.request(`/orders/${orderId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(401)
      })
    })
  })
})
