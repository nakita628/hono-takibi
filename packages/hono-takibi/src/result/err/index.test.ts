import { describe, it, expect } from 'vitest'
import { err } from '.'

// Test run
// pnpm vitest run ./src/result/err/index.test.ts

describe('err', () => {
  it.concurrent('should create an Err result', () => {
    const result = err('err')
    expect(result).toEqual({ ok: false, error: 'err' })
    expect(result.ok).toBe(false)
    expect(result.error).toBe('err')
  })
})