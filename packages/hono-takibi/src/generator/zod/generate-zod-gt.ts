/**
 * Generates a Zod gt validation string
 * @param { number } minimum - The minimum value
 * @returns { string } Generated Zod gt validation string
 */
export function generateZodGt(minimum: number): string {
  return `.gt(${minimum})`
}
