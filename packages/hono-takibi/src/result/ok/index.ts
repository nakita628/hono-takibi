import type { Ok } from '../types/index.js'

/**
 * Creates a successful result.
 * @param value - The value of the successful result.
 * @returns An Ok object containing the value.
 */
export function ok<T>(value: T): Ok<T> {
  return { ok: true, value }
}
