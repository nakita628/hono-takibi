import type { Result } from "./index.js";

export function andThen<A, E, B>(res: Result<A, E>, f: (a: A) => Result<B, E>): Result<B, E> {
  return res.ok ? f(res.value) : res
}
