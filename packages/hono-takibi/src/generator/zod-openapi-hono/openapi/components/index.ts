import { resolveSchemasDependencies } from '../../../../helper/resolve-schemas-dependencies.js'
import { zodToOpenAPISchema } from '../../../../helper/zod-to-openapi-schema.js'
import type { Components } from '../../../../openapi/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'

/**
 * Converts OpenAPI component schemas to Zod-based TypeScript definitions.
 *
 * @param components - The OpenAPI components object.
 * @param exportSchema - Whether to export the Zod schema variables.
 * @param exportType - Whether to export the inferred Zod types.
 * @returns A string of TypeScript code with Zod schema and type definitions, or an empty string if no schemas exist.
 *
 * @remarks
 * - Resolves schema dependency order to avoid reference errors.
 * - Skips generation if no schemas are defined.
 * - Uses `zodToOpenAPI` and `zodToOpenAPISchema` for code generation.
 */
export function componentsCode(
  components: Components,
  exportSchema: boolean,
  exportType: boolean,
): string {
  // 1. schema extraction
  const { schemas } = components
  if (!schemas) {
    return ''
  }
  // 2. resolve schema dependencies to obtain proper ordering
  const orderedSchemas = resolveSchemasDependencies(schemas)
  // 3. if there are no schemas, return an empty string
  if (orderedSchemas.length === 0) {
    return ''
  }
  // 4. generate code for each schema
  const schemaDefinitions = orderedSchemas
    .map((schemaName) => {
      // 4.1 get schema definition corresponding to schema name
      const schema = schemas[schemaName]
      // 4.2 generate zod schema
      const zodSchema = zodToOpenAPI(schema)
      // 4.3 generate zod schema definition
      return zodToOpenAPISchema(schemaName, zodSchema, exportSchema, exportType)
    })
    .join('\n\n')
  // 5. return code
  return schemaDefinitions
}
