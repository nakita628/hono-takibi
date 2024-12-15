import { Components } from '../../../types'
import { generateZodSchemaDefinition } from '../../zod/generate-zod-schema-definition'
import { generateZodSchema } from '../../../generators/zod/generate-zod-schema'
import { resolveSchemasDependencies } from '../../../core/schema/references/resolve-schemas-dependencies'

/**
 * Generates TypeScript code for OpenAPI components, converting them to Zod schemas
 *
 * @function generateComponentsCode
 * @param components - OpenAPI components object containing schema definitions
 * @returns Generated TypeScript code string containing Zod schema definitions and exports
 *
 * @example
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
 *
 * const code = generateComponentsCode(components)
 * // Returns:
 * // export const Profile = z.object({ name: z.string() })
 * // export const User = z.object({ profile: Profile })
 * // export const schemas = { Profile, User }
 *
 * @note The function:
 * 1. Extracts schemas from components
 * 2. Resolves dependencies between schemas to determine correct generation order
 * 3. Generates Zod schema definitions for each schema
 * 4. Creates exports for all schemas
 * 5. Returns the complete code with proper ordering to avoid reference errors
 */
export function generateComponentsCode(components: Components): string {
  // 1. schema extraction
  const { schemas } = components
  // 2. resolve schema dependencies to obtain proper ordering
  const orderedSchemas = resolveSchemasDependencies(schemas)
  // 3. generate code for each schema
  const schemaDefinitions = orderedSchemas
    .map((schemaName) => {
      // 3.1 get schema definition corresponding to schema name
      const schema = schemas[schemaName]
      // 3.2 generate zod schema
      const zodSchema = generateZodSchema(schema)
      // 3.3 generate zod schema definition
      return generateZodSchemaDefinition(schemaName, zodSchema)
    })
    .join('\n\n')
  // 4. generate export statement
  const exports = `\n\nexport const schemas = {\n  ${orderedSchemas.join(',\n  ')}\n}`
  // 5. final code assembly
  return `${schemaDefinitions}${exports}`
}
