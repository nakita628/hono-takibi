/**
 * @param { number } length - The length value to validate against
 * @returns { string } Generated Zod length validation string
 * @description Generates a Zod length validation string
 */
export function length(length: number): string {
  return `.length(${length})`
}
