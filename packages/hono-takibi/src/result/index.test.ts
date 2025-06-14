import { describe, it, expect } from 'vitest'
import type { Ok, Err, Result } from './types'
import { ok, err, andThen, asyncAndThen } from '.'

// Test run
// pnpm vitest run ./src/result/index.test.ts

describe('barrel file (index.ts) re-exports', () => {
  it('should export ok() and err() functions', () => {
    expect(typeof ok).toBe('function')
    expect(typeof err).toBe('function')
    expect(typeof andThen).toBe('function')
    expect(typeof asyncAndThen).toBe('function')
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

  it('calls the function and returns its result when given ok', () => {
    const res = ok(2)
    const f = (n: number) => ok(n * 3)
    const result = andThen(res, f)
    expect(result).toEqual(ok(6))
  })

  it('does not call the function and returns the original err when given err', () => {
    const res = err('failure')
    const f = (_: number) => ok(999)
    const result = andThen(res, f)
    expect(result).toEqual(res)
  })

  it('returns the new err when the chained function returns err', () => {
    const res = ok('x')
    const f = (_: string) => err('bad')
    const result = andThen(res, f)
    expect(result).toEqual(err('bad'))
  })

  // asyncAndThen tests
  it('asyncAndThen: calls the async function and returns its result if ok', async () => {
    const res = ok(10)
    const f = async (n: number) => ok(n * 2)
    const result = await asyncAndThen(res, f)
    expect(result).toEqual(ok(20))
  })

  it('asyncAndThen: does not call the async function and returns the err if given err', async () => {
    const res = err('fail')
    const f = async (_: number) => ok(999)
    const result = await asyncAndThen(res, f)
    expect(result).toBe(res)
    expect(result).toEqual(err('fail'))
  })

  it('asyncAndThen: returns new err if async function returns err', async () => {
    const res = ok('hono')
    const f = async (_: string) => err('bad')
    const result = await asyncAndThen(res, f)
    expect(result).toEqual(err('bad'))
  })

  it('asyncAndThen: supports delayed async functions', async () => {
    const res = ok(3)
    const f = async (n: number) => {
      await new Promise((r) => setTimeout(r, 10))
      return ok(n + 7)
    }
    const result = await asyncAndThen(res, f)
    expect(result).toEqual(ok(10))
  })
})
