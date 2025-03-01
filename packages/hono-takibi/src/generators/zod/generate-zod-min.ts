/**
 * Generate Zod min validation
 *
 * @function generateZodMin
 * @param min - Minimum value
 * @returns Zod min validation string
 *
 * @example
 * generateZodMin(1) -> ".min(1)"
 * generateZodMin(10) -> ".min(10)"
 */
export function generateZodMin(min: number): string {
  return `.min(${min})`
}
