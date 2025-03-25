import type { Components } from '../../../../type'
import type { Config } from '../../../../config'
import { generateZodToOpenAPISchemaDefinition } from '../../../zod/openapi/generate-zod-to-openapi-schema-definition'
import { generateZod } from '../../../zod/generate-zod'
import { resolveSchemasDependencies } from '../../../../core/schema/references/resolve-schemas-dependencies'

/**
 * Generates TypeScript code for OpenAPI components, converting them to Zod schemas.
 * If no schemas are present, returns an empty string.
 * @param { Components } components - OpenAPI components object containing schema definitions
 * @param { Config } config - Config
 * @returns { string } Generated TypeScript code string containing Zod schema definitions and exports, or empty string if no schemas
 *
 * 1. Extracts schemas from components
 * 2. Resolves dependencies between schemas to determine correct generation order
 * 3. Returns empty string if no schemas are present
 * 4. Generates Zod schema definitions for each schema
 * 5. Creates exports for all schemas
 * 6. Returns the complete code with proper ordering to avoid reference errors
 */
export function generateComponentsCode(components: Components, config: Config): string {
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
      const zodSchema = generateZod(config, schema, undefined, undefined)
      // 4.3 generate zod schema definition
      return generateZodToOpenAPISchemaDefinition(schemaName, zodSchema, config)
    })
    .join('\n\n')
  // 5. return code
  return schemaDefinitions
}
