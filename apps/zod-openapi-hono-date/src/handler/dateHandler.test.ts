import { describe, expect, it } from 'vitest'
import { testClient } from 'hono/testing'
import { api } from '..'

// test client
const test = testClient(api)

describe('Hono Zod OpenAPI Test', () => {
  describe('postDateHandler', () => {
    it('should return 200 with valid date', async () => {
      const res = await test.date.$post({
        json: { date: new Date('2023-10-01') },
      })
      const input = await res.json()
      expect(input).toStrictEqual({ date: '2023-10-01T00:00:00.000Z' })
      expect(res.status).toBe(200)
    })
    it('should return 200 with valid date', async () => {
      const res = await test.date.$post({
        json: { date: '2022-01-12T06:15:00.000Z' },
      })
      const input = await res.json()
      expect(input).toStrictEqual({ date: '2022-01-12T06:15:00.000Z' })
      expect(res.status).toBe(200)
    })
  })

  describe('postIsoDateHandler', () => {
    it('should return 200 with valid ISO date', async () => {
      const res = await test.date['iso-date'].$post({
        json: { iso_date: '2023-10-01' },
      })
      const input = await res.json()
      expect(input).toStrictEqual({ iso_date: '2023-10-01' })
      expect(res.status).toBe(200)
    })

    it('should return 200 with valid ISO date', async () => {
      const res = await test.date['iso-date'].$post({
        json: { iso_date: '2022-01-12T06:15:00.000Z' },
      })
      const input = await res.json()
      expect(res.status).toBe(400)
    })

    it('should return 400 with invalid ISO date', async () => {
      const res = await test.date['iso-date'].$post({
        json: { iso_date: 'invalid-date' },
      })
      expect(res.status).toBe(400)
    })
  })

  describe('postIsoDatetimeHandler', () => {
    it('should return 200 with valid ISO datetime', async () => {
      const res = await test.date['iso-datetime'].$post({
        json: { iso_datetime: '2023-10-01T12:00:00Z' },
      })
      const input = await res.json()
      expect(input).toStrictEqual({ iso_datetime: '2023-10-01T12:00:00Z' })
      expect(res.status).toBe(200)
    })

    it('should return 400 with invalid ISO datetime', async () => {
      const res = await test.date['iso-datetime'].$post({
        json: { iso_datetime: '2023-10-01' },
      })
      expect(res.status).toBe(400)
    })
  })
})
