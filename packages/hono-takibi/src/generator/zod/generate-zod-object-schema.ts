/**
 * Generates a Zod object schema from a record of property types
 * @param { Record<string, string> } object - Record of property names and their Zod type strings
 * @returns { string } Generated Zod object schema string
 * @example
 * // Basic object
 * generateZodObjectSchema({ name: 'z.string()' })
 * // Returns: 'z.object({name:z.string()})'
 *
 * // Multiple properties
 * generateZodObjectSchema({
 *   name: 'z.string()',
 *   age: 'z.number()',
 *   isActive: 'z.boolean()'
 * })
 * // Returns: 'z.object({name:z.string(),age:z.number(),isActive:z.boolean()})'
 *
 * // With validated types
 * generateZodObjectSchema({
 *   email: 'z.string().email()',
 *   age: 'z.number().min(0)'
 * })
 * // Returns: 'z.object({email:z.string().email(),age:z.number().min(0)})'
 * 
 * - Each property value should be a valid Zod type string
 * - Properties are joined with commas in the resulting object
 * - Commonly used for generating simple object schemas
 * - Does not support nested objects directly (use full schema generator for complex objects)
 *
 * @see generateZod for complex object schema generation
 * @returns string - Generated Zod object schema string
 */
export function generateZodObjectSchema(object: Record<string, string>): string {
  return `z.object({${Object.entries(object)
    .map(([key, val]) => `${key}:${val}`)
    .join(',')}})`
}
