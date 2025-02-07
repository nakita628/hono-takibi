import { testClient } from 'hono/testing'
import { describe, expect, it } from 'vitest'
import { api } from '../../..'

const test = testClient(api)

describe('Hono Zod OpenAPI Test', () => {
  it('getRouteHandler', async () => {
    const res = await test.index.$get()
    const input = await res.json()
    expect(input).toEqual({
      message: 'Hono🔥 Drizzle',
    })
    expect(res.status).toBe(200)
  })
})
