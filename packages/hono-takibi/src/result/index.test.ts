import { describe, it, expect } from 'vitest'
import type { Ok, Err, Result } from './types'
import { ok, err } from '.'

// Test run
// pnpm vitest run ./src/result/index.test.ts

describe('barrel file (index.ts) re-exports', () => {
  it('should export ok() and err() functions', () => {
    expect(typeof ok).toBe('function')
    expect(typeof err).toBe('function')
  })

  it('should export Ok, Err, Result types (type-level test)', () => {
    const o: Ok<number> = ok(123)
    const e: Err<string> = err('fail')
    const r1: Result<number, string> = ok(1)
    const r2: Result<number, string> = err('bad')
    expect(o.ok).toBe(true)
    expect(o.value).toBe(123)
    expect(e.ok).toBe(false)
    expect(e.error).toBe('fail')
    expect(r1.ok).toBe(true)
    expect(r2.ok).toBe(false)
  })
})
