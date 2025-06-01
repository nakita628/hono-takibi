import { describe, it, expect } from 'vitest'
import { isHttpMethod } from './is-http-method'

const isHttpMethodTestCases = [
  { method: 'get', expected: true },
  { method: 'post', expected: true },
  { method: 'put', expected: true },
  { method: 'delete', expected: true },
  { method: 'patch', expected: true },
  { method: 'options', expected: true },
  { method: 'head', expected: true },
  { method: 'trace', expected: true },
  { method: 'GET', expected: false },
  { method: 'POST', expected: false },
  { method: 'PUT', expected: false },
  { method: 'DELETE', expected: false },
  { method: 'PATCH', expected: false },
  { method: 'OPTIONS', expected: false },
  { method: 'HEAD', expected: false },
  { method: 'TRACE', expected: false },
]

describe('isHttpMethod Test', () => {
  it.concurrent.each(isHttpMethodTestCases)(
    'isHttpMethod($method) -> $expected',
    async ({ method, expected }) => {
      const result = isHttpMethod(method)
      expect(result).toBe(expected)
    },
  )
})
