/**
 * Generates a Zod intersection schema.
 * @param { string[] } schemas - The schemas to intersect.
 * @returns { string } Generated Zod intersection schema string
 */
export function generateZodIntersection(schemas: string[]): string {
  return `z.intersection(${schemas.join(',')})`
}
