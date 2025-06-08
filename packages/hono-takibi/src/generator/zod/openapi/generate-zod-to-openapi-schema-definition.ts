import type { Config } from '../../../config/index.js'
import { getVariableNameHelper } from '../../../core/helper/index.js'
import { getVariableSchemaNameHelper } from '../../../core/helper/get-variable-schema-name-helper.js'
import { generateZodInfer } from '../generate-zod-infer.js'

/**
 * Creates a Zod schema constant declaration
 * @param { string } schemaName - Name of the schema constant
 * @param { string } zodSchema - Zod schema definition string
 * @param { Config } config - Configuration
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
  config: Config,
): string {
  const variableName = getVariableSchemaNameHelper(schemaName, config)
  // "-" → "_"
  const safeVariableName = variableName.replace(/[^a-zA-Z0-9_$]/g, '_')
  // "-" → "_"
  const safeSchemaName = schemaName.replace(/[^a-zA-Z0-9_$]/g, '_')
  // schema code
  const schemaCode = config.schema.export
    ? `export const ${safeVariableName} = ${zodSchema}.openapi('${safeSchemaName}')`
    : `const ${safeVariableName} = ${zodSchema}.openapi('${safeSchemaName}')`
  // zod infer code
  const typeVariableName = getVariableNameHelper(schemaName, config)
  const safeTypeVariableName = typeVariableName.replace(/[^a-zA-Z0-9_$]/g, '_')
  const zodInferCode = config.type.export
    ? generateZodInfer(safeTypeVariableName, safeVariableName)
    : ''
  // return code
  return `${schemaCode}\n\n${zodInferCode}`
}
