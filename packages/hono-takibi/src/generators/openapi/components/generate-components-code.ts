import { Components } from '../../../types'
import { generateZodSchemaDefinition } from '../../zod/generate-zod-schema-definition'
import { generateZodSchema } from '../../../generators/zod/generate-zod-schema'
import { resolveSchemasDependencies } from '../../../core/schema/references/resolve-schemas-dependencies'

/**
 * Generates TypeScript code for OpenAPI components, converting them to Zod schemas.
 * If no schemas are present, returns an empty string.
 *
 * @function generateComponentsCode
 * @param components - OpenAPI components object containing schema definitions
 * @returns Generated TypeScript code string containing Zod schema definitions and exports, or empty string if no schemas
 *
 * @example
 * // With schemas
 * const components = {
 *   schemas: {
 *     User: {
 *       type: 'object',
 *       properties: {
 *         profile: { $ref: '#/components/schemas/Profile' }
 *       }
 *     },
 *     Profile: {
 *       type: 'object',
 *       properties: {
 *         name: { type: 'string' }
 *       }
 *     }
 *   }
 * }
 * generateComponentsCode(components)
 * // Returns:
 * // export const Profile = z.object({ name: z.string() })
 * // export const User = z.object({ profile: Profile })
 * // export const schemas = { Profile, User }
 *
 * // Without schemas
 * generateComponentsCode({})
 * // Returns: ''
 *
 * @note The function:
 * 1. Extracts schemas from components
 * 2. Resolves dependencies between schemas to determine correct generation order
 * 3. Returns empty string if no schemas are present
 * 4. Generates Zod schema definitions for each schema
 * 5. Creates exports for all schemas
 * 6. Returns the complete code with proper ordering to avoid reference errors
 */
export function generateComponentsCode(components: Components): string {
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
      // 4.2 generate zod schema
      const zodSchema = generateZodSchema(schema)
      // 4.3 generate zod schema definition
      return generateZodSchemaDefinition(schemaName, zodSchema)
    })
    .join('\n\n')
  // 5. generate export statement
  const exports = `\n\nexport const schemas = {\n  ${orderedSchemas.join(',\n  ')}\n}`
  // 6. final code assembly
  return `${schemaDefinitions}${exports}`
}
