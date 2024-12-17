/**
 * Creates a Zod schema constant declaration
 *
 * @function generateZodSchemaDefinition
 * @param name - Name of the schema constant
 * @param zodSchema - Zod schema definition string
 * @returns Generated constant declaration string
 *
 * @example
 * generateZodSchemaDefinition('User', 'z.object({ id: z.number(), name: z.string() })')
 * // Returns: 'const User = z.object({ id: z.number(), name: z.string() })'
 *
 * @example
 * generateZodSchemaDefinition('Status', 'z.enum(["active", "inactive"])')
 * // Returns: 'const Status = z.enum(["active", "inactive"])'
 *
 * @remarks
 * - Used for generating Zod schema constant declarations
 * - Part of OpenAPI to Zod schema conversion process
 * - Creates reusable schema definitions
 */
export function generateZodSchemaDefinition(name: string, zodSchema: string): string {
  return `const ${name}Schema = ${zodSchema}`
}
