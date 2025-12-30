import { ensureSuffix, toIdentifierPascalCase } from '../utils/index.js'

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
  notComponentSchema?: boolean,
): string {
  const variableName = toIdentifierPascalCase(ensureSuffix(schemaName, 'Schema'))
  const safeSchemaName = toIdentifierPascalCase(schemaName)

  const schemaCode = exportSchema
    ? `export const ${variableName} = ${zodSchema}`
    : `const ${variableName} = ${zodSchema}`

  // schema code
  const componentSchemaCode = exportSchema
    ? `export const ${variableName} = ${zodSchema}.openapi('${safeSchemaName}')`
    : `const ${variableName} = ${zodSchema}.openapi('${safeSchemaName}')`

  const zodInferCode = exportType
    ? `\n\nexport type ${safeSchemaName} = z.infer<typeof ${variableName}>`
    : ''

  if (notComponentSchema) return `${schemaCode}${zodInferCode}`
  return `${componentSchemaCode}${zodInferCode}`
}
