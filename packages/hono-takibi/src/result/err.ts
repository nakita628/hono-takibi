import type { Err } from './index.js'

/**
 * Creates an error result.
 * @param error - The error of the result.
 * @returns An Err object containing the error.
 */
export function err<E>(error: E): Err<E> {
  return { ok: false, error }
}
