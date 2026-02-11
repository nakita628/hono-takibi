import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

function mockOrderRequest() {
  return {
    item: faker.string.alpha({ length: { min: 5, max: 20 } }),
    quantity: faker.number.int({ min: 1, max: 100 }),
    callbackUrl: faker.internet.url(),
  }
}

function mockPaymentRequest() {
  return {
    amount: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    currency: faker.string.alpha({ length: { min: 5, max: 20 } }),
    successUrl: faker.internet.url(),
    failureUrl: faker.internet.url(),
  }
}

describe('Callbacks Field Name Test', () => {
  describe('default', () => {
    describe('POST /orders', () => {
      it('Create an order with callback', async () => {
        const body = mockOrderRequest()
        const res = await app.request(`/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('POST /payments', () => {
      it('Create a payment with multiple callbacks', async () => {
        const body = mockPaymentRequest()
        const res = await app.request(`/payments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('GET /items', () => {
      it('List items (no callbacks)', async () => {
        const res = await app.request(`/items`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
  })
})
