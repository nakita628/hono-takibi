/**
 * Generates a Zod array schema with the specified schema type
 * @param { string } zodSchema - Schema type for array elements (e.g., 'Address', 'z.string().min(3)')
 * @returns { string } Zod array schema string wrapped with z.array()
 * @example
 * // With type reference
 * generateZodArray('Address')
 * // Returns: 'z.array(Address)'
 *
 * // With primitive Zod schema
 * generateZodArray('z.string()')
 * // Returns: 'z.array(z.string())'
 *
 * // With complex Zod schema
 * generateZodArray('z.string().min(3).max(10)')
 * // Returns: 'z.array(z.string().min(3).max(10))'
 *
 * // With nested schema
 * generateZodArray('z.object({ name: z.string() })')
 * // Returns: 'z.array(z.object({ name: z.string() }))'
 */
export function array(zodSchema: string): string {
  return `z.array(${zodSchema})`
}
