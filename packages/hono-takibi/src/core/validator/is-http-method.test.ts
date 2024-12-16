import { describe, expect, it } from 'vitest'
import { isHttpMethod } from './is-http-method'

const isHttpMethodTestCases = [
  { method: 'get', expected: true },
  { method: 'post', expected: true },
  { method: 'put', expected: true },
  { method: 'delete', expected: true },
  { method: 'patch', expected: true },
  { method: 'options', expected: true },
  { method: 'head', expected: true },
  { method: 'GET', expected: false },
  { method: 'POST', expected: false },
  { method: 'PUT', expected: false },
  { method: 'DELETE', expected: false },
  { method: 'PATCH', expected: false },
  { method: 'OPTIONS', expected: false },
  { method: 'HEAD', expected: false },
]

describe('isHttpMethod', () => {
  it.concurrent.each(isHttpMethodTestCases)(
    'isHttpMethod($method) -> $expected',
    async ({ method, expected }) => {
      const result = isHttpMethod(method)
      expect(result).toBe(expected)
    },
  )
})
