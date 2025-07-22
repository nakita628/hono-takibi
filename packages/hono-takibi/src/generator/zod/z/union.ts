/**
 * Generates a Zod union schema.
 * 
 * @param schemas - An array of Zod schema strings.
 * @returns A Zod union schema string.
 */
export function union(schemas: string[]): string {
  return `z.union([${schemas.join(',')}])`
}
