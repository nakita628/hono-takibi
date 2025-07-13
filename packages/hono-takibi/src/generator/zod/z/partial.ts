/**
 * @param { string[] } objectProperties - Object properties
 * @returns { string } Generated Zod partial schema string
 * @description Generate Zod partial schema
 */
export function partial(objectProperties: string[]): string {
  const cleanProperties = objectProperties.map((prop) => prop.replace('.optional()', ''))
  return `z.object({${cleanProperties}}).partial()`
}
