import { describe, it, expect } from 'vitest'
import * as handlerModule from './'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/handler/generator/index.test.ts

describe('handler barrel exports', () => {
  it('should export importHandlers', () => {
    expect(typeof handlerModule.importHandlers).toBe('function')
  })

  it('should export handlerName', () => {
    expect(typeof handlerModule.handlerName).toBe('function')
  })

  it('should export handler', () => {
    expect(typeof handlerModule.handler).toBe('function')
  })
})
