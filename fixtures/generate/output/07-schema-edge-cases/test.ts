import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

function mockNullableFields() {
  return {
    name: faker.person.fullName(),
    nickname: faker.helpers.arrayElement([undefined, undefined]),
    age: faker.helpers.arrayElement([faker.number.int({ min: 1, max: 120 }), undefined]),
    tags: faker.helpers.arrayElement([undefined, undefined]),
  }
}

function mockCircle() {
  return {
    kind: 'circle' as const,
    radius: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockRectangle() {
  return {
    kind: 'rectangle' as const,
    width: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    height: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockShape() {
  return faker.helpers.arrayElement([mockCircle(), mockRectangle()])
}

describe('Schema Edge Cases API', () => {
  describe('default', () => {
    describe('POST /nullable', () => {
      it('POST /nullable', async () => {
        const body = mockNullableFields()
        const res = await app.request(`/nullable`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /discriminated', () => {
      it('POST /discriminated', async () => {
        const body = mockShape()
        const res = await app.request(`/discriminated`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /composed', () => {
      it('GET /composed', async () => {
        const res = await app.request(`/composed`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /deep-nested', () => {
      it('GET /deep-nested', async () => {
        const res = await app.request(`/deep-nested`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /additional-props', () => {
      it('GET /additional-props', async () => {
        const res = await app.request(`/additional-props`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
  })
})
