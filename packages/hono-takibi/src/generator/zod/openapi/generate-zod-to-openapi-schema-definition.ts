import type { Config } from '../../../config'
import { getVariableNameHelper } from '../../../core/helper/get-variable-name-helper'
import { getVariableSchemaNameHelper } from '../../../core/helper/get-variable-schema-name-helper'
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
  schemaName: string,
  zodSchema: string,
  config: Config,
): string {
  const variableName = getVariableSchemaNameHelper(schemaName, config)
  // schema code
  const schemaCode = config.schema.export
    ? `export const ${variableName} = ${zodSchema}.openapi('${schemaName}')`
    : `const ${variableName} = ${zodSchema}.openapi('${schemaName}')`
  // zod infer code
  const typeVariableName = getVariableNameHelper(schemaName, config)
  const zodInferCode = config.type.export ? generateZodInfer(typeVariableName, variableName) : ''
  // return code
  return `${schemaCode}\n\n${zodInferCode}`
}
