/**
 * Discriminated union for a successful or failed result.
 *
 * @typeParam T - Success value type.
 * @typeParam E - Error type (defaults to `Error`).
 */
export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E }

/**
 * Wraps a value in a successful {@link Result}.
 *
 * @typeParam T - The wrapped value type.
 * @param value - The value to mark as successful.
 * @returns A `Result` whose `ok` is `true`.
 */
export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value }
}

/**
 * Wraps an error in a failed {@link Result}.
 *
 * @typeParam E - Error type.
 * @param error - The error to wrap.
 * @returns A `Result` whose `ok` is `false`.
 */
export function err<E>(error: E): Result<never, E> {
  return { ok: false, error }
}

/**
 * Chains computations that may fail.
 *
 * @typeParam A - Input success type.
 * @typeParam B - Output success type.
 * @typeParam E - Shared error type.
 * @param res - Incoming result.
 * @param f - Function to apply when `res` is successful.
 * @returns The result of `f(res.value)` or the original error.
 */
export function andThen<A, E, B>(res: Result<A, E>, f: (a: A) => Result<B, E>): Result<B, E> {
  return res.ok ? f(res.value) : res
}

/**
 * Asynchronously chains computations that may fail.
 *
 * @typeParam A - Input success type.
 * @typeParam B - Output success type.
 * @typeParam E - Shared error type.
 * @param res - Incoming result.
 * @param f - Async function to apply when `res` is successful.
 * @returns A promise that resolves to the chained result or the original error.
 */
export async function asyncAndThen<A, E, B>(
  res: Result<A, E>,
  f: (a: A) => Promise<Result<B, E>>,
): Promise<Result<B, E>> {
  if (res.ok) {
    return await f(res.value)
  }
  return res
}
