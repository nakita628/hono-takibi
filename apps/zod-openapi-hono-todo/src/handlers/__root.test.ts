import { testClient } from 'hono/testing'
import { describe, expect, it } from 'vitest'
import { api } from '@/index'

// Test run
// pnpm vitest run ./src/handlers/__root.test.ts

const test = testClient(api)

describe('Hono Zod OpenAPI Test', () => {
  it('getHandler', async () => {
    const res = await test.index.$get()
    const input = await res.json()
    expect(input).toStrictEqual({
      message: 'Hono🔥',
    })
    expect(res.status).toBe(200)
  })
})
