/**
 * Generate Zod `.lt()` (less than) validation string.
 *
 * @param maximum - The exclusive upper bound.
 * @returns The Zod `.lt()` string.
 *
 * @example
 * lt(5) // => ".lt(5)"
 * lt(100) // => ".lt(100)"
 */
export function lt(maximum: number): string {
  return `.lt(${maximum})`
}
