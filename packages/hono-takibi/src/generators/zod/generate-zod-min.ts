/**
 * Generate Zod min validation
 *
 * @param min - Minimum value
 * @returns Zod min validation string
 */
export function generateZodMin(min: number): string {
  return `.min(${min})`
}
