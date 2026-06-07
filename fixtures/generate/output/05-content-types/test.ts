import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

describe('Content Types API', () => {
  describe('default', () => {
    describe('POST /json', () => {
      it('should return 200', async () => {
        const body = {
          name: faker.person.fullName(),
          value: faker.number.int({ min: 1, max: 1000 }),
        }
        const res = await app.request(`/json`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /form', () => {
      it('should return 200', async () => {
        const res = await app.request(`/form`, { method: 'POST' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /upload', () => {
      it('should return 200', async () => {
        const res = await app.request(`/upload`, { method: 'POST' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /text', () => {
      it('should return 200', async () => {
        const res = await app.request(`/text`, { method: 'POST' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /multi-content', () => {
      it('should return 200', async () => {
        const body = { data: faker.string.alpha({ length: { min: 5, max: 20 } }) }
        const res = await app.request(`/multi-content`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
  })
})
