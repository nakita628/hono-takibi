import { describe, it, expect } from 'vitest'
import { generateHandlerName } from './generate-handler-name'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/handler/generate-handler-name.test.ts

const generateHandlerNameTestCases: {
  method: string
  path: string
  expected: string
}[] = [
  { method: 'get', path: '/', expected: 'getRouteHandler' },
  { method: 'post', path: '/posts', expected: 'postPostsRouteHandler' },
  { method: 'put', path: '/posts/{id}', expected: 'putPostsIdRouteHandler' },
  { method: 'delete', path: '/posts/{id}', expected: 'deletePostsIdRouteHandler' },
]

describe('generateHandlerName', () => {
  it.concurrent.each(generateHandlerNameTestCases)(
    'generateHandlerName($method, $path) -> $expected',
    async ({ method, path, expected }) => {
      const result = generateHandlerName(method, path)
      expect(result).toBe(expected)
    },
  )
})
