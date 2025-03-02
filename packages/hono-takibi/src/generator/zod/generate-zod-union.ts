/**
 * Generates a Zod union schema
 *
 * @function generateZodUnion
 * @param schemas - An array of Zod schema strings
 * @returns A Zod union schema string
 *
 * @example
 * generateZodUnion(['z.string()', 'z.number()'])
 * // Returns: 'z.union([z.string(), z.number()])'
 * @returns string - Generated Zod union schema string
 */
export function generateZodUnion(schemas: string[]): string {
  return `z.union([${schemas.join(',')}])`
}
