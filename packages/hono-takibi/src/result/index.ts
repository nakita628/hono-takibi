export type Ok<T> = { ok: true; value: T }
export type Err<E> = { ok: false; error: E }
export type Result<T, E> = Ok<T> | Err<E>

/**
 * Creates a successful result.
 * @param value - The value of the successful result.
 * @returns An Ok object containing the value.
 */
export function ok<T>(value: T): Ok<T> {
  return { ok: true, value }
}

/**
 * Creates an error result.
 * @param error - The error of the result.
 * @returns An Err object containing the error.
 */
export function err<E>(error: E): Err<E> {
  return { ok: false, error }
}

/**
 * Checks if the result is an error.
 * @param res - The result to check.
 * @returns True if the result is an error, false otherwise.
 */
export function andThen<A, E, B>(res: Result<A, E>, f: (a: A) => Result<B, E>): Result<B, E> {
  return res.ok ? f(res.value) : res
}

/**
 * Asynchronously applies a function to the value of a successful result.
 * @param res - The result to check.
 * @param f - The function to apply if the result is successful.
 * @returns A promise that resolves to a new result.
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
