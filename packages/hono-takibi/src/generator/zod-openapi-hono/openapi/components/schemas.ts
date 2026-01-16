import {
  analyzeCircularSchemas,
  makeSchemaCode,
  makeSchemaInfos,
  makeTypeDefinitions,
} from '../../../../helper/index.js'
import type { Components } from '../../../../openapi/index.js'

/**
 * Generates TypeScript code for OpenAPI component schemas.
 *
 * Converts OpenAPI schemas to Zod schemas with OpenAPI registration,
 * handling circular references and type definitions.
 *
 * @param components - The OpenAPI components object.
 * @param exportSchemas - Whether to export the Zod schema constants.
 * @param exportSchemasTypes - Whether to export the inferred Zod types.
 * @returns A string of TypeScript code with schema definitions.
 *
 * @example
 * ```ts
 * schemasCode(components, true, true)
 * // → 'export const UserSchema = z.object({...}).openapi("User")\n\nexport type User = z.infer<typeof UserSchema>'
 * ```
 */
export function schemasCode(
  components: Components,
  exportSchemas: boolean,
  exportSchemasTypes: boolean,
): string {
  const { schemas } = components
  if (!schemas) return ''

  const schemaNames = Object.keys(schemas)
  if (schemaNames.length === 0) return ''

  const analysis = analyzeCircularSchemas(schemas, schemaNames)
  const infos = makeSchemaInfos(schemas, schemaNames, analysis)

  const typeDefs = makeTypeDefinitions(infos, schemas, analysis.cyclicGroupPascal)
  const schemaBlocks = infos.map((info) =>
    makeSchemaCode(info, {
      exportKeyword: exportSchemas ? 'export ' : '',
      exportType: exportSchemasTypes,
    }),
  )

  const typeDefsBlock = typeDefs.join('\n\n')
  const schemasBlock = schemaBlocks.join('\n\n')

  return typeDefsBlock ? `${typeDefsBlock}\n\n${schemasBlock}` : schemasBlock
}
