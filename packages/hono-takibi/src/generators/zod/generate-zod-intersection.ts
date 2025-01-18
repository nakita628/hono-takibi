/**
 * Generates a Zod intersection schema.
 *
 * @param schemas - The schemas to intersect.
 * @returns The generated Zod intersection schema as a string.
 */
export function generateZodIntersection(schemas: string[]): string {
  return `z.intersection(${schemas.join(',')})`
}
