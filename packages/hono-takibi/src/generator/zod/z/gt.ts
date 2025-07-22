/**
 * Generate Zod `.gt()` (greater than) validation string.
 *
 * @param minimum - The exclusive lower bound.
 * @returns The Zod `.gt()` string.
 *
 * @example
 * gt(5) // => ".gt(5)"
 * gt(10) // => ".gt(10)"
 */
export function gt(minimum: number): string {
  return `.gt(${minimum})`
}
