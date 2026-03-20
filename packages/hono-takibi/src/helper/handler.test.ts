import { describe, expect, it } from 'vite-plus/test'

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

  // Edge case: first segment is a brace parameter
  it.concurrent('should strip braces when first segment is a brace parameter like /{orgId}/users', () => {
    expect(makeHandlerFileName('/{orgId}/users')).toBe('orgId.ts')
  })

  it.concurrent('should strip braces for a lone parameter path /{id}', () => {
    expect(makeHandlerFileName('/{id}')).toBe('id.ts')
  })

  it.concurrent('should strip braces and camelCase hyphenated parameter /{org-name}/repos', () => {
    expect(makeHandlerFileName('/{org-name}/repos')).toBe('orgName.ts')
  })

  // Edge case: multiple hyphens/dots in sequence
  it.concurrent('should handle consecutive hyphens between words', () => {
    expect(makeHandlerFileName('/a--b')).toBe('a-B.ts')
  })

  it.concurrent('should handle consecutive dots between words', () => {
    expect(makeHandlerFileName('/a..b')).toBe('a.B.ts')
  })

  it.concurrent('should camelCase each hyphen-letter pair in /a-b-c', () => {
    expect(makeHandlerFileName('/a-b-c')).toBe('aBC.ts')
  })

  // Edge case: path with only special characters (underscores are in [._-], all stripped)
  it.concurrent('should return __root.ts when first segment is only underscores /___/foo', () => {
    expect(makeHandlerFileName('/___/foo')).toBe('__root.ts')
  })

  // Edge case: empty string path
  it.concurrent('should return __root.ts for empty string path', () => {
    expect(makeHandlerFileName('')).toBe('__root.ts')
  })

  // Edge case: path with URL-encoded characters (% replaced with _, leading _ stripped, then camelCased)
  it.concurrent('should sanitize URL-encoded path segment to camelCase', () => {
    expect(makeHandlerFileName('/%E4%B8%AD%E6%96%87/path')).toBe('E4B8ADE69687.ts')
  })

  // Edge case: mixed case first segment
  it.concurrent('should preserve mixed case in /MyEndpoint/action', () => {
    expect(makeHandlerFileName('/MyEndpoint/action')).toBe('MyEndpoint.ts')
  })

  it.concurrent('should preserve PascalCase in /UserProfile', () => {
    expect(makeHandlerFileName('/UserProfile')).toBe('UserProfile.ts')
  })

  // Edge case: path starting with double slashes
  it.concurrent('should strip leading double slashes in //users', () => {
    expect(makeHandlerFileName('//users')).toBe('users.ts')
  })

  it.concurrent('should strip multiple leading slashes in ///api/v1', () => {
    expect(makeHandlerFileName('///api/v1')).toBe('api.ts')
  })

  // Edge case: path that is just a parameter
  it.concurrent('should handle path with only brace parameter /{userId}', () => {
    expect(makeHandlerFileName('/{userId}')).toBe('userId.ts')
  })

  it.concurrent('should handle brace parameter with underscores /{user_id} and camelCase it', () => {
    expect(makeHandlerFileName('/{user_id}')).toBe('userId.ts')
  })

  // Additional edge cases
  it.concurrent('should strip trailing dots from first segment', () => {
    expect(makeHandlerFileName('/trailing.../rest')).toBe('trailing.ts')
  })

  it.concurrent('should strip trailing hyphens from first segment', () => {
    expect(makeHandlerFileName('/trailing---/rest')).toBe('trailing.ts')
  })

  it.concurrent('should return __root.ts when first segment is only dots and hyphens', () => {
    expect(makeHandlerFileName('/.-.-./rest')).toBe('__root.ts')
  })

  it.concurrent('should handle single character path /a', () => {
    expect(makeHandlerFileName('/a')).toBe('a.ts')
  })

  it.concurrent('should handle deeply nested path using only first segment', () => {
    expect(makeHandlerFileName('/v1/a/b/c/d/e/f')).toBe('v1.ts')
  })
})
