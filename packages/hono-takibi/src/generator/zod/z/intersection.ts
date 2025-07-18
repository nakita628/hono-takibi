/**
 * @param { string[] } schemas - The schemas to intersect.
 * @returns { string } Generated Zod intersection schema string
 * @description Generates a Zod intersection schema.
 */
export function intersection(schemas: string[]): string {
  return `z.intersection(${schemas.join(',')})`
}
