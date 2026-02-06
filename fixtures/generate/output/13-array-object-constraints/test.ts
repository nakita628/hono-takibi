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
  })
})
