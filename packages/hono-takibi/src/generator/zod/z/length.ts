/**
 * Generate Zod `.length()` validation string.
 *
 * @param length - The exact length to validate against.
 * @returns The Zod `.length()` string.
 *
 * @example
 * length(5) // => ".length(5)"
 * length(10) // => ".length(10)"
 */
export function length(length: number): string {
  return `.length(${length})`
}
