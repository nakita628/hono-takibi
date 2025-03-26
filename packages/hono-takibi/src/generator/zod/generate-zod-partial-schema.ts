/**
 * Generate Zod partial schema
 * @param { string[] } objectProperties - Object properties
 * @returns { string } Generated Zod partial schema string
 */
export function generateZodPartialSchema(objectProperties: string[]): string {
  const cleanProperties = objectProperties.map((prop) => prop.replace('.optional()', ''))
  return `z.object({${cleanProperties}}).partial()`
}
