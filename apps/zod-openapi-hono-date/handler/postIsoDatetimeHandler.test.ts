import { describe, expect, it } from 'vitest'
import { testClient } from 'hono/testing'
import { api } from '..'

// test client
const test = testClient(api)

describe('Hono Zod OpenAPI Test', () => {
  it('postIsoDatetimeHandler 201', async () => {
    const res = await test.isoDatetime.$post({
      json: {
        iso_datetime: '2023-10-01T12:00:00Z',
      },
    })
    const input = await res.json()
    expect(input).toStrictEqual({ message: 'Created' })
    expect(res.status).toBe(201)
  })

  it('postIsoDatetimeHandler 422', async () => {
    const res = await test.isoDatetime.$post({
      json: {
        iso_datetime: 'invalid-date',
      },
    })
    expect(res.status).toBe(422)
  })
})