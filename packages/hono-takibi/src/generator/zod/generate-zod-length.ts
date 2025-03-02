/**
 * Generates a Zod length validation string
 *
 * @function generateZodLength
 * @param length - The length value to validate against
 * @returns The Zod length validation string
 *
 * @example
 * const lengthValidation = generateZodLength(10)
 * // Returns: 'length(10)'
 */
export function generateZodLength(length: number): string {
  return `.length(${length})`
}
