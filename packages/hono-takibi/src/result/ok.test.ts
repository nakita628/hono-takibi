import { describe, it, expect } from 'vitest'
import { ok } from '.'

// Test run
// pnpm vitest run ./src/result/ok.test.ts

describe('ok', () => {
  it.concurrent('should create an Ok result', () => {
    const result = ok('ok')
    expect(result).toEqual({ ok: true, value: 'ok' })
    expect(result.ok).toBe(true)
    expect(result.value).toBe('ok')
  })
})
