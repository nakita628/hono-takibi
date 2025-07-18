import { sanitizeIdentifier } from '../../core/utils/index.js'
import { infer } from '../zod/z/index.js'

/**
 * @param { string } schemaName - Name of the schema constant
 * @param { string } zodSchema - Zod schema definition string
 * @returns { string } Generated constant declaration string
 * @param { boolean } exportSchema - Whether to export the schema constant
 * @param { boolean } exportType - Whether to export the TypeScript type alias
 * @description Creates a Zod schema constant declaration
 */
export function zodToOpenAPISchema(
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
