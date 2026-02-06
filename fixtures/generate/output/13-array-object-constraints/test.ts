import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

describe('Array & Object Constraints API', () => {
  describe('default', () => {
    describe('GET /tags', () => {
      it('GET /tags', async () => {
        const res = await app.request(`/tags`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /tags', () => {
      it('POST /tags', async () => {
        const body = {
          metadata: {
            key: faker.helpers.arrayElement([
              faker.string.alpha({ length: { min: 5, max: 20 } }),
              undefined,
            ]),
            value: faker.helpers.arrayElement([
              faker.string.alpha({ length: { min: 5, max: 20 } }),
              undefined,
            ]),
          },
          config: faker.helpers.arrayElement([
            {
              name: faker.helpers.arrayElement([faker.person.fullName(), undefined]),
            },
            undefined,
          ]),
          limited: faker.helpers.arrayElement([
            {
              a: faker.helpers.arrayElement([
                faker.string.alpha({ length: { min: 5, max: 20 } }),
                undefined,
              ]),
              b: faker.helpers.arrayElement([
                faker.string.alpha({ length: { min: 5, max: 20 } }),
                undefined,
              ]),
            },
            undefined,
          ]),
        }
        const res = await app.request(`/tags`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('GET /settings', () => {
      it('GET /settings', async () => {
        const filter = faker.string.alpha({ length: { min: 5, max: 20 } })
        const res = await app.request(`/settings?filter=${encodeURIComponent(String(filter))}`, {
          method: 'GET',
        })
        expect(res.status).toBe(200)
      })
    })
    describe('PUT /settings', () => {
      it('PUT /settings', async () => {
        const body = {
          avatar: faker.string.alpha({ length: { min: 5, max: 20 } }),
        }
        const res = await app.request(`/settings`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /config', () => {
      it('POST /config', async () => {
        const body = {
          data: undefined,
          headers: faker.helpers.arrayElement([undefined, undefined]),
          keys: faker.helpers.arrayElement([undefined, undefined]),
        }
        const res = await app.request(`/config`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('POST /payment', () => {
      it('POST /payment', async () => {
        const body = {
          creditCard: faker.helpers.arrayElement([
            faker.string.alpha({ length: { min: 5, max: 20 } }),
            undefined,
          ]),
          billingAddress: faker.helpers.arrayElement([
            faker.string.alpha({ length: { min: 5, max: 20 } }),
            undefined,
          ]),
          email: faker.helpers.arrayElement([faker.internet.email(), undefined]),
        }
        const res = await app.request(`/payment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
  })
})
