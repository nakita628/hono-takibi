import type { Components } from '../../../../openapi/index.js'
import { generateZodToOpenAPISchemaDefinition } from '../../../zod-to-openapi/defining/generate-zod-to-openapi-schema-definition.js'
import { resolveSchemasDependencies } from '../../../../core/schema/references/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'

/**
 * Generates TypeScript code for OpenAPI components, converting them to Zod schemas.
 * If no schemas are present, returns an empty string.
 * @param { Components } components - OpenAPI components object containing schema definitions
 * @param { boolean } exportSchema - Whether to export the schema definitions
 * @param { boolean } exportType - Whether to export the type definitions
 * @returns { string } Generated TypeScript code string containing Zod schema definitions and exports, or empty string if no schemas
 *
 * 1. Extracts schemas from components
 * 2. Resolves dependencies between schemas to determine correct generation order
 * 3. Returns empty string if no schemas are present
 * 4. Generates Zod schema definitions for each schema
 * 5. Creates exports for all schemas
 * 6. Returns the complete code with proper ordering to avoid reference errors
 */
export function generateComponentsCode(
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
      return generateZodToOpenAPISchemaDefinition(schemaName, zodSchema, exportSchema, exportType)
    })
    .join('\n\n')
  // 5. return code
  return schemaDefinitions
}
