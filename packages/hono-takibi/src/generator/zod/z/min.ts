/**
 * Generate Zod `.min()` validation string.
 *
 * @param min - The minimum value.
 * @returns The Zod `.min()` string.
 *
 * @example
 * min(1) // => ".min(1)"
 * min(10) // => ".min(10)"
 */
export function min(min: number): string {
  return `.min(${min})`
}
