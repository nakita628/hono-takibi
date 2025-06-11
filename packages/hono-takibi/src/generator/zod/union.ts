/**
 * Generates a Zod union schema
 * @param { string[] } schemas - An array of Zod schema strings
 * @returns { string } Generated Zod union schema string
 * @example
 * generateZodUnion(['z.string()', 'z.number()'])
 * // Returns: 'z.union([z.string(), z.number()])'
 */
export function union(schemas: string[]): string {
  return `z.union([${schemas.join(',')}])`
}
