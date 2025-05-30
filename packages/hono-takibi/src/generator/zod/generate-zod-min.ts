/**
 * Generate Zod min validation
 * @param { number } min - The minimum value
 * @returns { string } Generated Zod min validation string
 * @example
 * generateZodMin(1) -> ".min(1)"
 * generateZodMin(10) -> ".min(10)"
 */
export function generateZodMin(min: number): string {
  return `.min(${min})`
}
