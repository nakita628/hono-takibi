import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

function mockTreeNode(): any {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    value: faker.string.alpha({ length: { min: 5, max: 20 } }),
    children: faker.helpers.arrayElement([
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockTreeNode()),
      undefined,
    ]),
  }
}

describe('Circular References API', () => {
  describe('default', () => {
    describe('GET /tree', () => {
      it('GET /tree', async () => {
        const res = await app.request(`/tree`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /tree', () => {
      it('POST /tree', async () => {
        const body = mockTreeNode()
        const res = await app.request(`/tree`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('GET /graph', () => {
      it('GET /graph', async () => {
        const res = await app.request(`/graph`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
  })
})
