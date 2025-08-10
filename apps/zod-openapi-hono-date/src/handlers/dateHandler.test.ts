import { testClient } from 'hono/testing'
import { describe, expect, it } from 'vitest'
import { api } from '..'

// Test run
// pnpm vitest run ./src/handlers/dateHandler.test.ts

// test client
const test = testClient(api)

describe('dateHandler', () => {
  describe('postDateHandler', () => {
    it.concurrent('200', async () => {
      const res = await test.date.$post({
        json: { date: new Date('2023-10-01') },
      })
      const input = await res.json()
      expect(input).toStrictEqual({ date: '2023-10-01T00:00:00.000Z' })
      expect(res.status).toBe(200)
    })
    it.concurrent('200', async () => {
      const res = await test.date.$post({
        json: { date: '2022-01-12T06:15:00.000Z' },
      })
      const input = await res.json()
      expect(input).toStrictEqual({ date: '2022-01-12T06:15:00.000Z' })
      expect(res.status).toBe(200)
    })
    it.concurrent('200', async () => {
      const res = await test.date.$post({
        json: { date: '2023-10-01' },
      })
      expect(res.status).toBe(200)
    })
    it.concurrent('400', async () => {
      const res = await test.date.$post({
        json: { date: 'invalid-date' },
      })
      expect(res.status).toBe(400)
    })
  })

  describe('postIsoDateHandler', () => {
    it('200', async () => {
      const res = await test.date['iso-date'].$post({
        json: { iso_date: '2023-10-01' },
      })
      const input = await res.json()
      expect(input).toStrictEqual({ iso_date: '2023-10-01' })
      expect(res.status).toBe(200)
    })
    it('400', async () => {
      const res = await test.date['iso-date'].$post({
        json: { iso_date: '2022-01-12T06:15:00.000Z' },
      })
      expect(res.status).toBe(400)
    })
    it('400', async () => {
      const res = await test.date['iso-date'].$post({
        json: { iso_date: 'invalid-date' },
      })
      expect(res.status).toBe(400)
    })
  })

  describe('postIsoDatetimeHandler', () => {
    it('200', async () => {
      const res = await test.date['iso-datetime'].$post({
        json: { iso_datetime: '2023-10-01T12:00:00Z' },
      })
      const input = await res.json()
      expect(input).toStrictEqual({ iso_datetime: '2023-10-01T12:00:00Z' })
      expect(res.status).toBe(200)
    })
    it('400', async () => {
      const res = await test.date['iso-datetime'].$post({
        json: { iso_datetime: '2023-10-01' },
      })
      expect(res.status).toBe(400)
    })
  })
})
