import { describe, it, expect } from 'vitest'
import { handler } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/handler/generator/handler.test.ts

describe('handler', () => {
  it.concurrent('generateHandler Test', () => {
    const result = handler('getRouteHandler', 'getRoute')
    const expected = 'export const getRouteHandler:RouteHandler<typeof getRoute>=async(c)=>{}'
    expect(result).toBe(expected)
  })
})
