import { getVariableSchemaName, getVariableName } from '../../../core/helper/index.js'
import { sanitizeIdentifier } from '../../../core/utils/index.js'
import { infer } from '../../zod/index.js'

/**
 * Creates a Zod schema constant declaration
 * @param { string } schemaName - Name of the schema constant
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
  schemaName: string,
  zodSchema: string,
  exportSchema: boolean,
  exportType: boolean,
): string {
  const variableName = `${schemaName}Schema`
  const safeVariableName = sanitizeIdentifier(variableName)
  const safeSchemaName = sanitizeIdentifier(schemaName)
  // schema code
  const schemaCode = exportSchema
    ? `export const ${safeVariableName} = ${zodSchema}.openapi('${safeSchemaName}')`
    : `const ${safeVariableName} = ${zodSchema}.openapi('${safeSchemaName}')`
  // zod infer code
  const typeVariableName = schemaName
  const safeTypeVariableName = sanitizeIdentifier(typeVariableName)

  const zodInferCode = exportType ? infer(safeTypeVariableName, safeVariableName) : ''
  // return code
  return `${schemaCode}\n\n${zodInferCode}`
}
