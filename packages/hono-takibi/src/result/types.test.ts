import { describe, it, expect } from 'vitest'
import type { Ok, Err, Result } from '.'

// Test run
// pnpm vitest run ./src/result/types.test.ts

describe('Ok, Err, Result types', () => {
  it('Ok: constructs an ok result correctly', () => {
    const value: Ok<number> = { ok: true, value: 42 }
    expect(value.ok).toBe(true)
    expect(value.value).toBe(42)
  })

  it('Err: constructs an err result correctly', () => {
    const error: Err<string> = { ok: false, error: 'failure' }
    expect(error.ok).toBe(false)
    expect(error.error).toBe('failure')
  })

  it('Result: can be Ok or Err', () => {
    const okResult: Result<number, string> = { ok: true, value: 99 }
    const errResult: Result<number, string> = { ok: false, error: 'bad' }
    expect(okResult.ok).toBe(true)
    expect(okResult.value).toBe(99)
    expect(errResult.ok).toBe(false)
    expect(errResult.error).toBe('bad')
  })

  it('should allow using Ok and Err in type assignments', () => {
    const x: Result<string, number> = { ok: true, value: 'a' }
    const y: Result<string, number> = { ok: false, error: 123 }
    expect(x.ok).toBe(true)
    expect(y.ok).toBe(false)
  })
})
