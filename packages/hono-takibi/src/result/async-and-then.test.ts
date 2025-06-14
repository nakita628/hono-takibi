import { describe, it, expect } from 'vitest'
import { asyncAndThen, ok, err } from '.'

// Test run
// pnpm vitest run ./src/result/async-and-then.test.ts

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
