import type { Config } from '../../../config'
import { generateZodInfer } from '../generate-zod-infer'

/**
 * Creates a Zod schema constant declaration
 * @param { string } name - Name of the schema constant
 * @param { string } zodSchema - Zod schema definition string
 * @returns { string } Generated constant declaration string
 * @example
 * generateZodSchemaDefinition('userSchema', 'z.object({ id: z.number(), name: z.string() })')
 * // Returns: 'const userSchema = z.object({ id: z.number(), name: z.string() })'
 * @example
 * generateZodSchemaDefinition('statusSchema', 'z.enum(["active", "inactive"])')
 * // Returns: 'const statusSchema = z.enum(["active", "inactive"])'
 * @remarks
 * - Used for generating Zod schema constant declarations
 * - Part of OpenAPI to Zod schema conversion process
 * - Creates reusable schema definitions
 */
export function generateZodToOpenAPISchemaDefinition(
  name: string,
  zodSchema: string,
  schemaName: string,
  config: Config,
): string {
  // schema code
  const schemaCode = config.schema.export
    ? `export const ${name} = ${zodSchema}.openapi('${schemaName}')`
    : `const ${name} = ${zodSchema}.openapi('${schemaName}')`
  // zod infer code
  const zodInferCode = config.type.export
    ? `export type ${schemaName} = z.infer<typeof ${name}>`
    : ''
  // return code
  return `${schemaCode}\n\n${zodInferCode}`
}
