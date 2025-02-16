import { describe, expect, it } from 'vitest'
import { generateHandlerName } from '../../handler/generate-handler-name'

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
