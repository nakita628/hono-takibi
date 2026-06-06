import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

function mockCreditCard() {
  return {
    type: 'credit_card' as const,
    cardNumber: faker.string.alpha({ length: { min: 5, max: 20 } }),
    expiry: faker.string.alpha({ length: { min: 5, max: 20 } }),
  }
}

function mockBankTransfer() {
  return {
    type: 'bank_transfer' as const,
    bankCode: faker.string.alpha({ length: { min: 5, max: 20 } }),
    accountNumber: faker.string.alpha({ length: { min: 5, max: 20 } }),
  }
}

function mockPaymentMethod() {
  return faker.helpers.arrayElement([mockCreditCard(), mockBankTransfer()])
}

function mockSearchFilter() {
  return faker.helpers.arrayElement([
    { keyword: faker.string.alpha({ length: { min: 5, max: 20 } }) },
    { category: faker.number.int({ min: 1, max: 1000 }) },
  ])
}

function mockPerson() {
  return { name: faker.person.fullName(), email: faker.internet.email() }
}

function mockEmployeeInfo() {
  return {
    employeeId: faker.number.int({ min: 1, max: 1000 }),
    department: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
  }
}

function mockEmployee() {
  return {
    ...mockPerson(),
    ...mockEmployeeInfo(),
    ...{
      startDate: faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 10),
        undefined,
      ]),
    },
  }
}

function mockNotStringValue() {
  return undefined
}

describe('Composition Keywords API', () => {
  describe('default', () => {
    describe('POST /one-of', () => {
      it('should return 200', async () => {
        const body = mockPaymentMethod()
        const res = await app.request(`/one-of`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /any-of', () => {
      it('should return 200', async () => {
        const body = mockSearchFilter()
        const res = await app.request(`/any-of`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /all-of', () => {
      it('should return 200', async () => {
        const body = mockEmployee()
        const res = await app.request(`/all-of`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /not', () => {
      it('should return 200', async () => {
        const body = mockNotStringValue()
        const res = await app.request(`/not`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /not-ref', () => {
      it('should return 200', async () => {
        const res = await app.request(`/not-ref`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /not-enum', () => {
      it('should return 200', async () => {
        const res = await app.request(`/not-enum`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /not-const', () => {
      it('should return 200', async () => {
        const res = await app.request(`/not-const`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /not-composition', () => {
      it('should return 200', async () => {
        const res = await app.request(`/not-composition`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /all-of-sibling', () => {
      it('should return 200', async () => {
        const res = await app.request(`/all-of-sibling`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /nullable-one-of', () => {
      it('should return 200', async () => {
        const res = await app.request(`/nullable-one-of`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /any-of-three', () => {
      it('should return 200', async () => {
        const res = await app.request(`/any-of-three`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /any-of-ref', () => {
      it('should return 200', async () => {
        const res = await app.request(`/any-of-ref`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
  })
})
