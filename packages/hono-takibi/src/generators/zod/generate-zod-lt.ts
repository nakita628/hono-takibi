/**
 * Generate Zod lt validation
 *
 * @param maximum - Maximum value
 * @returns Zod lt validation string
 */
export function generateZodLt(maximum: number): string {
  return `.lt(${maximum})`
}
