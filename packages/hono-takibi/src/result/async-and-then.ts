import type { Result } from './types.js'

export async function asyncAndThen<A, E, B>(
  res: Result<A, E>,
  f: (a: A) => Promise<Result<B, E>>,
): Promise<Result<B, E>> {
  if (res.ok) {
    return await f(res.value)
  }
  return res
}
