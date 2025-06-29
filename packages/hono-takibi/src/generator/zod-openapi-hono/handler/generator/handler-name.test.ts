import { describe, it, expect } from 'vitest'
import { handlerName } from './handler-name'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/handler/generator/handler-name.test.ts

const handlerNameTestCases: {
  method: string
  path: string
  expected: string
}[] = [
  { method: 'get', path: '/', expected: 'getRouteHandler' },
  { method: 'post', path: '/posts', expected: 'postPostsRouteHandler' },
  { method: 'put', path: '/posts/{id}', expected: 'putPostsIdRouteHandler' },
  { method: 'delete', path: '/posts/{id}', expected: 'deletePostsIdRouteHandler' },
]

describe('handlerName', () => {
  it.concurrent.each(handlerNameTestCases)(
    'handlerName($method, $path) -> $expected',
    async ({ method, path, expected }) => {
      const result = handlerName(method, path)
      expect(result).toBe(expected)
    },
  )
})
