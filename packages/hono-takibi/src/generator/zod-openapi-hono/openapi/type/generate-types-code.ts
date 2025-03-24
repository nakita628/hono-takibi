import { resolveSchemasDependencies } from '../../../../core/schema/references/resolve-schemas-dependencies'
import { generateZodInfer } from '../../../zod/generate-zod-infer'
import type { Components } from '../../../../type'
import type { Config } from '../../../../config'

/**
 * Generates TypeScript code for type definitions based on OpenAPI components
 * @param { Components } components - OpenAPI components object containing schema definitions
 * @param { Config } config - Config
 * @returns { string } Generated TypeScript code string for type definitions
 */
export function generateTypesCode(components: Components, config: Config): string {
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
  const typeDefinitions = orderedSchemas.map((schemaName) => {
    return generateZodInfer(schemaName, config)
  })

  return typeDefinitions.join('\n\n')
}
