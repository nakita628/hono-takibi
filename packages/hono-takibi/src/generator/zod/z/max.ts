/**
 * Generate Zod `.max()` validation string.
 *
 * @param max - The maximum value.
 * @returns The Zod `.max()` string.
 *
 * @example
 * max(5) // => ".max(5)"
 * max(100) // => ".max(100)"
 */
export function max(max: number): string {
  return `.max(${max})`
}
