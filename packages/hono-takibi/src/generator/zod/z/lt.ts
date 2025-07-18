/**
 * @param { number } maximum - The maximum value
 * @returns { string } Generated Zod lt validation string
 * @description Generates a Zod lt validation string
 */
export function lt(maximum: number): string {
  return `.lt(${maximum})`
}
