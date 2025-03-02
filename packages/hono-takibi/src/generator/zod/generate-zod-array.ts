/**
 * Generates a Zod array schema with the specified schema type
 *
 * @function generateZodArray
 * @param zodSchema - Schema type for array elements (e.g., 'Address', 'z.string().min(3)')
 * @returns Zod array schema string wrapped with z.array()
 *
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
 *
 * @note
 * - Commonly used in OpenAPI to Zod schema conversion
 * - Accepts both type references and Zod schema strings
 * - The input schema should be a valid Zod schema or type reference
 * - Used for generating array type validations
 *
 * @returns string - Generated Zod array schema string
 */
export function generateZodArray(zodSchema: string) {
  return `z.array(${zodSchema})`
}
