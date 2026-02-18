import { describe, expect, it } from 'vitest'
import { makeHandlerFileName } from './handler.js'

describe('makeHandlerFileName', () => {
  it('should convert simple path to filename', () => {
    expect(makeHandlerFileName('/users')).toBe('users.ts')
  })

  it('should use first segment only', () => {
    expect(makeHandlerFileName('/api/tasks')).toBe('api.ts')
    expect(makeHandlerFileName('/api/v1/posts')).toBe('api.ts')
  })

  it('should handle path parameters with colon syntax', () => {
    expect(makeHandlerFileName('/users/:id')).toBe('users.ts')
  })

  it('should handle path parameters with brace syntax', () => {
    expect(makeHandlerFileName('/users/{userId}')).toBe('users.ts')
  })

  it('should return __root.ts for root path', () => {
    expect(makeHandlerFileName('/')).toBe('__root.ts')
  })

  it('should handle health check path', () => {
    expect(makeHandlerFileName('/health')).toBe('health.ts')
  })

  it('should strip leading dots from path segment', () => {
    expect(makeHandlerFileName('/.hidden')).toBe('hidden.ts')
  })

  it('should handle numeric path segments', () => {
    expect(makeHandlerFileName('/123numeric')).toBe('123numeric.ts')
  })

  it('should convert special characters to camelCase', () => {
    expect(makeHandlerFileName('/special-chars_test.route')).toBe('specialCharsTestRoute.ts')
  })
})
