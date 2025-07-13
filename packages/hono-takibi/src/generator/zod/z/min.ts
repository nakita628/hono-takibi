/**
 * @param { number } min - The minimum value
 * @returns { string } Generated Zod min validation string
 * @description Generate Zod min validation
 * @example
 * min(1) -> ".min(1)"
 * min(10) -> ".min(10)"
 */
export function min(min: number): string {
  return `.min(${min})`
}
