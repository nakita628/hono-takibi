import { describe, it, expect } from 'vitest'
import { sanitizeIdentifier } from '.'

// Test run
// pnpm vitest run ./src/core/utils/sanitizeIdentifier.test.ts

describe('sanitizeIdentifier', () => {
  it.concurrent(`sanitizeIdentifier('test') -> 'test'`, () => {})
  it.concurrent(`sanitizeIdentifier('test123') -> 'test123'`, () => {
    expect(sanitizeIdentifier('test123')).toBe('test123')
  })
  it.concurrent(`sanitizeIdentifier('_test') -> '_test'`, () => {
    expect(sanitizeIdentifier('_test')).toBe('_test')
  })
  it.concurrent(`sanitizeIdentifier('$test') -> '$test'`, () => {
    expect(sanitizeIdentifier('$test')).toBe('$test')
  })
  it.concurrent(`sanitizeIdentifier('foo-bar') -> 'foo_bar'`, () => {
    expect(sanitizeIdentifier('foo-bar')).toBe('foo_bar')
  })
  it.concurrent(`sanitizeIdentifier('foo@bar!baz') -> 'foo_bar_baz'`, () => {
    expect(sanitizeIdentifier('foo@bar!baz')).toBe('foo_bar_baz')
  })
  it.concurrent(`sanitizeIdentifier('post.title') -> 'post_title'`, () => {
    expect(sanitizeIdentifier('post.title')).toBe('post_title')
  })
  it.concurrent(`(sanitizeIdentifier('テスト') -> '___'`, () => {
    expect(sanitizeIdentifier('テスト')).toBe('___')
  })
  it.concurrent(`sanitizeIdentifier('') -> ''`, () => {
    expect(sanitizeIdentifier('')).toBe('')
  })
})
