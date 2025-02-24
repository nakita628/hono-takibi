import { testClient } from 'hono/testing'
import { describe, expect, it } from 'vitest'
import { api } from '../index.ts'

const test = testClient(api)

describe('Hono Zod OpenAPI Test', () => {
  it('getHandler', async () => {
    const res = await test.index.$get()
    const input = await res.json()
    expect(input).toEqual({
      message: 'Hono🔥',
    })
    expect(res.status).toBe(200)
  })
})
