import { describe, it, expect } from 'vitest'
import { ok, err, andThen, asyncAndThen } from '.'

// Test run
// pnpm vitest run ./src/result/index.test.ts

describe('result', () => {
  describe('ok', () => {
    it.concurrent('should create an Ok result', () => {
      const result = ok('ok')
      expect(result).toEqual({ ok: true, value: 'ok' })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value).toBe('ok')
      }
    })
  })

  describe('err', () => {
    it.concurrent('should create an Err result', () => {
      const result = err('err')
      expect(result).toEqual({ ok: false, error: 'err' })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe('err')
      }
    })
  })

  describe('andThen', () => {
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
  })

  describe('asyncAndThen', () => {
    it('should call the async function and return its Result if res is ok', async () => {
      const res = ok(10)
      const f = async (n: number) => ok(n * 2)
      const result = await asyncAndThen(res, f)
      expect(result).toEqual(ok(20))
    })

    it('should not call the function and return err directly if res is err', async () => {
      const res = err('fail')
      const f = async (_: number) => ok(999)
      const result = await asyncAndThen(res, f)
      expect(result).toBe(res)
      expect(result).toEqual(err('fail'))
    })

    it('should return the new err if the async function returns err', async () => {
      const res = ok('hono')
      const f = async (_: string) => err('bad')
      const result = await asyncAndThen(res, f)
      expect(result).toEqual(err('bad'))
    })

    it('should support async functions that resolve after a delay', async () => {
      const res = ok(3)
      const f = async (n: number) => {
        await new Promise((r) => setTimeout(r, 10))
        return ok(n + 7)
      }
      const result = await asyncAndThen(res, f)
      expect(result).toEqual(ok(10))
    })
  })
})
