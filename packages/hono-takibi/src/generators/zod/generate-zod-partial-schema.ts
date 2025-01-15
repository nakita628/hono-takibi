export function generateZodPartialSchema(objectProperties: string[]): string {
  const cleanProperties = objectProperties.map((prop) => prop.replace('.optional()', ''))
  return `z.object({${cleanProperties}}).partial()`
}
