import type { Components } from '../../../types'
import { generateZodSchemaDefinition } from '../../zod/generate-zod-schema-definition'
import { generateZodSchema } from '../../../generators/zod/generate-zod-schema'
import { resolveSchemasDependencies } from '../../../core/schema/references/resolve-schemas-dependencies'
import { getCamelCaseSchemaName } from '../../../core/schema/references/get-camel-case-schema-name'
import { generateSchemasExport } from '../paths/generate-schemas-export'
import { getPascalCaseSchemaName } from '../../../core/schema/references/get-pascal-case-schema-name'

/**
 * Generates TypeScript code for OpenAPI components, converting them to Zod schemas.
 * If no schemas are present, returns an empty string.
 *
 * @function generateComponentsCode
 * @param components - OpenAPI components object containing schema definitions
 * @returns Generated TypeScript code string containing Zod schema definitions and exports, or empty string if no schemas
 *
 * @note The function:
 * 1. Extracts schemas from components
 * 2. Resolves dependencies between schemas to determine correct generation order
 * 3. Returns empty string if no schemas are present
 * 4. Generates Zod schema definitions for each schema
 * 5. Creates exports for all schemas
 * 6. Returns the complete code with proper ordering to avoid reference errors
 */
export function generateComponentsCode(
  components: Components,
  namingCase: 'camelCase' | 'PascalCase' = 'camelCase',
  exportEnabled = true,
): string {
  // 1. schema extraction
  const { schemas } = components
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
      // 4.2 get variable name
      const variableName =
        namingCase === 'camelCase'
          ? getCamelCaseSchemaName(schemaName)
          : getPascalCaseSchemaName(schemaName)

      // 4.3 generate zod schema
      const zodSchema = generateZodSchema(schema, undefined, undefined, namingCase)
      // 4.4 generate zod schema definition
      return generateZodSchemaDefinition(variableName, zodSchema, schemaName)
    })
    .join('\n\n')
  // 5. generate export statement
  const exports = generateSchemasExport(orderedSchemas, namingCase)
  // 6. final code assembly
  if (exportEnabled) {
    return `${schemaDefinitions}\n\n${exports}`
  }
  return schemaDefinitions
}
