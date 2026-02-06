import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

function mockSubscriptionRequest() {
  return {
    callbackUrl: faker.internet.url(),
    events: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      faker.helpers.arrayElement(['created', 'updated', 'deleted'] as const),
    ),
  }
}

describe('Callbacks and Links API', () => {
  describe('default', () => {
    describe('POST /subscriptions', () => {
      it('POST /subscriptions', async () => {
        const body = mockSubscriptionRequest()
        const res = await app.request(`/subscriptions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('GET /subscriptions/{id}', () => {
      it('GET /subscriptions/{id}', async () => {
        const id = faker.number.int({ min: 1, max: 99999 })
        const res = await app.request(`/subscriptions/${id}`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('DELETE /subscriptions/{id}', () => {
      it('DELETE /subscriptions/{id}', async () => {
        const id = faker.number.int({ min: 1, max: 99999 })
        const res = await app.request(`/subscriptions/${id}`, { method: 'DELETE' })
        expect(res.status).toBe(204)
      })
    })
    describe('POST /webhooks/test', () => {
      it('POST /webhooks/test', async () => {
        const body = {
          url: faker.internet.url(),
        }
        const res = await app.request(`/webhooks/test`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
  })
})
