/**
 * Generates a Zod array schema with the specified schema type
 * @param { string } zodSchema - Schema type for array elements (e.g., 'Address', 'z.string().min(3)')
 * @returns { string } Zod array schema string wrapped with z.array()
 */
export function array(zodSchema: string): string {
  return `z.array(${zodSchema})`
}
