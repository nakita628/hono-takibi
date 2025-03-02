/**
 * Generate Zod max validation
 *
 * @function generateZodMax
 * @param max - Maximum value
 * @returns Zod max validation string
 */
export function generateZodMax(max: number): string {
  return `.max(${max})`
}
