/**
 * Generates a Zod lt validation string
 * @param { number } maximum - The maximum value
 * @returns { string } Generated Zod lt validation string
 */
export function generateZodLt(maximum: number): string {
  return `.lt(${maximum})`
}
