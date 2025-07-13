export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E }

/**
 * @param { T } value - The value of the result.
 * @returns { Result<T, never> } - An Ok object containing the value.
 * @description Creates a successful result.
 */
export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value }
}

/**
 * @param { E } error - The error of the result.
 * @returns { Result<never, E> } - An Err object containing the error.
 * @description Creates an error result.
 */
export function err<E>(error: E): Result<never, E> {
  return { ok: false, error }
}

/**
 * @param { Result<A, E> } res - The result to check.
 * @param { (a: A) => Result<B, E> } f - A function that takes the value of the result and returns a new result.
 * @returns { Result<B, E> } - A new result that is either the result of the function or the original error.
 */
export function andThen<A, E, B>(res: Result<A, E>, f: (a: A) => Result<B, E>): Result<B, E> {
  return res.ok ? f(res.value) : res
}

/**
 * @param { Result<A, E> } res - The result to check.
 * @param { (a: A) => Promise<Result<B, E>> } f - A function that takes the value of the result and returns a promise of a new result.
 * @returns { Promise<Result<B, E>> } - A promise that resolves to the result of applying the function or the original result.
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
