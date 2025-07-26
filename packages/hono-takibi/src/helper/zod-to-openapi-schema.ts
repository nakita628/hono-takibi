import { sanitizeIdentifier } from '../utils/index.js'

/**
 * Generates a Zod schema constant and optional inferred type alias.
 *
 * @param schemaName - The base name of the schema (used for variable and type names)
 * @param zodSchema - The Zod schema string to assign
 * @param exportSchema - Whether to `export` the Zod schema constant
 * @param exportType - Whether to `export` the inferred type alias
 * @returns The generated code string containing the schema and optional type alias
 *
 * @example
 * zodToOpenAPISchema('User', 'z.object({name: z.string()})', true, true)
 * // → 'export const UserSchema = z.object({name: z.string()}).openapi("User")\n\nexport type User = z.infer<typeof UserSchema>'
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
  const safeTypeVariableName = sanitizeIdentifier(schemaName)

  const zodInferCode = exportType
    ? `export type ${safeTypeVariableName} = z.infer<typeof ${safeVariableName}>`
    : ''
  // return code
  return `${schemaCode}\n\n${zodInferCode}`
}
