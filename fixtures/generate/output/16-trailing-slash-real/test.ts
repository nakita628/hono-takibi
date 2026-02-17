import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

describe('Trailing Slash Real-World API', () => {
  describe('default', () => {})
  describe('v2/public/reserve/account/register/line', () => {})
  describe('v2/public/reserve/account/register/mail', () => {})

  describe('GET /api/reverseGeocode/', () => {
    it('should return 200 - Reverse geocode lookup', async () => {
      const callback = faker.string.alpha({ length: { min: 5, max: 20 } })
      const search_type = faker.helpers.arrayElement(['0', '1', '2'] as const)
      const lat = faker.number.float({ min: 0, max: 1000000, fractionDigits: 4 })
      const lon = faker.number.float({ min: 0, max: 1000000, fractionDigits: 4 })
      const polygon = faker.helpers.fromRegExp(/^(\d+\.\d+,\d+\.\d+,)*\d+\.\d+,\d+\.\d+$/)
      const radius = faker.number.int({ min: 1, max: 200 })
      const include_shape = faker.datatype.boolean()
      const include_count = faker.datatype.boolean()
      const limit = faker.number.int({ min: 1, max: 50 })
      const offset = faker.number.int({ min: 1, max: 1000 })
      const res = await app.request(
        `/api/reverseGeocode/?callback=${encodeURIComponent(String(callback))}&search_type=${encodeURIComponent(String(search_type))}&lat=${encodeURIComponent(String(lat))}&lon=${encodeURIComponent(String(lon))}&polygon=${encodeURIComponent(String(polygon))}&radius=${encodeURIComponent(String(radius))}&include_shape=${encodeURIComponent(String(include_shape))}&include_count=${encodeURIComponent(String(include_count))}&limit=${encodeURIComponent(String(limit))}&offset=${encodeURIComponent(String(offset))}`,
        { method: 'GET' },
      )
      expect(res.status).toBe(200)
    })
  })
  describe('POST /api/v2/public/booking/account/register/oauth/', () => {
    it('should return 200', async () => {
      const body = {
        account: undefined,
        profile: undefined,
      }
      const res = await app.request(`/api/v2/public/booking/account/register/oauth/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      expect(res.status).toBe(200)
    })
  })
  describe('POST /api/v2/public/booking/account/register/email', () => {
    it('should return 200 - Send registration URL via email', async () => {
      const body = {
        email: faker.internet.email(),
      }
      const res = await app.request(`/api/v2/public/booking/account/register/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      expect(res.status).toBe(200)
    })
  })
})
