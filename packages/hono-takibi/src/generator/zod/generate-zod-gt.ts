/**
 * Generate Zod gt validation
 *
 * @function generateZodGt
 * @param minimum - Minimum value
 * @returns Zod gt validation string
 */
export function generateZodGt(minimum: number): string {
  return `.gt(${minimum})`
}
