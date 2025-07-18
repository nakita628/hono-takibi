/**
 * @param { number } max - The maximum value
 * @returns { string } Generated Zod max validation string
 * @description Generates a Zod max validation string
 */
export function max(max: number): string {
  return `.max(${max})`
}
