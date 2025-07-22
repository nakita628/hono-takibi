/**
 * Generates a Zod partial schema.
 *
 * @param objectProperties - Object properties.
 * @returns The generated Zod partial schema string.
 */
export function partial(objectProperties: string[]): string {
  const cleanProperties = objectProperties.map((prop) => prop.replace('.optional()', ''))
  return `z.object({${cleanProperties}}).partial()`
}
