/**
 * @param { string[] } schemas - An array of Zod schema strings
 * @returns { string } Generated Zod union schema string
 * @description Generates a Zod union schema
 */
export function union(schemas: string[]): string {
  return `z.union([${schemas.join(',')}])`
}
