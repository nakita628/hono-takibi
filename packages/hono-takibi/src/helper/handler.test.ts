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

  // Edge case: numeric-only first segment
  it.concurrent('should handle purely numeric first segment /42', () => {
    expect(makeHandlerFileName('/42')).toBe('42.ts')
  })

  it.concurrent('should handle numeric first segment with nested path /404/error', () => {
    expect(makeHandlerFileName('/404/error')).toBe('404.ts')
  })

  // Edge case: special characters replaced with underscore then collapsed
  it.concurrent('should sanitize @ symbol in path /user@domain', () => {
    expect(makeHandlerFileName('/user@domain')).toBe('userDomain.ts')
  })

  it.concurrent('should sanitize + symbol in path /a+b', () => {
    expect(makeHandlerFileName('/a+b')).toBe('aB.ts')
  })

  it.concurrent('should sanitize ~ symbol in path /home~user', () => {
    expect(makeHandlerFileName('/home~user')).toBe('homeUser.ts')
  })

  it.concurrent('should sanitize ! symbol in path /alert!', () => {
    expect(makeHandlerFileName('/alert!')).toBe('alert.ts')
  })

  // Edge case: brace parameter mixed with text in first segment
  it.concurrent('should handle brace parameter mixed with text /v{version}', () => {
    expect(makeHandlerFileName('/v{version}')).toBe('vversion.ts')
  })

  it.concurrent('should handle text before and after brace /pre{mid}post', () => {
    expect(makeHandlerFileName('/pre{mid}post')).toBe('premidpost.ts')
  })

  // Edge case: multiple brace parameters in first segment
  it.concurrent('should handle multiple brace params /{a}{b}', () => {
    expect(makeHandlerFileName('/{a}{b}')).toBe('ab.ts')
  })

  // Edge case: trailing slash with no other content
  it.concurrent('should return __root.ts for trailing slash only //', () => {
    expect(makeHandlerFileName('//')).toBe('__root.ts')
  })

  // Edge case: first segment has only special chars that all get stripped
  it.concurrent('should return __root.ts when first segment is all special chars /!@#$/foo', () => {
    expect(makeHandlerFileName('/!@#$/foo')).toBe('__root.ts')
  })

  // Edge case: underscore between words should camelCase
  it.concurrent('should camelCase underscore-separated words /get_all_users', () => {
    expect(makeHandlerFileName('/get_all_users')).toBe('getAllUsers.ts')
  })

  // Edge case: mixed separators in first segment
  it.concurrent('should camelCase mixed separators /get-all_users.list', () => {
    expect(makeHandlerFileName('/get-all_users.list')).toBe('getAllUsersList.ts')
  })

  // Edge case: single special char paths
  it.concurrent('should return __root.ts for single dot path /.', () => {
    expect(makeHandlerFileName('/.')).toBe('__root.ts')
  })

  it.concurrent('should return __root.ts for single hyphen path /-', () => {
    expect(makeHandlerFileName('/-')).toBe('__root.ts')
  })

  // Edge case: whitespace in path (replaced with _)
  it.concurrent('should sanitize space in path /my path', () => {
    expect(makeHandlerFileName('/my path')).toBe('myPath.ts')
  })

  // Edge case: very long first segment still works
  it.concurrent('should handle long first segment', () => {
    expect(makeHandlerFileName('/abcdefghijklmnopqrstuvwxyz')).toBe('abcdefghijklmnopqrstuvwxyz.ts')
  })

  // Edge case: first segment starting with number then hyphen
  it.concurrent('should handle segment starting with number then hyphen /1-test', () => {
    expect(makeHandlerFileName('/1-test')).toBe('1Test.ts')
  })

  // Edge case: multiple consecutive underscores collapsed
  it.concurrent('should collapse multiple special chars into single camelCase /a@@b', () => {
    expect(makeHandlerFileName('/a@@b')).toBe('aB.ts')
  })
})
